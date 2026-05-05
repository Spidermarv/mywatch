<script lang="ts">
  import { X, Search as SearchIcon, Loader2, Play } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  let { isOpen = $bindable(false) } = $props();
  let searchQuery = $state('');
  let results = $state<any[]>([]);
  let isSearching = $state(false);
  let inputEl = $state<HTMLInputElement | null>(null);

  async function handleSearch() {
    if (searchQuery.length < 2) {
      results = [];
      return;
    }

    isSearching = true;
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      results = data.results.slice(0, 6);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      isSearching = false;
    }
  }

  let timeout: NodeJS.Timeout;
  function debouncedSearch() {
    clearTimeout(timeout);
    timeout = setTimeout(handleSearch, 300);
  }

  onMount(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) isOpen = false;
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen = true;
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });

  $effect(() => {
    if (isOpen && inputEl) {
      // Defer focus to after transition renders
      setTimeout(() => inputEl?.focus(), 50);
    }
  });
</script>

{#if isOpen}
  <div 
    class="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-6"
    transition:fade={{ duration: 200 }}
  >
    <button
      type="button"
      aria-label="Close search"
      class="absolute inset-0 bg-black/60 backdrop-blur-xl w-full h-full cursor-default"
      onclick={() => isOpen = false}
    ></button>

    <div 
      class="w-full max-w-2xl bg-bg-secondary border border-border rounded-3xl shadow-2xl overflow-hidden relative"
      transition:fly={{ y: -20, duration: 300 }}
    >
      <div class="p-6 flex items-center gap-4 border-b border-border">
        <SearchIcon class="w-6 h-6 text-text-secondary" />
        <input 
          bind:this={inputEl}
          type="text"
          bind:value={searchQuery}
          oninput={debouncedSearch}
          placeholder="Search movies, series, or actors..."
          class="flex-grow bg-transparent border-none text-xl font-medium focus:ring-0 placeholder:text-text-secondary"
        />
        <button 
          onclick={() => isOpen = false}
          class="p-2 hover:bg-bg-tertiary rounded-full transition-colors"
        >
          <X class="w-5 h-5 text-text-secondary" />
        </button>
      </div>

      <div class="max-h-[60vh] overflow-y-auto p-4">
        {#if isSearching}
          <div class="flex items-center justify-center py-12">
            <Loader2 class="w-8 h-8 text-brand-blue animate-spin" />
          </div>
        {:else if results.length > 0}
          <div class="grid gap-2">
            {#each results as item}
              <a 
                href="/{item.media_type || (item.title ? 'movie' : 'tv')}/{item.id}"
                onclick={() => isOpen = false}
                class="flex items-center gap-4 p-3 hover:bg-bg-tertiary rounded-2xl transition-all group"
              >
                <div class="w-12 h-18 bg-bg-tertiary rounded-lg overflow-hidden flex-shrink-0">
                  {#if item.poster_path}
                    <img src="https://image.tmdb.org/t/p/w92{item.poster_path}" alt={item.title || item.name} class="w-full h-full object-cover" />
                  {/if}
                </div>
                <div class="flex-grow">
                  <h4 class="font-bold group-hover:text-brand-blue transition-colors">{item.title || item.name}</h4>
                  <p class="text-xs text-text-secondary mt-0.5">
                    {item.release_date || item.first_air_date ? new Date(item.release_date || item.first_air_date).getFullYear() : 'N/A'} • {item.media_type === 'tv' ? 'Series' : 'Movie'}
                  </p>
                </div>
                <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play class="w-4 h-4 text-brand-blue fill-current" />
                </div>
              </a>
            {/each}
          </div>
        {:else if searchQuery.length >= 2}
          <div class="py-12 text-center text-text-secondary">
            No results found for "{searchQuery}"
          </div>
        {:else}
          <div class="py-12 text-center text-text-secondary">
            <p class="text-sm font-medium">Quick Suggestions</p>
            <div class="flex flex-wrap justify-center gap-2 mt-4">
              <button onclick={() => { searchQuery = 'Avengers'; debouncedSearch(); }} class="px-3 py-1 bg-bg-tertiary rounded-full text-xs hover:bg-border transition-colors">Avengers</button>
              <button onclick={() => { searchQuery = 'Batman'; debouncedSearch(); }} class="px-3 py-1 bg-bg-tertiary rounded-full text-xs hover:bg-border transition-colors">Batman</button>
              <button onclick={() => { searchQuery = 'The Boys'; debouncedSearch(); }} class="px-3 py-1 bg-bg-tertiary rounded-full text-xs hover:bg-border transition-colors">The Boys</button>
            </div>
          </div>
        {/if}
      </div>

      <div class="p-4 bg-bg-tertiary/50 border-t border-border flex justify-between items-center text-[10px] font-bold text-text-secondary uppercase tracking-widest">
        <div class="flex gap-4">
          <span><span class="bg-border px-1.5 py-0.5 rounded mr-1">ESC</span> to close</span>
          <span><span class="bg-border px-1.5 py-0.5 rounded mr-1">⌘ K</span> to search</span>
        </div>
        <span>Powered by TMDB</span>
      </div>
    </div>
  </div>
{/if}
