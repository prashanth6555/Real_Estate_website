import { Mail, MapPin, Phone } from 'lucide-react'
import InquiryForm from '../components/InquiryForm'
import PageBanner from '../components/PageBanner'
import { company, offices } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { photo } from '../lib/photo'

export default function Contact() {
  useDocumentTitle('Contact Us')

  return (
    <div className="w-full">
      <PageBanner
        eyebrow="Contact us"
        title="Write, or call the desk."
        text="Buying, renting, selling, or a commercial lease. Include the city and the timing if you know them."
        image={photo('1534430480872-3498386e7856', 2000)}
      />

      <section className="grid w-full lg:grid-cols-2">
        <div className="bg-forest px-6 py-14 text-cream md:px-12 lg:px-16 lg:py-20">
          <p className="kicker text-copper">The desk</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] md:text-5xl">We read every note.</h2>
          <p className="mt-4 max-w-md leading-relaxed text-cream/75">{company.hours}</p>
          <ul className="mt-8 space-y-4">
            <li>
              <a href={company.phoneHref} className="inline-flex items-center gap-3 text-lg hover:text-white">
                <Phone size={18} aria-hidden="true" />
                {company.phone}
              </a>
            </li>
            <li>
              <a href={company.emailHref} className="inline-flex items-center gap-3 text-lg hover:text-white">
                <Mail size={18} aria-hidden="true" />
                {company.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-cream/85">
              <MapPin size={18} className="mt-1 shrink-0" aria-hidden="true" />
              {company.address}
            </li>
          </ul>
          <div className="mt-10 grid gap-3">
            {offices.map((office) => (
              <article key={office.city} className="rounded-2xl bg-white/8 px-5 py-4 ring-1 ring-white/15">
                <h3 className="font-display text-2xl">{office.city}</h3>
                <p className="mt-1 text-sm text-cream/75">{office.address}</p>
                <p className="mt-1 text-sm">{office.phone}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="bg-cream px-6 py-14 md:px-12 lg:px-16 lg:py-20">
          <InquiryForm
            title="Send a message"
            submitLabel="Send message"
            note="Name, email, phone, and a short message are enough to start."
          />
        </div>
      </section>
    </div>
  )
}
