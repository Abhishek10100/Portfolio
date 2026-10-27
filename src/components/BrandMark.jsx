import { useId } from 'react'
import { brands } from '../data/brands'

/* Inlined devicon artwork ships its own gradient ids, and the same mark can sit
   on the page more than once (Azure and Azure OpenAI share one file). Prefixing
   per instance keeps every id in the document unique. */
const scopeIds = (markup, prefix) =>
  markup
    .replace(/\bid="([^"]+)"/g, `id="${prefix}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`)

/**
 * Renders a brand logo in its official colour.
 *
 * Three shapes come out of scripts/build-brands.mjs:
 *   path — single-path mark (simple-icons), tinted with the brand hex
 *   svg  — multi-colour artwork (devicon), used as-is
 *   mono — brands neither library ships; a monogram tile in the brand colour
 */
export default function BrandMark({ name, className = 'size-6' }) {
  const uid = useId().replace(/[^\w-]/g, '')
  const brand = brands[name]
  if (!brand) return null

  if (brand.kind === 'path') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        style={{ color: brand.hex }}
        fill="currentColor"
        role="img"
        aria-label={name}
      >
        <path d={brand.d} />
      </svg>
    )
  }

  if (brand.kind === 'svg') {
    return (
      <svg
        viewBox={brand.viewBox}
        className={className}
        role="img"
        aria-label={name}
        dangerouslySetInnerHTML={{ __html: scopeIds(brand.inner, `bm${uid}`) }}
      />
    )
  }

  return (
    <span
      className={`grid place-items-center rounded-md text-[0.7em] font-extrabold leading-none tracking-tight ${className}`}
      style={{ backgroundColor: `${brand.hex}26`, color: `color-mix(in srgb, ${brand.hex} 62%, var(--text))` }}
      role="img"
      aria-label={name}
    >
      {brand.label}
    </span>
  )
}

export const hasBrand = (name) => Boolean(brands[name])
