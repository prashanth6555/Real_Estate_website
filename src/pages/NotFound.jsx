import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Page not found')

  return (
    <section className="shell flex min-h-[70svh] w-full flex-col items-start justify-center pt-28">
      <p className="kicker text-copper">404</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">This address is not on our map.</h1>
      <p className="mt-4 max-w-md text-ink-soft">The page may have moved. The listings are still where you left them.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="btn btn-primary">
          Back home
        </Link>
        <Link to="/buy" className="btn btn-line">
          Browse homes
        </Link>
      </div>
    </section>
  )
}
