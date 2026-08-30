// All discovery-form-specific translations.
// Data stored in Redux stays as English keys — display labels swap per language.

import { useSelector } from 'react-redux';

// ---------- Chrome strings ----------
export const T = {
  en: {
    // Layout / chrome
    'chrome.brand': 'Project Brief · PORT-4',
    'chrome.discovery': 'Client Discovery',
    'chrome.secureNote': 'secure · saved as you type',
    'chrome.rail': 'PORT-4 · Client Discovery · v.01',
    'chrome.stepOf': 'Step {n} of {total}',

    // Nav buttons
    'nav.back': 'Back',
    'nav.continue': 'Continue',
    'nav.review': 'Review brief',
    'nav.backToEditing': 'Back to editing',
    'nav.confirmSubmit': 'Confirm & submit',
    'nav.submitting': 'Submitting…',

    // Progress step short names
    'step.short.0': 'Business',
    'step.short.1': 'Goals',
    'step.short.2': 'Services',
    'step.short.3': 'Experience',
    'step.short.4': 'Final Details',

    // Step titles / subtitles (split for italic accent)
    'step.title.0.a': 'Tell us about your',
    'step.title.0.b': 'business',
    'step.title.1.a': "Let's understand your",
    'step.title.1.b': 'goals',
    'step.title.2.a': 'What do you',
    'step.title.2.b': 'offer?',
    'step.title.3.a': "Let's design the",
    'step.title.3.b': 'experience',
    'step.title.4.a': 'Almost',
    'step.title.4.b': 'there',
    'step.title.review.a': 'Review your',
    'step.title.review.b': 'brief',
    'step.subtitle.0': 'Help us understand what you do and what makes your business unique.',
    'step.subtitle.1': 'What should your website achieve for your business?',
    'step.subtitle.2': 'Tell us what visitors should be able to discover or do on your website.',
    'step.subtitle.3': 'This helps us create a website that feels like your brand.',
    'step.subtitle.4': 'Give us the final details we need to build the right experience.',
    'step.subtitle.review':
      "Take a moment to look everything over. You can edit any section — nothing is submitted yet.",

    // Section eyebrows inside steps
    'group.brand': 'Brand',
    'group.brand.title': 'Your visual identity',
    'group.motion': 'Motion & Interaction',
    'group.motion.title': 'How much personality should the site have?',
    'group.content': 'Content',
    'group.content.title': 'What do you already have?',
    'group.trust': 'Trust',
    'group.trust.title': 'Why customers choose you',
    'group.contact': 'Contact',
    'group.contact.title': 'How can visitors reach you?',
    'group.final': 'Final Details',
    'group.final.title': 'A few last things',

    // ---------- STEP 01 — Business ----------
    's0.q1.label': "What's your business called?",
    's0.q1.placeholder': 'e.g. Anwar Auto Services',
    's0.q2.label': 'Which best describes your business?',
    's0.q2.otherPlaceholder': 'Tell us what type of business this is',
    's0.q3.label': 'How long have you been operating?',
    's0.q4.label': 'Where are you based?',
    's0.q4.desc':
      'City and country is enough — this helps us think about map integrations and language.',
    's0.q4.placeholder': 'e.g. Erbil, Kurdistan',
    's0.q5.label': 'Do you have multiple branches?',
    's0.q5.count': 'How many branches?',
    's0.q6.label': 'Tell us briefly about your business',
    's0.q6.desc':
      'A few sentences so we understand what you do, who you serve, and anything important about your history or personality.',
    's0.q6.placeholder':
      'Tell us what your business does, what you offer, and anything important we should know.',

    // ---------- STEP 02 — Goals ----------
    's1.q1.label': 'Why do you want a website?',
    's1.q1.desc': "Pick all that apply. This shapes the sections we plan and the tone we set.",
    's1.q1.otherPlaceholder': 'Tell us the other reason',
    's1.q2.label': 'What is the ONE most important result?',
    's1.q2.desc':
      "Just one — the outcome that matters most. This becomes your website's primary call-to-action.",
    's1.q2.otherPlaceholder': 'Describe the most important result',
    's1.q3.label': 'Who is your ideal customer?',
    's1.q3.desc': 'Pick every group you serve today or want to serve tomorrow.',
    's1.q3.otherPlaceholder': 'Describe the other audience',
    's1.q4.label': 'Paint us a picture of that customer',
    's1.q4.desc':
      'Age, lifestyle, where they live, what they care about — whatever will help us design for them.',
    's1.q4.placeholder':
      'e.g. Young families in Erbil looking for reliable, honest car servicing — they value clear pricing and no upselling.',

    // ---------- STEP 03 — Services ----------
    's2.q1.label': 'What do you offer?',
    's2.q2.label': 'Roughly how many {noun}s do you have?',
    's2.q3.label': 'Your important {noun}s',
    's2.q3.desc':
      'Add the ones that matter most. You can always add more later. Featured items get prominent placement on the site.',
    's2.q3.itemLabel': '{Noun} {n}',
    's2.q3.addLabel': 'Add another {noun}',
    's2.q3.emptyLabel': 'No {noun}s added yet — click below to start.',
    's2.q4.label': 'Should prices appear on the website?',
    's2.q5.label': 'Do you offer packages?',
    's2.q5.placeholder':
      "Describe your packages — what's included, who they're for, roughly what they cost.",
    's2.q6.label': 'Do you run special offers or discounts?',
    's2.q6.placeholder':
      'Tell us about your typical offers — seasonal sales, referral bonuses, first-visit discounts, etc.',

    // Product row (inside dynamic list)
    'product.name': 'Name',
    'product.namePlaceholder': 'e.g. Premium {noun} name',
    'product.description': 'Short description',
    'product.descriptionPlaceholder': 'One or two sentences that describe it.',
    'product.price': 'Price',
    'product.pricePlaceholder': 'e.g. $199 or from $50',
    'product.featureThis': 'Feature this',
    'product.featured': '★ Featured',
    'product.setFeatured': 'Set as featured',
    'product.image': 'Image',
    'product.imageLabel': 'Upload photo',

    // Nouns for offering type
    'noun.product': 'product',
    'noun.service': 'service',
    'noun.offering': 'offering',
    'nounCap.product': 'Product',
    'nounCap.service': 'Service',
    'nounCap.offering': 'Offering',

    // ---------- STEP 04 — Design ----------
    's3.q1.label': 'Which sections would you like?',
    's3.q1.desc': "Pick everything relevant — we'll refine this together.",
    's3.q1.otherPlaceholder': "Any other section you'd like",
    's3.q2.label': 'Which features do you need?',
    's3.q2.desc': 'Everything from a WhatsApp button to a full admin dashboard.',
    's3.q2.otherPlaceholder': 'Any other feature you have in mind',
    's3.q3.label': 'Which languages should the website support?',
    's3.q3.otherPlaceholder': 'Which other language?',
    's3.q3.rtl': 'Should Arabic use a right-to-left layout?',
    's3.q4.label': 'Do you already have a logo?',
    's3.q4.upload': 'Upload your logo (PNG or SVG preferred)',
    's3.q5.label': 'Do you have brand colors?',
    's3.q6.label': 'Choose your preferred visual style',
    's3.q6.desc': 'Pick up to five. These become the direction we work from.',
    's3.q7.label': 'What should visitors feel when they enter your website?',
    's3.q7.otherPlaceholder': 'Describe the other feeling',
    's3.q8.label': 'How much animation do you want?',
    's3.q8.desc': 'From perfectly still to fully interactive — slide to pick a level.',
    's3.q9.label': 'How important is 3D?',
    's3.q10.label': 'Which interactions do you like?',
    's3.q10.otherPlaceholder': 'Describe the other interaction',
    's3.q11.label': 'What should the site NOT feel like?',
    's3.q11.desc': 'Just as useful — tell us what to avoid.',
    's3.q11.otherPlaceholder': 'Anything else to avoid',
    's3.q12.label': 'Websites you like',
    's3.q12.desc':
      'Paste a few URLs. They help us understand your visual preferences faster than any description.',
    's3.q12.placeholder': 'https://example.com',
    's3.q12.add': 'Add another URL',

    // Color list
    'color.add': 'Add another color',

    // Level selector
    'level.label': 'Level {n}',
    'level.1': 'Simple',
    'level.2': 'Subtle',
    'level.3': 'Modern',
    'level.4': 'Highly Animated',
    'level.5': 'Experimental',
    'level.1.hint': 'Static, quiet, focused on content.',
    'level.2.hint': 'Small transitions, soft reveals.',
    'level.3.hint': 'Refined motion throughout — the current PORT-4 default.',
    'level.4.hint': 'Rich, expressive movement on scroll and hover.',
    'level.5.hint': 'Fully interactive, unconventional, motion-first.',

    // ---------- STEP 05 — Final ----------
    's4.q1.label': 'Do you already have website content?',
    's4.q2.label': 'Do you have professional photos?',
    's4.q3.label': 'Do you have videos?',
    's4.q4.label': 'What makes your business different?',
    's4.q4.placeholder':
      'The one or two things nobody else in your market does the way you do.',
    's4.q5.label': 'Why should customers choose you over a competitor?',
    's4.q5.placeholder':
      'Be honest — this becomes the argument the website makes to every visitor.',
    's4.q6.label': 'What builds customer trust?',
    's4.q6.otherPlaceholder': 'Any other trust signal we should highlight',
    's4.q7.label': 'Do you have customer reviews?',
    's4.q7.itemLabel': 'Review {n}',
    's4.q7.add': 'Add another review',
    's4.q7.customerName': 'Customer name',
    's4.q7.customerNamePlaceholder': 'Full name',
    's4.q7.rating': 'Rating',
    's4.q7.review': 'Review',
    's4.q7.reviewPlaceholder': 'Paste or type the review here.',
    's4.q8.label': 'Do you want to show your team?',
    's4.q8.itemLabel': 'Member {n}',
    's4.q8.add': 'Add another team member',
    's4.q8.name': 'Name',
    's4.q8.namePlaceholder': 'Full name',
    's4.q8.position': 'Position',
    's4.q8.positionPlaceholder': 'e.g. Founder',
    's4.q8.bio': 'Short bio',
    's4.q8.bioPlaceholder': 'A sentence or two.',
    's4.q8.photo': 'Photo',
    's4.q9.number': 'Q9',
    's4.q9.label': 'Contact channels',
    's4.q9.desc':
      'At least one of WhatsApp, phone or email is required so we can reach you.',
    's4.q9.whatsapp': 'WhatsApp',
    's4.q9.phone': 'Phone',
    's4.q9.email': 'Email',
    's4.q9.instagram': 'Instagram',
    's4.q9.facebook': 'Facebook',
    's4.q9.other': 'Other social',
    's4.q9.maps': 'Google Maps / Waze',
    's4.q9.address': 'Business address',
    's4.q9.emailPh': 'hello@yourbusiness.com',
    's4.q9.instagramPh': '@handle or full URL',
    's4.q9.facebookPh': 'Page URL',
    's4.q9.otherPh': 'TikTok, LinkedIn, etc.',
    's4.q9.mapsPh': 'Map link',
    's4.q9.addressPh': 'Street, city, country',
    's4.q10.label': 'Weekly business hours',
    's4.q10.desc':
      "Skip any day you're closed. Times shown on the site match your local timezone.",
    's4.q10.markClosed': 'Mark closed',
    's4.q10.closed': 'Closed',
    's4.q11.label': 'Assets',
    's4.q11.desc':
      'Drop any files you want us to have — logos, product photos, videos, certificates. You can send more later if needed.',
    'upload.drop': 'Drop files here',
    'upload.browse': 'or click to browse',
    'upload.body':
      'Logos, photos, videos, before/after shots, certificates — anything that helps us understand your brand.',
    'upload.single': 'Upload image',
    'upload.dropSingle': 'Drop or click to browse',
    's4.q12.label': 'What is the ONE action you want visitors to take?',
    's4.q12.desc': 'This becomes the primary call-to-action across every page.',
    's4.q12.placeholder': 'e.g. "Send us a WhatsApp message"',
    's4.q13.label': 'Three words that describe your business',
    's4.q13.desc':
      'These often end up shaping the hero, the tone, and the visual direction.',
    's4.q13.word': 'Word {n}',
    's4.q14.label': 'Anything you specifically want included?',
    's4.q14.placeholder':
      'A section, an animation, a feature — anything we should make sure to add.',
    's4.q15.label': "Anything you absolutely DON'T want?",
    's4.q15.placeholder':
      "Colors, patterns, technologies, phrases — whatever's off the table.",
    's4.q16.label': 'Anything else we should know?',
    's4.q16.placeholder':
      'Deadlines, competitors, previous attempts, internal politics — anything at all.',

    // Question chrome
    'question.optional': 'optional',
    'question.characters': '{n} / {max}',
    'checkbox.selected': '{n}/{max} selected',

    // Dynamic list chrome
    'list.remove': 'Remove',
    'list.addAnother': 'Add another',

    // ---------- REVIEW ----------
    'review.step': 'Step 0{n}',
    'review.edit': 'Edit',
    'review.notProvided': 'Not provided',
    'review.notSpecified': 'Not specified',
    'review.section.business': 'Business',
    'review.section.goals': 'Goals & Customers',
    'review.section.services': 'Products & Services',
    'review.section.design': 'Website & Design',
    'review.section.final': 'Content, Trust & Final Details',

    'review.row.name': 'Business name',
    'review.row.type': 'Type',
    'review.row.duration': 'How long operating',
    'review.row.location': 'Location',
    'review.row.branches': 'Branches',
    'review.row.branchesYes': 'Yes — {n} branch{es}',
    'review.row.description': 'Description',
    'review.row.reasons': 'Reasons for a website',
    'review.row.primary': 'Primary result',
    'review.row.audience': 'Ideal customers',
    'review.row.audienceDesc': 'Audience description',
    'review.row.offering': 'Offering type',
    'review.row.quantity': 'Approximate count',
    'review.row.items': 'Items ({n})',
    'review.row.featuredItems': 'Featured items',
    'review.row.prices': 'Show prices',
    'review.row.packages': 'Packages',
    'review.row.offers': 'Offers / discounts',
    'review.row.sections': 'Sections',
    'review.row.features': 'Features',
    'review.row.languages': 'Languages',
    'review.row.rtl': 'RTL',
    'review.row.hasLogo': 'Has logo',
    'review.row.hasLogoYes': 'Yes — {name}',
    'review.row.colors': 'Brand colors',
    'review.row.style': 'Visual style',
    'review.row.feeling': 'Desired feeling',
    'review.row.animLevel': 'Animation level',
    'review.row.animLevelValue': 'Level {n} / 5',
    'review.row.threeD': '3D importance',
    'review.row.interactions': 'Interactions',
    'review.row.avoid': 'What to avoid',
    'review.row.references': 'Reference sites',
    'review.row.content': 'Content availability',
    'review.row.photos': 'Professional photos',
    'review.row.videos': 'Videos',
    'review.row.diff': 'Differentiators',
    'review.row.adv': 'Competitive advantage',
    'review.row.trustFactors': 'Trust factors',
    'review.row.reviews': 'Customer reviews',
    'review.row.reviewCount': '{n} review{s}',
    'review.row.team': 'Team',
    'review.row.teamCount': '{n} member{s}',
    'review.row.whatsapp': 'WhatsApp',
    'review.row.phone': 'Phone',
    'review.row.email': 'Email',
    'review.row.instagram': 'Instagram',
    'review.row.facebook': 'Facebook',
    'review.row.otherSocial': 'Other social',
    'review.row.maps': 'Maps / Waze',
    'review.row.address': 'Address',
    'review.row.hours': 'Business hours',
    'review.row.hoursClosed': '{day}: Closed',
    'review.row.hoursOpen': '{day}: {open}–{close}',
    'review.row.assets': 'Assets attached',
    'review.row.primaryAction': 'Primary action',
    'review.row.keywords': 'Three keywords',
    'review.row.mustInclude': 'Must include',
    'review.row.mustAvoid': 'Must avoid',
    'review.row.notes': 'Additional notes',

    'review.submit.eyebrow': 'Ready to submit',
    'review.submit.title': 'Send your brief to the PORT-4 team',
    'review.submit.desc':
      "We'll review your project within 24 hours on weekdays and reply with next steps. Nothing here is final — we'll walk through it together on the first call.",
    'review.submit.btn': 'Submit project brief',

    // ---------- SUCCESS ----------
    'success.eyebrow': 'Brief received',
    'success.title.a': 'Project brief',
    'success.title.b': 'received.',
    'success.body':
      "Thank you{name}. We've received your project information. Our team now has everything needed to understand your requirements and begin planning your digital experience.",
    'success.next.internal.title': 'Internal review',
    'success.next.internal.body':
      'Our team reads your brief and prepares questions within one business day.',
    'success.next.call.title': 'Discovery call',
    'success.next.call.body':
      'We schedule a 30-minute call to walk through your goals and align on scope.',
    'success.next.proposal.title': 'Proposal',
    'success.next.proposal.body':
      "You'll receive a written proposal covering approach, timeline, and investment.",
    'success.submittedAt': 'Submitted · {when}',
    'success.back': 'Back to PORT-4',
    'success.startAnother': 'Start another brief',
    'success.deliver.title': 'One last step — send us your brief',
    'success.deliver.body':
      "Your brief file was automatically downloaded. Send it to us so we can review it — WhatsApp is fastest.",
    'success.deliver.liveTitle': 'Sent directly to our team',
    'success.deliver.liveBody':
      "Your brief was delivered to PORT-4 instantly — no need to send anything. A copy of the file was also saved to your device, just in case.",
    'success.deliver.sending': 'Sending your brief…',
    'success.deliver.errorTitle': 'Live delivery didn’t go through',
    'success.deliver.errorBody':
      "We couldn’t reach our live inbox, so we downloaded the brief to your device instead. Please send it to us via WhatsApp or email.",
    'success.deliver.whatsapp': 'Send via WhatsApp',
    'success.deliver.email': 'Send via email',
    'success.deliver.redownload': 'Re-download brief file',

    // ---------- VALIDATION ----------
    'v.business.name': 'Please tell us your business name so we can address it correctly.',
    'v.business.type': 'Choose the option that best describes what you do.',
    'v.business.typeOther': 'Let us know what kind of business this is.',
    'v.business.description':
      'Please share a couple of sentences about your business so we can plan properly.',
    'v.goals.reasons': 'Pick at least one reason — this shapes the whole strategy.',
    'v.goals.primaryGoal':
      'Please choose your most important result so we know what to optimize for.',
    'v.goals.targetAudience':
      'Pick at least one audience so we design for the right people.',
    'v.services.offeringType': 'Let us know if you offer products, services, or both.',
    'v.website.languages': 'Choose at least one language for the website.',
    'v.website.rtl': 'Please let us know if Arabic should use a right-to-left layout.',
    'v.final.primaryAction':
      'Please describe the single action you want visitors to take on your site.',
    'v.contact.any':
      'Please add at least one way we can reach you — WhatsApp, phone or email.',
    'v.contact.email': 'That email address does not look right — please double-check it.',
    'v.contact.phone': 'Please enter a valid phone number.',
    'v.contact.whatsapp': 'Please enter a valid WhatsApp number.',
    'v.design.reference': 'That does not look like a valid URL.',
  },

  ar: {
    'chrome.brand': 'موجز المشروع · PORT-4',
    'chrome.discovery': 'استكشاف العميل',
    'chrome.secureNote': 'آمن · محفوظ أثناء الكتابة',
    'chrome.rail': 'PORT-4 · استكشاف العميل · v.01',
    'chrome.stepOf': 'الخطوة {n} من {total}',

    'nav.back': 'رجوع',
    'nav.continue': 'متابعة',
    'nav.review': 'مراجعة الموجز',
    'nav.backToEditing': 'العودة للتحرير',
    'nav.confirmSubmit': 'تأكيد وإرسال',
    'nav.submitting': 'جارٍ الإرسال…',

    'step.short.0': 'النشاط',
    'step.short.1': 'الأهداف',
    'step.short.2': 'الخدمات',
    'step.short.3': 'التجربة',
    'step.short.4': 'التفاصيل الأخيرة',

    'step.title.0.a': 'حدّثنا عن',
    'step.title.0.b': 'نشاطك',
    'step.title.1.a': 'لنفهم',
    'step.title.1.b': 'أهدافك',
    'step.title.2.a': 'ما الذي',
    'step.title.2.b': 'تقدّمه؟',
    'step.title.3.a': 'لنصمّم',
    'step.title.3.b': 'التجربة',
    'step.title.4.a': 'اقتربنا من',
    'step.title.4.b': 'النهاية',
    'step.title.review.a': 'راجع',
    'step.title.review.b': 'موجزك',
    'step.subtitle.0': 'ساعدنا على فهم ما تفعله وما يميّز نشاطك.',
    'step.subtitle.1': 'ما الذي يجب أن يحققه موقعك لنشاطك؟',
    'step.subtitle.2': 'أخبرنا بما يجب أن يستطيع الزوار اكتشافه أو فعله على موقعك.',
    'step.subtitle.3': 'يساعدنا هذا على بناء موقع يشبه روح علامتك.',
    'step.subtitle.4': 'أعطنا التفاصيل الأخيرة اللازمة لبناء التجربة المناسبة.',
    'step.subtitle.review':
      'خذ لحظة لمراجعة كل شيء. يمكنك تعديل أي قسم — لم يُرسل شيء بعد.',

    'group.brand': 'العلامة',
    'group.brand.title': 'هويّتك البصريّة',
    'group.motion': 'الحركة والتفاعل',
    'group.motion.title': 'كم من الشخصيّة يجب أن يحمل الموقع؟',
    'group.content': 'المحتوى',
    'group.content.title': 'ما الذي لديك بالفعل؟',
    'group.trust': 'الثقة',
    'group.trust.title': 'لماذا يختارك العملاء',
    'group.contact': 'التواصل',
    'group.contact.title': 'كيف يستطيع الزوار الوصول إليك؟',
    'group.final': 'التفاصيل الأخيرة',
    'group.final.title': 'بعض النقاط الأخيرة',

    // Step 01
    's0.q1.label': 'ما اسم نشاطك التجاري؟',
    's0.q1.placeholder': 'مثال: خدمات أنور للسيارات',
    's0.q2.label': 'ما الذي يصف نشاطك أفضل؟',
    's0.q2.otherPlaceholder': 'أخبرنا بنوع نشاطك',
    's0.q3.label': 'منذ متى وأنتم تعملون؟',
    's0.q4.label': 'أين مقرّكم؟',
    's0.q4.desc':
      'اسم المدينة والدولة يكفي — يساعدنا هذا في التفكير بتكامل الخرائط واللغة.',
    's0.q4.placeholder': 'مثال: أربيل، كردستان',
    's0.q5.label': 'هل لديك عدة فروع؟',
    's0.q5.count': 'كم عدد الفروع؟',
    's0.q6.label': 'حدّثنا باختصار عن نشاطك',
    's0.q6.desc':
      'بضع جمل تشرح ما تفعله، ومن تخدم، وأي شيء مهم عن تاريخك أو شخصيّتك.',
    's0.q6.placeholder':
      'حدّثنا عمّا يقوم به نشاطك، وما الذي تقدّمه، وأي شيء مهم يجب أن نعرفه.',

    // Step 02
    's1.q1.label': 'لماذا تريد موقعاً إلكترونياً؟',
    's1.q1.desc':
      'اختر كل ما ينطبق. هذا يحدّد الأقسام التي سنخطّط لها والنبرة التي سنتبعها.',
    's1.q1.otherPlaceholder': 'أخبرنا بالسبب الآخر',
    's1.q2.label': 'ما النتيجة الأهم على الإطلاق؟',
    's1.q2.desc':
      'واحدة فقط — النتيجة الأكثر أهمّية. ستصبح هذه هي الدعوة الرئيسيّة للفعل على موقعك.',
    's1.q2.otherPlaceholder': 'صف النتيجة الأهم',
    's1.q3.label': 'من هو عميلك المثالي؟',
    's1.q3.desc': 'اختر كل فئة تخدمها اليوم أو تريد خدمتها غداً.',
    's1.q3.otherPlaceholder': 'صف الجمهور الآخر',
    's1.q4.label': 'ارسم لنا صورة عن هذا العميل',
    's1.q4.desc':
      'العمر، أسلوب الحياة، أين يعيشون، ما الذي يهمّهم — أي شيء يساعدنا على التصميم لهم.',
    's1.q4.placeholder':
      'مثال: عائلات شابّة في أربيل تبحث عن صيانة سيارات موثوقة وصادقة — تقدّر الأسعار الواضحة وعدم البيع الإضافي.',

    // Step 03
    's2.q1.label': 'ما الذي تقدّمه؟',
    's2.q2.label': 'كم عدد {noun} تقريباً؟',
    's2.q3.label': '{noun} المهمّة',
    's2.q3.desc':
      'أضف الأهم منها. يمكنك إضافة المزيد لاحقاً. تحصل العناصر المميّزة على مكان بارز في الموقع.',
    's2.q3.itemLabel': '{Noun} {n}',
    's2.q3.addLabel': 'أضف {noun} أخرى',
    's2.q3.emptyLabel': 'لم تُضف {noun} بعد — انقر بالأسفل للبدء.',
    's2.q4.label': 'هل يجب أن تظهر الأسعار على الموقع؟',
    's2.q5.label': 'هل تقدّم باقات؟',
    's2.q5.placeholder':
      'صف باقاتك — ماذا تشمل، لمن، وكم تكلّف تقريباً.',
    's2.q6.label': 'هل تقدّم عروضاً أو خصومات خاصّة؟',
    's2.q6.placeholder':
      'أخبرنا عن عروضك المعتادة — تخفيضات موسميّة، مكافآت الإحالة، خصومات الزيارة الأولى، إلخ.',

    'product.name': 'الاسم',
    'product.namePlaceholder': 'مثال: اسم {noun} مميّزة',
    'product.description': 'وصف قصير',
    'product.descriptionPlaceholder': 'جملة أو جملتان تصفها.',
    'product.price': 'السعر',
    'product.pricePlaceholder': 'مثال: 199$ أو بدءاً من 50$',
    'product.featureThis': 'مميّزة',
    'product.featured': '★ مميّزة',
    'product.setFeatured': 'اجعلها مميّزة',
    'product.image': 'الصورة',
    'product.imageLabel': 'ارفع صورة',

    'noun.product': 'منتج',
    'noun.service': 'خدمة',
    'noun.offering': 'عرض',
    'nounCap.product': 'المنتج',
    'nounCap.service': 'الخدمة',
    'nounCap.offering': 'العرض',

    // Step 04
    's3.q1.label': 'ما الأقسام التي ترغب بها؟',
    's3.q1.desc': 'اختر كل ما هو ذو صلة — سنصقل هذا معاً.',
    's3.q1.otherPlaceholder': 'أي قسم آخر تريده',
    's3.q2.label': 'ما الميزات التي تحتاجها؟',
    's3.q2.desc': 'كل شيء من زر واتساب حتى لوحة تحكم إدارية كاملة.',
    's3.q2.otherPlaceholder': 'أي ميزة أخرى تفكّر بها',
    's3.q3.label': 'ما اللغات التي يجب أن يدعمها الموقع؟',
    's3.q3.otherPlaceholder': 'ما اللغة الأخرى؟',
    's3.q3.rtl': 'هل يجب أن تستخدم العربية تخطيطاً من اليمين إلى اليسار؟',
    's3.q4.label': 'هل لديك شعار جاهز؟',
    's3.q4.upload': 'ارفع شعارك (يُفضّل PNG أو SVG)',
    's3.q5.label': 'هل لديك ألوان للعلامة؟',
    's3.q6.label': 'اختر أسلوبك البصري المفضّل',
    's3.q6.desc': 'اختر حتى خمسة. تصبح هذه هي الاتجاه الذي نعمل عليه.',
    's3.q7.label': 'ماذا يجب أن يشعر الزوار عند دخول موقعك؟',
    's3.q7.otherPlaceholder': 'صف الشعور الآخر',
    's3.q8.label': 'ما مقدار الحركة الذي تريده؟',
    's3.q8.desc': 'من الثبات التام إلى التفاعل الكامل — اسحب لاختيار المستوى.',
    's3.q9.label': 'ما أهمّية العناصر ثلاثيّة الأبعاد؟',
    's3.q10.label': 'ما التفاعلات التي تعجبك؟',
    's3.q10.otherPlaceholder': 'صف التفاعل الآخر',
    's3.q11.label': 'ما الذي يجب أن لا يشعر به الموقع؟',
    's3.q11.desc': 'مفيد بنفس القدر — أخبرنا بما يجب تجنّبه.',
    's3.q11.otherPlaceholder': 'أي شيء آخر يجب تجنّبه',
    's3.q12.label': 'مواقع تعجبك',
    's3.q12.desc':
      'الصق بعض الروابط. تساعدنا على فهم تفضيلاتك البصريّة أسرع من أي وصف.',
    's3.q12.placeholder': 'https://example.com',
    's3.q12.add': 'أضف رابطاً آخر',

    'color.add': 'أضف لوناً آخر',

    'level.label': 'المستوى {n}',
    'level.1': 'بسيط',
    'level.2': 'خفيف',
    'level.3': 'عصري',
    'level.4': 'متحرّك جداً',
    'level.5': 'تجريبي',
    'level.1.hint': 'ثابت، هادئ، مركّز على المحتوى.',
    'level.2.hint': 'انتقالات صغيرة وكشوفات هادئة.',
    'level.3.hint': 'حركة مصقولة في كل مكان — الإعداد الحالي لـ PORT-4.',
    'level.4.hint': 'حركة غنيّة ومعبّرة عند التمرير والتحويم.',
    'level.5.hint': 'تفاعليّة بالكامل، غير تقليديّة، الحركة أوّلاً.',

    // Step 05
    's4.q1.label': 'هل لديك محتوى جاهز للموقع؟',
    's4.q2.label': 'هل لديك صور احترافيّة؟',
    's4.q3.label': 'هل لديك مقاطع فيديو؟',
    's4.q4.label': 'ما الذي يجعل نشاطك مختلفاً؟',
    's4.q4.placeholder':
      'الأمر أو الأمران اللذان لا يفعلهما أحد في سوقك بالطريقة التي تفعلها بها.',
    's4.q5.label': 'لماذا يجب على العملاء اختيارك بدلاً من المنافس؟',
    's4.q5.placeholder':
      'كن صريحاً — هذه هي الحجّة التي سيقدّمها الموقع لكل زائر.',
    's4.q6.label': 'ما الذي يبني ثقة العملاء؟',
    's4.q6.otherPlaceholder': 'أي إشارة ثقة أخرى يجب أن نبرزها',
    's4.q7.label': 'هل لديك تقييمات من عملاء؟',
    's4.q7.itemLabel': 'تقييم {n}',
    's4.q7.add': 'أضف تقييماً آخر',
    's4.q7.customerName': 'اسم العميل',
    's4.q7.customerNamePlaceholder': 'الاسم الكامل',
    's4.q7.rating': 'التقييم',
    's4.q7.review': 'التقييم',
    's4.q7.reviewPlaceholder': 'الصق أو اكتب التقييم هنا.',
    's4.q8.label': 'هل تريد إظهار فريقك؟',
    's4.q8.itemLabel': 'عضو {n}',
    's4.q8.add': 'أضف عضواً آخر',
    's4.q8.name': 'الاسم',
    's4.q8.namePlaceholder': 'الاسم الكامل',
    's4.q8.position': 'المنصب',
    's4.q8.positionPlaceholder': 'مثال: المؤسّس',
    's4.q8.bio': 'نبذة قصيرة',
    's4.q8.bioPlaceholder': 'جملة أو اثنتان.',
    's4.q8.photo': 'الصورة',
    's4.q9.number': 'Q9',
    's4.q9.label': 'قنوات التواصل',
    's4.q9.desc': 'يجب توفير واحد على الأقل من واتساب أو الهاتف أو البريد.',
    's4.q9.whatsapp': 'واتساب',
    's4.q9.phone': 'الهاتف',
    's4.q9.email': 'البريد الإلكتروني',
    's4.q9.instagram': 'انستغرام',
    's4.q9.facebook': 'فيسبوك',
    's4.q9.other': 'وسيلة تواصل أخرى',
    's4.q9.maps': 'خرائط جوجل / Waze',
    's4.q9.address': 'العنوان',
    's4.q9.emailPh': 'hello@yourbusiness.com',
    's4.q9.instagramPh': '@اسم المستخدم أو الرابط الكامل',
    's4.q9.facebookPh': 'رابط الصفحة',
    's4.q9.otherPh': 'تيك توك، لينكدإن، إلخ.',
    's4.q9.mapsPh': 'رابط الخريطة',
    's4.q9.addressPh': 'الشارع، المدينة، الدولة',
    's4.q10.label': 'ساعات العمل الأسبوعيّة',
    's4.q10.desc':
      'تخطَّ أي يوم أنت مغلق فيه. الأوقات المعروضة على الموقع تطابق منطقتك الزمنيّة.',
    's4.q10.markClosed': 'مغلق',
    's4.q10.closed': 'مغلق',
    's4.q11.label': 'الملفّات',
    's4.q11.desc':
      'أفلت أي ملفّات تريد مشاركتها معنا — شعارات، صور منتجات، فيديوهات، شهادات. يمكنك إرسال المزيد لاحقاً عند الحاجة.',
    'upload.drop': 'أفلت الملفّات هنا',
    'upload.browse': 'أو انقر للتصفّح',
    'upload.body':
      'شعارات، صور، فيديوهات، لقطات قبل وبعد، شهادات — أي شيء يساعدنا على فهم علامتك.',
    'upload.single': 'ارفع صورة',
    'upload.dropSingle': 'أفلت الملف أو انقر للتصفّح',
    's4.q12.label': 'ما الفعل الأوحد الذي تريد أن يقوم به الزوار؟',
    's4.q12.desc': 'يصبح هذا هو الدعوة الرئيسيّة للفعل عبر كل صفحة.',
    's4.q12.placeholder': 'مثال: "راسلنا عبر واتساب"',
    's4.q13.label': 'ثلاث كلمات تصف نشاطك',
    's4.q13.desc': 'كثيراً ما تشكّل هذه الكلمات الصفحة الرئيسيّة والنبرة والاتجاه البصري.',
    's4.q13.word': 'كلمة {n}',
    's4.q14.label': 'أي شيء تريد بالتحديد تضمينه؟',
    's4.q14.placeholder':
      'قسم، حركة، ميزة — أي شيء يجب أن نحرص على إضافته.',
    's4.q15.label': 'أي شيء لا تريده على الإطلاق؟',
    's4.q15.placeholder':
      'ألوان، أنماط، تقنيات، عبارات — كل ما هو خارج الطاولة.',
    's4.q16.label': 'أي شيء آخر يجب أن نعرفه؟',
    's4.q16.placeholder':
      'مواعيد نهائيّة، منافسون، محاولات سابقة، تعقيدات داخليّة — أي شيء على الإطلاق.',

    'question.optional': 'اختياري',
    'question.characters': '{n} / {max}',
    'checkbox.selected': 'محدّد {n}/{max}',

    'list.remove': 'حذف',
    'list.addAnother': 'أضف آخر',

    // Review
    'review.step': 'الخطوة 0{n}',
    'review.edit': 'تعديل',
    'review.notProvided': 'لم يُقدَّم',
    'review.notSpecified': 'غير محدّد',
    'review.section.business': 'النشاط',
    'review.section.goals': 'الأهداف والعملاء',
    'review.section.services': 'المنتجات والخدمات',
    'review.section.design': 'الموقع والتصميم',
    'review.section.final': 'المحتوى والثقة والتفاصيل الأخيرة',

    'review.row.name': 'اسم النشاط',
    'review.row.type': 'النوع',
    'review.row.duration': 'مدّة العمل',
    'review.row.location': 'الموقع',
    'review.row.branches': 'الفروع',
    'review.row.branchesYes': 'نعم — {n} فرع',
    'review.row.description': 'الوصف',
    'review.row.reasons': 'أسباب إنشاء الموقع',
    'review.row.primary': 'النتيجة الأساسيّة',
    'review.row.audience': 'العملاء المثاليّون',
    'review.row.audienceDesc': 'وصف الجمهور',
    'review.row.offering': 'نوع العرض',
    'review.row.quantity': 'العدد التقريبي',
    'review.row.items': 'العناصر ({n})',
    'review.row.featuredItems': 'العناصر المميّزة',
    'review.row.prices': 'إظهار الأسعار',
    'review.row.packages': 'الباقات',
    'review.row.offers': 'العروض / الخصومات',
    'review.row.sections': 'الأقسام',
    'review.row.features': 'الميزات',
    'review.row.languages': 'اللغات',
    'review.row.rtl': 'اليمين إلى اليسار',
    'review.row.hasLogo': 'شعار',
    'review.row.hasLogoYes': 'نعم — {name}',
    'review.row.colors': 'ألوان العلامة',
    'review.row.style': 'الأسلوب البصري',
    'review.row.feeling': 'الشعور المطلوب',
    'review.row.animLevel': 'مستوى الحركة',
    'review.row.animLevelValue': 'المستوى {n} / 5',
    'review.row.threeD': 'أهمّية ثلاثيّة الأبعاد',
    'review.row.interactions': 'التفاعلات',
    'review.row.avoid': 'ما يجب تجنّبه',
    'review.row.references': 'مواقع مرجعيّة',
    'review.row.content': 'توفّر المحتوى',
    'review.row.photos': 'الصور الاحترافيّة',
    'review.row.videos': 'الفيديوهات',
    'review.row.diff': 'ما يميّزك',
    'review.row.adv': 'الميزة التنافسيّة',
    'review.row.trustFactors': 'عوامل الثقة',
    'review.row.reviews': 'تقييمات العملاء',
    'review.row.reviewCount': '{n} تقييم',
    'review.row.team': 'الفريق',
    'review.row.teamCount': '{n} عضو',
    'review.row.whatsapp': 'واتساب',
    'review.row.phone': 'الهاتف',
    'review.row.email': 'البريد',
    'review.row.instagram': 'انستغرام',
    'review.row.facebook': 'فيسبوك',
    'review.row.otherSocial': 'وسيلة تواصل أخرى',
    'review.row.maps': 'خرائط / Waze',
    'review.row.address': 'العنوان',
    'review.row.hours': 'ساعات العمل',
    'review.row.hoursClosed': '{day}: مغلق',
    'review.row.hoursOpen': '{day}: {open}–{close}',
    'review.row.assets': 'الملفّات المرفقة',
    'review.row.primaryAction': 'الفعل الرئيسي',
    'review.row.keywords': 'ثلاث كلمات',
    'review.row.mustInclude': 'يجب تضمين',
    'review.row.mustAvoid': 'يجب تجنّب',
    'review.row.notes': 'ملاحظات إضافيّة',

    'review.submit.eyebrow': 'جاهز للإرسال',
    'review.submit.title': 'أرسل موجزك إلى فريق PORT-4',
    'review.submit.desc':
      'سنراجع مشروعك خلال 24 ساعة في أيام العمل ونردّ بالخطوات التالية. لا شيء نهائي هنا — سنمرّ عليه معاً في المكالمة الأولى.',
    'review.submit.btn': 'إرسال موجز المشروع',

    // Success
    'success.eyebrow': 'تم استلام الموجز',
    'success.title.a': 'موجز المشروع',
    'success.title.b': 'تم استلامه.',
    'success.body':
      'شكراً لك{name}. لقد استلمنا معلومات مشروعك. لدى فريقنا الآن كل ما يلزم لفهم متطلّباتك والبدء بالتخطيط لتجربتك الرقميّة.',
    'success.next.internal.title': 'مراجعة داخليّة',
    'success.next.internal.body':
      'يقرأ فريقنا موجزك ويحضّر الأسئلة خلال يوم عمل واحد.',
    'success.next.call.title': 'مكالمة استكشافيّة',
    'success.next.call.body':
      'نحدّد مكالمة مدّتها 30 دقيقة لمراجعة أهدافك والاتّفاق على النطاق.',
    'success.next.proposal.title': 'العرض',
    'success.next.proposal.body':
      'ستستلم عرضاً مكتوباً يغطّي المنهجيّة والجدول الزمني والاستثمار.',
    'success.submittedAt': 'أُرسل · {when}',
    'success.back': 'العودة إلى PORT-4',
    'success.startAnother': 'ابدأ موجزاً آخر',
    'success.deliver.title': 'خطوة أخيرة — أرسل لنا موجزك',
    'success.deliver.body':
      'تم تنزيل ملف الموجز تلقائياً. أرسله لنا لنراجعه — واتساب هو الأسرع.',
    'success.deliver.liveTitle': 'وصل موجزك إلى فريقنا',
    'success.deliver.liveBody':
      'تم إرسال موجزك إلى PORT-4 مباشرة — لا حاجة لإرسال أي شيء يدوياً. حفظنا لك نسخة من الملف على جهازك للاحتياط.',
    'success.deliver.sending': 'جارٍ إرسال موجزك…',
    'success.deliver.errorTitle': 'الإرسال المباشر لم يكتمل',
    'success.deliver.errorBody':
      'لم نستطع الوصول إلى صندوقنا المباشر، فقمنا بتنزيل الموجز على جهازك بدلاً من ذلك. من فضلك أرسله لنا عبر واتساب أو البريد.',
    'success.deliver.whatsapp': 'أرسل عبر واتساب',
    'success.deliver.email': 'أرسل عبر البريد',
    'success.deliver.redownload': 'إعادة تنزيل الملف',

    // Validation
    'v.business.name': 'من فضلك أخبرنا باسم نشاطك حتى نتمكّن من مخاطبته بالشكل الصحيح.',
    'v.business.type': 'اختر الخيار الذي يصف عملك بأفضل شكل.',
    'v.business.typeOther': 'دعنا نعرف نوع هذا النشاط.',
    'v.business.description':
      'شارك جملتين عن نشاطك حتى نتمكّن من التخطيط بشكل صحيح.',
    'v.goals.reasons': 'اختر سبباً واحداً على الأقل — هذا يشكّل الاستراتيجيّة كلّها.',
    'v.goals.primaryGoal':
      'اختر النتيجة الأكثر أهمّية حتى نعرف على ماذا نحسّن.',
    'v.goals.targetAudience':
      'اختر جمهوراً واحداً على الأقل حتى نصمّم للناس المناسبين.',
    'v.services.offeringType': 'أخبرنا إن كنت تقدّم منتجات أو خدمات أو الاثنين.',
    'v.website.languages': 'اختر لغة واحدة على الأقل للموقع.',
    'v.website.rtl': 'من فضلك دعنا نعرف إن كانت العربية يجب أن تستخدم تخطيطاً من اليمين إلى اليسار.',
    'v.final.primaryAction':
      'من فضلك صف الفعل الأوحد الذي تريد أن يقوم به الزوار على موقعك.',
    'v.contact.any':
      'من فضلك أضف طريقة واحدة على الأقل للوصول إليك — واتساب أو هاتف أو بريد إلكتروني.',
    'v.contact.email': 'عنوان البريد لا يبدو صحيحاً — من فضلك تحقّق منه.',
    'v.contact.phone': 'من فضلك أدخل رقم هاتف صحيحاً.',
    'v.contact.whatsapp': 'من فضلك أدخل رقم واتساب صحيحاً.',
    'v.design.reference': 'هذا لا يبدو رابطاً صحيحاً.',
  },
};

// ---------- Option label map ----------
// Keys are the canonical English strings stored in Redux. Values contain the
// display label per language. Missing keys fall back to the key itself.
export const OPTION_LABELS = {
  // Business types
  'Restaurant / Café': { en: 'Restaurant / Café', ar: 'مطعم / مقهى' },
  'Retail / Shop': { en: 'Retail / Shop', ar: 'متجر / تجزئة' },
  'Car Services': { en: 'Car Services', ar: 'خدمات السيارات' },
  'Clinic / Medical': { en: 'Clinic / Medical', ar: 'عيادة / طبي' },
  'Beauty / Salon': { en: 'Beauty / Salon', ar: 'صالون تجميل' },
  'Real Estate': { en: 'Real Estate', ar: 'عقارات' },
  Construction: { en: 'Construction', ar: 'مقاولات وبناء' },
  Technology: { en: 'Technology', ar: 'تكنولوجيا' },
  Education: { en: 'Education', ar: 'تعليم' },
  'Fitness / Gym': { en: 'Fitness / Gym', ar: 'لياقة / نادٍ رياضي' },
  'Hotel / Hospitality': { en: 'Hotel / Hospitality', ar: 'فندق / ضيافة' },
  'Professional Services': { en: 'Professional Services', ar: 'خدمات مهنيّة' },
  'Personal Brand': { en: 'Personal Brand', ar: 'علامة شخصيّة' },
  Other: { en: 'Other', ar: 'غير ذلك' },

  // Durations
  'New / Not launched yet': { en: 'New / Not launched yet', ar: 'جديد / لم يُطلق بعد' },
  'Less than 1 year': { en: 'Less than 1 year', ar: 'أقل من سنة' },
  '1–3 years': { en: '1–3 years', ar: '1–3 سنوات' },
  '3–5 years': { en: '3–5 years', ar: '3–5 سنوات' },
  '5+ years': { en: '5+ years', ar: 'أكثر من 5 سنوات' },

  // Reasons
  'Get more customers': { en: 'Get more customers', ar: 'الحصول على عملاء أكثر' },
  'Increase sales': { en: 'Increase sales', ar: 'زيادة المبيعات' },
  'Build trust': { en: 'Build trust', ar: 'بناء الثقة' },
  'Show services': { en: 'Show services', ar: 'عرض الخدمات' },
  'Show products': { en: 'Show products', ar: 'عرض المنتجات' },
  'Receive bookings': { en: 'Receive bookings', ar: 'استقبال الحجوزات' },
  'Receive orders': { en: 'Receive orders', ar: 'استقبال الطلبات' },
  'Generate leads': { en: 'Generate leads', ar: 'توليد عملاء محتملين' },
  'Show our location': { en: 'Show our location', ar: 'عرض موقعنا' },
  'Build a professional brand': {
    en: 'Build a professional brand',
    ar: 'بناء علامة تجاريّة احترافيّة',
  },
  'Show previous work': { en: 'Show previous work', ar: 'عرض الأعمال السابقة' },
  'Compete with competitors': { en: 'Compete with competitors', ar: 'منافسة المنافسين' },

  // Primary goals
  'More calls': { en: 'More calls', ar: 'مكالمات أكثر' },
  'More WhatsApp messages': { en: 'More WhatsApp messages', ar: 'رسائل واتساب أكثر' },
  'More bookings': { en: 'More bookings', ar: 'حجوزات أكثر' },
  'More orders': { en: 'More orders', ar: 'طلبات أكثر' },
  'More store visits': { en: 'More store visits', ar: 'زيارات متجر أكثر' },
  'More online sales': { en: 'More online sales', ar: 'مبيعات إلكترونيّة أكثر' },
  'More inquiries': { en: 'More inquiries', ar: 'استفسارات أكثر' },
  'Brand awareness': { en: 'Brand awareness', ar: 'وعي بالعلامة' },

  // Audiences
  Everyone: { en: 'Everyone', ar: 'الجميع' },
  'Teenagers / Young People': { en: 'Teenagers / Young People', ar: 'المراهقون / الشباب' },
  Adults: { en: 'Adults', ar: 'البالغون' },
  Families: { en: 'Families', ar: 'العائلات' },
  Professionals: { en: 'Professionals', ar: 'المهنيّون' },
  Businesses: { en: 'Businesses', ar: 'الشركات' },
  'Luxury / High-end Customers': {
    en: 'Luxury / High-end Customers',
    ar: 'عملاء الفئة الفاخرة',
  },
  'Local Customers': { en: 'Local Customers', ar: 'العملاء المحلّيون' },
  'International Customers': { en: 'International Customers', ar: 'العملاء الدوليّون' },

  // Offering types
  Products: { en: 'Products', ar: 'منتجات' },
  Services: { en: 'Services', ar: 'خدمات' },
  Both: { en: 'Both', ar: 'كلاهما' },

  // Quantities — same numerics; only labels for "100+"
  '1–5': { en: '1–5', ar: '1–5' },
  '5–20': { en: '5–20', ar: '5–20' },
  '20–50': { en: '20–50', ar: '20–50' },
  '50–100': { en: '50–100', ar: '50–100' },
  '100+': { en: '100+', ar: '+100' },

  // Price options
  Yes: { en: 'Yes', ar: 'نعم' },
  No: { en: 'No', ar: 'لا' },
  'Only for some products/services': {
    en: 'Only for some products/services',
    ar: 'لبعض المنتجات/الخدمات فقط',
  },
  'Contact us for price': { en: 'Contact us for price', ar: 'تواصل معنا للسعر' },
  Sometimes: { en: 'Sometimes', ar: 'أحياناً' },
  'Not sure': { en: 'Not sure', ar: 'غير متأكّد' },

  // Sections
  'Hero / Landing': { en: 'Hero / Landing', ar: 'الصفحة الرئيسيّة' },
  'About Us': { en: 'About Us', ar: 'من نحن' },
  Pricing: { en: 'Pricing', ar: 'الأسعار' },
  Gallery: { en: 'Gallery', ar: 'المعرض' },
  'Before & After': { en: 'Before & After', ar: 'قبل وبعد' },
  'Projects / Portfolio': { en: 'Projects / Portfolio', ar: 'المشاريع / معرض الأعمال' },
  Testimonials: { en: 'Testimonials', ar: 'آراء العملاء' },
  Team: { en: 'Team', ar: 'الفريق' },
  FAQ: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
  'Blog / News': { en: 'Blog / News', ar: 'المدوّنة / الأخبار' },
  Contact: { en: 'Contact', ar: 'تواصل معنا' },
  'Location / Map': { en: 'Location / Map', ar: 'الموقع / الخريطة' },
  'Social Media': { en: 'Social Media', ar: 'التواصل الاجتماعي' },
  Booking: { en: 'Booking', ar: 'الحجز' },
  'Online Ordering': { en: 'Online Ordering', ar: 'الطلب الإلكتروني' },

  // Features
  'WhatsApp button': { en: 'WhatsApp button', ar: 'زر واتساب' },
  'Phone call button': { en: 'Phone call button', ar: 'زر اتصال' },
  'Contact form': { en: 'Contact form', ar: 'نموذج تواصل' },
  'Booking system': { en: 'Booking system', ar: 'نظام حجز' },
  'Appointment system': { en: 'Appointment system', ar: 'نظام مواعيد' },
  'Online ordering': { en: 'Online ordering', ar: 'طلب إلكتروني' },
  'Shopping cart': { en: 'Shopping cart', ar: 'سلّة تسوّق' },
  'Online payment': { en: 'Online payment', ar: 'دفع إلكتروني' },
  'Google Maps': { en: 'Google Maps', ar: 'خرائط جوجل' },
  'Branch selector': { en: 'Branch selector', ar: 'محدّد الفروع' },
  'Product search': { en: 'Product search', ar: 'بحث المنتجات' },
  'Product filtering': { en: 'Product filtering', ar: 'تصفية المنتجات' },
  'Customer reviews': { en: 'Customer reviews', ar: 'آراء العملاء' },
  'Instagram integration': { en: 'Instagram integration', ar: 'تكامل انستغرام' },
  Newsletter: { en: 'Newsletter', ar: 'النشرة البريديّة' },
  'Login / Register': { en: 'Login / Register', ar: 'دخول / تسجيل' },
  'Customer dashboard': { en: 'Customer dashboard', ar: 'لوحة تحكّم العميل' },
  'Admin dashboard': { en: 'Admin dashboard', ar: 'لوحة تحكّم الإدارة' },
  'Multi-language': { en: 'Multi-language', ar: 'متعدّد اللغات' },

  // Languages
  Arabic: { en: 'Arabic', ar: 'العربيّة' },
  English: { en: 'English', ar: 'الإنجليزيّة' },
  Kurdish: { en: 'Kurdish', ar: 'الكرديّة' },

  // Visual styles
  Luxury: { en: 'Luxury', ar: 'فاخر' },
  Minimal: { en: 'Minimal', ar: 'بسيط جداً' },
  Modern: { en: 'Modern', ar: 'عصري' },
  Professional: { en: 'Professional', ar: 'احترافي' },
  Corporate: { en: 'Corporate', ar: 'شركاتي' },
  Elegant: { en: 'Elegant', ar: 'أنيق' },
  Friendly: { en: 'Friendly', ar: 'ودود' },
  Energetic: { en: 'Energetic', ar: 'نابض بالحياة' },
  Bold: { en: 'Bold', ar: 'جريء' },
  Creative: { en: 'Creative', ar: 'إبداعي' },
  Futuristic: { en: 'Futuristic', ar: 'مستقبلي' },
  Premium: { en: 'Premium', ar: 'مميّز' },
  Dark: { en: 'Dark', ar: 'داكن' },
  Light: { en: 'Light', ar: 'فاتح' },
  Colorful: { en: 'Colorful', ar: 'ملوّن' },
  Simple: { en: 'Simple', ar: 'بسيط' },
  Artistic: { en: 'Artistic', ar: 'فنّي' },

  // Feelings
  Trust: { en: 'Trust', ar: 'الثقة' },
  Professionalism: { en: 'Professionalism', ar: 'الاحترافيّة' },
  Excitement: { en: 'Excitement', ar: 'الحماس' },
  Comfort: { en: 'Comfort', ar: 'الراحة' },
  Creativity: { en: 'Creativity', ar: 'الإبداع' },
  Innovation: { en: 'Innovation', ar: 'الابتكار' },
  Reliability: { en: 'Reliability', ar: 'الموثوقيّة' },
  Exclusivity: { en: 'Exclusivity', ar: 'التميّز' },

  // 3D levels
  'Not needed': { en: 'Not needed', ar: 'غير مطلوب' },
  'Small 3D elements': { en: 'Small 3D elements', ar: 'عناصر ثلاثيّة أبعاد صغيرة' },
  'Some 3D sections': { en: 'Some 3D sections', ar: 'بعض الأقسام ثلاثيّة الأبعاد' },
  'Strong 3D experience': { en: 'Strong 3D experience', ar: 'تجربة ثلاثيّة أبعاد قويّة' },
  'Full immersive 3D': { en: 'Full immersive 3D', ar: 'تجربة ثلاثيّة أبعاد كاملة' },

  // Interactions
  'Smooth scrolling': { en: 'Smooth scrolling', ar: 'تمرير سلس' },
  'Scroll animations': { en: 'Scroll animations', ar: 'حركات عند التمرير' },
  Parallax: { en: 'Parallax', ar: 'تأثير بارالاكس' },
  'Magnetic buttons': { en: 'Magnetic buttons', ar: 'أزرار مغناطيسيّة' },
  'Cursor effects': { en: 'Cursor effects', ar: 'تأثيرات المؤشّر' },
  'Text animations': { en: 'Text animations', ar: 'حركات النصّ' },
  'Image reveal animations': { en: 'Image reveal animations', ar: 'كشف الصور بحركة' },
  '3D objects': { en: '3D objects', ar: 'مجسّمات ثلاثيّة الأبعاد' },
  'Particle effects': { en: 'Particle effects', ar: 'تأثيرات جزيئات' },
  'Interactive cards': { en: 'Interactive cards', ar: 'بطاقات تفاعليّة' },
  'Page transitions': { en: 'Page transitions', ar: 'انتقالات الصفحات' },
  'Hover effects': { en: 'Hover effects', ar: 'تأثيرات التمرير' },
  'Video backgrounds': { en: 'Video backgrounds', ar: 'خلفيّات فيديو' },

  // Avoid
  'Too complicated': { en: 'Too complicated', ar: 'معقّد جداً' },
  'Too colorful': { en: 'Too colorful', ar: 'ملوّن جداً' },
  'Too corporate': { en: 'Too corporate', ar: 'شركاتي جداً' },
  'Too childish': { en: 'Too childish', ar: 'طفولي جداً' },
  'Too dark': { en: 'Too dark', ar: 'داكن جداً' },
  'Too futuristic': { en: 'Too futuristic', ar: 'مستقبلي جداً' },
  'Too animated': { en: 'Too animated', ar: 'متحرّك جداً' },
  'Too simple': { en: 'Too simple', ar: 'بسيط جداً' },

  // Content availability
  'Yes, everything': { en: 'Yes, everything', ar: 'نعم، كل شيء' },
  'Some content': { en: 'Some content', ar: 'بعض المحتوى' },
  'Only basic information': { en: 'Only basic information', ar: 'معلومات أساسيّة فقط' },
  'No, I need help creating it': {
    en: 'No, I need help creating it',
    ar: 'لا، أحتاج مساعدة في إنشائه',
  },
  Some: { en: 'Some', ar: 'البعض' },

  // Trust factors
  'Years of experience': { en: 'Years of experience', ar: 'سنوات خبرة' },
  Certifications: { en: 'Certifications', ar: 'شهادات' },
  Awards: { en: 'Awards', ar: 'جوائز' },
  'Famous clients': { en: 'Famous clients', ar: 'عملاء مشهورون' },
  'Large customer base': { en: 'Large customer base', ar: 'قاعدة عملاء كبيرة' },
  'Qualified team': { en: 'Qualified team', ar: 'فريق مؤهّل' },
  'Premium products': { en: 'Premium products', ar: 'منتجات مميّزة' },
  Warranty: { en: 'Warranty', ar: 'ضمان' },
  'Fast service': { en: 'Fast service', ar: 'خدمة سريعة' },
  'Free delivery': { en: 'Free delivery', ar: 'توصيل مجّاني' },
};

// ---------- Helpers / hooks ----------
export function optionLabel(key, lang) {
  const entry = OPTION_LABELS[key];
  if (!entry) return key;
  return entry[lang] || entry.en || key;
}

export function tr(lang, key, params) {
  const table = T[lang] || T.en;
  let s = table[key] ?? T.en[key] ?? key;
  if (params && typeof s === 'string') {
    for (const [k, v] of Object.entries(params)) {
      s = s.replaceAll(`{${k}}`, String(v));
    }
  }
  return s;
}

// Hook — translate chrome strings.
export function useDT() {
  const lang = useSelector((s) => s.i18n.lang);
  return (key, params) => tr(lang, key, params);
}

// Hook — translate a single option key.
export function useOL() {
  const lang = useSelector((s) => s.i18n.lang);
  return (key) => optionLabel(key, lang);
}

// Hook — current language.
export function useLang() {
  return useSelector((s) => s.i18n.lang);
}
