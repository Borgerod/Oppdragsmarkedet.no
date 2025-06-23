<svelte:options runes />

<script lang="ts">
	import './form.css';
	let searchQuery = $state('');
	let showAllTags = $state(false);
	import {
		// fieldTags,
		experienceRequirementsTags,
		jobAttributesTags,
		clientRoleTags
	} from '$lib/data/TagData';

	const {
		tagIntent = 'include',
		display = 'false',
		tagType = 'field',
		selectedTags = [],
		onTagChange = () => {},
		showSearch = true,
		size = 'm', // Default size is 'm', also accepts 's' for small
		row = false
	} = $props();

	function rowOrGrid() {
		if (!row) {
			return 'grid';
		} else {
			return 'row';
		}
	}
	let row_or_grid = rowOrGrid();

	const allTags = $derived(() => {
		switch (tagType) {
			case 'field':
				return experienceRequirementsTags;
			case 'job_attributes':
				return jobAttributesTags;
			case 'clientRole':
				return clientRoleTags;
			default:
				return [];
		}
	});

	const filteredTags = $derived(
		allTags().filter((tag) => tag.label.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	function toggleTag(tagValue: string) {
		const updatedTags = selectedTags.includes(tagValue)
			? selectedTags.filter((t) => t !== tagValue)
			: [...selectedTags, tagValue];
		onTagChange(updatedTags);
	}

	function handleTagClick(tagValue: string) {
		if (display === 'true') {
			// Placeholder for navigation or other logic
		}
	}
</script>

<div class="tags-container">
	{#if display === 'false' && showSearch}
		<input type="text" bind:value={searchQuery} placeholder="Søk etter tagger..." class="field" />
	{/if}
	<div class="tags-{row_or_grid} size-{size} {showAllTags ? 'show-all' : 'collapsed'}">
		{#each filteredTags as tag}
			<button
				class="tag {display === 'true' ? 'profile' : ''} 
				 {selectedTags.includes(tag.value) && display !== 'true' ? 'selected' : ''}
				 {tagIntent} size-{size}"
				onclick={() => (display === 'true' ? handleTagClick(tag.value) : toggleTag(tag.value))}
				disabled={display === 'true'}
			>
				<span class="label">
					{tag.label}
				</span>
			</button>
		{/each}
	</div>

	{#if filteredTags.length > 0 && !row}
		<button class="toggle-tags" onclick={() => (showAllTags = !showAllTags)}>
			{showAllTags ? 'Vis færre' : 'Vis flere'}
		</button>
	{/if}
</div>

<style>
	.tags-container {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.tags-grid {
		display: grid;
		gap: 0.5rem;
		overflow-y: hidden;
		transition: all 0.3s ease;
		grid-template-rows: repeat(4, auto);
		grid-auto-rows: 0;
		max-height: 135px;
	}
	.tags-grid.size-m {
		/* grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); */
		grid-template-columns: repeat(2, auto);
	}

	.tags-grid.size-s {
		grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
	}

	/* When expanded, show all rows */
	.tags-grid.show-all {
		grid-auto-rows: auto;
		max-height: none;
	}

	/* When collapsed, hide overflow rows */
	.tags-grid.collapsed {
		grid-auto-rows: 0;
		overflow: hidden;
	}

	.tags-row.show-all {
		max-height: none;
	}

	.tags-row {
		display: flex;
		width: 100%;
		justify-content: space-between;
		flex-direction: row;
		gap: 0.5rem;
		overflow-y: hidden;
		transition: all 0.3s ease;
		max-height: 86px;
	}

	.tags-row .tag.size-s {
		padding: 0 1rem;
	}

	.tag {
		border-radius: 999px;
		border: 1px solid #ccc;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.tags-container button {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.tag.grey {
		/* background-color: var(--secondary-very-translucent); */
		/* background-color: var(--secondary-dark-very-translucent); */
		/* background-color: #dedee3; */
		color: #1b1b1f;
		color: black;
		border-color: transparent;
		filter: opacity(80%);
	}

	.tag.grey:hover,
	.tag.grey.selected:hover {
		/* border-color: var(--secondary); */
		background-color: #cacad1;
		--secondary-very-translucent: color-mix(
			in srgb,
			var(--secondary) 20%,
			transparent
		); /* Dynamically derived translucent color */

		background-color: color-mix(
			in srgb,
			var(--secondary) 20%,
			transparent
		); /* Dynamically derived translucent color */

		filter: opacity(100%);
		color: #1b1b1f;
		/* background-color: #cacad1; */
		/* filter: opacity(80%); */
	}

	.tag.grey.selected {
		/* background-color: var(--shadow-inv); */
		/* background-color: color-mix(in srgb, var(--secondary) 20%, transparent) !important; */
		background-color: color-mix(in srgb, var(--secondary-dark) 15%, transparent);
		/* background-color: var(--secondary-very-translucent); */
		background-color: #dedee3;
		/* color: #1b1b1f; */
		/* background-color: #cacad1; */
		border-color: var(--secondary);
		cursor: pointer;
		color: black;
		filter: opacity(100%);
	}

	.tag.size-m {
		/* padding: 0.4rem 0.8rem; */
		padding: 0.25rem 0.5rem;
		/* padding: 0.5rem 0.5rem; */
		min-width: 115px;
	}

	.tag.size-s {
		padding: 0;
	}
	.tag.include,
	.tag.exclude {
		/* border-color: transparent; */
		filter: opacity(85%);
	}
	.tag.include.selected {
		background: #e8f5e9;
		border-color: #4caf50;
		color: black;
		color: #2c4b2e;
		background: #dcefdd;
		filter: opacity(100%);
	}

	.tag.exclude.selected {
		background: #ffebee;
		background: #ffebee8f;
		border-color: #f44336;
		/* border-color: #832121; */
		background: #ffdbe1b2;
		color: black;
		filter: opacity(100%);
	}

	.tag.include:hover {
		/* color: black; */
		/* border-color: #2c4b2e; */
		/* border-color: transparent; */
		/* filter: opacity(100%); */
		/* border-color: #4caf50; */
		/* color: #2c4b2e; */
		/* background-color: #c4dac6; */
		/* filter: opacity(80%); */
		/* background: #e8f5e9; */
		/* border-color: #337536; */
		/* background-color: #cacad1; */
		/* border-color: var(--secondary); */
		/* border-color: #4caf50; */
		filter: opacity(100%);
		/* border-color: #4caf50; */

		/* color: #2c4b2e;
		background-color: #d3ebd5;
		color: #2c4b2e;
		background-color: #c4dac6; */
	}
	.tag.exclude.selected:hover,
	.tag.include.selected:hover {
		/* border-color: var(--secondary); */
		/* border-color: #337435; */
		filter: opacity(80%);
	}
	.tag.exclude:hover {
		/* border-color: #f44336; */
		/* color: black; */
		filter: opacity(100%);
	}

	.toggle-tags {
		align-self: flex-start;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.2rem 0;
	}
</style>
