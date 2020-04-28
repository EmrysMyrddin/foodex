<script>
import { title, titleIcon } from '../../stores/page'
import { AccountIcon } from '../../components/icons'

titleIcon.set(AccountIcon)
title.set('Mon compte')

document.body.style.setProperty('--PRIMARY_COLOR', '209, 44, 139')

</script>

<slot></slot>
