<script>
import { title, titleIcon } from '../../stores/page'
import { RecipesIcon } from '../../components/icons'

titleIcon.set(RecipesIcon)
title.set('Recettes')

document.body.style.setProperty('--PRIMARY_COLOR', '224, 180, 32')

</script>

<slot></slot>
