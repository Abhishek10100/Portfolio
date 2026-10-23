import { motion, useReducedMotion } from 'framer-motion'
import { INK, MUTED, FONT, float, Sparkle } from './shared'

// Isometric projection: grid units to SVG px.
const U = 9
const CX = 132
const CY = 30
const iso = (x, y, z = 0) => [
  CX + (x - y) * U * 0.866,
  CY + (x + y) * U * 0.5 - z * U,
]
const pts = (list) => list.map(([x, y, z]) => iso(x, y, z).join(',')).join(' ')

/** One cuboid: roof plus the two faces that face the viewer. */
function Building({ x, y, w, d, h, roof, id }) {
  return (
    <g filter="url(#pl-shadow-sm)">
      <polygon points={pts([[x, y + d, 0], [x + w, y + d, 0], [x + w, y + d, h], [x, y + d, h]])} fill="#ffffff" fillOpacity="0.95" />
      <polygon points={pts([[x + w, y, 0], [x + w, y + d, 0], [x + w, y + d, h], [x + w, y, h]])} fill="#d9deff" />
      <polygon points={pts([[x, y, h], [x + w, y, h], [x + w, y + d, h], [x, y + d, h]])} fill={roof} />
      <polygon
        points={pts([[x + 0.5, y + 0.5, h], [x + w - 0.5, y + 0.5, h], [x + w - 0.5, y + d - 0.5, h], [x + 0.5, y + d - 0.5, h]])}
        fill={`url(#pl-sheen-${id})`}
        opacity="0.5"
      />
    </g>
  )
}

const BUILDINGS = [
  { id: 'a', x: 1.4, y: 1.4, w: 4, d: 4, h: 2.6, roof: '#34c38f' },
  { id: 'b', x: 6.6, y: 1.4, w: 4.4, d: 3.6, h: 3.6, roof: '#ffb23d' },
  { id: 'c', x: 2.6, y: 7, w: 6.4, d: 3.4, h: 2.2, roof: '#7c8cff' },
]

/** A 3D digital-twin plant with live KPI cards and an assistant bubble. */
export default function PlantLiveArt() {
  const reduced = useReducedMotion()

  const [tx0, ty0] = iso(11.2, 11)
  const [tx1, ty1] = iso(11.2, 6.4)

  return (
    <svg
      viewBox="0 0 360 200"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pl-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eceafd" />
          <stop offset="0.55" stopColor="#cfd3f8" />
          <stop offset="1" stopColor="#b0b8ef" />
        </linearGradient>
        <radialGradient id="pl-glow">
          <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pl-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#e3e6ff" stopOpacity="0.95" />
        </linearGradient>
        {BUILDINGS.map((b) => (
          <linearGradient key={b.id} id={`pl-sheen-${b.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.7" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        ))}
        <linearGradient id="pl-btn" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7c8cff" />
          <stop offset="1" stopColor="#4a44c4" />
        </linearGradient>
        <filter id="pl-shadow" x="-12%" y="-12%" width="124%" height="136%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#3c3c8c" floodOpacity="0.2" />
        </filter>
        <filter id="pl-shadow-sm" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#3c3c8c" floodOpacity="0.22" />
        </filter>
      </defs>

      <rect width="360" height="200" fill="url(#pl-bg)" />
      <circle cx="80" cy="30" r="130" fill="url(#pl-glow)" />

      {/* Plant floor */}
      <motion.g {...float(reduced, 2, 7)}>
        <polygon
          points={pts([[-0.6, -0.6], [12.6, -0.6], [12.6, 12.6], [-0.6, 12.6]])}
          fill="url(#pl-floor)"
          stroke="#fff"
          strokeWidth="1"
          filter="url(#pl-shadow)"
        />
        {/* aisle lines */}
        <polyline points={pts([[0, 5.8], [12, 5.8]])} stroke="#b9bffa" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <polyline points={pts([[6, 0], [6, 12]])} stroke="#b9bffa" strokeWidth="1" strokeDasharray="3 3" fill="none" />

        {BUILDINGS.map((b) => (
          <Building key={b.id} {...b} />
        ))}

        {/* truck on the yard road */}
        <motion.circle
          r="2.6"
          fill="#ff8a3d"
          stroke="#fff"
          strokeWidth="1"
          initial={{ cx: tx0, cy: ty0 }}
          animate={reduced ? { cx: tx0, cy: ty0 } : { cx: [tx0, tx1, tx0], cy: [ty0, ty1, ty0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* alert pin above the amber shop */}
        <g transform={`translate(${iso(8.8, 3.2, 4.4).join(' ')})`}>
          {!reduced && (
            <motion.circle
              r="5"
              fill="none"
              stroke="#ff5c7a"
              strokeWidth="1.2"
              initial={{ scale: 0.6, opacity: 0.9 }}
              animate={{ scale: [0.6, 2.2], opacity: [0.9, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <circle r="4.2" fill="#ff5c7a" stroke="#fff" strokeWidth="1.2" />
          <text y="2.2" textAnchor="middle" fontFamily={FONT} fontSize="6" fontWeight="800" fill="#fff">
            !
          </text>
        </g>
      </motion.g>

      {/* KPI card */}
      <motion.g {...float(reduced, 2.4, 5.5, 0.3)}>
        <rect x="236" y="14" width="112" height="78" rx="10" fill="#fff" fillOpacity="0.94" stroke="#fff" filter="url(#pl-shadow)" />
        <text x="247" y="29" fontFamily={FONT} fontSize="6.4" fontWeight="700" fill={MUTED}>
          PLANT OEE
        </text>
        <text x="247" y="48" fontFamily={FONT} fontSize="17" fontWeight="800" fill={INK}>
          87%
        </text>
        <rect x="291" y="36" width="44" height="12" rx="6" fill="#34c38f" fillOpacity="0.2" />
        <text x="313" y="44.6" textAnchor="middle" fontFamily={FONT} fontSize="6" fontWeight="700" fill="#1f9d6e">
          +3.2%
        </text>
        {[14, 22, 18, 28, 24, 34, 30].map((h, i) => (
          <rect key={i} x={247 + i * 12.6} y={86 - h} width="8" height={h} rx="2" fill={i === 6 ? '#5b5bd6' : '#c5c8f3'} />
        ))}
      </motion.g>

      {/* systems chip */}
      <motion.g {...float(reduced, 1.8, 6, 0.8)}>
        <rect x="236" y="100" width="112" height="22" rx="11" fill="#fff" fillOpacity="0.9" stroke="#fff" filter="url(#pl-shadow-sm)" />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={251 + i * 9} cy="111" r="3" fill={['#5b5bd6', '#a855f7', '#34c38f', '#ffb23d', '#5b8cff'][i]} />
        ))}
        <text x="300" y="113.2" fontFamily={FONT} fontSize="6.4" fontWeight="700" fill={INK}>
          10 systems
        </text>
      </motion.g>

      {/* assistant bubble */}
      <motion.g {...float(reduced, 2, 6.5, 1.1)}>
        <rect x="204" y="136" width="144" height="46" rx="11" fill="#fff" fillOpacity="0.95" stroke="#fff" filter="url(#pl-shadow)" />
        <circle cx="222" cy="152" r="8" fill="url(#pl-btn)" />
        <Sparkle cx={222} cy={152} s={0.9} />
        <text x="236" y="150" fontFamily={FONT} fontSize="6.6" fontWeight="700" fill={INK}>
          Ask about today
        </text>
        <rect x="236" y="156" width="96" height="3.6" rx="1.8" fill={MUTED} fillOpacity="0.5" />
        <rect x="236" y="163" width="70" height="3.6" rx="1.8" fill={MUTED} fillOpacity="0.5" />
        <rect x="236" y="170" width="84" height="3.6" rx="1.8" fill={MUTED} fillOpacity="0.35" />
      </motion.g>
    </svg>
  )
}
