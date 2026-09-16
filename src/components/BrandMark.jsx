import { brands } from '../data/brands'

/**
 * Renders a brand logo in its official colour.
 *
 * Three shapes come out of scripts/build-brands.mjs:
 *   path — single-path mark (simple-icons), tinted with the brand hex
 *   svg  — multi-colour artwork (devicon), used as-is
 *   mono — brands neither library ships; a monogram tile in the brand colour
 */
export default function BrandMark({ name, className = 'size-6' }) {
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
        dangerouslySetInnerHTML={{ __html: brand.inner }}
      />
    )
  }

  return (
    <span
      className={`grid place-items-center rounded-md text-[0.62em] font-extrabold leading-none tracking-tight ${className}`}
      style={{ backgroundColor: `${brand.hex}1f`, color: brand.hex }}
      role="img"
      aria-label={name}
    >
      {brand.label}
    </span>
  )
}

export const hasBrand = (name) => Boolean(brands[name])
