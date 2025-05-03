<script>
	let { min = $bindable(''), max = $bindable('') } = $props();
</script>

<div>
	<input type="number" bind:value={min} placeholder="Min" />
	<input type="number" bind:value={max} placeholder="Max" />
</div>
