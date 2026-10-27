import { useId } from 'react'
import { profile } from '../data/site'

/**
 * The AT monogram: drawn as strokes (no font dependency) on the brand
 * blue-to-violet tile. The same geometry ships as public/favicon.svg.
 */
export function LogoMark({ className = 'size-9', title }) {
  const id = useId().replace(/[^\w-]/g, '')
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f6bf5" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${id}-g)`} />
      <rect width="32" height="32" rx="9" fill={`url(#${id}-s)`} />
      <g fill="none" stroke="#fff" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5.8 23.5 L10.9 9 L16 23.5" />
        <path d="M7.9 18.6 H13.9" />
        <path d="M17.8 9 H26.4" />
        <path d="M22.1 9 V23.5" />
      </g>
    </svg>
  )
}

/** Mark plus name and role, used in the nav, footer and demo pages. */
export default function Logo({ compact = false, markClass = 'size-9' }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className={`${markClass} shrink-0 drop-shadow-[0_6px_14px_rgba(79,107,245,0.35)]`} />
      <span className={compact ? 'sr-only' : 'leading-tight'}>
        <span className="block text-[14.5px] font-bold text-ink">{profile.name}</span>
        <span className="block text-[11.5px] text-ink-3">{profile.role}</span>
      </span>
    </span>
  )
}
