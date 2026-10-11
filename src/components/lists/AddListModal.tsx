"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  Upload,
  UserSearch,
  Download,
  FileSpreadsheet,
  Sparkles,
  UploadCloud,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface AddListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ------------------------------------------------------------------ */
/* Constants & mock backend                                            */
/* ------------------------------------------------------------------ */

const TEMPLATE_URL = "/ABC.xlsx"; // lives in /public
const MAX_FILES = 5;
const MAX_SIZE = 1024 * 1024; // 1 MB
const ACCEPTED_EXT = [".xlsx", ".xls", ".csv"];

const FIELD_OPTIONS = [
  "Client Email",
  "Full name",
  "Title",
  "Time zone",
  "Company domain",
  "Company name",
];
const SKIP = "Skip this column";
const REQUIRED_FIELD = "Client Email";

type UploadedFile = { id: string; name: string; size: number };
type MappingRow = { fileField: string; sample: string; target: string };

/**
 * PROTOTYPE: pretend backend. In the real flow the file is sent to the API,
 * which answers with the detected columns, sample values and suggested fields.
 */
function mockAnalyzeFile(): Promise<MappingRow[]> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            fileField: "{{Client Email}}",
            sample: "Hagertorky@gmail.com",
            target: "Client Email",
          },
          {
            fileField: "{{Full name}}",
            sample: "Hager Torky",
            target: "Full name",
          },
          {
            fileField: "{{Title}}",
            sample: "UI/UX Designer",
            target: "Title",
          },
          {
            fileField: "{{Time Zone}}",
            sample: "GMT(+2)",
            target: "Time zone",
          },
          {
            fileField: "{{Company domain}}",
            sample: "Bayan-tech.com",
            target: "Company domain",
          },
          {
            fileField: "{{Company name}}",
            sample: "Bayan Tech",
            target: "Company name",
          },
        ]),
      1800,
    ),
  );
}

function mappingError(rows: MappingRow[] | undefined): string | null {
  if (!rows) return null;
  if (!rows.some((r) => r.target === REQUIRED_FIELD))
    return `Map one column to "${REQUIRED_FIELD}".`;
  const seen = new Set<string>();
  for (const r of rows) {
    if (!r.target || r.target === SKIP) continue;
    if (seen.has(r.target)) return `"${r.target}" is mapped more than once.`;
    seen.add(r.target);
  }
  return null;
}

const formatSize = (b: number) =>
  b < 1024 ? `${b} B` : `${(b / 1024).toFixed(0)} KB`;

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function Banner() {
  return (
    <div className="bg-[#FF823A]/50 border-l-4 border-[#FF823A] rounded-lg px-3 py-2.5 text-[11px] font-mono text-text-dark">
      Upload high-quality email leads, Otherwise spam rates will increase and
      stop the warmup process.
    </div>
  );
}

function Dropzone({
  disabled,
  onFiles,
}: {
  disabled?: boolean;
  onFiles: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (!disabled) onFiles(Array.from(e.dataTransfer.files));
      }}
      className={cn(
        "rounded-lg border-2 border-dashed px-4 py-4 text-center transition-colors",
        disabled
          ? "border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed"
          : isDragging
            ? "border-[#0D8C7C] bg-[#0D8C7C]/10"
            : "border-[#0D8C7C]/60 bg-[#EEF1F0]",
      )}
    >
      <div className="flex items-center justify-center gap-3 text-xs font-mono text-[#0D8C7C]">
        <UploadCloud className="w-4 h-4" />
        <span>Drop File Here</span>
        <span className="text-[#7C8C87]">Or</span>
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className="bg-[#0D8C7C] hover:bg-[#0a7366] disabled:hover:bg-[#0D8C7C] text-white text-[11px] font-semibold px-3 py-1 rounded transition-colors disabled:cursor-not-allowed"
        >
          Browse files
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_EXT.join(",")}
          className="hidden"
          onChange={(e) => {
            onFiles(Array.from(e.target.files ?? []));
            e.target.value = ""; // allow picking the same file again
          }}
        />
      </div>
      <p className="mt-2 text-[10px] font-mono text-red-500 leading-snug">
        Accepted format Excel &amp; CSV only
        <br />
        File can&apos;t exceed 1 MB
        <br />
        Maximum of {MAX_FILES} files per upload
      </p>
    </div>
  );
}

function FileChips({
  files,
  onRemove,
}: {
  files: UploadedFile[];
  onRemove: (id: string) => void;
}) {
  if (files.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {files.map((f) => (
        <li
          key={f.id}
          className="flex items-center gap-2 bg-white border border-[#D3DEDB] rounded-lg pl-2.5 pr-1.5 py-1 text-[11px] font-mono text-text-dark"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-[#0D8C7C]" />
          {f.name}
          <span className="text-[#7C8C87]">{formatSize(f.size)}</span>
          <button
            type="button"
            onClick={() => onRemove(f.id)}
            aria-label={`Remove ${f.name}`}
            className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Modal                                                               */
/* ------------------------------------------------------------------ */

export function AddListModal({ isOpen, onClose }: AddListModalProps) {
  const router = useRouter();
  const { addList } = useAppStore();

  const [step, setStep] = useState<"choice" | "upload" | "success">("choice");
  const [tab, setTab] = useState<"file" | "smart">("file");
  const [listName, setListName] = useState("");
  const [nameError, setNameError] = useState("");

  const [downloaded, setDownloaded] = useState(false);
  const [normalFiles, setNormalFiles] = useState<UploadedFile[]>([]);
  const [smartFiles, setSmartFiles] = useState<UploadedFile[]>([]);
  const [activeSmartId, setActiveSmartId] = useState("");
  const [mappings, setMappings] = useState<Record<string, MappingRow[]>>({});
  const [analyzing, setAnalyzing] = useState<Record<string, boolean>>({});
  const [uploadError, setUploadError] = useState("");
  const [createdCount, setCreatedCount] = useState(0);

  // lets us ignore "backend" answers that arrive after the modal was reset
  const session = useRef(0);

  const resetAll = () => {
    session.current += 1;
    setStep("choice");
    setTab("file");
    setListName("");
    setNameError("");
    setDownloaded(false);
    setNormalFiles([]);
    setSmartFiles([]);
    setActiveSmartId("");
    setMappings({});
    setAnalyzing({});
    setUploadError("");
    setCreatedCount(0);
  };

  const handleClose = () => {
    resetAll();
    onClose();
  };

  // always call the latest handleClose from the Escape listener
  const closeRef = useRef(handleClose);
  closeRef.current = handleClose;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  if (!isOpen) return null;

  /* ---------- step 1 actions ---------- */

  const requireName = () => {
    if (!listName.trim()) {
      setNameError("Give your list a name first.");
      return false;
    }
    setNameError("");
    return true;
  };

  const goSearch = () => {
    handleClose();
    router.push("/prospect-finder");
  };

  const goUpload = () => {
    if (requireName()) setStep("upload");
  };

  /* ---------- upload handling ---------- */

  const validate = (incoming: File[], current: UploadedFile[]) => {
    const accepted: UploadedFile[] = [];
    const errors: string[] = [];

    incoming.forEach((f) => {
      const ext = "." + (f.name.split(".").pop() ?? "").toLowerCase();
      if (!ACCEPTED_EXT.includes(ext))
        return errors.push(`${f.name}: only Excel and CSV files are accepted.`);
      if (f.size > MAX_SIZE)
        return errors.push(`${f.name}: file can't exceed 1 MB.`);
      if (
        [...current, ...accepted].some(
          (x) => x.name === f.name && x.size === f.size,
        )
      )
        return errors.push(`${f.name}: already added.`);
      if (current.length + accepted.length >= MAX_FILES)
        return errors.push(`${f.name}: maximum of ${MAX_FILES} files.`);

      accepted.push({
        id: `${f.name}-${f.size}-${Date.now()}-${accepted.length}`,
        name: f.name,
        size: f.size,
      });
    });

    setUploadError(errors.join(" "));
    return accepted;
  };

  const handleNormalFiles = (files: File[]) => {
    const accepted = validate(files, normalFiles);
    if (accepted.length) setNormalFiles((p) => [...p, ...accepted]);
  };

  const handleSmartFiles = async (files: File[]) => {
    const accepted = validate(files, smartFiles);
    if (!accepted.length) return;

    setSmartFiles((p) => [...p, ...accepted]);
    setActiveSmartId((cur) => cur || accepted[0].id);
    setAnalyzing((p) => ({
      ...p,
      ...Object.fromEntries(accepted.map((a) => [a.id, true])),
    }));

    const mySession = session.current;
    await Promise.all(
      accepted.map(async (a) => {
        const rows = await mockAnalyzeFile();
        if (mySession !== session.current) return;
        setMappings((p) => ({ ...p, [a.id]: rows }));
        setAnalyzing((p) => ({ ...p, [a.id]: false }));
      }),
    );
  };

  const removeNormal = (id: string) => {
    setNormalFiles((p) => p.filter((f) => f.id !== id));
    setUploadError("");
  };

  const removeSmart = (id: string) => {
    const rest = smartFiles.filter((f) => f.id !== id);
    setSmartFiles(rest);
    setMappings(({ [id]: _drop, ...others }) => others);
    setAnalyzing(({ [id]: _drop, ...others }) => others);
    if (activeSmartId === id) setActiveSmartId(rest[0]?.id ?? "");
    setUploadError("");
  };

  const setTarget = (fileId: string, idx: number, target: string) =>
    setMappings((p) => ({
      ...p,
      [fileId]: p[fileId].map((r, i) => (i === idx ? { ...r, target } : r)),
    }));

  /* ---------- validity ---------- */

  const anyAnalyzing = smartFiles.some((f) => analyzing[f.id]);
  const invalidSmart = smartFiles.find((f) => mappingError(mappings[f.id]));
  const activeFile = smartFiles.find((f) => f.id === activeSmartId);
  const activeRows = activeFile ? mappings[activeFile.id] : undefined;
  const activeError = mappingError(activeRows);

  let saveBlocker = "";
  if (tab === "file") {
    if (normalFiles.length === 0)
      saveBlocker = "Upload the filled template to continue.";
  } else {
    if (smartFiles.length === 0) saveBlocker = "Upload a file to continue.";
    else if (anyAnalyzing) saveBlocker = "Analyzing your file...";
    else if (invalidSmart)
      saveBlocker = `${invalidSmart.name}: ${mappingError(mappings[invalidSmart.id])}`;
  }

  const handleSave = () => {
    if (saveBlocker) return;
    const files = tab === "file" ? normalFiles : smartFiles;
    // PROTOTYPE: no backend, so the list is created empty
    addList(listName.trim(), []);
    setCreatedCount(files.length);
    setStep("success");
  };

  /* ---------- render ---------- */

  const wide = step === "upload";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Add List"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "bg-[#FBFCFB] rounded-lg shadow-xl w-full border border-[#D3DEDB] p-5 relative max-h-[92vh] overflow-y-auto transition-[max-width] duration-200",
          wide ? "max-w-[620px]" : "max-w-[420px]",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {step === "upload" && (
              <button
                type="button"
                onClick={() => {
                  setStep("choice");
                  setUploadError("");
                }}
                aria-label="Back"
                className="text-gray-400 hover:text-gray-600 -ml-1"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="text-sm font-bold text-text-dark">Add List</h2>
            {step === "upload" && (
              <span className="text-[11px] font-mono text-[#7C8C87] truncate max-w-[220px]">
                / {listName.trim()}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ============ STEP 1: choose ============ */}
        {step === "choice" && (
          <div className="space-y-3">
            <div>
              <input
                type="text"
                value={listName}
                onChange={(e) => {
                  setListName(e.target.value);
                  if (nameError) setNameError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && goUpload()}
                placeholder="List Name"
                aria-label="List Name"
                aria-invalid={!!nameError}
                autoFocus
                className={cn(
                  "w-full bg-white border rounded-md px-3 py-2.5 text-xs font-mono text-text-dark outline-none placeholder:text-[#A0B0AC]",
                  nameError
                    ? "border-red-400"
                    : "border-[#D3DEDB] focus:border-[#0D8C7C]",
                )}
              />
              {nameError && (
                <p className="mt-1 text-[11px] font-mono text-red-500">
                  {nameError}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={goUpload}
                className="flex flex-col items-center justify-center gap-1.5 py-3 bg-white border border-[#0D8C7C]/60 rounded-md text-[#0D8C7C] hover:bg-[#0D8C7C]/5 hover:border-[#0D8C7C] transition-colors"
              >
                <Upload className="w-5 h-5" />
                <span className="text-sm font-mono text-text-gray">
                  Upload CSV file
                </span>
              </button>
              <button
                type="button"
                onClick={goSearch}
                className="flex flex-col items-center justify-center gap-1.5 py-3 bg-white border border-[#0D8C7C]/60 rounded-md text-[#0D8C7C] hover:bg-[#0D8C7C]/5 hover:border-[#0D8C7C] transition-colors"
              >
                <UserSearch className="w-5 h-5" />
                <span className="text-sm font-mono text-text-gray">
                  Search for leads
                </span>
              </button>
            </div>
          </div>
        )}

        {/* ============ STEP 2: upload ============ */}
        {step === "upload" && (
          <div className="space-y-4">
            {/* Tabs */}
            <div
              role="tablist"
              className="mx-auto flex w-fit items-center gap-1 rounded-lg bg-[#D9E3E1] p-1"
            >
              <button
                role="tab"
                aria-selected={tab === "file"}
                type="button"
                onClick={() => {
                  setTab("file");
                  setUploadError("");
                }}
                className={cn(
                  "px-8 py-1.5 rounded-md text-xs font-mono transition-colors",
                  tab === "file"
                    ? "bg-[#0D8C7C] text-white shadow-sm"
                    : "text-[#0D8C7C] hover:bg-white/50",
                )}
              >
                File Upload
              </button>
              <button
                role="tab"
                aria-selected={tab === "smart"}
                type="button"
                onClick={() => {
                  setTab("smart");
                  setUploadError("");
                }}
                className={cn(
                  "flex items-center gap-1.5 px-8 py-1.5 rounded-md text-xs font-mono transition-colors",
                  tab === "smart"
                    ? "bg-[#0D8C7C] text-white shadow-sm"
                    : "text-[#0D8C7C] hover:bg-white/50",
                )}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Smart Upload
              </button>
            </div>

            {/* ---------- File Upload ---------- */}
            {tab === "file" && (
              <div className="space-y-2">
                <p className="text-sm text-text-gray">
                  First download template and fill
                </p>
                <div className="flex mb-3 items-center justify-between rounded-lg border border-[#D3DEDB] p-4 shadow-sm">
                  <span className="flex items-center gap-2 text-xs font-mono font-semibold text-text-dark">
                    <FileSpreadsheet className="w-4 h-4 text-[#0D8C7C]" />
                    ABC.xlsx
                  </span>
                  <a
                    href={TEMPLATE_URL}
                    download="ABC.xlsx"
                    onClick={() => setDownloaded(true)}
                    className={cn(
                      "flex items-center gap-1.5 text-xs font-mono transition-colors",
                      downloaded
                        ? "text-[#0D8C7C] font-semibold"
                        : "text-[#50635D] hover:text-[#0D8C7C]",
                    )}
                  >
                    {downloaded ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    {downloaded ? "Downloaded" : "Download"}
                  </a>
                </div>

                <p className="text-sm text-text-gray">
                  Upload the filled template here
                </p>
                <Banner />

                <Dropzone onFiles={handleNormalFiles} />

                <FileChips files={normalFiles} onRemove={removeNormal} />
              </div>
            )}

            {/* ---------- Smart Upload ---------- */}
            {tab === "smart" && (
              <div className="space-y-3">
                <Banner />
                <Dropzone onFiles={handleSmartFiles} />

                {smartFiles.length > 0 && (
                  <>
                    <FileChips files={smartFiles} onRemove={removeSmart} />

                    {smartFiles.length > 1 && (
                      <select
                        value={activeSmartId}
                        onChange={(e) => setActiveSmartId(e.target.value)}
                        aria-label="Choose the file to map"
                        className="mx-auto block w-64 border border-[#D3DEDB] rounded-md bg-white px-3 py-2 text-xs font-mono text-text-dark outline-none focus:border-[#0D8C7C]"
                      >
                        {smartFiles.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name}
                            {analyzing[f.id] ? " (analyzing...)" : ""}
                          </option>
                        ))}
                      </select>
                    )}
                  </>
                )}

                {/* analyzing state */}
                {activeFile && analyzing[activeFile.id] && (
                  <div className="flex flex-col items-center gap-2 rounded-lg border border-[#D3DEDB] bg-white py-8">
                    <Loader2 className="w-5 h-5 text-[#0D8C7C] animate-spin" />
                    <p className="text-xs font-mono text-[#50635D]">
                      Reading {activeFile.name} and matching your columns...
                    </p>
                  </div>
                )}

                {/* mapping table, returned by the "backend" */}
                {activeFile && activeRows && !analyzing[activeFile.id] && (
                  <div className="rounded-lg overflow-hidden">
                    <div className="grid grid-cols-[1.1fr_1.1fr_1fr] gap-3 bg-[#EEF1F0] px-3 py-2 text-sm font-semibold font-mono text-text-dark">
                      <span>File Fields</span>
                      <span>Variables</span>
                      <span className="text-center">Fields</span>
                    </div>

                    {activeRows.map((row, idx) => {
                      const dup =
                        row.target !== SKIP &&
                        !!row.target &&
                        activeRows.filter((r) => r.target === row.target)
                          .length > 1;
                      return (
                        <div
                          key={row.fileField}
                          className="grid grid-cols-[1.1fr_1.1fr_1fr] items-center gap-3 border-b border-[#E7EEEC] last:border-b-0 px-3 py-3"
                        >
                          <span className="text-xs font-bold text-text-dark break-all">
                            {row.fileField}
                          </span>
                          <span className="text-[11px] font-mono text-text-gray truncate">
                            {row.sample}
                          </span>
                          <select
                            value={row.target}
                            onChange={(e) =>
                              setTarget(activeFile.id, idx, e.target.value)
                            }
                            aria-label={`Field for ${row.fileField}`}
                            className={cn(
                              "w-full border rounded-md bg-white px-2 py-1.5 text-[11px] font-mono outline-none",
                              dup
                                ? "border-red-400 text-red-500"
                                : "border-[#D3DEDB] text-text-dark focus:border-[#0D8C7C]",
                            )}
                          >
                            <option value="">Select field</option>
                            {FIELD_OPTIONS.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                            <option value={SKIP}>{SKIP}</option>
                          </select>
                        </div>
                      );
                    })}

                    {activeError && (
                      <p className="flex items-center gap-1.5 bg-red-50 px-3 py-2 text-[11px] font-mono text-red-600">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {activeError}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {uploadError && (
              <p
                role="alert"
                className="flex items-start gap-1.5 text-[11px] font-mono text-red-500"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-px" />
                {uploadError}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <p className="text-[11px] font-mono text-[#7C8C87] min-w-0 truncate">
                {saveBlocker}
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-white border border-red-400 text-red-500 hover:bg-red-50 text-xs font-semibold px-4 py-1.5 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!!saveBlocker}
                  className="bg-[#0D8C7C] hover:bg-[#0a7366] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-1.5 rounded-md transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============ STEP 3: success ============ */}
        {step === "success" && (
          <div className="flex flex-col items-center text-center py-4 gap-3">
            <CheckCircle2 className="w-10 h-10 text-[#0D8C7C]" />
            <div>
              <h3 className="text-sm font-bold text-text-dark">List created</h3>
              <p className="mt-1 text-[11px] font-mono text-[#50635D]">
                &quot;{listName.trim()}&quot; was created from {createdCount}{" "}
                {createdCount === 1 ? "file" : "files"}.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="bg-white border border-[#0D8C7C] text-[#0D8C7C] hover:bg-[#0D8C7C]/5 text-xs font-semibold px-4 py-1.5 rounded-md transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  router.push("/lists");
                }}
                className="bg-[#0D8C7C] hover:bg-[#0a7366] text-white text-xs font-semibold px-4 py-1.5 rounded-md transition-colors"
              >
                View lists
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
