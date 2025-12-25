"use client";

interface HostAvatarProps {
  className?: string;
}

// Placeholder avatar - replace with your wife's SVG later
export function HostAvatar({ className }: HostAvatarProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-label="Host avatar"
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="#FDF6E3" stroke="#DEB887" strokeWidth="3" />
      
      {/* Simple friendly face placeholder */}
      {/* Hair */}
      <ellipse cx="50" cy="35" rx="30" ry="25" fill="#4A3728" />
      <ellipse cx="30" cy="50" rx="8" ry="15" fill="#4A3728" />
      <ellipse cx="70" cy="50" rx="8" ry="15" fill="#4A3728" />
      
      {/* Face */}
      <ellipse cx="50" cy="55" rx="25" ry="28" fill="#F5DEB3" />
      
      {/* Eyes */}
      <ellipse cx="42" cy="50" rx="4" ry="5" fill="#4A3728" />
      <ellipse cx="58" cy="50" rx="4" ry="5" fill="#4A3728" />
      <circle cx="43" cy="49" r="1.5" fill="white" />
      <circle cx="59" cy="49" r="1.5" fill="white" />
      
      {/* Rosy cheeks */}
      <circle cx="35" cy="58" r="5" fill="#FFB6C1" opacity="0.5" />
      <circle cx="65" cy="58" r="5" fill="#FFB6C1" opacity="0.5" />
      
      {/* Smile */}
      <path
        d="M40 65 Q50 75 60 65"
        fill="none"
        stroke="#4A3728"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Shoulders/body hint */}
      <path
        d="M20 95 Q50 80 80 95"
        fill="#FF6B6B"
        stroke="#E55555"
        strokeWidth="2"
      />
    </svg>
  );
}
