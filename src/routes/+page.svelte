<script lang="ts">
  import { onMount } from "svelte";
  import ProfilePanel from "$components/sections/ProfilePanel.svelte";
  import ServicesPanel from "$components/sections/ServicesPanel.svelte";
  import SchedulingPanel from "$components/sections/SchedulingPanel.svelte";
  import Footer from "$components/sections/Footer.svelte";
  import SchemaOrg from "$lib/components/SchemaOrg.svelte";
  import { initLanguage } from "$lib/i18n/index.svelte";

  let mounted = $state(false);

  onMount(() => {
    initLanguage();
    mounted = true;
  });
</script>

<SchemaOrg />

<svelte:head>
  <!-- Primary Meta Tags - MVPs + GRATIS -->
  <title
    >Desarrollo Apps GRATIS o MVPs en 4 Semanas | Android, iOS, IA | Madrid</title
  >
  <meta
    name="description"
    content="Desarrollo de Apps Android, iOS y Web. ¿Sin presupuesto? Opción GRATIS: desarrollo tu app por 0€ a cambio del 1% de beneficios. ¿Con presupuesto? MVPs en 4-8 semanas con IA. Calidad de Tech Lead Senior. Madrid."
  />
  <meta
    name="keywords"
    content="desarrollo app gratis, crear app gratis, mvp desarrollo rapido, app android gratis, desarrollo ios gratis, hacer app sin pagar, free app development, desarrollo mvp ia, programador ia freelance, crear app precio, experto flutter, tech lead android, revenue share desarrollo, startup sin inversion, consultora software pymes"
  />
  <meta name="author" content="Sergiy Alonso Villar" />
  <meta
    name="robots"
    content="index, follow, max-image-preview:large, max-snippet:-1"
  />
  <meta
    name="google-site-verification"
    content="PI4sPdzvN-tN9FOQemg_MpKtMaGna_f4JrEDg8FvPEk"
  />
  <link rel="canonical" href="https://savaitech.web.app" />

  <!-- Hreflang for language alternates -->
  <link rel="alternate" hreflang="es" href="https://savaitech.web.app/" />
  <link rel="alternate" hreflang="en" href="https://savaitech.web.app/" />
  <link
    rel="alternate"
    hreflang="x-default"
    href="https://savaitech.web.app/"
  />

  <!-- OpenGraph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://savaitech.web.app" />
  <meta
    property="og:title"
    content="Desarrollo Apps GRATIS o MVPs Rápidos | Android, iOS, IA"
  />
  <meta
    property="og:description"
    content="Dos opciones: 1) GRATIS - Desarrollo tu app por 0€ a cambio del 1% de beneficios. 2) MVPs en 4-8 semanas con IA. Calidad de consultora, precio freelance."
  />
  <meta
    property="og:image"
    content="https://savaitech.web.app/images/og-image.png"
  />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="es_ES" />
  <meta property="og:locale:alternate" content="en_GB" />
  <meta property="og:site_name" content="Savaitech - Desarrollo Apps e IA" />

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Apps GRATIS (1% beneficios) o MVPs Rápidos | Madrid" />
  <meta
    name="twitter:description"
    content="Desarrollo apps Android/iOS/Web. Opción GRATIS por revenue share o MVPs en 4-8 semanas. Experto IA, Flutter, Kotlin."
  />
  <meta
    name="twitter:image"
    content="https://savaitech.web.app/images/og-image.png"
  />

  <!-- Material Icons -->
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
    rel="stylesheet"
  />

  <!-- Devicons for tech logos -->
  <link
    href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
    rel="stylesheet"
  />
</svelte:head>

{#if mounted}
  <div class="min-h-screen flex flex-col">
    <!-- Main content area -->
    <div class="flex-1 p-4 md:p-6 lg:p-8 pb-16">
      <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Left column: Profile (sticky on desktop) -->
        <div
          class="lg:col-span-3 lg:sticky lg:top-8 lg:self-start overscroll-none"
        >
          <ProfilePanel />
        </div>

        <!-- Center column: Services -->
        <div class="lg:col-span-6 overscroll-none">
          <ServicesPanel />
        </div>

        <!-- Right column: Scheduling (sticky on desktop) -->
        <div
          class="lg:col-span-3 lg:sticky lg:top-8 lg:self-start overscroll-none"
        >
          <SchedulingPanel />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
{/if}
