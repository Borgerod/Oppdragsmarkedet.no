<svelte:options runes />

<!-- * HOME PAGE -->
<script lang="ts">
	// import Header from '@stories/Header.svelte';
	// import Footer from '@stories/Footer.svelte';
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
	<div class="content">
		<!-- EMPTY -->
		<!-- <slot /> -->
	</div>
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
		justify-content: center;
	}
</style>
