<script lang="ts">
  import { Search, Play, User } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import SearchOverlay from './SearchOverlay.svelte';

  let scrolled = $state(false);
  let searchOpen = $state(false);

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 20;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<header
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-border py-3' : 'bg-transparent py-5'}"
>
  <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
    <a href="/" class="flex items-center gap-2 group">
      <div class="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,122,255,0.5)] group-hover:scale-110 transition-transform">
        <Play class="text-white w-5 h-5 fill-current" />
      </div>
      <span class="text-xl font-bold tracking-tight">Hurah<span class="text-brand-blue">Watch</span></span>
    </a>

    <nav class="hidden md:flex items-center gap-8">
      <a href="/" class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Home</a>
      <a href="/movies" class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Movies</a>
      <a href="/series" class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Series</a>
      <a href="/trending" class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Trending</a>
    </nav>

    <div class="flex items-center gap-4">
      <button 
        onclick={() => searchOpen = true}
        class="p-2 text-text-secondary hover:text-text-primary transition-colors" 
        aria-label="Search"
      >
        <Search class="w-5 h-5" />
      </button>
      <button class="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center text-text-secondary hover:text-text-primary border border-border transition-colors">
        <User class="w-4 h-4" />
      </button>
    </div>
  </div>
</header>

<SearchOverlay bind:isOpen={searchOpen} />
