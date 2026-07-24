type GlyphProps = { color?: string; size?: number }

export function PawnGlyph({ color = 'currentColor', size = 22 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="6" r="3" stroke={color} strokeWidth="1.6" />
      <path d="M9 11h6l-1 4h-4l-1-4z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7 19h10l-1-3H8l-1 3z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

export function BishopGlyph({ color = 'currentColor', size = 22 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3c2 2 4 4 4 7 0 2-1.8 3.5-4 3.5S8 12 8 10c0-3 2-5 4-7z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 15h4v3h-4z" stroke={color} strokeWidth="1.6" />
      <path d="M7 21h10l-1-3H8l-1 3z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

export function QueenGlyph({ color = 'currentColor', size = 22 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 6l2 7M12 4l0 9M19 6l-2 7M9 13h6l-1 4h-4l-1-4z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M7 21h10l-1-3H8l-1 3z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="5" cy="5" r="1.2" fill={color} />
      <circle cx="12" cy="3" r="1.2" fill={color} />
      <circle cx="19" cy="5" r="1.2" fill={color} />
    </svg>
  )
}

export function TierGlyph({
  kind,
  color,
  size,
}: { kind: 'pawn' | 'bishop' | 'queen' } & GlyphProps) {
  if (kind === 'pawn') return <PawnGlyph color={color} size={size} />
  if (kind === 'bishop') return <BishopGlyph color={color} size={size} />
  return <QueenGlyph color={color} size={size} />
}
