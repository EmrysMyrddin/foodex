<script>
  import Select from 'svelte-select'
  import gql from 'graphql-tag'
  import { createIngredient, searchIngredients } from '../../data/ingredients.js'

  export let onAdd

  let selectedValue, qte, unit

  async function handleAdd() {
    let ingredientId = selectedValue.id

    if(ingredient_id === 'new') {
      const newIngredient = await createIngredient(selectedValue.name)
      ingredientId = newIngredient.id
    }

    onAdd({ ingredientId, qte, unit })
    reset()
  }

  function reset() {
    selectedValue = null
    qte = null
    unit = null
  }

  const getName = ({ name }) => name
  const createItem = name => ({ id: 'new', name })
</script>

<style>
.ingredient-input {
  display: inline-grid;
  grid-auto-flow: column;
  grid-gap: 1em;
}

.ingredient-select-container {
  width: 20rem;
  --height: 2em;
}
</style>

<div class="ingredient-input">
  <div class="ingredient-select-container">
    <Select
      optionIdentifier="id"
      placeholder="Rechercher un ingrédient à ajouter"
      noOptionsMessage="Aucun ingrédients trouvés"
      {createItem}
      getOptionLabel={getName}
      getSelectionLabel={getName}
      loadOptions={searchIngredients}
      bind:selectedValue={selectedValue}
      isCreatable
    />
  </div>

  <label>Quantité :</label>
  <input type="number" bind:value={qte} />
  <select bind:value={unit} >
    <option value="kg">kg</option>
    <option value="p">pièce</option>
    <option value="cl">cl</option>
  </select>
  <button on:click={handleAdd} >Ajouter</button>
</div>
