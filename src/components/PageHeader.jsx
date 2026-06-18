const gradientOverlays = (
  <>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(18,242,21,0.10),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(255,138,0,0.06),transparent_40%)]" />
    <div className="absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(circle_at_center,rgba(18,242,21,0.10),rgba(0,0,0,0)_65%)] blur-3xl" />
  </>
)

export default function PageHeader({
  badge,
  titleBefore,
  highlight,
  titleAfter,
  description,
  minHeight = 'min-h-[40vh]',
  containerMaxWidth = 'max-w-[900px]',
  backgroundImage,
  children,
}) {
  return (
    <section
      className={`relative isolate flex ${minHeight} items-center overflow-hidden px-4 py-16 sm:px-6 lg:px-10 ${
        backgroundImage
          ? 'bg-black/10 bg-cover bg-center'
          : 'bg-[#060606]'
      }`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {backgroundImage ? (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.30),rgba(0,0,0,0.78))]" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[radial-gradient(circle_at_center,rgba(18,242,21,0.12),rgba(0,0,0,0)_65%)] blur-3xl" />
        </>
      ) : (
        gradientOverlays
      )}

      <div className={`relative z-10 mx-auto flex w-full ${containerMaxWidth} flex-col items-center text-center`}>
        {badge && (
          <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/55 backdrop-blur-sm">
            {badge}
          </div>
        )}

        <h1 className="max-w-[800px] font-['Orbitron',sans-serif] text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[0.94] tracking-[-0.02em] text-white">
          {titleBefore}{' '}
          <span className="text-[#12f215]">{highlight}</span>
          {titleAfter}
        </h1>

        {description && (
          <p className="mt-5 max-w-[600px] text-[clamp(0.95rem,1.8vw,1.15rem)] leading-8 text-white/68">
            {description}
          </p>
        )}

        {children}
      </div>
    </section>
  )
}
