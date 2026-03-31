<script lang="ts">
  import ScoundrelShell from "$lib/scoundrel/ScoundrelShell.svelte";
</script>

<main class="app">
  <header class="app-header">
    <h1 class="app-title">Card Games</h1>
  </header>
  <ScoundrelShell />
</main>

<style>
  .app {
    max-width: 52rem;
    margin: 0 auto;
    padding: 1.5rem;
  }
  .app-header {
    margin-bottom: 1.5rem;
  }
  .app-title {
    margin: 0 0 0.35rem;
    letter-spacing: -0.02em;
    font: inherit;
    font-size: 1.75rem;
  }

</style>
