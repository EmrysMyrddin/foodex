<script>
	import { goto } from '@sapper/app';
	import { userId } from '../stores/user-id'
	import Nav from '../components/navigation.svelte';

	export let segment

	$: {
		// Fixme typeof document === 'object' should not be mandatory here ?
		if(typeof document === 'object' && !$userId && segment !== 'login') goto('/login', { replaceState: true })
	}
</script>

<style>
	.app-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	main {
		background-color: white;
		padding: 2em;
		flex: 1;
		overflow-y: auto;
	}

</style>

<div class="app-container">

<main>
	<slot></slot>
</main>

<Nav {segment} />

</div>