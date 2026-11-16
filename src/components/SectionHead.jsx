export default function SectionHead({ kicker, title, text, action }) {
  return (
    <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {kicker ? <p className="kicker text-copper">{kicker}</p> : null}
        <h2 className="mt-2 font-display text-[2.35rem] leading-[1.05] tracking-tight text-ink md:text-5xl">
          {title}
        </h2>
        {text ? <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">{text}</p> : null}
      </div>
      {action}
    </div>
  )
}
