<script>
export let title, onChange, onDelete

let editing = false

function handleBlur({ target }) {
  onChange(target.innerHTML)
  editing = false
}
</script>

<svelte:window on:click={() => editing = false} />

<div class="editable-container">
  <div class="edit-icon" class:visible={editing === 'name'}>✏️</div>
  <h1
    contenteditable={editing}
    class:editing={editing}
    on:blur={handleBlur}
    on:click|stopPropagation={() => editing = true}
  >
    {title}
  </h1>
  {#if onDelete}
    <div class="delete-icon" on:click={onDelete}>🗑</div>
  {/if}
</div>

<style>
  .edit-icon {
    visibility: hidden;
  }

  :hover > .edit-icon, .edit-icon.visible {
    visibility: visible
  }

  .editable-container {
    position: relative;
    left: calc(-1rem - 24px);
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  .editing {
    border-color: gray
  }

  h1 {
    border: 2px solid transparent;
    border-radius: 5px;
    padding: 0.2rem 1rem;
    margin: 0
  }
</style>