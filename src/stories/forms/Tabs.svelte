<script lang="ts">
	let activeTab = $state('inkluder');

	const {
		includeTags = [],
		excludeTags = [],
		onIncludeTagsChange = () => {},
		onExcludeTagsChange = () => {}
	} = $props();

	function setTab(tab: 'inkluder' | 'ekskluder') {
		activeTab = tab;
	}
</script>

<div class="tabs-container">
	<div class="tabs-header">
		<button class:active={activeTab === 'inkluder'} onclick={() => setTab('inkluder')}>
			Inkluder
		</button>
		<button class:active={activeTab === 'ekskluder'} onclick={() => setTab('ekskluder')}>
			Ekskluder
		</button>
	</div>

	<div class="tabs-content">
		{#if activeTab === 'inkluder'}
			<slot name="inkluder" {includeTags} {onIncludeTagsChange} />
		{:else}
			<slot name="ekskluder" {excludeTags} {onExcludeTagsChange} />
		{/if}
	</div>
</div>

<style>
	.tabs-container {
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		overflow: hidden;
	}

	.tabs-header {
		display: flex;
		border-bottom: 1px solid #e0e0e0;
		/* background: #f5f5f5; */
	}

	.tabs-header button {
		flex: 1;
		padding: 0.8rem;
		border: none;
		background: none;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.tabs-header button.active {
		/* background: white; */
		border-bottom: 2px solid #4caf50;
		color: #2e7d32;
	}

	.tabs-content {
		padding: 1rem;
		/* background: white; */
	}
</style>
