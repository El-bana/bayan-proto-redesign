"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Search,
  Columns3,
  Trash2,
  Filter,
  Plus,
  MoreVertical,
  ChevronDown,
  Send,
} from "lucide-react";
import { useColumnVisibility } from "@/lib/useColumnVisibility";
import ColumnVisibilityModal from "../layout/ColumnVisibilityModal";
import AddTemplateModal from "./AddTemplateModal";
import ProgressBar from "../lists/ProgressBar";

type Template = {
  id: string;
  name: string;
  subject: string;
  body: string;
  language: string;
  creator: string;
};

const initialTemplates: Template[] = [
  {
    id: "1",
    name: "opener template",
    subject: "Laoret - Elevate Your Global",
    body: "I hope that you're doing wel...",
    language: "English",
    creator: "EM",
  },
  {
    id: "2",
    name: "opener template",
    subject: "Laoret - Elevate Your Global",
    body: "I hope that you're doing wel...",
    language: "French",
    creator: "EM",
  },
  {
    id: "3",
    name: "Template 2",
    subject: "Laoret - Elevate Your Global",
    body: "I hope that you're doing wel...",
    language: "English",
    creator: "EM",
  },
  {
    id: "4",
    name: "Template SaaS",
    subject: "Laoret - Elevate Your Global",
    body: "I hope that you're doing wel...",
    language: "Spanish",
    creator: "EM",
  },
  {
    id: "5",
    name: "Template SaaS",
    subject: "Laoret - Elevate Your Global",
    body: "I hope that you're doing wel...",
    language: "English",
    creator: "EM",
  },
  {
    id: "6",
    name: "Template SaaS",
    subject: "Laoret - Elevate Your Global",
    body: "I hope that you're doing wel...",
    language: "English",
    creator: "EM",
  },
  {
    id: "7",
    name: "Template SaaS",
    subject: "Laoret - Elevate Your Global",
    body: "I hope that you're doing wel...",
    language: "Arabic",
    creator: "EM",
  },
  {
    id: "8",
    name: "opener template",
    subject: "Laoret - Elevate Your Global",
    body: "I hope that you're doing wel...",
    language: "English",
    creator: "EM",
  },
];

export default function TemplatesTable() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const columnManager = useColumnVisibility([
    { key: "name", label: "Template Name", isVisible: true },
    { key: "subject", label: "Subject", isVisible: true },
    { key: "body", label: "Email Body", isVisible: true },
    { key: "language", label: "Language", isVisible: true },
    { key: "creator", label: "Creator", isVisible: true },
  ]);

  const toggleAll = () => {
    if (selectedIds.size === templates.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(templates.map((t) => t.id)));
  };

  const toggleOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleDeleteSelected = () => {
    setTemplates((prev) => prev.filter((t) => !selectedIds.has(t.id)));
    setSelectedIds(new Set());
  };

  const handleDeleteOne = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleSaveTemplate = (newTpl: {
    name: string;
    language: string;
    subject: string;
    body: string;
  }) => {
    const created: Template = {
      id: Date.now().toString(),
      name: newTpl.name,
      subject: newTpl.subject,
      body: newTpl.body.slice(0, 30) + "...",
      language: newTpl.language.split(" ")[0],
      creator: "HT",
    };
    setTemplates((prev) => [created, ...prev]);
  };

  return (
    <div className="min-h-screen relative bg-[#F6F8F7] p-8 flex flex-col">
      {/* Page Title Header */}
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-8 h-8 text-[#0D8C7C]" />
        <h1 className="text-2xl font-bold text-[#10201C]">Templates</h1>
      </div>

      {/* Toolbar Header */}
      <div className="flex mb-2 flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Filter Dropdown */}
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#10201C] hover:bg-gray-50 transition-colors">
            <BookOpen className="w-4 h-4 text-[#0D8C7C]" />
            <span>My Templates</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {/* Search Bar */}
          <div className="relative w-[260px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#7C8C87]" />
            <input
              type="text"
              placeholder="Search for template...."
              className="w-full pl-9 pr-4 py-2 border border-[#D3DEDB] rounded-lg bg-white text-sm outline-none focus:border-[#0D8C7C] placeholder-[#7C8C87]"
            />
          </div>

          {/* Column Visibility Toggle */}
          <button
            onClick={columnManager.openModal}
            className="px-4 h-9 border border-[#0D8C7C] rounded-lg bg-white text-[#0D8C7C] hover:bg-[#0D8C7C]/5 transition-colors"
          >
            <Columns3 className="w-5 h-5" />
          </button>

          {/* Selected Count & Delete Action */}
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2 ml-1">
              <span className="text-[#10201C] text-sm font-medium">
                {selectedIds.size} selected
              </span>
              <button
                onClick={handleDeleteSelected}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#E20000] rounded-lg hover:bg-[#C90000] transition-colors shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          )}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="px-4 h-9 border border-[#0D8C7C] rounded-lg bg-white text-[#0D8C7C] hover:bg-[#0D8C7C]/5 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0D8C7C] text-white text-sm font-medium rounded-lg shadow-sm hover:bg-[#14B39F] transition-colors"
          >
            <Plus className="w-4 h-4" /> New Template
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#ECF6F5] text-sm font-semibold text-[#10201C]">
              <th className="py-2 px-4 rounded-l-lg border-y border-l border-[#D3DEDB] w-12">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.size === templates.length &&
                      templates.length > 0
                    }
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                  />
                </div>
              </th>
              {columnManager.isVisible("name") && (
                <th className="py-2 px-4 border-y border-[#D3DEDB]">
                  Template Name
                </th>
              )}
              {columnManager.isVisible("subject") && (
                <th className="py-2 px-4 border-y border-[#D3DEDB]">Subject</th>
              )}
              {columnManager.isVisible("body") && (
                <th className="py-2 px-4 border-y border-[#D3DEDB]">
                  Email Body
                </th>
              )}
              {columnManager.isVisible("language") && (
                <th className="py-2 px-4 border-y border-[#D3DEDB]">
                  Language
                </th>
              )}
              {columnManager.isVisible("creator") && (
                <th className="py-2 px-4 border-y border-[#D3DEDB]">Creator</th>
              )}
              <th className="py-2 px-4 rounded-r-lg border-y border-r border-[#D3DEDB] text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-[#10201C]">
            {templates.map((tpl) => {
              const isSelected = selectedIds.has(tpl.id);
              return (
                <tr
                  key={tpl.id}
                  className={`transition-colors ${
                    isSelected ? "bg-[#0D8C7C]/5" : "hover:bg-black/5"
                  }`}
                >
                  <td className="py-3 px-4 border-b border-[#D3DEDB]">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOne(tpl.id)}
                        className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                      />
                    </div>
                  </td>
                  {columnManager.isVisible("name") && (
                    <td className="py-3 px-4 font-semibold border-b border-[#D3DEDB]">
                      {tpl.name}
                    </td>
                  )}
                  {columnManager.isVisible("subject") && (
                    <td className="py-3 px-4 border-b border-[#D3DEDB] text-gray-700">
                      {tpl.subject}
                    </td>
                  )}
                  {columnManager.isVisible("body") && (
                    <td className="py-3 px-4 border-b border-[#D3DEDB] text-gray-600 font-mono text-xs">
                      {tpl.body}
                    </td>
                  )}
                  {columnManager.isVisible("language") && (
                    <td className="py-3 px-4 border-b border-[#D3DEDB]">
                      {tpl.language}
                    </td>
                  )}
                  {columnManager.isVisible("creator") && (
                    <td className="py-3 px-4 border-b border-[#D3DEDB]">
                      <div className="w-7 h-7 rounded-full bg-[#2D5BFF] text-white flex items-center justify-center font-bold text-[11px]">
                        {tpl.creator}
                      </div>
                    </td>
                  )}
                  <td className="py-3 px-4 border-b border-[#D3DEDB]">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleDeleteOne(tpl.id)}
                        className="text-[#E20000] hover:opacity-80 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="text-[#10201C] hover:opacity-70">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <ColumnVisibilityModal
        isOpen={columnManager.isOpen}
        onClose={columnManager.closeModal}
        columns={columnManager.columns}
        onToggleColumn={columnManager.toggleColumn}
        onShowAll={columnManager.showAll}
        onHideAll={columnManager.hideAll}
      />

      <AddTemplateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveTemplate}
        existingNames={templates.map((t) => t.name.toLowerCase())}
      />

      <div className="sticky bottom-0 z-20 w-full">
        <ProgressBar />
      </div>
    </div>
  );
}
