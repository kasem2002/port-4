// Default content, structured for i18n. { en, ar } on every user-facing string.
// The dashboard mutates a copy of this in Redux; localStorage persists changes.

const L = (en, ar) => ({ en, ar });

export const defaultContent = {
  brand: {
    name: L('PORT-4', 'PORT-4'),
    tagline: L(
      'A software development team',
      'فريق تطوير برمجيات',
    ),
    email: 'hello@port-4.dev',
    phone: '+00 000 000 000',
    location: L('Remote · Distributed', 'فريق موزَّع · عن بُعد'),
    social: [
      { label: L('GitHub', 'جيت هَب'), href: '#', abbr: 'GH' },
      { label: L('LinkedIn', 'لينكدإن'), href: '#', abbr: 'IN' },
      { label: L('X', 'إكس'), href: '#', abbr: 'X' },
      { label: L('Dribbble', 'دريبل'), href: '#', abbr: 'DR' },
    ],
    languages: ['EN', 'AR'],
  },

  nav: [
    { label: L('Work', 'الأعمال'), href: '#projects' },
    { label: L('Services', 'الخدمات'), href: '#services' },
    { label: L('Process', 'منهجية العمل'), href: '#process' },
    { label: L('About', 'من نحن'), href: '#about' },
    { label: L('Journal', 'المدوّنة'), href: '#journal' },
    { label: L('Contact', 'تواصل معنا'), href: '#contact' },
  ],

  hero: {
    headline: L(
      'We turn ideas into||software people||can actually use.',
      'نحوّل الأفكار إلى||منتجات برمجية||جاهزة للاستخدام.',
    ),
    accentLine: 1,
    subcopy: L(
      'PORT-4 is a multidisciplinary software development team of developers and designers building websites, mobile apps, platforms and digital products for businesses, startups and organizations that want the work done properly.',
      'PORT-4 فريق متكامل لتطوير البرمجيات، يضم مطوّرين ومصمّمين نبني معًا مواقع الويب وتطبيقات الهاتف والمنصات والمنتجات الرقمية للشركات ورواد الأعمال والمؤسسات التي تبحث عن تنفيذ متقن.',
    ),
    trustTitle: L(
      'Trusted by teams at 40+ organizations',
      'موضع ثقة فرق العمل في أكثر من ٤٠ مؤسسة',
    ),
    trustSub: L(
      'Startups, SMBs, and independent brands worldwide.',
      'شركات ناشئة ومؤسسات صغيرة ومتوسطة وعلامات مستقلة حول العالم.',
    ),
  },

  marquee: [
    L('Web platforms', 'منصات ويب'),
    L('Mobile apps', 'تطبيقات هاتف'),
    L('Design systems', 'أنظمة تصميم'),
    L('APIs', 'واجهات API'),
    L('E-commerce', 'تجارة إلكترونية'),
    L('Dashboards', 'لوحات تحكم'),
    L('Custom software', 'برمجيات مخصّصة'),
    L('Integrations', 'تكامل الأنظمة'),
  ],

  trust: {
    heading: L(
      'A team you can put a||real project||on.',
      'فريق يمكنك أن توكل إليه||مشروعك البرمجي||بثقة.',
    ),
    accentLine: 1,
    blurb: L(
      'We work with businesses that need software delivered, not slides. Every number here reflects a real engagement — from a first email to the launched product that followed.',
      'نعمل مع الشركات التي تحتاج إلى تسليم منتجات برمجية فعلية، لا مجرد عروض تقديمية. كل رقم هنا يعكس مشروعًا حقيقيًا، من أول رسالة تواصل وحتى إطلاق المنتج.',
    ),
    items: [
      {
        value: '40+',
        label: L('Products delivered', 'منتجًا رقميًا تم تسليمه'),
        hint: L('across web, mobile & platform', 'بين مواقع ويب وتطبيقات ومنصات'),
      },
      {
        value: '12',
        label: L('Specialists in-team', 'متخصصًا في الفريق'),
        hint: L('development, design, ops', 'تطوير وتصميم وعمليات'),
      },
      {
        value: '9',
        label: L('Years, combined', 'سنوات خبرة مجمّعة'),
        hint: L('senior average per lead', 'متوسط أقدمية القادة الفنيين'),
      },
      {
        value: '24h',
        label: L('First response', 'أوّل ردّ خلال'),
        hint: L('weekdays, guaranteed', 'أيام العمل، بشكل مضمون'),
      },
    ],
  },

  about: {
    heading: L(
      "We're a||team||, not a freelancer with a nice logo.",
      'نحن||فريق متكامل||، لسنا مطوّرًا فرديًا بشعار جميل.',
    ),
    accentLine: 1,
    body: L(
      'PORT-4 is a small collective of software developers, designers and delivery leads working together on client projects. There is no single-person bottleneck — every engagement has a technical lead, a reviewer, and a consistent delivery rhythm.',
      'PORT-4 فريق متكامل من مطوّري البرمجيات والمصمّمين وقادة التسليم، نعمل معًا على مشاريع عملائنا. لا يعتمد أي مشروع على شخص واحد؛ لكل مشروع قائد فنّي ومراجع مستقل وإيقاع تسليم منتظم.',
    ),
    bodyTwo: L(
      'We take on a limited number of projects per quarter so the team you meet on the kickoff call is the same team that delivers your product.',
      'نلتزم بعدد محدود من المشاريع في كل ربع سنة، لنضمن أن الفريق الذي تقابله في اجتماع الانطلاق هو نفسه الفريق الذي يُطوِّر منتجك ويُسلّمه إليك.',
    ),
    bullets: [
      L('Weekly demos on a real staging URL', 'عروض أسبوعية على بيئة اختبار حقيقية'),
      L('Named development lead per project', 'قائد تطوير مُخصَّص لكل مشروع'),
      L('Design & code in the same repo', 'التصميم والكود في مستودع واحد'),
      L('You keep the source, always', 'الكود المصدري يبقى ملكك دائمًا'),
    ],
    topologyTitle: L(
      'Team topology · 12 specialists',
      'هيكل الفريق · ١٢ متخصصًا',
    ),
    topologySub: L(
      'Distributed across 3 timezones',
      'فريق موزَّع على ٣ مناطق زمنية',
    ),
    coreLabel: L('Core', 'النواة'),
    team: [
      { role: L('Frontend', 'تطوير الواجهات'), count: 4, note: L('React, Next.js, motion', 'React وNext.js وتصميم تفاعلي') },
      { role: L('Backend', 'تطوير الخلفية'), count: 3, note: L('Node, Go, Postgres', 'Node وGo وPostgres') },
      { role: L('Mobile', 'تطوير التطبيقات'), count: 2, note: L('React Native, native', 'React Native وتطوير أصلي') },
      { role: L('Design', 'تصميم المنتجات'), count: 2, note: L('Product & systems', 'واجهات وأنظمة تصميم') },
      { role: L('Ops / QA', 'العمليات والجودة'), count: 1, note: L('Cloud, reliability', 'البنية السحابية والموثوقية') },
    ],
  },

  services: {
    heading: L(
      'Everything a product needs,||under one roof.',
      'كل ما يحتاجه منتجك البرمجي،||تحت سقف واحد.',
    ),
    accentLine: -1,
    items: [
      {
        id: 'web', tag: '01',
        title: L('Web Development', 'تطوير المواقع والمنصات'),
        description: L(
          'Marketing sites, dashboards, portals and full web platforms — built on React and Next.js with a strict performance budget.',
          'مواقع تسويقية ولوحات تحكم وبوابات ومنصات ويب متكاملة، مبنية على React وNext.js مع الالتزام بمعايير أداء صارمة.',
        ),
        outcomes: [
          L('Marketing & product sites', 'مواقع تسويقية ومواقع منتجات'),
          L('Dashboards & internal tools', 'لوحات تحكم وأدوات داخلية'),
          L('Headless CMS & content sites', 'أنظمة إدارة محتوى Headless'),
        ],
        stack: ['React', 'Next.js', 'TypeScript', 'Node', 'Postgres'],
      },
      {
        id: 'mobile', tag: '02',
        title: L('Mobile App Development', 'تطوير تطبيقات الهاتف'),
        description: L(
          'iOS and Android apps that feel native, ship regular updates, and remain observable in production.',
          'تطبيقات لأجهزة iOS وأندرويد بتجربة استخدام أصلية، تصدر بتحديثات منتظمة وتظل قابلة للمراقبة في مرحلة الإنتاج.',
        ),
        outcomes: [
          L('Cross-platform apps', 'تطبيقات متعددة المنصات'),
          L('Native modules', 'وحدات أصلية عند الحاجة'),
          L('App Store & Play delivery', 'النشر على متجري App Store وGoogle Play'),
        ],
        stack: ['React Native', 'Swift', 'Kotlin', 'Expo'],
      },
      {
        id: 'backend', tag: '03',
        title: L('Backend & Platform', 'تطوير الخلفية والأنظمة'),
        description: L(
          'APIs, services, data pipelines and the reliable cloud infrastructure a real product needs.',
          'واجهات برمجية وخدمات ومسارات بيانات وبنية سحابية موثوقة يحتاجها أي منتج برمجي حقيقي.',
        ),
        outcomes: [
          L('REST & GraphQL APIs', 'واجهات REST وGraphQL'),
          L('Queues & background workers', 'قوائم انتظار ومعالجة في الخلفية'),
          L('Cloud infrastructure', 'بنية سحابية قابلة للتوسّع'),
        ],
        stack: ['Node', 'Go', 'Postgres', 'Redis', 'AWS', 'Docker'],
      },
      {
        id: 'design', tag: '04',
        title: L('UI / UX Design', 'واجهات المستخدم وتجربة المستخدم'),
        description: L(
          'Interface design that starts with the user and ends with a coherent design system your team can extend.',
          'تصميم واجهات ينطلق من احتياج المستخدم، وينتهي بنظام تصميم متماسك يستطيع فريقك تطويره لاحقًا.',
        ),
        outcomes: [
          L('UX research', 'بحث تجربة المستخدم'),
          L('UI systems', 'أنظمة واجهات'),
          L('Prototype & usability', 'نماذج أوّلية واختبار قابلية الاستخدام'),
        ],
        stack: ['Figma', 'Design tokens', 'Motion', 'Prototyping'],
      },
      {
        id: 'ecommerce', tag: '05',
        title: L('E-commerce', 'التجارة الإلكترونية'),
        description: L(
          'Fast, extensible storefronts with clean checkout flows and a back-office your content team can operate.',
          'متاجر إلكترونية سريعة وقابلة للتوسّع، بمسارات دفع نظيفة وواجهات إدارة يستطيع فريق المحتوى تشغيلها بسهولة.',
        ),
        outcomes: [
          L('Custom storefronts', 'متاجر إلكترونية مخصّصة'),
          L('Shopify & headless commerce', 'متاجر Shopify وHeadless Commerce'),
          L('Payments & subscriptions', 'أنظمة الدفع والاشتراكات'),
        ],
        stack: ['Shopify', 'Stripe', 'Sanity', 'Vercel'],
      },
      {
        id: 'custom', tag: '06',
        title: L('Custom Software', 'تطوير الأنظمة والبرمجيات المخصّصة'),
        description: L(
          'Line-of-business tools and bespoke software built to your workflow — not shoehorned into a template.',
          'أنظمة أعمال وبرمجيات مصمّمة خصيصًا لسير عملك، لا حلول جاهزة نحاول إجبار عملك على قوالبها.',
        ),
        outcomes: [
          L('Internal platforms', 'منصات داخلية'),
          L('Business automation', 'أتمتة العمليات'),
          L('Data tooling', 'أدوات إدارة البيانات'),
        ],
        stack: ['Node', 'Python', 'Postgres', 'React', 'BullMQ'],
      },
      {
        id: 'integration', tag: '07',
        title: L('API & System Integration', 'تكامل الأنظمة وواجهات API'),
        description: L(
          'We connect the systems you already run — CRMs, ERPs, payment gateways, third-party APIs — cleanly and with tests.',
          'نربط الأنظمة والخدمات التي تعتمد عليها بالفعل — من أنظمة CRM وERP وبوابات الدفع وواجهات الطرف الثالث — بطريقة نظيفة ومدعومة باختبارات.',
        ),
        outcomes: [
          L('System integrations', 'تكامل بين الأنظمة'),
          L('Data migrations', 'ترحيل البيانات'),
          L('Webhooks & events', 'خطافات ويب وأنظمة الأحداث'),
        ],
        stack: ['OpenAPI', 'gRPC', 'Kafka', 'Stripe', 'Zapier'],
      },
      {
        id: 'support', tag: '08',
        title: L('Maintenance & Support', 'الصيانة والدعم التقني'),
        description: L(
          'Long-term partnerships: monitoring, updates, roadmap sessions and an on-call channel that actually answers.',
          'شراكات طويلة الأمد تشمل المراقبة والتحديثات وجلسات خارطة الطريق وقناة دعم فعلية ترد عندما تحتاجها.',
        ),
        outcomes: [
          L('SLA-backed support', 'دعم باتفاقية مستوى خدمة'),
          L('Roadmap partnership', 'شراكة في خارطة الطريق'),
          L('Observability', 'أنظمة رصد ومراقبة'),
        ],
        stack: ['Grafana', 'Sentry', 'GitHub Actions', 'Terraform'],
      },
    ],
  },

  process: {
    heading: L(
      'A process built for||delivery||, not for slides.',
      'منهجية مبنية للـ||تسليم الفعلي||، لا للعروض التقديمية.',
    ),
    accentLine: 1,
    blurb: L(
      'Six honest stages, adapted to the size of the project. No theatre, no unnecessary rituals — just a repeatable rhythm that gets your product built and delivered.',
      'ست مراحل واضحة تتكيّف مع حجم كل مشروع. بلا استعراض ولا طقوس زائدة، فقط إيقاع منتظم يوصل منتجك من الفكرة إلى الإطلاق.',
    ),
    steps: [
      {
        id: '01',
        title: L('Discover', 'فهم المتطلبات'),
        body: L(
          'We start with your business — users, constraints, goals. No jargon, no theatre. We map exactly what the product needs to do.',
          'نبدأ بفهم عملك: المستخدمون والقيود والأهداف. بلا مصطلحات معقّدة ولا استعراض. نُحدد بدقة ما يحتاج المنتج أن يفعله.',
        ),
        tokens: [
          L('Kickoff', 'اجتماع الانطلاق'),
          L('Research', 'بحث'),
          L('Requirements', 'المتطلبات'),
          L('Success metrics', 'مقاييس النجاح'),
        ],
      },
      {
        id: '02',
        title: L('Plan', 'التخطيط'),
        body: L(
          'Technical architecture, information design, and a realistic delivery plan you can actually commit to.',
          'المعمارية التقنية، هندسة المعلومات، وخطة تسليم واقعية يمكن الالتزام بها فعليًا.',
        ),
        tokens: [
          L('Architecture', 'المعمارية'),
          L('Sitemap', 'خريطة الموقع'),
          L('Timeline', 'الجدول الزمني'),
          L('Estimates', 'التقديرات'),
        ],
      },
      {
        id: '03',
        title: L('Design', 'التصميم'),
        body: L(
          'Interface, interaction and design system — refined until every screen has a clear purpose and a considered place.',
          'الواجهات والتفاعل ونظام التصميم؛ نصقلها حتى يصبح لكل شاشة غرض واضح وموقع مدروس.',
        ),
        tokens: [
          L('Wireframes', 'مخططات أوّلية'),
          L('UI system', 'نظام الواجهات'),
          L('Prototype', 'نموذج تفاعلي'),
          L('Reviews', 'المراجعات'),
        ],
      },
      {
        id: '04',
        title: L('Develop', 'التطوير'),
        body: L(
          'Development in weekly increments with continuous deploys to a staging environment you can touch from day one.',
          'تطوير أسبوعي بإصدارات متتابعة، مع نشر مستمر على بيئة اختبار يمكنك تجربتها منذ اليوم الأول.',
        ),
        tokens: [
          L('Sprints', 'دورات تطوير'),
          L('CI/CD', 'CI/CD'),
          L('Staging', 'بيئة اختبار'),
          L('Demos', 'عروض مباشرة'),
        ],
      },
      {
        id: '05',
        title: L('Test', 'الاختبار'),
        body: L(
          'Automated tests, real-device QA, accessibility checks and performance budgets — before anything reaches production.',
          'اختبارات آلية، وضمان جودة على أجهزة حقيقية، وفحص إمكانية الوصول، والالتزام بمعايير الأداء قبل وصول المنتج إلى الإنتاج.',
        ),
        tokens: [
          L('E2E tests', 'اختبارات E2E'),
          L('QA', 'ضمان الجودة'),
          L('Accessibility', 'إمكانية الوصول'),
          L('Performance', 'الأداء'),
        ],
      },
      {
        id: '06',
        title: L('Launch', 'الإطلاق'),
        body: L(
          'Production deployment, monitoring and handover — with an optional ongoing partnership for what comes after launch.',
          'النشر على الإنتاج والمراقبة والتسليم النهائي، مع خيار شراكة مستمرة لدعم المنتج بعد الإطلاق.',
        ),
        tokens: [
          L('Release', 'الإصدار'),
          L('Monitoring', 'المراقبة'),
          L('Handover', 'التسليم'),
          L('Support', 'الدعم'),
        ],
      },
    ],
  },

  projects: {
    heading: L(
      "A few things||we're||proud of.",
      'مشاريع||نفتخر||بها.',
    ),
    accentLine: 1,
    blurb: L(
      'A cross-section of recent engagements. Every one delivered, every one measured, every one still running in production.',
      'مقتطفات من أحدث مشاريعنا. كل واحد منها تم تسليمه، وتم قياس أثره، ولا يزال يعمل في الإنتاج حتى اليوم.',
    ),
    items: [
      {
        id: 'northline', index: '01 / 06', year: '2025',
        name: L('Northline', 'نورث لاين'),
        category: L('Fintech · Web platform', 'قطاع مالي · منصة ويب'),
        summary: L(
          'Rebuilt a legacy internal operations tool into a modern web platform used by 400+ operators across four regions.',
          'أعدنا تطوير أداة عمليات داخلية قديمة إلى منصة ويب حديثة يستخدمها أكثر من ٤٠٠ موظف في أربع مناطق.',
        ),
        result: L(
          '38% faster case resolution, single sign-on across all teams.',
          'حلّ الحالات بسرعة أكبر بنسبة ٣٨٪، مع تسجيل دخول موحّد لجميع الفرق.',
        ),
        stack: ['React', 'Node', 'Postgres', 'AWS'],
      },
      {
        id: 'ember', index: '02 / 06', year: '2025',
        name: L('Ember Studio', 'إمبر ستوديو'),
        category: L('Consumer · iOS & Android', 'مستهلك · iOS وأندرويد'),
        summary: L(
          'A cross-platform mobile app for an audio-first creator community — from research through App Store launch.',
          'تطبيق هاتف متعدد المنصات لمجتمع صنّاع محتوى صوتي، من مرحلة البحث وحتى الإطلاق على المتاجر.',
        ),
        result: L(
          '4.8 App Store rating within eight weeks of launch.',
          'تقييم ٤٫٨ على متجر App Store خلال ثمانية أسابيع من الإطلاق.',
        ),
        stack: ['React Native', 'Expo', 'Node', 'GraphQL'],
      },
      {
        id: 'kiln', index: '03 / 06', year: '2024',
        name: L('Kiln Commerce', 'كيلن كوميرس'),
        category: L('E-commerce · Headless', 'تجارة إلكترونية · Headless'),
        summary: L(
          'A headless storefront and content system for an independent design brand — the content team ships without engineering.',
          'متجر إلكتروني بتقنية Headless ونظام إدارة محتوى لعلامة تصميم مستقلة، مكّن فريق المحتوى من النشر دون الحاجة إلى فريق التطوير.',
        ),
        result: L(
          '2.1× conversion, sub-1s LCP on mobile.',
          'زيادة نسبة التحويل ٢٫١ مرات، وسرعة تحميل أقل من ثانية على الهاتف.',
        ),
        stack: ['Next.js', 'Shopify', 'Sanity', 'Vercel'],
      },
      {
        id: 'atlas', index: '04 / 06', year: '2024',
        name: L('Atlas Logistics', 'أطلس لوجستيك'),
        category: L('Enterprise · Custom software', 'قطاع مؤسسي · برمجيات مخصّصة'),
        summary: L(
          'A route-planning and dispatch platform that replaced three off-the-shelf tools with one focused product.',
          'منصة لتخطيط المسارات وإدارة عمليات الإرسال، حلّت محل ثلاث أدوات جاهزة بمنتج برمجي واحد مركّز.',
        ),
        result: L(
          '~$180K/yr saved in tooling and manual dispatch time.',
          'توفير نحو ١٨٠ ألف دولار سنويًا في تكاليف الأدوات وساعات العمل اليدوي.',
        ),
        stack: ['React', 'Go', 'Postgres', 'MapLibre'],
      },
    ],
  },

  partners: {
    heading: L(
      'Collaborations that||stick around.',
      'شراكات||تدوم.',
    ),
    accentLine: 1,
    items: [
      L('Northline', 'نورث لاين'), L('Ember', 'إمبر'), L('Kiln', 'كيلن'),
      L('Atlas', 'أطلس'), L('Ferro', 'فيرو'), L('Halcyon', 'هالسيون'),
      L('Meridian', 'ميريديان'), L('Ostinato', 'أوستيناتو'), L('Reef', 'ريف'),
      L('Vault', 'فولت'), L('Quill', 'كويل'), L('Ridge', 'ريدج'),
    ],
  },

  journal: {
    heading: L(
      'Writing from the||studio.',
      'من مدوّنة||الفريق.',
    ),
    accentLine: 1,
    items: [
      {
        id: 'shipping-cadence', featured: true,
        category: L('Development', 'التطوير'),
        title: L(
          'Delivering weekly without losing the plot',
          'التسليم الأسبوعي دون أن تفقد المسار',
        ),
        excerpt: L(
          'The framework we use to keep long client engagements moving without turning every Friday into a rescue mission.',
          'المنهجية التي نتبعها لإبقاء مشاريع العملاء طويلة الأمد سائرة بانتظام، دون أن يتحوّل كل يوم جمعة إلى مهمة إنقاذ.',
        ),
        author: L('Ines A.', 'إيناس أ.'),
        date: L('Aug 2026', 'أغسطس ٢٠٢٦'),
        read: L('7 min read', 'قراءة ٧ دقائق'),
      },
      {
        id: 'design-system-lite', featured: false,
        category: L('Design', 'التصميم'),
        title: L(
          'A design system light enough to actually use',
          'نظام تصميم خفيف بما يكفي ليُستخدَم فعلًا',
        ),
        excerpt: L(
          'How we scope design systems for teams of four — not forty — and still keep them coherent as they grow.',
          'كيف نضبط نطاق أنظمة التصميم لفرق من أربعة أشخاص، لا أربعين، ونحافظ على تماسكها مع نموّها.',
        ),
        author: L('Ravi K.', 'رافي ك.'),
        date: L('Aug 2026', 'أغسطس ٢٠٢٦'),
        read: L('5 min read', 'قراءة ٥ دقائق'),
      },
      {
        id: 'boring-infra', featured: false,
        category: L('Platform', 'البنية التقنية'),
        title: L(
          'Boring infrastructure is a feature',
          'البنية التحتية المملّة ميزة، لا عيب',
        ),
        excerpt: L(
          'The five decisions that determine whether your on-call rotation is livable — regardless of stack.',
          'خمسة قرارات تحدد ما إذا كانت نوبة الاستدعاء الفني محتملة أم لا، بغضّ النظر عن التقنيات المستخدمة.',
        ),
        author: L('Mira O.', 'ميرا أ.'),
        date: L('Jul 2026', 'يوليو ٢٠٢٦'),
        read: L('6 min read', 'قراءة ٦ دقائق'),
      },
      {
        id: 'estimating', featured: false,
        category: L('Practice', 'ممارسات مهنية'),
        title: L(
          'Estimating in weeks, not story points',
          'التقدير بالأسابيع، لا بنقاط القصص',
        ),
        excerpt: L(
          'A pragmatic estimation method for agency work that respects both engineering reality and client budgets.',
          'طريقة تقدير عملية تناسب عمل الوكالات وتحترم واقع التطوير وميزانيات العملاء في الوقت نفسه.',
        ),
        author: L('Dan L.', 'دان ل.'),
        date: L('Jul 2026', 'يوليو ٢٠٢٦'),
        read: L('4 min read', 'قراءة ٤ دقائق'),
      },
    ],
  },

  contact: {
    heading: L(
      "Have a project||in mind? Let's||build it.",
      'لديك فكرة مشروع؟||لنُطوّرها||معًا.',
    ),
    accentLine: 1,
    projectTypes: [
      L('Web platform', 'منصة ويب'),
      L('Mobile app', 'تطبيق هاتف'),
      L('Backend / API', 'خلفية / واجهة API'),
      L('E-commerce', 'تجارة إلكترونية'),
      L('Design system', 'نظام تصميم'),
      L('Not sure yet', 'لم أُحدِّد بعد'),
    ],
    budgets: [
      '< $10k', '$10k – $30k', '$30k – $75k', '$75k – $150k', '$150k+',
    ],
  },

  footer: {
    aboutBlurb: L(
      'PORT-4 is a multidisciplinary software development team. We build websites, mobile apps, platforms and digital products for teams that want the work done well.',
      'PORT-4 فريق متكامل لتطوير البرمجيات. نبني مواقع الويب وتطبيقات الهاتف والمنصات والمنتجات الرقمية للفرق التي تريد إنجاز العمل باحترافية.',
    ),
  },
};

// Split a headline string on "||" into segments.
export const splitHeadline = (str) => (str || '').split('||').map((s) => s.trim());

// Convenience: pick localized value from a value that may be {en, ar} or a plain string.
export const pick = (value, lang, fallback = 'en') => {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return value;
  return value[lang] ?? value[fallback] ?? '';
};
