<svelte:options runes />

<script lang="ts">
	import '../app.css';
	let { children } = $props();

	// import home from './home.svelte'

</script>

{@render children()}
