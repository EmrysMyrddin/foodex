<script>
	import { goto } from '@sapper/app'
	import { userId } from '../stores/user-id'
	import * as icons from './icons'

	export let segment

	function disconect() {
		sessionStorage.removeItem('token')
		userId.set(null)
		goto('/login')
	}

	const menuEntries = [
		{ label: 'Recettes', href: '/recipes', icon: icons.RecipesIcon},
		{ label: 'Ingredients', href: '/ingredients', icon: icons.IngredientsIcon },
		{ label: 'Listes de course', href: '/shopping-lists', icon: icons.ShoppingListsIcon },
		{ label: 'Mon compte', href: '/account', icon: '/account.svg', icon: icons.AccountIcon },
	]

	function isCurrent(href, segment) {
		const parts = href.split('/')
		console.log(parts[parts.length - 1] === segment, segment, parts)
		if(parts[parts.length - 1] === segment) return 'page'
	}
</script>

{#if $userId}
	<nav>
		<div class="extra"></div>
		<ul>
				{#each menuEntries as { label, href, onClick, icon } }
					<li on:click={onClick}>
						<a {href} rel=prefetch aria-current={isCurrent(href, segment)}>
							<div class="menu-button">
								<svelte:component this={icon} />
								<div>{label}</div>
							</div>
						</a>
					</li>
				{/each}
		</ul>
		<div class="logout extra">
			<div class="menu-button" on:click={disconect} role="button">
				<svelte:component this={icons.LogoutIcon} />
				<div>Déconnexion</div>
			</div>
		</div>
	</nav>
{/if}

<style>
	nav {
		border-top: 1px solid var(--PRIMARY_COLOR);
		transition: border-top 0.3s ease-in-out;
		font-weight: 300;
		padding: 0 1em;
		height: 90px;
		display: flex;
		align-items: center;
	}

	ul {
		margin: 0;
		padding: 0;
		display: flex;
	}

	li {
		display: block;
		margin: 0 1em;
	}

	a {
		text-decoration: none;
	}

	[aria-current] {
		color: var(--PRIMARY_COLOR);
	}

	[aria-current] .menu-button :global(svg) {
		fill: var(--PRIMARY_COLOR);
		stroke: var(--PRIMARY_COLOR);
	}

	.extra {
		flex: 1;
	}

	.logout {
		text-align: end;
	}

	.menu-button {
		width: fit-content;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
		transition: color 0.3s ease-in-out;
	}

	.menu-button :global(svg) {
		height: 40px;
		fill: black;
		stroke: black;
		transition: fill 0.3s ease-in-out, stroke 0.3s ease-in-out;
	}
</style>
