import { motion, useReducedMotion } from 'framer-motion'
import { INK, MUTED, BRAND, FONT, float } from './shared'

const SKELETON = '#d4d6ee'

/** Dashed connector whose dashes travel along the path. */
function Flow({ d, reduced, delay = 0, arrow = false }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={BRAND}
      strokeOpacity="0.85"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeDasharray="2.6 3.6"
      markerEnd={arrow ? 'url(#rag-arrow)' : undefined}
      {...(reduced
        ? {}
        : {
            animate: { strokeDashoffset: [0, -12.4] },
            transition: { duration: 1.2, repeat: Infinity, ease: 'linear', delay },
          })}
    />
  )
}

function DocCard({ cx, cy, rotate, tint, label, grid = false, reduced, delay }) {
  const w = 28
  const h = 34
  return (
    <motion.g {...float(reduced, 3, 5.4 + delay, delay)}>
      <g transform={`translate(${cx} ${cy}) rotate(${rotate})`}>
        <rect
          x={-w / 2}
          y={-h / 2}
          width={w}
          height={h}
          rx="4"
          fill="url(#rag-glass)"
          stroke="#fff"
          strokeOpacity="0.9"
          filter="url(#rag-shadow-sm)"
        />
        <rect x={-w / 2 + 4} y={-h / 2 + 4} width="17" height="7.5" rx="2" fill={tint} />
        <text
          x={-w / 2 + 12.5}
          y={-h / 2 + 9.6}
          textAnchor="middle"
          fontSize="5"
          fontWeight="700"
          fill="#fff"
          fontFamily={FONT}
        >
          {label}
        </text>
        {grid ? (
          <g fill={SKELETON}>
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => (
                <rect
                  key={`${r}${c}`}
                  x={-w / 2 + 4 + c * 7.4}
                  y={-h / 2 + 16 + r * 5.4}
                  width="6"
                  height="4"
                  rx="1"
                  fill={r === 1 && c === 1 ? tint : SKELETON}
                  opacity={r === 1 && c === 1 ? 0.55 : 1}
                />
              )),
            )}
          </g>
        ) : (
          <g fill={SKELETON}>
            <rect x={-w / 2 + 4} y={-h / 2 + 16} width="20" height="2.4" rx="1.2" />
            <rect x={-w / 2 + 4} y={-h / 2 + 21} width="15" height="2.4" rx="1.2" />
            <rect x={-w / 2 + 4} y={-h / 2 + 26} width="18" height="2.4" rx="1.2" />
          </g>
        )}
      </g>
    </motion.g>
  )
}

function Stage({ cx, label, accent = false, children }) {
  return (
    <g>
      <rect
        x={cx - 18}
        y="60"
        width="36"
        height="40"
        rx="10"
        fill={accent ? 'url(#rag-brand)' : 'url(#rag-glass)'}
        stroke="#fff"
        strokeOpacity={accent ? 0.45 : 0.9}
        filter="url(#rag-shadow-sm)"
      />
      {children}
      <text
        x={cx}
        y="94"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="700"
        fill={accent ? '#fff' : INK}
        fontFamily={FONT}
      >
        {label}
      </text>
    </g>
  )
}

const strokeProps = {
  fill: 'none',
  strokeWidth: 1.3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const TILES = [170, 222, 274, 326]

export default function EnterpriseRagArt() {
  const reduced = useReducedMotion()

  return (
    <svg
      viewBox="0 0 360 200"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rag-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eceafd" />
          <stop offset="0.55" stopColor="#c9c8f6" />
          <stop offset="1" stopColor="#aab0ee" />
        </linearGradient>
        <radialGradient id="rag-glow-a" cx="0.2" cy="0.1" r="0.7">
          <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rag-glow-b" cx="0.9" cy="0.95" r="0.6">
          <stop offset="0" stopColor="#8b8ef0" stopOpacity="0.4" />
          <stop offset="1" stopColor="#8b8ef0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rag-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.82" />
        </linearGradient>
        <linearGradient id="rag-brand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7c6cf0" />
          <stop offset="1" stopColor="#5b5bd6" />
        </linearGradient>
        <filter id="rag-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="7" stdDeviation="5" floodColor="#3c3c8c" floodOpacity="0.2" />
        </filter>
        <filter id="rag-shadow-sm" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.6" floodColor="#3c3c8c" floodOpacity="0.17" />
        </filter>
        <marker
          id="rag-arrow"
          viewBox="0 0 6 6"
          refX="4.6"
          refY="3"
          markerWidth="6"
          markerHeight="6"
          markerUnits="userSpaceOnUse"
          orient="auto-start-reverse"
        >
          <path
            d="M1 1 L5 3 L1 5"
            fill="none"
            stroke={BRAND}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      <rect width="360" height="200" fill="url(#rag-bg)" />
      <rect width="360" height="200" fill="url(#rag-glow-a)" />
      <rect width="360" height="200" fill="url(#rag-glow-b)" />

      {/* connectors sit behind the floating cards so a float never opens a gap */}
      <Flow d="M156 44 C156 53 162 53 164 59" reduced={reduced} />
      <Flow d="M180 40 C180 51 171 50 170 59" reduced={reduced} arrow delay={0.2} />
      <Flow d="M202 44 C202 54 179 52 176 59" reduced={reduced} delay={0.4} />
      <Flow d="M188 80 H201" reduced={reduced} arrow />
      <Flow d="M240 80 H253" reduced={reduced} arrow delay={0.25} />
      <Flow d="M292 80 H305" reduced={reduced} arrow delay={0.5} />
      <Flow d="M274 59 C274 38 298 31 312 30" reduced={reduced} arrow delay={0.3} />
      <Flow d="M326 46 V59" reduced={reduced} arrow delay={0.1} />
      <Flow d="M326 101 V127" reduced={reduced} arrow delay={0.6} />
      <Flow d="M134 157 H152" reduced={reduced} delay={0.15} />

      {/* knowledge index */}
      <g filter="url(#rag-shadow-sm)">
        <path
          d="M314 16 v21 c0 4.4 5.4 7.5 12 7.5 s12 -3.1 12 -7.5 V16"
          fill="url(#rag-glass)"
          stroke="#fff"
          strokeOpacity="0.9"
        />
        <ellipse cx="326" cy="16" rx="12" ry="4.4" fill="#fff" stroke="#fff" strokeOpacity="0.9" />
      </g>
      <path
        d="M314 25 c0 4.2 5.4 7 12 7 s12 -2.8 12 -7"
        {...strokeProps}
        strokeWidth="1"
        stroke={BRAND}
        strokeOpacity="0.4"
      />
      <g fill={BRAND}>
        <circle cx="326" cy="16" r="1.3" opacity="0.8" />
        <circle cx="321.5" cy="18" r="1" opacity="0.5" />
        <circle cx="330.5" cy="17.4" r="1" opacity="0.5" />
        <circle cx="326" cy="38" r="1.1" opacity="0.55" />
      </g>

      {/* source documents */}
      <DocCard cx={158} cy={30} rotate={-7} tint="#ef5b5b" label="PDF" reduced={reduced} delay={0} />
      <DocCard cx={202} cy={30} rotate={6} tint="#4f7cf0" label="DOC" reduced={reduced} delay={1.7} />
      <DocCard cx={180} cy={26} rotate={1} tint="#22a06b" label="XLSX" grid reduced={reduced} delay={0.9} />

      {/* pipeline stages */}
      <Stage cx={TILES[0]} label="Parse">
        <g {...strokeProps} stroke={BRAND}>
          <path d={`M${TILES[0] - 4.5} 67.5 h6 l3 3 v9.5 h-9 z`} />
          <path d={`M${TILES[0] - 2} 75 h4 M${TILES[0] - 2} 77.6 h4`} />
        </g>
      </Stage>
      <Stage cx={TILES[1]} label="Chunk">
        <g fill={BRAND}>
          <rect x={TILES[1] - 6} y="67.5" width="5.2" height="5.2" rx="1.3" />
          <rect x={TILES[1] + 0.8} y="67.5" width="5.2" height="5.2" rx="1.3" opacity="0.6" />
          <rect x={TILES[1] - 6} y="74.5" width="5.2" height="5.2" rx="1.3" opacity="0.6" />
          <rect x={TILES[1] + 0.8} y="74.5" width="5.2" height="5.2" rx="1.3" opacity="0.35" />
        </g>
      </Stage>
      <Stage cx={TILES[2]} label="Embed">
        <g {...strokeProps} stroke={BRAND}>
          <path d={`M${TILES[2] - 3.5} 67.5 h-3 v12.5 h3`} />
          <path d={`M${TILES[2] + 3.5} 67.5 h3 v12.5 h-3`} />
        </g>
        <g fill={BRAND}>
          <circle cx={TILES[2]} cy="70.5" r="1.2" />
          <circle cx={TILES[2]} cy="74" r="1.2" />
          <circle cx={TILES[2]} cy="77.5" r="1.2" />
        </g>
      </Stage>
      <Stage cx={TILES[3]} label="Search" accent>
        <g {...strokeProps} stroke="#fff">
          <circle cx={TILES[3] - 1.5} cy="73.5" r="5.2" />
          <path d={`M${TILES[3] + 2.5} 77.5 l4 4`} />
        </g>
        <g fill="#fff">
          <circle cx={TILES[3] - 3.2} cy="71.8" r="1.1" />
          <circle cx={TILES[3]} cy="74.8" r="1.1" />
          <circle cx={TILES[3] - 3.6} cy="75.6" r="0.9" opacity="0.65" />
        </g>
      </Stage>

      {/* query panel */}
      <motion.g {...float(reduced, 2.5, 7)}>
        <rect
          x="10"
          y="20"
          width="124"
          height="160"
          rx="12"
          fill="url(#rag-glass)"
          stroke="#fff"
          strokeOpacity="0.9"
          filter="url(#rag-shadow)"
        />
        <rect x="21" y="30" width="11" height="11" rx="3.2" fill="url(#rag-brand)" />
        <path d="M26.5 31.9 l1.2 2.4 2.4 1.2 -2.4 1.2 -1.2 2.4 -1.2 -2.4 -2.4 -1.2 2.4 -1.2z" fill="#fff" />
        <rect x="37" y="34" width="26" height="3" rx="1.5" fill={SKELETON} />
        <rect x="104" y="32" width="19" height="8" rx="4" fill={BRAND} fillOpacity="0.12" />

        <g fontFamily={FONT} fontSize="14" fontWeight="800" fill={INK} letterSpacing="-0.3">
          <text x="21" y="72">
            Query<tspan fill={BRAND}>.</tspan>
          </text>
          <text x="21" y="92">
            Understand<tspan fill={BRAND}>.</tspan>
          </text>
          <text x="21" y="112">
            Get Answers<tspan fill={BRAND}>.</tspan>
          </text>
        </g>

        <rect x="21" y="123" width="94" height="2.8" rx="1.4" fill={SKELETON} />
        <rect x="21" y="130" width="74" height="2.8" rx="1.4" fill={SKELETON} />

        <rect
          x="20"
          y="146"
          width="104"
          height="22"
          rx="11"
          fill="#f1f1fd"
          stroke={BRAND}
          strokeOpacity="0.2"
        />
        <g {...strokeProps} stroke={MUTED} strokeWidth="1.2">
          <circle cx="32" cy="156.5" r="3.4" />
          <path d="M34.6 159 l2.2 2.2" />
        </g>
        <rect x="42" y="155" width="40" height="3" rx="1.5" fill={SKELETON} />
        <circle cx="112" cy="157" r="7" fill="url(#rag-brand)" />
        <path
          d="M108.8 157 h6.4 M112.6 153.8 l3.2 3.2 -3.2 3.2"
          {...strokeProps}
          stroke="#fff"
          strokeWidth="1.3"
        />
      </motion.g>

      {/* grounded answer */}
      <motion.g {...float(reduced, 2.5, 6.2, 0.6)}>
        <rect
          x="152"
          y="128"
          width="196"
          height="56"
          rx="12"
          fill="url(#rag-glass)"
          stroke="#fff"
          strokeOpacity="0.9"
          filter="url(#rag-shadow)"
        />
        <circle cx="169" cy="148" r="8" fill="url(#rag-brand)" />
        <path
          d="M169 142.4 l1.45 3.9 3.9 1.45 -3.9 1.45 -1.45 3.9 -1.45 -3.9 -3.9 -1.45 3.9 -1.45z"
          fill="#fff"
        />
        <text x="183" y="150.6" fontFamily={FONT} fontSize="7.5" fontWeight="700" fill={INK}>
          Answer
        </text>
        <g fontFamily={FONT} fontSize="6.2" fontWeight="700" fill={BRAND} textAnchor="middle">
          <rect x="303" y="142.5" width="18" height="11" rx="5.5" fill={BRAND} fillOpacity="0.12" stroke={BRAND} strokeOpacity="0.3" strokeWidth="0.8" />
          <text x="312" y="150.4">[1]</text>
          <rect x="325" y="142.5" width="18" height="11" rx="5.5" fill={BRAND} fillOpacity="0.12" stroke={BRAND} strokeOpacity="0.3" strokeWidth="0.8" />
          <text x="334" y="150.4">[2]</text>
        </g>
        <rect x="163" y="161" width="172" height="3.2" rx="1.6" fill={SKELETON} />
        <rect x="236" y="161" width="46" height="3.2" rx="1.6" fill={BRAND} fillOpacity="0.28" />
        <rect x="163" y="168" width="132" height="3.2" rx="1.6" fill={SKELETON} />
        <rect x="163" y="175" width="88" height="3.2" rx="1.6" fill={SKELETON} />
      </motion.g>

      {/* confidence tooltip */}
      <motion.g {...float(reduced, 2, 5, 1.1)}>
        <rect
          x="176"
          y="120"
          width="84"
          height="15"
          rx="7.5"
          fill={INK}
          fillOpacity="0.86"
          filter="url(#rag-shadow-sm)"
        />
        <circle cx="186" cy="127.5" r="2.3" fill="#4ade80" />
        <text x="193" y="130" fontFamily={FONT} fontSize="6.8" fontWeight="600" fill="#fff">
          Confidence 0.92
        </text>
      </motion.g>
    </svg>
  )
}
