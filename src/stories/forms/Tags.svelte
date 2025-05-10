<svelte:options runes />

<script lang="ts">
	import './form.css';
	let searchQuery = $state('');
	let showAllTags = $state(false);

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
	const fieldTags = [
		'asfaltering',
		'brønnboring',
		'drenering',
		'radon',
		'sprenging',
		'graving',
		'gulv',
		'glassarbeid',
		'termografering',
		'betong',
		'vanntetting',
		'taktekking',
		'steinlegger',
		'snørydding',
		'hagestell'
	];

	const jobAttributesTags = [
		'stort_prosjekt',
		'lite_prosjekt',
		'enmannsjobb',
		'flermannsjobb',
		'haster',
		'innejobb',
		'utejobb',
		'trapp',
		'kjøretøy_tilgang'
	];

	const jobPosterTags = ['privat', 'bedrift', 'statlig'];

	const allTags = $derived(() => {
		switch (tagType) {
			case 'field':
				return fieldTags;
			case 'job_attributes':
				return jobAttributesTags;
			case 'job_poster':
				return jobPosterTags;
			default:
				return []; // Ensure to return an empty array for unsupported tag types
		}
	});

	const filteredTags = $derived(
		allTags().filter((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	function toggleTag(tag: string) {
		const updatedTags = selectedTags.includes(tag)
			? selectedTags.filter((t) => t !== tag)
			: [...selectedTags, tag];
		onTagChange(updatedTags);
	}

	function handleTagClick(tag: string) {
		if (display === 'true') {
			// console.log(`Navigating to search with tag: ${tag}`);
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
				 {selectedTags.includes(tag) && display !== 'true' ? 'selected' : ''}
				 {tagIntent} size-{size}"
				onclick={() => (display === 'true' ? handleTagClick(tag) : toggleTag(tag))}
				disabled={display === 'true'}
			>
				<span class="label">
					{tag.replace(/_/g, ' ')}
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
	.tag.grey:hover,
	.tag.grey.selected:hover {
		border-color: var(--secondary);
	}
	.tag.grey.selected {
		background-color: color-mix(in srgb, var(--secondary) 20%, transparent) !important;
		cursor: pointer;
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

	.tag.include.selected {
		background: #e8f5e9;
		border-color: #4caf50;
		color: black;
	}

	.tag.exclude.selected {
		background: #ffebee;
		border-color: #f44336;
		color: black;
	}

	.tag.include:hover {
		border-color: #4caf50;
		color: black;
	}

	.tag.exclude:hover {
		border-color: #f44336;
		color: black;
	}

	.toggle-tags {
		align-self: flex-start;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.2rem 0;
	}
</style>
