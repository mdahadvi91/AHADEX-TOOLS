import type { SupportedLanguage } from '@/src/types/common';

export type TranslationKey =
  | 'brandTagline'
  | 'brandSubtext'
  | 'clientSideNotice'
  | 'home'
  | 'explore'
  | 'toolCategories'
  | 'interfaceAppearance'
  | 'language'
  | 'platformInfo'
  | 'searchPlaceholder'
  | 'backToTools'
  | 'light'
  | 'dark'
  | 'auto'
  | 'featuredTools'
  | 'featuredSubtitle'
  | 'popularTools'
  | 'popularSubtitle'
  | 'allTools'
  | 'allToolsSubtitle'
  | 'categorySectionTitle'
  | 'categorySectionSubtitle'
  | 'howItWorksTitle'
  | 'howItWorksSubtitle'
  | 'step1Title'
  | 'step1Desc'
  | 'step2Title'
  | 'step2Desc'
  | 'step3Title'
  | 'step3Desc'
  | 'trustTitle'
  | 'trustSubtitle'
  | 'trustP1Title'
  | 'trustP1Desc'
  | 'trustP2Title'
  | 'trustP2Desc'
  | 'trustP3Title'
  | 'trustP3Desc'
  | 'faqTitle'
  | 'faqSubtitle'
  | 'openTool'
  | 'comingSoon'
  | 'clientSideBadge'
  | 'freeBadge'
  | 'heroBadge'
  | 'heroTitle1'
  | 'heroTitle2'
  | 'heroDescription'
  | 'quickAccess'
  | 'footerDesc'
  | 'footerCompany'
  | 'footerLegal'
  | 'footerCategories'
  | 'allRightsReserved'
  | 'cat_pdf'
  | 'cat_image'
  | 'cat_qr'
  | 'cat_text'
  | 'cat_developer'
  | 'cat_converters'
  | 'cat_utilities'
  | 'tool_jpgToPdf_name'
  | 'tool_jpgToPdf_desc'
  | 'tool_pdfToJpg_name'
  | 'tool_pdfToJpg_desc'
  | 'tool_imageConverter_name'
  | 'tool_imageConverter_desc'
  | 'tool_imageCompressor_name'
  | 'tool_imageCompressor_desc'
  | 'tool_qrGenerator_name'
  | 'tool_qrGenerator_desc';

export const TRANSLATIONS: Record<SupportedLanguage, Record<TranslationKey, string>> = {
  en: {
    brandTagline: 'Privacy-First Free Online Utilities',
    brandSubtext: '100% Client-Side',
    clientSideNotice: 'Files never leave your browser unless explicitly synced.',
    home: 'Home',
    explore: 'Explore',
    toolCategories: 'Tool Categories',
    interfaceAppearance: 'Interface Appearance',
    language: 'Language',
    platformInfo: 'Platform Info',
    searchPlaceholder: 'Search tools (e.g. compress, pdf, qr)...',
    backToTools: 'Back to Tools',
    light: 'Light',
    dark: 'Dark',
    auto: 'Auto',
    featuredTools: 'Featured Utilities',
    featuredSubtitle: 'Essential day-to-day tools running entirely in your browser.',
    popularTools: 'Popular Tools',
    popularSubtitle: 'Most used utilities across image, document, and code workflows.',
    allTools: 'All Available Tools',
    allToolsSubtitle: 'Comprehensive suite of fast, privacy-centric utilities.',
    categorySectionTitle: 'Browse by Category',
    categorySectionSubtitle: 'Find dedicated workflows for documents, visual media, and utilities.',
    howItWorksTitle: 'How It Works',
    howItWorksSubtitle: 'Simple, transparent, client-side workflow in three easy steps.',
    step1Title: '1. Choose a Utility',
    step1Desc: 'Pick from image converters, PDF tools, QR generators, or developer utilities.',
    step2Title: '2. Process in Browser',
    step2Desc: 'Processing takes place inside your browser memory without sending data to servers.',
    step3Title: '3. Download Instantly',
    step3Desc: 'Save the processed document or image directly to your local device storage.',
    trustTitle: 'Privacy by Design',
    trustSubtitle: 'Why users trust AHADEX TOOLS for sensitive documents and files.',
    trustP1Title: 'Zero Server Uploads',
    trustP1Desc: 'All document rendering, resizing, and encoding runs in local WebAssembly and HTML5 Canvas memory.',
    trustP2Title: 'Instant Performance',
    trustP2Desc: 'No upload waiting queues or slow network hops. Tools execute directly on your device hardware.',
    trustP3Title: 'No Account Required',
    trustP3Desc: 'No email registration, tracking passwords, or paywalls. Instant access to full functionality.',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Transparent answers about privacy, limits, and browser capabilities.',
    openTool: 'Open Tool',
    comingSoon: 'Coming Soon',
    clientSideBadge: '100% Client-Side',
    freeBadge: 'Free',
    heroBadge: 'Privacy-First Online Utilities',
    heroTitle1: 'Modern Browser Utilities,',
    heroTitle2: 'Built for Privacy.',
    heroDescription:
      'Fast, secure, client-side tools for PDF conversion, image processing, and QR codes. Zero file uploads to any server.',
    quickAccess: 'Popular shortcuts:',
    footerDesc:
      'Fast, privacy-centric browser-native tools for images, PDFs, QR codes, and developer tasks. Zero file uploads required.',
    footerCompany: 'Company',
    footerLegal: 'Legal & Privacy',
    footerCategories: 'Categories',
    allRightsReserved: 'All rights reserved.',
    cat_pdf: 'PDF Tools',
    cat_image: 'Image Tools',
    cat_qr: 'QR Generator',
    cat_text: 'Text Tools',
    cat_developer: 'Developer Tools',
    cat_converters: 'Converters',
    cat_utilities: 'Utilities',
    tool_jpgToPdf_name: 'JPG to PDF',
    tool_jpgToPdf_desc: 'Convert JPG and JPEG images into clean, high-quality PDF documents.',
    tool_pdfToJpg_name: 'PDF to JPG',
    tool_pdfToJpg_desc: 'Extract PDF pages into crisp, high-resolution JPG images client-side.',
    tool_imageConverter_name: 'Image Converter',
    tool_imageConverter_desc: 'Convert between PNG, JPG, WebP, and SVG formats seamlessly.',
    tool_imageCompressor_name: 'Image Compressor',
    tool_imageCompressor_desc: 'Reduce image file sizes with precision quality retention.',
    tool_qrGenerator_name: 'QR Code Generator',
    tool_qrGenerator_desc: 'Create custom high-resolution QR codes with customizable colors.',
  },
  bn: {
    brandTagline: 'গোপনীয়তা-বান্ধব ফ্রি অনলাইন টুলস',
    brandSubtext: '১০০% ক্লায়েন্ট-সাইড',
    clientSideNotice: 'আপনার ফাইল কখনোই ব্রাউজার ছেড়ে কোনো সার্ভারে যায় না।',
    home: 'হোম',
    explore: 'এক্সপ্লোর',
    toolCategories: 'টুল ক্যাটাগরি',
    interfaceAppearance: 'অ্যাপিয়ারেন্স (থিম)',
    language: 'ভাষা নির্বাচন',
    platformInfo: 'প্ল্যাটফর্ম তথ্য',
    searchPlaceholder: 'টুল খুঁজুন (যেমন compress, pdf, qr)...',
    backToTools: 'টুল তালিকায় ফিরুন',
    light: 'লাইট',
    dark: 'ডার্ক',
    auto: 'অটো',
    featuredTools: 'নির্বাচিত ইউটিলিটিস',
    featuredSubtitle: 'প্রতিদিনের কাজের প্রয়োজনীয় টুলস যা চলে সরাসরি আপনার ব্রাউজারে।',
    popularTools: 'জনপ্রিয় টুলস',
    popularSubtitle: 'ছবি, পিডিএফ এবং কিউআর তৈরির সবচেয়ে জনপ্রিয় সমাধান।',
    allTools: 'সকল উপলভ্য টুলস',
    allToolsSubtitle: 'দ্রুত এবং শতভাগ নিরাপদ অনলাইন টুলসের সমৃদ্ধ সংগ্রহ।',
    categorySectionTitle: 'ক্যাটাগরি অনুযায়ী খুঁজুন',
    categorySectionSubtitle: 'ডকুমেন্ট ও ইমেজ প্রসেসিংয়ের ক্যাটাগরিভিত্তিক প্রয়োজনীয় টুলস।',
    howItWorksTitle: 'এটি যেভাবে কাজ করে',
    howItWorksSubtitle: 'সহজ তিনটি ধাপে কোনো ঝামেলা ছাড়াই আপনার কাজ সম্পন্ন করুন।',
    step1Title: '১. টুল নির্বাচন করুন',
    step1Desc: 'পিডিএফ, ইমেজ কনভার্টার বা কিউআর কোড জেনারেটর থেকে কাঙ্ক্ষিত টুলটি বাছুন।',
    step2Title: '২. ব্রাউজারেই প্রসেসিং',
    step2Desc: 'সার্ভারে ফাইল আপলোড না করে সরাসরি আপনার ব্রাউজারের মেমোরিতেই তাৎক্ষণিক প্রসেসিং হয়।',
    step3Title: '৩. সাথে সাথে ডাউনলোড',
    step3Desc: 'প্রসেসকৃত ফাইল সরাসরি আপনার ডিভাইসে সেভ করে নিন কোনো ওয়াটারমার্ক ছাড়া।',
    trustTitle: 'নিরাপত্তা ও শতভাগ প্রাইভেসি',
    trustSubtitle: 'কেন ব্যবহারকারীরা বিশ্বস্ততার সাথে AHADEX TOOLS ব্যবহার করেন।',
    trustP1Title: 'কোনো ফাইল আপলোড নেই',
    trustP1Desc: 'ডকুমেন্ট রূপান্তর এবং ইমেজ প্রসেসিং সরাসরি আপনার ডিভাইসে ব্রাউজার ইঞ্জিনের মাধ্যমে সম্পন্ন হয়।',
    trustP2Title: 'তাত্ক্ষণিক গতি',
    trustP2Desc: 'সার্ভার আপলোডের জন্য অপেক্ষা করতে হয় না। সরাসরি আপনার ডিভাইসের ক্ষমতায় কাজ হয়।',
    trustP3Title: 'অ্যাকাউন্ট দরকার নেই',
    trustP3Desc: 'কোনো সাইন-আপ, পাসওয়ার্ড বা হিডেন চার্জ নেই। যেকোনো সময় সম্পূর্ণ ফ্রিতে ব্যবহার করুন।',
    faqTitle: 'সাধারণ জিজ্ঞাসা (FAQ)',
    faqSubtitle: 'প্রাইভেসি, ফাইল লিমিট এবং ব্রাউজার সক্ষমতা সম্পর্কিত স্পষ্ট তথ্য।',
    openTool: 'টুল খুলুন',
    comingSoon: 'শীঘ্রই আসছে',
    clientSideBadge: '১০০% ক্লায়েন্ট-সাইড',
    freeBadge: 'ফ্রি',
    heroBadge: 'গোপনীয়তা-বান্ধব অনলাইন ইউটিলিটিস',
    heroTitle1: 'আধুনিক ব্রাউজার টুলস,',
    heroTitle2: 'নিরাপদ ও দ্রুততম।',
    heroDescription:
      'পিডিএফ রূপান্তর, ইমেজ প্রসেসিং ও কিউআর কোড তৈরির দ্রুততম প্ল্যাটফর্ম। কোনো সার্ভার আপলোড ছাড়াই ব্রাউজারেই সরাসরি ব্যবহারযোগ্য।',
    quickAccess: 'জনপ্রিয় শর্টকাট:',
    footerDesc:
      'ছবি, পিডিএফ ও কিউআর কোডের নিরাপদ ক্লায়েন্ট-সাইড অনলাইন টুলস। সম্পূর্ণ ফ্রি এবং ১০০% সুরক্ষিত।',
    footerCompany: 'কোম্পানি',
    footerLegal: 'আইনি ও পলিসি',
    footerCategories: 'ক্যাটাগরি',
    allRightsReserved: 'সর্বস্বত্ব সংরক্ষিত।',
    cat_pdf: 'পিডিএফ টুলস',
    cat_image: 'ইমেজ টুলস',
    cat_qr: 'কিউআর জেনারেটর',
    cat_text: 'টেক্সট টুলস',
    cat_developer: 'ডেভেলপার টুলস',
    cat_converters: 'কনভার্টারস',
    cat_utilities: 'ইউটিলিটিস',
    tool_jpgToPdf_name: 'জেপিজি থেকে পিডিএফ',
    tool_jpgToPdf_desc: 'জেপিজি ও জেপেগ ছবি থেকে পরিষ্কার, উচ্চমানের পিডিএফ ফাইল তৈরি করুন।',
    tool_pdfToJpg_name: 'পিডিএফ থেকে জেপিজি',
    tool_pdfToJpg_desc: 'পিডিএফ ফাইলের প্রতিটি পৃষ্ঠা আলাদা জেপিজি ইমেজে রূপান্তর করুন।',
    tool_imageConverter_name: 'ইমেজ কনভার্টার',
    tool_imageConverter_desc: 'পিএনজি, জেপিজি এবং ওয়েবপি ফরম্যাটের মধ্যে সহজে রূপান্তর করুন।',
    tool_imageCompressor_name: 'ইমেজ কম্প্রেসার',
    tool_imageCompressor_desc: 'ছবির কোয়ালিটি অক্ষুণ্ণ রেখে ফাইলের সাইজ কমিয়ে নিন।',
    tool_qrGenerator_name: 'কিউআর কোড জেনারেটর',
    tool_qrGenerator_desc: 'যেকোনো লিঙ্ক বা টেক্সটের জন্য কাস্টম কিউআর কোড তৈরি করুন।',
  },
  ar: {
    brandTagline: 'أدوات مجانية عبر الإنترنت تراعي الخصوصية',
    brandSubtext: '100% من جانب العميل',
    clientSideNotice: 'ملفاتك لا تغادر متصفحك أبداً ولا يتم رفعها إلى أي خادم.',
    home: 'الرئيسية',
    explore: 'استكشاف',
    toolCategories: 'فئات الأدوات',
    interfaceAppearance: 'مظهر الواجهة',
    language: 'اللغة',
    platformInfo: 'معلومات المنصة',
    searchPlaceholder: 'ابحث عن الأدوات (مثل pdf, compress, qr)...',
    backToTools: 'العودة إلى الأدوات',
    light: 'فاتح',
    dark: 'داكن',
    auto: 'تلقائي',
    featuredTools: 'أدوات مميزة',
    featuredSubtitle: 'أدوات يومية أساسية تعمل بالكامل داخل متصفحك.',
    popularTools: 'الأدوات الأكثر استخداماً',
    popularSubtitle: 'الأدوات الأكثر طلباً لملفات الصور والمستندات.',
    allTools: 'جميع الأدوات المتاحة',
    allToolsSubtitle: 'مجموعة شاملة من الأدوات السريعة والآمنة.',
    categorySectionTitle: 'تصفح حسب الفئة',
    categorySectionSubtitle: 'ابحث عن حلول مخصصة للمستندات والوسائط والرموز.',
    howItWorksTitle: 'كيف يعمل',
    howItWorksSubtitle: 'سير عمل بسيط وشفاف في ثلاث خطوات سهلة.',
    step1Title: '١. اختر الأداة',
    step1Desc: 'اختر من محولات الصور أو أدوات PDF أو رموز QR أو أدوات المطورين.',
    step2Title: '٢. المعالجة داخل المتصفح',
    step2Desc: 'تتم المعالجة مباشرة داخل ذاكرة متصفحك دون إرسال البيانات للخارج.',
    step3Title: '٣. تنزيل فوري',
    step3Desc: 'احفظ الملف المعالج مباشرة على جهازك دون أي قيود أو علامات مائية.',
    trustTitle: 'الخصوصية في التصميم',
    trustSubtitle: 'لماذا يثق الآلاف بـ AHADEX TOOLS لمستنداتهم وملفاتهم الحساسة.',
    trustP1Title: 'بدون رفع للملفات',
    trustP1Desc: 'تتم معالجة المستندات والصور محلياً عبر محرك المتصفح.',
    trustP2Title: 'سرعة فائقة',
    trustP2Desc: 'لا مزيد من الانتظار لرفع الملفات، الأداء يعتمد على جهازك مباشرة.',
    trustP3Title: 'لا حاجة لحساب',
    trustP3Desc: 'استخدام فوري ومجاني لجميع الميزات دون الحاجة لتسجيل حساب.',
    faqTitle: 'الأسئلة الشائعة',
    faqSubtitle: 'إجابات شفافة حول الخصوصية وحدود الملفات وإمكانيات المتصفح.',
    openTool: 'فتح الأداة',
    comingSoon: 'قريباً',
    clientSideBadge: '100% محلي',
    freeBadge: 'مجاني',
    heroBadge: 'أدوات مجانية تراعي الخصوصية',
    heroTitle1: 'أدوات متصفح حديثة،',
    heroTitle2: 'مصممة للخصوصية.',
    heroDescription:
      'أدوات سريعة وآمنة من جانب العميل لتحويل PDF ومعالجة الصور ورموز QR دون أي رفع للملفات.',
    quickAccess: 'اختصارات شائعة:',
    footerDesc:
      'أدوات متصفح سريعة وآمنة للصور وملفات PDF ورموز QR. مجانية 100% وبدون رفع ملفات.',
    footerCompany: 'الشركة',
    footerLegal: 'الشروط والخصوصية',
    footerCategories: 'الفئات',
    allRightsReserved: 'جميع الحقوق محفوظة.',
    cat_pdf: 'أدوات PDF',
    cat_image: 'أدوات الصور',
    cat_qr: 'مولد QR',
    cat_text: 'أدوات النصوص',
    cat_developer: 'أدوات المطورين',
    cat_converters: 'محولات',
    cat_utilities: 'الأدوات المساعدة',
    tool_jpgToPdf_name: 'تحويل JPG إلى PDF',
    tool_jpgToPdf_desc: 'تحويل صور JPG و JPEG إلى مستندات PDF عالية الجودة.',
    tool_pdfToJpg_name: 'تحويل PDF إلى JPG',
    tool_pdfToJpg_desc: 'استخراج صفحات PDF إلى صور JPG عالية الدقة محلياً.',
    tool_imageConverter_name: 'محول الصور',
    tool_imageConverter_desc: 'التحويل بين صيغ PNG و JPG و WebP بسلاسة.',
    tool_imageCompressor_name: 'ضغط الصور',
    tool_imageCompressor_desc: 'تقليل حجم ملفات الصور مع الحفاظ على الجودة.',
    tool_qrGenerator_name: 'مولد رمز QR',
    tool_qrGenerator_desc: 'إنشاء رموز QR مخصصة عالية الدقة مع ألوان قابلة للتعديل.',
  },
};

/**
 * Type-safe translation lookup helper.
 */
export function translate(key: TranslationKey, lang: SupportedLanguage): string {
  const langDict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return langDict[key] || TRANSLATIONS.en[key] || key;
}
