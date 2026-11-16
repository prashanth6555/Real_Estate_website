import { ArrowUpRight, Bath, BedDouble, MapPin, Ruler } from 'lucide-react'
import { Link } from 'react-router-dom'
import { number } from '../lib/format'
import Price from './Price'

function Fact({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
      {children}
    </span>
  )
}

export default function PropertyCard({ property, large = false }) {
  return (
    <Link
      to={`/property/${property.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_1px_0_rgba(28,25,21,0.04)] ring-1 ring-ink/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-32px_rgba(28,25,21,0.55)]"
    >
      <div className={`relative overflow-hidden bg-sand ${large ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
        <img
          src={property.images[0]}
          alt={`${property.title} in ${property.neighborhood}`}
          className="zoom-img h-full w-full object-cover"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.14em] uppercase ${
              property.status === 'rent' ? 'bg-copper text-white' : 'bg-white/95 text-ink'
            }`}
          >
            {property.status === 'rent' ? 'For rent' : 'For sale'}
          </span>
          <span className="rounded-full bg-ink/75 px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-cream uppercase backdrop-blur-sm">
            {property.type}
          </span>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between bg-gradient-to-t from-ink/75 to-transparent px-4 pt-14 pb-4 text-sm text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span>View details</span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Price property={property} className="font-display text-[1.7rem] leading-none tracking-tight" />
        <h3 className="text-lg font-medium tracking-tight text-ink transition-colors group-hover:text-forest">
          {property.title}
        </h3>
        <p className="flex items-center gap-1.5 truncate text-sm text-ink-soft">
          <MapPin size={15} aria-hidden="true" />
          {property.neighborhood}, {property.city}
        </p>
        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-3 text-sm text-ink-soft">
          {property.beds > 0 ? <Fact icon={BedDouble}>{property.beds} bd</Fact> : null}
          {property.baths > 0 && property.category === 'residential' ? (
            <Fact icon={Bath}>{property.baths} ba</Fact>
          ) : null}
          <Fact icon={Ruler}>{number(property.sqft)} sqft</Fact>
        </div>
      </div>
    </Link>
  )
}
