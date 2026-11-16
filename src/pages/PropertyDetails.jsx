import {
  Bath,
  BedDouble,
  Building2,
  Camera,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Heart,
  Lock,
  Mail,
  MapPin,
  Phone,
  Ruler,
  Sparkles,
  Sun,
  Users,
  Waves,
  Wifi,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import InquiryForm from '../components/InquiryForm'
import Price from '../components/Price'
import PropertyCard from '../components/PropertyCard'
import { getProperty, relatedProperties } from '../data/properties'
import { getAgent } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { number } from '../lib/format'

const amenityIcons = {
  Pool: Waves,
  Garden: Sparkles,
  Parking: Car,
  Gym: Dumbbell,
  Security: Lock,
  'Smart home': Sparkles,
  Terrace: Sun,
  Fireplace: Sparkles,
  Doorman: Users,
  Elevator: Building2,
  'Pet friendly': Heart,
  'Wi-Fi': Wifi,
  'Ocean view': Waves,
}

export default function PropertyDetails() {
  const { id } = useParams()
  const property = getProperty(id)
  useDocumentTitle(property ? property.title : 'Listing')

  if (!property) {
    return (
      <section className="shell flex min-h-[70svh] flex-col items-start justify-center pt-32">
        <p className="kicker text-copper">Listing</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight">This one has left the market.</h1>
        <Link to="/buy" className="btn btn-primary mt-8">
          Browse homes
        </Link>
      </section>
    )
  }

  return <Detail property={property} />
}

function Detail({ property }) {
  const agent = getAgent(property.agent)
  const related = relatedProperties(property)
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const photos = property.images

  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key === 'ArrowRight') setIndex((current) => (current + 1) % photos.length)
      if (event.key === 'ArrowLeft') setIndex((current) => (current - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, photos.length])

  function show(next) {
    setIndex(next)
    setOpen(true)
  }

  return (
    <article className="w-full pt-[76px]">
      <div className="grid w-full grid-cols-1 gap-1 bg-sand md:h-[620px] md:grid-cols-3 md:grid-rows-2">
        <button type="button" className="relative h-80 overflow-hidden md:col-span-2 md:row-span-2 md:h-auto" onClick={() => show(0)}>
          <img src={photos[0]} alt={`${property.title}, photo 1`} className="h-full w-full object-cover" />
        </button>
        <button type="button" className="relative hidden overflow-hidden md:block" onClick={() => show(1)}>
          <img src={photos[1]} alt={`${property.title}, photo 2`} className="h-full w-full object-cover" />
        </button>
        <button type="button" className="relative h-52 overflow-hidden md:h-auto" onClick={() => show(2)}>
          <img src={photos[2]} alt={`${property.title}, photo 3`} className="h-full w-full object-cover" />
          <span className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-ink">
            <Camera size={16} aria-hidden="true" />
            View {photos.length} photos
          </span>
        </button>
      </div>

      <div className="shell grid w-full gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:py-14">
        <div>
          <Link
            to={property.status === 'rent' ? '/rent' : '/buy'}
            className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink"
          >
            <ChevronLeft size={16} />
            Back to {property.status === 'rent' ? 'rentals' : 'homes for sale'}
          </Link>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-forest px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-cream uppercase">
              {property.status === 'rent' ? 'For rent' : 'For sale'}
            </span>
            <span className="rounded-full bg-cream px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-ink uppercase">
              {property.category}
            </span>
            <span className="rounded-full bg-cream px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-ink uppercase">
              {property.type}
            </span>
          </div>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">{property.title}</h1>
          <p className="mt-3 flex items-center gap-2 text-ink-soft">
            <MapPin size={16} aria-hidden="true" />
            {property.address}, {property.city}
          </p>
          <Price property={property} className="mt-5 font-display text-4xl tracking-tight" />

          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {property.beds > 0 ? <Fact icon={BedDouble} label="Bedrooms" value={property.beds} /> : null}
            {property.baths > 0 && property.category === 'residential' ? (
              <Fact icon={Bath} label="Bathrooms" value={property.baths} />
            ) : null}
            <Fact icon={Ruler} label="Interior" value={`${number(property.sqft)} sqft`} />
            <Fact icon={Building2} label="Built" value={property.yearBuilt} />
          </dl>

          <h2 className="mt-12 font-display text-3xl tracking-tight">The property</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{property.description}</p>
          <ul className="mt-6 space-y-3">
            {property.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-forest" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-3xl tracking-tight">Amenities</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {property.amenities.map((item) => {
              const Icon = amenityIcons[item] || Check
              return (
                <li key={item} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-line">
                  <Icon size={18} className="text-forest" aria-hidden="true" />
                  {item}
                </li>
              )
            })}
          </ul>

          <h2 className="mt-12 font-display text-3xl tracking-tight">Details</h2>
          <dl className="mt-5 divide-y divide-line rounded-3xl bg-white ring-1 ring-line">
            {[
              ['Address', `${property.address}, ${property.city}`],
              ['Neighborhood', property.neighborhood],
              ['Type', `${property.category} · ${property.type}`],
              ['Parking', property.parking],
              ['Lot', property.lot],
              ['Year built', property.yearBuilt],
            ]
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 px-5 py-4">
                  <dt className="text-sm text-ink-soft">{label}</dt>
                  <dd className="text-right font-medium">{value}</dd>
                </div>
              ))}
          </dl>
        </div>

        <aside className="h-fit rounded-3xl bg-white p-6 ring-1 ring-line lg:sticky lg:top-28">
          <div className="flex items-center gap-4">
            <img src={agent.image} alt="" className="h-16 w-16 rounded-full object-cover" />
            <div>
              <p className="font-medium">{agent.name}</p>
              <p className="text-sm text-ink-soft">{agent.role}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{agent.bio}</p>
          <div className="mt-4 space-y-2 text-sm">
            <a href={`tel:${agent.phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-2 hover:text-forest">
              <Phone size={15} aria-hidden="true" />
              {agent.phone}
            </a>
            <a href={`mailto:${agent.email}`} className="flex items-center gap-2 hover:text-forest">
              <Mail size={15} aria-hidden="true" />
              {agent.email}
            </a>
          </div>
          <div className="mt-6">
            <InquiryForm
              key={property.id}
              title="Request a viewing"
              submitLabel="Request a viewing"
              note="Tell us when you can walk through. We will confirm a time."
              defaultMessage={`I would like to tour ${property.title}.`}
            />
          </div>
        </aside>
      </div>

      <section className="shell w-full pb-16">
        <h2 className="font-display text-4xl tracking-tight">You may also like</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </div>
      </section>

      {open ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${property.title} photos`}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-white text-ink"
            aria-label="Close photos"
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>
          <button
            type="button"
            className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white text-ink md:left-6"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation()
              setIndex((current) => (current - 1 + photos.length) % photos.length)
            }}
          >
            <ChevronLeft />
          </button>
          <img
            key={photos[index]}
            src={photos[index]}
            alt={`${property.title}, photo ${index + 1} of ${photos.length}`}
            className="max-h-[82vh] max-w-[92vw] rounded-2xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white text-ink md:right-6"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation()
              setIndex((current) => (current + 1) % photos.length)
            }}
          >
            <ChevronRight />
          </button>
          <p className="absolute bottom-5 text-sm text-cream">
            {index + 1} / {photos.length}
          </p>
        </div>
      ) : null}
    </article>
  )
}

function Fact({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white px-4 py-4 ring-1 ring-line">
      <Icon size={16} className="text-forest" aria-hidden="true" />
      <dt className="mt-3 text-xs tracking-[0.12em] text-ink-soft uppercase">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  )
}
