<script context="module">
  export async function preload(page) {
    return page.params
  }
</script>

<script>
  import EditableTitle from '../../components/editable-title'
  import { getIngredient, setName } from '../../data/ingredients'

  export let ingredientId

  let ingredientQuery = getIngredient(ingredientId)
</script>

<h1>
  {#await $ingredientQuery}
    Ingrédient
  {:then { data: { ingredient } } }
    <EditableTitle title={ingredient.name} onChange={name => setName(ingredientId, name)} />
  {/await}
</h1>
