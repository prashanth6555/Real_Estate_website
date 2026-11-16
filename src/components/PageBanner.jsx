export default function PageBanner({ eyebrow, title, text, image }) {
  return (
    <section className="relative flex min-h-[420px] w-full items-end overflow-hidden bg-ink">
      <img
        src={image}
        alt=""
        className="hero-drift absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/50 to-ink/55" />
      <div className="shell relative z-10 w-full pb-12 pt-32 text-cream md:pb-16">
        <p className="kicker text-copper">{eyebrow}</p>
        <h1 className="display mt-4 max-w-5xl text-cream">{title}</h1>
        {text ? <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg">{text}</p> : null}
      </div>
    </section>
  )
}
