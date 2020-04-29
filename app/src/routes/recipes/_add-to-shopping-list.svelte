<script>
import Select from 'svelte-select'
import { searchShoppingLists } from '../../data/shoppingLists'

export let onAdd

let qte = 1, selectedShoppingList, saved

const getName = ({ name }) => name

async function handleAdd() {
  await onAdd(selectedShoppingList.id, qte)
  qte = 1
  selectedShoppingList = null
  saved = true
}

$: if(qte !== 1 || selectedShoppingList !== null) {
  saved = false
}

</script>

<form on:submit|preventDefault>
  <Select
    placeholder="Rechercher une liste de course"
    noOptionsMessage="Pas de liste de course trouvée"
    itemIdentifier="id"
    getOptionLabel={getName}
    getSelectionLabel={getName}
    loadOptions={searchShoppingLists}
    bind:selectedValue={selectedShoppingList}
  />
  <input type="number" bind:value={qte} class="qte"/>
  <button disabled={!selectedShoppingList || !qte} on:click={handleAdd}>Ajouter</button>
  <div class="saved" class:visible={saved}>Ajouté</div>
</form>

<style>
form {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr repeat(3, min-content);
  gap: 1em;
  white-space: nowrap;
  align-items: center;
  margin-bottom: 1em;

  /* Select theme */
  --height: 2em;
}

.qte {
  align-self: stretch;
}

.saved {
  visibility: hidden;
  color: green;
}

.visible {
  visibility: visible;
}
</style>