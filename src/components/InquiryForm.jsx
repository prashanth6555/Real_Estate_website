import { Check } from 'lucide-react'
import { useId, useState } from 'react'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values, extraFields) {
  const errors = {}
  if (!values.name || values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!emailPattern.test(values.email || '')) errors.email = 'Enter a valid email address.'
  if ((values.phone || '').replace(/\D/g, '').length < 7) {
    errors.phone = 'Enter a phone number we can reach you on.'
  }
  if (!values.message || values.message.trim().length < 10) {
    errors.message = 'Add a few more words so we know how to help.'
  }
  extraFields.forEach((field) => {
    if (!field.required) return
    if (!values[field.name] || !String(values[field.name]).trim()) {
      errors[field.name] = 'This field is required.'
    }
  })
  return errors
}

function FieldShell({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium tracking-[0.12em] text-ink-soft uppercase">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1.5 text-xs text-[#8d3b32]">{error}</p> : null}
    </div>
  )
}

export default function InquiryForm({
  title = 'Send a message',
  note,
  submitLabel = 'Send message',
  extraFields = [],
  defaultMessage = '',
}) {
  const uid = useId()
  const blank = {
    name: '',
    email: '',
    phone: '',
    message: defaultMessage,
    ...Object.fromEntries(extraFields.map((field) => [field.name, ''])),
  }
  const [values, setValues] = useState(blank)
  const [errors, setErrors] = useState({})
  const [sentName, setSentName] = useState('')

  function update(name, value) {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values, extraFields)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setSentName(values.name.trim())
  }

  if (sentName) {
    return (
      <div className="rounded-3xl bg-white p-8 ring-1 ring-line">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-forest text-cream">
          <Check size={20} aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-4xl tracking-tight">Thank you, {sentName}.</h3>
        <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
          Your note stays in this browser. This is a demonstration form, so nothing is emailed. On a live site, an
          advisor would reply within one business day.
        </p>
        <button
          type="button"
          className="btn btn-line mt-6"
          onClick={() => {
            setValues(blank)
            setSentName('')
            setErrors({})
          }}
        >
          Write another note
        </button>
      </div>
    )
  }

  const fields = [
    { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
    { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel' },
    ...extraFields,
    { name: 'message', label: 'Message', type: 'textarea' },
  ]

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8" noValidate>
      <h3 className="font-display text-3xl tracking-tight md:text-4xl">{title}</h3>
      {note ? <p className="mt-2 text-sm leading-relaxed text-ink-soft">{note}</p> : null}
      <div className="mt-6 grid gap-4">
        {fields.map((field) => {
          const id = `${uid}-${field.name}`
          const invalid = Boolean(errors[field.name])
          if (field.type === 'select') {
            return (
              <FieldShell key={field.name} id={id} label={field.label} error={errors[field.name]}>
                <select
                  id={id}
                  className="field"
                  value={values[field.name] || ''}
                  aria-invalid={invalid}
                  onChange={(event) => update(field.name, event.target.value)}
                >
                  <option value="">Select</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FieldShell>
            )
          }
          if (field.type === 'textarea') {
            return (
              <FieldShell key={field.name} id={id} label={field.label} error={errors[field.name]}>
                <textarea
                  id={id}
                  className="field"
                  rows={5}
                  value={values[field.name]}
                  aria-invalid={invalid}
                  onChange={(event) => update(field.name, event.target.value)}
                />
              </FieldShell>
            )
          }
          return (
            <FieldShell key={field.name} id={id} label={field.label} error={errors[field.name]}>
              <input
                id={id}
                className="field"
                type={field.type}
                autoComplete={field.autoComplete}
                value={values[field.name]}
                aria-invalid={invalid}
                onChange={(event) => update(field.name, event.target.value)}
              />
            </FieldShell>
          )
        })}
      </div>
      <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto">
        {submitLabel}
      </button>
    </form>
  )
}
