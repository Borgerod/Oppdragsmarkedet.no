<svelte:options runes />

<script lang="ts">
	import './form.css';
	import {
		counties,
		getCitiesForCounty,
		getCityAreasForCity,
		workfields,
		categories,
		sortby
	} from '$lib/data/DropDownOptions';

	let {
		value = $bindable(''),
		type = 'county',
		options = [],
		label = '',
		parent = '', // Parent value (county for city, city for city-area)
		...props
	} = $props();

	let isOpen = $state(false); // Track dropdown open state

	$effect(() => {
		if (type === 'county') {
			options = counties;
		} else if (type === 'city') {
			// Filter cities based on selected county
			options = parent ? getCitiesForCounty(parent) : [];
		} else if (type === 'city-area') {
			// Filter city areas based on selected city
			options = parent ? getCityAreasForCity(parent) : [];
		} else if (type === 'workfield') {
			options = workfields;
		} else if (type === 'category') {
			options = categories;
		} else if (type === 'sortby') {
			options = sortby;
		}
	});

	// Toggle open state when select is clicked or when focus changes
	function handleClick() {
		isOpen = !isOpen;
	}

	// Handle when dropdown loses focus
	function handleBlur() {
		// Small delay to allow for option selection before closing
		setTimeout(() => {
			isOpen = false;
		}, 150);
	}
</script>

<div class="select-wrapper">
	<select bind:value class="field dropdown" onclick={handleClick} onblur={handleBlur}>
		<option value="" disabled selected hidden>
			{#if type === 'county'}
				{label || 'Velg fylke'}
			{:else if type === 'city'}
				{label || 'Velg by'}
			{:else if type === 'city-area'}
				{label || 'Velg område'}
			{:else if type === 'workfield'}
				{label || 'Velg fagfelt'}
			{:else}
				{label || 'Velg'}
			{/if}
		</option>
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
	<div class="chevron" class:open={isOpen}></div>
</div>

<style>
	.select-wrapper {
		position: relative;
		width: 100%;
	}

	.select-wrapper .chevron {
		position: absolute;
		right: 16px;
		top: 50%;
		transform: translateY(-50%);
		width: 10px;
		height: 10px;
		pointer-events: none;
		transition: transform 0.3s ease;
		color: inherit; /* Explicit inherit from parent */
	}

	.select-wrapper .chevron::after {
		content: '';
		position: absolute;
		width: 8px;
		height: 8px;
		border-right: 2px solid; /* Using direct color inheritance */
		border-bottom: 2px solid; /* Using direct color inheritance */
		transform: rotate(45deg);
		/* Position in the center of parent for centered rotation */
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}

	.select-wrapper .chevron.open {
		transform: translateY(-50%) rotate(180deg);
	}

	/* Override the default dropdown arrow */
	.dropdown {
		background-image: none;
		padding-right: 35px; /* Make room for our custom chevron */
	}
</style>
