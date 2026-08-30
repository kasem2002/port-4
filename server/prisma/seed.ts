/**
 * Seeds a fresh database with the PORT-4 content that previously lived in
 * `client/src/data/defaults.js`.
 *
 * Safe to re-run: the admin and settings rows are upserted, and content
 * collections are only populated when empty, so re-seeding never clobbers
 * edits made through the dashboard.
 */

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { env } from "../src/config/env";
import { encodeJson } from "../src/utils/json";

const prisma = new PrismaClient();

/** Headlines split on "||" in the UI; the separator is stored verbatim. */

async function seedAdmin() {
  const password = await bcrypt.hash(env.seedAdminPassword, 10);
  const admin = await prisma.admin.upsert({
    where: { email: env.seedAdminEmail },
    update: {},
    create: {
      email: env.seedAdminEmail,
      password,
      name: env.seedAdminName,
      role: "admin",
    },
  });
  console.log(`  admin        ${admin.email}`);
}

async function seedSettings() {
  await prisma.siteSettings.upsert({
    where: { id: "settings" },
    update: {},
    create: {
      id: "settings",

      brandNameEn: "PORT-4",
      brandNameAr: "PORT-4",
      taglineEn: "A software development team",
      taglineAr: "فريق تطوير برمجيات",
      email: "hello@port-4.dev",
      phone: "+00 000 000 000",
      locationEn: "Remote · Distributed",
      locationAr: "فريق موزَّع · عن بُعد",

      heroHeadlineEn: "We turn ideas into||software people||can actually use.",
      heroHeadlineAr: "نحوّل الأفكار إلى||منتجات برمجية||جاهزة للاستخدام.",
      heroAccentLine: 1,
      heroSubcopyEn:
        "PORT-4 is a multidisciplinary software development team of developers and designers building websites, mobile apps, platforms and digital products for businesses, startups and organizations that want the work done properly.",
      heroSubcopyAr:
        "PORT-4 فريق متكامل لتطوير البرمجيات، يضم مطوّرين ومصمّمين نبني معًا مواقع الويب وتطبيقات الهاتف والمنصات والمنتجات الرقمية للشركات ورواد الأعمال والمؤسسات التي تبحث عن تنفيذ متقن.",
      heroTrustTitleEn: "Trusted by teams at 40+ organizations",
      heroTrustTitleAr: "موضع ثقة فرق العمل في أكثر من ٤٠ مؤسسة",
      heroTrustSubEn: "Startups, SMBs, and independent brands worldwide.",
      heroTrustSubAr: "شركات ناشئة ومؤسسات صغيرة ومتوسطة وعلامات مستقلة حول العالم.",

      trustHeadingEn: "A team you can put a||real project||on.",
      trustHeadingAr: "فريق يمكنك أن توكل إليه||مشروعك البرمجي||بثقة.",
      trustAccentLine: 1,
      trustBlurbEn:
        "We work with businesses that need software delivered, not slides. Every number here reflects a real engagement — from a first email to the launched product that followed.",
      trustBlurbAr:
        "نعمل مع الشركات التي تحتاج إلى تسليم منتجات برمجية فعلية، لا مجرد عروض تقديمية. كل رقم هنا يعكس مشروعًا حقيقيًا، من أول رسالة تواصل وحتى إطلاق المنتج.",

      aboutHeadingEn: "We're a||team||, not a freelancer with a nice logo.",
      aboutHeadingAr: "نحن||فريق متكامل||، لسنا مطوّرًا فرديًا بشعار جميل.",
      aboutAccentLine: 1,
      aboutBodyEn:
        "PORT-4 is a small collective of software developers, designers and delivery leads working together on client projects. There is no single-person bottleneck — every engagement has a technical lead, a reviewer, and a consistent delivery rhythm.",
      aboutBodyAr:
        "PORT-4 فريق متكامل من مطوّري البرمجيات والمصمّمين وقادة التسليم، نعمل معًا على مشاريع عملائنا. لا يعتمد أي مشروع على شخص واحد؛ لكل مشروع قائد فنّي ومراجع مستقل وإيقاع تسليم منتظم.",
      aboutBodyTwoEn:
        "We take on a limited number of projects per quarter so the team you meet on the kickoff call is the same team that delivers your product.",
      aboutBodyTwoAr:
        "نلتزم بعدد محدود من المشاريع في كل ربع سنة، لنضمن أن الفريق الذي تقابله في اجتماع الانطلاق هو نفسه الفريق الذي يُطوِّر منتجك ويُسلّمه إليك.",
      aboutTopologyTitleEn: "Team topology · 12 specialists",
      aboutTopologyTitleAr: "هيكل الفريق · ١٢ متخصصًا",
      aboutTopologySubEn: "Distributed across 3 timezones",
      aboutTopologySubAr: "فريق موزَّع على ٣ مناطق زمنية",
      aboutCoreLabelEn: "Core",
      aboutCoreLabelAr: "النواة",

      servicesHeadingEn: "Everything a product needs,||under one roof.",
      servicesHeadingAr: "كل ما يحتاجه منتجك البرمجي،||تحت سقف واحد.",
      servicesAccentLine: -1,

      processHeadingEn: "A process built for||delivery||, not for slides.",
      processHeadingAr: "منهجية مبنية للـ||تسليم الفعلي||، لا للعروض التقديمية.",
      processAccentLine: 1,
      processBlurbEn:
        "Six honest stages, adapted to the size of the project. No theatre, no unnecessary rituals — just a repeatable rhythm that gets your product built and delivered.",
      processBlurbAr:
        "ست مراحل واضحة تتكيّف مع حجم كل مشروع. بلا استعراض ولا طقوس زائدة، فقط إيقاع منتظم يوصل منتجك من الفكرة إلى الإطلاق.",

      projectsHeadingEn: "A few things||we're||proud of.",
      projectsHeadingAr: "مشاريع||نفتخر||بها.",
      projectsAccentLine: 1,
      projectsBlurbEn:
        "A cross-section of recent engagements. Every one delivered, every one measured, every one still running in production.",
      projectsBlurbAr:
        "مقتطفات من أحدث مشاريعنا. كل واحد منها تم تسليمه، وتم قياس أثره، ولا يزال يعمل في الإنتاج حتى اليوم.",

      partnersHeadingEn: "Collaborations that||stick around.",
      partnersHeadingAr: "شراكات||تدوم.",
      partnersAccentLine: 1,

      contactHeadingEn: "Have a project||in mind? Let's||build it.",
      contactHeadingAr: "لديك فكرة مشروع؟||لنُطوّرها||معًا.",
      contactAccentLine: 1,
      contactBlurbEn:
        "We reply to every project inquiry within 24 hours on weekdays. Tell us what you're building — we'll be honest about whether we're the right team for it.",
      contactBlurbAr:
        "نردّ على كل استفسار مشروع خلال ٢٤ ساعة في أيام العمل. أخبرنا بما تعمل على بنائه، وسنكون صريحين معك حول ما إذا كنّا الفريق المناسب لمشروعك.",
      contactFormIntroEn: "New project · brief",
      contactFormIntroAr: "مشروع جديد · موجز",
      contactFormEncryptedEn: "encrypted",
      contactFormEncryptedAr: "مُشفَّر",
      contactSubmitLabelEn: "Start your project",
      contactSubmitLabelAr: "ابدأ مشروعك",
      contactSubmitSendingEn: "Sending…",
      contactSubmitSendingAr: "جارٍ الإرسال…",
      contactPrivacyNoteEn:
        "By submitting, you agree to be contacted about your inquiry. We don't sell data, ever.",
      contactPrivacyNoteAr:
        "بإرسال هذا النموذج، أنت توافق على تواصلنا معك بشأن استفسارك. لا نبيع بياناتك مطلقًا.",
      contactSuccessMessageEn: "✓ Message received. We'll reply within one business day.",
      contactSuccessMessageAr: "✓ تم استلام رسالتك. سنرد عليك خلال يوم عمل واحد.",

      footerAboutBlurbEn:
        "PORT-4 is a multidisciplinary software development team. We build websites, mobile apps, platforms and digital products for teams that want the work done well.",
      footerAboutBlurbAr:
        "PORT-4 فريق متكامل لتطوير البرمجيات. نبني مواقع الويب وتطبيقات الهاتف والمنصات والمنتجات الرقمية للفرق التي تريد إنجاز العمل باحترافية.",
    },
  });
  console.log("  settings     seeded");
}

/** Runs `create` only when the table is empty, so edits survive a re-seed. */
async function seedIfEmpty(label: string, count: () => Promise<number>, create: () => Promise<unknown>) {
  const existing = await count();
  if (existing > 0) {
    console.log(`  ${label.padEnd(12)} skipped (${existing} rows)`);
    return;
  }
  await create();
  console.log(`  ${label.padEnd(12)} seeded`);
}

async function seedCollections() {
  await seedIfEmpty("nav", () => prisma.navItem.count(), () =>
    prisma.navItem.createMany({
      data: [
        { labelEn: "Work", labelAr: "الأعمال", href: "#projects", order: 0 },
        { labelEn: "Services", labelAr: "الخدمات", href: "#services", order: 1 },
        { labelEn: "Process", labelAr: "منهجية العمل", href: "#process", order: 2 },
        { labelEn: "About", labelAr: "من نحن", href: "#about", order: 3 },
        { labelEn: "Contact", labelAr: "تواصل معنا", href: "#contact", order: 4 },
      ],
    }),
  );

  await seedIfEmpty("social", () => prisma.socialLink.count(), () =>
    prisma.socialLink.createMany({
      data: [
        { icon: "github", labelEn: "GitHub", labelAr: "جيت هَب", href: "https://github.com/", abbr: "GH", order: 0 },
        { icon: "linkedin", labelEn: "LinkedIn", labelAr: "لينكدإن", href: "https://linkedin.com/", abbr: "IN", order: 1 },
        { icon: "x", labelEn: "X", labelAr: "إكس", href: "https://x.com/", abbr: "X", order: 2 },
        { icon: "dribbble", labelEn: "Dribbble", labelAr: "دريبل", href: "https://dribbble.com/", abbr: "DR", order: 3 },
      ],
    }),
  );

  await seedIfEmpty("marquee", () => prisma.marqueeItem.count(), () =>
    prisma.marqueeItem.createMany({
      data: [
        { textEn: "Web platforms", textAr: "منصات ويب", order: 0 },
        { textEn: "Mobile apps", textAr: "تطبيقات هاتف", order: 1 },
        { textEn: "Design systems", textAr: "أنظمة تصميم", order: 2 },
        { textEn: "APIs", textAr: "واجهات API", order: 3 },
        { textEn: "E-commerce", textAr: "تجارة إلكترونية", order: 4 },
        { textEn: "Dashboards", textAr: "لوحات تحكم", order: 5 },
        { textEn: "Custom software", textAr: "برمجيات مخصّصة", order: 6 },
        { textEn: "Integrations", textAr: "تكامل الأنظمة", order: 7 },
      ],
    }),
  );

  await seedIfEmpty("stats", () => prisma.stat.count(), () =>
    prisma.stat.createMany({
      data: [
        { value: "40+", labelEn: "Products delivered", labelAr: "منتجًا رقميًا تم تسليمه", hintEn: "across web, mobile & platform", hintAr: "بين مواقع ويب وتطبيقات ومنصات", order: 0 },
        { value: "12", labelEn: "Specialists in-team", labelAr: "متخصصًا في الفريق", hintEn: "development, design, ops", hintAr: "تطوير وتصميم وعمليات", order: 1 },
        { value: "9", labelEn: "Years, combined", labelAr: "سنوات خبرة مجمّعة", hintEn: "senior average per lead", hintAr: "متوسط أقدمية القادة الفنيين", order: 2 },
        { value: "24h", labelEn: "First response", labelAr: "أوّل ردّ خلال", hintEn: "weekdays, guaranteed", hintAr: "أيام العمل، بشكل مضمون", order: 3 },
      ],
    }),
  );

  await seedIfEmpty("aboutBullets", () => prisma.aboutBullet.count(), () =>
    prisma.aboutBullet.createMany({
      data: [
        { textEn: "Weekly demos on a real staging URL", textAr: "عروض أسبوعية على بيئة اختبار حقيقية", order: 0 },
        { textEn: "Named development lead per project", textAr: "قائد تطوير مُخصَّص لكل مشروع", order: 1 },
        { textEn: "Design & code in the same repo", textAr: "التصميم والكود في مستودع واحد", order: 2 },
        { textEn: "You keep the source, always", textAr: "الكود المصدري يبقى ملكك دائمًا", order: 3 },
      ],
    }),
  );

  await seedIfEmpty("teamRoles", () => prisma.teamRole.count(), () =>
    prisma.teamRole.createMany({
      data: [
        { roleEn: "Frontend", roleAr: "تطوير الواجهات", count: 4, noteEn: "React, Next.js, motion", noteAr: "React وNext.js وتصميم تفاعلي", order: 0 },
        { roleEn: "Backend", roleAr: "تطوير الخلفية", count: 3, noteEn: "Node, Go, Postgres", noteAr: "Node وGo وPostgres", order: 1 },
        { roleEn: "Mobile", roleAr: "تطوير التطبيقات", count: 2, noteEn: "React Native, native", noteAr: "React Native وتطوير أصلي", order: 2 },
        { roleEn: "Design", roleAr: "تصميم المنتجات", count: 2, noteEn: "Product & systems", noteAr: "واجهات وأنظمة تصميم", order: 3 },
        { roleEn: "Ops / QA", roleAr: "العمليات والجودة", count: 1, noteEn: "Cloud, reliability", noteAr: "البنية السحابية والموثوقية", order: 4 },
      ],
    }),
  );

  await seedIfEmpty("services", () => prisma.service.count(), async () => {
    const services = [
      {
        slug: "web", tag: "01",
        titleEn: "Web Development", titleAr: "تطوير المواقع والمنصات",
        descriptionEn: "Marketing sites, dashboards, portals and full web platforms — built on React and Next.js with a strict performance budget.",
        descriptionAr: "مواقع تسويقية ولوحات تحكم وبوابات ومنصات ويب متكاملة، مبنية على React وNext.js مع الالتزام بمعايير أداء صارمة.",
        outcomes: [
          { en: "Marketing & product sites", ar: "مواقع تسويقية ومواقع منتجات" },
          { en: "Dashboards & internal tools", ar: "لوحات تحكم وأدوات داخلية" },
          { en: "Headless CMS & content sites", ar: "أنظمة إدارة محتوى Headless" },
        ],
        stack: ["React", "Next.js", "TypeScript", "Node", "Postgres"],
      },
      {
        slug: "mobile", tag: "02",
        titleEn: "Mobile App Development", titleAr: "تطوير تطبيقات الهاتف",
        descriptionEn: "iOS and Android apps that feel native, ship regular updates, and remain observable in production.",
        descriptionAr: "تطبيقات لأجهزة iOS وأندرويد بتجربة استخدام أصلية، تصدر بتحديثات منتظمة وتظل قابلة للمراقبة في مرحلة الإنتاج.",
        outcomes: [
          { en: "Cross-platform apps", ar: "تطبيقات متعددة المنصات" },
          { en: "Native modules", ar: "وحدات أصلية عند الحاجة" },
          { en: "App Store & Play delivery", ar: "النشر على متجري App Store وGoogle Play" },
        ],
        stack: ["React Native", "Swift", "Kotlin", "Expo"],
      },
      {
        slug: "backend", tag: "03",
        titleEn: "Backend & Platform", titleAr: "تطوير الخلفية والأنظمة",
        descriptionEn: "APIs, services, data pipelines and the reliable cloud infrastructure a real product needs.",
        descriptionAr: "واجهات برمجية وخدمات ومسارات بيانات وبنية سحابية موثوقة يحتاجها أي منتج برمجي حقيقي.",
        outcomes: [
          { en: "REST & GraphQL APIs", ar: "واجهات REST وGraphQL" },
          { en: "Queues & background workers", ar: "قوائم انتظار ومعالجة في الخلفية" },
          { en: "Cloud infrastructure", ar: "بنية سحابية قابلة للتوسّع" },
        ],
        stack: ["Node", "Go", "Postgres", "Redis", "AWS", "Docker"],
      },
      {
        slug: "design", tag: "04",
        titleEn: "UI / UX Design", titleAr: "واجهات المستخدم وتجربة المستخدم",
        descriptionEn: "Interface design that starts with the user and ends with a coherent design system your team can extend.",
        descriptionAr: "تصميم واجهات ينطلق من احتياج المستخدم، وينتهي بنظام تصميم متماسك يستطيع فريقك تطويره لاحقًا.",
        outcomes: [
          { en: "UX research", ar: "بحث تجربة المستخدم" },
          { en: "UI systems", ar: "أنظمة واجهات" },
          { en: "Prototype & usability", ar: "نماذج أوّلية واختبار قابلية الاستخدام" },
        ],
        stack: ["Figma", "Design tokens", "Motion", "Prototyping"],
      },
      {
        slug: "ecommerce", tag: "05",
        titleEn: "E-commerce", titleAr: "التجارة الإلكترونية",
        descriptionEn: "Fast, extensible storefronts with clean checkout flows and a back-office your content team can operate.",
        descriptionAr: "متاجر إلكترونية سريعة وقابلة للتوسّع، بمسارات دفع نظيفة وواجهات إدارة يستطيع فريق المحتوى تشغيلها بسهولة.",
        outcomes: [
          { en: "Custom storefronts", ar: "متاجر إلكترونية مخصّصة" },
          { en: "Shopify & headless commerce", ar: "متاجر Shopify وHeadless Commerce" },
          { en: "Payments & subscriptions", ar: "أنظمة الدفع والاشتراكات" },
        ],
        stack: ["Shopify", "Stripe", "Sanity", "Vercel"],
      },
      {
        slug: "custom", tag: "06",
        titleEn: "Custom Software", titleAr: "تطوير الأنظمة والبرمجيات المخصّصة",
        descriptionEn: "Line-of-business tools and bespoke software built to your workflow — not shoehorned into a template.",
        descriptionAr: "أنظمة أعمال وبرمجيات مصمّمة خصيصًا لسير عملك، لا حلول جاهزة نحاول إجبار عملك على قوالبها.",
        outcomes: [
          { en: "Internal platforms", ar: "منصات داخلية" },
          { en: "Business automation", ar: "أتمتة العمليات" },
          { en: "Data tooling", ar: "أدوات إدارة البيانات" },
        ],
        stack: ["Node", "Python", "Postgres", "React", "BullMQ"],
      },
      {
        slug: "integration", tag: "07",
        titleEn: "API & System Integration", titleAr: "تكامل الأنظمة وواجهات API",
        descriptionEn: "We connect the systems you already run — CRMs, ERPs, payment gateways, third-party APIs — cleanly and with tests.",
        descriptionAr: "نربط الأنظمة والخدمات التي تعتمد عليها بالفعل — من أنظمة CRM وERP وبوابات الدفع وواجهات الطرف الثالث — بطريقة نظيفة ومدعومة باختبارات.",
        outcomes: [
          { en: "System integrations", ar: "تكامل بين الأنظمة" },
          { en: "Data migrations", ar: "ترحيل البيانات" },
          { en: "Webhooks & events", ar: "خطافات ويب وأنظمة الأحداث" },
        ],
        stack: ["OpenAPI", "gRPC", "Kafka", "Stripe", "Zapier"],
      },
      {
        slug: "support", tag: "08",
        titleEn: "Maintenance & Support", titleAr: "الصيانة والدعم التقني",
        descriptionEn: "Long-term partnerships: monitoring, updates, roadmap sessions and an on-call channel that actually answers.",
        descriptionAr: "شراكات طويلة الأمد تشمل المراقبة والتحديثات وجلسات خارطة الطريق وقناة دعم فعلية ترد عندما تحتاجها.",
        outcomes: [
          { en: "SLA-backed support", ar: "دعم باتفاقية مستوى خدمة" },
          { en: "Roadmap partnership", ar: "شراكة في خارطة الطريق" },
          { en: "Observability", ar: "أنظمة رصد ومراقبة" },
        ],
        stack: ["Grafana", "Sentry", "GitHub Actions", "Terraform"],
      },
    ];

    for (const [index, s] of services.entries()) {
      await prisma.service.create({
        data: { ...s, outcomes: encodeJson(s.outcomes), stack: encodeJson(s.stack), order: index },
      });
    }
  });

  await seedIfEmpty("process", () => prisma.processStep.count(), async () => {
    const steps = [
      {
        stepId: "01", titleEn: "Discover", titleAr: "فهم المتطلبات",
        bodyEn: "We start with your business — users, constraints, goals. No jargon, no theatre. We map exactly what the product needs to do.",
        bodyAr: "نبدأ بفهم عملك: المستخدمون والقيود والأهداف. بلا مصطلحات معقّدة ولا استعراض. نُحدد بدقة ما يحتاج المنتج أن يفعله.",
        tokens: [
          { en: "Kickoff", ar: "اجتماع الانطلاق" },
          { en: "Research", ar: "بحث" },
          { en: "Requirements", ar: "المتطلبات" },
          { en: "Success metrics", ar: "مقاييس النجاح" },
        ],
      },
      {
        stepId: "02", titleEn: "Plan", titleAr: "التخطيط",
        bodyEn: "Technical architecture, information design, and a realistic delivery plan you can actually commit to.",
        bodyAr: "المعمارية التقنية، هندسة المعلومات، وخطة تسليم واقعية يمكن الالتزام بها فعليًا.",
        tokens: [
          { en: "Architecture", ar: "المعمارية" },
          { en: "Sitemap", ar: "خريطة الموقع" },
          { en: "Timeline", ar: "الجدول الزمني" },
          { en: "Estimates", ar: "التقديرات" },
        ],
      },
      {
        stepId: "03", titleEn: "Design", titleAr: "التصميم",
        bodyEn: "Interface, interaction and design system — refined until every screen has a clear purpose and a considered place.",
        bodyAr: "الواجهات والتفاعل ونظام التصميم؛ نصقلها حتى يصبح لكل شاشة غرض واضح وموقع مدروس.",
        tokens: [
          { en: "Wireframes", ar: "مخططات أوّلية" },
          { en: "UI system", ar: "نظام الواجهات" },
          { en: "Prototype", ar: "نموذج تفاعلي" },
          { en: "Reviews", ar: "المراجعات" },
        ],
      },
      {
        stepId: "04", titleEn: "Develop", titleAr: "التطوير",
        bodyEn: "Development in weekly increments with continuous deploys to a staging environment you can touch from day one.",
        bodyAr: "تطوير أسبوعي بإصدارات متتابعة، مع نشر مستمر على بيئة اختبار يمكنك تجربتها منذ اليوم الأول.",
        tokens: [
          { en: "Sprints", ar: "دورات تطوير" },
          { en: "CI/CD", ar: "CI/CD" },
          { en: "Staging", ar: "بيئة اختبار" },
          { en: "Demos", ar: "عروض مباشرة" },
        ],
      },
      {
        stepId: "05", titleEn: "Test", titleAr: "الاختبار",
        bodyEn: "Automated tests, real-device QA, accessibility checks and performance budgets — before anything reaches production.",
        bodyAr: "اختبارات آلية، وضمان جودة على أجهزة حقيقية، وفحص إمكانية الوصول، والالتزام بمعايير الأداء قبل وصول المنتج إلى الإنتاج.",
        tokens: [
          { en: "E2E tests", ar: "اختبارات E2E" },
          { en: "QA", ar: "ضمان الجودة" },
          { en: "Accessibility", ar: "إمكانية الوصول" },
          { en: "Performance", ar: "الأداء" },
        ],
      },
      {
        stepId: "06", titleEn: "Launch", titleAr: "الإطلاق",
        bodyEn: "Production deployment, monitoring and handover — with an optional ongoing partnership for what comes after launch.",
        bodyAr: "النشر على الإنتاج والمراقبة والتسليم النهائي، مع خيار شراكة مستمرة لدعم المنتج بعد الإطلاق.",
        tokens: [
          { en: "Release", ar: "الإصدار" },
          { en: "Monitoring", ar: "المراقبة" },
          { en: "Handover", ar: "التسليم" },
          { en: "Support", ar: "الدعم" },
        ],
      },
    ];

    for (const [index, s] of steps.entries()) {
      await prisma.processStep.create({
        data: { ...s, tokens: encodeJson(s.tokens), order: index },
      });
    }
  });

  await seedIfEmpty("projects", () => prisma.project.count(), async () => {
    const projects = [
      {
        slug: "northline", indexLabel: "01 / 06", year: "2025",
        nameEn: "Northline", nameAr: "نورث لاين",
        categoryEn: "Fintech · Web platform", categoryAr: "قطاع مالي · منصة ويب",
        summaryEn: "Rebuilt a legacy internal operations tool into a modern web platform used by 400+ operators across four regions.",
        summaryAr: "أعدنا تطوير أداة عمليات داخلية قديمة إلى منصة ويب حديثة يستخدمها أكثر من ٤٠٠ موظف في أربع مناطق.",
        resultEn: "38% faster case resolution, single sign-on across all teams.",
        resultAr: "حلّ الحالات بسرعة أكبر بنسبة ٣٨٪، مع تسجيل دخول موحّد لجميع الفرق.",
        stack: ["React", "Node", "Postgres", "AWS"],
      },
      {
        slug: "ember", indexLabel: "02 / 06", year: "2025",
        nameEn: "Ember Studio", nameAr: "إمبر ستوديو",
        categoryEn: "Consumer · iOS & Android", categoryAr: "مستهلك · iOS وأندرويد",
        summaryEn: "A cross-platform mobile app for an audio-first creator community — from research through App Store launch.",
        summaryAr: "تطبيق هاتف متعدد المنصات لمجتمع صنّاع محتوى صوتي، من مرحلة البحث وحتى الإطلاق على المتاجر.",
        resultEn: "4.8 App Store rating within eight weeks of launch.",
        resultAr: "تقييم ٤٫٨ على متجر App Store خلال ثمانية أسابيع من الإطلاق.",
        stack: ["React Native", "Expo", "Node", "GraphQL"],
      },
      {
        slug: "kiln", indexLabel: "03 / 06", year: "2024",
        nameEn: "Kiln Commerce", nameAr: "كيلن كوميرس",
        categoryEn: "E-commerce · Headless", categoryAr: "تجارة إلكترونية · Headless",
        summaryEn: "A headless storefront and content system for an independent design brand — the content team ships without engineering.",
        summaryAr: "متجر إلكتروني بتقنية Headless ونظام إدارة محتوى لعلامة تصميم مستقلة، مكّن فريق المحتوى من النشر دون الحاجة إلى فريق التطوير.",
        resultEn: "2.1× conversion, sub-1s LCP on mobile.",
        resultAr: "زيادة نسبة التحويل ٢٫١ مرات، وسرعة تحميل أقل من ثانية على الهاتف.",
        stack: ["Next.js", "Shopify", "Sanity", "Vercel"],
      },
      {
        slug: "atlas", indexLabel: "04 / 06", year: "2024",
        nameEn: "Atlas Logistics", nameAr: "أطلس لوجستيك",
        categoryEn: "Enterprise · Custom software", categoryAr: "قطاع مؤسسي · برمجيات مخصّصة",
        summaryEn: "A route-planning and dispatch platform that replaced three off-the-shelf tools with one focused product.",
        summaryAr: "منصة لتخطيط المسارات وإدارة عمليات الإرسال، حلّت محل ثلاث أدوات جاهزة بمنتج برمجي واحد مركّز.",
        resultEn: "~$180K/yr saved in tooling and manual dispatch time.",
        resultAr: "توفير نحو ١٨٠ ألف دولار سنويًا في تكاليف الأدوات وساعات العمل اليدوي.",
        stack: ["React", "Go", "Postgres", "MapLibre"],
      },
    ];

    for (const [index, p] of projects.entries()) {
      await prisma.project.create({
        data: { ...p, stack: encodeJson(p.stack), order: index },
      });
    }
  });

  await seedIfEmpty("partners", () => prisma.partner.count(), () =>
    prisma.partner.createMany({
      data: [
        { nameEn: "Northline", nameAr: "نورث لاين", order: 0 },
        { nameEn: "Ember", nameAr: "إمبر", order: 1 },
        { nameEn: "Kiln", nameAr: "كيلن", order: 2 },
        { nameEn: "Atlas", nameAr: "أطلس", order: 3 },
        { nameEn: "Ferro", nameAr: "فيرو", order: 4 },
        { nameEn: "Halcyon", nameAr: "هالسيون", order: 5 },
        { nameEn: "Meridian", nameAr: "ميريديان", order: 6 },
        { nameEn: "Ostinato", nameAr: "أوستيناتو", order: 7 },
        { nameEn: "Reef", nameAr: "ريف", order: 8 },
        { nameEn: "Vault", nameAr: "فولت", order: 9 },
        { nameEn: "Quill", nameAr: "كويل", order: 10 },
        { nameEn: "Ridge", nameAr: "ريدج", order: 11 },
      ],
    }),
  );

  await seedIfEmpty("projectTypes", () => prisma.projectType.count(), () =>
    prisma.projectType.createMany({
      data: [
        { labelEn: "Web platform", labelAr: "منصة ويب", order: 0 },
        { labelEn: "Mobile app", labelAr: "تطبيق هاتف", order: 1 },
        { labelEn: "Backend / API", labelAr: "خلفية / واجهة API", order: 2 },
        { labelEn: "E-commerce", labelAr: "تجارة إلكترونية", order: 3 },
        { labelEn: "Design system", labelAr: "نظام تصميم", order: 4 },
        { labelEn: "Not sure yet", labelAr: "لم أُحدِّد بعد", order: 5 },
      ],
    }),
  );

  await seedIfEmpty("budgets", () => prisma.budgetRange.count(), () =>
    prisma.budgetRange.createMany({
      data: [
        { label: "< $10k", order: 0 },
        { label: "$10k – $30k", order: 1 },
        { label: "$30k – $75k", order: 2 },
        { label: "$75k – $150k", order: 3 },
        { label: "$150k+", order: 4 },
      ],
    }),
  );
}

async function main() {
  console.log("Seeding PORT-4 …");
  await seedAdmin();
  await seedSettings();
  await seedCollections();
  console.log("Done.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
