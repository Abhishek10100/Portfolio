import { motion, useReducedMotion } from 'framer-motion'

/**
 * Abstract per-project artwork. Built as inline SVG rather than raster
 * screenshots so it themes correctly and animates on hover.
 */

const float = (reduced, delay = 0) =>
  reduced
    ? {}
    : {
        animate: { y: [0, -4, 0] },
        transition: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay },
      }

function Frame({ children }) {
  return (
    <svg
      viewBox="0 0 320 170"
      className="h-full w-full"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pa-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-2)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--violet)" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <rect width="320" height="170" fill="url(#pa-sheen)" />
      {children}
    </svg>
  )
}

const card = 'var(--surface)'
const line = 'var(--border-2)'
const soft = 'var(--text-3)'

/** AlgoCreator — slides fanning out of a document stack. */
function DeckArt({ reduced }) {
  return (
    <Frame>
      <g opacity="0.95">
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={30 + i * 6}
            y={44 - i * 6}
            width="86"
            height="64"
            rx="6"
            fill={card}
            stroke={line}
          />
        ))}
        <rect x="46" y="48" width="52" height="4" rx="2" fill={soft} />
        <rect x="46" y="58" width="38" height="4" rx="2" fill={soft} opacity="0.6" />
        <rect x="46" y="70" width="54" height="22" rx="3" fill="var(--brand)" opacity="0.18" />
      </g>

      <path
        d="M128 76 h34"
        stroke="var(--brand)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
      />
      <circle cx="176" cy="76" r="17" fill="var(--brand)" opacity="0.14" />
      <circle cx="176" cy="76" r="8" fill="var(--brand)" opacity="0.5" />
      <path
        d="M196 76 h26"
        stroke="var(--brand)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
      />

      <motion.g {...float(reduced)}>
        <rect x="228" y="42" width="62" height="70" rx="7" fill={card} stroke={line} />
        <rect x="238" y="54" width="42" height="18" rx="3" fill="var(--violet)" opacity="0.28" />
        <rect x="238" y="80" width="42" height="3.5" rx="1.75" fill={soft} />
        <rect x="238" y="89" width="30" height="3.5" rx="1.75" fill={soft} opacity="0.6" />
      </motion.g>
    </Frame>
  )
}

/** AI Recruiting — candidate cards scored by an agent node. */
function AgentArt({ reduced }) {
  return (
    <Frame>
      <motion.g {...float(reduced, 0.3)}>
        {[0, 1].map((i) => (
          <g key={i}>
            <rect
              x="26"
              y={40 + i * 46}
              width="96"
              height="38"
              rx="7"
              fill={card}
              stroke={line}
            />
            <circle cx="46" cy={59 + i * 46} r="9" fill="var(--brand)" opacity="0.22" />
            <rect x="62" y={53 + i * 46} width="44" height="3.5" rx="1.75" fill={soft} />
            <rect
              x="62"
              y={62 + i * 46}
              width="28"
              height="3.5"
              rx="1.75"
              fill={soft}
              opacity="0.6"
            />
          </g>
        ))}
      </motion.g>

      <path
        d="M130 62 C 152 62, 152 85, 172 85"
        stroke="var(--brand)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M130 108 C 152 108, 152 85, 172 85"
        stroke="var(--brand)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />

      <circle cx="190" cy="85" r="19" fill="var(--brand)" opacity="0.15" />
      <circle cx="190" cy="85" r="10" fill="var(--brand)" opacity="0.45" />

      <path d="M212 85 h20" stroke="var(--brand)" strokeWidth="1.5" opacity="0.7" />

      <motion.g {...float(reduced)}>
        <rect x="238" y="50" width="56" height="70" rx="7" fill={card} stroke={line} />
        <rect x="248" y="62" width="36" height="3.5" rx="1.75" fill={soft} />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x="248"
            y={76 + i * 12}
            width={30 - i * 7}
            height="6"
            rx="3"
            fill="var(--violet)"
            opacity={0.5 - i * 0.12}
          />
        ))}
      </motion.g>
    </Frame>
  )
}

/** Enterprise RAG — a query fanning into retrieved chunks. */
function SearchArt({ reduced }) {
  return (
    <Frame>
      <rect x="26" y="70" width="82" height="30" rx="15" fill={card} stroke={line} />
      <circle cx="45" cy="85" r="6.5" fill="none" stroke="var(--brand)" strokeWidth="2" />
      <path d="M50 90 l5 5" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" />
      <rect x="60" y="83" width="34" height="4" rx="2" fill={soft} />

      {[-30, 0, 30].map((dy, i) => (
        <path
          key={i}
          d={`M114 85 C 140 85, 140 ${85 + dy}, 166 ${85 + dy}`}
          stroke="var(--brand)"
          strokeWidth="1.4"
          fill="none"
          opacity="0.6"
        />
      ))}

      <motion.g {...float(reduced, 0.15)}>
        {[-30, 0, 30].map((dy, i) => (
          <g key={i}>
            <rect
              x="168"
              y={70 + dy}
              width="58"
              height="30"
              rx="6"
              fill={card}
              stroke={line}
            />
            <rect x="176" y={79 + dy} width="34" height="3.5" rx="1.75" fill={soft} />
            <rect
              x="176"
              y={87 + dy}
              width="22"
              height="3.5"
              rx="1.75"
              fill={soft}
              opacity="0.6"
            />
          </g>
        ))}
      </motion.g>

      <path d="M232 85 h18" stroke="var(--brand)" strokeWidth="1.5" opacity="0.7" />
      <circle cx="270" cy="85" r="20" fill="var(--violet)" opacity="0.16" />
      <circle cx="270" cy="85" r="10" fill="var(--violet)" opacity="0.45" />
    </Frame>
  )
}

/** Japanese OCR — scanned page resolving into structured fields. */
function OcrArt({ reduced }) {
  return (
    <Frame>
      <rect x="30" y="34" width="84" height="102" rx="7" fill={card} stroke={line} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x="42"
          y={50 + i * 16}
          width={i % 2 ? 44 : 60}
          height="6"
          rx="3"
          fill={soft}
          opacity={0.5}
        />
      ))}

      {/* scan sweep */}
      {!reduced && (
        <motion.rect
          x="30"
          width="84"
          height="3"
          fill="var(--brand)"
          opacity="0.55"
          animate={{ y: [36, 130, 36] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <path
        d="M122 85 h28"
        stroke="var(--brand)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <circle cx="166" cy="85" r="16" fill="var(--brand)" opacity="0.15" />
      <circle cx="166" cy="85" r="7" fill="var(--brand)" opacity="0.5" />
      <path
        d="M184 85 h24"
        stroke="var(--brand)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      <motion.g {...float(reduced, 0.2)}>
        <rect x="214" y="40" width="78" height="90" rx="7" fill={card} stroke={line} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect
              x="224"
              y={54 + i * 18}
              width="20"
              height="5"
              rx="2.5"
              fill="var(--violet)"
              opacity="0.45"
            />
            <rect
              x="250"
              y={54 + i * 18}
              width="32"
              height="5"
              rx="2.5"
              fill={soft}
              opacity="0.55"
            />
          </g>
        ))}
      </motion.g>
    </Frame>
  )
}

const arts = { deck: DeckArt, agent: AgentArt, search: SearchArt, ocr: OcrArt }

export default function ProjectArt({ kind }) {
  const reduced = useReducedMotion()
  const Art = arts[kind] ?? DeckArt
  return <Art reduced={reduced} />
}
