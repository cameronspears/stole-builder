"use client";

interface PegboardShelfProps {
  className?: string;
  width?: number;
}

export function PegboardShelf({ className, width = 300 }: PegboardShelfProps) {
  const height = 40;
  const bracketWidth = 20;
  const bracketHeight = 30;
  
  return (
    <svg
      viewBox={`0 0 ${width} ${height + bracketHeight}`}
      className={className}
    >
      {/* Left bracket */}
      <g>
        {/* Bracket arm */}
        <path
          d={`M 10 0 L 10 ${bracketHeight} L ${bracketWidth + 5} ${bracketHeight}`}
          fill="none"
          stroke="#6B3610"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Bracket highlight */}
        <path
          d={`M 12 2 L 12 ${bracketHeight - 2}`}
          fill="none"
          stroke="#8B4513"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Peg hole */}
        <circle cx="10" cy="5" r="3" fill="#4A3520" />
      </g>
      
      {/* Right bracket */}
      <g>
        {/* Bracket arm */}
        <path
          d={`M ${width - 10} 0 L ${width - 10} ${bracketHeight} L ${width - bracketWidth - 5} ${bracketHeight}`}
          fill="none"
          stroke="#6B3610"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Bracket highlight */}
        <path
          d={`M ${width - 12} 2 L ${width - 12} ${bracketHeight - 2}`}
          fill="none"
          stroke="#8B4513"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Peg hole */}
        <circle cx={width - 10} cy="5" r="3" fill="#4A3520" />
      </g>
      
      {/* Shelf plank */}
      <rect
        x="5"
        y={bracketHeight - 2}
        width={width - 10}
        height="12"
        rx="2"
        fill="url(#woodGrain)"
      />
      {/* Shelf front edge */}
      <rect
        x="5"
        y={bracketHeight + 8}
        width={width - 10}
        height="4"
        rx="1"
        fill="#6B3610"
      />
      
      {/* Wood grain pattern */}
      <defs>
        <linearGradient id="woodGrain" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#DEB887" />
          <stop offset="20%" stopColor="#C4A574" />
          <stop offset="40%" stopColor="#DEB887" />
          <stop offset="60%" stopColor="#C4A574" />
          <stop offset="80%" stopColor="#DEB887" />
          <stop offset="100%" stopColor="#C4A574" />
        </linearGradient>
      </defs>
    </svg>
  );
}
