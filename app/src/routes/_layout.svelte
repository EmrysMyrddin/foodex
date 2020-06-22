<script>
	import { goto } from '@sapper/app';
	import { userId } from '../stores/user-id'
	import Nav from '../components/navigation';
	import Header from '../components/header'

	export let segment

	$: {
		// Fixme typeof document === 'object' should not be mandatory here ?
		if(typeof document === 'object' && !$userId && segment !== 'login') goto('/login', { replaceState: true })
	}
</script>


<div class="app-container">
	<Header />

	<div class="main-content-container">
		<main>
			<slot></slot>
		</main>
	</div>

	<Nav {segment} />

</div>

<style>
	.app-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.main-content-container {
		flex: 1;
		overflow-y: auto;
	}

	main {
		background-color: white;
		padding: 2em;
		max-width: 60em;
		margin: auto;
		width: 100%;
	}
</style>
