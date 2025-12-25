"use client";

interface HangerProps {
  className?: string;
}

export function Hanger({ className }: HangerProps) {
  return (
    <svg
      viewBox="0 0 200 50"
      className={className}
      aria-label="Wooden hanger"
    >
      {/* Hook */}
      <path
        d="M100 5 Q100 0 95 0 Q90 0 90 5 Q90 12 100 12"
        fill="none"
        stroke="#8B7355"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Hanger body */}
      <path
        d="M30 45 Q100 15 170 45"
        fill="none"
        stroke="url(#woodGrain)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Wood grain gradient */}
      <defs>
        <linearGradient id="woodGrain" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#DEB887" />
          <stop offset="25%" stopColor="#C4A574" />
          <stop offset="50%" stopColor="#DEB887" />
          <stop offset="75%" stopColor="#C4A574" />
          <stop offset="100%" stopColor="#DEB887" />
        </linearGradient>
      </defs>
    </svg>
  );
}
