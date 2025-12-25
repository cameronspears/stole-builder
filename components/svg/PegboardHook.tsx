"use client";

interface PegboardHookProps {
  className?: string;
}

export function PegboardHook({ className }: PegboardHookProps) {
  return (
    <svg
      viewBox="0 0 24 30"
      className={className}
      style={{ width: 24, height: 30 }}
    >
      {/* Hook base (goes into pegboard hole) */}
      <circle cx="12" cy="6" r="5" fill="#6B6B6B" />
      <circle cx="12" cy="6" r="3" fill="#8B8B8B" />
      
      {/* Hook stem */}
      <rect x="10" y="8" width="4" height="10" rx="1" fill="#6B6B6B" />
      <rect x="11" y="8" width="2" height="10" fill="#8B8B8B" />
      
      {/* Hook curve */}
      <path
        d="M 12 18 Q 12 26 6 26 Q 0 26 0 22"
        fill="none"
        stroke="#6B6B6B"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 12 18 Q 12 25 7 25 Q 2 25 2 22"
        fill="none"
        stroke="#8B8B8B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Shine highlight */}
      <ellipse cx="14" cy="10" rx="1" ry="3" fill="white" opacity="0.3" />
    </svg>
  );
}
