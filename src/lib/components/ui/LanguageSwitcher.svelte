<script lang="ts">
  import { getLanguage, setLanguage, type Language } from '$lib/i18n/index.svelte';

  let lang = $derived(getLanguage());

  function switchTo(newLang: Language) {
    setLanguage(newLang);
  }
</script>

<div class="flex items-center gap-1 bg-dark-800 rounded-full p-1 border border-dark-700 shadow-lg">
  <button
    class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200
      {lang === 'es'
        ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
        : 'text-dark-400 hover:text-white hover:bg-dark-700'}"
    onclick={() => switchTo('es')}
  >
    <span class="text-sm">🇪🇸</span>
    <span>ES</span>
  </button>
  <button
    class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200
      {lang === 'en'
        ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
        : 'text-dark-400 hover:text-white hover:bg-dark-700'}"
    onclick={() => switchTo('en')}
  >
    <span class="text-sm">🇬🇧</span>
    <span>EN</span>
  </button>
</div>
