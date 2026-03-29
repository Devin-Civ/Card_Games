<script lang="ts">
  import ScoundrelShell from "$lib/scoundrel/ScoundrelShell.svelte";
</script>

<main class="app">
  <header class="app-header">
    <h1>Card Games</h1>
    <p class="tagline">
      Shared UI in <code>src/lib/cards</code> · Scoundrel in
      <code>src/lib/scoundrel</code>
    </p>
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
  .app-header h1 {
    margin: 0 0 0.35rem;
    font-size: 1.75rem;
    font-weight: 650;
    letter-spacing: -0.02em;
  }
  .tagline {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.85;
  }
  .tagline code {
    font-size: 0.85em;
  }
</style>
