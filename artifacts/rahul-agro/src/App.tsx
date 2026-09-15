import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useHealthCheck, useSendChat, getHealthCheckQueryKey } from '@workspace/api-client-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ArrowRight, BarChart3, Bell, Box, Calculator, CalendarDays, Check, ChevronRight, CircleHelp, CloudSun, Download, FileText, Filter, Gauge, HandCoins, Headphones, Info, Leaf, LineChart, MapPin, Menu, MessageCircle, PackageCheck, Phone, Search, Send, ShieldCheck, ShoppingBag, Snowflake, Sprout, Thermometer, Truck, Users, Warehouse, X } from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import './index.css';

const queryClient = new QueryClient();

type Language = 'en' | 'hi' | 'hr';
type ToastState = string | null;

const crops = [
  { id: 'potato', name: 'Potato', local: 'आलू', variety: 'Jyoti / Chipsona', season: 'Jan – Mar', unit: '₹1.65 / qtl / day', tone: 'potato', icon: 'P' },
  { id: 'onion', name: 'Onion', local: 'प्याज़', variety: 'Nashik Red', season: 'Apr – Jun', unit: '₹1.85 / qtl / day', tone: 'onion', icon: 'O' },
  { id: 'wheat', name: 'Wheat', local: 'गेहूँ', variety: 'HD 2967', season: 'Apr – May', unit: '₹1.40 / qtl / day', tone: 'wheat', icon: 'W' },
  { id: 'mustard', name: 'Mustard', local: 'सरसों', variety: 'Pusa Bold', season: 'Mar – Apr', unit: '₹1.55 / qtl / day', tone: 'mustard', icon: 'M' },
];

const chambers = [
  { id: 'RA-T02', name: 'Tauru East · 02', crop: 'Potato & roots', temp: '2–4°C', capacity: '1,200 qtl', status: 'ready', fill: '28%' },
  { id: 'RA-T05', name: 'Tauru East · 05', crop: 'Onion & dry stock', temp: '0–2°C', capacity: '850 qtl', status: 'limited', fill: '71%' },
  { id: 'RA-M01', name: 'Mandi Link · 01', crop: 'Mixed produce', temp: '4–8°C', capacity: '600 qtl', status: 'ready', fill: '42%' },
];

const copy = {
  en: { home: 'Home', catalog: 'Catalog', calculator: 'Calculator', book: 'Book a chamber', monitor: 'Live monitor', logistics: 'Logistics' },
  hi: { home: 'होम', catalog: 'कैटलॉग', calculator: 'कैलकुलेटर', book: 'चैंबर बुक करें', monitor: 'लाइव मॉनिटर', logistics: 'लॉजिस्टिक्स' },
  hr: { home: 'घर', catalog: 'माल सूची', calculator: 'हिसाब', book: 'चैंबर बुक कर', monitor: 'जिंदा निगरानी', logistics: 'ढुलाई' },
};

function useToast() {
  const [toast, setToast] = useState<ToastState>(null);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);
  return { toast, showToast: setToast };
}

function Brand() {
  return <Link href="/" className="brand" data-testid="link-brand">
    <span className="brand-mark"><Sprout size={20} strokeWidth={2.2} /></span>
    <span className="brand-copy"><strong>Rahul Agro</strong><span>Limited · Tauru</span></span>
  </Link>;
}

function Header({ language, setLanguage, onMenu }: { language: Language; setLanguage: (language: Language) => void; onMenu: () => void }) {
  const [location] = useLocation();
  const nav = [
    ['/', copy[language].home, Sprout],
    ['/categories', copy[language].catalog, ShoppingBag],
    ['/calculator', copy[language].calculator, Calculator],
    ['/book-chamber', copy[language].book, CalendarDays],
    ['/logistics', copy[language].logistics, Truck],
  ] as const;
  return <header className="site-header">
    <div className="container-wide header-inner">
      <Brand />
      <nav className="main-nav" aria-label="Primary navigation">
        {nav.map(([href, label, Icon]) => <Link key={href} href={href} className={`nav-link ${location === href ? 'active' : ''}`} data-testid={`link-nav-${href.slice(1) || 'home'}`}><Icon size={14} />{label}</Link>)}
        <Link href="/dashboard/live-monitor" className={`nav-link ${location === '/dashboard/live-monitor' ? 'active' : ''}`} data-testid="link-nav-monitor"><LineChart size={14} />{copy[language].monitor}</Link>
      </nav>
      <div className="header-actions">
        <div className="language-switch" aria-label="Choose language">
          {(['en', 'hi', 'hr'] as Language[]).map((lang) => <button key={lang} className={language === lang ? 'active' : ''} onClick={() => setLanguage(lang)} data-testid={`button-language-${lang}`}>{lang === 'en' ? 'EN' : lang === 'hi' ? 'हि' : 'हर'}</button>)}
        </div>
        <button className="icon-button mobile-menu-button" onClick={onMenu} aria-label="Open navigation" data-testid="button-mobile-menu"><Menu size={17} /></button>
        <Link href="/book-chamber" className="button button-primary button-small" data-testid="link-header-book"><CalendarDays size={14} /> <span className="hidden sm:inline">Reserve space</span></Link>
      </div>
    </div>
  </header>;
}

function Footer() {
  return <footer className="footer">
    <div className="container-wide">
      <div className="footer-grid">
        <div><Brand /><p className="footer-copy">The local operating layer between harvest and better market timing. Built in Tauru, Haryana for people who move food.</p></div>
        <div><h4>Explore</h4><Link href="/categories">Crop catalog</Link><Link href="/calculator">Storage calculator</Link><Link href="/dashboard/live-monitor">Chamber monitor</Link></div>
        <div><h4>For teams</h4><Link href="/logistics">Mandi connect</Link><Link href="/book-chamber">Institutional booking</Link><Link href="/logistics">Reefer dispatch</Link></div>
        <div><h4>Talk to us</h4><a href="tel:+911242710540"><Phone size={11} /> +91 124 271 0540</a><a href="mailto:hello@rahulagro.in">hello@rahulagro.in</a><span className="footer-copy" style={{ display: 'block', marginTop: 10 }}>Mon–Sat · 08:00–19:00</span></div>
      </div>
      <div className="footer-bottom"><span>© 2024 Rahul Agro Limited · All produce, handled with care.</span><span>Operating around Tauru · Nuh · Gurugram</span></div>
    </div>
  </footer>;
}

function ChatAssistant({ language }: { language: Language }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Namaste. I can help with crop rates, chamber availability, booking steps, or a route to mandi.' },
  ]);
  const sendChat = useSendChat();
  const submit = (message = input) => {
    const cleaned = message.trim();
    if (!cleaned || sendChat.isPending) return;
    const next = [...messages, { role: 'user' as const, content: cleaned }];
    setMessages(next);
    setInput('');
    sendChat.mutate({ data: { message: cleaned, history: next.slice(-12), language } }, {
      onSuccess: (response) => setMessages((current) => [...current, { role: 'assistant', content: response.reply }]),
      onError: () => setMessages((current) => [...current, { role: 'assistant', content: 'The assistant is taking a short break. You can still browse the catalog or call our Tauru desk at +91 124 271 0540.' }]),
    });
  };
  return <>
    {open && <section className="chat-panel" aria-label="Rahul Agro assistant">
      <div className="chat-head"><div><strong>Rahul Agro desk</strong><span>Practical answers, local context</span></div><button onClick={() => setOpen(false)} aria-label="Close assistant" data-testid="button-close-chat"><X size={17} /></button></div>
      <div className="chat-messages">
        {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`chat-message ${message.role}`} data-testid={`text-chat-message-${index}`}>{message.content}</div>)}
        {sendChat.isPending && <div className="chat-message assistant"><span className="skeleton" style={{ display: 'block', width: 110, height: 10 }} /></div>}
        {messages.length === 1 && <div className="chat-suggestions">{['Can I store potato?', 'How much for 200 qtl?', 'Book for next week'].map((suggestion) => <button key={suggestion} className="chat-suggestion" onClick={() => submit(suggestion)} data-testid={`button-chat-suggestion-${suggestion.slice(0, 4)}`}>{suggestion}</button>)}</div>}
      </div>
      <form className="chat-input" onSubmit={(event) => { event.preventDefault(); submit(); }}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about storage or mandi..." aria-label="Message" data-testid="input-chat-message" /><button type="submit" aria-label="Send message" data-testid="button-send-chat"><Send size={14} /></button></form>
    </section>}
    <button className="chat-fab" onClick={() => setOpen(!open)} aria-label="Open Rahul Agro assistant" data-testid="button-open-chat"><MessageCircle size={21} /></button>
  </>;
}

function FieldNetworkArt() {
  const rows = [
    { crop: 'POTATO', lot: 'RA · 120 QTL', tone: 'potato' },
    { crop: 'ONION', lot: 'RA · 084 QTL', tone: 'onion' },
    { crop: 'WHEAT', lot: 'RA · 210 QTL', tone: 'wheat' },
  ];
  return <div className="field-network" aria-label="Illustrated crop field connected to a cold chamber">
    <div className="field-network-grid" />
    <div className="field-network-sun" />
    <div className="field-network-horizon" />
    <div className="field-network-title"><span className="signal-dot" /> FIELD GATE / TAURU EAST</div>
    <div className="field-network-chamber"><span className="chamber-mark">RA</span><strong>03.2°</strong><small>RA-T02 · STABLE</small></div>
    <div className="field-network-route route-a" />
    <div className="field-network-route route-b" />
    <div className="field-network-route route-c" />
    <div className="field-plots">{rows.map((row, index) => <div className={`field-plot plot-${index + 1}`} key={row.crop}>
      <div className="plot-label"><b>{row.crop}</b><span>{row.lot}</span></div>
      <div className={`crop-row crop-row-${row.tone}`}>{Array.from({ length: 5 }, (_, cropIndex) => <span className="crop-stem" key={cropIndex}><i /><i /></span>)}</div>
    </div>)}</div>
    <div className="field-network-scale"><span>FIELD</span><span>GATE</span><span>CHAMBER</span><span>MANDI</span></div>
  </div>;
}

function Shell({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [mobileMenu, setMobileMenu] = useState(false);
  const { toast, showToast } = useToast();
  return <div className="app-shell">
    <Header language={language} setLanguage={setLanguage} onMenu={() => setMobileMenu(!mobileMenu)} />
    {mobileMenu && <div className="mobile-nav" style={{ position: 'fixed', zIndex: 35, top: 65, left: 0, right: 0, padding: 15, background: 'hsl(var(--card))', borderBottom: '1px solid hsl(var(--border))' }}>
      {Object.entries({ '/': copy[language].home, '/categories': copy[language].catalog, '/calculator': copy[language].calculator, '/book-chamber': copy[language].book, '/dashboard/live-monitor': copy[language].monitor, '/logistics': copy[language].logistics }).map(([href, label]) => <Link key={href} href={href} className="nav-link" onClick={() => setMobileMenu(false)} data-testid={`link-mobile-${href.slice(1) || 'home'}`}>{label}<ChevronRight size={14} /></Link>)}
    </div>}
    <main>{children}</main>
    <Footer />
    <ChatAssistant language={language} />
    {toast && <div className="toast" role="status" data-testid="status-toast"><Check size={15} color="hsl(var(--secondary))" />{toast}</div>}
  </div>;
}

function Home() {
  const { data: health, isLoading: healthLoading, isError: healthError } = useHealthCheck({ query: { queryKey: getHealthCheckQueryKey() } });
  return <>
    <section className="hero"><div className="container-wide hero-grid">
      <div className="reveal"><span className="eyebrow">Harvest, held at its best</span><h1>Keep the crop.<br /><em>Choose the moment.</em></h1><p className="hero-lede">Cold storage, crop discovery and reliable dispatch — a practical local network for farmers, traders and procurement teams around Tauru.</p><div className="hero-cta-row"><Link href="/book-chamber" className="button button-primary" data-testid="link-hero-book"><Warehouse size={16} /> Reserve cold space <ArrowRight size={14} /></Link><Link href="/categories" className="button button-secondary" data-testid="link-hero-catalog"><ShoppingBag size={16} /> Browse the catalog</Link></div><div className="trust-strip"><span className="trust-item"><ShieldCheck size={14} /> Verified chambers</span><span className="trust-item"><Thermometer size={14} /> Live temperature</span><span className="trust-item"><MapPin size={14} /> Tauru-first network</span></div></div>
       <div className="hero-visual reveal reveal-delay-2"><FieldNetworkArt /></div>
    </div></section>
    <div className="marquee"><div className="marquee-track">{[0, 1].map((set) => <div className="marquee-track" key={set}>{['Potato · Jyoti', 'Onion · Nashik Red', 'Wheat · HD 2967', 'Mustard · Pusa Bold', 'Raah se mandi tak'].map((item) => <span className="marquee-item" key={`${set}-${item}`}><b>+</b>{item}</span>)}</div>)}</div></div>
    <section className="section"><div className="container-wide"><div className="section-heading"><div><span className="eyebrow">One network, three jobs</span><h2>From field gate<br />to fairer timing.</h2></div><p>We make the in-between visible: what is available, how long it can hold, and what it takes to move it when the price is right.</p></div><div className="service-grid">
      <article className="service-card featured reveal"><span className="card-kicker">01 / Preserve</span><span className="corner-number">01</span><div className="service-icon"><Snowflake size={20} /></div><h3>Cold space that answers back.</h3><p>Pick the right temperature band, reserve by quintal and watch the chamber while your produce is in our care.</p><Link href="/book-chamber" className="card-link" data-testid="link-service-preserve">Book a chamber <ArrowRight size={13} /></Link></article>
      <article className="service-card reveal reveal-delay-1"><span className="card-kicker">02 / Discover</span><span className="corner-number">02</span><div className="service-icon"><Sprout size={20} /></div><h3>Know the crop.</h3><p>Compare local varieties, hold windows and indicative rates before you take produce to market.</p><Link href="/categories" className="card-link" data-testid="link-service-discover">See catalog <ArrowRight size={13} /></Link></article>
      <article className="service-card reveal reveal-delay-2"><span className="card-kicker">03 / Move</span><span className="corner-number">03</span><div className="service-icon"><Truck size={20} /></div><h3>Make the last mile clear.</h3><p>Connect reefer capacity to Tauru, Nuh and Gurugram mandis with one request.</p><Link href="/logistics" className="card-link" data-testid="link-service-move">Plan a route <ArrowRight size={13} /></Link></article>
    </div></div></section>
    <section className="section section-soft"><div className="container-wide feature-band"><div className="feature-copy"><span className="eyebrow">A better pause</span><h2>Time is part of the harvest.</h2><p>Prices move. Weather changes. A good storage decision gives you room to choose — not pressure to sell before the crop is ready.</p><Link href="/calculator" className="button button-primary" data-testid="link-home-calculator"><Calculator size={15} /> Calculate your hold</Link></div><div className="metric-stack"><div className="metric-row"><span>Indicative hold window · potato</span><strong>90–120 d</strong><small>At 2–4°C, when received healthy and dry.</small></div><div className="metric-row"><span>Average chamber response</span><strong>&lt; 4 hr</strong><small>From request to a desk-confirmed slot.</small></div><div className="metric-row"><span>Produce on the network</span><strong>4.8k qtl</strong><small>Across current Tauru and mandi-linked inventory.</small></div><div className="metric-row"><span>Operations status</span><strong style={{ fontSize: 15 }}>{healthLoading ? 'checking…' : healthError ? 'desk only' : health?.status === 'ok' ? 'online' : 'available'}</strong><small>Storage desk support stays available either way.</small></div></div></div></section>
    <section className="section"><div className="container-wide"><div className="section-heading"><div><span className="eyebrow">How it works</span><h2>Less guesswork.<br />More breathing room.</h2></div><p>Three steps to keep a harvest moving on your terms, with a human desk when the details matter.</p></div><div className="steps">{[['01', 'Tell us the crop', 'Share crop, quantity and when you expect it at the gate.'], ['02', 'We match the chamber', 'Get a temperature-fit slot, clear pricing and a token to hold it.'], ['03', 'Watch it settle', 'Follow chamber readings and call the desk when you need a hand.'], ['04', 'Move when ready', 'Request a reefer or mandi connect when the market says go.']].map(([number, title, body]) => <div className="step reveal" key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{body}</p></div>)}</div></div></section>
    <section className="section section-soft"><div className="container-wide"><div className="section-heading"><div><span className="eyebrow">People behind the produce</span><h2>Built for the way<br />work actually happens.</h2></div></div><div className="quote-grid"><article className="quote-card"><span className="quote-mark">“</span><p>We could wait three more weeks this year. That made the difference between clearing stock and choosing our buyer.</p><span className="quote-author"><span className="avatar">RS</span>Rakesh Saini · farmer, Tauru</span></article><article className="quote-card"><span className="quote-mark">“</span><p>The live reading is simple enough for our field team, but the paperwork works for procurement too.</p><span className="quote-author"><span className="avatar">AK</span>Anita Khandelwal · trader, Nuh</span></article><article className="quote-card"><span className="quote-mark">“</span><p>One call to know what is ready, what is moving and what can be held. That is the operating layer we needed.</p><span className="quote-author"><span className="avatar">MP</span>Manoj Pratap · institutional buyer</span></article></div></div></section>
  </>;
}

function Categories() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All crops');
  const [toast, setToast] = useState('');
  const filtered = useMemo(() => crops.filter((crop) => `${crop.name} ${crop.local} ${crop.variety}`.toLowerCase().includes(query.toLowerCase()) && (filter === 'All crops' || crop.name === filter)), [query, filter]);
  return <><section className="page-hero"><div className="container-wide"><span className="eyebrow">Marketplace · field to chamber</span><h1>Choose what you<br /><span style={{ color: 'hsl(var(--accent))' }}>want to hold.</span></h1><p>A working catalog of crops and chambers around Tauru. Rates are indicative; every booking is confirmed by our storage desk.</p></div></section><section className="section" style={{ paddingTop: 26 }}><div className="container-wide"><div className="catalog-toolbar"><div className="search-box"><Search size={15} color="hsl(var(--muted-foreground))" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search potato, onion, variety..." aria-label="Search crop catalog" data-testid="input-catalog-search" /></div><div className="filter-row"><Filter size={15} color="hsl(var(--muted-foreground))" style={{ alignSelf: 'center' }} />{['All crops', ...crops.map((crop) => crop.name)].map((item) => <button key={item} className={`filter-chip ${filter === item ? 'active' : ''}`} onClick={() => setFilter(item)} data-testid={`button-filter-${item.toLowerCase().replace(' ', '-')}`}>{item}</button>)}</div></div>{filtered.length ? <div className="product-grid">{filtered.map((crop, index) => <article className={`product-card reveal reveal-delay-${Math.min(index + 1, 3)}`} key={crop.id} data-testid={`card-crop-${crop.id}`}><div className={`product-image ${crop.tone}`}><span className="crop-glyph">{crop.icon}</span><span className="product-badge">{crop.local}</span></div><div className="product-info"><h3>{crop.name}</h3><div className="product-meta"><span>{crop.variety}</span><span>{crop.season}</span></div><div className="product-price">{crop.unit}</div><button className="button button-primary button-small" onClick={() => setToast(`${crop.name} added to your storage brief`)} data-testid={`button-add-crop-${crop.id}`}><PackageCheck size={14} /> Add to brief</button></div></article>)}</div> : <div className="empty-state"><Search size={25} /><h3>No crop matched that search</h3><p>Try the local name, a variety, or clear the filter to see the full working catalog.</p><button className="button button-secondary button-small" onClick={() => { setQuery(''); setFilter('All crops'); }} data-testid="button-clear-catalog">Clear catalog search</button></div>}<div className="chamber-grid"><div className="chamber-list"><div className="panel-heading"><div><h3>Chamber availability</h3><p>Current slots · updated a few minutes ago</p></div><Link href="/dashboard/live-monitor" className="button button-secondary button-small" data-testid="link-catalog-monitor"><Gauge size={14} /> View live</Link></div>{chambers.map((chamber) => <div className="chamber-row" key={chamber.id} data-testid={`row-chamber-${chamber.id}`}><div><strong>{chamber.name}</strong><span>{chamber.crop} · {chamber.temp}</span></div><div><span className={`status-pill ${chamber.status}`}>{chamber.status === 'ready' ? 'Open' : 'Limited'}</span><span style={{ display: 'block', marginTop: 5 }}>{chamber.fill} filled</span></div><Link href={`/book-chamber?chamber=${chamber.id}`} className="button button-primary button-small" data-testid={`link-book-chamber-${chamber.id}`}>Reserve <ArrowRight size={12} /></Link></div>)}</div><aside className="side-panel"><h4>What to bring to the desk</h4><ul><li><FileText size={15} /> Crop, expected arrival date and approximate quantity.</li><li><ShieldCheck size={15} /> A phone number for the booking holder or institution.</li><li><HandCoins size={15} /> Token amount to lock a confirmed slot.</li><li><Headphones size={15} /> Questions? The Tauru desk replies in English, Hindi or Haryanvi.</li></ul></aside></div></div></section>{toast && <div className="toast" onClick={() => setToast('')} data-testid="status-catalog-toast"><Check size={15} color="hsl(var(--secondary))" />{toast}</div>}</>;
}

function CalculatorPage() {
  const [quantity, setQuantity] = useState(200);
  const [days, setDays] = useState(45);
  const [crop, setCrop] = useState('Potato');
  const [transport, setTransport] = useState('Pickup at chamber');
  const rate = crop === 'Potato' ? 1.65 : crop === 'Onion' ? 1.85 : crop === 'Wheat' ? 1.4 : 1.55;
  const storage = Math.round(quantity * days * rate);
  const handling = Math.round(quantity * 4.25);
  const transportCost = transport === 'Pickup at chamber' ? 0 : 850;
  const total = storage + handling + transportCost;
  const token = Math.max(750, Math.round(total * .12));
  return <><section className="page-hero"><div className="container-wide"><span className="eyebrow">Plan before you commit</span><h1>Make the hold<br /><span style={{ color: 'hsl(var(--accent))' }}>add up.</span></h1><p>Use a working estimate for storage, handling and token. Your final rate is confirmed by the storage desk after crop and arrival checks.</p></div></section><section className="section" style={{ paddingTop: 40 }}><div className="container-wide calc-layout"><div className="calc-form"><div className="panel-heading"><div><h3>Preservation planner</h3><p>Change any field to see the estimate move.</p></div><Calculator size={21} color="hsl(var(--secondary))" /></div><div className="field-grid"><div className="field"><label htmlFor="calc-crop">CROP</label><select id="calc-crop" value={crop} onChange={(event) => setCrop(event.target.value)} data-testid="select-calculator-crop">{crops.map((item) => <option key={item.name}>{item.name}</option>)}</select></div><div className="field"><label htmlFor="calc-quantity">QUANTITY · QUINTALS</label><input id="calc-quantity" type="number" min="1" value={quantity} onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))} data-testid="input-calculator-quantity" /></div><div className="field"><label htmlFor="calc-days">HOLD DAYS</label><input id="calc-days" type="number" min="1" value={days} onChange={(event) => setDays(Math.max(1, Number(event.target.value)))} data-testid="input-calculator-days" /></div><div className="field"><label htmlFor="calc-transport">DISPATCH PLAN</label><select id="calc-transport" value={transport} onChange={(event) => setTransport(event.target.value)} data-testid="select-calculator-transport"><option>Pickup at chamber</option><option>Request reefer dispatch</option></select></div></div><div className="field"><label htmlFor="calc-note">NOTE FOR THE STORAGE DESK · OPTIONAL</label><textarea id="calc-note" rows={4} placeholder="For example: expected arrival around 12 April..." data-testid="textarea-calculator-note" /></div><Link href="/book-chamber" className="button button-primary" data-testid="link-calculator-book"><CalendarDays size={15} /> Continue to reservation <ArrowRight size={14} /></Link></div><div className="calc-result"><span className="eyebrow">Your working estimate</span><h2>{quantity} quintals of {crop.toLowerCase()}</h2><span className="big-total">₹{total.toLocaleString('en-IN')}</span><div className="result-lines"><div className="result-line"><span>Cold storage · {days} days × ₹{rate.toFixed(2)}</span><strong>₹{storage.toLocaleString('en-IN')}</strong></div><div className="result-line"><span>Intake & handling</span><strong>₹{handling.toLocaleString('en-IN')}</strong></div><div className="result-line"><span>{transport}</span><strong>{transportCost ? `₹${transportCost.toLocaleString('en-IN')}` : 'Included'}</strong></div></div><div className="token-note"><strong>Suggested booking token · ₹{token.toLocaleString('en-IN')}</strong><br />This holds the chamber request while our team checks arrival fit. Balance is settled on intake.</div></div></div></section></>;
}

function BookingPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ crop: 'Potato', quantity: '200', chamber: 'RA-T02 · Tauru East', arrival: '2024-04-12', name: '', phone: '', notes: '' });
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const downloadSlip = () => {
    const slip = `RAHUL AGRO LIMITED\nCHAMBER RESERVATION REQUEST\n\nReference: RA-${Date.now().toString().slice(-6)}\nCrop: ${form.crop}\nQuantity: ${form.quantity} quintals\nChamber: ${form.chamber}\nExpected arrival: ${form.arrival}\nBooking holder: ${form.name}\nPhone: ${form.phone}\n\nCarry this slip to the Tauru storage desk. Final confirmation follows a crop and arrival check.`;
    const url = URL.createObjectURL(new Blob([slip], { type: 'text/plain' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'rahul-agro-reservation-slip.txt'; anchor.click(); URL.revokeObjectURL(url);
  };
  if (submitted) return <section className="section"><div className="container-wide" style={{ maxWidth: 760 }}><div className="confirmation"><div className="confirmation-icon"><Check size={22} /></div><h3>Your chamber request is in.</h3><p>We have pencilled in {form.quantity} quintals of {form.crop} at {form.chamber}. The Tauru desk will call {form.phone || 'your number'} to confirm the crop fit and token within four working hours.</p><div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}><button className="button button-primary" onClick={downloadSlip} data-testid="button-download-slip"><Download size={15} /> Download reservation slip</button><Link href="/dashboard/live-monitor" className="button button-secondary" data-testid="link-confirmation-monitor"><LineChart size={15} /> See live chambers</Link></div></div></div></section>;
  return <><section className="page-hero"><div className="container-wide"><span className="eyebrow">Storage desk · reservation</span><h1>Put a slot<br /><span style={{ color: 'hsl(var(--accent))' }}>on hold.</span></h1><p>A short request, then a human confirmation. No hidden checkout or confusing warehouse language.</p></div></section><section className="section" style={{ paddingTop: 40 }}><div className="container-wide booking-layout"><div className="form-card"><div className="progress-steps">{['Produce', 'Chamber', 'Contact'].map((label, index) => <div key={label} className={`progress-step ${step >= index + 1 ? 'active' : ''}`}><span>{index + 1}</span>{label}</div>)}</div>{step === 1 && <div className="reveal"><div className="panel-heading"><div><h3>Tell us about the produce</h3><p>Approximate is fine — we verify at intake.</p></div><Sprout size={21} color="hsl(var(--secondary))" /></div><div className="field-grid"><div className="field"><label htmlFor="booking-crop">CROP</label><select id="booking-crop" value={form.crop} onChange={(event) => update('crop', event.target.value)} data-testid="select-booking-crop">{crops.map((crop) => <option key={crop.name}>{crop.name}</option>)}</select></div><div className="field"><label htmlFor="booking-quantity">QUANTITY · QUINTALS</label><input id="booking-quantity" type="number" value={form.quantity} onChange={(event) => update('quantity', event.target.value)} data-testid="input-booking-quantity" /></div></div><div className="field"><label htmlFor="booking-notes">ANYTHING WE SHOULD KNOW?</label><textarea id="booking-notes" value={form.notes} onChange={(event) => update('notes', event.target.value)} rows={4} placeholder="Variety, harvest condition, or preferred timing..." data-testid="textarea-booking-notes" /></div><button className="button button-primary" onClick={() => setStep(2)} data-testid="button-booking-next-produce">Choose a chamber <ArrowRight size={14} /></button></div>}{step === 2 && <div className="reveal"><div className="panel-heading"><div><h3>Pick a temperature-fit chamber</h3><p>Slots shown are based on your selected crop.</p></div><Snowflake size={21} color="hsl(var(--secondary))" /></div><div style={{ display: 'grid', gap: 9 }}>{chambers.map((chamber) => <button key={chamber.id} onClick={() => update('chamber', `${chamber.id} · ${chamber.name}`)} className="request-type" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, borderColor: form.chamber.startsWith(chamber.id) ? 'hsl(var(--primary))' : undefined }} data-testid={`button-select-chamber-${chamber.id}`}><Snowflake size={17} /><span style={{ flex: 1, textAlign: 'left' }}><strong>{chamber.name}</strong><span>{chamber.crop} · {chamber.temp} · {chamber.capacity}</span></span><span className={`status-pill ${chamber.status}`}>{chamber.status === 'ready' ? 'Open' : 'Limited'}</span></button>)}</div><div className="field" style={{ marginTop: 18 }}><label htmlFor="booking-arrival">EXPECTED ARRIVAL</label><input id="booking-arrival" type="date" value={form.arrival} onChange={(event) => update('arrival', event.target.value)} data-testid="input-booking-arrival" /></div><div style={{ display: 'flex', gap: 9 }}><button className="button button-secondary" onClick={() => setStep(1)} data-testid="button-booking-back-chamber">Back</button><button className="button button-primary" onClick={() => setStep(3)} data-testid="button-booking-next-chamber">Continue <ArrowRight size={14} /></button></div></div>}{step === 3 && <div className="reveal"><div className="panel-heading"><div><h3>Where should we reach you?</h3><p>We confirm the slot before asking for a token.</p></div><Phone size={21} color="hsl(var(--secondary))" /></div><div className="field"><label htmlFor="booking-name">NAME / ORGANISATION</label><input id="booking-name" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Your name or firm" data-testid="input-booking-name" /></div><div className="field"><label htmlFor="booking-phone">PHONE NUMBER</label><input id="booking-phone" value={form.phone} onChange={(event) => update('phone', event.target.value)} placeholder="+91 98..." data-testid="input-booking-phone" /></div><div style={{ display: 'flex', gap: 9 }}><button className="button button-secondary" onClick={() => setStep(2)} data-testid="button-booking-back-contact">Back</button><button className="button button-primary" onClick={() => setSubmitted(true)} data-testid="button-submit-booking"><Check size={15} /> Send reservation request</button></div></div>}</div><aside className="side-panel booking-summary"><h4>Your reservation brief</h4><div style={{ display: 'grid', gap: 12, fontSize: 11, color: 'hsl(var(--muted-foreground))' }}><div><span>Produce</span><strong style={{ display: 'block', color: 'hsl(var(--foreground))', font: '600 15px var(--app-font-serif)', marginTop: 4 }}>{form.quantity} qtl {form.crop}</strong></div><div><span>Chamber</span><strong style={{ display: 'block', color: 'hsl(var(--foreground))', font: '600 14px var(--app-font-serif)', marginTop: 4 }}>{form.chamber}</strong></div><div><span>Expected arrival</span><strong style={{ display: 'block', color: 'hsl(var(--foreground))', font: '600 14px var(--app-font-serif)', marginTop: 4 }}>{form.arrival}</strong></div></div><div className="summary-total"><span>Indicative token<br />from calculator</span><strong>₹{Math.max(750, Math.round(Number(form.quantity || 0) * 45 * 1.65 * .12)).toLocaleString('en-IN')}</strong></div><p style={{ fontSize: 10, lineHeight: 1.6, color: 'hsl(var(--muted-foreground))' }}>No payment is taken on this screen. A desk colleague confirms availability and the final token by phone.</p></aside></div></section></>;
}

function LiveMonitor() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setTick((value) => value + 1), 4000); return () => window.clearInterval(timer); }, []);
  const temp = (3.2 + Math.sin(tick * .8) * .1).toFixed(1);
  return <><section className="page-hero"><div className="container-wide"><span className="eyebrow"><span style={{ width: 6, height: 6, background: 'hsl(var(--secondary))', borderRadius: '50%' }} /> Operations · live</span><h1>See the cold<br /><span style={{ color: 'hsl(var(--accent))' }}>doing its job.</span></h1><p>Telemetry simulation for the active Rahul Agro network. The desk watches these same bands and calls when something needs attention.</p></div></section><section className="section" style={{ paddingTop: 40 }}><div className="container-wide"><div className="monitor-top"><div className="monitor-stat"><span>NETWORK STATUS</span><strong style={{ fontSize: 20 }}>Online</strong><small>Updated just now</small></div><div className="monitor-stat"><span>ACTIVE CHAMBERS</span><strong>08 / 11</strong><small>3 slots available</small></div><div className="monitor-stat"><span>RA-T02 TEMPERATURE</span><strong>{temp}°C</strong><small>Within 2–4°C band</small></div><div className="monitor-stat"><span>HUMIDITY · RA-T02</span><strong>82%</strong><small>Stable for potatoes</small></div></div><div className="monitor-layout"><div className="chart-card"><div className="panel-heading"><div><h3>RA-T02 · Tauru East</h3><p>Potato & roots · last 24 hours</p></div><span className="status-pill online">Stable</span></div><div className="chart"><svg viewBox="0 0 700 250" preserveAspectRatio="none" aria-label="Temperature chart"><path d="M0,130 C34,110 50,148 85,132 S125,104 155,126 S193,143 225,111 S270,130 310,119 S345,103 380,122 S420,145 450,125 S492,102 530,124 S570,140 605,117 S650,128 700,110" fill="none" stroke="hsl(var(--secondary))" strokeWidth="3" /><path d="M0,130 C34,110 50,148 85,132 S125,104 155,126 S193,143 225,111 S270,130 310,119 S345,103 380,122 S420,145 450,125 S492,102 530,124 S570,140 605,117 S650,128 700,110 L700,250 L0,250 Z" fill="hsl(var(--secondary) / .12)" stroke="none" /></svg></div><div className="chart-labels"><span>24h ago</span><span>12h ago</span><span>Now</span></div></div><div className="alerts-card"><div className="panel-heading"><div><h3>Desk watchlist</h3><p>Small signals, early action.</p></div><Bell size={19} color="hsl(var(--secondary))" /></div><div className="alert-row"><span className="alert-dot" /><div><strong>RA-T05 humidity settling</strong><p>82% → 79% over the last two hours. Within onion band.</p></div></div><div className="alert-row urgent"><span className="alert-dot" /><div><strong>RA-M01 door check due</strong><p>Door sensor registered 14 min open during intake. Desk notified.</p></div></div><div className="alert-row"><span className="alert-dot" /><div><strong>Next intake window</strong><p>RA-T02 · 18:30 · 140 qtl potato · team assigned.</p></div></div><Link href="/logistics" className="button button-secondary button-small" style={{ marginTop: 12 }} data-testid="link-monitor-logistics"><Truck size={14} /> Request a dispatch</Link></div></div><div className="chamber-list" style={{ marginTop: 15 }}><div className="panel-heading"><div><h3>All chambers</h3><p>Live fill and temperature bands</p></div><span className="font-mono" style={{ fontSize: 10, color: 'hsl(var(--muted-foreground))' }}>SYNC · 4 sec</span></div>{chambers.concat([{ id: 'RA-N04', name: 'Nuh North · 04', crop: 'Wheat & grain', temp: '6–8°C', capacity: '900 qtl', status: 'ready', fill: '16%' }]).map((chamber) => <div className="chamber-row" key={chamber.id} data-testid={`row-live-chamber-${chamber.id}`}><div><strong>{chamber.name}</strong><span>{chamber.crop} · {chamber.temp}</span></div><div><span className={`status-pill ${chamber.status}`}>{chamber.status === 'ready' ? 'Online' : 'Watch'}</span><span style={{ display: 'block', marginTop: 5 }}>{chamber.fill} filled</span></div><div style={{ textAlign: 'right' }}><span style={{ font: '11px var(--app-font-mono)', color: 'hsl(var(--primary))' }}>{chamber.id === 'RA-T02' ? `${temp}°C` : chamber.temp.split('–')[0] + '.8°C'}</span></div></div>)}</div></div></section></>;
}

function Logistics() {
  const [type, setType] = useState('Reefer dispatch');
  const [sent, setSent] = useState(false);
  if (sent) return <section className="section"><div className="container-wide" style={{ maxWidth: 760 }}><div className="confirmation"><div className="confirmation-icon"><Truck size={21} /></div><h3>Route request received.</h3><p>The logistics desk will pair a vehicle and route for your {type.toLowerCase()} request. We will call within 90 minutes during desk hours.</p><button className="button button-secondary" onClick={() => setSent(false)} data-testid="button-new-logistics-request">Make another request</button></div></div></section>;
  return <><section className="page-hero"><div className="container-wide"><span className="eyebrow">Move · when ready</span><h1>Make the route<br /><span style={{ color: 'hsl(var(--accent))' }}>part of the plan.</span></h1><p>One clear request for a reefer, a mandi connection or a bulk movement window around Tauru, Nuh and Gurugram.</p></div></section><section className="section" style={{ paddingTop: 40 }}><div className="container-wide logistics-layout"><div className="form-card"><div className="panel-heading"><div><h3>What needs moving?</h3><p>Choose a route job, then share the basics.</p></div><Truck size={21} color="hsl(var(--secondary))" /></div><div className="request-types">{[['Reefer dispatch', 'Temperature-controlled vehicle', Truck], ['Mandi connect', 'Buyer or market introduction', HandCoins], ['Bulk movement', 'Multi-load procurement route', Box], ['Pickup planning', 'Farm gate to chamber', MapPin]].map(([label, detail, Icon]) => <button key={label as string} className={`request-type ${type === label ? 'active' : ''}`} onClick={() => setType(label as string)} data-testid={`button-logistics-type-${(label as string).split(' ')[0].toLowerCase()}`}><Icon size={17} /><strong>{label as string}</strong><span>{detail as string}</span></button>)}</div><div className="field-grid"><div className="field"><label htmlFor="logistics-from">FROM</label><input id="logistics-from" defaultValue="Rahul Agro · Tauru East" data-testid="input-logistics-from" /></div><div className="field"><label htmlFor="logistics-to">TO / MANDI</label><input id="logistics-to" placeholder="e.g. Gurugram wholesale market" data-testid="input-logistics-to" /></div><div className="field"><label htmlFor="logistics-quantity">LOAD · QUINTALS</label><input id="logistics-quantity" type="number" defaultValue="120" data-testid="input-logistics-quantity" /></div><div className="field"><label htmlFor="logistics-date">PREFERRED DATE</label><input id="logistics-date" type="date" data-testid="input-logistics-date" /></div></div><div className="field"><label htmlFor="logistics-contact">CONTACT NUMBER</label><input id="logistics-contact" placeholder="+91 98..." data-testid="input-logistics-contact" /></div><button className="button button-primary" onClick={() => setSent(true)} data-testid="button-submit-logistics"><Send size={15} /> Send route request <ArrowRight size={14} /></button></div><div className="route-map" aria-label="Illustrated route map around Tauru"><span className="map-label tauru">TAURU · origin</span><span className="map-label mandi">GURUGRAM · market</span><span className="map-point one" /><span className="map-point two" /><div className="map-legend"><span><MapPin size={12} /> Local route desk</span><span>Approx. 43 km corridor</span></div></div></div></section><section className="section section-soft"><div className="container-wide feature-band"><div className="feature-copy"><span className="eyebrow">Desk promise</span><h2>Real routes,<br />not a tracking screen.</h2><p>We match the practical details — load type, receiving window, vehicle and mandi contact — before a driver is sent. Less waiting at the gate.</p></div><div className="metric-stack"><div className="metric-row"><span>Typical reefer response</span><strong>90 min</strong><small>During desk hours, 08:00–19:00.</small></div><div className="metric-row"><span>Core operating corridor</span><strong>43 km</strong><small>Tauru · Nuh · Sohna · Gurugram.</small></div><div className="metric-row"><span>Vehicles on call today</span><strong>06</strong><small>2T to 16T temperature-controlled capacity.</small></div></div></div></section></>;
}

function NotFound() {
  return <section className="section"><div className="container-wide"><div className="empty-state"><CircleHelp size={26} /><h3>This route has not been marked yet.</h3><p>Head back to the operating desk and choose a crop, chamber or route.</p><Link href="/" className="button button-primary" data-testid="link-not-found-home">Back to Rahul Agro</Link></div></div></section>;
}

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/categories" component={Categories} />
    <Route path="/calculator" component={CalculatorPage} />
    <Route path="/book-chamber" component={BookingPage} />
    <Route path="/dashboard/live-monitor" component={LiveMonitor} />
    <Route path="/logistics" component={Logistics} />
    <Route component={NotFound} />
  </Switch>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><RoutedErrorBoundary><Shell><Router /></Shell></RoutedErrorBoundary></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;