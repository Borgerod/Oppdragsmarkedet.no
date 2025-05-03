<script>
	let {
	  value = $bindable(''),
	  type = 'county',
	  options = [],
	  ...props
	} = $props();
  
	const staticWorkfields = [
	  'Blikkenslager', 'Elektriker', 'Entreprenør', 'Maler',
	  'Maskinentreprenør', 'Murer', 'Rengjøring', 'Rørlegger',
	  'Snekker', 'Metallarbeider', 'Anleggsgartner', 'River',
	  'Skadedyr', 'Sveiser', 'Transport', 'Store prosjekter'
	];
  
	$effect(() => {
	  if (type === 'county') {
		options = ['Oslo', 'Viken', 'Vestland', 'Trøndelag'];
	  } else if (type === 'workfield') {
		options = staticWorkfields;
	  }
	});
  </script>
  
  <select bind:value class="dropdown">
	<option value="" disabled selected hidden>
	  {type === 'county' ? 'Velg fylke' : 'Velg fagfelt'}
	</option>
	{#each options as option}
	  <option value={option}>{option}</option>
	{/each}
  </select>