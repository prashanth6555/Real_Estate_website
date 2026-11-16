import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import Reveal from '../components/Reveal'
import { agents, services } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { photo } from '../lib/photo'

export default function About() {
  useDocumentTitle('About Us')

  return (
    <div className="w-full">
      <PageBanner
        eyebrow="About us"
        title="A small firm that still answers."
        text="Vantage opened with one desk on Madison Avenue. The rule has not changed: show fewer properties, and know them better."
        image={photo('1600607687939-ce8a6c25118c', 2000)}
      />

      <section className="grid w-full lg:grid-cols-2">
        <div className="shell py-14 md:py-20">
          <p className="kicker text-copper">The firm</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
            Eighteen years, eight cities, the same phone number.
          </h2>
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-ink-soft">
            <p>
              We work with people buying a first apartment, families selling a house they have outgrown, and companies
              that need a floor of offices or a shop with a real front door.
            </p>
            <p>
              Residential and commercial sit on the same desk on purpose. A move often includes both, and it is easier
              when one advisor has already read the lease and walked the block.
            </p>
            <p>
              The listings on this site are a sample of how we present a property: the price, the photographs, the
              awkward details, and a person you can call.
            </p>
          </div>
        </div>
        <div className="relative min-h-[360px] bg-sand">
          <img
            src={photo('1600210492486-724fe5c67fb0', 1600)}
            alt="A quiet living room prepared for a showing"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="w-full border-y border-line">
        <div className="grid md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={(index % 3) * 60} className="border-b border-line px-6 py-10 md:px-10 xl:border-r">
              <p className="kicker text-copper">0{index + 1}</p>
              <h3 className="mt-3 font-display text-3xl">{service.title}</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">{service.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell w-full py-16 md:py-24">
        <p className="kicker text-copper">People</p>
        <h2 className="mt-3 max-w-xl font-display text-4xl leading-[1.05] md:text-5xl">The advisors on the file.</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {agents.map((agent) => (
            <article key={agent.id} className="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
              <div className="aspect-[4/5] overflow-hidden bg-sand">
                <img src={agent.image} alt={agent.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl">{agent.name}</h3>
                <p className="mt-1 text-sm text-copper">{agent.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{agent.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="w-full bg-forest text-cream">
        <div className="shell flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center md:py-16">
          <div>
            <h2 className="font-display text-4xl md:text-5xl">Start with a conversation.</h2>
            <p className="mt-3 max-w-xl text-cream/75">No portal login. Tell us the city, the timing, and what has to be true.</p>
          </div>
          <Link to="/contact" className="btn btn-light">
            Contact us
          </Link>
        </div>
      </section>
    </div>
  )
}
