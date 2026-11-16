import { Calendar, Home, KeyRound } from 'lucide-react'
import InquiryForm from '../components/InquiryForm'
import PageBanner from '../components/PageBanner'
import { allTypes } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { photo } from '../lib/photo'

const steps = [
  {
    icon: Home,
    title: 'Tell us about it',
    text: 'Address, type, and whether you are selling or leasing. A sentence on timing is plenty.',
  },
  {
    icon: KeyRound,
    title: 'We walk it and price it',
    text: 'A visit, a number you can explain to a buyer, and a plan for photographs if you want them.',
  },
  {
    icon: Calendar,
    title: 'Launch, tour, negotiate',
    text: 'One advisor stays on the file. You hear the offer in plain language, not a portal ping.',
  },
]

const fields = [
  { name: 'address', label: 'Property address', type: 'text', required: true, autoComplete: 'street-address' },
  { name: 'propertyType', label: 'Property type', type: 'select', required: true, options: allTypes },
  {
    name: 'timeline',
    label: 'Timeline',
    type: 'select',
    required: true,
    options: ['As soon as possible', '1–3 months', '3–6 months', 'Just exploring'],
  },
]

export default function Sell() {
  useDocumentTitle('Sell')

  return (
    <div className="w-full">
      <PageBanner
        eyebrow="Sell"
        title="A listing that sounds like the property."
        text="Houses, apartments, offices, and shops. The first conversation is free, and it does not lock you in."
        image={photo('1600566753086-00f18fb6b3ea', 2000)}
      />

      <section className="grid w-full border-b border-line md:grid-cols-3">
        {steps.map((step, index) => (
          <article key={step.title} className="border-b border-line px-6 py-10 md:border-r md:border-b-0 md:px-10">
            <step.icon size={22} className="text-forest" aria-hidden="true" />
            <p className="kicker mt-5 text-copper">0{index + 1}</p>
            <h2 className="mt-2 font-display text-3xl">{step.title}</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{step.text}</p>
          </article>
        ))}
      </section>

      <section className="grid w-full lg:grid-cols-2">
        <div className="relative min-h-[320px] bg-sand lg:min-h-full">
          <img
            src={photo('1600585154340-be6161a56a0c', 1600)}
            alt="A house prepared for the market"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="bg-cream px-6 py-14 md:px-12 lg:px-16 lg:py-20">
          <InquiryForm
            title="Request a valuation"
            submitLabel="Request a valuation"
            note="We will reply with a time to walk the property. This demo form does not leave your browser."
            extraFields={fields}
            defaultMessage="I would like a valuation and a sense of timing."
          />
        </div>
      </section>
    </div>
  )
}
