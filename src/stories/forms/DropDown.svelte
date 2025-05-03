<script>
	import './form.css';

	let { value = $bindable(''), type = 'county', options = [], ...props } = $props();

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
		'Pris (lav til høy)'
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
</script>

<select bind:value class="field dropdown">
	<option value="" disabled selected hidden>
		{type === 'county' ? 'Velg fylke' : 'Velg fagfelt'}
	</option>
	{#each options as option}
		<option value={option}>{option}</option>
	{/each}
</select>
