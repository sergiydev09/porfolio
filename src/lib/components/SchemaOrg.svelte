<script lang="ts">
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sergiy Alonso Villar",
    jobTitle: "Tech Lead",
    description:
      "Tech Lead especializado en desarrollo mobile, multiplataforma e IA con más de 10 años de experiencia",
    url: "https://savaitech.web.app",
    image: "https://savaitech.web.app/images/profile.jpg",
    sameAs: [
      "https://www.linkedin.com/in/sergiy-alonso-villar-31bb14146",
      "https://github.com/sergiydev09",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madrid",
      addressRegion: "Madrid",
      addressCountry: "ES",
    },
    knowsAbout: [
      "Android Development",
      "Flutter",
      "Kotlin Multiplatform",
      "Mobile App Development",
      "AI Integration",
      "Technical Leadership",
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Savaitech - Desarrollo Apps e IA",
    description:
      "Estudio de desarrollo de software especializado en Apps Móviles, Integración de IA y MVPs de alto rendimiento. Calidad de gran consultora con agilidad de freelance.",
    url: "https://savaitech.web.app",
    priceRange: "€€-€€€",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madrid",
      addressRegion: "Madrid",
      addressCountry: "ES",
    },
    areaServed: [
      { "@type": "Country", name: "España" },
      { "@type": "Place", name: "Europa" },
      { "@type": "Place", name: "Global (Remote)" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Desarrollo de Software e IA",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Desarrollo de MVPs con IA",
            description:
              "Lanza tu producto en 4-8 semanas con inteligencia artificial integrada. Precio competitivo y velocidad récord.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Desarrollo App Móvil Multiplataforma",
            description:
              "Apps para iOS y Android con Flutter/Kotlin. Código de alta calidad y rendimiento nativo.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Consultoría Técnica & CTO Fraccional",
            description:
              "Dirección técnica senior para startups y pymes que necesitan escalar su tecnología.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Integración de Inteligencia Artificial",
            description:
              "Implementación de GPT-4, Claude, Gemini y modelos locales en tus aplicaciones de negocio.",
          },
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cómo es el proceso de trabajo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El proceso tiene 4 fases: 1) Primera reunión gratuita de 30-60 min para entender tu proyecto, 2) Sesión de profundización técnica gratuita, 3) Propuesta detallada con alcance y presupuesto, 4) Implementación iterativa con demos frecuentes.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto tiempo tarda desarrollar un MVP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Un MVP production-ready típicamente se desarrolla en 4-8 semanas, dependiendo de la complejidad del proyecto.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué tecnologías utilizas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Especializado en Kotlin para Android nativo, Flutter para apps multiplataforma, Kotlin Multiplatform (KMP) para compartir lógica, e integración de IA con Claude, GPT-4 y Gemini.",
        },
      },
    ],
  };
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`}
  {@html `<script type="application/ld+json">${JSON.stringify(serviceSchema)}</script>`}
  {@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`}
</svelte:head>
