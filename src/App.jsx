import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle, Waves, Hammer, Star, Phone, AlignJustify, Grid, Droplets, Lightbulb, Lock, Wind, Tv, Sun } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const WA_NUMBER = import.meta.env.VITE_WA_NUMBER ?? '972500000000'
const PHONE_DISPLAY = import.meta.env.VITE_PHONE_DISPLAY ?? '050-000-0000'
const WA_MSG = encodeURIComponent('היי ליאור, אשמח לשמוע על שירותיך')
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ─── Noise ────────────────────────────────────────────────────────────────────
function Noise() {
  return (
    <div className="fixed inset-0 z-[10] pointer-events-none" style={{ opacity: 0.025 }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise-filter-lm92"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
        <rect width="100%" height="100%" filter="url(#noise-filter-lm92)"/>
      </svg>
    </div>
  )
}

// ─── Waveform decoration ──────────────────────────────────────────────────────
function Waveform({ color = '#7C3AED', opacity = 0.5 }) {
  const bars = [12, 28, 44, 20, 52, 36, 58, 24, 48, 16, 40, 56, 22, 46, 30, 54, 18, 42, 60, 26, 50, 14, 38, 58, 22]
  return (
    <svg viewBox={`0 0 ${bars.length * 10} 64`} fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full" style={{ maxWidth: 280, opacity }} aria-hidden="true">
      {bars.map((h, i) => (
        <rect key={i} x={i * 10 + 1} y={(64 - h) / 2} width="7" height={h} rx="3.5" fill={color}/>
      ))}
    </svg>
  )
}

// ─── Ticker strip ─────────────────────────────────────────────────────────────
function Ticker() {
  const items = ['חשמל', 'SHUTTERS', 'נגרות', 'CARPENTRY', 'בריכות', 'PLUMBING', 'תיקונים', 'LIGHTING']
  return (
    <div className="bg-[#0D0A1A] overflow-hidden py-4 select-none border-b border-white/5" dir="ltr" aria-hidden="true">
      <div className="ticker-track flex gap-10 whitespace-nowrap w-max">
        {[...items, ...items].map((t, i) => (
          <bdi key={i} className={`font-mono text-[14px] font-bold tracking-[0.25em] ${t === t.toUpperCase() && t.match(/[A-Z]/) ? 'text-[#A78BFA]' : 'text-white'}`}>
            {t.match(/^[A-Z]+$/) ? t : `◆ ${t}`}
          </bdi>
        ))}
      </div>
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let last = 0
    const fn = () => {
      const y = window.scrollY
      setHidden(y > 80 && y > last)
      last = y
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [['בית','#hero'],['שירותים','#services'],['עבודות','#gallery'],['צור קשר','#contact']]

  return (
    <>
      <nav className={`fixed top-14 md:top-20 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-1rem)] flex items-center gap-3 md:gap-6 px-4 py-2.5 md:px-7 md:py-4 rounded-full bg-white/95 backdrop-blur-xl shadow-xl shadow-black/[0.08] border border-gray-100 transition-all duration-500 ${hidden ? '-translate-y-40 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        {/* Brand mark */}
        <a href="#hero" className="flex items-center gap-2 flex-shrink-0 no-underline">
          <div style={{ width:36, height:36, overflow:'hidden', borderRadius:6, background:'#fff', flexShrink:0 }}>
            <img src="/gallery/WhatsApp%20Image%202026-07-01%20at%2014.04.22.jpeg" alt="בידיים טובות"
              style={{ width:'100%', height:'100%', objectFit:'contain', mixBlendMode:'multiply' }}/>
          </div>
          <span className="font-heebo font-black text-[#1E1028] text-sm leading-[1.1] hidden sm:block" style={{ fontSize:13 }}>בידיים<br/>טובות</span>
        </a>
        <div className="hidden md:flex gap-7 items-center">
          {links.map(([l,h])=>(
            <a key={l} href={h} className="font-heebo font-bold text-base text-gray-500 hover:text-[#1E1028] hover:-translate-y-px transition-all">{l}</a>
          ))}
        </div>
        <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 font-heebo font-black text-base px-6 py-3 rounded-full bg-[#7C3AED] text-white hover:bg-[#6D28D9] hover:scale-[1.03] transition-all duration-300">
          <MessageCircle size={14} strokeWidth={2.5}/> וואטסאפ
        </a>
        <button className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(o => !o)} aria-label="תפריט" aria-expanded={menuOpen}>
          <div className="flex flex-col gap-1.5 w-5">
            <span className={`block h-0.5 bg-[#1E1028] rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}/>
            <span className={`block h-0.5 bg-[#1E1028] rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}/>
            <span className={`block h-0.5 bg-[#1E1028] rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
          </div>
        </button>
      </nav>

      <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}>
        <div className={`absolute top-0 inset-x-0 bg-white/98 backdrop-blur-xl shadow-2xl pt-24 pb-10 px-8 flex flex-col gap-6 transition-transform duration-300 ease-out ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}
          role="dialog" aria-modal="true"
          onClick={e => e.stopPropagation()}>
          {links.map(([l,h])=>(
            <a key={l} href={h}
              className="font-heebo font-black text-3xl text-[#1E1028] hover:text-[#7C3AED] transition-colors border-b border-gray-100 pb-4"
              onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 font-heebo font-black text-lg px-8 py-4 rounded-full bg-[#7C3AED] text-white w-full"
            onClick={() => setMenuOpen(false)}>
            <MessageCircle size={20} strokeWidth={2.5}/> וואטסאפ עכשיו
          </a>
        </div>
      </div>
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef()
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.hi', { y: 40, opacity: 0, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.1 })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={ref}
      className="relative min-h-[75dvh] md:min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden text-center"
      style={{ padding: 'clamp(1.5rem, 5vw, 10rem) clamp(1.25rem, 5vw, 6rem) clamp(2rem, 5vw, 10rem)' }}>

      <img src="/gallery/Gemini_Generated_Image_gde41rgde41rgde4.png" alt=""
        fetchpriority="high" decoding="async"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ filter:'brightness(0.38) saturate(0.9)', transform:'scale(1.05)', objectPosition:'50% center' }}/>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'linear-gradient(180deg, rgba(13,10,26,0.55) 0%, rgba(30,16,40,0.4) 40%, rgba(13,10,26,0.80) 100%)' }}/>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:'radial-gradient(circle, rgba(167,139,250,0.08) 1px, transparent 1px)', backgroundSize:'28px 28px' }}/>

      <h1 className="hi font-heebo font-black leading-[1] mb-3 md:mb-5"
        style={{ fontSize:'clamp(2.4rem, 7vw, 7rem)' }}>
        <span className="text-white">בידיים </span>
        <span style={{ color:'#A78BFA' }}>טובות</span>
      </h1>

      <p className="hi font-heebo font-black text-white mb-4 md:mb-8 text-center leading-tight"
        style={{ fontSize:'clamp(1.25rem, 3.2vw, 2.6rem)' }}>
        איש של פתרונות,{' '}
        <span style={{ color:'#A78BFA' }}>די ג'יי של פרטים קטנים</span>
      </p>

      <div className="hi hidden md:block w-64 mb-8 opacity-25">
        <Waveform color="#A78BFA" opacity={1}/>
      </div>

      <p className="hi font-heebo font-black text-white text-center leading-tight mb-6 md:mb-12"
        style={{ fontSize:'clamp(1.1rem, 2.6vw, 2.2rem)' }}>
        בואו נעשה את זה כמו שצריך —{' '}
        <span style={{ color:'#F59E0B' }}>עד הפרט האחרון</span>
      </p>

      <div className="hi w-full flex justify-center px-4">
        <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#7C3AED] text-white font-heebo font-black px-7 py-4 rounded-full text-lg shadow-lg shadow-violet-900/50 hover:bg-[#6D28D9] hover:scale-[1.03] transition-all duration-300"
          style={{ transitionTimingFunction:'cubic-bezier(0.25,0.46,0.45,0.94)', maxWidth: 360 }}>
          <MessageCircle size={20} strokeWidth={2.5}/> שלח תמונה של הבעיה
        </a>
      </div>
    </section>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const ref = useRef()
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.st', { y:25, opacity:0, duration:0.7, stagger:0.12, ease:'power3.out',
        scrollTrigger:{ trigger:ref.current, start:'top 85%' }})
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <div ref={ref} className="bg-[#F59E0B] py-8 px-4">
      <div className="max-w-4xl mx-auto flex justify-around gap-2 flex-wrap">
        {[['10+','שנות ניסיון'],['200+','לקוחות מרוצים'],['5★','דירוג ממוצע']].map(([n,l])=>(
          <div key={l} className="st text-center px-2">
            <div className="font-heebo font-black text-[#1E1028] mb-0.5" style={{fontSize:'clamp(1.8rem,5.5vw,4rem)'}}>{n}</div>
            <div className="font-heebo font-black text-[#1E1028] text-sm tracking-wide">{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICE_CARDS = [
  { tag:'CARPENTRY',  icon:<Hammer size={26} color="#D97706" strokeWidth={1.8}/>,      bg:'bg-[#FFF7ED]', iconBg:'bg-amber-100', title:'נגרות וארונות',           desc:'הרכבה, תיקון וחידוש ארונות ומדפים',  accent:'#D97706' },
  { tag:'POOLS',      icon:<Waves size={26} color="#D97706" strokeWidth={1.8}/>,        bg:'bg-[#FFF7ED]', iconBg:'bg-amber-100', title:'תיקוני בריכות ביתיות',   desc:'מדגמים, צינורות, ציוד וחיבורים',     accent:'#D97706' },
  { tag:'SHUTTERS',   icon:<AlignJustify size={26} color="#D97706" strokeWidth={1.8}/>, bg:'bg-[#FFF7ED]', iconBg:'bg-amber-100', title:'תיקון תריסים',           desc:'כל סוגי התריסים, כולל חשמליים',      accent:'#D97706' },
  { tag:'SCREENS',    icon:<Grid size={26} color="#D97706" strokeWidth={1.8}/>,         bg:'bg-[#FFF7ED]', iconBg:'bg-amber-100', title:'החלפת רשתות יתושים',     desc:'כל המידות, התקנה מהירה',             accent:'#D97706' },
  { tag:'PLUMBING',   icon:<Droplets size={26} color="#D97706" strokeWidth={1.8}/>,     bg:'bg-[#FFF7ED]', iconBg:'bg-amber-100', title:'החלפת ברזים',            desc:'ברזי מטבח, אמבטיה ונקודות רטיבות',  accent:'#D97706' },
  { tag:'FAN',        icon:<Wind size={26} color="#D97706" strokeWidth={1.8}/>,         bg:'bg-[#FFF7ED]', iconBg:'bg-amber-100', title:'התקנת מאווררי תקרה',     desc:'חיבור חשמלי, כל דגם',                accent:'#D97706' },
  { tag:'TV',         icon:<Tv size={26} color="#D97706" strokeWidth={1.8}/>,           bg:'bg-[#FFF7ED]', iconBg:'bg-amber-100', title:'תליית והתקנת טלוויזיות', desc:'קיר גבס או בטון, ניתוב כבלים',       accent:'#D97706' },
  { tag:'DOORS',      icon:<Lock size={26} color="#D97706" strokeWidth={1.8}/>,         bg:'bg-[#FFF7ED]', iconBg:'bg-amber-100', title:'תיקוני דלתות',           desc:'החלפת צירים, ידיות ומנגנוני נעילה',  accent:'#D97706' },
  { tag:'SOLAR',      icon:<Sun size={26} color="#D97706" strokeWidth={1.8}/>,          bg:'bg-[#FFF7ED]', iconBg:'bg-amber-100', title:'דודי שמש',               desc:'החלפת גוף חימום, מפסקים חכמים',      accent:'#D97706' },
  { tag:'LIGHTING',   icon:<Lightbulb size={26} color="#D97706" strokeWidth={1.8}/>,    bg:'bg-[#FFF7ED]', iconBg:'bg-amber-100', title:'התקנת גופי תאורה',       desc:'ספוטים, נברשות, LED',                 accent:'#D97706' },
]

function Services() {
  return (
    <section id="services" className="py-12 md:py-24 px-4 md:px-8 bg-[#FAFAF8]">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heebo font-black text-[#1E1028] mb-8 md:mb-12 leading-none"
          style={{ fontSize:'clamp(2rem,5vw,4.5rem)' }}>
          מה אני עושה
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {SERVICE_CARDS.map(({ tag, icon, bg, iconBg, title, desc, accent }) => (
            <div key={tag} className={`${bg} rounded-2xl overflow-hidden shadow-sm hover:-translate-y-0.5 transition-all duration-300`}>
              <div className="h-[3px]" style={{ background: accent }}/>
              <div className="p-4 md:p-5">
                <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center mb-3`}>{icon}</div>
                <p className="font-mono text-[9px] font-bold tracking-[0.18em] mb-1" style={{ color: accent + 'BB' }}>{tag}</p>
                <h3 className="font-heebo font-black text-[#1E1028] leading-tight mb-1"
                  style={{ fontSize:'clamp(0.95rem,2.5vw,1.15rem)' }}>{title}</h3>
                <p className="font-heebo text-[#1E1028]/60 text-xs leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: '01', title: 'שלח הודעה בוואטסאפ', desc: 'תאר את הצורך — גם תמונה תעשה את העבודה.' },
    { num: '02', title: 'קבל הצעת מחיר מהר', desc: 'בדרך כלל מגיב תוך שעה עם מחיר ותאריך.' },
    { num: '03', title: 'נקבע ומבצעים', desc: 'מגיעים בזמן, עובדים בדייקנות, מנקים אחרי.' },
  ]
  return (
    <section className="py-14 md:py-24 px-4 md:px-8 bg-[#0D0A1A]">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heebo font-black text-white mb-12 leading-none"
          style={{ fontSize:'clamp(2rem,5vw,4.5rem)' }}>
          איך זה עובד
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map(({ num, title, desc }) => (
            <div key={num} className="p-6 rounded-2xl border border-white/10 bg-white/[0.04]">
              <div className="font-mono font-black text-[#7C3AED] text-4xl mb-4 opacity-60">{num}</div>
              <h3 className="font-heebo font-black text-white text-lg mb-2">{title}</h3>
              <p className="font-heebo text-white/60 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center hidden md:block">
          <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-heebo font-black text-base px-8 py-4 rounded-full bg-[#7C3AED] text-white hover:bg-[#6D28D9] hover:scale-[1.03] transition-all duration-300">
            <MessageCircle size={18} strokeWidth={2.5}/> קבל הצעת מחיר
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const ref = useRef()
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.ab', { y: 40, opacity: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={ref}
      className="py-16 md:py-28 px-4 md:px-8"
      style={{ background: 'linear-gradient(160deg, #0D0A1A 0%, #1E1028 60%, #16082E 100%)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="ab relative mb-10">
          <h2 className="ab font-heebo font-black text-white leading-tight relative z-10"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}>
            נעים להכיר
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
          {/* Headshot */}
          <div className="ab flex-shrink-0 flex justify-center w-full md:w-auto">
            <img src="/gallery/WhatsApp%20Image%202026-07-01%20at%2012.21.04.jpeg"
              alt="ליאור מיימון"
              className="w-44 h-44 md:w-56 md:h-56 rounded-2xl object-cover shadow-2xl"
              style={{ border:'2px solid rgba(167,139,250,0.3)', objectPosition:'center top' }}/>
          </div>
          {/* Text */}
          <div className="max-w-2xl">
            <p className="ab font-heebo text-white/75 leading-[1.9] text-base md:text-lg mb-6">
              אני ליאור מיימון — איש של פתרונות, די ג'יי של פרטים קטנים. אני מביא איתי את המנטליות חסרת הפשרות של עולם ההייטק, יחד עם הדיוק, הקצב והיצירתיות של עולם המוזיקה.
            </p>
            <p className="ab font-heebo text-white/75 leading-[1.9] text-base md:text-lg mb-6">
              אצלי אין דבר כזה "בערך" או "יהיה בסדר". כל התקנה, תיקון או בנייה מקבלים את אותה רמת פדנטיות, סבלנות ותשומת לב לפרטים.
            </p>
            <p className="ab font-heebo text-white/75 leading-[1.9] text-base md:text-lg mb-8">
              מבחינתי, עבודה טובה היא לא רק כזו שעובדת — אלא כזו שנראית מושלמת גם מקרוב.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
const PAIRS = [
  { label: 'תיקון עבודות חשמל', tag: 'ELECTRICAL', before: '/WhatsApp Image 2026-06-28 at 18.22.51 (2).jpeg', after: '/WhatsApp Image 2026-06-28 at 18.24.40 (1).jpeg' },
  { label: 'חידוש דק עץ',        tag: 'OUTDOOR',    before: '/WhatsApp Image 2026-06-28 at 18.24.55 (1).jpeg', after: '/WhatsApp Image 2026-06-28 at 18.24.55.jpeg'       },
  { label: 'כיסוי תקרת עץ ישנה', tag: 'CARPENTRY',  before: '/WhatsApp Image 2026-06-28 at 18.25.50.jpeg',     after: '/WhatsApp Image 2026-06-28 at 18.25.50 (1).jpeg'  },
]

function GalleryCard({ file, badge, label }) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)
  return (
    <div className="gc group relative overflow-hidden rounded-2xl bg-[#111]" style={{ aspectRatio: '4/3' }}>
      {!errored && (
        <img src={file.startsWith('/') ? file : `/gallery/${file}`} alt={`${label} — ${badge}`} loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04] ${loaded ? 'opacity-100' : 'opacity-0'}`}/>
      )}
      {(!loaded || errored) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1E1028] gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 flex items-center justify-center">
            <Hammer size={18} color="#A78BFA" strokeWidth={1.5}/>
          </div>
          {errored && (
            <span className="font-mono text-[10px] text-white/40 tracking-widest">תמונה בהכנה</span>
          )}
        </div>
      )}
      <div className="absolute top-3 right-3">
        <span className="font-mono text-[13px] font-bold tracking-widest px-3 py-1.5 rounded-full bg-black/70 text-white border border-white/25">
          {badge}
        </span>
      </div>
    </div>
  )
}

function Gallery() {
  const ref = useRef()
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.gc', { y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="gallery" ref={ref} className="py-14 md:py-24 px-4 md:px-8 bg-[#FAFAF8]">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heebo font-black text-[#1E1028] mb-14 leading-none"
          style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>עבודות</h2>

        <div className="flex flex-col gap-10">
          {PAIRS.map(pair => (
            <div key={pair.label}>
              <div className="flex flex-wrap items-baseline gap-2 mb-4">
                <span className="font-heebo font-black text-[#1E1028] text-xl">{pair.label}</span>
                <span className="font-mono text-xs font-bold text-[#7C3AED] tracking-widest">{pair.tag}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pair.reversed ? (
                  <>
                    <GalleryCard file={pair.after}  badge="אחרי" label={pair.label}/>
                    <GalleryCard file={pair.before} badge="לפני" label={pair.label}/>
                  </>
                ) : (
                  <>
                    <GalleryCard file={pair.before} badge="לפני" label={pair.label}/>
                    <GalleryCard file={pair.after}  badge="אחרי" label={pair.label}/>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
          className="font-heebo font-black text-base text-[#7C3AED] text-center mt-10 block hover:text-[#6D28D9] transition-colors underline underline-offset-4">
          תמונות נוספות — שלחו הודעה בוואטסאפ ◂
        </a>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { text: 'תיקן לנו תריסים ביום שהתקשרנו — מקצוען אמיתי, ניקה אחרי עצמו.', author: 'דני ל.', city: 'תל אביב' },
  { text: 'הרכיב ארונות IKEA בלי שגיאה אחת. ממליץ בחום לכל מי שרוצה עבודה מסודרת.', author: 'מיכל א.', city: 'ראשון לציון' },
  { text: 'הברז פוצץ בשישי בצהריים — ליאור הגיע תוך שעה. לא מאמינה שיש כאלה עוד.', author: 'שרית כ.', city: 'פתח תקווה' },
]

function Testimonials() {
  return (
    <section className="py-14 md:py-24 px-4 md:px-8 bg-[#FAFAF8]">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heebo font-black text-[#1E1028] mb-12 leading-none"
          style={{ fontSize:'clamp(2rem,5vw,4.5rem)' }}>
          לקוחות מספרים
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ text, author, city }) => (
            <div key={author} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
              <p className="font-heebo text-[#1E1028] text-base leading-relaxed flex-1">
                <span className="text-[#A78BFA] font-black text-2xl leading-none me-1">"</span>
                {text}
                <span className="text-[#A78BFA] font-black text-2xl leading-none ms-1">"</span>
              </p>
              <div className="flex items-center gap-1">
                {Array.from({length:5}).map((_,i)=><Star key={i} size={11} fill="#F59E0B" color="#F59E0B"/>)}
              </div>
              <div className="font-heebo font-black text-sm text-[#1E1028]">
                {author} · <span className="text-gray-400 font-normal">{city}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact CTA ──────────────────────────────────────────────────────────────
function Contact() {
  const ref = useRef()
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.ct', { y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={ref}
      className="py-14 md:py-28 px-4 md:px-8 pb-28 md:pb-28 text-center"
      style={{ background: 'linear-gradient(160deg, #0D0A1A 0%, #1E1028 60%, #16082E 100%)' }}>
      <div className="max-w-3xl mx-auto">
        <h2 className="ct font-heebo font-black text-white mb-5 leading-tight"
          style={{ fontSize: 'clamp(2.2rem, 8vw, 7rem)' }}>
          בואו נעשה את זה<br/>
          <span style={{ color: '#A78BFA' }}>כמו שצריך</span>
        </h2>
        <div className="ct flex flex-col items-center gap-4">
          <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#7C3AED] text-white font-heebo font-black px-10 py-5 rounded-full text-lg shadow-xl shadow-violet-900/40 hover:bg-[#6D28D9] hover:scale-[1.03] transition-all duration-300"
            style={{ transitionTimingFunction: 'cubic-bezier(0.25,0.46,0.45,0.94)' }}>
            <MessageCircle size={22} strokeWidth={2.5}/> בואו נקבע תאריך
          </a>
          <a href={`tel:+${WA_NUMBER}`}
            className="inline-flex items-center gap-3 text-white font-heebo font-black text-2xl sm:text-3xl hover:text-white/80 transition-colors">
            <Phone size={24} className="shrink-0"/> {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0A0012] py-8 px-5 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-start">
        <span className="font-heebo font-black text-white/60 text-sm">בידיים טובות</span>
        <span className="font-mono text-[12px] font-bold text-white/20 tracking-widest">עד הפרט האחרון · 2026©</span>
        <div className="flex flex-col items-center md:items-end gap-0.5">
          <span className="font-mono text-[10px] text-white/30 tracking-widest">Created by</span>
          <span
            style={{ fontStyle:'italic', fontWeight:700, fontSize:14, letterSpacing:'.3px',
              background:'linear-gradient(100deg,#A78BFA,#7C3AED 55%,#6D28D9)',
              WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            Roni Gershonovitch
          </span>
        </div>
      </div>
    </footer>
  )
}

// ─── Floating WA button (mobile) ─────────────────────────────────────────────
function FloatingWA() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    let heroVisible = true
    let contactVisible = false
    const update = () => setVisible(!heroVisible && !contactVisible)

    const heroObs = new IntersectionObserver(
      ([e]) => { heroVisible = e.isIntersecting; update() },
      { threshold: 0.2 }
    )
    const contactObs = new IntersectionObserver(
      ([e]) => { contactVisible = e.isIntersecting; update() },
      { threshold: 0.15 }
    )
    const hero = document.getElementById('hero')
    const contact = document.getElementById('contact')
    if (hero) heroObs.observe(hero)
    if (contact) contactObs.observe(contact)
    return () => { heroObs.disconnect(); contactObs.disconnect() }
  }, [])

  return (
    <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
      className={`fixed left-1/2 -translate-x-1/2 z-50 md:hidden inline-flex items-center gap-2 bg-[#7C3AED] text-white font-heebo font-black px-5 py-2.5 rounded-full text-sm shadow-xl shadow-violet-900/60 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))', transitionTimingFunction:'cubic-bezier(0.25,0.46,0.45,0.94)' }}>
      <MessageCircle size={16} strokeWidth={2.5}/> וואטסאפ עכשיו
    </a>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen font-heebo pb-24 md:pb-0">
      <Noise/>
      <Ticker/>
      <Navbar/>
      <Hero/>

      <Services/>
      <HowItWorks/>
      <About/>
      <Gallery/>
      <Testimonials/>
      <Contact/>
      <Footer/>
      <FloatingWA/>
    </div>
  )
}
