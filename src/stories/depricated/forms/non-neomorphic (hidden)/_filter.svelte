<script lang="ts">
	// import Dropdown from '../_Dropdown.sveltee';
	// import Tags from '../tags.svelte';
	// import Tabs from '../../depricated/tabs.svelte';
	// import Accordion from './accordion.svelte';
	// // import Accordion from "../accordion.svelte";
	// import PriceRange from '../priceRange.svelte';
	// import Button from '../../Button.svelte';

	let fieldIncludeTags = $state<string[]>([]);
	let fieldExcludeTags = $state<string[]>([]);
	let infoIncludeTags = $state<string[]>([]);
	let infoExcludeTags = $state<string[]>([]);

	function applyFilter() {
		console.log('Filter Values:');
		console.log('Min Amount:', minAmount);
		console.log('Max Amount:', maxAmount);
		console.log('Field Include Tags:', fieldIncludeTags);
		console.log('Field Exclude Tags:', fieldExcludeTags);
		console.log('Info Include Tags:', infoIncludeTags);
		console.log('Info Exclude Tags:', infoExcludeTags);
		console.log('Filter Value:', filterValue);
	}

	let minAmount = $state('');
	let maxAmount = $state('');

	let filterValue = [minAmount, maxAmount]; // Child's state
</script>

<!-- <input bind:value={filterValue} on:input={handleInput} /> -->
<div class="filter">
	<Dropdown data="area" />
	<Dropdown data="work_field" />

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

	<Button neomorphic size="medium" style="true" label="Apply" onClick={applyFilter} />
	<!-- <Button neomorphic size="medium" style=true label="Apply" onClick={()=>console.log("Clicked")}/> -->
	<!-- <input bind:value={filterValue} on:input={handleInput} /> -->
</div>

<style>
	.field {
		color: grey;
		background: #f7f7f7;
		border: 1px solid #b1b1b1;
		box-sizing: border-box;
		border-radius: 8px;
		padding: 0 1rem;
		width: 100%;
		height: 48px;
	}

	.dropdown {
		-webkit-appearance: none;
		appearance: none;
		-moz-appearance: none;
		background-image: url('https://www.svgrepo.com/show/80156/down-arrow.svg');
		background-repeat: no-repeat;
		background-size: 14px 14px;
		background-position: calc(100% - 16px);
	}
</style>
