import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { company, navLinks } from '../data/site'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)
  const [error, setError] = useState('')

  function subscribe(event) {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.')
      return
    }
    setError('')
    setJoined(true)
  }

  return (
    <footer className="mt-auto w-full bg-forest text-cream">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <p className="font-display text-4xl tracking-tight">Vantage</p>
          <p className="mt-4 max-w-sm leading-relaxed text-cream/75">
            Residential and commercial property, shown with fewer listings and more of the story. Eight cities, one desk.
          </p>
        </div>
        <div className="lg:col-span-2">
          <p className="kicker text-copper">Explore</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-cream/85 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="kicker text-copper">Visit</p>
          <ul className="mt-4 space-y-3 text-cream/85">
            <li className="flex gap-2">
              <MapPin size={16} className="mt-1 shrink-0" aria-hidden="true" />
              {company.address}
            </li>
            <li>
              <a href={company.phoneHref} className="inline-flex items-center gap-2 hover:text-white">
                <Phone size={16} aria-hidden="true" />
                {company.phone}
              </a>
            </li>
            <li>
              <a href={company.emailHref} className="inline-flex items-center gap-2 hover:text-white">
                <Mail size={16} aria-hidden="true" />
                {company.email}
              </a>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="kicker text-copper">The list</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/75">
            A short note when something quiet comes on the market. This demo keeps your email on this page only.
          </p>
          {joined ? (
            <p className="mt-4 text-sm text-cream">You are on the list for this session.</p>
          ) : (
            <form onSubmit={subscribe} className="mt-4 flex gap-2">
              <label className="sr-only" htmlFor="footer-email">
                Email
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="field h-12 bg-white/10 text-cream placeholder:text-cream/50"
              />
              <button type="submit" className="btn btn-light h-12 shrink-0 px-4" aria-label="Join the list">
                <ArrowRight size={18} />
              </button>
            </form>
          )}
          {error ? <p className="mt-2 text-xs text-[#f0c2b8]">{error}</p> : null}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-5 text-sm text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vantage Estates. Sample listings for this demonstration.</p>
          <p>Equal Housing Opportunity.</p>
        </div>
      </div>
    </footer>
  )
}
