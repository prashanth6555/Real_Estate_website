import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-svh w-full flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[90] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main" key={pathname} tabIndex={-1} className="page-in w-full flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
