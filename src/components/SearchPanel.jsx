import { ChevronDown, MapPin, Search } from 'lucide-react'
import { places } from '../data/properties'
import { allTypes, bedOptions, propertyTypes, rentPrices, salePrices } from '../data/site'

function SelectField({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <span className="relative block">
        <select className="field appearance-none pr-10" value={value} onChange={onChange} aria-label={label}>
          {children}
        </select>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-ink-soft"
        />
      </span>
    </label>
  )
}

export default function SearchPanel({
  intent = 'sale',
  values,
  onChange,
  onIntent,
  onSubmit,
  submitLabel = 'Search',
}) {
  const prices = intent === 'rent' ? rentPrices : salePrices
  const types =
    values.category === 'commercial'
      ? propertyTypes.commercial
      : values.category === 'residential'
        ? propertyTypes.residential
        : allTypes
  const priceValue = prices.some((item) => item.value === values.price) ? values.price : ''

  function update(key, value) {
    onChange({ ...values, [key]: value })
  }

  return (
    <form
      role="search"
      aria-label="Search properties"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.()
      }}
      className="w-full rounded-[28px] bg-paper/95 p-3 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.55)] ring-1 ring-white/40 backdrop-blur-md sm:p-4"
    >
      <div className="mb-3 flex w-full rounded-full bg-cream p-1 sm:w-fit">
        {[
          ['sale', 'Buy'],
          ['rent', 'Rent'],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => onIntent(key)}
            className={`flex-1 rounded-full px-5 py-2 text-sm transition sm:flex-none ${
              intent === key ? 'bg-forest text-cream' : 'text-ink-soft hover:text-ink'
            }`}
            aria-pressed={intent === key}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-12">
        <label className="relative block xl:col-span-4">
          <span className="sr-only">Location</span>
          <MapPin
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-soft"
          />
          <input
            className="field pr-3 pl-10"
            placeholder="City, neighborhood, or address"
            list="place-suggestions"
            value={values.q}
            autoComplete="off"
            onChange={(event) => update('q', event.target.value)}
          />
          <datalist id="place-suggestions">
            {places.map((place) => (
              <option key={place} value={place} />
            ))}
          </datalist>
        </label>
        <div className="xl:col-span-2">
          <SelectField label="Property type" value={values.type} onChange={(event) => update('type', event.target.value)}>
            <option value="">Any type</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </SelectField>
        </div>
        <div className="xl:col-span-2">
          <SelectField label="Price" value={priceValue} onChange={(event) => update('price', event.target.value)}>
            {prices.map((item) => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </SelectField>
        </div>
        <div className="xl:col-span-2">
          <SelectField label="Bedrooms" value={values.beds} onChange={(event) => update('beds', event.target.value)}>
            {bedOptions.map((item) => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </SelectField>
        </div>
        <div className="md:col-span-2 xl:col-span-2">
          <button type="submit" className="btn btn-primary h-[52px] w-full">
            <Search size={16} aria-hidden="true" />
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  )
}
