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
    name: "Savaitech - Desarrollo Apps GRATIS",
    description:
      "Desarrollo tu App Android, iOS o Web GRATIS a cambio del 1% de los beneficios. Si tu proyecto tiene modelo de negocio (pagos, publicidad, suscripciones), yo asumo el riesgo del desarrollo. Especializado en IA, Flutter y desarrollo móvil.",
    url: "https://savaitech.web.app",
    priceRange: "GRATIS - Revenue Share",
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
      name: "Desarrollo de Apps GRATIS - Revenue Share",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Desarrollo App GRATIS - Revenue Share",
          description:
            "Desarrollo tu aplicación Android, iOS o Web completamente GRATIS. Solo cobro el 1% de los beneficios que genere tu app. Ideal para proyectos con modelo de negocio (pagos, publicidad, suscripciones). Cero riesgo para ti.",
          price: "0",
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "0",
            priceCurrency: "EUR",
            description: "Desarrollo gratuito a cambio del 1% de beneficios futuros"
          },
          itemOffered: {
            "@type": "Service",
            name: "Desarrollo de App Gratis",
            description:
              "App Android, iOS o Web desarrollada sin coste inicial. Revenue share del 1% sobre beneficios.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Desarrollo de MVPs con IA",
            description:
              "Lanza tu producto en 4-8 semanas con inteligencia artificial integrada. Opción de desarrollo gratis con revenue share.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Desarrollo App Móvil Multiplataforma",
            description:
              "Apps para iOS y Android con Flutter/Kotlin. Código de alta calidad. Disponible modalidad gratuita.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Automatización y Web Apps",
            description:
              "Desarrollo web y automatizaciones. SvelteKit, React. Opción revenue share disponible.",
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
        name: "¿Puedo desarrollar mi app gratis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Si tu proyecto tiene un modelo de negocio definido (pagos in-app, suscripciones, publicidad, comisiones), puedo desarrollar tu app completamente GRATIS a cambio del 1% de los beneficios futuros. Es un modelo revenue share donde yo asumo el riesgo del desarrollo.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo funciona el desarrollo gratis por porcentaje?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Es simple: 1) Me presentas tu idea con su modelo de negocio, 2) Si me parece viable, desarrollo la app sin cobrarte nada, 3) Firmamos un contrato donde me corresponde el 1% de los beneficios netos que genere la app. Tú no arriesgas dinero, yo arriesgo mi tiempo.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué tipo de apps puedo crear gratis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Apps Android, iOS, Web o multiplataforma con Flutter. El requisito es que tengan un modelo de negocio claro: e-commerce, marketplace, SaaS con suscripción, apps con publicidad, servicios con comisión, etc. La app debe poder generar ingresos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto tiempo tarda desarrollar un MVP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Un MVP production-ready típicamente se desarrolla en 4-8 semanas, dependiendo de la complejidad del proyecto. Tanto en modalidad de pago como en revenue share gratuito.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué tecnologías utilizas para el desarrollo gratuito?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Las mismas que para proyectos de pago: Kotlin para Android nativo, Flutter para apps multiplataforma, SvelteKit para web, e integración de IA con Claude, GPT-4 y Gemini. Calidad profesional garantizada.",
        },
      },
      {
        "@type": "Question",
        name: "¿Todos los proyectos son aceptados para desarrollo gratis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, cada proyecto es evaluado individualmente. Necesito ver viabilidad técnica y un modelo de negocio sólido. Agenda una reunión gratuita para presentarme tu idea y te diré si encaja en el programa de desarrollo por revenue share.",
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
