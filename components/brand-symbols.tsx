interface SymbolProps {
  size?: number
  className?: string
}

export function BugShieldSymbol({ size = 64, className = '' }: SymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M32 6C20 6 10 14 10 24v6c0 14 22 28 22 28s22-14 22-28v-6c0-10-10-18-22-18z" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="32" cy="26" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M28 26l-4 4M36 26l4-4M32 22v8M28 30l4 4M36 30l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="29" cy="24" r="1.5" fill="currentColor" />
      <circle cx="35" cy="24" r="1.5" fill="currentColor" />
      <path d="M38 10l4-2M26 10l-4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function TargetBugSymbol({ size = 56, className = '' }: SymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="28" cy="28" r="16" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="28" cy="28" r="8" stroke="currentColor" strokeWidth="2" />
      <line x1="28" y1="4" x2="28" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="42" x2="28" y2="52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="28" x2="14" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="28" x2="52" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="28" cy="28" r="3" fill="currentColor" />
    </svg>
  )
}

export function GeometricBgPattern({ className = '' }: { className?: string }) {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
      <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
      <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
      <line x1="43" y1="43" x2="157" y2="157" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
      <line x1="43" y1="157" x2="157" y2="43" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
    </svg>
  )
}

export function MinimalBug({ size = 40, className = '' }: SymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse cx="20" cy="26" rx="12" ry="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <ellipse cx="20" cy="18" rx="7" ry="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="20" y1="13" x2="20" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="8" x2="20" y2="6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="24" y1="8" x2="20" y2="6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <circle cx="17" cy="17" r="1" fill="currentColor" />
      <circle cx="23" cy="17" r="1" fill="currentColor" />
      <line x1="8" y1="26" x2="2" y2="22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="8" y1="30" x2="2" y2="32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="32" y1="26" x2="38" y2="22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="32" y1="30" x2="38" y2="32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="10" y1="34" x2="6" y2="38" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="30" y1="34" x2="34" y2="38" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function ShieldCrosshairSymbol({ size = 80, className = '' }: SymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M40 8C26 8 16 16 16 26v6c0 16 24 40 24 40s24-24 24-40v-6c0-10-10-18-24-18z" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="40" cy="30" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="40" y1="18" x2="40" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="38" x2="40" y2="42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="30" x2="32" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="48" y1="30" x2="52" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="40" cy="30" r="3" fill="currentColor" />
    </svg>
  )
}
