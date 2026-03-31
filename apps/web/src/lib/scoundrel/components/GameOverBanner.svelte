<script lang="ts">
  let {
    text,
    status,
  }: {
    text: string;
    status: "victory" | "defeated" | null;
  } = $props();
</script>

{#if text}
  <pre class="result" class:result-victory={status === "victory"} class:result-defeated={status === "defeated"}>{text}</pre>
{/if}

<style>
  .result {
    margin: 1rem 0 0;
    padding: 0.65rem 0.75rem;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 700;
    overflow: auto;
    background: color-mix(in srgb, CanvasText 6%, transparent);
  }
  .result-victory {
    color: green;
  }
  .result-defeated {
    color: darkred;
  }
</style>
