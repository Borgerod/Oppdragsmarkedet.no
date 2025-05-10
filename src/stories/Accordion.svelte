<svelte:options runes />

<script lang="ts">
	import './forms/form.css';
	let isOpen = $state(false);
	const { title = '', tooltip_content = '' } = $props();
	import { tooltip } from './Tooltip.svelte';
</script>

<div class="accordion">
	<button
		class="accordion-header"
		onclick={() => (isOpen = !isOpen)}
		aria-expanded={isOpen}
		use:tooltip={tooltip_content}
	>
		<h3>{title}</h3>

		<div class="custom-chevron {isOpen ? 'open' : ''}"></div>
	</button>

	{#if isOpen}
		<slot />
	{/if}
</div>

<style>
	.custom-chevron {
		width: 1rem;
		height: 1rem;
		position: relative;
		transition: transform 0.2s ease;
	}

	.custom-chevron::after {
		content: '';
		position: absolute;
		width: 0.5rem;
		height: 0.5rem;
		border-right: 2px solid var(--secondary);
		border-bottom: 2px solid var(--secondary);
		transform: rotate(45deg);
		top: 0.2rem;
		left: 0.25rem;
	}

	.custom-chevron.open {
		transform: rotate(180deg);
	}
</style>
