<svelte:options runes />

<script lang="ts">
	import './form.css';
	let { value = $bindable() } = $props();
</script>

<input class="field" type="text" bind:value placeholder="Name" />
