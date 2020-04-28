<script>
import { title, titleIcon } from '../../stores/page'
import { IngredientsIcon } from '../../components/icons'

titleIcon.set(IngredientsIcon)
title.set('Ingredients')

document.body.style.setProperty('--PRIMARY_COLOR', '16, 162, 227')
</script>

<slot></slot>
