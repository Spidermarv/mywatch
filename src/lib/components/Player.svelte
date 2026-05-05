<script lang="ts">
  import { Play, Settings, Shield, AlertCircle } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let { tmdbId, type = 'movie', season = 1, episode = 1 } = $props();

  let activeServer = $state('2embed');
  let isLoading = $state(true);
  let hasInteracted = $state(false);
  let loadingStep = $state(0);
  let loadingText = $state('Preparing stream...');

  const loadingSteps = [
    'Initializing secure player...',
    'Fetching best available server...',
    'Bypassing regional restrictions...',
    'Encrypting connection...',
    'Ready to play!'
  ];

  const servers = [
    { id: '2embed', name: 'Server 1 (HD)', url: (id: string) => type === 'movie' ? `https://www.2embed.online/2embed.php?id=${id}` : `https://www.2embed.online/tv-2embed.php?id=${id}&season=${season}&episode=${episode}` },
    { id: 'vidsrc', name: 'Server 2 (Alt)', url: (id: string) => type === 'movie' ? `https://vidsrc.to/embed/movie/${id}` : `https://vidsrc.to/embed/tv/${id}/${season}/${episode}` },
    { id: 'superembed', name: 'Server 3 (Fallback)', url: (id: string) => type === 'movie' ? `https://multiembed.mov/?video_id=${id}&tmdb=1` : `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}` }
  ];

  const handleInteraction = async () => {
    if (!hasInteracted) {
      hasInteracted = true;
      
      // Trigger monetization (Pop-under)
      if (typeof window !== 'undefined' && (window as any).triggerPopUnder) {
        (window as any).triggerPopUnder();
      }

      // Start loading sequence
      for (let i = 0; i < loadingSteps.length; i++) {
        loadingStep = i;
        loadingText = loadingSteps[i];
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 500));
      }
    }
  };

  const changeServer = (serverId: string) => {
    activeServer = serverId;
    isLoading = true;
  };

  const getEmbedUrl = () => {
    const server = servers.find(s => s.id === activeServer) || servers[0];
    return server.url(tmdbId);
  };
</script>

<div class="w-full aspect-video bg-black rounded-3xl overflow-hidden border border-border shadow-2xl relative group">
  {#if !hasInteracted}
    <div class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-bg-secondary/90 backdrop-blur-sm">
      <button 
        onclick={handleInteraction}
        class="w-20 h-20 bg-brand-blue rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,122,255,0.4)] transition-transform hover:scale-110 active:scale-95"
      >
        <Play class="w-8 h-8 text-white fill-current translate-x-1" />
      </button>
      <p class="mt-6 text-text-primary font-bold tracking-tight">Click to Start Playing</p>
      <p class="mt-2 text-xs text-text-secondary flex items-center gap-2">
        <Shield class="w-3 h-3" /> Encrypted Connection
      </p>
    </div>
  {/if}

  {#if isLoading && hasInteracted}
    <div class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md">
      <div class="w-16 h-1 bg-white/10 rounded-full mb-8 overflow-hidden">
        <div 
          class="h-full bg-brand-blue transition-all duration-500" 
          style="width: {(loadingStep + 1) / loadingSteps.length * 100}%"
        ></div>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-5 h-5 border-2 border-brand-blue/30 border-t-brand-blue rounded-full animate-spin"></div>
        <p class="text-sm font-medium text-text-primary tracking-tight">{loadingText}</p>
      </div>
    </div>
  {/if}

  {#if hasInteracted}
    <iframe
      src={getEmbedUrl()}
      class="w-full h-full border-0"
      allowfullscreen
      title="Video Player"
      onload={() => (isLoading = false)}
    ></iframe>
  {/if}

  <!-- Controls / Server Switcher -->
  <div class="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <div class="flex gap-2">
      {#each servers as server}
        <button
          onclick={() => changeServer(server.id)}
          class="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-all {activeServer === server.id ? 'bg-brand-blue border-brand-blue text-white' : 'bg-black/60 border-white/20 text-white/70 hover:bg-black/80 hover:border-white/40'}"
        >
          {server.name}
        </button>
      {/each}
    </div>
    
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-1.5 text-yellow-500">
        <AlertCircle class="w-3 h-3" />
        <span class="text-[10px] font-bold uppercase tracking-widest">Report Issue</span>
      </div>
      <Settings class="w-4 h-4 text-white/50 hover:text-white cursor-pointer transition-colors" />
    </div>
  </div>
</div>
