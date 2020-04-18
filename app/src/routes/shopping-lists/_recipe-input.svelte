<script>
import Select from 'svelte-select'
import { searchRecipe } from '../../data/recipes'

export let onAdd

let selectedValue, qte = 1

function handleAdd() {
  onAdd(selectedValue.id, qte)
  selectedValue = null
  qte = 1
}

const getName = ({ name }) => name

</script>

<div class="recipe-input" >
  <Select
    placeholder="Rechercher un recette"
    optionIdentifier="id"
    noOptionsMessage="Aucune recette trouvée"
    getOptionLabel={getName}
    getSelectionLabel={getName}
    bind:selectedValue={selectedValue}
    loadOptions={searchRecipe}
  />
  <input
    type="number"
    bind:value={qte}
    placeholder="Quantitée"
  />
  <button on:click={handleAdd} disabled={!selectedValue || !qte} >Ajouter la recette</button>
</div>

<style>
.recipe-input {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
}
</style>