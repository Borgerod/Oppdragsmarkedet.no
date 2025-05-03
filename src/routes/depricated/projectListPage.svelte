<script lang="ts">
	import { Drawer } from 'vaul-svelte';

	import ProjectList from '../stories/projectList.svelte';
	import SearchField from '../stories/forms/searchField.svelte';
	// import Filter from "../stories/forms/filter_neumorphic.svelte";
	import Filter from '../stories/forms/filter.svelte';

	// import TestComponent from "./TestComponent.svelte";

	import { Fa } from 'svelte-fa';
	import { faChevronDown, faChevronUp, faXmark } from '@fortawesome/free-solid-svg-icons';
	import Button from '../stories/Button.svelte';

	// let isDropdownOpen = false; // default state (dropdown closed)

	// const handleDropdownClick = () => {
	// 	isDropdownOpen = !isDropdownOpen;
	// };

	// const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
	// 	// Close the dropdown when clicking outside or tabbing out
	// 	if (
	// 		relatedTarget instanceof HTMLElement &&
	// 		currentTarget.contains(relatedTarget)
	// 	) return;

	// 	isDropdownOpen = false;
	// };

	let county = $state(null);
	let kommune = $state(null);
	let kategori = $state(null);
	let erfaringskrav = $state(null);
	let andreTagger = $state(null);
	let pris = $state(null);

	const getFields = () => [
		{
			label: 'County',
			get value() {
				return county;
			}
		},
		{
			label: 'Kommune',
			get value() {
				return kommune;
			}
		},
		{
			label: 'Kategori',
			get value() {
				return kategori;
			}
		},
		{
			label: 'Erfaringskrav',
			get value() {
				return erfaringskrav;
			}
		},
		{
			label: 'Andre Tagger',
			get value() {
				return andreTagger;
			}
		},
		{
			label: 'Pris',
			get value() {
				return pris;
			}
		}
	];

	function getDefaultFilterValueByLabel(label: string) {
		const defaults = [
			{ label: 'county', value: 'Fylke' },
			{ label: 'kommune', value: 'Kommune' },
			{ label: 'kategori', value: 'Kategori' },
			{ label: 'erfaringskrav', value: null },
			{ label: 'andreTagger', value: null },
			{ label: 'pris', value: '' }
		];

		const match = defaults.find((item) => item.label === label);
		return match ? match.value : undefined;
	}

	// Define selectedFilters with municipality as well
	let selectedFilters = {
		county: null,
		kommune: null,
		kategori: null,
		erfaringskrav: null,
		andreTagger: null,
		pris: null
	};

	// Define defaultFilters, including municipality
	const defaultFilters = {
		county: 'Fylke',
		municipality: 'Kommune',
		kategori: 'Kategori',
		erfaringskrav: null,
		andreTagger: null,
		minPris: '',
		maxPris: ''
	};
	// 'Fylke'
	// 'Kommune'
	// 'Kategori'
	// null
	// null
	// ''
	// ''

	// Update the removeFilter function to reset the filter value to its default and ensure the changes are applied
	const removeFilter = (key) => {
		selectedFilters = { ...selectedFilters, [key]: defaultFilters[key] };
		handleApplyFilter(selectedFilters); // Apply the updated filters
	};

	let closeButton;

	function handleApplyFilter(filters) {
		document.getElementById('close-btn')?.click();

		const newSelectedFilters = {};

		for (const key in filters) {
			const value = filters[key];
			const defaultValue = defaultFilters[key];

			// Skip empty or default values
			if (!value || value === defaultValue || (Array.isArray(value) && value.length === 0))
				continue;

			// Handle objects with 'label' (e.g., erfaringskrav, county, kommune)
			if (typeof value === 'object' && value.label) {
				newSelectedFilters[key] = value.label;
			} else if (
				typeof value === 'object' &&
				value !== null &&
				'value' in value &&
				'include' in value &&
				'exclude' in value
			) {
				// Handle include/exclude tags
				if (value.include.length !== 0 || value.exclude.length !== 0) {
					newSelectedFilters[key] = [...(value.include || []), ...(value.exclude || [])];
				}
			} else {
				// Fallback for string or other types
				newSelectedFilters[key] = value;
			}
		}
		selectedFilters = newSelectedFilters;
	}

	// Synchronize selectedFilters with the Filter component
	function handleFilterChange(updatedFilters) {
		selectedFilters = { ...selectedFilters, ...updatedFilters };
	}

	//DRAWER BUTTON
	let isOpen = false;

	function toggleDrawer() {
		isOpen = !isOpen;
		// document.body.style.overflow = isOpen ? 'hidden' : ''; // Disable/enable scrollbar
	}

	// Drawer resizing
	let drawerHeight = 95; // Initial height in vh

	function handleResizeStart(event) {
		const startY = event.clientY;
		const startHeight = drawerHeight;

		function onMouseMove(e) {
			const deltaY = startY - e.clientY;
			drawerHeight = Math.min(95, Math.max(20, startHeight + (deltaY / window.innerHeight) * 100));
		}

		function onMouseUp() {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
		}

		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	}

	function saveSearch() {
		// todo make this, when profiles are in order.
	}

	console.log(selectedFilters.kategori);
</script>

<SearchField></SearchField>

<!-- 
filter-heade: is a semi part of header
Located between searchfield and searchresult, 
	is the header that contains a list of tags of all the filter changes made, e.g.: 
		'include:flermannsjobb' 'price:10.000-30.000' 'kategory:Eletriker'
	but also buttons like:
		'save search', 'sort by dropdown', 'list/grid view', 'map view', 'breadcrumbs', 'search result counter' 'info button'.
 -->

<div class="page-container">
	<div class="filter-header">
		<!-- also split into left and right side -->
		<div class="leftside">
			<div class="category-path">
				<span>
					{selectedFilters.kategori ? `Oppdrag / ${selectedFilters.kategori}` : ''}
				</span>
			</div>

			<div class="filter-button-container">
				<div class="filter-button">
					<!-- <Button label="{isOpen ? 'Close' : 'Open'} Filter" icon="" onClick={toggleDrawer}/> -->
					<Drawer.Root>
						<Drawer.Trigger><Button rounded size="small" label="Filter" /></Drawer.Trigger>
						<Drawer.Portal>
							<!-- <Drawer.Overlay/>
					
					<Drawer.Content
					class="fixed bottom-0 left-0 right-0 mt-24 flex h-[96%] flex-col rounded-t-[10px] bg-zinc-100"
					> -->
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
								<!-- <Drawer.Close bind:this={closeButton} /> -->
								<Drawer.Close id="close-btn" />

								<Filter
									onApply={handleApplyFilter}
									bind:selectedFilters
									on:change={handleFilterChange}
								/>
							</Drawer.Content>
						</Drawer.Portal>
					</Drawer.Root>
				</div>
				<Button primary size="small" label="Fjern alle filtre" onClick={saveSearch} />
			</div>
			<div class="save-button">
				<!-- will save the search to your profile -->
				<Button rounded size="large" label="Lagre Søk" onClick={saveSearch} />
				<!-- TEMP alternative button -->
				<!-- <Button rounded neomorphic size="large" style=true label="Lagre Søk" onClick={saveSearch}/>  -->
			</div>
		</div>

		<div class="rightside">
			<!-- <div class="filter-tags">
		{#each Object.entries(selectedFilters) as [key, value]}
		{#if value && value !== defaultFilters[key]} 
		<div class="tag">
			<div class="tag container">
				<span>{value}</span>
			</div>
		<div class="tag icon-container" on:click={() => removeFilter(key)} >
			<Fa icon={faXmark} />
			</div>
		</div>
		{/if}
		{/each}
	</div> -->

			<div class="filter-tags">
				{#each getFields() as tag}
					{console.log(tag)}
					{console.log(tag.label)}
					{console.log(tag.value)}
					<!-- {#if tag.value && tag.value !== getDefaultFilterValueByLabel(tag.label)}  -->
					<div class="tag">
						<div class="tag container">
							<span>{tag.value}</span>
						</div>
						<!-- temporarly disabled-->
						<!-- <div class="tag icon-container" on:click={() => removeFilter(tag.label)} ><Fa icon={faXmark} /></div> -->
					</div>
					<!-- {/if} -->
				{/each}
			</div>
		</div>
	</div>
</div>

<!--  
	content / page-container: the page's content, 
		split into two parts; left (filter-container) and right (list-container).
-->
<div class="content page-container">
	<!-- 
		filter-container: contains the Filter (aka advanced search) which [along with searchfield (simple search) decides what ProjectList should contain]
			the container will be replaced wiht a filter button and a drawer after a certain window size. 
	-->
	<!-- TODO: remove old filter functionality -->
	<div class="filter-container">
		<Filter onApply={handleApplyFilter} bind:selectedFilters on:change={handleFilterChange} />
	</div>

	<!-- 
		list-container: The search result of projects (ProjectList)
	-->
	<div class="list-container">
		<ProjectList></ProjectList>
	</div>
</div>

<div>
	<div>12345</div>
	<div>click me</div>
</div>

<style>
	/* filter header */
	.filter-header {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.filter-button-container {
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	.category-path {
		width: 100%;
	}

	.leftside {
		min-width: 270px;
		max-width: 490px;
		width: 100%;
		row-gap: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: left;
		align-content: flex-start;
	}

	.rightside {
		min-width: 690px;
		max-width: 900px;
		width: 100%;
		margin: 1rem;
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 1050px) {
		.content {
			padding: 0;
		}

		.filter-header {
			justify-content: flex-start;
		}
		.rightside {
			min-width: 0;
			margin: 0;
			width: initial;
		}
		.leftside {
			width: initial;
		}
	}

	/* Hides left filter when small screen */
	@media (max-width: 1050px) {
		.filter-container {
			visibility: hidden;
			position: fixed;
			transform: translateX(-100rem);
		}
		/* .drawer {
		visibility: hidden;
		position: fixed;
		transform: translateY(100%); 
	} */
	}

	/* removing margin while on product list */
	:global(main) {
		margin: 0rem !important;
		padding: 0rem 4rem !important;
		padding: 0rem !important;
	}

	.list-container {
		display: flex;
	}

	.page-container {
		padding: 0 2rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	li {
		color: grey;
	}

	li:hover {
		color: rgb(166, 226, 126);
	}

	.dropdown {
		color: grey;
		display: flex;
		align-items: center;
		justify-content: space-around;
		justify-content: space-between;
		padding: 0 1rem;
		height: 3rem;
		border-color: grey;
		border-radius: 1rem;
		border-width: 1px;
	}

	/* parent container */
	.content {
		flex: 1;
		height: 100%;
		flex-direction: row;
		display: flex;
	}

	.leftside Button {
		margin: 0rem;
	}

	.filter-button {
		visibility: hidden;
		width: 0;
		z-index: -1;
	}

	@media (max-width: 1050px) {
		.filter-button-container {
			column-gap: 0.5rem;
		}

		.filter-button {
			visibility: visible;
			width: initial;
			z-index: 0;
		}
	}

	.save-button {
		margin: 0;
		width: 100%;
	}

	.filter-tags {
		padding: 0 1rem;
	}

	.filter-tags .tag {
		padding: 0;
	}

	/* filter TAGS */
	.tag.container {
		padding: 0.25rem 0rem 0.25rem 0.5rem;
		border-radius: 1rem 0rem 0rem 1rem;
		height: 100%;
		width: 100%;
	}

	.tag.icon-container {
		border-radius: 0rem 1rem 1rem 0rem;
		padding: 0.25rem 0.5rem 0.25rem 0.25rem;
		height: inherit;
		height: 100%;
		width: 100%;
	}

	.tag.icon-container:hover {
		background-color: var(--shadow-inv);
		fill: var(--primary);
	}

	.tag.container:hover {
		background-color: var(--shadow-inv);
		color: var(--primary);
	}
	.tag.icon-container:hover :global(svg) {
		color: var(--primary);
	}

	.filter-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.tag {
		display: flex;
		align-items: center;
		border-radius: 1rem;
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
		background-color: var(--primary-invert);
		color: var(--secondary);
		color: var(--secondary-darker);
		background: #adadad;
	}

	.tag span {
		margin-right: 0.5rem;
	}

	/* right side */
	.result-list {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		width: max-content;
	}
</style>
