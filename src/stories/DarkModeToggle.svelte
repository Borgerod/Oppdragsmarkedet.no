<svelte:options runes />

<script lang="ts">
	import { Fa } from 'svelte-fa';
	import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';

	// Initialize with a default value that works server-side
	let darkmode = $state(false);

	function handleDarkMode() {
		darkmode = !darkmode;
		if (darkmode) {
			document.documentElement.classList.add('dark-mode');
			document.body.classList.add('dark-mode');
		} else {
			document.documentElement.classList.remove('dark-mode');
			document.body.classList.remove('dark-mode');
		}

		// Only access localStorage in the browser
		if (typeof window !== 'undefined') {
			localStorage.setItem('darkMode', darkmode.toString());
		}
	}

	// Move all browser-specific code to onMount
	onMount(() => {
		// Check if dark mode was previously enabled
		if (typeof window !== 'undefined') {
			// Now it's safe to access localStorage
			darkmode = localStorage.getItem('darkMode') === 'true';
			if (darkmode) {
				document.documentElement.classList.add('dark-mode');
				document.body.classList.add('dark-mode');
			}
		}
	});
</script>

<button
	type="button"
	onclick={handleDarkMode}
	aria-label="Toggle dark mode"
	class="dark-mode-toggle"
>
	{#if darkmode}
		<Fa icon={faSun} />
	{:else}
		<Fa icon={faMoon} />
	{/if}
</button>

<style>
	.dark-mode-toggle {
		background: transparent;
		border: none;
		cursor: pointer;
		color: inherit;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dark-mode-toggle:hover {
		opacity: 0.8;
		color: var(--accent-brighter);
	}

	.dark-mode-toggle:focus {
		outline: none;
		/* color: var(--accent-brighter); */
	}
</style>
