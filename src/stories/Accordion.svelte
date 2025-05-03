<script>
	let isOpen = $state(false);
	// TODO []: display tooltip at correct spot.
	let showTooltip = $state(false);
	const { title = '', tooltip = '' } = $props();
</script>

<div class="accordion">
	<button
		class="accordion-header"
		onclick={() => (isOpen = !isOpen)}
		onmouseenter={() => (showTooltip = true)}
		onmouseleave={() => (showTooltip = false)}
		aria-expanded={isOpen}
	>
		<h2>{title}</h2>
		{#if tooltip && showTooltip}
			<div class="tooltip">{tooltip}</div>
		{/if}
		<div class="chevron {isOpen ? 'open' : ''}"></div>
	</button>

	{#if isOpen}
		<div class="accordion-content">
			<slot />
		</div>
	{/if}
</div>

<style>
	.accordion h2 {
		margin: 0;
	}
	.accordion {
		border: 1px solid #e0e0e0;
		border-radius: 8px;
	}

	.accordion-header {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: none;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.chevron {
		width: 1rem;
		height: 1rem;
		position: relative;
		transition: transform 0.2s ease;
	}

	.chevron::after {
		content: '';
		position: absolute;
		width: 0.5rem;
		height: 0.5rem;
		border-right: 2px solid #333;
		border-bottom: 2px solid #333;
		transform: rotate(45deg);
		top: 0.2rem;
		left: 0.25rem;
	}

	.chevron.open {
		transform: rotate(180deg);
	}

	.tooltip {
		position: absolute;
		/* background: #333; */
		/* color: white; */
		padding: 0.5rem;
		border-radius: 4px;
		font-size: 0.875rem;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		white-space: nowrap;
	}

	.accordion-content {
		/* padding: 1rem; */
		/* background: white; */
	}
</style>
