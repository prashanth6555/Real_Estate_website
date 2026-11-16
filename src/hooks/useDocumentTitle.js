import { useEffect } from 'react'

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} · Vantage`
      : 'Vantage — Homes, rentals, and commercial space'
  }, [title])
}
