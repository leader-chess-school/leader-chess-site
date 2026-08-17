// Single source of truth for the V4 homepage.
// Edit values here — components import everything from this file.

export const CONTACT = {
  phone: '+7 (911) 926-93-30',
  phoneTel: '+79119269330',
  city: 'Санкт-Петербург',
  district: 'Московский район',
  metro: 'Фрунзенская',
  address: 'Смоленская улица, 18, ЖК «Небо Москвы»',
  addressFull:
    'Смоленская улица, 18, ЖК «Небо Москвы». Вход через ворота со стороны Смоленской, домофон 3#185.',
  email: 'mail@chess-spb.com',
  vkUrl: 'https://vk.com/chess_spb',
  vkReviewsUrl: 'https://vk.com/topic-130011197_36233200',
  tgUrl: 'https://t.me/+79119269330',
} as const

export const PROMO = {
  left: `м. ${CONTACT.metro} · ${CONTACT.city}`,
} as const

export const NAV: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'О школе', href: '#stats' },
  { label: 'Тренеры', href: '#coaches' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#where' },
]

export const HERO = {
  eyebrow: `5–16 лет · м. ${CONTACT.metro}`,
  h1: 'Шахматная школа для детей в Санкт-Петербурге',
  sub: 'Учим с нуля — большинство приходит, умея только двигать фигуры. Группы до 8 человек, первое занятие бесплатное.',
  cta: 'Бесплатный пробный урок',
  ctaNote: 'Первое занятие бесплатное: 30 минут с тренером, ребёнок играет — вы смотрите.',
  photo: '/img/base/lessons-image-1.jpg',
  photoAlt: 'Дети за шахматной доской на занятии',
} as const

export const STORYBOARD = {
  eyebrow: 'как проходит занятие',
  h2: 'Один день в школе',
  steps: [
    {
      n: '01',
      caption: 'Тренер встречает ребёнка с порога. Знакомство, доска, проверка домашнего задания.',
      tag: 'purple' as const,
      photo: '/img/base/lessons-image-2.jpg',
      photoAlt: 'Тренер встречает ученика',
    },
    {
      n: '02',
      caption: 'Теория и разбор задач, затем практика за доской — ребёнок начинает думать иначе.',
      tag: 'orange' as const,
      photo: '/img/base/lessons-image-3.jpg',
      photoAlt: 'Разбор шахматной задачи с тренером',
    },
    {
      n: '03',
      caption: 'Блиц-турниры с друзьями: соревнуется, учится, растёт.',
      tag: 'blue' as const,
      photo: '/img/base/lessons-image-4.jpg',
      photoAlt: 'Дети играют в шахматы',
    },
  ],
  scheme: ['Встреча', 'Проверка д/з', 'Теория', 'Практика', 'Блиц-турнир'],
} as const

export const STATS = {
  eyebrow: 'школа в цифрах',
  h2: 'Что за нами',
  items: [
    { value: '9 лет', caption: 'Успешной работы' },
    { value: '1000', caption: 'Довольных клиентов' },
    { value: '5,0', caption: 'На Яндекс.Картах · 79 оценок' },
    { value: '30%', caption: 'Клиентов получают разряд' },
  ],
  facts: ['Десятки турниров в год', 'Летние интенсивы', 'Семейные турниры'],
} as const

export const BENEFITS = {
  h2: 'Что развивают шахматы',
  items: [
    {
      tag: 'мышление',
      tagColor: 'purple' as const,
      title: 'Учат думать наперёд',
      body: 'Ребёнок просчитывает ходы, держит план в голове и не бросает после первой ошибки.',
    },
    {
      tag: 'усидчивость',
      tagColor: 'orange' as const,
      title: 'Учат доводить до конца',
      body: 'Партия — это цель и путь к ней: даже непоседы досиживают занятие и просят ещё.',
    },
    {
      tag: 'характер',
      tagColor: 'blue' as const,
      title: 'Учат выигрывать и проигрывать',
      body: 'Уважение к сопернику и спокойное отношение к поражению — опыт, который переносится в школу и жизнь.',
    },
    {
      tag: 'анализ',
      tagColor: 'pink' as const,
      title: 'Учат оценивать ситуацию',
      body: 'Видеть доску целиком, сравнивать варианты и выбирать лучший ход.',
    },
  ],
} as const

export const COACHES = {
  h2: 'Тренеры',
  sub: 'Действующие игроки и педагоги. С детьми работают по своей методике.',
  items: [
    {
      name: 'Квитко Никита Константинович',
      photo: '/img/uploads/2022/10/nikita.jpg',
      photoAlt: 'Никита Квитко',
      creds: [
        'Кандидат в мастера спорта',
        'National Instructor (лицензия FIDE)',
        'Судья 3 категории',
        'Педагог дополнительного образования',
      ],
    },
    {
      name: 'Бурцев Игорь Леонидович',
      photo: '/img/uploads/2026/02/burczev.jpeg',
      photoAlt: 'Игорь Бурцев',
      creds: [
        'Кандидат в мастера спорта по шахматам',
        'Тренер групповых и индивидуальных занятий',
      ],
    },
    {
      name: 'Бегенов Руслан Андреевич',
      photo:
        '/img/uploads/2026/01/blnjavvikww4ubsuzlji8a1lyc6brv1uoposctq4tllarq7aha0180fswt8qcsrn2yxjbg.jpg',
      photoAlt: 'Руслан Бегенов',
      creds: ['Кандидат в мастера спорта'],
    },
  ],
  swipeHint: '← свайп →',
} as const

export const REVIEWS = {
  h2: 'Родители говорят',
  items: [
    {
      name: 'Алия',
      childAge: 'ребёнку 6 лет',
      photo: null,
      photoAlt: '',
      source: 'Яндекс.Карты',
      text: 'Прекрасная школа. Ребёнку 6 лет, ходит регулярно уже полгода и всегда с большим удовольствием идёт на занятия, а для меня это главный показатель. Педагоги все профессиональные, внимательные, умеют увлечь детей. Также радует, что группы маленькие и стоимость обучения адекватная.',
    },
    {
      name: 'Анна Мерещенкова',
      childAge: 'сын, 10 лет',
      photo: '/img/uploads/2022/10/orccphlmjt8.jpeg',
      photoAlt: 'Анна Мерещенкова',
      source: null,
      text: 'Совершенно случайно увидели в контакте объявление о шахматной школе, решили позвонить — и вот уже месяц ребёнок ходит на занятия. Говорит, что ему очень нравится. Приятно, что в школе готовы подобрать удобное время. Когда ребёнок делает домашнее задание, у меня самой появляется интерес и азарт решить шахматные задачки =)',
    },
    {
      name: 'Андрей Знатнов',
      childAge: 'сын',
      photo: null,
      photoAlt: '',
      source: 'Яндекс.Карты',
      text: 'Вожу сына с сентября. Группы небольшие, в преподавании много уделяется индивидуальному подходу. Есть ощутимый прогресс. Когда пришли, знали только как фигуры ходят. Ребёнку нравится и атмосфера, и процесс обучения.',
    },
    {
      name: 'Владимир Идрисов',
      childAge: 'сын, 5,5 лет',
      photo: '/img/uploads/2022/10/tbyagaxv6mo-1.jpeg',
      photoAlt: 'Владимир Идрисов',
      source: null,
      text: 'Ребёнку 4,5 года, ходит на шахматы второй месяц. Ходит с большим удовольствием, а потом всю неделю рассказывает бабушкам, что нового он узнал. Ребёнок доволен, бабушки довольны, родители тоже) Отличная атмосфера в школе, доступный для детей подход. Так держать!',
    },
  ],
  moreLinkText: 'все отзывы · 5,0 на Яндекс.Картах →',
} as const

export const WHERE = {
  eyebrow: `м. ${CONTACT.metro} · 5 минут пешком · ${CONTACT.district}`,
  h2: 'Где мы',
  sub: `${CONTACT.addressFull} ${CONTACT.district}, у границы с Адмиралтейским.`,
  socHint: 'напишите нам — ответим быстро',
  formCard: {
    h3: 'Бесплатное пробное занятие',
    sub: '30 минут с тренером · ребёнок поиграет · вы посмотрите.',
    cta: 'Записаться на пробный урок',
    namePh: 'Имя',
    phonePh: '+7 ___ ___ __ __',
    callLink: 'или позвонить',
    thanks: 'Спасибо! Мы перезвоним в ближайший час.',
  },
} as const

export const FOOTER = {
  cols: [
    {
      h: 'Школа',
      links: [
        { label: 'О школе', href: '#stats' },
        { label: 'Тренеры', href: '#coaches' },
        { label: 'Программа', href: '#benefits' },
      ],
    },
    {
      h: 'Записаться',
      links: [
        { label: 'Пробный урок', href: '#where' },
        { label: 'Группы 5–16 лет', href: '#stats' },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} · СПб, м. ${CONTACT.metro}`,
  legal: 'Политика · ПД',
} as const

export const STICKY = {
  cta: 'Бесплатный пробный урок',
  callAria: 'Позвонить',
} as const
