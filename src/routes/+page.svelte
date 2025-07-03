<svelte:options runes />

<script lang="ts">
	// Will refer back to /home folder containing the homepage content
	import Home from './home/+page.svelte';
</script>

<Home />

<!-- > OLD, keeping it in case i need some of the it. -->
<!-- <script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();

	console.log('User from layout:', data.user);
</script> 

<svelte:head>
	<style>
		body {
			margin: 0;
			min-height: 100vh;
			display: flex;
			flex-direction: column;
		}
	</style>
</svelte:head>

<div class="page-wrapper">
	<div class="content"></div>
</div>

<style>
	.page-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center; 
	}
	
</style> -->
