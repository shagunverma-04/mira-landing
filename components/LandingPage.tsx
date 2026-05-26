'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

/* ─── Shared atoms ────────────────────────────────────────────── */

function MiraLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <circle cx="50" cy="50" r="50" fill="#0F0E0C" />
      {/* 6 spokes at 60° intervals, starting from top (90°) */}
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

/* ─── Scroll reveal wrapper ───────────────────────────────────── */
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

  const links = ['Why Mira', 'How It Works', 'Pricing', 'For Hosts']

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 h-[60px] transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-[12px] bg-[rgba(15,14,12,0.90)] border-b border-white/[0.08]'
          : ''
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group" aria-label="Mira home">
          <MiraLogo size={34} />
          <span className="font-display text-[21px] text-text-primary tracking-[-0.5px] leading-none">
            Mira
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-body text-[13px] font-[400] text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a href="#pricing" className="hidden md:flex btn-primary" style={{ padding: '8px 18px', fontSize: '13px', borderRadius: '11px' }}>
          Request Demo →
        </a>

        {/* Mobile toggle */}
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

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden absolute top-[60px] inset-x-0 bg-[#0F0E0C] border-b border-white/[0.08] py-5 px-6 flex flex-col gap-5">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-body text-[15px] text-text-secondary hover:text-text-primary transition-colors duration-150"
              onClick={() => setOpen(false)}
            >
              {l}
            </a>
          ))}
          <a href="#pricing" className="btn-primary w-fit" onClick={() => setOpen(false)}>
            Request Demo →
          </a>
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
      id="why-mira"
      className="relative min-h-screen flex items-center pt-[60px] overflow-hidden"
    >
      {/* Radial glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,130,0.07) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[10%] right-[10%] w-[500px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(217,79,61,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto px-6 w-full py-20 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — copy */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Eyebrow>AI Voice Receptionist for Airbnb Hosts</Eyebrow>

            {/* Language pill */}
            <div className="flex items-center gap-2 mt-1">
              {['EN', 'HI', 'Hinglish'].map((lang, i) => (
                <span
                  key={lang}
                  className="inline-block px-3 py-1 rounded-full border border-white/[0.1] font-body text-[11px] font-[500]"
                  style={{ color: i === 2 ? '#C9A882' : '#8A7E72', borderColor: i === 2 ? 'rgba(201,168,130,0.3)' : undefined }}
                >
                  {lang}
                </span>
              ))}
              <span className="font-body text-[11px] text-text-muted">· speaks all three</span>
            </div>
          </div>

          <h1 className="font-display text-hero text-text-primary">
            Every call answered.<br />
            Every request{' '}
            <em style={{ color: '#C9A882', fontStyle: 'italic' }}>logged.</em>
          </h1>

          <p className="font-body text-[18px] font-[300] text-text-secondary leading-[1.65]" style={{ maxWidth: '500px' }}>
            Mira answers your guests when you&apos;re busy, sleeping, or managing another property
            — in English, Hindi, or Hinglish.
          </p>

          <div className="flex flex-wrap gap-3 mt-2">
            <a href="#pricing" className="btn-primary">
              Try Mira Free →
            </a>
            <a href="#how-it-works" className="btn-ghost">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" />
                <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" />
              </svg>
              See how it works
            </a>
          </div>

          <p className="font-body text-[12px] text-text-muted">
            No credit card &nbsp;·&nbsp; Setup in 10 minutes &nbsp;·&nbsp; Cancel anytime
          </p>
        </div>

        {/* Right — demo widget */}
        <div className="flex justify-center md:justify-end">
          <div
            className="card w-full max-w-[400px] p-6 flex flex-col gap-5 relative"
            style={{ background: '#1A1814' }}
          >
            {/* Live badge */}
            <div className="flex items-center justify-between">
              <span className="eyebrow" style={{ color: '#8A7E72' }}>Live call demo</span>
              <span className="flex items-center gap-1.5 font-body text-[11px] text-text-secondary">
                <LiveDot />
                Always on
              </span>
            </div>

            {/* Voice ring + call button */}
            <div className="flex flex-col items-center gap-4 py-2">
              <div className="relative flex items-center justify-center w-[120px] h-[120px]">
                {/* Breathing rings */}
                <div
                  className={`absolute inset-0 rounded-full border ${callActive ? 'border-coral' : 'border-gold'} ring-breathe`}
                  style={{ borderColor: callActive ? '#D94F3D' : '#C9A882' }}
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
                  <div
                    className="absolute ring-ripple"
                    style={{ inset: '-28px', border: '1px solid #D94F3D', animationDelay: '0.9s' }}
                  />
                )}
                {/* Core button */}
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
                {callActive ? 'Speaking with Mira...' : 'Tap to call Mira'}
              </span>
            </div>

            {/* Transcript */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-start">
                <span className="shrink-0 w-6 h-6 rounded-full bg-surface-raised border border-white/[0.1] flex items-center justify-center font-body text-[9px] text-text-muted font-[500]">G</span>
                <div className="flex-1 rounded-xl rounded-tl-sm px-3 py-2" style={{ background: '#221F1B', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="font-body text-[13px] text-text-secondary leading-snug">
                    &quot;Bhaiya, WiFi ka password kya hai?&quot;
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start flex-row-reverse">
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-display text-[11px] italic" style={{ background: 'rgba(217,79,61,0.15)', color: '#D94F3D', border: '1px solid rgba(217,79,61,0.25)' }}>M</span>
                <div className="flex-1 rounded-xl rounded-tr-sm px-3 py-2" style={{ background: 'rgba(217,79,61,0.1)', border: '1px solid rgba(217,79,61,0.2)' }}>
                  <p className="font-body text-[13px] text-text-primary leading-snug">
                    Hi! The WiFi is <strong>SeabreezeVilla</strong> — capital S, capital V. Anything else?
                  </p>
                </div>
              </div>
            </div>

            {/* Status pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-body text-[11px] px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#8A7E72', border: '1px solid rgba(255,255,255,0.08)' }}>
                Enquiry · Villa 3B
              </span>
              <span className="font-body text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1" style={{ background: 'rgba(122,175,110,0.1)', color: '#7AAF6E', border: '1px solid rgba(122,175,110,0.2)' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                WhatsApp sent
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll chevron */}
      <a
        href="#social-proof"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted hover:text-text-secondary transition-colors duration-150"
        style={{ animation: 'pulseDot 2.5s ease-in-out infinite' }}
      >
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
    'Built for Airbnb Superhosts',
    'English + Hindi + Hinglish',
    'Works from a browser link — no app needed',
    'WhatsApp alerts after every call',
  ]

  return (
    <div
      id="social-proof"
      className="w-full border-y font-body text-[13px] text-text-muted"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-4">
            <span className="italic">{item}</span>
            {i < items.length - 1 && (
              <span className="hidden sm:inline text-text-muted/40">&middot;</span>
            )}
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
    { number: '3', label: 'Languages spoken' },
    { number: '98%', label: 'Resolution rate' },
    { number: '1.4 min', label: 'Average call' },
  ]

  return (
    <section className="w-full py-16" style={{ background: '#1A1814' }}>
      <Reveal>
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map(({ number, label }, i) => (
            <Reveal key={label} delay={i * 60}>
              <div className="flex flex-col items-center gap-2 text-center">
                <span
                  className="font-display text-text-primary"
                  style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.5px', lineHeight: 1.1 }}
                >
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

/* ─── Pain Section ────────────────────────────────────────────── */
function PainSection() {
  const cards = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#D94F3D" strokeWidth="1.5"/><path d="M15 9l-6 6M9 9l6 6" stroke="#D94F3D" strokeWidth="1.5" strokeLinecap="round"/></svg>
      ),
      title: 'No one to answer at night',
      body: "You can't be on-call 24/7. But your guests don't know that.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="1.5" stroke="#D94F3D" strokeWidth="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5" stroke="#D94F3D" strokeWidth="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5" stroke="#D94F3D" strokeWidth="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5" stroke="#D94F3D" strokeWidth="1.5"/></svg>
      ),
      title: 'Managing 3+ properties alone',
      body: 'One coordinator, multiple properties, zero backup when it gets busy.',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#D94F3D" strokeWidth="1.5" strokeLinejoin="round"/></svg>
      ),
      title: 'WhatsApp fills up, nothing gets logged',
      body: 'Every request buried in chat. No record. No follow-up. Just stress.',
    },
  ]

  return (
    <section id="why-mira" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-14 max-w-[640px]">
            <h2 className="font-display text-h2 text-text-primary mb-4">
              You missed a call at 2 AM.<br />
              Your guest booked <em style={{ color: '#C9A882' }}>somewhere else.</em>
            </h2>
            <p className="font-body text-[17px] font-[300] text-text-secondary leading-[1.65]">
              Indian Airbnb hosts miss 2–3 guest calls every day. Check-in questions. WiFi passwords.
              Late arrivals. Every missed call is a bad review waiting to happen.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {cards.map(({ icon, title, body }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="card p-6 flex flex-col gap-4 h-full">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(217,79,61,0.1)', border: '1px solid rgba(217,79,61,0.2)' }}
                >
                  {icon}
                </div>
                <div>
                  <h3 className="font-body text-[15px] font-[500] text-text-primary mb-1.5">
                    {title}
                  </h3>
                  <p className="font-body text-[14px] font-[300] text-text-secondary leading-[1.6]">
                    {body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Live Demo CTA ───────────────────────────────────────────── */
function LiveDemoCTA() {
  return (
    <section className="py-20 px-6" style={{ background: '#1A1814' }}>
      <Reveal>
        <div className="max-w-[700px] mx-auto text-center flex flex-col items-center gap-6">
          <Eyebrow>Live Demo</Eyebrow>
          <h2 className="font-display text-h2 text-text-primary">
            Hear Mira answer a real guest call.
          </h2>
          <p className="font-body text-[17px] font-[300] text-text-secondary leading-[1.65]">
            Pick up your phone. Ask anything.
          </p>
          <a
            href="tel:+91XXXXXXXXXX"
            className="btn-primary"
            style={{ padding: '16px 36px', fontSize: '16px', borderRadius: '14px', gap: '10px' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 18.5c-3.5 0-7-1.5-9.5-4S1 8.5 1 5c0-.6.4-1 1-1h4c.5 0 .9.4 1 .9l.8 3.4c.1.4-.1.9-.4 1.1L6 10.7c1.5 2.7 3.7 4.8 6.3 6.3l1.3-1.4c.3-.3.7-.5 1.1-.4l3.4.8c.5.1.9.5.9 1V22c0 .6-.4 1-1 1-3.5 0-7-1.5-9.5-4z" fill="white" />
            </svg>
            Call Mira Now — it&apos;s free
          </a>
          <p className="font-body text-[12px] text-text-muted">
            Try asking for WiFi, check-in time, or early check-out
          </p>
        </div>
      </Reveal>
    </section>
  )
}

/* ─── How It Works ────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Fill your property form',
      body: 'Tell Mira your check-in rules, WiFi, amenities, local tips. Takes 10 minutes. Done once.',
    },
    {
      n: '02',
      title: 'Share your call link',
      body: 'Guests click a browser link and Mira picks up. No app. No phone number. No hardware.',
    },
    {
      n: '03',
      title: 'You get a WhatsApp summary',
      body: 'After every call, Mira sends you what was asked and what was said. One tap to follow up.',
    },
  ]

  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-16 max-w-[540px]">
            <Eyebrow>How It Works</Eyebrow>
            <h2 className="font-display text-h2 text-text-primary mt-3">
              Set up in 10 minutes.<br />
              Works <em style={{ color: '#C9A882' }}>forever</em> after that.
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector lines (desktop) */}
          <div className="hidden md:block absolute top-8 left-[33%] right-[33%] h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

          {steps.map(({ n, title, body }, i) => (
            <Reveal key={n} delay={i * 100}>
              <div className="card p-7 flex flex-col gap-5 h-full relative">
                <div className="flex items-center gap-3">
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center font-body text-[12px] font-[600] shrink-0"
                    style={{ background: 'rgba(201,168,130,0.1)', border: '1px solid rgba(201,168,130,0.25)', color: '#C9A882' }}
                  >
                    {n}
                  </span>
                  <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
                </div>
                <div>
                  <h3 className="font-body text-[16px] font-[500] text-text-primary mb-2">
                    {title}
                  </h3>
                  <p className="font-body text-[14px] font-[300] text-text-secondary leading-[1.65]">
                    {body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── A Night With Mira (editorial) ──────────────────────────── */
function NightWithMira() {
  const calls = [
    {
      time: '11:00 PM',
      label: 'Check-in query',
      guest: 'Hi, I\'m arriving late — around 11:30. Is that okay?',
      mira: 'Of course. Self check-in instructions are in your booking confirmation. The key box code is 2847. I\'ve noted your late arrival — is there anything else you need?',
    },
    {
      time: '2:14 AM',
      label: 'The Hinglish moment',
      guest: 'Bhaiya, AC band ho gaya hai. Bahut garmi hai.',
      mira: 'Of course, sir — abhi housekeeping ko bhej deti hoon. Anything else?',
      hinglish: true,
    },
    {
      time: '6:02 AM',
      label: 'Early checkout request',
      guest: 'Can I leave by 6:30? My flight is at 9.',
      mira: 'Absolutely. Just leave the key in the lockbox and pull the door shut. Safe travels.',
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
          {/* Timeline line */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,130,0.2) 10%, rgba(201,168,130,0.2) 90%, transparent)', transform: 'translateX(-50%)' }}
            aria-hidden
          />

          <div className="flex flex-col gap-10">
            {calls.map(({ time, label, guest, mira, hinglish }, i) => (
              <Reveal key={time} delay={i * 100}>
                <div className={`relative flex flex-col md:flex-row gap-6 md:gap-10 items-start ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Time + dot */}
                  <div className="md:w-1/2 flex flex-col items-start md:items-end gap-1">
                    <span className="font-body text-[11px] text-text-muted" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {time}
                    </span>
                    <span className="eyebrow" style={{ color: hinglish ? '#D94F3D' : '#8A7E72' }}>
                      {label}
                    </span>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 top-1 -translate-x-1/2 w-2 h-2 rounded-full" style={{ background: hinglish ? '#D94F3D' : '#C9A882', boxShadow: hinglish ? '0 0 8px rgba(217,79,61,0.5)' : '0 0 8px rgba(201,168,130,0.4)' }} aria-hidden />

                  {/* Chat bubbles */}
                  <div className="md:w-1/2 flex flex-col gap-3">
                    <div className="flex gap-2 items-start">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-surface-raised border border-white/[0.1] flex items-center justify-center font-body text-[9px] text-text-muted font-[500]">G</span>
                      <div className="rounded-xl rounded-tl-sm px-3 py-2.5" style={{ background: '#221F1B', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <p className="font-body text-[13px] text-text-secondary leading-snug">&ldquo;{guest}&rdquo;</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-start flex-row-reverse">
                      <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-display text-[11px] italic" style={{ background: 'rgba(217,79,61,0.15)', color: '#D94F3D', border: '1px solid rgba(217,79,61,0.25)' }}>M</span>
                      <div className="rounded-xl rounded-tr-sm px-3 py-2.5" style={{ background: hinglish ? 'rgba(217,79,61,0.12)' : 'rgba(217,79,61,0.08)', border: `1px solid ${hinglish ? 'rgba(217,79,61,0.3)' : 'rgba(217,79,61,0.18)'}` }}>
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
            You woke up to three WhatsApp summaries. Your guests left 5 stars.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Features Grid ───────────────────────────────────────────── */
function FeaturesGrid() {
  const features = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 18.5c-3.5 0-7-1.5-9.5-4S1 8.5 1 5c0-.6.4-1 1-1h4c.5 0 .9.4 1 .9l.8 3.4c.1.4-.1.9-.4 1.1L6 10.7c1.5 2.7 3.7 4.8 6.3 6.3l1.3-1.4c.3-.3.7-.5 1.1-.4l3.4.8c.5.1.9.5.9 1V22c0 .6-.4 1-1 1-3.5 0-7-1.5-9.5-4z" stroke="#C9A882" strokeWidth="1.5" strokeLinejoin="round"/></svg>
      ),
      title: 'Speaks Hinglish naturally',
      body: 'Not a robot reading a script. Mira converses like your best staff member.',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#C9A882" strokeWidth="1.5" strokeLinejoin="round"/></svg>
      ),
      title: 'WhatsApp alerts instantly',
      body: 'Every request pinged to you after each call. Nothing falls through the cracks.',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" stroke="#C9A882" strokeWidth="1.5"/><path d="M12 6v6l4 2" stroke="#C9A882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      ),
      title: 'Available 24/7',
      body: '3 AM check-in confusion? Mira picks up. You sleep.',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="2" stroke="#C9A882" strokeWidth="1.5"/><rect x="13" y="3" width="8" height="8" rx="2" stroke="#C9A882" strokeWidth="1.5"/><rect x="3" y="13" width="8" height="8" rx="2" stroke="#C9A882" strokeWidth="1.5"/><path d="M17 13v8M13 17h8" stroke="#C9A882" strokeWidth="1.5" strokeLinecap="round"/></svg>
      ),
      title: 'Per-property knowledge base',
      body: 'Each property gets its own Mira — different rules, menus, and local tips.',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#C9A882" strokeWidth="1.5" strokeLinejoin="round"/></svg>
      ),
      title: 'Ready in 10 minutes',
      body: 'Fill a form. Get a call link. No code, no IT, no technical setup.',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#C9A882" strokeWidth="1.5"/><path d="M3 9h18M9 21V9" stroke="#C9A882" strokeWidth="1.5" strokeLinecap="round"/></svg>
      ),
      title: 'Full dashboard + call log',
      body: 'See every call, every request, every gap. Know your guests before they arrive.',
    },
  ]

  return (
    <section id="for-hosts" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-14 max-w-[560px]">
            <Eyebrow>Capabilities</Eyebrow>
            <h2 className="font-display text-h2 text-text-primary mt-3">
              Everything a front desk does.<br />
              None of the <em style={{ color: '#C9A882' }}>overhead.</em>
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon, title, body }, i) => (
            <Reveal key={title} delay={i * 50}>
              <div className="card p-6 flex flex-col gap-4 h-full">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(201,168,130,0.08)', border: '1px solid rgba(201,168,130,0.18)' }}
                >
                  {icon}
                </div>
                <div>
                  <h3 className="font-body text-[15px] font-[500] text-text-primary mb-1.5">
                    {title}
                  </h3>
                  <p className="font-body text-[13px] font-[300] text-text-secondary leading-[1.65]">
                    {body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
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
              A Goa Superhost. A 2 AM WiFi question. Mira picks up in seconds.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative max-w-[860px] mx-auto rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)', background: '#0F0E0C' }}>
            {/* 16:9 aspect ratio container */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                {/* Decorative waveform */}
                <div className="flex items-center gap-[3px] h-12 opacity-30" aria-hidden>
                  {[4,7,12,18,10,22,14,8,18,24,16,10,20,14,6,18,22,12,8,16].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full"
                      style={{
                        height: `${h * 2}px`,
                        background: '#C9A882',
                        animation: `breathe ${1.5 + (i % 4) * 0.3}s ease-in-out infinite`,
                        animationDelay: `${i * 0.08}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Play button — opens demo video */}
                <a
                  href="/demo.mov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 px-8 py-4 rounded-2xl transition-all duration-200"
                  style={{ background: 'rgba(217,79,61,0.12)', border: '1px solid rgba(217,79,61,0.3)' }}
                  aria-label="Watch demo video"
                >
                  <span
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-150"
                    style={{ background: '#D94F3D' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M5 3.5l10 5.5-10 5.5V3.5z" fill="white" />
                    </svg>
                  </span>
                  <span className="font-body text-[15px] font-[500] text-text-primary">
                    Watch demo — 2 min
                  </span>
                </a>

                {/* Labels */}
                <div className="flex items-center gap-5">
                  {['Real guest call', 'Hinglish response', 'WhatsApp alert'].map(label => (
                    <span key={label} className="flex items-center gap-1.5 font-body text-[12px] text-text-muted">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="#7AAF6E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
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
            No script. No actors. A real host&apos;s property — real guest questions.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Objections / FAQ ────────────────────────────────────────── */
function Objections() {
  const [open, setOpen] = useState<number | null>(null)

  const faqs = [
    {
      q: 'What if Mira gets something wrong?',
      a: "Mira only answers from what you tell her during setup. If a question falls outside her knowledge base, she doesn't guess — she immediately transfers the call to you, the host, so nothing important slips through.",
    },
    {
      q: 'My guests prefer WhatsApp, not calls.',
      a: 'WhatsApp support is coming. For now, Mira handles calls and you get the summary on WhatsApp.',
    },
    {
      q: "I'm not technical.",
      a: 'If you can fill a Google Form, you can set up Mira. No code. No IT. 10 minutes flat.',
    },
    {
      q: 'What languages does Mira speak?',
      a: 'English, Hindi, and Hinglish — the natural mix your guests actually use. You can set the default language per property.',
    },
    {
      q: 'Can I set it up for multiple properties?',
      a: 'Yes. Each property gets its own Mira with its own knowledge base — different house rules, WiFi, amenities. Pricing is per property.',
    },
    {
      q: 'What happens after my free trial?',
      a: "You'll receive an email before the trial ends. If you choose to continue, the plan is ₹1,499/month. Cancel anytime — no penalty, no hassle.",
    },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-12 max-w-[480px]">
            <Eyebrow>Common Questions</Eyebrow>
            <h2 className="font-display text-h2 text-text-primary mt-3">
              We know what you&apos;re <em style={{ color: '#C9A882' }}>thinking.</em>
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
                  <span className="font-display text-[18px] text-text-primary group-hover:text-text-primary transition-colors">
                    {q}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className={`shrink-0 mt-1.5 accordion-chevron ${open === i ? 'open' : ''}`}
                  >
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
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(217,79,61,0.07) 0%, transparent 70%)' }}
        />
      </div>

      <Reveal>
        <div className="max-w-[700px] mx-auto text-center flex flex-col items-center gap-8 relative">
          <Eyebrow>Get started</Eyebrow>
          <h2 className="font-display text-h2 text-text-primary">
            Your guests deserve<br />
            an answer at <em style={{ color: '#C9A882' }}>2 AM.</em>
          </h2>
          <p className="font-body text-[17px] font-[300] text-text-secondary leading-[1.65] max-w-[420px]">
            Try Mira free for 30 days. No credit card. Cancel anytime.
          </p>
          <a
            href="#pricing"
            className="btn-primary"
            style={{ padding: '15px 32px', fontSize: '15px', borderRadius: '14px' }}
          >
            Set up Mira for my property →
          </a>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {['✳ No credit card required', '✳ 30-day free trial', '✳ Setup in 10 minutes'].map(item => (
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
      links: ['How It Works', 'Pricing', 'For Hosts'],
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
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <MiraLogo size={38} />
              <span className="font-display text-[22px] text-text-primary tracking-[-0.4px] leading-none">
                Mira
              </span>
            </div>
            <p className="font-body text-[13px] text-text-muted leading-[1.6] max-w-[220px] mt-1">
              Always on. Always warm.
            </p>
          </div>

          {/* Link columns */}
          {cols.map(({ title, links }) => (
            <div key={title} className="flex flex-col gap-3">
              <span className="font-body text-[11px] font-[600] text-text-muted uppercase tracking-[0.07em]">
                {title}
              </span>
              <ul className="flex flex-col gap-2.5">
                {links.map(l => (
                  <li key={l}>
                    <a href="#" className="font-body text-[13px] font-[300] text-text-secondary hover:text-text-primary transition-colors duration-150">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 border-t flex flex-wrap items-center justify-between gap-3"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <span className="font-body text-[12px] text-text-muted">
            © {new Date().getFullYear()} Mira. Built with ♥ in India.
          </span>
          <span className="font-body text-[12px] text-text-muted italic">
            The AI receptionist your property deserves.
          </span>
        </div>
      </div>
    </footer>
  )
}

/* ─── Main export ─────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <main>
      <Nav />
      <Hero />
      <SocialProofBar />
      <StatsBar />
      <PainSection />
      <LiveDemoCTA />
      <HowItWorks />
      <NightWithMira />
      <FeaturesGrid />
      <DemoVideo />
      <Objections />
      <FinalCTA />
      <Footer />
    </main>
  )
}
