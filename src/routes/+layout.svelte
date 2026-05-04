<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>HurahWatch - Premium Video Discovery Hub</title>
  <meta name="description" content="Discover the latest movies and series with HurahWatch. High-quality metadata, trending content, and a minimalist experience." />
</svelte:head>

<div class="min-h-screen flex flex-col">
  <Header />
  <main class="flex-grow pt-24">
    {@render children()}
  </main>
  <Footer />
</div>
