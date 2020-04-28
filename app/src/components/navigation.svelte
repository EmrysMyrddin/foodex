<script>
	import { goto } from '@sapper/app'
	import watchMedia from "svelte-media";
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

	const media = watchMedia({ mobile: '(max-width: 60rem)' })

	console.log($media)

	function isCurrent(href, segment) {
		const parts = href.split('/')
		console.log(parts[parts.length - 1] === segment, segment, parts)
		if(parts[parts.length - 1] === segment) return 'page'
	}
</script>

{#if $userId}
	<nav>
		<ul>
			{#each menuEntries as { label, href, onClick, icon } }
				<li on:click={onClick}>
					<a {href} rel=prefetch aria-current={isCurrent(href, segment)}>
						<div class="menu-button">
							<svelte:component this={icon} />
							{#if !$media.mobile }<div>{label}</div>{/if}
						</div>
					</a>
				</li>
			{/each}
		</ul>
		<div class="logout extra">
			<div class="menu-button" on:click={disconect} role="button">
				<svelte:component this={icons.LogoutIcon} />
				{#if !$media.mobile }<div>Déconnexion</div>{/if}
			</div>
		</div>
	</nav>
{/if}

<style>
	nav {
		font-size: 1em;
		border-top: 1px solid rgb(var(--PRIMARY_COLOR));
		transition: border-top 0.3s ease-in-out;
		font-weight: 300;
		height: 70px;
		display: flex;
		align-items: center;
	}

	ul {
		margin: 0;
		padding: 0;
		display: flex;
		flex: 1;
		justify-content: center;
	}

	li {
		display: block;
	}

	a {
		text-decoration: none;
	}

	[aria-current] {
		color: rgb(var(--PRIMARY_COLOR));
	}

	[aria-current] .menu-button :global(svg) {
		fill: rgb(var(--PRIMARY_COLOR));
		stroke: rgb(var(--PRIMARY_COLOR));
	}

	.menu-button {
		width: fit-content;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
		transition: color 0.3s ease-in-out;
		padding: 0 1em;
	}

	@media(max-width: 60rem) {
		.menu-button {
			width: 20vw;
			font-size: 1.5em;
			padding: 0;
		}
	}

	.menu-button :global(svg) {
		display: block;
		height: 2em;
		width: 2em;
		fill: black;
		stroke: black;
		transition: fill 0.3s ease-in-out, stroke 0.3s ease-in-out;
	}
</style>
