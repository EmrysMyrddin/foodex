<script>
  import marked from 'marked'

  export let content, onChange

  function onBlur({ target }) {
    onChange(target.value)
    editing = false
  }

  let editing = false
</script>

<style>
  textarea {
    width: 100%;
    font-size: 1rem;
  }

  article {
    min-height: 2rem;
    border: 1px transparent solid;
    cursor: pointer;
  }

  article:hover {
    border: 1px blue solid;
  }
</style>

<svelte:window on:click={() => editing = false} />

<article on:click|stopPropagation={() => editing = true}>
  {#if editing}
    <textarea value={content} on:blur={onBlur} rows={15}/>
  {:else}
      {@html marked(content)}
  {/if}
</article>