<div class="grid {$$props.class}">
  <slot></slot>
</div>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: min-content;
  gap: 1em;
  margin-top: 1em;
}

@media(max-width: 50em) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>