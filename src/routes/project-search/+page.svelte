<svelte:options runes />

<script lang="ts">
	// import { Drawer } from 'vaul-svelte';
	// import Drawer from '../stories/Drawer.svelte';
	//ts ignore
	import ProjectList from '@stories/ProjectList.svelte';
	import '@stories/button.css';
	import { Fa } from 'svelte-fa';
	import {
		faThLarge,
		faList,
		faSquare,
		faGrip,
		faTableCells,
		faTh,
		faMapLocation,
		faBookBookmark
	} from '@fortawesome/free-solid-svg-icons';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	// @ts-ignore
	import Filter from '@stories/Filter.svelte';
	// @ts-ignore
	import Button from '@stories/Button.svelte';
	import './ProjectListPage.css';
	// @ts-ignore
	import DropDown from '@stories/forms/DropDown.svelte';
	// @ts-ignore
	import MapView from '@stories/MapView.svelte';
	import { onMount } from 'svelte';

	const pageData = $props<{ data: any }>();
	let data = $state({ projects: pageData.data.projects || [] });

	// >test-area
	// let filteredData = $state();
	let isFiltered = $state(false);
	let displayedProjects = $state(data.projects);
	// >test-area

	type DisplaySettings = {
		sortBy: string;
		gridView: boolean;
	};

	const INITIAL_LIST_VALUES: DisplaySettings = {
		sortBy: 'Mest relevant',
		gridView: false // shows either list og grid view
	};

	let DisplaySettings = $state({ ...INITIAL_LIST_VALUES });
	type FilterData = {
		textSearch: string;
		location: string;
		category: string;
		budget_min: string;
		budget_max: string;
		currency: string;
		experienceRequirements_include: string[];
		experienceRequirements_exclude: string[];
		jobAttributes_include: string[];
		jobAttributes_exclude: string[];
		clientRole: string[];
		[key: string]: string | string[];
	};

	const INITIAL_VALUES: FilterData = {
		textSearch: '',
		location: ',,',
		category: '',
		budget_min: '',
		budget_max: '',
		currency: 'NOK', // > PLACEHOLDER
		experienceRequirements_include: [],
		experienceRequirements_exclude: [],
		jobAttributes_include: [],
		jobAttributes_exclude: [],
		clientRole: []
	};

	const mapViewBaseLink = 'https://oppdragsmarkedet.no/';
	let grid = $state(INITIAL_LIST_VALUES.gridView); // Initialize with boolean value
	let filterData = $state({ ...INITIAL_VALUES });
	let displayedData = $state({ ...INITIAL_VALUES });
	let showResults = $state(false);
	let currentUrl = '';

	// Get the current URL when component mounts
	onMount(() => {
		// Get the current URL when component is mounted
		if (typeof window !== 'undefined') {
			currentUrl = window.location.href;
		}
	});

	function linkBuilderMapView() {
		// map view redirect; builds link for mapView then returns it.

		// Use current URL as base, but fallback to mapViewBaseLink if not available
		const baseUrl = currentUrl || mapViewBaseLink;

		// Add map view parameters to URL
		const mapParams = new URLSearchParams();

		// Add filter parameters to map view URL if they exist
		Object.entries(displayedData).forEach(([key, value]) => {
			if (Array.isArray(value) && value.length > 0) {
				mapParams.append(key, value.join(','));
			} else if (value && value !== INITIAL_VALUES[key]) {
				mapParams.append(key, String(value));
			}
		});

		const redirectLink = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}view=map&${mapParams.toString()}`;
		return redirectLink;
	}

	function resetAll() {
		filterData = structuredClone(INITIAL_VALUES);
		displayedData = structuredClone(INITIAL_VALUES);
		showResults = false;
	}

	function resetFilter(key: keyof FilterData, tag: string) {
		// Handle array-based filters
		if (Array.isArray(filterData[key])) {
			filterData[key] = filterData[key].filter((t) => t !== tag);
			displayedData[key] = []; // Clear the displayed data completely

			// If there are remaining items in filterData[key], update displayedData
			if (filterData[key].length > 0) {
				displayedData[key] = [...filterData[key]];
			}
		}
		// Handle single-value filters
		else {
			filterData[key] = INITIAL_VALUES[key];
			displayedData[key] = INITIAL_VALUES[key];

			// Special handling for price range
			if (key === 'budget_min' || key === 'budget_max') {
				filterData.budget_min = INITIAL_VALUES.budget_min;
				filterData.budget_max = INITIAL_VALUES.budget_max;
				displayedData.budget_min = INITIAL_VALUES.budget_min;
				displayedData.budget_max = INITIAL_VALUES.budget_max;
			}
		}
	}

	const activeFilterTags = $derived(
		showResults
			? Object.entries(displayedData)
					.filter(([key, value]) => {
						const initial = INITIAL_VALUES[key];
						// Handle array comparisons properly
						if (Array.isArray(value)) {
							return value.length > 0;
						}
						return value !== initial;
					})
					.filter(([key], index, arr) => {
						if (key === 'budget_min' || key === 'budget_max') {
							return arr.findIndex(([k]) => k === 'budget_min') === index;
						}
						return true;
					})
					.map(([key]) => key)
			: []
	);
	function formatPriceRange(budget_min: string, budget_max: string) {
		const hasMin = budget_min != null && budget_min !== '';
		const hasMax = budget_max != null && budget_max !== '';

		const numMin = parseFloat(budget_min);
		const numMax = parseFloat(budget_max);

		if (hasMin && (!hasMax || numMin > numMax)) {
			return `${budget_min} <`;
		}

		if (!hasMin && hasMax) {
			return `< ${budget_max}`;
		}

		if (hasMin && hasMax) {
			return `${budget_min} - ${budget_max}`;
		}

		return null; // or '' if you prefer
	}

	function saveSearch() {
		// TEMP PLACEHOLDER
		// TODO [ ]: make this, when profiles are in order.
	}
	function handleGrid() {
		grid = !grid;
		DisplaySettings.gridView = grid;
		// console.log('in ProjectListPage, gridView:', DisplaySettings.gridView);
	}
	// Helper function to parse location string into individual parts
	function parseLocationString(locationString: string): string[] {
		if (!locationString) return [];
		return locationString
			.split(',')
			.map((part) => part.trim())
			.filter((part) => part !== '' && part.length > 0);
	} // Helper function to handle location tag removal with hierarchical closing
	function handleLocationTagRemoval(tagToRemove: string) {
		const locationString = filterData.location || '';
		const parts = locationString.split(',').map((part) => part.trim());

		// The format is: cityArea,city,county (sentrum,kristiansand,agder)
		// Find which position this tag is in
		const tagIndex = parts.indexOf(tagToRemove);

		if (tagIndex !== -1) {
			// Hierarchical closing logic:
			// - Closing city-area (index 0): only clear city-area
			// - Closing city (index 1): clear city and city-area
			// - Closing county (index 2): clear county, city, and city-area

			if (tagIndex === 0) {
				// Closing city-area: only clear position 0
				parts[0] = '';
			} else if (tagIndex === 1) {
				// Closing city: clear city (1) and city-area (0)
				parts[1] = '';
				parts[0] = '';
			} else if (tagIndex === 2) {
				// Closing county: clear all
				parts[2] = '';
				parts[1] = '';
				parts[0] = '';
			}

			// Rebuild the location string
			filterData.location = parts.join(',');
			onApply();
		}
	}

	// console.log('PROJECTS: ', data.projects);
	// console.log('^ PROJECTS ^');

	let form: HTMLFormElement;
	let isSubmitting = $state(false);

	const submitFilter: SubmitFunction = ({ formData }) => {
		isSubmitting = true;

		// Add all filter data to formData
		Object.entries(filterData).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				value.forEach((item) => {
					formData.append(key, item);
				});
			} else if (value !== INITIAL_VALUES[key]) {
				formData.append(key, value.toString());
			}
		});

		return async ({ result, update }) => {
			isSubmitting = false;

			if (result.type === 'success' && result.data) {
				console.log('result: ', result);
				console.log('data: ', result.data);
				// Update projects with filtered results
				data.projects = result.data.projects;
				displayedProjects = result.data.projects;

				console.log('Filter applied successfully:', result.data.projects.length, 'projects found');

				console.log('data.projects: ', data.projects);
				console.log('displayedProjects: ', displayedProjects);
			} else if (result.type === 'failure') {
				console.error('Failed to apply filter:', result.data?.message);
			}

			await update();
		};
	};

	function onApply() {
		displayedData = {
			...filterData,
			experienceRequirements_include: [...filterData.experienceRequirements_include],
			experienceRequirements_exclude: [...filterData.experienceRequirements_exclude],
			jobAttributes_include: [...filterData.jobAttributes_include],
			jobAttributes_exclude: [...filterData.jobAttributes_exclude],
			clientRole: [...filterData.clientRole]
		};

		showResults = true;

		// Submit the form
		if (form) {
			form.requestSubmit();
		}
	}
</script>

<div class="project-list-page">
	<!-- LEFTSIDE -->
	<div class="leftside">
		<!-- HEADER LEFT -->
		<div class="filter-header">
			<div class="category-path">
				<span>
					<!-- TODO [ ]: make this path consist of links -->
					{displayedData.category ? `Oppdrag / ${displayedData.category}` : 'Oppdrag / '}
				</span>
			</div>

			<div class="save-button"></div>
		</div>
		<!-- FILTER -->
		<!-- <Filter {filterData} {onApply} {resetAll} /> -->
		<Filter {filterData} {onApply} {resetAll} />
	</div>

	<!-- RIGHTSIDE -->
	<div class="rightside">
		<!-- HEADER RIGHT -->
		<div class="filter-header">
			<div class="filter-tag-row">
				<!-- FILTER DRAWER BUTTON -->
				<Filter {filterData} {onApply} drawer {resetAll} />
				<!-- RESET BUTTON -->
				<Button rounded size="small" label="Nullstill" onclick={resetAll} />
				<!-- FILTER TAGS -->
				<!-- TODO [ ]: seperate into component -->
				{#if showResults}
					<div class="filter-tags">
						<!-- Price Range -->
						{#if displayedData.budget_min || displayedData.budget_max}
							<div class="filter-tag grey">
								<button class="tag-left">
									<span>{formatPriceRange(displayedData.budget_min, displayedData.budget_max)}</span
									>
								</button>
								<button
									onclick={() => {
										filterData.budget_min = INITIAL_VALUES.budget_min;
										filterData.budget_max = INITIAL_VALUES.budget_max;
										onApply();
									}}
									class="tag-right"
								>
									×
								</button>
							</div>
						{/if}

						<!-- Location Tags -->
						{#each parseLocationString(displayedData.location) as locationTag}
							<div class="filter-tag grey">
								<button class="tag-left">
									<span>{locationTag}</span>
								</button>
								<button onclick={() => handleLocationTagRemoval(locationTag)} class="tag-right">
									×
								</button>
							</div>
						{/each}

						<!-- Other Filters -->
						{#each ['clientRole', 'experienceRequirements_include', 'experienceRequirements_exclude', 'jobAttributes_include', 'jobAttributes_exclude'] as arrayKey}
							{#each displayedData[arrayKey] as tag}
								<div
									class="filter-tag {arrayKey.includes('include')
										? 'include'
										: arrayKey.includes('exclude')
											? 'exclude'
											: 'grey'}"
								>
									<button class="tag-left">
										<span>{tag.replace(/_/g, ' ')}</span>
									</button>
									<button
										onclick={() => {
											if (Array.isArray(filterData[arrayKey])) {
												filterData[arrayKey] = filterData[arrayKey].filter((t) => t !== tag);
											}
											onApply();
										}}
										class="tag-right"
									>
										×
									</button>
								</div>
							{/each}
						{/each}
						{#each Object.entries(displayedData) as [key, value]}
							{#if !['clientRole', 'experienceRequirements_include', 'experienceRequirements_exclude', 'jobAttributes_include', 'jobAttributes_exclude', 'budget_min', 'budget_max', 'location'].includes(key)}
								{#if Array.isArray(value) && value.length > 0}
									<!-- Array filters (clientRole) -->
									{#each value as item}
										<div class="filter-tag grey">
											<button class="tag-left">
												<span>{item}</span>
											</button>
											<button
												onclick={() => {
													onApply();
												}}
												class="tag-right"
											>
												×
											</button>
										</div>
									{/each}
								{:else if value !== INITIAL_VALUES[key]}
									<!-- Single value filters -->
									<div class="filter-tag grey">
										<button class="tag-left">
											<span>{value}</span>
										</button>
										<button
											onclick={() => {
												filterData[key] = INITIAL_VALUES[key];
												onApply();
											}}
											class="tag-right"
										>
											×
										</button>
									</div>
								{/if}
							{/if}
						{/each}
					</div>
				{/if}
			</div>

			<div class="search-summary-row"></div>

			<div class="display-settings-row">
				<!-- ? should these values be added to filterData or should it be a seperate dataset  -->
				<div class="display-settings-row-left">
					<!-- list / grid display  -->
					<button
						class="storybook-button--rounded storybook-button--secondary storybook-button grid-icon-container"
						onclick={handleGrid}
					>
						{#if grid}
							<Fa size="lg" icon={faList} />
						{:else}
							<div class="grid-icon">
								<Fa size="lg" icon={faSquare} />
								<Fa size="lg" icon={faSquare} />
								<Fa size="lg" icon={faSquare} />
								<Fa size="lg" icon={faSquare} />
							</div>
						{/if}
					</button>
					<!-- map display -->
					<MapView {displayedData} initialValues={INITIAL_VALUES} {mapViewBaseLink} />
					<button
						onclick={saveSearch}
						class="
	storybook-button--rounded
	storybook-button--secondary
	storybook-button
	storybook-button--small
	storybook-button--icon-text
	"
						><i class="fa-regular fa-bookmark"></i>
						<span> Lagre søk </span>
					</button>
				</div>
				<!-- show on map  -->
				<div class="display-settings-row">
					<!-- Sort by.. select  -->
					<DropDown bind:value={DisplaySettings.sortBy} type="sortby" />
				</div>
			</div>
		</div>
		<!-- {#if isFiltered}
			displayedProjects={data.projects}
		{:else}
			displayedProjects={filteredData}
		{/if} -->
		<ProjectList
			gridView={DisplaySettings.gridView}
			sortBy={DisplaySettings.sortBy}
			projects={displayedProjects}
		/>

		<!-- FILTER DISPLAY -->

		<!-- Raw Filter Data Display Section -->
		<!-- > FOR TESTING: FILTER -->
		<!-- {#if showResults}
			<div class="filter-data-display">
				<h3>Filter Data (Raw):</h3>
				<pre>{JSON.stringify(filterData, null, 2)}</pre>
			</div>

			<div class="results">
				<p>Filter Results:</p>
				{#each activeFilterTags as key}
					<div class="">
						<span>
							{#if key === 'price_min'}
								{#if formatPriceRange(String(displayedData.price_min), String(displayedData.price_max))}
									Price: {formatPriceRange(
										String(displayedData.price_min),
										String(displayedData.price_max)
									)}
								{/if}
							{:else if displayedData[key]}
								{key.charAt(0).toUpperCase() + key.slice(1)}: {displayedData[key]}
							{/if}
						</span>
					</div>
				{/each}
			</div>
		{/if}
		<div class="results">
			<p>List Settings:</p>
			{#each Object.entries(DisplaySettings) as [key, value]}
				<div class="">
					<span>
						{key.charAt(0).toUpperCase() + key.slice(1)}: {value}
					</span>
				</div>
			{/each}
		</div> -->
	</div>
</div>
<form
	bind:this={form}
	method="POST"
	action="?/filterProjects"
	use:enhance={submitFilter}
	style="display: none;"
></form>

<style>
	/* .project-list-page {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
	} */

	.display-settings-row-left {
		display: flex;
		column-gap: 0.5rem;
	}

	.display-settings-row {
		display: flex;
		flex-direction: row;
		column-gap: 0.5rem;
		justify-content: space-between;
		align-items: center;
	}
	.display-settings-row span {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: flex-end;
	}
	.grid-icon-container {
		padding: 10px;
		width: 42px;
		height: 42px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.grid-icon {
		overflow: hidden;
		display: grid;
		align-items: center;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		column-gap: 3px;
		row-gap: 2px;
	}

	/* Add styles for list icon */
	:global(.grid-icon-container > .fa-list) {
		width: 22px;
		height: 22px;
	}

	.grid-icon :global(svg) {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	/* New styles for filter data display */
	.filter-data-display {
		margin: 1rem 0;
		padding: 1rem;
		background-color: #f8f9fa;
		border-radius: 0.5rem;
		border: 1px solid #e9ecef;
	}

	.filter-data-display h3 {
		margin-top: 0;
		margin-bottom: 0.5rem;
		font-size: 1.1rem;
		color: #343a40;
	}

	.filter-data-display pre {
		margin: 0;
		white-space: pre-wrap;
		font-family: monospace;
		font-size: 0.9rem;
		background-color: #ffffff;
		padding: 0.75rem;
		border-radius: 0.25rem;
		border: 1px solid #ced4da;
		overflow: auto;
		max-height: 300px;
	}
</style>
