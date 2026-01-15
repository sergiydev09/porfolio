<script lang="ts">
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sergiy Alonso Villar",
    "jobTitle": "Tech Lead",
    "description": "Tech Lead especializado en desarrollo mobile, multiplataforma e IA con más de 10 años de experiencia",
    "url": "https://savaitech.web.app",
    "image": "https://savaitech.web.app/images/profile.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/sergiy-alonso-villar-31bb14146",
      "https://github.com/sergiydev09"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Madrid",
      "addressRegion": "Madrid",
      "addressCountry": "ES"
    },
    "knowsAbout": [
      "Android Development",
      "Flutter",
      "Kotlin Multiplatform",
      "Mobile App Development",
      "AI Integration",
      "Technical Leadership"
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Sergiy Alonso - Desarrollo Mobile & Tech Lead",
    "description": "Servicios de desarrollo de apps móviles, CTO fraccional y consultoría técnica en Madrid",
    "url": "https://savaitech.web.app",
    "priceRange": "€€€",
    "areaServed": [
      {"@type": "Country", "name": "España"},
      {"@type": "Place", "name": "Europa"},
      {"@type": "Place", "name": "Remote"}
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Desarrollo",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Desarrollo Android Nativo",
            "description": "Desarrollo Kotlin-first con Jetpack Compose"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Apps Flutter Multiplataforma",
            "description": "Apps elegantes para iOS y Android desde un solo código"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CTO Fraccional",
            "description": "Liderazgo técnico senior para startups y scale-ups"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Desarrollo MVP",
            "description": "MVP production-ready en 4-8 semanas"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Integración IA",
            "description": "Claude, GPT-4, Gemini y ML on-device"
          }
        }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cómo es el proceso de trabajo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El proceso tiene 4 fases: 1) Primera reunión gratuita de 30-60 min para entender tu proyecto, 2) Sesión de profundización técnica gratuita, 3) Propuesta detallada con alcance y presupuesto, 4) Implementación iterativa con demos frecuentes."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto tiempo tarda desarrollar un MVP?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Un MVP production-ready típicamente se desarrolla en 4-8 semanas, dependiendo de la complejidad del proyecto."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué tecnologías utilizas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Especializado en Kotlin para Android nativo, Flutter para apps multiplataforma, Kotlin Multiplatform (KMP) para compartir lógica, e integración de IA con Claude, GPT-4 y Gemini."
        }
      }
    ]
  };
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`}
  {@html `<script type="application/ld+json">${JSON.stringify(serviceSchema)}</script>`}
  {@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`}
</svelte:head>
