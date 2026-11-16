import { parsePrice } from './format'

export function filterProperties(list, { intent, q, type, price, beds, category }) {
  const { min, max } = parsePrice(price)
  const words = (q || '').trim().toLowerCase().split(/\s+/).filter(Boolean)
  const minBeds = beds ? Number(beds) : 0

  return list.filter((property) => {
    if (intent && property.status !== intent) return false
    if (category && property.category !== category) return false
    if (type && property.type !== type) return false
    if (property.price < min || property.price > max) return false
    if (minBeds && (property.beds || 0) < minBeds) return false
    if (words.length) {
      const hay = [
        property.title,
        property.city,
        property.neighborhood,
        property.address,
        property.type,
        property.category,
      ]
        .join(' ')
        .toLowerCase()
      if (words.some((word) => !hay.includes(word))) return false
    }
    return true
  })
}

export function sortProperties(list, sort) {
  const copy = [...list]
  if (sort === 'price-asc') return copy.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') return copy.sort((a, b) => b.price - a.price)
  if (sort === 'newest') return copy.sort((a, b) => b.yearBuilt - a.yearBuilt)
  return copy.sort((a, b) => Number(b.featured) - Number(a.featured) || b.price - a.price)
}
