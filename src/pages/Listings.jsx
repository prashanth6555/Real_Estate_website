import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import PropertyCard from '../components/PropertyCard'
import SearchPanel from '../components/SearchPanel'
import { properties } from '../data/properties'
import { allTypes, propertyTypes, rentPrices, salePrices } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { photo } from '../lib/photo'
import { filterProperties, sortProperties } from '../lib/listings'

const categories = [
  { label: 'All', value: '' },
  { label: 'Residential', value: 'residential' },
  { label: 'Commercial', value: 'commercial' },
]

export default function Listings({ intent }) {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const isRent = intent === 'rent'
  useDocumentTitle(isRent ? 'Rent' : 'Buy')

  const values = {
    q: params.get('q') || '',
    type: params.get('type') || '',
    price: params.get('price') || '',
    beds: params.get('beds') || '',
    category: params.get('category') || '',
  }
  const sort = params.get('sort') || 'featured'

  useEffect(() => {
    const next = new URLSearchParams(params)
    let changed = false
    const prices = isRent ? rentPrices : salePrices
    const price = params.get('price') || ''
    if (price && !prices.some((item) => item.value === price)) {
      next.delete('price')
      changed = true
    }
    const category = params.get('category') || ''
    const type = params.get('type') || ''
    const allowed =
      category === 'commercial'
        ? propertyTypes.commercial
        : category === 'residential'
          ? propertyTypes.residential
          : allTypes
    if (type && !allowed.includes(type)) {
      next.delete('type')
      changed = true
    }
    if (changed) setParams(next, { replace: true })
  }, [intent, isRent, params, setParams])

  function write(nextValues, nextSort = sort) {
    const next = new URLSearchParams()
    Object.entries(nextValues).forEach(([key, value]) => {
      if (value) next.set(key, value)
    })
    if (nextSort && nextSort !== 'featured') next.set('sort', nextSort)
    setParams(next, { replace: true })
  }

  function setCategory(category) {
    const allowed =
      category === 'commercial'
        ? propertyTypes.commercial
        : category === 'residential'
          ? propertyTypes.residential
          : allTypes
    write({
      ...values,
      category,
      type: values.type && !allowed.includes(values.type) ? '' : values.type,
    })
  }

  const results = sortProperties(
    filterProperties(properties, {
      intent,
      ...values,
    }),
    sort,
  )

  const priceList = isRent ? rentPrices : salePrices
  const chips = [
    values.q ? { label: values.q, key: 'q' } : null,
    values.category ? { label: values.category, key: 'category' } : null,
    values.type ? { label: values.type, key: 'type' } : null,
    values.price ? { label: priceList.find((item) => item.value === values.price)?.label, key: 'price' } : null,
    values.beds ? { label: `${values.beds}+ bedrooms`, key: 'beds' } : null,
  ].filter((chip) => chip && chip.label)

  return (
    <div className="w-full">
      <PageBanner
        eyebrow={isRent ? 'Rent' : 'Buy'}
        title={isRent ? 'Residences and space for lease.' : 'Homes and buildings for sale.'}
        text={
          isRent
            ? 'Apartments, houses, offices, and shops with a monthly price you can compare on one page.'
            : 'Filter by city, price, type, and bedrooms. Open any listing for the photos, the fine print, and a person to call.'
        }
        image={isRent ? photo('1502672260266-1c1ef2d93688', 2000) : photo('1605276374104-dee2a0ed3cd6', 2000)}
      />

      <div className="sticky top-[76px] z-30 w-full border-b border-line bg-paper/95 backdrop-blur-md">
        <div className="shell py-4">
          <SearchPanel
            intent={intent}
            values={values}
            submitLabel="Update"
            onChange={write}
            onIntent={(next) => {
              const nextParams = new URLSearchParams(params)
              nextParams.delete('price')
              navigate({
                pathname: next === 'rent' ? '/rent' : '/buy',
                search: nextParams.toString(),
              })
            }}
            onSubmit={() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setCategory(item.value)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  values.category === item.value ? 'bg-forest text-cream' : 'bg-white text-ink ring-1 ring-line hover:border-ink'
                }`}
                aria-pressed={values.category === item.value}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section id="results" className="shell w-full scroll-mt-40 py-10 md:py-14">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink-soft" aria-live="polite">
            <span className="font-medium text-ink">{results.length}</span>{' '}
            {results.length === 1 ? 'property' : 'properties'} for {isRent ? 'rent' : 'sale'}
          </p>
          <label className="flex items-center gap-3 text-sm text-ink-soft">
            Sort
            <select
              className="field h-11 w-auto pr-8"
              value={sort}
              aria-label="Sort listings"
              onChange={(event) => write(values, event.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
              <option value="newest">Newest</option>
            </select>
          </label>
        </div>

        {chips.length ? (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {chips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={() => write({ ...values, [chip.key]: '' })}
                className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm ring-1 ring-line"
              >
                {chip.label}
                <X size={14} aria-hidden="true" />
                <span className="sr-only">Remove {chip.label}</span>
              </button>
            ))}
            <button type="button" className="text-sm text-forest underline-offset-4 hover:underline" onClick={() => write(emptyValues())}>
              Clear all
            </button>
          </div>
        ) : null}

        {results.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {results.map((property, index) => (
              <div key={property.id} className="rise-in" style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-line px-6 py-20 text-center">
            <h2 className="font-display text-4xl tracking-tight">Nothing in that range.</h2>
            <p className="mx-auto mt-3 max-w-md text-ink-soft">
              Widen the price, drop a bedroom, or try the city on its own. We can also look off the page.
            </p>
            <button type="button" className="btn btn-primary mt-6" onClick={() => write(emptyValues())}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

function emptyValues() {
  return { q: '', type: '', price: '', beds: '', category: '' }
}
