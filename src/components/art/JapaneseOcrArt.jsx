import { motion, useReducedMotion } from 'framer-motion'
import { INK, BRAND, FONT, float } from './shared'

// Pale skeleton bars, lighter than the shared MUTED text colour.
const MUTED = '#c7c9e8'
const FONT_JA = 'Inter, Noto Sans JP, Yu Gothic, Hiragino Sans, sans-serif'

const BARS = [1.2, 0.8, 1.8, 0.8, 1, 1.6, 0.8, 1.2, 1.8, 0.8, 1, 1.4, 0.8, 1.6, 1]
const barcode = BARS.reduce(
  (acc, w) => {
    acc.items.push({ x: acc.x, w })
    acc.x += w + 1.1
    return acc
  },
  { x: 20, items: [] },
).items

const FIELDS = [
  { y: 82, key: 34, value: 96, hot: true },
  { y: 103, key: 28, value: 112 },
  { y: 124, key: 40, value: 70 },
]

function Connector({ d }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={BRAND}
      strokeOpacity="0.8"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeDasharray="2.6 3.6"
    />
  )
}

function FieldGlyph({ index, y }) {
  const props = { fill: 'none', stroke: BRAND, strokeWidth: 1, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (index === 0) {
    return (
      <g fill={BRAND}>
        <circle cx="185" cy={y + 8} r="1.9" />
        <path d={`M181.6 ${y + 13.2} c0 -2.3 1.5 -3.3 3.4 -3.3 s3.4 1 3.4 3.3z`} />
      </g>
    )
  }
  if (index === 1) {
    return (
      <g {...props}>
        <rect x="181.8" y={y + 6.2} width="6.4" height="6" rx="1.2" />
        <path d={`M181.8 ${y + 8.6} h6.4 M183.6 ${y + 5} v2.2 M186.4 ${y + 5} v2.2`} />
      </g>
    )
  }
  return (
    <g {...props}>
      <path
        d={`M183.6 ${y + 5.8} l-0.8 7.2 M187.2 ${y + 5.8} l-0.8 7.2 M181.6 ${y + 8.4} h6.4 M181.2 ${y + 10.9} h6.4`}
      />
    </g>
  )
}

export default function JapaneseOcrArt() {
  const reduced = useReducedMotion()

  return (
    <svg
      viewBox="0 0 360 200"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ocr-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eceafd" />
          <stop offset="0.55" stopColor="#c9c8f6" />
          <stop offset="1" stopColor="#aab0ee" />
        </linearGradient>
        <radialGradient id="ocr-glow-a" cx="0.15" cy="0.1" r="0.7">
          <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ocr-glow-b" cx="0.95" cy="0.9" r="0.55">
          <stop offset="0" stopColor="#8b8ef0" stopOpacity="0.38" />
          <stop offset="1" stopColor="#8b8ef0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ocr-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.94" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.82" />
        </linearGradient>
        <linearGradient id="ocr-brand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7c6cf0" />
          <stop offset="1" stopColor="#5b5bd6" />
        </linearGradient>
        <linearGradient id="ocr-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={BRAND} stopOpacity="0" />
          <stop offset="1" stopColor={BRAND} stopOpacity="0.3" />
        </linearGradient>
        <filter id="ocr-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="7" stdDeviation="5" floodColor="#3c3c8c" floodOpacity="0.2" />
        </filter>
        <filter id="ocr-shadow-sm" x="-30%" y="-30%" width="160%" height="190%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.6" floodColor="#3c3c8c" floodOpacity="0.17" />
        </filter>
        <filter id="ocr-blur" x="-10%" y="-400%" width="120%" height="900%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <clipPath id="ocr-doc-clip">
          <rect x="10" y="16" width="94" height="140" rx="11" />
        </clipPath>
        <clipPath id="ocr-portrait-clip">
          <rect x="20" y="40" width="32" height="40" rx="6" />
        </clipPath>
      </defs>

      <rect width="360" height="200" fill="url(#ocr-bg)" />
      <rect width="360" height="200" fill="url(#ocr-glow-a)" />
      <rect width="360" height="200" fill="url(#ocr-glow-b)" />

      {/* connectors run under the cards and the node so floats never open a gap */}
      <Connector d="M104 52 C116 52 114 82 126 84" />
      <Connector d="M104 86 H126" />
      <Connector d="M104 120 C116 120 114 90 126 88" />
      <Connector d="M138 84 C150 84 150 56 160 56" />
      <Connector d="M138 86 C150 86 150 91.5 160 91.5" />
      <Connector d="M138 88 C150 90 150 133.5 160 133.5" />
      <Connector d="M52 176 H80" />
      <Connector d="M120 176 H148" />
      <Connector d="M188 176 H216" />
      <Connector d="M256 176 H319" />

      {/* source document */}
      <motion.g {...float(reduced, 3, 5.6)}>
        <rect
          x="10"
          y="16"
          width="94"
          height="140"
          rx="11"
          fill="url(#ocr-glass)"
          stroke="#fff"
          strokeOpacity="0.9"
          filter="url(#ocr-shadow)"
        />
        <circle cx="24" cy="29" r="5" fill="url(#ocr-brand)" />
        <rect x="33" y="27.3" width="28" height="3.4" rx="1.7" fill={INK} fillOpacity="0.55" />
        <rect x="80" y="26" width="16" height="6" rx="3" fill={BRAND} fillOpacity="0.14" />

        <rect x="20" y="40" width="32" height="40" rx="6" fill="#e4e5fa" stroke="#fff" />
        <g clipPath="url(#ocr-portrait-clip)" fill="#a9acea">
          <circle cx="36" cy="54" r="7" />
          <path d="M22 82 v-5 c0 -7.5 6 -12 14 -12 s14 4.5 14 12 v5z" />
        </g>

        <rect x="60" y="44.5" width="28" height="4.2" rx="2.1" fill={INK} fillOpacity="0.75" />
        <rect x="60" y="53" width="34" height="3" rx="1.5" fill={MUTED} />
        <rect x="60" y="60" width="24" height="3" rx="1.5" fill={MUTED} />
        <rect x="60" y="72" width="30" height="3.4" rx="1.7" fill={INK} fillOpacity="0.5" />

        <g fill="none" stroke={BRAND} strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.75">
          <rect x="56.5" y="41" width="41" height="25" rx="3.5" fill={BRAND} fillOpacity="0.06" />
          <rect x="56.5" y="68.6" width="41" height="10" rx="3" fill={BRAND} fillOpacity="0.06" />
        </g>

        <rect x="20" y="90" width="22" height="2.8" rx="1.4" fill={MUTED} />
        <rect x="20" y="96" width="64" height="3.6" rx="1.8" fill={INK} fillOpacity="0.55" />
        <rect x="20" y="108" width="28" height="2.8" rx="1.4" fill={MUTED} />
        <rect x="20" y="114" width="46" height="3.6" rx="1.8" fill={INK} fillOpacity="0.55" />

        <g fill={INK} fillOpacity="0.6">
          {barcode.map((b) => (
            <rect key={b.x} x={b.x} y="134" width={b.w} height="12" />
          ))}
        </g>
        <rect x="79" y="133.5" width="13" height="13" rx="3" fill="#e5484d" fillOpacity="0.88" />
        <path
          d="M82.4 136.9 h6.2 v6.2 h-6.2 z M82.4 140 h6.2"
          fill="none"
          stroke="#fff"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />

        {/* OCR scan sweep */}
        <g clipPath="url(#ocr-doc-clip)">
          <motion.g
            {...(reduced
              ? { style: { y: 48 } }
              : {
                  initial: { y: 0, opacity: 0 },
                  animate: { y: [0, 114], opacity: [0, 1, 1, 0] },
                  transition: {
                    duration: 3.2,
                    repeat: Infinity,
                    repeatDelay: 0.6,
                    ease: 'easeInOut',
                    times: [0, 0.12, 0.88, 1],
                  },
                })}
          >
            <rect x="10" y="16" width="94" height="26" fill="url(#ocr-scan)" />
            <rect x="10" y="40.4" width="94" height="2" fill={BRAND} opacity="0.7" filter="url(#ocr-blur)" />
            <rect x="10" y="41" width="94" height="1.4" fill={BRAND} />
          </motion.g>
        </g>
      </motion.g>

      {/* OCR to LLM node */}
      <motion.g {...float(reduced, 1.5, 4.8, 0.4)}>
        <circle cx="132" cy="86" r="17" fill="#fff" fillOpacity="0.4" />
        <circle cx="132" cy="86" r="13.5" fill="#fff" fillOpacity="0.75" />
        <circle cx="132" cy="86" r="11" fill="url(#ocr-brand)" filter="url(#ocr-shadow-sm)" />
        <g fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M126.8 82 v-2.6 h2.6 M134.6 79.4 h2.6 v2.6 M137.2 90 v2.6 h-2.6 M129.4 92.6 h-2.6 v-2.6" />
        </g>
        <circle cx="132" cy="86" r="1.9" fill="#fff" />
      </motion.g>

      {/* structured output panel */}
      <motion.g {...float(reduced, 3, 6.6, 0.9)}>
        <rect
          x="160"
          y="12"
          width="190"
          height="144"
          rx="14"
          fill="url(#ocr-glass)"
          stroke="#fff"
          strokeOpacity="0.9"
          filter="url(#ocr-shadow)"
        />
        <g fill="#c5c7ea">
          <circle cx="173" cy="21.5" r="1.7" />
          <circle cx="180" cy="21.5" r="1.7" />
          <circle cx="187" cy="21.5" r="1.7" />
        </g>
        <rect x="316" y="19" width="24" height="5" rx="2.5" fill="#d8daf3" />

        <rect x="170" y="28" width="170" height="34" rx="9" fill="#eef0fd" stroke="#fff" />
        <text
          x="180"
          y="52"
          fontFamily={FONT_JA}
          fontSize="20"
          fontWeight="800"
          fill={INK}
        >
          ドキュメント
        </text>
        <g fontFamily={FONT} fontSize="5.4" fontWeight="700" textAnchor="middle">
          <rect x="308" y="33.5" width="26" height="9" rx="4.5" fill={BRAND} fillOpacity="0.12" stroke={BRAND} strokeOpacity="0.3" strokeWidth="0.8" />
          <text x="321" y="39.8" fill={BRAND}>DOCX</text>
          <rect x="308" y="46.5" width="26" height="9" rx="4.5" fill="#22a06b" fillOpacity="0.12" stroke="#22a06b" strokeOpacity="0.35" strokeWidth="0.8" />
          <text x="321" y="52.8" fill="#1b8a5a">XLSX</text>
        </g>

        <rect x="170" y="69.5" width="170" height="3.2" rx="1.6" fill="#dcdef5" />
        <rect x="170" y="69.5" width="74" height="3.2" rx="1.6" fill="url(#ocr-brand)" />

        <rect x="170" y="78" width="170" height="70" rx="10" fill="#fff" fillOpacity="0.92" stroke="#e6e7f8" />
        {FIELDS.map((f, i) => (
          <g key={f.y}>
            {f.hot && (
              <rect
                x="174"
                y={f.y}
                width="162"
                height="19"
                rx="6"
                fill={BRAND}
                fillOpacity="0.08"
                stroke={BRAND}
                strokeOpacity="0.28"
                strokeWidth="0.8"
              />
            )}
            <rect x="179" y={f.y + 3.5} width="12" height="12" rx="3.5" fill={BRAND} fillOpacity="0.14" />
            <FieldGlyph index={i} y={f.y} />
            <rect x="197" y={f.y + 4.2} width={f.key} height="3.2" rx="1.6" fill={INK} fillOpacity="0.72" />
            <rect x="197" y={f.y + 11} width={f.value} height="3" rx="1.5" fill={MUTED} />
            <circle cx="326" cy={f.y + 9.5} r="4.6" fill={BRAND} fillOpacity="0.14" />
            <path
              d={`M323.7 ${f.y + 9.6} l1.6 1.6 3.1 -3.3`}
              fill="none"
              stroke={BRAND}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ))}
      </motion.g>

      {/* OCR, LLM, API, AWS stages */}
      {[
        { x: 12, label: 'OCR', dot: BRAND },
        { x: 80, label: 'LLM', dot: '#a855f7' },
        { x: 148, label: 'API', dot: '#7c6cf0' },
        { x: 216, label: 'AWS', dot: '#ff8a3d' },
      ].map((chip) => (
        <g key={chip.label}>
          <rect
            x={chip.x}
            y="168"
            width="40"
            height="16"
            rx="8"
            fill="url(#ocr-glass)"
            stroke="#fff"
            strokeOpacity="0.9"
            filter="url(#ocr-shadow-sm)"
          />
          <circle cx={chip.x + 10} cy="176" r="2.3" fill={chip.dot} />
          <text
            x={chip.x + 16.5}
            y="178.5"
            fontFamily={FONT}
            fontSize="7"
            fontWeight="700"
            fill={INK}
          >
            {chip.label}
          </text>
        </g>
      ))}

      {/* cloud deployment node */}
      <g transform="translate(8 0)">
        <g fill="#fff" opacity="0.8" filter="url(#ocr-shadow-sm)">
          <rect x="312" y="175" width="26" height="11" rx="5.5" />
          <circle cx="320" cy="175" r="5.5" />
          <circle cx="328.5" cy="172.5" r="7.5" />
        </g>
        <path
          d="M325.5 182 V174 M322.2 177.2 L325.5 174 L328.8 177.2"
          fill="none"
          stroke={BRAND}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
