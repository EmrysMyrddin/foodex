<script>
	import { goto } from '@sapper/app'

	function disconect() {
		sessionStorage.token = null
	}

	const menuEntries = [
		{ label: 'Recettes', href: '/recipes' },
		{ label: 'Ingredients', href: '/ingredients' },
		{ label: 'Listes de course', href: '/shopping-lists' },
		{ label: 'Mon compte', href: '/account' },
		{ label: 'Déconnection', href: '/login', onClick: disconect}
	]
</script>

<nav>
	<ul>
		{#each menuEntries as { label, href, onClick } }
			<li on:click={onClick}><a {href} rel=prefetch>{label}</a></li>
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
