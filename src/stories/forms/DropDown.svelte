<svelte:options runes />

<script lang="ts">
	import './form.css';

	let { value = $bindable(''), type = 'county', options = [], ...props } = $props();
	let isOpen = $state(false); // Track dropdown open state

	const staticWorkfields = [
		'Blikkenslager',
		'Elektriker',
		'Entreprenør',
		'Maler',
		'Maskinentreprenør',
		'Murer',
		'Rengjøring',
		'Rørlegger',
		'Snekker',
		'Metallarbeider',
		'Anleggsgartner',
		'River',
		'Skadedyr',
		'Sveiser',
		'Transport',
		'Store prosjekter'
	];
	const sortby = [
		'Mest relevant',
		'Nærmest',
		'Publisert (ny til gammel)',
		'Publisert (gammel til ny)',
		'Pris (høy til lav)',
		'Pris (lav til høy)',
		'Mest populær',
		'Minst oopulær'
	];

	$effect(() => {
		if (type === 'county') {
			options = ['Oslo', 'Viken', 'Vestland', 'Trøndelag'];
		} else if (type === 'workfield') {
			options = staticWorkfields;
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
			{type === 'county' ? 'Velg fylke' : 'Velg fagfelt'}
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
