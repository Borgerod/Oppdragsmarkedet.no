<svelte:options runes />

<script lang="ts">
	// import { Drawer } from 'vaul-svelte';
	// import Drawer from '../stories/Drawer.svelte';
	import ProjectList from '../stories/ProjectList.svelte';
	import '../stories/button.css';
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

	// @ts-ignore
	import Filter from '../stories/Filter.svelte';
	import Button from '../stories/Button.svelte';
	import './ProjectListPage.css';
	import DropDown from '../stories/forms/DropDown.svelte';
	import MapView from '../stories/MapView.svelte';
	import { onMount } from 'svelte';

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
		name: string;
		county: string;
		workfield: string;
		price_min: string;
		price_max: string;
		field_include: string[];
		field_exclude: string[];
		job_attributes_include: string[];
		job_attributes_exclude: string[];
		job_poster: string[];
		[key: string]: string | string[];
	};

	const INITIAL_VALUES: FilterData = {
		name: '',
		county: '',
		workfield: '',
		price_min: '',
		price_max: '',
		field_include: [],
		field_exclude: [],
		job_attributes_include: [],
		job_attributes_exclude: [],
		job_poster: []
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

	function handleApply() {
		displayedData = {
			...filterData,
			field_include: [...filterData.field_include],
			field_exclude: [...filterData.field_exclude],
			job_attributes_include: [...filterData.job_attributes_include],
			job_attributes_exclude: [...filterData.job_attributes_exclude],
			job_poster: [...filterData.job_poster]
		};
		showResults = true;
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
			if (key === 'price_min' || key === 'price_max') {
				filterData.price_min = INITIAL_VALUES.price_min;
				filterData.price_max = INITIAL_VALUES.price_max;
				displayedData.price_min = INITIAL_VALUES.price_min;
				displayedData.price_max = INITIAL_VALUES.price_max;
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
						if (key === 'price_min' || key === 'price_max') {
							return arr.findIndex(([k]) => k === 'price_min') === index;
						}
						return true;
					})
					.map(([key]) => key)
			: []
	);
	function formatPriceRange(price_min: string, price_max: string) {
		const hasMin = price_min != null && price_min !== '';
		const hasMax = price_max != null && price_max !== '';

		const numMin = parseFloat(price_min);
		const numMax = parseFloat(price_max);

		if (hasMin && (!hasMax || numMin > numMax)) {
			return `${price_min} <`;
		}

		if (!hasMin && hasMax) {
			return `< ${price_max}`;
		}

		if (hasMin && hasMax) {
			return `${price_min} - ${price_max}`;
		}

		return null; // or '' if you prefer
	}

	function saveSearch() {
		// TEMP PLACEHOLDER
		// todo make this, when profiles are in order.
	}

	function handleGrid() {
		grid = !grid;
		DisplaySettings.gridView = grid;
		// console.log('in ProjectListPage, gridView:', DisplaySettings.gridView);
	}
</script>

<div class="project-list-page">
	<!-- TEMP START -->
	<!-- <div class="filter-button-container">
		<div class="filter-button">
			<Drawer.Root>
				<Drawer.Trigger
					><Button
						rounded
						size="small"
						label="Filter"
						onclick="Drawer.Trigger will handle the onclick"
					/></Drawer.Trigger
				>
				<Drawer.Portal>
					<Drawer.Overlay class="fixed inset-0 bg-black/40" />
					<Drawer.Content
						class="
			fixed
			right-0 
			bottom-0 
			left-0 
			mt-24 
			flex 
			h-[95%] 
			flex-col 
			rounded-t-[10px] 
			bg-zinc-100"
					>
						<Drawer.Close id="close-btn" />
						<Filter {filterData} onApply={handleApply} />
					</Drawer.Content>
				</Drawer.Portal>
			</Drawer.Root>
		</div>
	</div> -->
	<!-- TEMP /END -->

	<!-- TEMP: test -->
	<!-- <Drawer content={{ component: Filter, props: { filterData, onApply: handleApply } }} /> -->
	<!-- <Drawer /> -->

	<!-- TEMP: /test -->
	<!-- LEFTSIDE -->
	<div class="leftside">
		<!-- HEADER LEFT -->
		<div class="filter-header">
			<div class="category-path">
				<span>
					<!-- todo: make this path consist of links -->
					{displayedData.workfield ? `Oppdrag / ${displayedData.workfield}` : 'Oppdrag / '}
				</span>
			</div>

			<div class="save-button">
				<!-- <Button rounded size="small" label="Lagre Søk" onclick={saveSearch} /> -->
				<!-- <button
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
				</button> -->
			</div>
		</div>

		<!-- FILTER -->
		<Filter {filterData} onApply={handleApply} {resetAll} />
	</div>

	<!-- RIGHTSIDE -->
	<div class="rightside">
		<!-- HEADER RIGHT -->
		<div class="filter-header">
			<div class="filter-tag-row">
				<!-- FILTER DRAWER BUTTON -->
				<Filter {filterData} onApply={handleApply} drawer {resetAll} />
				<!-- RESET BUTTON -->
				<Button rounded size="small" label="Nullstill" onclick={resetAll} />
				<!-- FILTER TAGS -->
				<!-- TODO: seperate into component -->
				{#if showResults}
					<div class="filter-tags">
						<!-- Price Range -->
						{#if displayedData.price_min || displayedData.price_max}
							<div class="filter-tag grey">
								<button class="tag-left">
									<span>{formatPriceRange(displayedData.price_min, displayedData.price_max)}</span>
								</button>
								<button
									onclick={() => {
										filterData.price_min = INITIAL_VALUES.price_min;
										filterData.price_max = INITIAL_VALUES.price_max;
										handleApply();
									}}
									class="tag-right"
								>
									×
								</button>
							</div>
						{/if}

						<!-- Other Filters -->
						{#each ['job_poster', 'field_include', 'field_exclude', 'job_attributes_include', 'job_attributes_exclude'] as arrayKey}
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
											handleApply();
										}}
										class="tag-right"
									>
										×
									</button>
								</div>
							{/each}
						{/each}

						{#each Object.entries(displayedData) as [key, value]}
							{#if !['job_poster', 'field_include', 'field_exclude', 'job_attributes_include', 'job_attributes_exclude', 'price_min', 'price_max'].includes(key)}
								{#if Array.isArray(value) && value.length > 0}
									<!-- Array filters (job_poster) -->
									{#each value as item}
										<div class="filter-tag grey">
											<button class="tag-left">
												<span>{item}</span>
											</button>
											<button
												onclick={() => {
													handleApply();
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
												handleApply();
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
					<!-- <Button rounded size="small" label="Lagre Søk" onclick={saveSearch} /> -->
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
				<!-- <Button rounded size="small" label={'[icon], Vis på kart'} /> -->
				<!-- show on map  -->
				<div class="display-settings-row">
					<!-- Sort by.. select  -->
					<!-- <span> Sorter etter </span> -->
					<DropDown bind:value={DisplaySettings.sortBy} type="sortby" />
				</div>

				<!--   -->
			</div>
		</div>

		<!-- FILTER DISPLAY -->
		{#if showResults}
			<div class="results">
				<p>Filter Results:</p>
				{#each activeFilterTags as key}
					<div class="">
						<span>
							{#if key === 'price_min'}
								{#if formatPriceRange(displayedData.price_min, displayedData.price_max)}
									Price: {formatPriceRange(displayedData.price_min, displayedData.price_max)}
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
		</div>

		<ProjectList gridView={DisplaySettings.gridView} sortBy={DisplaySettings.sortBy} />
	</div>
</div>

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
</style>
