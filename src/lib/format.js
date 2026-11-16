export function money(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function number(value) {
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatPrice(property) {
  const amount = money(property.price)
  return property.status === 'rent' ? `${amount}/mo` : amount
}

export function parsePrice(value) {
  if (!value) return { min: 0, max: Infinity }
  const [rawMin, rawMax] = String(value).split('-')
  const min = rawMin ? Number(rawMin) : 0
  const max = rawMax ? Number(rawMax) : Infinity
  return {
    min: Number.isFinite(min) ? min : 0,
    max: Number.isFinite(max) ? max : Infinity,
  }
}
