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
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav />

<main>
	<slot></slot>
</main>