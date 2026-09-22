type IconProps = { className?: string };

/** Organizational Model — a small org-chart tree of connected people. */
export function OrganizationalIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <circle cx="20" cy="9" r="5" fill="#105594" />
      <circle cx="8" cy="30" r="5" fill="#3ec4d1" />
      <circle cx="32" cy="30" r="5" fill="#3ec4d1" />
      <path d="M20 14v6M20 20l-12 4M20 20l12 4" stroke="#105594" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Operational Model — a gear, for systems and process. */
export function OperationalIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <path
        d="M20 6v3.2M20 30.8V34M34 20h-3.2M9.2 20H6M29.4 10.6l-2.3 2.3M12.9 27.1l-2.3 2.3M29.4 29.4l-2.3-2.3M12.9 12.9l-2.3-2.3"
        stroke="#3ec4d1"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="9" fill="#105594" />
      <circle cx="20" cy="20" r="3.6" fill="#ffffff" />
    </svg>
  );
}

/** Financial Model — ascending bars with an upward trend line. */
export function FinancialIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <rect x="6" y="24" width="6" height="10" rx="1" fill="#3ec4d1" />
      <rect x="17" y="17" width="6" height="17" rx="1" fill="#105594" />
      <rect x="28" y="9" width="6" height="25" rx="1" fill="#3ec4d1" />
      <path d="M6 17l8-6 8 4 12-9" stroke="#105594" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Marketing & Sales Model — a megaphone, for outbound messaging. */
export function MarketingSalesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <path d="M8 17v6a2 2 0 002 2h2l2 8h4l-1.5-8H18l14 6V9l-14 6H10a2 2 0 00-2 2z" fill="#105594" />
      <path d="M30 17.5v5" stroke="#3ec4d1" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
