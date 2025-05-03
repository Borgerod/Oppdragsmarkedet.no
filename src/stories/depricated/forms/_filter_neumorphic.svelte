<script lang="ts">
	// import './form.css';
	// import '../../app.css';
	// import '../../color_scheme.css';
	// import Dropdown from './_Dropdown.svelte';
	// import Tags from './tags.svelte';
	// import Tabs from '../depricated/tabs.svelte';
	// import Accordion from '../depricated/accordion.svelte';
	// import PriceRange from './priceRange.svelte';
	// import Button from '../Button.svelte';
	// import { Drawer } from 'vaul-svelte';

	let {
		areaValue = $bindable(loadFromStorage('areaValue', 'Fylke')),
		municipalityValue = $bindable(loadFromStorage('municipalityValue', 'Kommune')),
		workFieldValue = $bindable(loadFromStorage('workFieldValue', 'Kategori')),
		minAmount = $bindable(loadFromStorage('minAmount', '')),
		maxAmount = $bindable(loadFromStorage('maxAmount', '')),
		fieldIncludeTags = $bindable<string[]>(loadFromStorage('fieldIncludeTags', [])),
		fieldExcludeTags = $bindable<string[]>(loadFromStorage('fieldExcludeTags', [])),
		infoIncludeTags = $bindable<string[]>(loadFromStorage('infoIncludeTags', [])),
		infoExcludeTags = $bindable<string[]>(loadFromStorage('infoExcludeTags', [])),
		onApply
	} = $props();

	// Save filter values to localStorage whenever they change
	$effect(() => {
		if (typeof window !== 'undefined') {
			// Ensure this runs only in the browser
			saveToStorage('areaValue', areaValue);
			saveToStorage('municipalityValue', municipalityValue);
			saveToStorage('workFieldValue', workFieldValue);
			saveToStorage('minAmount', minAmount);
			saveToStorage('maxAmount', maxAmount);
			saveToStorage('fieldIncludeTags', fieldIncludeTags);
			saveToStorage('fieldExcludeTags', fieldExcludeTags);
			saveToStorage('infoIncludeTags', infoIncludeTags);
			saveToStorage('infoExcludeTags', infoExcludeTags);
		}
	});

	function applyFilter() {
		onApply?.({
			fylke: areaValue,
			kommune: municipalityValue,
			kategori: workFieldValue,
			minPris: minAmount,
			maxPris: maxAmount,
			erfaringskrav: {
				include: fieldIncludeTags,
				exclude: fieldExcludeTags
			},
			andreTagger: {
				include: infoIncludeTags,
				exclude: infoExcludeTags
			}
		});
	}

	const resetFilter = () => {
		areaValue = 'Fylke';
		municipalityValue = 'Kommune';
		workFieldValue = 'Kategori';
		minAmount = '';
		maxAmount = '';
		fieldIncludeTags = [];
		fieldExcludeTags = [];
		infoIncludeTags = [];
		infoExcludeTags = [];
	};

	// Utility functions for localStorage
	function loadFromStorage(key: string, defaultValue: any) {
		if (typeof window === 'undefined') return defaultValue; // Return default value during SSR
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : defaultValue;
	}

	function saveToStorage(key: string, value: any) {
		if (typeof window !== 'undefined') {
			// Ensure this runs only in the browser
			localStorage.setItem(key, JSON.stringify(value));
		}
	}
</script>

<div class="filter">
	<div class="filter-top column">
		<div class="drag-indicator"></div>
		<div class="row" style="align-items: center; justify-content: center; position: relative;">
			<h2 style="margin: 0;">Filtrer søket</h2>
			<h2
				style="position: absolute; right: 0; color: var(--accent-medium); cursor: pointer;"
				onclick={resetFilter}
			>
				Nullstill
			</h2>
		</div>
	</div>

	<div class="content">
		<Dropdown data="area" bind:value={areaValue} bind:subValue={municipalityValue} />

		<Dropdown data="work_field" bind:value={workFieldValue} />

		<!-- Original for field tags -->
		<Accordion
			title="Erfaringskrav"
			tooltip="Velg hvilke erfaringer som skal inkluderes eller ekskluderes"
		>
			<Tabs
				includeTags={fieldIncludeTags}
				excludeTags={fieldExcludeTags}
				onIncludeTagsChange={(tags) => (fieldIncludeTags = tags)}
				onExcludeTagsChange={(tags) => (fieldExcludeTags = tags)}
			>
				<div slot="inkluder" let:includeTags let:onIncludeTagsChange>
					<Tags
						tagIntent="include"
						tagType="field"
						display="false"
						selectedTags={includeTags}
						onTagChange={onIncludeTagsChange}
					/>
				</div>
				<div slot="ekskluder" let:excludeTags let:onExcludeTagsChange>
					<Tags
						tagIntent="exclude"
						tagType="field"
						display="false"
						selectedTags={excludeTags}
						onTagChange={onExcludeTagsChange}
					/>
				</div>
			</Tabs>
		</Accordion>

		<!-- Copy for info tags -->
		<Accordion
			title="Andre Tagger"
			tooltip="inkluder eller ekskluder oppdrag som inneholder disse taggene"
		>
			<Tabs
				includeTags={infoIncludeTags}
				excludeTags={infoExcludeTags}
				onIncludeTagsChange={(tags) => (infoIncludeTags = tags)}
				onExcludeTagsChange={(tags) => (infoExcludeTags = tags)}
			>
				<div slot="inkluder" let:includeTags let:onIncludeTagsChange>
					<Tags
						tagIntent="include"
						tagType="info"
						display="false"
						selectedTags={includeTags}
						onTagChange={onIncludeTagsChange}
					/>
				</div>
				<div slot="ekskluder" let:excludeTags let:onExcludeTagsChange>
					<Tags
						tagIntent="exclude"
						tagType="info"
						display="false"
						selectedTags={excludeTags}
						onTagChange={onExcludeTagsChange}
					/>
				</div>
			</Tabs>
		</Accordion>

		<PriceRange bind:minAmount bind:maxAmount />
	</div>

	<div class="filter-bottom">
		<Button neomorphic size="medium" style="true" label="Apply" onClick={applyFilter} />
	</div>
</div>

<style>
	.filter {
		height: 100%;
		border-radius: 1rem 1rem 0 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: transparent;
	}

	.filter .content {
		background-color: transparent;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-content: center;
		row-gap: 2rem;
	}

	.filter-bottom {
		border-top-width: 1px;
		border-top-color: var(--shadow-inv);
		padding: 1rem 2rem;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.filter-top {
		border-bottom-width: 1px;
		border-bottom-color: var(--shadow-inv);
		width: 100%;
		height: 0;
		visibility: hidden;
		padding: 0;
	}

	.drag-indicator {
		visibility: hidden;
		width: 36px;
		height: 5px;
		background-color: #ccc;
		border-radius: 3rem;
		margin: 1rem auto;
		cursor: ns-resize;
	}

	/* DRAWER TEST */
	@media (max-width: 1050px) {
		.filter {
			height: 100%;
		}

		.drag-indicator {
			visibility: visible;
		}

		.filter-top {
			visibility: visible;
			height: 100px;
			padding: 0 1rem 1rem 1rem;
		}

		.filter .content {
			padding: 0 20%;
			overflow-y: auto;
		}
	}
</style>
