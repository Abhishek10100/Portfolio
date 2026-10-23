import { motion, useReducedMotion } from 'framer-motion'
import { INK, MUTED, FONT, float, Sparkle } from './shared'

const CORE = { x: 136, y: 77 }
const CARD_X = 190

// Pale backdrops, skin tone, hair and shirt for the three profile avatars.
const CANDIDATES = [
  { score: '92%', backdrop: '#dcd9ff', skin: '#f3cdb4', hair: '#2d2f55', shirt: '#5b5bd6', name: 46, lines: [62, 44] },
  { score: '88%', backdrop: '#ffe3d2', skin: '#d9a47e', hair: '#3a2a2a', shirt: '#ff8a3d', name: 42, lines: [58, 48] },
  { score: '81%', backdrop: '#d5ebff', skin: '#e8bd9c', hair: '#5a3b2b', shirt: '#4a8ae6', name: 50, lines: [52, 40] },
]

function Avatar({ cx, cy, r = 12.5, backdrop, skin, hair, shirt }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r={r} fill={backdrop} />
      <g clipPath="url(#rec-avatar-clip)">
        <path d="M-9 14 A9 8.5 0 0 1 9 14 Z" fill={shirt} />
        <circle cx="0" cy="-1.5" r="5" fill={skin} />
        <path d="M-5.4 -2.2 A5.4 5.4 0 0 1 5.4 -2.2 Q0 -5.8 -5.4 -2.2 Z" fill={hair} />
        <circle cx="-1.9" cy="-1.3" r="0.6" fill={INK} />
        <circle cx="1.9" cy="-1.3" r="0.6" fill={INK} />
        <path d="M-1.5 1.1 Q0 2.4 1.5 1.1" stroke={INK} strokeWidth="0.6" strokeLinecap="round" fill="none" />
      </g>
      <circle r={r} fill="none" stroke="#fff" strokeWidth="1.2" />
    </g>
  )
}

/** Recruiting flow: job description, an AI match core, ranked candidates, interview and scorecard. */
export default function RecruitingArt() {
  const reduced = useReducedMotion()

  // Dash cycle is 3 + 6, so one loop of -9 is seamless.
  const flow = reduced
    ? {}
    : {
        animate: { strokeDashoffset: [0, -9] },
        transition: { duration: 0.9, repeat: Infinity, ease: 'linear' },
      }

  const rows = CANDIDATES.map((c, i) => ({ ...c, i, y: 14 + i * 44, cy: 14 + i * 44 + 19 }))
  const curves = rows.map(
    (r) =>
      `M${CORE.x + 17} ${CORE.y} C ${CORE.x + 34} ${CORE.y}, ${CORE.x + 34} ${r.cy}, ${CARD_X} ${r.cy}`,
  )

  return (
    <svg
      viewBox="0 0 360 200"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rec-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6674dc" />
          <stop offset="0.5" stopColor="#7a84ea" />
          <stop offset="1" stopColor="#9a92f3" />
        </linearGradient>
        <radialGradient id="rec-glow-light">
          <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rec-glow-violet">
          <stop offset="0" stopColor="#a855f7" stopOpacity="0.4" />
          <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rec-halo">
          <stop offset="0" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="0.55" stopColor="#d6d2ff" stopOpacity="0.2" />
          <stop offset="1" stopColor="#d6d2ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rec-core" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#b6bdff" />
          <stop offset="1" stopColor="#5b5bd6" />
        </radialGradient>
        <linearGradient id="rec-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b5bd6" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="rec-video" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4a58cc" />
          <stop offset="1" stopColor="#7c6cf0" />
        </linearGradient>
        <clipPath id="rec-avatar-clip">
          <circle r="12.5" />
        </clipPath>
        <clipPath id="rec-tile-clip">
          <rect x="68" y="157" width="40" height="28" rx="6" />
        </clipPath>
        <clipPath id="rec-engineer-clip">
          <circle cx="34" cy="171" r="16.5" />
        </clipPath>
        <filter id="rec-shadow" x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#2a2a80" floodOpacity="0.28" />
        </filter>
        <filter id="rec-shadow-card" x="-10%" y="-30%" width="120%" height="190%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#2a2a80" floodOpacity="0.28" />
        </filter>
        <filter id="rec-shadow-sm" x="-50%" y="-50%" width="200%" height="220%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#2a2a80" floodOpacity="0.25" />
        </filter>
      </defs>

      <rect width="360" height="200" fill="url(#rec-bg)" />
      <circle cx="272" cy="50" r="130" fill="url(#rec-glow-light)" />
      <circle cx="30" cy="196" r="110" fill="url(#rec-glow-violet)" />
      <circle cx={CORE.x} cy={CORE.y} r="62" fill="none" stroke="#fff" strokeOpacity="0.1" />
      <circle cx={CORE.x} cy={CORE.y} r="96" fill="none" stroke="#fff" strokeOpacity="0.07" />

      {/* Connections: role -> match core -> candidates */}
      <path d={`M98 ${CORE.y} H${CORE.x - 17}`} stroke="#fff" strokeOpacity="0.35" strokeWidth="1.4" fill="none" />
      <motion.path
        d={`M98 ${CORE.y} H${CORE.x - 17}`}
        stroke="#fff"
        strokeOpacity="0.9"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="3 6"
        fill="none"
        {...flow}
      />
      {curves.map((d, i) => (
        <g key={i}>
          <path d={d} stroke="#fff" strokeOpacity={0.4 - i * 0.08} strokeWidth="1.4" fill="none" />
          <motion.path
            d={d}
            stroke="#fff"
            strokeOpacity={1 - i * 0.28}
            strokeWidth={i === 0 ? 2 : 1.4}
            strokeLinecap="round"
            strokeDasharray="3 6"
            fill="none"
            {...flow}
          />
        </g>
      ))}

      {/* Job description */}
      <motion.g {...float(reduced, 2.5, 6)}>
        <rect
          x="14"
          y="14"
          width="84"
          height="126"
          rx="11"
          fill="#fff"
          fillOpacity="0.93"
          stroke="#fff"
          strokeOpacity="0.9"
          filter="url(#rec-shadow)"
        />
        <rect x="24" y="24" width="24" height="11" rx="5.5" fill="#e6e5fc" />
        <text x="36" y="32" textAnchor="middle" fontFamily={FONT} fontSize="6.5" fontWeight="800" fill="#5b5bd6">
          JD
        </text>
        <text x="24" y="52" fontFamily={FONT} fontSize="9" fontWeight="800" fill={INK} letterSpacing="-0.2">
          ML Engineer
        </text>
        <rect x="24" y="58" width="44" height="3" rx="1.5" fill={MUTED} fillOpacity="0.35" />
        <line x1="24" x2="88" y1="68" y2="68" stroke="#e6e6f6" strokeWidth="0.8" />
        {[60, 52, 58, 40].map((w, i) => (
          <g key={i}>
            <circle cx="26" cy={76.5 + i * 8} r="1.5" fill="#7c6cf0" />
            <rect x="31" y={75 + i * 8} width={w - 8} height="3" rx="1.5" fill={MUTED} fillOpacity="0.28" />
          </g>
        ))}
        {[22, 16, 18].map((w, i) => (
          <g key={i}>
            <rect x={[24, 50, 70][i]} y="110" width={w} height="9" rx="4.5" fill="#e6e5fc" />
            <rect x={[24, 50, 70][i] + 4} y="113.3" width={w - 8} height="2.4" rx="1.2" fill="#7c6cf0" fillOpacity="0.6" />
          </g>
        ))}
        <rect x="24" y="126" width="64" height="4" rx="2" fill="#e6e5fc" />
        <rect x="24" y="126" width="44" height="4" rx="2" fill="url(#rec-accent)" />
      </motion.g>

      {/* AI match core */}
      <motion.circle
        cx={CORE.x}
        cy={CORE.y}
        r="31"
        fill="url(#rec-halo)"
        {...(reduced
          ? {}
          : {
              animate: { scale: [1, 1.14, 1], opacity: [0.95, 0.55, 0.95] },
              transition: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
            })}
      />
      <circle cx={CORE.x} cy={CORE.y} r="17" fill="#fff" fillOpacity="0.95" stroke="#fff" filter="url(#rec-shadow-sm)" />
      <circle cx={CORE.x} cy={CORE.y} r="11" fill="url(#rec-core)" />
      <Sparkle cx={CORE.x} cy={CORE.y} s={1.05} />

      {/* Candidate profile cards, strongest match emphasised */}
      {rows.map((r) => (
        <motion.g key={r.i} {...float(reduced, 2.5, 5.4 + r.i * 0.5, r.i * 0.55)}>
          {r.i === 0 && (
            <rect
              x={CARD_X - 2}
              y={r.y - 2}
              width="160"
              height="42"
              rx="11"
              fill="none"
              stroke="#d9ccff"
              strokeOpacity="0.8"
              strokeWidth="1.6"
            />
          )}
          <rect
            x={CARD_X}
            y={r.y}
            width="156"
            height="38"
            rx="9"
            fill="#fff"
            fillOpacity={[0.95, 0.87, 0.79][r.i]}
            stroke="#fff"
            strokeOpacity="0.9"
            filter="url(#rec-shadow-card)"
          />
          <Avatar cx={CARD_X + 19} cy={r.cy} {...r} />
          <rect x={CARD_X + 40} y={r.cy - 10} width={r.name} height="5" rx="2.5" fill={INK} fillOpacity="0.78" />
          <rect x={CARD_X + 40} y={r.cy - 1} width={r.lines[0]} height="3" rx="1.5" fill={MUTED} fillOpacity="0.3" />
          <rect x={CARD_X + 40} y={r.cy + 6} width={r.lines[1]} height="3" rx="1.5" fill={MUTED} fillOpacity="0.22" />
          <rect
            x={CARD_X + 112}
            y={r.cy - 8}
            width="32"
            height="16"
            rx="8"
            fill={r.i === 0 ? 'url(#rec-accent)' : r.i === 1 ? '#ecebfd' : '#f1f0fb'}
          />
          <text
            x={CARD_X + 128}
            y={r.cy + 3.4}
            textAnchor="middle"
            fontFamily={FONT}
            fontSize="9.5"
            fontWeight="800"
            fill={r.i === 0 ? '#fff' : r.i === 1 ? '#5b5bd6' : '#8a8cc0'}
          >
            {r.score}
          </text>
        </motion.g>
      ))}

      {/* AI engineer observing */}
      <motion.g {...float(reduced, 2, 5, 0.3)}>
        <circle cx="34" cy="171" r="19" fill="#fff" fillOpacity="0.95" filter="url(#rec-shadow-sm)" />
        <image
          href="/images/character-sm.webp"
          x="5.7"
          y="148.8"
          width="57.7"
          height="57.7"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#rec-engineer-clip)"
        />
        <circle cx="47.5" cy="158.5" r="3.6" fill="#ff8a3d" stroke="#fff" strokeWidth="1.2" />
      </motion.g>

      {/* AI interview panel */}
      <motion.g {...float(reduced, 2.5, 5.8, 0.4)}>
        <rect
          x="62"
          y="152"
          width="116"
          height="38"
          rx="10"
          fill="#fff"
          fillOpacity="0.93"
          stroke="#fff"
          strokeOpacity="0.9"
          filter="url(#rec-shadow-card)"
        />
        <rect x="68" y="157" width="40" height="28" rx="6" fill="url(#rec-video)" />
        <g clipPath="url(#rec-tile-clip)">
          <circle cx="88" cy="168" r="4.6" fill="#fff" fillOpacity="0.88" />
          <path d="M79.5 186 A8.5 8 0 0 1 96.5 186 Z" fill="#fff" fillOpacity="0.72" />
        </g>
        <circle cx="75" cy="162.5" r="1.8" fill="#ff8a3d" />
        <text x="116" y="164" fontFamily={FONT} fontSize="7.5" fontWeight="800" fill={INK}>
          AI Interview
        </text>
        {[5, 9, 14, 8, 16, 10, 6, 12, 7].map((h, i) => (
          <rect
            key={i}
            x={116 + i * 5.6}
            y={174 - h / 2}
            width="2.6"
            height={h}
            rx="1.3"
            fill="#7c6cf0"
            fillOpacity={0.5 + (h / 16) * 0.5}
          />
        ))}
        <rect x="116" y="181.5" width="44" height="2.6" rx="1.3" fill={MUTED} fillOpacity="0.28" />
      </motion.g>

      <path
        d="M181.5 171 H186.5 M184.2 168.4 L186.9 171 L184.2 173.6"
        stroke="#fff"
        strokeOpacity="0.9"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Scorecard */}
      <motion.g {...float(reduced, 2.5, 6.2, 0.9)}>
        <rect
          x="190"
          y="152"
          width="156"
          height="38"
          rx="10"
          fill="#fff"
          fillOpacity="0.93"
          stroke="#fff"
          strokeOpacity="0.9"
          filter="url(#rec-shadow-card)"
        />
        <circle cx="212" cy="171" r="11" fill="none" stroke="#e6e5fc" strokeWidth="4" />
        <circle
          cx="212"
          cy="171"
          r="11"
          fill="none"
          stroke="url(#rec-accent)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="63.6 69.1"
          transform="rotate(-90 212 171)"
        />
        <text x="212" y="173.8" textAnchor="middle" fontFamily={FONT} fontSize="7.5" fontWeight="800" fill={INK}>
          92
        </text>
        <text x="232" y="165" fontFamily={FONT} fontSize="8.5" fontWeight="800" fill={INK}>
          Scorecard
        </text>
        {[0.9, 0.75, 0.85].map((p, i) => (
          <g key={i}>
            <rect x={232 + i * 28} y="170.5" width="24" height="7" rx="3.5" fill="#e6e5fc" />
            <rect x={232 + i * 28} y="170.5" width={24 * p} height="7" rx="3.5" fill="#7c6cf0" fillOpacity={0.35 + i * 0.1} />
          </g>
        ))}
        <rect x="232" y="182" width="70" height="2.6" rx="1.3" fill={MUTED} fillOpacity="0.26" />
        <circle cx="328" cy="171" r="7.5" fill="#5b5bd6" />
        <path d="M324.6 171.2 l2.5 2.6 4.4 -5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>
    </svg>
  )
}
