import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { company, navLinks } from '../data/site'

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const solid = !isHome || scrolled || open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full transition-colors duration-300 ${
          solid ? 'bg-paper/92 text-ink shadow-[0_1px_0_rgba(28,25,21,0.08)] backdrop-blur-md' : 'bg-transparent text-white'
        }`}
      >
        <div className="shell flex h-[76px] items-center justify-between gap-4">
          <NavLink
            to="/"
            className="flex items-center gap-2.5"
            onClick={() => {
              if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-current">
              <span className="font-display text-lg leading-none">V</span>
            </span>
            <span className="text-[1.05rem] font-medium tracking-[0.22em]">VANTAGE</span>
          </NavLink>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-[0.95rem] transition-colors ${
                    isActive ? 'text-copper' : solid ? 'text-ink hover:text-forest' : 'text-white/90 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={company.phoneHref}
              className={`hidden items-center gap-2 text-sm xl:flex ${solid ? 'text-ink' : 'text-white'}`}
            >
              <Phone size={16} aria-hidden="true" />
              {company.phone}
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-current lg:hidden"
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-ink text-cream transition duration-300 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav className="shell flex h-full flex-col justify-center gap-3 pb-16" aria-label="Mobile">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              style={{ transitionDelay: open ? `${80 + index * 45}ms` : '0ms' }}
              className={({ isActive }) =>
                `font-display text-5xl tracking-tight transition duration-500 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                } ${isActive ? 'text-copper' : 'text-cream'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a href={company.phoneHref} className="mt-6 text-lg text-cream/80">
            {company.phone}
          </a>
        </nav>
      </div>
    </>
  )
}
