<script>
  import { goto } from '@sapper/app'
  import { title, titleIcon, subtitle } from '../stores/page'

  function goUp() {
    const parts = location.pathname.split('/').slice(0, -1)
    goto(parts.join('/'))
  }
</script>

{#if $title }
  <header>
    <svelte:component this={$titleIcon} />
    <h1>
      <span on:click={$subtitle ? goUp: null} class:clickable={$subtitle}>{$title}</span>
      {#if $subtitle}<span class="subtitle">/ {$subtitle}</span>{/if}</h1>
  </header>
{/if}

<style>
/* rgba(var(--PRIMARY_COLOR), 0.16) */
header {
  height: 70px;
  display: flex;
  align-items: center;
  box-shadow: 0px 10px 20px rgba(var(--PRIMARY_COLOR), 0.16);
  background-color: white;
  z-index: 10;
  transition: box-shadow var(--transition);
  margin-bottom: 1em;
}

header :global(svg) {
  fill: rgb(var(--PRIMARY_COLOR));
  stroke: rgb(var(--PRIMARY_COLOR));
  width: 3em;
  height: auto;
  margin-right: 1em;
  margin-left: 2em;
  transition: fill var(--transition), stroke var(--transition);
}

h1 {
  font-size: 1.5em;
  color: rgb(var(--PRIMARY_COLOR));
  text-transform: uppercase;
  margin: 0;
  transition: color var(--transition);
}

.clickable {
  cursor: pointer;
}

.subtitle {
  text-transform: none;
  color: #707070;
  font-size: 0.66em;
  position: relative;
  bottom: 1px;
}
</style>