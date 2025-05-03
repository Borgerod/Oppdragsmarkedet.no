<script lang="ts">
	import './form.css';
	let {
		fylke = $bindable(''),
		type = 'county',
		options = [],
		...props
	} = $props();

	const staticWorkfields = [
		'blikkenslager', 'Elektriker', 'Entreprenør', 'Maler',
		'Maskinentreprenør', 'Murer', 'Rengjøring', 'Rørlegger',
		'Snekker', 'metallarbeider', 'Anleggsgartner', 'River',
		'Skadedyr', 'Sveiser', 'Transport', 'Store prosjekter'
	];

	if (type === 'county') {
		options = ['Oslo', 'Viken', 'Vestland', 'Trøndelag'];
	} else if (type === 'workfield') {
		options = staticWorkfields;
	}
</script>

<select bind:value={$fylke} class="dropdown field">
	<option value="" disabled selected hidden>
		{type === 'county'
			? 'Velg et fylke'
			: 'Velg et fagfelt'}
	</option>

	{#each options as option}
		<option value={option}>{option}</option>
	{/each}
</select>
