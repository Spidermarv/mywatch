<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer class="mt-20 border-t border-border bg-bg-primary py-12">
  <div class="max-w-7xl mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
      <div class="col-span-1 md:col-span-1">
        <a href="/" class="flex items-center gap-2 mb-6">
          <div class="w-6 h-6 bg-brand-blue rounded flex items-center justify-center">
            <div class="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <span class="text-lg font-bold tracking-tight">HurahWatch</span>
        </a>
        <p class="text-sm text-text-secondary leading-relaxed">
          The ultimate video discovery hub. Exploring the world of cinema with minimalist design and powerful metadata.
        </p>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-6 uppercase tracking-wider">Content</h3>
        <ul class="space-y-4">
          <li><a href="/movies" class="text-sm text-text-secondary hover:text-text-primary transition-colors">Movies</a></li>
          <li><a href="/series" class="text-sm text-text-secondary hover:text-text-primary transition-colors">TV Series</a></li>
          <li><a href="/trending" class="text-sm text-text-secondary hover:text-text-primary transition-colors">Trending Now</a></li>
          <li><a href="/top-rated" class="text-sm text-text-secondary hover:text-text-primary transition-colors">Top Rated</a></li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-semibold mb-6 uppercase tracking-wider">Support</h3>
        <ul class="space-y-4">
          <li><a href="/about" class="text-sm text-text-secondary hover:text-text-primary transition-colors">About Us</a></li>
          <li><a href="/contact" class="text-sm text-text-secondary hover:text-text-primary transition-colors">Contact</a></li>
          <li><a href="/dmca" class="text-sm text-text-secondary hover:text-text-primary transition-colors">DMCA</a></li>
          <li><a href="/privacy" class="text-sm text-text-secondary hover:text-text-primary transition-colors">Privacy Policy</a></li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-semibold mb-6 uppercase tracking-wider">Community</h3>
        <ul class="space-y-4">
          <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary transition-colors">Telegram</a></li>
          <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary transition-colors">Discord</a></li>
          <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary transition-colors">Twitter</a></li>
        </ul>
      </div>
    </div>
    
    <div class="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-xs text-text-secondary">
        &copy; {currentYear} HurahWatch. All rights reserved. Built for discovery, not hosting.
      </p>
      <div class="flex gap-6">
        <span class="text-[10px] text-text-secondary/50 uppercase tracking-widest px-2 py-1 border border-border rounded">v1.0.0 Stable</span>
      </div>
    </div>
  </div>
</footer>
