import { useId } from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

// Shared envelope with a cut-out in the top-right corner for the badge
function EnvelopeBase({
  children,
  cutout = true,
  ...props
}: IconProps & { children?: React.ReactNode; cutout?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {cutout && (
        <mask id={id}>
          <rect width="48" height="48" fill="white" />
          <circle cx="37" cy="11" r="11" fill="black" />
        </mask>
      )}
      <g mask={cutout ? `url(#${id})` : undefined}>
        <rect x="3" y="14" width="34" height="26" rx="4" />
        <path d="M4 18l16 12 16-12" />
      </g>
      {children}
    </svg>
  );
}

export function MailReply(props: IconProps) {
  return (
    <EnvelopeBase {...props}>
      {/* arrowhead + curved tail */}
      <path d="M33 4l-6 5 6 5" />
      <path d="M27 9h10a6 6 0 0 1 6 6v3" />
    </EnvelopeBase>
  );
}

export function MailPlusBadge(props: IconProps) {
  return (
    <EnvelopeBase {...props}>
      <circle cx="37" cy="11" r="8" />
      <path d="M37 7v8M33 11h8" />
    </EnvelopeBase>
  );
}

export function MailAlertBadge(props: IconProps) {
  return (
    <EnvelopeBase {...props}>
      <circle cx="37" cy="11" r="8" />
      <path d="M37 7v5" />
      <path d="M37 15.5h.01" />
    </EnvelopeBase>
  );
}
