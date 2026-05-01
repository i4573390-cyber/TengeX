import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const TELEGRAM = "https://t.me/TengeXExchange";
const WHATSAPP =
  "https://wa.me/77752676311?text=Здравствуйте,%20хочу%20узнать%20курс%20обмена";

const cities = [
  "Кызылорда",
  "Костанай",
  "Атырау",
  "Алматы",
  "Уральск",
  "Астана",
  "Караганда",
  "Павлодар",
];

const cryptoAssets = ["USDT", "BTC", "ETH", "TON", "BNB", "SOL", "USDC"];
const fiatAssets = ["KZT", "RUB", "USD", "EUR"];

const rates = {
  USDT: { KZT: 465, RUB: 76, USD: 0.998, EUR: 0.92 },
  USDC: { KZT: 465, RUB: 76, USD: 0.998, EUR: 0.92 },
  BTC: { KZT: 50500000, RUB: 7600000, USD: 103500, EUR: 95200 },
  ETH: { KZT: 1800000, RUB: 285000, USD: 3700, EUR: 3400 },
  TON: { KZT: 1550, RUB: 250, USD: 3.18, EUR: 2.93 },
  BNB: { KZT: 335000, RUB: 52000, USD: 688, EUR: 633 },
  SOL: { KZT: 96500, RUB: 15000, USD: 198, EUR: 182 },
};

const text = {
  ru: {
    navCalculator: "Калькулятор",
    navCities: "Города",
    navBenefits: "Преимущества",
    navFaq: "FAQ",
    navContacts: "Контакты",

    badge: "Сеть криптообменников в Казахстане",
    heroTitle: "TengeX — криптообмен по Казахстану",
    heroText:
      "Обменивайте USDT, BTC и другие популярные цифровые активы на KZT, RUB, USD и EUR. Офис, перевод или курьер — быстро, безопасно и конфиденциально.",

    telegram: "Telegram",
    whatsapp: "WhatsApp",
    calculateRate: "Рассчитать курс",

    calculatorTitle: "Рассчитайте обмен",
    give: "Отдаёте",
    receive: "Получаете",
    amount: "Сумма",
    city: "Город",
    method: "Способ",
    office: "Офис",
    transfer: "Перевод",
    courier: "Курьер",
    estimated: "Предварительно вы получите",
    rateNote:
      "Предварительный расчёт по актуальному курсу. Финальные условия обмена фиксирует менеджер в Telegram перед сделкой.",
    fixRate: "Зафиксировать курс в Telegram",

    popularTitle: "Популярные направления",
    popularSubtitle: "Предварительный расчёт по актуальному курсу",

    methodsTitle: "Выберите удобный формат обмена",
    officeText: "Обмен в точке TengeX с менеджером.",
    transferText: "Быстрое оформление без визита в офис.",
    courierText: "Удобно для клиентов, которым нужен выезд.",

    citiesTitle: "TengeX в городах Казахстана",
    addressSoon: "Адрес скоро появится",

    benefitsTitle: "Почему выбирают TengeX",
    benefitRate: "Выгодный курс",
    benefitRateText: "Средний курс для быстрого предварительного расчёта.",
    benefitSecurity: "Безопасность",
    benefitSecurityText: "Условия подтверждаются до сделки.",
    benefitSpeed: "Скорость",
    benefitSpeedText: "Быстрая заявка через Telegram или WhatsApp.",
    benefitPrivacy: "Конфиденциальность",
    benefitPrivacyText: "Минимум лишних действий.",

    securityTitle: "Безопасный обмен без лишней сложности",
    securityText:
      "TengeX работает через понятный процесс: заявка, подтверждение курса, выбор способа обмена и сопровождение менеджера до завершения сделки.",

    reviewsTitle: "Отзывы клиентов",
    reviewsSubtitle: "Что говорят клиенты TengeX",
    reviews: [
      [
        "Айбек",
        "Кызылорда",
        "Обменял USDT на тенге через Telegram. Быстро ответили, курс заранее подтвердили, всё прошло спокойно.",
      ],
      [
        "Нурлан",
        "Атырау",
        "Удобно, что можно выбрать формат обмена. Мне подошёл перевод, менеджер всё объяснил по шагам.",
      ],
      [
        "Данияр",
        "Алматы",
        "Понравилось, что без лишней суеты. Написал, уточнил курс, договорились и завершили обмен.",
      ],
      [
        "Мадина",
        "Костанай",
        "Пользовалась впервые, переживала. Менеджер всё объяснил, обмен прошёл понятно и безопасно.",
      ],
      [
        "Иван",
        "Уральск",
        "Нормальный сервис, курс сразу посчитался на сайте. Потом подтвердил условия в Telegram.",
      ],
      [
        "Алексей",
        "Астана",
        "Быстрая связь и понятные условия. Удобно, что есть Telegram и WhatsApp.",
      ],
    ],

    faqTitle: "FAQ",
    faq: [
      [
        "Какие активы можно обменять?",
        "USDT, BTC, ETH, TON, BNB, SOL, USDC и другие популярные активы по запросу.",
      ],
      [
        "Курс на сайте финальный?",
        "Нет. Это предварительный расчёт по актуальному курсу. Финальный курс фиксирует менеджер в Telegram.",
      ],
      [
        "Можно ли обменять без офиса?",
        "Да, доступны обмен переводом и курьерский формат.",
      ],
      [
        "В каких городах работает TengeX?",
        "Кызылорда, Костанай, Атырау, Алматы, Уральск, Астана, Караганда и Павлодар.",
      ],
    ],

    contactsTitle: "Начните обмен через Telegram или WhatsApp",
    contactsText:
      "Напишите менеджеру TengeX, чтобы уточнить курс, актив, город и удобный способ обмена.",
  },

  kz: {
    navCalculator: "Калькулятор",
    navCities: "Қалалар",
    navBenefits: "Артықшылықтар",
    navFaq: "FAQ",
    navContacts: "Байланыс",

    badge: "Қазақстандағы крипто айырбастау желісі",
    heroTitle: "TengeX — Қазақстан бойынша крипто айырбас",
    heroText:
      "USDT, BTC және басқа танымал цифрлық активтерді KZT, RUB, USD және EUR валюталарына айырбастаңыз. Кеңсе, аударым немесе курьер — жылдам, қауіпсіз және құпия.",

    telegram: "Telegram",
    whatsapp: "WhatsApp",
    calculateRate: "Курсты есептеу",

    calculatorTitle: "Айырбасты есептеңіз",
    give: "Бересіз",
    receive: "Аласыз",
    amount: "Сома",
    city: "Қала",
    method: "Тәсіл",
    office: "Кеңсе",
    transfer: "Аударым",
    courier: "Курьер",
    estimated: "Алдын ала аласыз",
    rateNote:
      "Актуалды курс бойынша алдын ала есеп. Соңғы шарттарды мәміле алдында Telegram менеджері бекітеді.",
    fixRate: "Курсты Telegram-да бекіту",

    popularTitle: "Танымал бағыттар",
    popularSubtitle: "Актуалды курс бойынша алдын ала есеп",

    methodsTitle: "Ыңғайлы айырбас форматын таңдаңыз",
    officeText: "TengeX нүктесінде менеджермен айырбас.",
    transferText: "Кеңсеге бармай жылдам рәсімдеу.",
    courierText: "Курьер қажет клиенттерге ыңғайлы.",

    citiesTitle: "Қазақстан қалаларындағы TengeX",
    addressSoon: "Мекенжай жақында пайда болады",

    benefitsTitle: "Неліктен TengeX таңдайды",
    benefitRate: "Тиімді курс",
    benefitRateText: "Жылдам алдын ала есептеу үшін орташа курс.",
    benefitSecurity: "Қауіпсіздік",
    benefitSecurityText: "Шарттар мәмілеге дейін расталады.",
    benefitSpeed: "Жылдамдық",
    benefitSpeedText: "Telegram немесе WhatsApp арқылы жылдам өтінім.",
    benefitPrivacy: "Құпиялық",
    benefitPrivacyText: "Артық әрекет жоқ.",

    securityTitle: "Артық күрделілік жоқ қауіпсіз айырбас",
    securityText:
      "TengeX түсінікті процесс арқылы жұмыс істейді: өтінім, курсты растау, айырбас тәсілін таңдау және мәміле аяқталғанға дейін менеджердің сүйемелдеуі.",

    reviewsTitle: "Клиент пікірлері",
    reviewsSubtitle: "TengeX клиенттері не дейді",
    reviews: [
      [
        "Айбек",
        "Қызылорда",
        "USDT-ті теңгеге Telegram арқылы айырбастадым. Жылдам жауап берді, курсты алдын ала растады, бәрі тыныш өтті.",
      ],
      [
        "Нұрлан",
        "Атырау",
        "Айырбас форматын таңдауға болатыны ыңғайлы. Маған аударым қолайлы болды, менеджер бәрін кезең-кезеңімен түсіндірді.",
      ],
      [
        "Данияр",
        "Алматы",
        "Артық әуре жоқ. Жаздым, курсты нақтыладым, келісіп, айырбасты аяқтадық.",
      ],
      [
        "Мадина",
        "Қостанай",
        "Алғаш рет қолдандым, басында уайымдадым. Менеджер бәрін түсіндірді, айырбас түсінікті әрі қауіпсіз өтті.",
      ],
      [
        "Иван",
        "Орал",
        "Жақсы сервис, курс сайтта бірден есептелді. Кейін шарттарды Telegram арқылы растадым.",
      ],
      [
        "Алексей",
        "Астана",
        "Байланыс жылдам, шарттар түсінікті. Telegram және WhatsApp болғаны ыңғайлы.",
      ],
    ],

    faqTitle: "FAQ",
    faq: [
      [
        "Қандай активтерді айырбастауға болады?",
        "USDT, BTC, ETH, TON, BNB, SOL, USDC және басқа танымал активтер сұраныс бойынша.",
      ],
      [
        "Сайттағы курс соңғы ма?",
        "Жоқ. Бұл актуалды курс бойынша алдын ала есеп. Соңғы курсты Telegram менеджері бекітеді.",
      ],
      [
        "Кеңсеге бармай айырбастауға бола ма?",
        "Иә, аударым арқылы және курьерлік формат қолжетімді.",
      ],
      [
        "TengeX қай қалаларда жұмыс істейді?",
        "Қызылорда, Қостанай, Атырау, Алматы, Орал, Астана, Қарағанды және Павлодар.",
      ],
    ],

    contactsTitle: "Айырбасты Telegram немесе WhatsApp арқылы бастаңыз",
    contactsText:
      "Курс, актив, қала және айырбас тәсілін нақтылау үшін TengeX менеджеріне жазыңыз.",
  },

  en: {
    navCalculator: "Calculator",
    navCities: "Cities",
    navBenefits: "Benefits",
    navFaq: "FAQ",
    navContacts: "Contacts",

    badge: "Crypto exchange network in Kazakhstan",
    heroTitle: "TengeX — crypto exchange across Kazakhstan",
    heroText:
      "Exchange USDT, BTC and other popular digital assets for KZT, RUB, USD and EUR. Office, transfer or courier — fast, secure and confidential.",

    telegram: "Telegram",
    whatsapp: "WhatsApp",
    calculateRate: "Calculate rate",

    calculatorTitle: "Calculate exchange",
    give: "You give",
    receive: "You receive",
    amount: "Amount",
    city: "City",
    method: "Method",
    office: "Office",
    transfer: "Transfer",
    courier: "Courier",
    estimated: "Estimated amount",
    rateNote:
      "Preliminary calculation at the current rate. Final exchange terms are confirmed by a Telegram manager before the deal.",
    fixRate: "Fix rate in Telegram",

    popularTitle: "Popular directions",
    popularSubtitle: "Preliminary calculation at the current rate",

    methodsTitle: "Choose a convenient exchange format",
    officeText: "Exchange at a TengeX office with a manager.",
    transferText: "Fast exchange without visiting an office.",
    courierText: "Convenient for clients who need delivery.",

    citiesTitle: "TengeX in Kazakhstan cities",
    addressSoon: "Address coming soon",

    benefitsTitle: "Why choose TengeX",
    benefitRate: "Competitive rate",
    benefitRateText: "Average rate for fast preliminary calculation.",
    benefitSecurity: "Security",
    benefitSecurityText: "Terms are confirmed before the transaction.",
    benefitSpeed: "Speed",
    benefitSpeedText: "Fast request through Telegram or WhatsApp.",
    benefitPrivacy: "Confidentiality",
    benefitPrivacyText: "Minimum unnecessary steps.",

    securityTitle: "Secure exchange without unnecessary complexity",
    securityText:
      "TengeX works through a clear process: request, rate confirmation, exchange method selection and manager support until the deal is completed.",

    reviewsTitle: "Client reviews",
    reviewsSubtitle: "What TengeX clients say",
    reviews: [
      [
        "Aibek",
        "Kyzylorda",
        "I exchanged USDT to tenge through Telegram. They replied quickly, confirmed the rate in advance, and everything went smoothly.",
      ],
      [
        "Nurlan",
        "Atyrau",
        "It is convenient that you can choose the exchange format. Transfer worked well for me, and the manager explained every step.",
      ],
      [
        "Daniyar",
        "Almaty",
        "No unnecessary hassle. I messaged them, checked the rate, agreed on the terms, and completed the exchange.",
      ],
      [
        "Madina",
        "Kostanay",
        "It was my first time, so I was cautious. The manager explained everything, and the exchange felt clear and safe.",
      ],
      [
        "Ivan",
        "Uralsk",
        "Good service. The website calculated the rate first, then I confirmed the terms in Telegram.",
      ],
      [
        "Alexey",
        "Astana",
        "Fast communication and clear terms. It is convenient that both Telegram and WhatsApp are available.",
      ],
    ],

    faqTitle: "FAQ",
    faq: [
      [
        "Which assets can I exchange?",
        "USDT, BTC, ETH, TON, BNB, SOL, USDC and other popular assets on request.",
      ],
      [
        "Is the website rate final?",
        "No. It is a preliminary calculation at the current rate. The final rate is confirmed by a Telegram manager.",
      ],
      [
        "Can I exchange without visiting an office?",
        "Yes, transfer and courier exchange formats are available.",
      ],
      [
        "Which cities does TengeX operate in?",
        "Kyzylorda, Kostanay, Atyrau, Almaty, Uralsk, Astana, Karaganda and Pavlodar.",
      ],
    ],

    contactsTitle: "Start exchange via Telegram or WhatsApp",
    contactsText:
      "Message a TengeX manager to confirm the rate, asset, city and convenient exchange method.",
  },
};

function Icon({ type }) {
  if (type === "exchange") return <span className="icon">↔</span>;
  if (type === "shield") return <span className="icon">◇</span>;
  if (type === "speed") return <span className="icon">↗</span>;
  if (type === "pin") return <span className="icon">◎</span>;
  if (type === "office") return <span className="icon">▥</span>;
  if (type === "card") return <span className="icon">▭</span>;
  if (type === "truck") return <span className="icon">▣</span>;
  if (type === "lock") return <span className="icon">◌</span>;
  return <span className="icon">•</span>;
}

function Logo() {
  return (
    <a href="#top" className="logo">
      <div className="logo-mark">
        <span className="logo-teal"></span>
        <span className="logo-white"></span>
      </div>
      <div>
        <div className="logo-word">
          Tenge<span>X</span>
        </div>
        <div className="logo-sub">CRYPTO EXCHANGE</div>
      </div>
    </a>
  );
}

function formatNumber(value, currency) {
  return new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: currency === "USD" || currency === "EUR" ? 2 : 0,
  }).format(value || 0);
}

function App() {
  const [lang, setLang] = useState("ru");
  const [from, setFrom] = useState("USDT");
  const [to, setTo] = useState("KZT");
  const [amount, setAmount] = useState(1000);
  const [city, setCity] = useState("Кызылорда");
  const [method, setMethod] = useState("office");

  const t = text[lang];

  const result = useMemo(() => {
    const baseRate = rates[from]?.[to] || 0;
    const methodRate =
      method === "courier" ? 0.995 : method === "transfer" ? 0.998 : 1;

    return Number(amount || 0) * baseRate * methodRate;
  }, [from, to, amount, method]);

  const methodTitle =
    method === "office" ? t.office : method === "transfer" ? t.transfer : t.courier;

  return (
    <div className="page" id="top">
      <header className="header">
        <div className="container header-inner">
          <Logo />

          <nav className="nav">
            <a href="#calculator">{t.navCalculator}</a>
            <a href="#cities">{t.navCities}</a>
            <a href="#benefits">{t.navBenefits}</a>
            <a href="#faq">{t.navFaq}</a>
            <a href="#contacts">{t.navContacts}</a>
          </nav>

          <div className="lang-switch">
            {["ru", "kz", "en"].map((item) => (
              <button
                key={item}
                onClick={() => setLang(item)}
                className={lang === item ? "active" : ""}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="badge">
                <Icon type="pin" />
                {t.badge}
              </div>

              <h1>{t.heroTitle}</h1>
              <p>{t.heroText}</p>

              <div className="hero-actions">
                <a href={TELEGRAM} target="_blank" rel="noreferrer" className="btn primary">
                  {t.telegram}
                </a>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn light">
                  {t.whatsapp}
                </a>
                <a href="#calculator" className="btn ghost">
                  {t.calculateRate}
                </a>
              </div>

              <div className="city-pills">
                {cities.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="calculator-card" id="calculator">
              <div className="calc-head">
                <div>
                  <div className="mini-brand">TengeX</div>
                  <h2>{t.calculatorTitle}</h2>
                </div>
                <Icon type="exchange" />
              </div>

              <div className="calc-row">
                <label>
                  {t.give}
                  <select value={from} onChange={(e) => setFrom(e.target.value)}>
                    {cryptoAssets.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <label>
                  {t.receive}
                  <select value={to} onChange={(e) => setTo(e.target.value)}>
                    {fiatAssets.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="full">
                {t.amount}
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </label>

              <div className="calc-row">
                <label>
                  {t.city}
                  <select value={city} onChange={(e) => setCity(e.target.value)}>
                    {cities.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <label>
                  {t.method}
                  <select value={method} onChange={(e) => setMethod(e.target.value)}>
                    <option value="office">{t.office}</option>
                    <option value="transfer">{t.transfer}</option>
                    <option value="courier">{t.courier}</option>
                  </select>
                </label>
              </div>

              <div className="result-box">
                <div>{t.estimated}</div>
                <strong>
                  ≈ {formatNumber(result, to)} {to}
                </strong>
                <p>{t.rateNote}</p>
              </div>

              <a href={TELEGRAM} target="_blank" rel="noreferrer" className="btn primary wide">
                {t.fixRate}
              </a>

              <div className="calc-meta">
                {city} · {methodTitle}
              </div>
            </div>
          </div>
        </section>

        <section className="section light-section">
          <div className="container">
            <div className="section-kicker">{t.popularSubtitle}</div>
            <h2>{t.popularTitle}</h2>

            <div className="cards four">
              {["USDT → KZT", "USDT → RUB", "USDT → USD", "BTC → KZT"].map((item) => (
                <div className="card" key={item}>
                  <Icon type="exchange" />
                  <h3>{item}</h3>
                  <p>{t.popularSubtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section white-section">
          <div className="container">
            <h2>{t.methodsTitle}</h2>

            <div className="cards three">
              <div className="card">
                <Icon type="office" />
                <h3>{t.office}</h3>
                <p>{t.officeText}</p>
              </div>

              <div className="card">
                <Icon type="card" />
                <h3>{t.transfer}</h3>
                <p>{t.transferText}</p>
              </div>

              <div className="card">
                <Icon type="truck" />
                <h3>{t.courier}</h3>
                <p>{t.courierText}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section light-section" id="cities">
          <div className="container">
            <h2>{t.citiesTitle}</h2>

            <div className="cards five">
              {cities.map((item) => (
                <div className="card city-card" key={item}>
                  <Icon type="pin" />
                  <h3>{item}</h3>
                  <p>{t.addressSoon}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section dark-section" id="benefits">
          <div className="container">
            <h2>{t.benefitsTitle}</h2>

            <div className="cards four">
              <div className="dark-card">
                <Icon type="exchange" />
                <h3>{t.benefitRate}</h3>
                <p>{t.benefitRateText}</p>
              </div>

              <div className="dark-card">
                <Icon type="shield" />
                <h3>{t.benefitSecurity}</h3>
                <p>{t.benefitSecurityText}</p>
              </div>

              <div className="dark-card">
                <Icon type="speed" />
                <h3>{t.benefitSpeed}</h3>
                <p>{t.benefitSpeedText}</p>
              </div>

              <div className="dark-card">
                <Icon type="lock" />
                <h3>{t.benefitPrivacy}</h3>
                <p>{t.benefitPrivacyText}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section white-section">
          <div className="container narrow">
            <h2>{t.securityTitle}</h2>
            <p className="big-text">{t.securityText}</p>
          </div>
        </section>

        <section className="section light-section" id="reviews">
          <div className="container">
            <div className="section-kicker">{t.reviewsSubtitle}</div>
            <h2>{t.reviewsTitle}</h2>

            <div className="reviews-grid">
              {t.reviews.map(([name, reviewCity, review]) => (
                <div className="review-card" key={`${name}-${reviewCity}`}>
                  <div className="review-top">
                    <div className="review-avatar">{name[0]}</div>
                    <div>
                      <h3>{name}</h3>
                      <p>{reviewCity}</p>
                    </div>
                  </div>

                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">{review}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section light-section" id="faq">
          <div className="container narrow">
            <h2>{t.faqTitle}</h2>

            <div className="faq-list">
              {t.faq.map(([question, answer]) => (
                <div className="faq-item" key={question}>
                  <h3>{question}</h3>
                  <p>{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contacts">
          <div className="container narrow center">
            <h2>{t.contactsTitle}</h2>
            <p>{t.contactsText}</p>

            <div className="contact-actions">
              <a href={TELEGRAM} target="_blank" rel="noreferrer" className="btn primary">
                Telegram
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn dark">
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
