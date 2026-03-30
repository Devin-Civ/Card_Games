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
  :global(:root) {
    --font-bitcount-single: "Bitcount Prop Single", system-ui;
    --font-bitcount-double: "Bitcount Prop Double", system-ui;
  }

  :global(body) {
    font-family: var(--font-bitcount-single);
    font-optical-sizing: auto;
    font-style: normal;
    font-variation-settings: "slnt" 0, "CRSV" 0.5, "ELSH" 0, "ELXP" 0;
  }

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
    font-size: 1.75rem;
    font-weight: 400;
    letter-spacing: -0.02em;
    font-family: var(--font-bitcount-double);
    font-optical-sizing: auto;
    font-style: normal;
    font-variation-settings: "slnt" 0, "CRSV" 0.5, "ELSH" 0, "ELXP" 0;
  }

</style>
