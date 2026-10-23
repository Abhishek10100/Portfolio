import { motion, useReducedMotion } from 'framer-motion'
import { INK, MUTED, FONT, float, Sparkle } from './shared'

const LANE = 177
const THUMB_TINTS = ['#5b5bd6', '#a855f7', '#ff8a3d', '#7c6cf0', '#5b8cff']

function MiniSlide({ x, y, w = 13, h = 8.5, tint = '#5b5bd6' }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="1.6"
        fill="#fff"
        fillOpacity="0.96"
        stroke="#c5c8f3"
        strokeWidth="0.6"
      />
      <rect x={x + 2} y={y + 2} width={w * 0.5} height="1.4" rx="0.7" fill={INK} fillOpacity="0.5" />
      <rect x={x + 2} y={y + h - 3.4} width={w * 0.34} height="1.8" rx="0.9" fill={tint} fillOpacity="0.7" />
    </g>
  )
}

/** Doc to deck: a slide editor, the generated PPTX and a RAG flow underneath. */
export default function AlgoCreatorArt() {
  const reduced = useReducedMotion()

  // One dash cycle (4 + 5) per loop so the flow never visibly resets.
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
        <linearGradient id="algo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eceafd" />
          <stop offset="0.55" stopColor="#c9c8f6" />
          <stop offset="1" stopColor="#aab0ee" />
        </linearGradient>
        <radialGradient id="algo-glow-light">
          <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="algo-glow-violet">
          <stop offset="0" stopColor="#a855f7" stopOpacity="0.28" />
          <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="algo-floor">
          <stop offset="0" stopColor="#4a4ab8" stopOpacity="0.2" />
          <stop offset="1" stopColor="#4a4ab8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="algo-halo">
          <stop offset="0" stopColor="#7c6cf0" stopOpacity="0.6" />
          <stop offset="0.6" stopColor="#7c6cf0" stopOpacity="0.16" />
          <stop offset="1" stopColor="#7c6cf0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="algo-core" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#b6bdff" />
          <stop offset="1" stopColor="#5b5bd6" />
        </radialGradient>
        <linearGradient id="algo-btn" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b5bd6" />
          <stop offset="1" stopColor="#7c6cf0" />
        </linearGradient>
        <linearGradient id="algo-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6f9bff" />
          <stop offset="1" stopColor="#4a55d6" />
        </linearGradient>
        <linearGradient id="algo-ppt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffa263" />
          <stop offset="1" stopColor="#ee5a22" />
        </linearGradient>
        <filter id="algo-shadow" x="-12%" y="-12%" width="124%" height="136%">
          <feDropShadow dx="0" dy="7" stdDeviation="4.5" floodColor="#3c3c8c" floodOpacity="0.2" />
        </filter>
        <filter id="algo-shadow-sm" x="-50%" y="-50%" width="200%" height="220%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#3c3c8c" floodOpacity="0.2" />
        </filter>
      </defs>

      <rect width="360" height="200" fill="url(#algo-bg)" />
      <circle cx="70" cy="30" r="120" fill="url(#algo-glow-light)" />
      <circle cx="330" cy="175" r="90" fill="url(#algo-glow-violet)" />
      <ellipse cx="110" cy="154" rx="96" ry="7" fill="url(#algo-floor)" />

      {/* Slide editor window */}
      <motion.g {...float(reduced, 2.5, 6)}>
        <path d="M96 139 H124 L128 150 H92 Z" fill="#fff" fillOpacity="0.72" />
        <rect x="76" y="149" width="68" height="5" rx="2.5" fill="#fff" fillOpacity="0.9" />
        <rect
          x="16"
          y="8"
          width="188"
          height="132"
          rx="11"
          fill="#fff"
          fillOpacity="0.93"
          stroke="#fff"
          strokeOpacity="0.9"
          filter="url(#algo-shadow)"
        />

        <circle cx="31" cy="19" r="4.5" fill="url(#algo-btn)" />
        <rect x="40" y="17.2" width="22" height="3.6" rx="1.8" fill={INK} fillOpacity="0.55" />
        <rect x="142" y="17.5" width="14" height="3" rx="1.5" fill={MUTED} fillOpacity="0.4" />
        <rect x="160" y="17.5" width="14" height="3" rx="1.5" fill={MUTED} fillOpacity="0.4" />
        <rect x="180" y="14.5" width="16" height="9" rx="4.5" fill="none" stroke="#c5c8f3" strokeWidth="0.8" />
        <line x1="22" x2="198" y1="29" y2="29" stroke="#e4e4f6" strokeWidth="0.8" />

        <text x="30" y="52" fontFamily={FONT} fontSize="15" fontWeight="800" fill={INK} letterSpacing="-0.4">
          Turn Documents
        </text>
        <text x="30" y="70" fontFamily={FONT} fontSize="15" fontWeight="800" fill={INK} letterSpacing="-0.4">
          into <tspan fill="#5b5bd6">Presentations</tspan>
        </text>
        <rect x="30" y="80" width="128" height="3.4" rx="1.7" fill={MUTED} fillOpacity="0.32" />
        <rect x="30" y="88" width="102" height="3.4" rx="1.7" fill={MUTED} fillOpacity="0.24" />

        <rect x="30" y="99" width="54" height="15" rx="7.5" fill="url(#algo-btn)" />
        <text x="57" y="109.3" textAnchor="middle" fontFamily={FONT} fontSize="7.5" fontWeight="700" fill="#fff">
          Generate
        </text>
        <rect x="92" y="105" width="38" height="3.4" rx="1.7" fill={MUTED} fillOpacity="0.28" />

        {THUMB_TINTS.map((tint, i) => (
          <g key={tint}>
            <rect
              x={30 + i * 32}
              y="118"
              width="28"
              height="16"
              rx="3"
              fill="#f3f2fd"
              stroke={i === 1 ? '#5b5bd6' : '#dcdcf3'}
              strokeWidth={i === 1 ? 1.2 : 0.7}
            />
            <rect x={34 + i * 32} y="122" width="12" height="2.2" rx="1.1" fill={INK} fillOpacity="0.45" />
            <rect x={34 + i * 32} y="126.5" width="9" height="4" rx="1.2" fill={tint} fillOpacity="0.55" />
          </g>
        ))}
      </motion.g>

      {/* Generated-document panel */}
      <motion.g {...float(reduced, 3, 5.5, 0.8)}>
        <rect
          x="224"
          y="14"
          width="122"
          height="126"
          rx="12"
          fill="#fff"
          fillOpacity="0.84"
          stroke="#fff"
          strokeOpacity="0.9"
          filter="url(#algo-shadow)"
        />
        <circle cx="238" cy="27" r="4" fill="url(#algo-btn)" />
        <rect x="246" y="25.2" width="20" height="3.6" rx="1.8" fill={INK} fillOpacity="0.5" />
        <rect x="296" y="21" width="38" height="12" rx="6" fill="url(#algo-btn)" />
        <text x="315" y="29.3" textAnchor="middle" fontFamily={FONT} fontSize="6.5" fontWeight="700" fill="#fff">
          Export
        </text>

        <rect
          x="236"
          y="42"
          width="48"
          height="58"
          rx="8"
          fill="#fff"
          stroke="#e6e6f8"
          strokeWidth="0.8"
          filter="url(#algo-shadow-sm)"
        />
        <path
          d="M248 50 H266 L275 59 V89 A3 3 0 0 1 272 92 H248 A3 3 0 0 1 245 89 V53 A3 3 0 0 1 248 50 Z"
          fill="#eef0ff"
          stroke="#c5c8f3"
          strokeWidth="0.8"
        />
        <path d="M266 50 V56 A3 3 0 0 0 269 59 H275 Z" fill="#c9ccf6" />
        <rect x="250" y="54" width="10" height="3" rx="1.5" fill="#5b5bd6" />
        <rect x="250" y="66" width="20" height="2.6" rx="1.3" fill="#8f93d6" fillOpacity="0.6" />
        <rect x="250" y="72" width="15" height="2.6" rx="1.3" fill="#8f93d6" fillOpacity="0.6" />
        <rect x="250" y="78" width="20" height="2.6" rx="1.3" fill="#8f93d6" fillOpacity="0.6" />
        <rect x="250" y="84" width="11" height="2.6" rx="1.3" fill="#8f93d6" fillOpacity="0.6" />

        <path d="M278 47 Q291 43 295 55" stroke="#5b5bd6" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M291.6 53.6 L298.6 53 L295.6 59.6 Z" fill="#5b5bd6" />

        <rect x="294" y="62" width="36" height="46" rx="5" fill="url(#algo-ppt)" filter="url(#algo-shadow-sm)" />
        <circle cx="317" cy="90" r="7" fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="3" />
        <path d="M322 62 H325 A5 5 0 0 1 330 67 V70 Z" fill="#fff" fillOpacity="0.35" />
        <rect x="284" y="74" width="24" height="24" rx="5" fill="#c8431a" filter="url(#algo-shadow-sm)" />
        <text x="296" y="91.4" textAnchor="middle" fontFamily={FONT} fontSize="17" fontWeight="800" fill="#fff">
          P
        </text>

        {[0, 1, 2].map((i) => (
          <g key={i} opacity={i === 2 ? 0.6 : 1}>
            <rect
              x={236 + i * 34}
              y="111"
              width="28"
              height="20"
              rx="4"
              fill="#fff"
              stroke="#e0e0f4"
              strokeWidth="0.8"
            />
            <rect x={241 + i * 34} y="116" width="13" height="2.4" rx="1.2" fill={INK} fillOpacity="0.45" />
            <rect x={241 + i * 34} y="121.5" width="10" height="5" rx="1.5" fill={THUMB_TINTS[(i + 1) % 5]} fillOpacity="0.5" />
          </g>
        ))}
      </motion.g>

      <motion.g {...float(reduced, 3, 5, 1.6)}>
        <circle
          cx="334"
          cy="146"
          r="11.5"
          fill="url(#algo-blue)"
          stroke="#fff"
          strokeOpacity="0.9"
          filter="url(#algo-shadow-sm)"
        />
        <Sparkle cx={334} cy={146} s={1.15} />
      </motion.g>

      {/* Retrieval flow: slide repository -> LLM core -> generated deck */}
      <g>
        <g opacity="0.8">
          <MiniSlide x={10} y={174} w={22} h={13} tint="#a855f7" />
          <MiniSlide x={14} y={171} w={22} h={13} tint="#ff8a3d" />
          <MiniSlide x={18} y={168} w={22} h={13} tint="#5b5bd6" />
        </g>

        <motion.path
          d={`M46 ${LANE} H164`}
          stroke="#5b5bd6"
          strokeOpacity="0.6"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="4 5"
          fill="none"
          {...flow}
        />
        <motion.path
          d={`M202 ${LANE} H270`}
          stroke="#5b5bd6"
          strokeOpacity="0.6"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="4 5"
          fill="none"
          {...flow}
        />

        {reduced
          ? [58, 110].map((x) => <MiniSlide key={x} x={x} y={LANE - 4.25} tint="#7c6cf0" />)
          : [0, 1, 2].map((i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                animate={{ x: [0, 108], opacity: [0, 1, 1, 0] }}
                transition={{
                  x: { duration: 3.4, repeat: Infinity, ease: 'linear', delay: i * 1.13 },
                  opacity: {
                    duration: 3.4,
                    times: [0, 0.12, 0.84, 1],
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 1.13,
                  },
                }}
              >
                <MiniSlide x={46} y={LANE - 4.25} tint={THUMB_TINTS[i]} />
              </motion.g>
            ))}

        <motion.circle
          cx="186"
          cy={LANE}
          r="23"
          fill="url(#algo-halo)"
          {...(reduced
            ? {}
            : {
                animate: { scale: [1, 1.16, 1], opacity: [0.95, 0.55, 0.95] },
                transition: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' },
              })}
        />
        <circle cx="186" cy={LANE} r="13" fill="#fff" fillOpacity="0.94" stroke="#c6c8f5" strokeWidth="0.8" filter="url(#algo-shadow-sm)" />
        <circle cx="186" cy={LANE} r="8.2" fill="url(#algo-core)" />
        <Sparkle cx={186} cy={LANE} s={0.85} />

        {[0, 1, 2].map((i) => (
          <motion.g key={i} {...float(reduced, 1.5, 4 + i * 0.5, i * 0.4)}>
            <rect
              x={276 + i * 12}
              y={172 - i * 3}
              width="28"
              height="17"
              rx="3"
              fill="#fff"
              fillOpacity="0.95"
              stroke="#c5c8f3"
              strokeWidth="0.7"
              filter="url(#algo-shadow-sm)"
            />
            <rect x={281 + i * 12} y={176.5 - i * 3} width="13" height="2.4" rx="1.2" fill={INK} fillOpacity="0.5" />
            <rect x={281 + i * 12} y={181.5 - i * 3} width="10" height="4.5" rx="1.4" fill={THUMB_TINTS[(i + 2) % 5]} fillOpacity="0.6" />
          </motion.g>
        ))}
        <circle cx="328" cy="166" r="5" fill="#5b5bd6" stroke="#fff" strokeWidth="1" />
        <path d="M325.8 166.2 l1.7 1.8 3.2 -3.6" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  )
}
