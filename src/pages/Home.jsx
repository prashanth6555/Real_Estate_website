import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import Reveal from '../components/Reveal'
import SearchPanel from '../components/SearchPanel'
import SectionHead from '../components/SectionHead'
import { properties } from '../data/properties'
import { cities, services, testimonials, tickerItems } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { photo } from '../lib/photo'

const emptySearch = { q: '', type: '', price: '', beds: '', category: '' }

function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / 1100)
          const eased = 1 - (1 - progress) ** 3
          setValue(Math.round(to * eased))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [to])

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

function Stories() {
  const [index, setIndex] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!paused.current) setIndex((current) => (current + 1) % testimonials.length)
    }, 7000)
    return () => window.clearInterval(id)
  }, [])

  const item = testimonials[index]

  return (
    <section
      className="w-full bg-cream"
      onMouseEnter={() => {
        paused.current = true
      }}
      onMouseLeave={() => {
        paused.current = false
      }}
    >
      <div className="shell py-16 md:py-24">
        <p className="kicker text-copper">Clients, in their own words</p>
        <figure className="mt-6 max-w-4xl">
          <blockquote className="font-display text-3xl leading-[1.15] tracking-tight text-ink md:text-5xl" key={item.name}>
            “{item.quote}”
          </blockquote>
          <figcaption className="mt-6 text-ink-soft">
            <span className="font-medium text-ink">{item.name}</span>
            <span> · {item.detail}</span>
          </figcaption>
        </figure>
        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white"
            aria-label="Previous story"
            onClick={() => setIndex((current) => (current - 1 + testimonials.length) % testimonials.length)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white"
            aria-label="Next story"
            onClick={() => setIndex((current) => (current + 1) % testimonials.length)}
          >
            <ChevronRight size={18} />
          </button>
          <div className="ml-2 flex gap-2">
            {testimonials.map((story, dot) => (
              <button
                key={story.name}
                type="button"
                aria-label={`Show story from ${story.name}`}
                onClick={() => setIndex(dot)}
                className={`h-2 rounded-full transition-all ${dot === index ? 'w-8 bg-forest' : 'w-2 bg-sand'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useDocumentTitle('Homes, rentals, and commercial space')
  const navigate = useNavigate()
  const [intent, setIntent] = useState('sale')
  const [values, setValues] = useState(emptySearch)
  const featured = properties.filter((property) => property.featured).slice(0, 5)

  function submit() {
    const params = new URLSearchParams()
    Object.entries(values).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    navigate({ pathname: intent === 'rent' ? '/rent' : '/buy', search: params.toString() })
  }

  return (
    <div className="w-full">
      <section className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-ink">
        <img
          src={photo('1600585154526-990dced4db0d', 2200)}
          alt="A modern house with warm interior light at dusk"
          className="hero-drift absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/55" />
        <div className="shell relative z-10 w-full pt-28 pb-6 md:pb-10">
          <div className="max-w-3xl text-cream" style={{ animation: 'rise 0.9s cubic-bezier(.22,.8,.2,1) both' }}>
            <p className="kicker text-copper">Residential and commercial</p>
            <h1 className="display mt-4 text-cream">A calmer way to change address.</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg">
              Buy, rent, or sell across eight cities. Every listing is photographed, priced, and ready to walk through
              with someone who has already been inside.
            </p>
          </div>
          <div className="mt-8" style={{ animation: 'rise 0.9s cubic-bezier(.22,.8,.2,1) 0.15s both' }}>
            <SearchPanel
              intent={intent}
              values={values}
              onChange={setValues}
              onIntent={(next) => {
                setIntent(next)
                setValues((current) => ({ ...current, price: '' }))
              }}
              onSubmit={submit}
              submitLabel={intent === 'rent' ? 'Search rentals' : 'Search homes'}
            />
          </div>
        </div>
      </section>

      <div className="w-full overflow-hidden border-y border-line bg-cream">
        <div className="ticker flex w-max">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-6 px-6 py-4 text-xs font-medium tracking-[0.18em] text-ink-soft uppercase"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-copper" />
            </span>
          ))}
        </div>
      </div>

      <section className="shell w-full py-16 md:py-24">
        <SectionHead
          kicker="Selected this week"
          title="On the market now."
          text="A short list of houses, apartments, and one loft we would walk through ourselves."
          action={
            <Link to="/buy" className="btn btn-line">
              View all homes
              <ArrowRight size={16} />
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((property, index) => (
            <Reveal key={property.id} className={index === 0 ? 'md:col-span-2' : ''} delay={index * 70}>
              <PropertyCard property={property} large={index === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grid w-full md:grid-cols-2">
        <Link to="/buy?category=commercial" className="group relative flex min-h-[340px] items-end overflow-hidden bg-ink">
          <img
            src={photo('1486406146926-c627a92ad1ab', 1600)}
            alt=""
            className="zoom-img absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-ink/20 transition duration-500 group-hover:from-ink/80" />
          <div className="relative z-10 p-8 text-cream md:p-12">
            <p className="kicker text-copper">Commercial</p>
            <h2 className="mt-3 max-w-md font-display text-4xl leading-[1.05] md:text-5xl">Offices and shops for sale</h2>
            <span className="mt-5 inline-flex items-center gap-2 text-sm">
              Browse buildings <ArrowUpRight size={16} />
            </span>
          </div>
        </Link>
        <Link to="/rent?category=commercial" className="group relative flex min-h-[340px] items-end overflow-hidden bg-forest">
          <img
            src={photo('1497366216548-37526070297c', 1600)}
            alt=""
            className="zoom-img absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/90 to-forest/25" />
          <div className="relative z-10 p-8 text-cream md:p-12">
            <p className="kicker text-copper">For lease</p>
            <h2 className="mt-3 max-w-md font-display text-4xl leading-[1.05] md:text-5xl">Retail floors and workspace</h2>
            <span className="mt-5 inline-flex items-center gap-2 text-sm">
              See what is leasing <ArrowUpRight size={16} />
            </span>
          </div>
        </Link>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="shell">
          <SectionHead
            kicker="Where we work"
            title="Eight cities, one desk."
            text="Search a city and the listings follow. If the right one is quiet, ask — some addresses never make the page."
          />
        </div>
        <div className="grid w-full grid-cols-2 md:grid-cols-4">
          {cities.map((city) => (
            <Link
              key={city.name}
              to={`/buy?q=${encodeURIComponent(city.name)}`}
              className="group relative flex min-h-[230px] items-end overflow-hidden bg-forest sm:min-h-[280px]"
            >
              <img src={city.image} alt="" className="zoom-img absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              <div className="relative z-10 p-4 text-cream md:p-6">
                <h3 className="font-display text-2xl md:text-3xl">{city.name}</h3>
                <p className="mt-1 max-w-[16rem] text-sm text-cream/80">{city.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid w-full lg:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden bg-sand">
          <img
            src={photo('1600210492486-724fe5c67fb0', 1600)}
            alt="A sunlit living room with linen seating"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center bg-forest px-6 py-16 text-cream md:px-12 lg:px-16">
          <div className="max-w-xl">
            <p className="kicker text-copper">How it feels to work with us</p>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] md:text-5xl">Fewer showings. Better notes.</h2>
            <p className="mt-5 leading-relaxed text-cream/80">
              We would rather walk you through four properties that fit than send a portal of forty that do not. The
              same person stays on the file from the first call to the keys.
            </p>
            <ul className="mt-6 space-y-3 text-cream/90">
              <li>Pricing explained in one page, not a pitch.</li>
              <li>Tours booked around your week, including evenings.</li>
              <li>Residential and commercial, so a move can include the office.</li>
            </ul>
            <Link to="/about" className="btn btn-light mt-8">
              About the firm
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-ink text-cream">
        <div className="shell grid grid-cols-2 gap-8 py-14 md:grid-cols-4 md:py-16">
          {[
            { to: 18, suffix: '', label: 'Years on the same desk' },
            { to: 8, suffix: '', label: 'Cities we work in' },
            { to: 2400, suffix: '', label: 'Sales and leases closed' },
            { to: 96, suffix: '%', label: 'Clients who come back' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl md:text-5xl">
                <CountUp to={stat.to} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-cream/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full border-b border-line">
        <div className="shell py-14 md:py-16">
          <SectionHead kicker="Services" title="Buy, rent, sell, or lease." />
        </div>
        <div className="grid w-full md:grid-cols-3">
          {services.slice(0, 3).map((service, index) => (
            <article key={service.title} className="border-t border-line px-6 py-8 md:px-10 md:py-10">
              <p className="kicker text-copper">0{index + 1}</p>
              <h3 className="mt-3 font-display text-3xl">{service.title}</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <Stories />

      <section className="relative w-full overflow-hidden bg-ink">
        <img
          src={photo('1613490493576-7fde63acd811', 2000)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="shell relative z-10 py-20 text-cream md:py-28">
          <h2 className="display max-w-4xl">Tell us the address you have in mind.</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-light">
              Contact us
            </Link>
            <Link to="/sell" className="btn btn-ghost">
              Sell or lease with us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
