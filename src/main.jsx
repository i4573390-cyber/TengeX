
import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const cities = ['Кызылорда', 'Костанай', 'Атырау', 'Петропавловск', 'Уральск'];
const cryptoAssets = ['USDT', 'BTC', 'ETH', 'TON', 'BNB', 'SOL', 'USDC'];
const fiatAssets = ['KZT', 'RUB', 'USD', 'EUR'];

const TELEGRAM = 'https://t.me/TengeXExchange';
const WHATSAPP = 'https://wa.me/77752676311?text=Здравствуйте,%20хочу%20узнать%20курс%20обмена';

const rates = {
  USDT: { KZT: 465, RUB: 91, USD: 0.998, EUR: 0.92 },
  BTC: { KZT: 50500000, RUB: 9450000, USD: 103500, EUR: 95200 },
  ETH: { KZT: 1800000, RUB: 337000, USD: 3700, EUR: 3400 },
  TON: { KZT: 1550, RUB: 290, USD: 3.18, EUR: 2.93 },
  BNB: { KZT: 335000, RUB: 62700, USD: 688, EUR: 633 },
  SOL: { KZT: 96500, RUB: 18100, USD: 198, EUR: 182 },
  USDC: { KZT: 465, RUB: 91, USD: 0.998, EUR: 0.92 }
};

const copy = {
  ru: {
    nav: ['Калькулятор', 'Города', 'Преимущества', 'FAQ', 'Контакты'],
    badge: 'Сеть криптообменников в Казахстане',
    title: 'TengeX — криптообмен по Казахстану',
    text: 'Обменивайте USDT, BTC и другие популярные цифровые активы на KZT, RUB, USD и EUR. Офис, перевод или курьер — быстро, безопасно и конфиденциально.',
    tg: 'Telegram',
    wa: 'WhatsApp',
    calc: 'Рассчитать курс',
    calcTitle: 'Рассчитайте обмен',
    give: 'Отдаёте',
    get: 'Получаете',
    amount: 'Сумма',
    city: 'Город',
    method: 'Способ',
    office: 'Офис',
    transfer: 'Перевод',
    courier: 'Курьер',
    result: 'Предварительно вы получите',
    note: 'Предварительный расчёт по актуальному курсу. Финальные условия обмена фиксирует менеджер в Telegram перед сделкой.',
    fix: 'Зафиксировать курс в Telegram',
    directions: 'Популярные направления',
    format: 'Выберите удобный формат обмена',
    citiesTitle: 'TengeX в городах Казахстана',
    citiesText: 'Адреса офисов и ссылки на карты добавим после открытия точек.',
    soon: 'Адрес скоро появится',
    why: 'Почему выбирают TengeX',
    faq: 'FAQ',
    contacts: 'Начните обмен через Telegram или WhatsApp'
  },
  kz: {
    nav: ['Калькулятор', 'Қалалар', 'Артықшылықтар', 'FAQ', 'Байланыс'],
    badge: 'Қазақстандағы крипто айырбастау желісі',
    title: 'TengeX — Қазақстан бойынша крипто айырбас',
    text: 'USDT, BTC және басқа танымал цифрлық активтерді KZT, RUB, USD және EUR валюталарына айырбастаңыз. Кеңсе, аударым немесе курьер — жылдам, қауіпсіз және құпия.',
    tg: 'Telegram',
    wa: 'WhatsApp',
    calc: 'Курсты есептеу',
    calcTitle: 'Айырбасты есептеңіз',
    give: 'Бересіз',
    get: 'Аласыз',
    amount: 'Сома',
    city: 'Қала',
    method: 'Тәсіл',
    office: 'Кеңсе',
    transfer: 'Аударым',
    courier: 'Курьер',
    result: 'Алдын ала аласыз',
    note: 'Актуалды курс бойынша алдын ала есептеу. Соңғы шарттарды мәміле алдында Telegram менеджері бекітеді.',
    fix: 'Курсты Telegram-да бекіту',
    directions: 'Танымал бағыттар',
    format: 'Ыңғайлы айырбас форматын таңдаңыз',
    citiesTitle: 'Қазақстан қалаларындағы TengeX',
    citiesText: 'Кеңсе мекенжайлары мен карта сілтемелері нүктелер ашылғаннан кейін қосылады.',
    soon: 'Мекенжай жақында пайда болады',
    why: 'Неліктен TengeX таңдайды',
    faq: 'FAQ',
    contacts: 'Айырбасты Telegram немесе WhatsApp арқылы бастаңыз'
  },
  en: {
    nav: ['Calculator', 'Cities', 'Benefits', 'FAQ', 'Contacts'],
    badge: 'Crypto exchange network in Kazakhstan',
    title: 'TengeX — crypto exchange across Kazakhstan',
    text: 'Exchange USDT, BTC and other popular digital assets for KZT, RUB, USD and EUR. Office, transfer or courier — fast, secure and confidential.',
    tg: 'Telegram',
    wa: 'WhatsApp',
    calc: 'Calculate rate',
    calcTitle: 'Calculate exchange',
    give: 'You give',
    get: 'You receive',
    amount: 'Amount',
    city: 'City',
    method: 'Method',
    office: 'Office',
    transfer: 'Transfer',
    courier: 'Courier',
    result: 'Estimated amount',
    note: 'Preliminary calculation at the current rate. Final terms are confirmed by a Telegram manager before the deal.',
    fix: 'Fix rate in Telegram',
    directions: 'Popular directions',
    format: 'Choose a convenient exchange format',
    citiesTitle: 'TengeX in Kazakhstan cities',
    citiesText: 'Office addresses and map links will be added after locations are launched.',
    soon: 'Address coming soon',
    why: 'Why choose TengeX',
    faq: 'FAQ',
    contacts: 'Start exchange via Telegram or WhatsApp'
  }
};

function Icon({ type }) {
  const icons = {
    exchange: '↔', shield: '✓', zap: '⚡', pin: '⌖', building: '▥', truck: '▣', card: '▭', globe: '◎', lock: '◉', message: '□', chevron: '›'
  };
  return <span className="icon">{icons[type] || '•'}</span>;
}

function Logo() {
  return (
    <div className="logo">
      <div className="logo-mark"><span></span><b></b></div>
      <div><strong>Tenge<span>X</span></strong><small>crypto exchange</small></div>
    </div>
  );
}

function App() {
  const [lang, setLang] = useState('ru');
  const [from, setFrom] = useState('USDT');
  const [to, setTo] = useState('KZT');
  const [amount, setAmount] = useState(1000);
  const [city, setCity] = useState('Кызылорда');
  const [method, setMethod] = useState('office');
  const t = copy[lang];

  const result = useMemo(() => {
    const rate = rates[from]?.[to] || 0;
    const adj = method === 'courier' ? 0.995 : method === 'transfer' ? 0.998 : 1;
    return Number(amount || 0) * rate * adj;
  }, [from, to, amount, method]);

  const fmt = (n) => new Intl.NumberFormat('ru-RU', { maximumFractionDigits: to === 'USD' || to === 'EUR' ? 2 : 0 }).format(n || 0);
  const links = ['#calculator', '#cities', '#benefits', '#faq', '#contacts'];

  const methods = [
    { key: 'office', icon: 'building', title: t.office, text: lang === 'ru' ? 'Обмен в точке TengeX с менеджером.' : lang === 'kz' ? 'TengeX нүктесінде менеджермен айырбас.' : 'Exchange at a TengeX office with a manager.' },
    { key: 'transfer', icon: 'card', title: t.transfer, text: lang === 'ru' ? 'Быстрое оформление без визита в офис.' : lang === 'kz' ? 'Кеңсеге бармай жылдам рәсімдеу.' : 'Fast exchange without visiting an office.' },
    { key: 'courier', icon: 'truck', title: t.courier, text: lang === 'ru' ? 'Удобно для клиентов, которым нужен выезд.' : lang === 'kz' ? 'Курьер қажет клиенттерге ыңғайлы.' : 'Convenient for clients who need delivery.' }
  ];

  const benefits = [
    ['exchange', lang === 'ru' ? 'Выгодный курс' : lang === 'kz' ? 'Тиімді курс' : 'Competitive rate', lang === 'ru' ? 'Предварительный расчёт по актуальному рынку.' : lang === 'kz' ? 'Актуалды нарық бойынша алдын ала есеп.' : 'Estimated calculation based on the current market.'],
    ['shield', lang === 'ru' ? 'Безопасность' : lang === 'kz' ? 'Қауіпсіздік' : 'Security', lang === 'ru' ? 'Условия подтверждаются до сделки.' : lang === 'kz' ? 'Шарттар мәмілеге дейін расталады.' : 'Terms are confirmed before the transaction.'],
    ['zap', lang === 'ru' ? 'Скорость' : lang === 'kz' ? 'Жылдамдық' : 'Speed', lang === 'ru' ? 'Быстрая заявка через Telegram.' : lang === 'kz' ? 'Telegram арқылы жылдам өтінім.' : 'Fast request through Telegram.'],
    ['lock', lang === 'ru' ? 'Конфиденциальность' : lang === 'kz' ? 'Құпиялық' : 'Confidentiality', lang === 'ru' ? 'Минимум лишних действий.' : lang === 'kz' ? 'Артық әрекет жоқ.' : 'Minimum unnecessary steps.']
  ];

  return (
    <>
      <header>
        <div className="container nav">
          <Logo />
          <nav>{t.nav.map((item, i) => <a key={item} href={links[i]}>{item}</a>)}</nav>
          <div className="right">
            <a className="head-btn tg" href={TELEGRAM} target="_blank">TG</a>
            <a className="head-btn wa" href={WHATSAPP} target="_blank">WA</a>
            {['ru','kz','en'].map(l => <button key={l} onClick={() => setLang(l)} className={lang === l ? 'active' : ''}>{l.toUpperCase()}</button>)}
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-text">
              <div className="badge"><Icon type="globe" /> {t.badge}</div>
              <h1>{t.title}</h1>
              <p>{t.text}</p>
              <div className="actions">
                <a className="btn primary" href={TELEGRAM} target="_blank">Telegram <Icon type="message" /></a>
                <a className="btn light" href={WHATSAPP} target="_blank">WhatsApp <Icon type="message" /></a>
                <a className="btn ghost" href="#calculator">{t.calc} <Icon type="chevron" /></a>
              </div>
              <div className="chips">{cities.map(c => <span key={c}>{c}</span>)}</div>
            </div>

            <div className="calc-card" id="calculator">
              <p className="brand">TengeX</p>
              <h2>{t.calcTitle}</h2>
              <div className="form two">
                <label>{t.give}<select value={from} onChange={e => setFrom(e.target.value)}>{cryptoAssets.map(a => <option key={a}>{a}</option>)}</select></label>
                <label>{t.get}<select value={to} onChange={e => setTo(e.target.value)}>{fiatAssets.map(a => <option key={a}>{a}</option>)}</select></label>
              </div>
              <div className="form"><label>{t.amount}<input type="number" value={amount} onChange={e => setAmount(e.target.value)} /></label></div>
              <div className="form two">
                <label>{t.city}<select value={city} onChange={e => setCity(e.target.value)}>{cities.map(c => <option key={c}>{c}</option>)}</select></label>
                <label>{t.method}<select value={method} onChange={e => setMethod(e.target.value)}><option value="office">{t.office}</option><option value="transfer">{t.transfer}</option><option value="courier">{t.courier}</option></select></label>
              </div>
              <div className="result"><span>{t.result}</span><strong>≈ {fmt(result)} {to}</strong><p>{t.note}</p></div>
              <a className="btn primary wide" href={TELEGRAM} target="_blank">{t.fix}</a>
            </div>
          </div>
        </section>

        <section className="section" id="directions"><div className="container"><p className="accent">{t.note.split('.')[0]}</p><h2>{t.directions}</h2><div className="cards four">{['USDT → KZT','USDT → USD','BTC → KZT','ETH → EUR'].map(d => <div className="card" key={d}><Icon type="exchange" /><h3>{d}</h3><p>{t.note.split('.')[0]}</p></div>)}</div></div></section>

        <section className="section white"><div className="container"><h2>{t.format}</h2><div className="cards three">{methods.map(m => <div className="card" key={m.key}><Icon type={m.icon} /><h3>{m.title}</h3><p>{m.text}</p></div>)}</div></div></section>

        <section className="section" id="cities"><div className="container"><h2>{t.citiesTitle}</h2><p className="lead">{t.citiesText}</p><div className="cards five">{cities.map(c => <div className="card" key={c}><Icon type="pin" /><h3>{c}</h3><p>{t.soon}</p></div>)}</div></div></section>

        <section className="section dark" id="benefits"><div className="container"><h2>{t.why}</h2><div className="cards four">{benefits.map(([ic, title, text]) => <div className="card dark-card" key={title}><Icon type={ic} /><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

        <section className="section" id="faq"><div className="container narrow"><h2>{t.faq}</h2>{[
          ['Какие активы можно обменять?', 'USDT, BTC, ETH, TON, BNB, SOL, USDC и другие популярные активы по запросу.'],
          ['Курс на сайте финальный?', 'Нет. Это предварительный расчёт по актуальному курсу. Финальный курс фиксирует менеджер в Telegram.'],
          ['Можно ли обменять без офиса?', 'Да, доступны обмен переводом и курьерский формат.'],
          ['Когда появятся адреса офисов?', 'После запуска точек добавим адреса и ссылки на карты.']
        ].map(([q,a]) => <div className="faq" key={q}><h3>{q}</h3><p>{a}</p></div>)}</div></section>

        <section className="section white" id="contacts"><div className="container center"><h2>{t.contacts}</h2><p className="lead">Telegram: @TengeXExchange · WhatsApp: +7 775 267 63 11</p><div className="actions center-actions"><a className="btn primary" href={TELEGRAM} target="_blank">Telegram</a><a className="btn dark-btn" href={WHATSAPP} target="_blank">WhatsApp</a></div></div></section>
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
