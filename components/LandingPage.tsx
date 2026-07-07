'use client'

import { useState, useEffect, useRef } from 'react'

/* ─── Logo ────────────────────────────────────────────────────── */
function MiraLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <circle cx="50" cy="50" r="50" fill="#0F0E0C" />
      <line x1="50" y1="43" x2="50" y2="12" stroke="#C9A882" strokeWidth="5" strokeLinecap="round" />
      <line x1="56.1" y1="46.5" x2="82.9" y2="31" stroke="#C9A882" strokeWidth="5" strokeLinecap="round" />
      <line x1="56.1" y1="53.5" x2="82.9" y2="69" stroke="#C9A882" strokeWidth="5" strokeLinecap="round" />
      <line x1="50" y1="57" x2="50" y2="88" stroke="#C9A882" strokeWidth="5" strokeLinecap="round" />
      <line x1="43.9" y1="53.5" x2="17.1" y2="69" stroke="#C9A882" strokeWidth="5" strokeLinecap="round" />
      <line x1="43.9" y1="46.5" x2="17.1" y2="31" stroke="#C9A882" strokeWidth="5" strokeLinecap="round" />
      <circle cx="50" cy="50" r="3.5" stroke="#0F0E0C" strokeWidth="2" fill="none" />
    </svg>
  )
}

/* ─── Global modal trigger ────────────────────────────────────── */
const openDemoModal = () =>
  typeof window !== 'undefined' &&
  window.dispatchEvent(new CustomEvent('mira:openDemo'))

/* ─── Contact Modal ───────────────────────────────────────────── */
function ContactModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', properties: '1' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const field = (label: string, key: keyof typeof form, type = 'text', placeholder = '') => (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-[11px] font-[500] text-text-muted uppercase tracking-[0.05em]">
        {label} *
      </label>
      <input
        required
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        className="w-full font-body text-[13px] text-text-primary placeholder:text-text-muted rounded-xl px-3 py-2.5 outline-none transition-colors"
        style={{ background: '#221F1B', border: '1px solid rgba(255,255,255,0.1)' }}
      />
    </div>
  )

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(10px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-[480px] rounded-2xl p-8 relative"
        style={{ background: '#1A1814', border: '1px solid rgba(201,168,130,0.22)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {status === 'sent' ? (
          <div className="flex flex-col items-center gap-5 py-6 text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(122,175,110,0.12)', border: '1px solid rgba(122,175,110,0.3)' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 11l5 5 9-9" stroke="#7AAF6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-[24px] text-text-primary mb-2">We&apos;ll be in touch.</h3>
              <p className="font-body text-[14px] font-[300] text-text-secondary leading-[1.7]">
                Expect a reply within 24 hours to set up your Mira demo.
              </p>
            </div>
            <button onClick={onClose} className="btn-ghost text-[13px]">Close</button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <Eyebrow>Book a Demo</Eyebrow>
              <h3 className="font-display text-[24px] text-text-primary mt-2">See Mira in action.</h3>
              <p className="font-body text-[13px] font-[300] text-text-secondary mt-1">
                We&apos;ll reach out within 24 hours to walk you through a live call.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                {field('Name', 'name', 'text', 'Your name')}
                {field('Phone', 'phone', 'tel', 'Your phone number')}
              </div>
              {field('Email', 'email', 'email', 'you@yourbusiness.com')}

              <div className="flex flex-col gap-1.5">
                <label className="font-body text-[11px] font-[500] text-text-muted uppercase tracking-[0.05em]">
                  Properties managed
                </label>
                <select
                  value={form.properties}
                  onChange={e => setForm(f => ({ ...f, properties: e.target.value }))}
                  className="w-full font-body text-[13px] text-text-primary rounded-xl px-3 py-2.5 outline-none transition-colors"
                  style={{ background: '#221F1B', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <option value="1">1 property</option>
                  <option value="2-3">2–3 properties</option>
                  <option value="4-10">4–10 properties</option>
                  <option value="10+">10+ properties</option>
                </select>
              </div>

              {status === 'error' && (
                <p className="font-body text-[12px]" style={{ color: '#D94F3D' }}>
                  Something went wrong. Email us at miraoncall@gmail.com
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full justify-center mt-1"
                style={{ padding: '13px 24px', fontSize: '14px', opacity: status === 'sending' ? 0.7 : 1 }}
              >
                {status === 'sending' ? 'Sending…' : 'Book a Demo →'}
              </button>

              <p className="font-body text-[11px] text-text-muted text-center">
                No commitment &nbsp;·&nbsp; We respond within 24 hours
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

/* ─── Shared atoms ────────────────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">✳ {children}</p>
}

function LiveDot({ fast = false }: { fast?: boolean }) {
  return (
    <span
      className="inline-block w-[7px] h-[7px] rounded-full bg-live dot-pulse"
      style={{ animationDuration: fast ? '0.8s' : '2s' }}
      aria-hidden
    />
  )
}

/* ─── Scroll reveal ───────────────────────────────────────────── */
function Reveal({ children, className = '', delay = 0 }: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`section-reveal${vis ? ' visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ─── Nav ─────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Industries', href: '#industries' },
  ]

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 h-[60px] transition-all duration-300 ${
        scrolled ? 'backdrop-blur-[12px] bg-[rgba(15,14,12,0.90)] border-b border-white/[0.08]' : ''
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group" aria-label="Mira home">
          <MiraLogo size={34} />
          <span className="font-display text-[21px] text-text-primary tracking-[-0.5px] leading-none">Mira</span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="font-body text-[13px] font-[400] text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button onClick={openDemoModal} className="hidden md:flex btn-primary" style={{ padding: '8px 18px', fontSize: '13px', borderRadius: '11px' }}>
          Book a Demo →
        </button>

        <button
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors duration-150 p-1"
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {open
              ? <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              : <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            }
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-[60px] inset-x-0 bg-[#0F0E0C] border-b border-white/[0.08] py-5 px-6 flex flex-col gap-5">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="font-body text-[15px] text-text-secondary hover:text-text-primary transition-colors duration-150"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <button className="btn-primary w-fit" onClick={() => { setOpen(false); openDemoModal() }}>
            Book a Demo →
          </button>
        </div>
      )}
    </nav>
  )
}

/* ─── Hero ────────────────────────────────────────────────────── */
function Hero() {
  const [callActive, setCallActive] = useState(false)

  return (
    <section
      id="solutions"
      className="relative min-h-screen flex items-center pt-[60px] overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full" style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,130,0.07) 0%, transparent 70%)' }} />
      <div aria-hidden className="pointer-events-none absolute bottom-[10%] right-[10%] w-[500px] h-[400px] rounded-full" style={{ background: 'radial-gradient(ellipse at center, rgba(217,79,61,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-[1200px] mx-auto px-6 w-full py-20 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — copy */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Eyebrow>AI Front Desk for Short-Term Rentals</Eyebrow>

            <div className="flex items-center gap-2 mt-1">
              {['EN', 'ES', 'FR', '+more'].map((lang, i) => (
                <span
                  key={lang}
                  className="inline-block px-3 py-1 rounded-full border border-white/[0.1] font-body text-[11px] font-[500]"
                  style={{ color: i === 3 ? '#C9A882' : '#8A7E72', borderColor: i === 3 ? 'rgba(201,168,130,0.3)' : undefined }}
                >
                  {lang}
                </span>
              ))}
              <span className="font-body text-[11px] text-text-muted">· multilingual guest support</span>
            </div>
          </div>

          <h1 className="font-display text-hero text-text-primary">
            Never miss another<br />
            guest{' '}
            <em style={{ color: '#C9A882', fontStyle: 'italic' }}>call.</em>
          </h1>

          <p className="font-body text-[18px] font-[300] text-text-secondary leading-[1.65]" style={{ maxWidth: '500px' }}>
            Mira is your 24/7 AI Front Desk — answering guest calls, handling booking enquiries, resolving FAQs, routing requests, and sending you a summary after every interaction.
          </p>

          <ul className="flex flex-col gap-2">
            {[
              'Never miss a booking opportunity',
              'Answer every guest instantly, around the clock',
              'Free up your team from repetitive calls',
            ].map(item => (
              <li key={item} className="flex items-center gap-2.5 font-body text-[14px] text-text-secondary">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <path d="M2.5 7l3 3 6-6" stroke="#C9A882" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 mt-2">
            <button onClick={openDemoModal} className="btn-primary">
              Book a Demo →
            </button>
            <a href="/demo.html" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" />
                <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" />
              </svg>
              See Mira in action
            </a>
          </div>

          <p className="font-body text-[12px] text-text-muted">
            No credit card &nbsp;·&nbsp; Setup in 10 minutes &nbsp;·&nbsp; Works for any hospitality business
          </p>
        </div>

        {/* Right — demo widget */}
        <div className="flex justify-center md:justify-end">
          <div className="card w-full max-w-[400px] p-6 flex flex-col gap-5 relative" style={{ background: '#1A1814' }}>
            <div className="flex items-center justify-between">
              <span className="eyebrow" style={{ color: '#8A7E72' }}>Live guest call</span>
              <span className="flex items-center gap-1.5 font-body text-[11px] text-text-secondary">
                <LiveDot />
                24/7
              </span>
            </div>

            <div className="flex flex-col items-center gap-4 py-2">
              <div className="relative flex items-center justify-center w-[120px] h-[120px]">
                <div
                  className="absolute inset-0 rounded-full ring-breathe"
                  style={{ border: `1px solid ${callActive ? '#D94F3D' : '#C9A882'}` }}
                />
                <div
                  className={`absolute rounded-full ${callActive ? 'ring-ripple' : 'ring-breathe'}`}
                  style={{
                    inset: '-16px',
                    border: `1px solid ${callActive ? '#D94F3D' : '#C9A882'}`,
                    animationDuration: callActive ? '1.8s' : '2.5s',
                    animationDelay: callActive ? '0s' : '0.6s',
                  }}
                />
                {callActive && (
                  <div className="absolute ring-ripple" style={{ inset: '-28px', border: '1px solid #D94F3D', animationDelay: '0.9s' }} />
                )}
                <button
                  onClick={() => setCallActive(a => !a)}
                  className="relative z-10 w-[56px] h-[56px] rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ background: callActive ? '#D94F3D' : '#221F1B', border: `1px solid ${callActive ? '#D94F3D' : 'rgba(201,168,130,0.3)'}` }}
                  aria-label={callActive ? 'End call' : 'Call Mira'}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 18.5c-3.5 0-7-1.5-9.5-4S1 8.5 1 5c0-.6.4-1 1-1h4c.5 0 .9.4 1 .9l.8 3.4c.1.4-.1.9-.4 1.1L6 10.7c1.5 2.7 3.7 4.8 6.3 6.3l1.3-1.4c.3-.3.7-.5 1.1-.4l3.4.8c.5.1.9.5.9 1V22c0 .6-.4 1-1 1-3.5 0-7-1.5-9.5-4z" fill={callActive ? '#fff' : '#C9A882'} />
                  </svg>
                </button>
              </div>
              <span className="font-body text-[12px] text-text-muted">
                {callActive ? 'Speaking with Mira…' : 'Tap to call Mira'}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-start">
                <span className="shrink-0 w-6 h-6 rounded-full bg-surface-raised border border-white/[0.1] flex items-center justify-center font-body text-[9px] text-text-muted font-[500]">G</span>
                <div className="flex-1 rounded-xl rounded-tl-sm px-3 py-2" style={{ background: '#221F1B', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="font-body text-[13px] text-text-secondary leading-snug">
                    &ldquo;Hi — what&apos;s check-in time? We arrive around 4 PM.&rdquo;
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start flex-row-reverse">
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-display text-[11px] italic" style={{ background: 'rgba(217,79,61,0.15)', color: '#D94F3D', border: '1px solid rgba(217,79,61,0.25)' }}>M</span>
                <div className="flex-1 rounded-xl rounded-tr-sm px-3 py-2" style={{ background: 'rgba(217,79,61,0.1)', border: '1px solid rgba(217,79,61,0.2)' }}>
                  <p className="font-body text-[13px] text-text-primary leading-snug">
                    Welcome! Check-in is from <strong>3 PM</strong>, so you&apos;re all set. I&apos;ll send the key code to your number now. Anything else?
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-body text-[11px] px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#8A7E72', border: '1px solid rgba(255,255,255,0.08)' }}>
                Check-in query
              </span>
              <span className="font-body text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1" style={{ background: 'rgba(122,175,110,0.1)', color: '#7AAF6E', border: '1px solid rgba(122,175,110,0.2)' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Summary sent
              </span>
            </div>
          </div>
        </div>
      </div>

      <a href="#social-proof" aria-label="Scroll down" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted hover:text-text-secondary transition-colors duration-150" style={{ animation: 'pulseDot 2.5s ease-in-out infinite' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  )
}

/* ─── Social Proof Strip ──────────────────────────────────────── */
function SocialProofBar() {
  const items = [
    'Works for vacation rentals, boutique hotels & hostels',
    'Multilingual guest support',
    'Works from any device — no app required',
    'Post-call summary after every interaction',
  ]

  return (
    <div id="social-proof" className="w-full border-y font-body text-[13px] text-text-muted" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-4">
            <span className="italic">{item}</span>
            {i < items.length - 1 && <span className="hidden sm:inline text-text-muted/40">&middot;</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Stats Bar ───────────────────────────────────────────────── */
function StatsBar() {
  const stats = [
    { number: '24/7', label: 'Always available' },
    { number: '100%', label: 'Calls answered' },
    { number: '<60s', label: 'Response time' },
    { number: '6+', label: 'Languages supported' },
  ]

  return (
    <section className="w-full py-16" style={{ background: '#1A1814' }}>
      <Reveal>
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map(({ number, label }, i) => (
            <Reveal key={label} delay={i * 60}>
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="font-display text-text-primary" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                  {number}
                </span>
                <span className="font-body text-[13px] text-text-muted">{label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/* ─── Problem Section ─────────────────────────────────────────── */
function ProblemSection() {
  const cards = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#D94F3D" strokeWidth="1.5"/><path d="M12 7v5l3 3" stroke="#D94F3D" strokeWidth="1.5" strokeLinecap="round"/></svg>
      ),
      title: 'Guests expect instant answers',
      body: 'A missed call or a 10-minute wait is all it takes for a guest to book somewhere else. Availability is no longer optional.',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 12h18M3 6h18M3 18h12" stroke="#D94F3D" strokeWidth="1.5" strokeLinecap="round"/></svg>
      ),
      title: 'Repetitive calls drain your team',
      body: 'Check-in times, WiFi passwords, parking directions — the same questions, every day. Your team deserves better than a script.',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#D94F3D" strokeWidth="1.5" strokeLinejoin="round"/></svg>
      ),
      title: 'Nothing gets logged or followed up',
      body: 'Guest requests buried in call history. No record, no accountability. Problems surface in reviews, not where you can fix them.',
    },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-14 max-w-[640px]">
            <h2 className="font-display text-h2 text-text-primary mb-4">
              Every unanswered call<br />
              is a booking you{' '}
              <em style={{ color: '#C9A882' }}>didn&apos;t get.</em>
            </h2>
            <p className="font-body text-[17px] font-[300] text-text-secondary leading-[1.65]">
              Guest expectations have changed. They want answers now — not voicemail, not a callback in the morning. Hospitality businesses that respond instantly win the booking.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {cards.map(({ icon, title, body }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="card p-6 flex flex-col gap-4 h-full">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(217,79,61,0.1)', border: '1px solid rgba(217,79,61,0.2)' }}>
                  {icon}
                </div>
                <div>
                  <h3 className="font-body text-[15px] font-[500] text-text-primary mb-1.5">{title}</h3>
                  <p className="font-body text-[14px] font-[300] text-text-secondary leading-[1.6]">{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Call Flow ───────────────────────────────────────────────── */
function CallFlow() {
  const steps = [
    { icon: '📞', label: 'Guest Calls', color: '#C9A882' },
    { icon: '🎙️', label: 'Mira Answers', color: '#C9A882' },
    { icon: '✅', label: 'Resolves & Logs', color: '#C9A882' },
    { icon: '🔁', label: 'Escalates if Needed', color: '#E8A030' },
    { icon: '📋', label: 'Summary Sent', color: '#7AAF6E' },
  ]

  return (
    <section className="py-16 px-6" style={{ background: '#1A1814' }}>
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-10 text-center">
            <Eyebrow>How every call works</Eyebrow>
          </div>
        </Reveal>
        <Reveal>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-0 overflow-x-auto">
            {steps.map(({ icon, label, color }, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center gap-3 px-4 py-4 min-w-[120px]">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${color}30` }}
                  >
                    {icon}
                  </div>
                  <span className="font-body text-[12px] font-[500] text-center leading-snug" style={{ color }}>
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden sm:block shrink-0 mx-1" style={{ color: 'rgba(255,255,255,0.15)' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── How It Works ────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Configure your property knowledge',
      body: 'Tell Mira your check-in rules, amenities, FAQs, and local info. Takes 10 minutes. Done once, updated anytime.',
    },
    {
      n: '02',
      title: 'Guests reach Mira on any call',
      body: 'Share a number or browser link. Guests call, Mira picks up — instantly. No app, no hardware, no hold music.',
    },
    {
      n: '03',
      title: 'You get a summary after every call',
      body: 'Mira logs what was asked, what was said, and flags anything that needs your attention. One tap to follow up.',
    },
  ]

  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-16 max-w-[540px]">
            <Eyebrow>How It Works</Eyebrow>
            <h2 className="font-display text-h2 text-text-primary mt-3">
              Up and running in<br />
              <em style={{ color: '#C9A882' }}>10 minutes.</em>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-8 left-[33%] right-[33%] h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          {steps.map(({ n, title, body }, i) => (
            <Reveal key={n} delay={i * 100}>
              <div className="card p-7 flex flex-col gap-5 h-full">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center font-body text-[12px] font-[600] shrink-0" style={{ background: 'rgba(201,168,130,0.1)', border: '1px solid rgba(201,168,130,0.25)', color: '#C9A882' }}>
                    {n}
                  </span>
                  <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
                </div>
                <div>
                  <h3 className="font-body text-[16px] font-[500] text-text-primary mb-2">{title}</h3>
                  <p className="font-body text-[14px] font-[300] text-text-secondary leading-[1.65]">{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Guest Workflows ─────────────────────────────────────────── */
function WorkflowsGrid() {
  const workflows = [
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#C9A882" strokeWidth="1.5"/><path d="M8 2v4M16 2v4M3 10h18" stroke="#C9A882" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title: 'Booking Enquiries',
      body: 'Mira answers availability questions, rates, and check-in details — turning enquiries into confirmed guests.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#C9A882" strokeWidth="1.5"/><path d="M12 8v4l2 2" stroke="#C9A882" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title: 'Property FAQs',
      body: 'WiFi, parking, house rules, amenities, local recommendations — Mira has answers ready before guests even ask.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#C9A882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#C9A882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      title: 'Reservation Changes',
      body: 'Early check-in, late checkout, extension requests — Mira captures the details and routes them to you for approval.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="#C9A882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      title: 'Maintenance & Service Requests',
      body: 'Guests report issues — AC not working, broken lock, missing towels. Mira logs it and alerts the right person immediately.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.04 8.68A16 16 0 0015.36 18l1.21-1.21a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0123.3 19z" stroke="#C9A882" strokeWidth="1.5" strokeLinecap="round"/><polyline points="15 3 21 3 21 9" stroke="#C9A882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="10" y1="14" x2="21" y2="3" stroke="#C9A882" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title: 'Smart Call Transfer',
      body: 'When a situation needs a human touch, Mira transfers the call to you — briefed, warm, and without the guest waiting on hold.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#C9A882" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
      title: 'Post-Call Summary',
      body: 'After every call, you get a clean digest — what was asked, how it was handled, and any open items. Nothing falls through the cracks.',
    },
  ]

  return (
    <section className="py-24 px-6" style={{ background: '#1A1814' }}>
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-14 max-w-[560px]">
            <Eyebrow>Guest Workflows</Eyebrow>
            <h2 className="font-display text-h2 text-text-primary mt-3">
              Every guest interaction,<br />
              <em style={{ color: '#C9A882' }}>handled.</em>
            </h2>
            <p className="font-body text-[17px] font-[300] text-text-secondary leading-[1.65] mt-3">
              From the first booking enquiry to post-stay follow-ups, Mira covers the full guest journey — so your team focuses on what matters.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflows.map(({ icon, title, body }, i) => (
            <Reveal key={title} delay={i * 50}>
              <div className="card p-6 flex flex-col gap-4 h-full">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(201,168,130,0.08)', border: '1px solid rgba(201,168,130,0.18)' }}>
                  {icon}
                </div>
                <div>
                  <h3 className="font-body text-[15px] font-[500] text-text-primary mb-1.5">{title}</h3>
                  <p className="font-body text-[13px] font-[300] text-text-secondary leading-[1.65]">{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Industries ──────────────────────────────────────────────── */
function IndustriesSection() {
  const industries = [
    { name: 'Vacation Rentals', icon: '🏖️', desc: 'Villas, beach houses, mountain cabins' },
    { name: 'Homestays', icon: '🏡', desc: 'Owner-operated, personal hosting' },
    { name: 'Boutique Hotels', icon: '🏨', desc: 'Independent properties & small chains' },
    { name: 'Hostels', icon: '🛏️', desc: 'High-volume, budget-conscious operations' },
    { name: 'Serviced Apartments', icon: '🏢', desc: 'Extended stays, corporate guests' },
    { name: 'Vacation Villas', icon: '🌴', desc: 'Luxury properties, multi-room estates' },
  ]

  return (
    <section id="industries" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-14 text-center max-w-[560px] mx-auto">
            <Eyebrow>Industries</Eyebrow>
            <h2 className="font-display text-h2 text-text-primary mt-3">
              Built for every corner of{' '}
              <em style={{ color: '#C9A882' }}>hospitality.</em>
            </h2>
            <p className="font-body text-[17px] font-[300] text-text-secondary leading-[1.65] mt-3">
              Whether you manage one property or fifty, Mira adapts to your operation — no two setups are alike.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map(({ name, icon, desc }, i) => (
            <Reveal key={name} delay={i * 60}>
              <div className="card p-5 flex items-center gap-4 h-full" style={{ background: '#1A1814' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,130,0.12)' }}>
                  {icon}
                </div>
                <div>
                  <h3 className="font-body text-[14px] font-[500] text-text-primary">{name}</h3>
                  <p className="font-body text-[12px] font-[300] text-text-muted mt-0.5">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── A Night With Mira ───────────────────────────────────────── */
function NightWithMira() {
  const calls = [
    {
      time: '11:00 PM',
      label: 'Late check-in',
      guest: "Hi — we're running late, arriving around midnight. Will that be okay?",
      mira: "Absolutely, no problem at all. Self check-in instructions are in your booking confirmation. The key code is 4821. I've noted your arrival — is there anything else you need?",
    },
    {
      time: '2:14 AM',
      label: 'Maintenance request',
      guest: "The AC isn't cooling properly — it's really warm in here.",
      mira: "I'm sorry to hear that. Let me try a few quick fixes first — can you check if the thermostat is set below 22°C and the vents aren't blocked? I'm also flagging this for the property team right now.",
      urgent: true,
    },
    {
      time: '6:02 AM',
      label: 'Early departure',
      guest: "We need to leave by 6:30 — our flight is at 9. Is that okay?",
      mira: "Of course. Just leave the key in the lockbox and pull the door shut. I'll note your early departure. Safe travels — thanks for staying with us!",
    },
  ]

  return (
    <section className="py-24 px-6 overflow-hidden" style={{ background: '#1A1814' }}>
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-16 flex flex-col items-center text-center">
            <Eyebrow>A night with Mira</Eyebrow>
            <h2 className="font-display text-h2 text-text-primary mt-3 max-w-[600px]">
              While you slept, Mira handled{' '}
              <em style={{ color: '#C9A882' }}>everything.</em>
            </h2>
          </div>
        </Reveal>

        <div className="relative max-w-[800px] mx-auto">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,130,0.2) 10%, rgba(201,168,130,0.2) 90%, transparent)', transform: 'translateX(-50%)' }} aria-hidden />

          <div className="flex flex-col gap-10">
            {calls.map(({ time, label, guest, mira, urgent }, i) => (
              <Reveal key={time} delay={i * 100}>
                <div className={`relative flex flex-col md:flex-row gap-6 md:gap-10 items-start ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2 flex flex-col items-start md:items-end gap-1">
                    <span className="font-body text-[11px] text-text-muted" style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</span>
                    <span className="eyebrow" style={{ color: urgent ? '#D94F3D' : '#8A7E72' }}>{label}</span>
                  </div>

                  <div className="hidden md:flex absolute left-1/2 top-1 -translate-x-1/2 w-2 h-2 rounded-full" style={{ background: urgent ? '#D94F3D' : '#C9A882', boxShadow: urgent ? '0 0 8px rgba(217,79,61,0.5)' : '0 0 8px rgba(201,168,130,0.4)' }} aria-hidden />

                  <div className="md:w-1/2 flex flex-col gap-3">
                    <div className="flex gap-2 items-start">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-surface-raised border border-white/[0.1] flex items-center justify-center font-body text-[9px] text-text-muted font-[500]">G</span>
                      <div className="rounded-xl rounded-tl-sm px-3 py-2.5" style={{ background: '#221F1B', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <p className="font-body text-[13px] text-text-secondary leading-snug">&ldquo;{guest}&rdquo;</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-start flex-row-reverse">
                      <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-display text-[11px] italic" style={{ background: 'rgba(217,79,61,0.15)', color: '#D94F3D', border: '1px solid rgba(217,79,61,0.25)' }}>M</span>
                      <div className="rounded-xl rounded-tr-sm px-3 py-2.5" style={{ background: urgent ? 'rgba(217,79,61,0.12)' : 'rgba(217,79,61,0.08)', border: `1px solid ${urgent ? 'rgba(217,79,61,0.3)' : 'rgba(217,79,61,0.18)'}` }}>
                        <p className="font-body text-[13px] text-text-primary leading-snug">{mira}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <p className="text-center font-body text-[13px] text-text-muted mt-12">
            You woke up to three clean summaries. Your guests left five-star reviews.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Comparison ──────────────────────────────────────────────── */
function ComparisonSection() {
  const rows = [
    { label: 'Availability', bad: 'Office hours only', good: '24/7 — never offline' },
    { label: 'Response time', bad: '2–10 minutes on hold', good: 'Instant — every call' },
    { label: 'Consistency', bad: 'Varies by staff member', good: 'Same quality, every time' },
    { label: 'Languages', bad: '1–2 typically', good: 'Multilingual support' },
    { label: 'Call records', bad: 'Manual notes or nothing', good: 'Automatic summary after each call' },
    { label: 'Scales with properties', bad: 'Hire more staff', good: 'No extra cost or setup' },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-12 max-w-[560px]">
            <Eyebrow>Traditional Reception vs. Mira</Eyebrow>
            <h2 className="font-display text-h2 text-text-primary mt-3">
              The front desk has an{' '}
              <em style={{ color: '#C9A882' }}>upgrade.</em>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            {/* Header */}
            <div className="grid grid-cols-3 gap-0" style={{ background: '#1A1814', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="p-4 md:p-5" />
              <div className="p-4 md:p-5 flex items-center gap-2 border-l" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0"><circle cx="7" cy="7" r="6" stroke="#D94F3D" strokeWidth="1.2"/><path d="M4 7h6M7 4v6" stroke="#D94F3D" strokeWidth="1.2" strokeLinecap="round" transform="rotate(45 7 7)"/></svg>
                <span className="font-body text-[12px] font-[500] text-text-muted">Traditional</span>
              </div>
              <div className="p-4 md:p-5 flex items-center gap-2 border-l" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(201,168,130,0.04)' }}>
                <MiraLogo size={18} />
                <span className="font-body text-[12px] font-[500] text-text-primary">Mira</span>
              </div>
            </div>

            {/* Rows */}
            {rows.map(({ label, bad, good }, i) => (
              <div
                key={label}
                className="grid grid-cols-3 gap-0"
                style={{ background: i % 2 === 0 ? '#0F0E0C' : '#1A1814', borderTop: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="p-4 md:p-5">
                  <span className="font-body text-[12px] md:text-[13px] font-[500] text-text-muted">{label}</span>
                </div>
                <div className="p-4 md:p-5 border-l flex items-start gap-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5"><circle cx="7" cy="7" r="6" stroke="rgba(217,79,61,0.4)" strokeWidth="1"/><path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#D94F3D" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  <span className="font-body text-[12px] md:text-[13px] font-[300] text-text-secondary leading-snug">{bad}</span>
                </div>
                <div className="p-4 md:p-5 border-l flex items-start gap-2" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(201,168,130,0.03)' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5"><path d="M2.5 7l3 3 6-6" stroke="#7AAF6E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="font-body text-[12px] md:text-[13px] font-[300] text-text-primary leading-snug">{good}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Demo Video ──────────────────────────────────────────────── */
function DemoVideo() {
  return (
    <section id="demo" className="py-24 px-6" style={{ background: '#1A1814' }}>
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-12 text-center flex flex-col items-center gap-3">
            <Eyebrow>See it in action</Eyebrow>
            <h2 className="font-display text-h2 text-text-primary max-w-[560px]">
              Watch Mira handle a real{' '}
              <em style={{ color: '#C9A882' }}>guest call.</em>
            </h2>
            <p className="font-body text-[17px] font-[300] text-text-secondary leading-[1.65] max-w-[460px]">
              A real property. A 2 AM maintenance request. Mira picks up in seconds and handles it end-to-end.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative max-w-[860px] mx-auto rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)', background: '#0F0E0C' }}>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                <div className="flex items-center gap-[3px] h-12 opacity-30" aria-hidden>
                  {[4,7,12,18,10,22,14,8,18,24,16,10,20,14,6,18,22,12,8,16].map((h, i) => (
                    <div key={i} className="w-1 rounded-full" style={{ height: `${h * 2}px`, background: '#C9A882', animation: `breathe ${1.5 + (i % 4) * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.08}s` }} />
                  ))}
                </div>

                <a
                  href="/demo.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 px-8 py-4 rounded-2xl transition-all duration-200"
                  style={{ background: 'rgba(217,79,61,0.12)', border: '1px solid rgba(217,79,61,0.3)' }}
                  aria-label="Watch demo"
                >
                  <span className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#D94F3D' }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M5 3.5l10 5.5-10 5.5V3.5z" fill="white" />
                    </svg>
                  </span>
                  <span className="font-body text-[15px] font-[500] text-text-primary">Watch demo — 2 min</span>
                </a>

                <div className="flex items-center gap-5">
                  {['Real guest call', 'Multilingual support', 'Instant summary'].map(label => (
                    <span key={label} className="flex items-center gap-1.5 font-body text-[12px] text-text-muted">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#7AAF6E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="text-center font-body text-[13px] text-text-muted mt-6">
            No script. No actors. A real property — real guest questions.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── FAQ ─────────────────────────────────────────────────────── */
function Objections() {
  const [open, setOpen] = useState<number | null>(null)

  const faqs = [
    {
      q: 'Can Mira transfer calls to me?',
      a: 'Yes. When a situation needs a human, Mira transfers the call to you or your team — seamlessly. The guest stays on the line while Mira connects you, and you get a quick brief before picking up.',
    },
    {
      q: 'Can I customize what Mira says?',
      a: "Absolutely. Mira is built around your property's knowledge base — your rules, your tone, your FAQs. You control what she knows, what she says, and how she handles edge cases.",
    },
    {
      q: 'Does Mira support multiple languages?',
      a: 'Yes. Mira supports multilingual conversations out of the box. Guests can speak in their language and Mira responds naturally. You can configure the default language per property.',
    },
    {
      q: 'Does it integrate with my PMS or booking system?',
      a: "Mira works as a standalone front desk today. Deep PMS integrations are on our roadmap — reach out to discuss your specific system and we'll keep you updated.",
    },
    {
      q: 'What happens after each call?',
      a: "After every guest interaction, Mira sends you a summary — what was asked, how it was resolved, and any items that need follow-up. Delivered by WhatsApp or email, your choice.",
    },
    {
      q: "What if a guest asks something Mira doesn't know?",
      a: "Mira never guesses. If a question falls outside her knowledge base, she tells the guest she's connecting them with the team — then transfers the call to you. No wrong answers, no embarrassing moments.",
    },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-12 max-w-[480px]">
            <Eyebrow>Common Questions</Eyebrow>
            <h2 className="font-display text-h2 text-text-primary mt-3">
              Everything you&apos;re{' '}
              <em style={{ color: '#C9A882' }}>wondering.</em>
            </h2>
          </div>
        </Reveal>

        <div className="max-w-[720px] flex flex-col">
          {faqs.map(({ q, a }, i) => (
            <Reveal key={q} delay={i * 40}>
              <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <button
                  className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="font-display text-[18px] text-text-primary group-hover:text-text-primary transition-colors">{q}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`shrink-0 mt-1.5 accordion-chevron ${open === i ? 'open' : ''}`}>
                    <path d="M2 4l4 4 4-4" stroke="#C9A882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {open === i && (
                  <p className="pb-5 font-body text-[15px] font-[300] text-text-secondary leading-[1.7]" style={{ animation: 'fadeUp 200ms cubic-bezier(0.16,1,0.3,1) both' }}>
                    {a}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
          <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
        </div>
      </div>
    </section>
  )
}

/* ─── Final CTA ───────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="py-28 px-6 relative overflow-hidden" style={{ background: '#1A1814' }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[400px] rounded-full" style={{ background: 'radial-gradient(ellipse at center, rgba(217,79,61,0.07) 0%, transparent 70%)' }} />
      </div>

      <Reveal>
        <div className="max-w-[700px] mx-auto text-center flex flex-col items-center gap-8 relative">
          <Eyebrow>Get started</Eyebrow>
          <h2 className="font-display text-h2 text-text-primary">
            Your guests deserve an answer<br />
            at <em style={{ color: '#C9A882' }}>2 AM.</em>
          </h2>
          <p className="font-body text-[17px] font-[300] text-text-secondary leading-[1.65] max-w-[420px]">
            See how Mira works for your property in a live 20-minute demo. No commitment, no credit card.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={openDemoModal}
              className="btn-primary"
              style={{ padding: '15px 32px', fontSize: '15px', borderRadius: '14px' }}
            >
              Book a Demo →
            </button>
            <a
              href="/demo.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ padding: '15px 24px', fontSize: '15px', borderRadius: '14px' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" />
                <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" />
              </svg>
              See Mira in Action
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {['✳ No credit card required', '✳ Live demo in 24 hours', '✳ Works for any property type'].map(item => (
              <span key={item} className="font-body text-[12px] text-text-muted">{item}</span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ─── Footer ──────────────────────────────────────────────────── */
function Footer() {
  const cols = [
    {
      title: 'Product',
      links: ['How It Works', 'Guest Workflows', 'Industries'],
    },
    {
      title: 'Company',
      links: ['About', 'Contact', 'Blog'],
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Use'],
    },
  ]

  return (
    <footer className="border-t px-6 py-14" style={{ background: '#0F0E0C', borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-[1fr_auto_auto_auto] gap-10 md:gap-16 mb-12">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <MiraLogo size={38} />
              <span className="font-display text-[22px] text-text-primary tracking-[-0.4px] leading-none">Mira</span>
            </div>
            <p className="font-body text-[13px] text-text-muted leading-[1.6] max-w-[240px] mt-1">
              The AI Front Desk for modern hospitality businesses worldwide.
            </p>
          </div>

          {cols.map(({ title, links }) => (
            <div key={title} className="flex flex-col gap-3">
              <span className="font-body text-[11px] font-[600] text-text-muted uppercase tracking-[0.07em]">{title}</span>
              <ul className="flex flex-col gap-2.5">
                {links.map(l => (
                  <li key={l}>
                    <a href="#" className="font-body text-[13px] font-[300] text-text-secondary hover:text-text-primary transition-colors duration-150">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t flex flex-wrap items-center justify-between gap-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <span className="font-body text-[12px] text-text-muted">
            © {new Date().getFullYear()} Mira. AI Guest Experience for the modern hospitality business.
          </span>
          <span className="font-body text-[12px] text-text-muted italic">
            Always on. Always warm. Knows when to step aside.
          </span>
        </div>
      </div>
    </footer>
  )
}

/* ─── Main export ─────────────────────────────────────────────── */
export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const handler = () => setModalOpen(true)
    window.addEventListener('mira:openDemo', handler)
    return () => window.removeEventListener('mira:openDemo', handler)
  }, [])

  return (
    <main>
      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
      <Nav />
      <Hero />
      <SocialProofBar />
      <StatsBar />
      <ProblemSection />
      <CallFlow />
      <HowItWorks />
      <WorkflowsGrid />
      <IndustriesSection />
      <NightWithMira />
      <ComparisonSection />
      <DemoVideo />
      <Objections />
      <FinalCTA />
      <Footer />
    </main>
  )
}
