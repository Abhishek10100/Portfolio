/* Palette and helpers shared by the project illustrations. The artwork is
   drawn on its own pale-lavender ground, so these are fixed hex values rather
   than page tokens. */
export const INK = '#1c1d3a'
export const MUTED = '#6b6d8f'
export const BRAND = '#5b5bd6'
export const FONT = 'Inter, system-ui, sans-serif'

/** Idle bob for a motion element; spreads to nothing under reduced motion. */
export const float = (reduced, dy, duration, delay = 0) =>
  reduced
    ? {}
    : {
        animate: { y: [0, -dy, 0] },
        transition: { duration, repeat: Infinity, ease: 'easeInOut', delay },
      }

export function Sparkle({ cx, cy, s = 1 }) {
  return (
    <path
      d="M0 -5 L1.6 -1.6 L5 0 L1.6 1.6 L0 5 L-1.6 1.6 L-5 0 L-1.6 -1.6Z"
      transform={`translate(${cx} ${cy}) scale(${s})`}
      fill="#fff"
    />
  )
}
