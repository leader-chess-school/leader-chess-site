import fs from 'node:fs'
import path from 'node:path'
import { render } from '../dist-ssr/entry-server.js'

/* Build-time SSG. Runs after vite client + SSR build:
   1. renders React content for each route (renderToString) and
      injects it into <div id="root"> of the template;
   2. writes per-route <title>/<meta>/og/canonical/JSON-LD;
   3. generates sitemap.xml.
   Mirrors maksi/scripts/prerender.mjs. */

const DIST = 'dist'
const BASE = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')
const SITE = 'https://chess-spb.com'

const ORG = {
  '@type': 'EducationalOrganization',
  name: 'Шахматная школа «Лидер»',
  url: `${SITE}/`,
  logo: `${SITE}/img/svg-sprite/logo.svg`,
}

const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Шахматная школа «Лидер»',
  alternateName: 'Школа Лидер',
  url: `${SITE}/`,
  logo: `${SITE}/img/svg-sprite/logo.svg`,
  telephone: '+79119269330',
  email: 'mail@chess-spb.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Смоленская улица, 18',
    addressLocality: 'Санкт-Петербург',
    addressRegion: 'Санкт-Петербург',
    postalCode: '196066',
    addressCountry: 'RU',
  },
  areaServed: { '@type': 'City', name: 'Санкт-Петербург' },
  sameAs: [
    'https://vk.com/chess_spb',
  ],
  description: 'Шахматная школа для детей 5–16 лет в Санкт-Петербурге, м. Фрунзенская.',
}

const ROUTES = [
  {
    out: 'index.html',
    path: '/',
    title: 'Шахматная школа «Лидер» в Санкт-Петербурге — для детей 5-16 лет',
    description:
      'Шахматная школа «Лидер» в Санкт-Петербурге: м. Фрунзенская, Московский район. Развиваем смекалку, творческое мышление и волю к победе у детей от 5 до 16 лет. Бесплатный пробный урок 30 минут.',
    locale: 'ru_RU',
    jsonLd: [
      ORGANIZATION,
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Шахматная школа «Лидер»',
        url: `${SITE}/`,
        inLanguage: 'ru-RU',
      },
    ],
  },
  {
    out: 'prices/index.html',
    path: '/prices',
    title: 'Цены на занятия шахматами для детей в СПб — школа «Лидер»',
    description:
      'Стоимость занятий шахматами для детей в Санкт-Петербурге: абонементы от 4 000 до 8 200 ₽/мес, группы до 8 человек, м. Фрунзенская. Бесплатный пробный урок.',
    locale: 'ru_RU',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Абонементы шахматной школы «Лидер»',
        description:
          'Три варианта: Стартовый (1 занятие в неделю), Продвинутый (2 занятия в неделю), Чемпионский (3 занятия в неделю). Группы до 8 человек, м. Фрунзенская.',
        provider: ORG,
        areaServed: { '@type': 'City', name: 'Санкт-Петербург' },
        offers: [
          { '@type': 'Offer', name: 'Стартовый', price: '4000', priceCurrency: 'RUB', url: `${SITE}/prices`, description: '4–5 занятий в месяц' },
          { '@type': 'Offer', name: 'Продвинутый', price: '6200', priceCurrency: 'RUB', url: `${SITE}/prices`, description: '8–10 занятий в месяц' },
          { '@type': 'Offer', name: 'Чемпионский', price: '8200', priceCurrency: 'RUB', url: `${SITE}/prices`, description: '12–15 занятий в месяц' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Как оплатить абонемент?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Принимаем оплату на месте — картой или переводом. После пробного урока администратор подберёт удобный тариф и оформит абонемент.',
            },
          },
          {
            '@type': 'Question',
            name: 'Что если ребёнок пропустит занятие?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Уточните у администратора — пропущенные занятия можно отыграть в другой группе с подходящим уровнем.',
            },
          },
          {
            '@type': 'Question',
            name: 'Можно ли поменять тариф?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Да, можно перейти с одного абонемента на другой со следующего месяца — без доплат и комиссий.',
            },
          },
          {
            '@type': 'Question',
            name: 'Есть ли скидка для второго ребёнка?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Да — скидка 20% на абонемент для второго ребёнка из одной семьи.',
            },
          },
          {
            '@type': 'Question',
            name: 'Как часто проходят турниры?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Примерно раз в 2–3 месяца для каждого уровня.',
            },
          },
          {
            '@type': 'Question',
            name: 'Можно ли выполнить разряд?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Да, мы присваиваем разряды. Выполнить разряд можно на наших турнирах.',
            },
          },
        ],
      },
    ],
  },
  {
    out: 'schedule/index.html',
    path: '/schedule',
    title: 'Расписание занятий — Шахматная школа «Лидер» | СПб, м. Фрунзенская',
    description:
      'Расписание шахматной школы «Лидер» с 1 июня 2026: очно — понедельник и четверг, онлайн — вторник и четверг. Группы старшая, средняя, младшая. Тренеры Квитко и Бурцев. М. Фрунзенская.',
    locale: 'ru_RU',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Шахматы для детей 5–16 лет',
        description:
          'Групповые занятия шахматами для детей. Будни после школы, выходные с утра. Группы до 8 человек.',
        provider: ORG,
        offers: {
          '@type': 'Offer',
          category: 'Образование',
          availability: 'https://schema.org/InStock',
          url: `${SITE}/schedule`,
        },
        hasCourseInstance: [
          {
            '@type': 'CourseInstance',
            name: 'Очно',
            courseMode: 'onsite',
            location: {
              '@type': 'Place',
              name: 'м. Фрунзенская',
              address: { '@type': 'PostalAddress', streetAddress: 'Смоленская улица, 18', addressLocality: 'Санкт-Петербург', addressCountry: 'RU' },
            },
            courseSchedule: {
              '@type': 'Schedule',
              byDay: ['Monday', 'Thursday'],
              startTime: '16:30',
            },
          },
          {
            '@type': 'CourseInstance',
            name: 'Онлайн',
            courseMode: 'online',
            courseSchedule: {
              '@type': 'Schedule',
              byDay: ['Tuesday', 'Thursday'],
              startTime: '16:00',
            },
          },
        ],
      },
    ],
  },
  {
    out: 'age-5/index.html',
    path: '/age-5',
    title: 'Шахматы для детей с 5 лет в СПб — школа «Лидер»',
    description:
      'Младшие группы для дошкольников с 5 лет: своя методика, старт с нуля, до 8 человек в группе. М. Фрунзенская, Московский район. Бесплатный пробный урок 30 минут.',
    locale: 'ru_RU',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Шахматы для детей с 5 лет',
        description:
          'Группы для дошкольников и младших школьников: старт с нуля, своя методика, до 8 человек. Очные занятия у м. Фрунзенская.',
        provider: ORG,
        offers: {
          '@type': 'Offer',
          category: 'Образование',
          availability: 'https://schema.org/InStock',
          url: `${SITE}/age-5`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'С какого возраста берёте?',
            acceptedAnswer: { '@type': 'Answer', text: 'С 5 лет. Занимаемся с детьми до 16, группы делятся по возрасту и уровню.' },
          },
          {
            '@type': 'Question',
            name: 'Ребёнок совсем не умеет играть — это проблема?',
            acceptedAnswer: { '@type': 'Answer', text: 'Нет, с этого начинает большинство учеников. Программа младшей группы рассчитана на старт с нуля.' },
          },
          {
            '@type': 'Question',
            name: 'Как попробовать?',
            acceptedAnswer: { '@type': 'Answer', text: 'Запишитесь на бесплатный пробный урок — 30 минут с тренером.' },
          },
        ],
      },
    ],
  },
  {
    out: 'individual/index.html',
    path: '/individual',
    title: 'Индивидуальные занятия шахматами для детей в СПб — «Лидер»',
    description:
      'Тренер один на один с ребёнком: мягкий старт для новичков, подготовка к турнирам и разрядам. КМС и педагоги с детской методикой, м. Фрунзенская. Пробный урок бесплатно.',
    locale: 'ru_RU',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Индивидуальные занятия шахматами для детей',
        description:
          'Персональные занятия с тренером: программа и темп под ребёнка. Мягкий старт, выравнивание с группой, подготовка к турнирам и разрядам.',
        provider: ORG,
        areaServed: { '@type': 'City', name: 'Санкт-Петербург' },
      },
    ],
  },
  {
    out: 'coaches/index.html',
    path: '/coaches',
    title: 'Тренеры по шахматам для детей — школа «Лидер», СПб',
    description:
      'Тренерский состав школы «Лидер»: кандидаты в мастера спорта, инструктор FIDE, педагоги дополнительного образования. Группы и индивидуальные занятия, м. Фрунзенская.',
    locale: 'ru_RU',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Квитко Никита Константинович',
        jobTitle: 'Тренер по шахматам',
        worksFor: ORG,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Бурцев Игорь Леонидович',
        jobTitle: 'Тренер по шахматам',
        worksFor: ORG,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Бегенов Руслан Андреевич',
        jobTitle: 'Тренер по шахматам',
        worksFor: ORG,
      },
    ],
  },
  {
    out: 'reviews/index.html',
    path: '/reviews',
    title: 'Отзывы о шахматной школе «Лидер» в СПб — 5,0 на Яндекс.Картах',
    description:
      'Рейтинг школы «Лидер»: 5,0 на Яндекс.Картах (79 оценок) и 5,0 в 2ГИС. Что родители пишут о занятиях, тренерах и отношении к детям — со ссылками на источники.',
    locale: 'ru_RU',
  },
  {
    // Vercel serves dist/404.html with a real 404 status for unmatched paths.
    out: '404.html',
    path: '/404',
    title: 'Страница не найдена — Шахматная школа «Лидер»',
    description: 'Такой страницы нет. Шахматная школа «Лидер» — занятия шахматами для детей в Санкт-Петербурге.',
    index: false,
  },
]

const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

function renderRoute(route) {
  const url = `${SITE}${route.path}`
  let html = BASE
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
  html = html.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${escAttr(route.description)}" />`,
  )
  html = html.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${url}" />`,
  )
  html = html.replace(
    /<meta property="og:url"[^>]*>/,
    `<meta property="og:url" content="${url}" />`,
  )
  html = html.replace(
    /<meta property="og:title"[^>]*>/,
    `<meta property="og:title" content="${escAttr(route.title)}" />`,
  )
  html = html.replace(
    /<meta property="og:description"[^>]*>/,
    `<meta property="og:description" content="${escAttr(route.description)}" />`,
  )
  html = html.replace(
    /<meta property="og:locale"[^>]*>/,
    `<meta property="og:locale" content="${route.locale ?? 'ru_RU'}" />`,
  )
  html = html.replace(
    /<meta name="twitter:title"[^>]*>/,
    `<meta name="twitter:title" content="${escAttr(route.title)}" />`,
  )
  html = html.replace(
    /<meta name="twitter:description"[^>]*>/,
    `<meta name="twitter:description" content="${escAttr(route.description)}" />`,
  )
  html = html.replace(
    /[ \t]*<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g,
    '',
  )

  const headAdd = []
  if (route.index === false) {
    headAdd.push('    <meta name="robots" content="noindex" />')
  }
  for (const o of route.jsonLd ?? []) {
    headAdd.push(
      `    <script type="application/ld+json">\n${JSON.stringify(o, null, 2)
        .replace(/^/gm, '    ')}\n    </script>`,
    )
  }
  if (headAdd.length) {
    html = html.replace(/(<\/head>)/, `${headAdd.join('\n')}\n  $1`)
  }

  const appHtml = render(route.path)
  const marker = '<div id="root"></div>'
  if (!html.includes(marker)) {
    throw new Error(`[prerender] ${marker} not found in dist/index.html`)
  }
  html = html.replace(marker, `<div id="root">${appHtml}</div>`)
  return html
}

for (const r of ROUTES) {
  const out = path.join(DIST, r.out)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, renderRoute(r))
  console.log(`[prerender] ${r.path} → ${out}`)
}

// sitemap.xml — indexable routes only.
const lastmod = new Date().toISOString().slice(0, 10)
const indexable = ROUTES.filter((r) => r.index !== false)
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...indexable.map((r) => {
    const priority = r.path === '/' ? '1.0' : '0.8'
    return `  <url><loc>${SITE}${r.path}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority></url>`
  }),
  '</urlset>',
  '',
].join('\n')
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap)
console.log(`[prerender] sitemap.xml → ${indexable.length} routes`)
