<svelte:options runes />

<script lang="ts">
	import '../app.css';
	import '../color_scheme.css';
	import '../dark-mode.css'; // Import the dark mode styles
	let { children } = $props();

	// import home from './home.svelte'
</script>

{@render children()}
