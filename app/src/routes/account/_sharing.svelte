<script>
import { getSharing, updateSharing } from '../../data/users'

export let sharingId

let sharingQuery = getSharing(sharingId)

const updateSharingAttribute = key => event => updateSharing(sharingId, { [key]: Boolean(event.target.checked) })

</script>

<li>
  {#await $sharingQuery}
    Chargement...
  {:then { data: { sharing: { sharedTo: { username }, canWrite, canSeeShoppingLists } } } }
    {username}
    (
      <label>
        <input type="checkbox" checked={canWrite} on:change={updateSharingAttribute('canWrite')}>
        modification possible
      </label>,
      <label>
        <input type="checkbox" checked={canSeeShoppingLists} on:change={updateSharingAttribute('canSeeShoppingLists')}/>
        listes de courses visibles
      </label>
    )
  {/await}
</li>