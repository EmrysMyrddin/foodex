<script context="module">
  export async function preload(page) {
    return page.params
  }
</script>

<script>
  import { subtitle } from '../../stores/page'
  import EditableTitle from '../../components/editable-title'
  import { getIngredient, setName } from '../../data/ingredients'

  export let ingredientId

  let ingredientQuery = getIngredient(ingredientId)

  $: $ingredientQuery.then(({ data: { ingredient: { name } } }) => subtitle.set(name))
</script>

<h1>
  {#await $ingredientQuery}
    Ingrédient
  {:then { data: { ingredient } } }
    <EditableTitle title={ingredient.name} onChange={name => setName(ingredientId, name)} />
  {/await}
</h1>
