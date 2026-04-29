import React, { useMemo, useState } from "react";
const Icon = ({ type, className = "" }) => {
  const base = "inline-block " + className;
  const common = { width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", className: base };
  const icons = {
    exchange: <svg {...common}><path d="M7 7h11l-3-3"/><path d="M18 7l-3 3"/><path d="M17 17H6l3 3"/><path d="M6 17l3-3"/></svg>,
    shield: <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-5"/></svg>,
    zap: <svg {...common}><path d="M13 2 3 14h8l-1 8 10-12h-8l1-8z"/></svg>,
    pin: <svg {...common}><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    message: <svg {...common}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>,
    building: <svg {...common}><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9h1"/><path d="M9 13h1"/><path d="M9 17h1"/></svg>,
    truck: <svg {...common}><path d="M10 17h4V5H2v12h3"/><path d="M14 17h1"/><path d="M15 17h4"/><path d="M14 8h4l4 4v5h-3"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>,
    card: <svg {...common}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
    globe: <svg {...common}><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/></svg>,
    lock: <svg {...common}><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    chevron: <svg {...common}><path d="m9 18 6-6-6-6"/></svg>,
  };
  return icons[type] || null;
};

const BRAND = {
  teal: "#00B89C",
  graphite: "#1E2328",
  light: "#E7EBEE",
};

const cities = ["Кызылорда", "Костанай", "Атырау", "Алматы", "Уральск"];
const cryptoAssets = ["USDT", "BTC", "ETH", "TON", "BNB", "SOL", "USDC"];
const fiatAssets = ["KZT", "RUB", "USD", "EUR"];

const mockRates = {
  USDT: { KZT: 465, RUB: 91, USD: 0.998, EUR: 0.92 },
  BTC: { KZT: 50500000, RUB: 9450000, USD: 103500, EUR: 95200 },
  ETH: { KZT: 1800000, RUB: 337000, USD: 3700, EUR: 3400 },
  TON: { KZT: 1550, RUB: 290, USD: 3.18, EUR: 2.93 },
  BNB: { KZT: 335000, RUB: 62700, USD: 688, EUR: 633 },
  SOL: { KZT: 96500, RUB: 18100, USD: 198, EUR: 182 },
  USDC: { KZT: 465, RUB: 91, USD: 0.998, EUR: 0.92 },
};

const translations = {
  ru: {
    nav: ["Калькулятор", "Города", "Преимущества", "FAQ", "Контакты"],
    heroBadge: "Сеть криптообменников в Казахстане",
    heroTitle: "TengeX — криптообмен по Казахстану",
    heroText:
      "Обменивайте USDT, BTC и другие популярные цифровые активы на KZT, RUB, USD и EUR. Офис, перевод или курьер — быстро, безопасно и конфиденциально.",
    ctaPrimary: "Обменять через Telegram",
    ctaSecondary: "Рассчитать курс",
    calcTitle: "Рассчитайте обмен",
    calcText: "Предварительный расчёт по актуальному курсу",
    give: "Отдаёте",
    receive: "Получаете",
    amount: "Сумма",
    city: "Город",
    method: "Способ",
    office: "Офис",
    transfer: "Перевод",
    courier: "Курьер",
    result: "Предварительно вы получите",
    finalNote: "Предварительный расчёт по актуальному курсу. Финальные условия обмена фиксирует менеджер в Telegram перед сделкой.",
    fixRate: "Зафиксировать курс в Telegram",
    directionsTitle: "Популярные направления",
    methodsTitle: "Выберите удобный формат обмена",
    citiesTitle: "TengeX в городах Казахстана",
    citiesText: "",
    whyTitle: "Почему выбирают TengeX",
    securityTitle: "Безопасный обмен без лишней сложности",
    faqTitle: "FAQ",
    contactTitle: "Начните обмен через Telegram",
    contactText: "Напишите менеджеру TengeX, чтобы уточнить курс, актив, город и удобный способ обмена.",
    soon: "Адрес скоро появится",
  },
  kz: {
    nav: ["Калькулятор", "Қалалар", "Артықшылықтар", "FAQ", "Байланыс"],
    heroBadge: "Қазақстандағы крипто айырбастау желісі",
    heroTitle: "TengeX — Қазақстан бойынша крипто айырбас",
    heroText:
      "USDT, BTC және басқа танымал цифрлық активтерді KZT, RUB, USD және EUR валюталарына айырбастаңыз. Кеңсе, аударым немесе курьер — жылдам, қауіпсіз және құпия.",
    ctaPrimary: "Telegram арқылы айырбастау",
    ctaSecondary: "Курсты есептеу",
    calcTitle: "Айырбасты есептеңіз",
    calcText: "Актуалды курс бойынша алдын ала есептеу",
    give: "Бересіз",
    receive: "Аласыз",
    amount: "Сома",
    city: "Қала",
    method: "Тәсіл",
    office: "Кеңсе",
    transfer: "Аударым",
    courier: "Курьер",
    result: "Алдын ала аласыз",
    finalNote: "Курс автоматты түрде жаңарады. Соңғы шарттарды мәміле алдында Telegram менеджері бекітеді.",
    fixRate: "Курсты Telegram-да бекіту",
    directionsTitle: "Танымал бағыттар",
    methodsTitle: "Ыңғайлы айырбас форматын таңдаңыз",
    citiesTitle: "Қазақстан қалаларындағы TengeX",
    citiesText: "",
    whyTitle: "Неліктен TengeX таңдайды",
    securityTitle: "Артық күрделілік жоқ қауіпсіз айырбас",
    faqTitle: "FAQ",
    contactTitle: "Айырбасты Telegram арқылы бастаңыз",
    contactText: "Курс, актив, қала және айырбас тәсілін нақтылау үшін TengeX менеджеріне жазыңыз.",
    soon: "Мекенжай жақында пайда болады",
  },
  en: {
    nav: ["Calculator", "Cities", "Benefits", "FAQ", "Contacts"],
    heroBadge: "Crypto exchange network in Kazakhstan",
    heroTitle: "TengeX — crypto exchange across Kazakhstan",
    heroText:
      "Exchange USDT, BTC and other popular digital assets for KZT, RUB, USD and EUR. Office, transfer or courier — fast, secure and confidential.",
    ctaPrimary: "Exchange via Telegram",
    ctaSecondary: "Calculate rate",
    calcTitle: "Calculate exchange",
    calcText: "Preliminary calculation at the current rate",
    give: "You give",
    receive: "You receive",
    amount: "Amount",
    city: "City",
    method: "Method",
    office: "Office",
    transfer: "Transfer",
    courier: "Courier",
    result: "Estimated amount",
    finalNote: "Rates update automatically. Final exchange terms are confirmed by a Telegram manager before the deal.",
    fixRate: "Fix rate in Telegram",
    directionsTitle: "Popular directions",
    methodsTitle: "Choose a convenient exchange format",
    citiesTitle: "TengeX in Kazakhstan cities",
    citiesText: "",
    whyTitle: "Why choose TengeX",
    securityTitle: "Secure exchange without unnecessary complexity",
    faqTitle: "FAQ",
    contactTitle: "Start exchange via Telegram",
    contactText: "Message a TengeX manager to confirm the rate, asset, city and convenient exchange method.",
    soon: "Address coming soon",
  },
};

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 rounded-2xl bg-[#1E2328] shadow-lg ring-1 ring-white/10">
        <div className="absolute left-2 top-2 h-3 w-7 rotate-45 rounded-sm bg-[#00B89C]" />
        <div className="absolute bottom-2 left-2 h-3 w-7 -rotate-45 rounded-sm bg-white" />
      </div>
      <div className="leading-none">
        <div className="text-xl font-bold tracking-tight text-[#1E2328]">Tenge<span className="text-[#00B89C]">X</span></div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-slate-500">crypto exchange</div>
      </div>
    </div>
  );
}

function Pill({ children }) {
  return <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-white/80">{children}</span>;
}

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>{children}</div>;
}

export default function TengeXLanding() {
  const [lang, setLang] = useState("ru");
  const [from, setFrom] = useState("USDT");
  const [to, setTo] = useState("KZT");
  const [amount, setAmount] = useState(1000);
  const [city, setCity] = useState("Кызылорда");
  const [method, setMethod] = useState("office");
  const t = translations[lang];

  const result = useMemo(() => {
    const rate = mockRates[from]?.[to] || 0;
    const methodAdj = method === "courier" ? 0.995 : method === "transfer" ? 0.998 : 1;
    return Number(amount || 0) * rate * methodAdj;
  }, [from, to, amount, method]);

  const formatMoney = (value) => {
    if (!value) return "0";
    return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: to === "USD" || to === "EUR" ? 2 : 0 }).format(value);
  };

  const methods = [
    { key: "office", icon: "building", title: t.office, text: lang === "ru" ? "Обмен в точке TengeX с менеджером." : lang === "kz" ? "TengeX нүктесінде менеджермен айырбас." : "Exchange at a TengeX office with a manager." },
    { key: "transfer", icon: "card", title: t.transfer, text: lang === "ru" ? "Быстрое оформление без визита в офис." : lang === "kz" ? "Кеңсеге бармай жылдам рәсімдеу." : "Fast exchange without visiting an office." },
    { key: "courier", icon: "truck", title: t.courier, text: lang === "ru" ? "Удобно для клиентов, которым нужен выезд." : lang === "kz" ? "Курьер қажет клиенттерге ыңғайлы." : "Convenient for clients who need delivery." },
  ];

  const benefits = [
    { icon: "exchange", title: lang === "ru" ? "Выгодный курс" : lang === "kz" ? "Тиімді курс" : "Competitive rate", text: lang === "ru" ? "Предварительный расчёт по актуальному рынку." : lang === "kz" ? "Актуалды нарық бойынша алдын ала есеп." : "Estimated calculation based on the current market." },
    { icon: "shield", title: lang === "ru" ? "Безопасность" : lang === "kz" ? "Қауіпсіздік" : "Security", text: lang === "ru" ? "Условия подтверждаются до сделки." : lang === "kz" ? "Шарттар мәмілеге дейін расталады." : "Terms are confirmed before the transaction." },
    { icon: "zap", title: lang === "ru" ? "Скорость" : lang === "kz" ? "Жылдамдық" : "Speed", text: lang === "ru" ? "Быстрая заявка через Telegram." : lang === "kz" ? "Telegram арқылы жылдам өтінім." : "Fast request through Telegram." },
    { icon: "lock", title: lang === "ru" ? "Конфиденциальность" : lang === "kz" ? "Құпиялық" : "Confidentiality", text: lang === "ru" ? "Минимум лишних действий." : lang === "kz" ? "Артық әрекет жоқ." : "Minimum unnecessary steps." },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7F8] text-[#1E2328]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            {t.nav.map((item, index) => {
              const links = ["#calculator", "#cities", "#benefits", "#faq", "#contacts"];
              return <a key={item} href={links[index]} className="hover:text-[#00B89C]">{item}</a>;
            })}
          </nav>
          <div className="flex items-center gap-2">
            {["ru", "kz", "en"].map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`rounded-full px-3 py-1 text-xs font-semibold ${lang === l ? "bg-[#1E2328] text-white" : "bg-slate-100 text-slate-600"}`}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[#1E2328]">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #00B89C 0, transparent 35%), radial-gradient(circle at 80% 0%, #00B89C 0, transparent 25%)" }} />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 ring-1 ring-white/15">
                <Icon type="globe" className="h-4 w-4 text-[#00B89C]" /> {t.heroBadge}
              </div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">{t.heroTitle}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{t.heroText}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="https://t.me/TengeXExchange" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00B89C] px-6 py-4 font-semibold text-white shadow-lg shadow-[#00B89C]/20">Telegram<Icon type="message" className="h-5 w-5" /></a>
                <a href="https://wa.me/77752676311?text=Здравствуйте,%20хочу%20узнать%20курс%20обмена%20USDT%20на%20KZT" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-[#1E2328]">WhatsApp<Icon type="message" className="h-5 w-5" /></a>
                <a href="#calculator" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-semibold text-white">{t.ctaSecondary}<Icon type="chevron" className="h-5 w-5" /></a>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">{cities.map((c) => <Pill key={c}>{c}</Pill>)}</div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-white p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#00B89C]">TengeX</p>
                    <h3 className="text-2xl font-bold">{t.calcTitle}</h3>
                  </div>
                  <Icon type="exchange" className="h-8 w-8 text-[#00B89C]" />
                </div>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <label className="space-y-2 text-sm font-medium text-slate-600">{t.give}<select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[#1E2328]">{cryptoAssets.map((a) => <option key={a}>{a}</option>)}</select></label>
                    <label className="space-y-2 text-sm font-medium text-slate-600">{t.receive}<select value={to} onChange={(e) => setTo(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[#1E2328]">{fiatAssets.map((a) => <option key={a}>{a}</option>)}</select></label>
                  </div>
                  <label className="space-y-2 text-sm font-medium text-slate-600">{t.amount}<input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[#1E2328]" /></label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="space-y-2 text-sm font-medium text-slate-600">{t.city}<select value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[#1E2328]">{cities.map((c) => <option key={c}>{c}</option>)}</select></label>
                    <label className="space-y-2 text-sm font-medium text-slate-600">{t.method}<select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[#1E2328]"><option value="office">{t.office}</option><option value="transfer">{t.transfer}</option><option value="courier">{t.courier}</option></select></label>
                  </div>
                  <div className="rounded-3xl bg-[#1E2328] p-5 text-white">
                    <p className="text-sm text-white/60">{t.result}</p>
                    <div className="mt-1 text-3xl font-bold">≈ {formatMoney(result)} {to}</div>
                    <p className="mt-3 text-sm leading-6 text-white/60">{t.finalNote}</p>
                  </div>
                  <a href="https://t.me/TengeXExchange" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-[#00B89C] px-5 py-4 text-center font-semibold text-white">{t.fixRate}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="directions" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-semibold text-[#00B89C]">{t.calcText}</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{t.directionsTitle}</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["USDT → KZT", "USDT → USD", "BTC → KZT", "ETH → EUR"].map((d) => <Card key={d}><Icon type="exchange" className="mb-4 h-7 w-7 text-[#00B89C]" /><div className="text-xl font-bold">{d}</div><p className="mt-2 text-sm text-slate-500">{t.calcText}</p></Card>)}
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.methodsTitle}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {methods.map(({ icon, title, text }) => <Card key={title}><Icon type={icon} className="h-9 w-9 text-[#00B89C]" /><h3 className="mt-5 text-2xl font-bold">{title}</h3><p className="mt-3 text-slate-600">{text}</p></Card>)}
            </div>
          </div>
        </section>

        <section id="cities" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.citiesTitle}</h2>
            {t.citiesText && <p className="mt-4 text-slate-600">{t.citiesText}</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {cities.map((c) => <Card key={c} className="p-5"><Icon type="pin" className="h-7 w-7 text-[#00B89C]" /><h3 className="mt-4 text-xl font-bold">{c}</h3><p className="mt-2 text-sm text-slate-500">{t.soon}</p></Card>)}
          </div>
        </section>

        <section id="benefits" className="bg-[#1E2328] py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.whyTitle}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map(({ icon, title, text }) => <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6"><Icon type={icon} className="h-8 w-8 text-[#00B89C]" /><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-3 text-white/60">{text}</p></div>)}
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">{t.faqTitle}</h2>
          <div className="mt-8 space-y-4">
            {(
              lang === "ru"
                ? [
                    ["Какие активы можно обменять?", "USDT, BTC, ETH, TON, BNB, SOL, USDC и другие популярные активы по запросу."],
                    ["Курс на сайте финальный?", "Нет. Это предварительный расчёт по актуальному курсу. Финальный курс фиксирует менеджер в Telegram."],
                    ["Можно ли обменять без офиса?", "Да, доступны обмен переводом и курьерский формат."],
                    ["В каких городах работает TengeX?", "Кызылорда, Костанай, Атырау, Алматы и Уральск."],
                  ]
                : lang === "kz"
                ? [
                    ["Қандай активтерді айырбастауға болады?", "USDT, BTC, ETH, TON, BNB, SOL, USDC және басқа танымал активтер сұраныс бойынша."],
                    ["Сайттағы курс соңғы ма?", "Жоқ. Бұл актуалды курс бойынша алдын ала есеп. Соңғы курсты Telegram менеджері бекітеді."],
                    ["Кеңсеге бармай айырбастауға бола ма?", "Иә, аударым арқылы және курьерлік формат қолжетімді."],
                    ["TengeX қай қалаларда жұмыс істейді?", "Қызылорда, Қостанай, Атырау, Алматы және Орал."],
                  ]
                : [
                    ["Which assets can I exchange?", "USDT, BTC, ETH, TON, BNB, SOL, USDC and other popular assets on request."],
                    ["Is the website rate final?", "No. It is a preliminary calculation at the current rate. The final rate is confirmed by a Telegram manager."],
                    ["Can I exchange without visiting an office?", "Yes, transfer and courier exchange formats are available."],
                    ["Which cities does TengeX operate in?", "Kyzylorda, Kostanay, Atyrau, Almaty and Uralsk."],
                  ]
            ).map(([q, a]) => <Card key={q}><h3 className="font-bold">{q}</h3><p className="mt-2 text-slate-600">{a}</p></Card>)}
          </div>
        </section>

        <section id="contacts" className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.contactTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">{t.contactText}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="https://t.me/TengeXExchange" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00B89C] px-6 py-4 font-semibold text-white"><Icon type="message" className="h-5 w-5" /> Telegram</a>
              <a href="https://wa.me/77752676311?text=Здравствуйте,%20хочу%20узнать%20курс%20обмена%20USDT%20на%20KZT" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1E2328] px-6 py-4 font-semibold text-white">WhatsApp</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
