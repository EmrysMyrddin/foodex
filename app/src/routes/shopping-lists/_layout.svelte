<script>
import { title, titleIcon } from '../../stores/page'
import { ShoppingListsIcon } from '../../components/icons'

titleIcon.set(ShoppingListsIcon)
title.set('Listes de course')

document.body.style.setProperty('--PRIMARY_COLOR', '44, 209, 165')

</script>

<slot></slot>
