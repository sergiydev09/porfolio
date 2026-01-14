<script lang="ts">
  const basePath = '/images/brands';

  // Mobile & Cross-platform
  const mobileTech = [
    { name: 'Kotlin', logo: `${basePath}/kotlin.svg` },
    { name: 'Swift', logo: `${basePath}/swift.svg` },
    { name: 'KMP', logo: `${basePath}/kmp.svg` },
    { name: 'Flutter', logo: `${basePath}/flutter.svg` },
    { name: 'Android', logo: `${basePath}/android.svg` },
    { name: 'iOS', logo: `${basePath}/apple.svg`, invert: true },
  ];

  // Backend & Cloud
  const backendTech = [
    { name: 'Node.js', logo: `${basePath}/nodejs.svg` },
    { name: 'Python', logo: `${basePath}/python.svg` },
    { name: 'TypeScript', logo: `${basePath}/typescript.svg` },
    { name: 'Firebase', logo: `${basePath}/firebase.svg` },
    { name: 'Supabase', logo: `${basePath}/supabase.svg` },
    { name: 'AWS', logo: `${basePath}/aws.svg` },
  ];

  // AI Models
  const aiTech = [
    { name: 'Claude', logo: `${basePath}/claude.png` },
    { name: 'ChatGPT', logo: `${basePath}/chatgpt.svg` },
    { name: 'Gemini', logo: `${basePath}/gemini.png` },
    { name: 'DeepSeek', logo: `${basePath}/deepseek.png` },
    { name: 'Qwen', logo: `${basePath}/qwen.png` },
    { name: 'Llama', logo: `${basePath}/llama.png` },
  ];

  const allTech = [...mobileTech, ...backendTech, ...aiTech];
</script>

<div class="w-full bg-dark-900/95 backdrop-blur-sm py-3 overflow-hidden">
  <div class="flex marquee-container">
    {#each [0, 1] as _}
      <div class="flex items-center gap-8 shrink-0 marquee-content px-4">
        {#each allTech as tech}
          <div class="flex items-center gap-2 text-dark-300 font-medium text-sm">
            <img
              src={tech.logo}
              alt={tech.name}
              class="w-5 h-5 object-contain {tech.invert ? 'brightness-0 invert' : ''}"
            />
            {tech.name}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .marquee-container {
    animation: scroll 40s linear infinite;
  }

  .marquee-content {
    min-width: max-content;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .marquee-container:hover {
    animation-play-state: paused;
  }
</style>
