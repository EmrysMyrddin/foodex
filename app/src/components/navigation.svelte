<script>
	import { goto } from '@sapper/app'
	import { userId } from '../stores/user-id'

	function disconect() {
		sessionStorage.token = null
		userId.set(null)
	}

	const menuEntries = [
		{ label: 'Recettes', href: '/recipes' },
		{ label: 'Ingredients', href: '/ingredients' },
		{ label: 'Listes de course', href: '/shopping-lists' },
		{ label: 'Mon compte', href: '/account' },
		{ label: 'Déconnexion', href: '/login', onClick: disconect, loggedOut: true}
	]
</script>

<nav>
	<ul>
		{#each menuEntries as { label, href, onClick, loggedOut } }
			{#if $userId || loggedOut}
				<li on:click={onClick}><a {href} rel=prefetch>{label}</a></li>
			{/if}
		{/each}
	</ul>
</nav>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>
