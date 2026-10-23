import { motion, useReducedMotion } from 'framer-motion'
import { INK, MUTED, FONT, float, Sparkle } from './shared'

const AGENTS = [
  { y: 52, label: 'ALERTS', active: true },
  { y: 100, label: 'LIVE', active: false },
  { y: 148, label: 'KPI', active: false },
]

const LANGS = ['EN', 'हिन्दी', 'मराठी', '日本語']

/** Operator chat on the left, a supervisor routing to one of many agents on the right. */
export default function SurveillanceArt() {
  const reduced = useReducedMotion()

  const flow = reduced
    ? {}
    : {
        animate: { strokeDashoffset: [0, -9] },
        transition: { duration: 0.8, repeat: Infinity, ease: 'linear' },
      }

  return (
    <svg
      viewBox="0 0 360 200"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sv-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6e9ff" />
          <stop offset="0.5" stopColor="#b9c0f6" />
          <stop offset="1" stopColor="#8e9ae8" />
        </linearGradient>
        <radialGradient id="sv-glow">
          <stop offset="0" stopColor="#fff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sv-halo">
          <stop offset="0" stopColor="#5b5bd6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#5b5bd6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sv-core" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7c8cff" />
          <stop offset="1" stopColor="#4a44c4" />
        </linearGradient>
        <linearGradient id="sv-cam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c5ccff" />
          <stop offset="1" stopColor="#8f9be8" />
        </linearGradient>
        <filter id="sv-shadow" x="-12%" y="-12%" width="124%" height="136%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#2c2c78" floodOpacity="0.22" />
        </filter>
        <filter id="sv-shadow-sm" x="-50%" y="-50%" width="200%" height="220%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#2c2c78" floodOpacity="0.22" />
        </filter>
        <clipPath id="sv-thumb">
          <rect x="30" y="86" width="40" height="26" rx="4" />
        </clipPath>
      </defs>

      <rect width="360" height="200" fill="url(#sv-bg)" />
      <circle cx="60" cy="20" r="120" fill="url(#sv-glow)" />

      {/* Operator chat */}
      <motion.g {...float(reduced, 2.5, 6)}>
        <rect
          x="14"
          y="14"
          width="156"
          height="148"
          rx="11"
          fill="#fff"
          fillOpacity="0.93"
          stroke="#fff"
          filter="url(#sv-shadow)"
        />
        <circle cx="28" cy="29" r="4" fill="#5b5bd6" />
        <rect x="36" y="27" width="40" height="4" rx="2" fill={INK} fillOpacity="0.55" />
        <rect x="138" y="26" width="22" height="7" rx="3.5" fill="#34c38f" fillOpacity="0.25" />
        <circle cx="145" cy="29.5" r="1.8" fill="#1f9d6e" />

        {/* user bubble */}
        <rect x="64" y="42" width="96" height="22" rx="8" fill="url(#sv-core)" />
        <text x="72" y="52.5" fontFamily={FONT} fontSize="6.4" fontWeight="600" fill="#fff">
          Any alerts near Gate 2
        </text>
        <text x="72" y="60.5" fontFamily={FONT} fontSize="6.4" fontWeight="600" fill="#fff">
          in the last hour?
        </text>

        {/* agent reply */}
        <rect x="22" y="72" width="108" height="50" rx="8" fill="#eef0ff" />
        <g clipPath="url(#sv-thumb)">
          <rect x="30" y="86" width="40" height="26" fill="url(#sv-cam)" />
          <rect x="34" y="98" width="14" height="14" fill="#6b76d6" fillOpacity="0.55" />
          <rect x="50" y="94" width="16" height="18" fill="#5b5bd6" fillOpacity="0.4" />
        </g>
        <rect x="30" y="86" width="40" height="26" rx="4" fill="none" stroke="#fff" strokeWidth="1" />
        <rect x="52" y="89" width="14" height="6" rx="3" fill="#ff5c7a" />
        <text x="54.3" y="93.4" fontFamily={FONT} fontSize="4.6" fontWeight="700" fill="#fff">
          ALERT
        </text>
        <rect x="78" y="80" width="46" height="4" rx="2" fill={INK} fillOpacity="0.55" />
        <rect x="78" y="89" width="40" height="3.4" rx="1.7" fill={MUTED} fillOpacity="0.55" />
        <rect x="78" y="96" width="44" height="3.4" rx="1.7" fill={MUTED} fillOpacity="0.55" />
        <rect x="78" y="103" width="30" height="3.4" rx="1.7" fill={MUTED} fillOpacity="0.55" />

        {/* language chips */}
        {LANGS.map((l, i) => (
          <g key={l} transform={`translate(${22 + i * 37} 132)`}>
            <rect width="33" height="14" rx="7" fill="#eef0ff" stroke="#c5c8f3" strokeWidth="0.6" />
            <text
              x="16.5"
              y="9.6"
              textAnchor="middle"
              fontFamily={`${FONT}, 'Noto Sans Devanagari', 'Noto Sans JP', sans-serif`}
              fontSize="6.2"
              fontWeight="700"
              fill="#4a44c4"
            >
              {l}
            </text>
          </g>
        ))}
      </motion.g>

      {/* Supervisor router */}
      <circle cx="226" cy="100" r="30" fill="url(#sv-halo)" />
      <motion.g {...float(reduced, 2, 5, 0.4)}>
        <circle cx="226" cy="100" r="17" fill="#fff" fillOpacity="0.95" filter="url(#sv-shadow-sm)" />
        <circle cx="226" cy="100" r="10.5" fill="url(#sv-core)" />
        <path d="M221 100 h10 M226 95 v10" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        <Sparkle cx={238} cy={86} s={0.8} />
      </motion.g>
      <text x="226" y="128" textAnchor="middle" fontFamily={FONT} fontSize="6" fontWeight="700" fill="#2c2c78">
        SUPERVISOR
      </text>

      {/* Link from chat to router */}
      <path
        d="M170 88 C 190 88, 198 100, 209 100"
        stroke="#fff"
        strokeWidth="1.6"
        strokeDasharray="4 5"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <motion.path
        d="M170 88 C 190 88, 198 100, 209 100"
        stroke="#4a44c4"
        strokeWidth="1.2"
        strokeDasharray="4 5"
        strokeLinecap="round"
        fill="none"
        {...flow}
      />

      {/* Agents */}
      {AGENTS.map((a) => (
        <g key={a.label}>
          <path
            d={`M243 100 C 262 100, 268 ${a.y}, 288 ${a.y}`}
            stroke={a.active ? '#4a44c4' : '#fff'}
            strokeWidth={a.active ? 1.6 : 1.2}
            strokeDasharray={a.active ? '4 5' : undefined}
            strokeLinecap="round"
            fill="none"
            opacity={a.active ? 1 : 0.7}
          />
          {a.active && (
            <motion.path
              d={`M243 100 C 262 100, 268 ${a.y}, 288 ${a.y}`}
              stroke="#fff"
              strokeWidth="1"
              strokeDasharray="4 5"
              strokeLinecap="round"
              fill="none"
              {...flow}
            />
          )}
          <motion.g {...float(reduced, 1.6, 5.5, a.y / 100)}>
            <rect
              x="288"
              y={a.y - 13}
              width="58"
              height="26"
              rx="8"
              fill="#fff"
              fillOpacity={a.active ? 0.97 : 0.8}
              stroke={a.active ? '#5b5bd6' : '#fff'}
              strokeWidth={a.active ? 1.2 : 0.8}
              filter="url(#sv-shadow-sm)"
            />
            <circle cx="300" cy={a.y} r="5" fill={a.active ? 'url(#sv-core)' : '#c5c8f3'} />
            <text
              x="310"
              y={a.y + 2.3}
              fontFamily={FONT}
              fontSize="6.4"
              fontWeight="700"
              fill={a.active ? '#4a44c4' : MUTED}
            >
              {a.label}
            </text>
          </motion.g>
        </g>
      ))}

      <text x="317" y="178" textAnchor="middle" fontFamily={FONT} fontSize="5.8" fontWeight="600" fill="#2c2c78" fillOpacity="0.75">
        + 9 more agents
      </text>
    </svg>
  )
}
