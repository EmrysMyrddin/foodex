<script>
import { onMount } from 'svelte'
import { title, titleIcon } from '../../stores/page'
import { AccountIcon } from '../../components/icons'

titleIcon.set(AccountIcon)
title.set('Mon compte')

onMount(() => {
  document.body.style.setProperty('--PRIMARY_COLOR', '209, 44, 139')
})

</script>

<slot></slot>
