import { money } from '../lib/format'

export default function Price({ property, className = '' }) {
  return (
    <p className={className}>
      {money(property.price)}
      {property.status === 'rent' ? (
        <span className="ml-1 font-sans text-[0.48em] font-normal tracking-normal text-ink-soft">/mo</span>
      ) : null}
    </p>
  )
}
