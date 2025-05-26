<svelte:options runes />

<script lang="ts">
	import '@src/app.css';
	import '@src/color_scheme.css';
	import '@src/dark-mode.css';
	import '@stories/header.css';
	import '@stories/footer.css';
	import Header from '@stories/Header.svelte';
	import Footer from '@stories/Footer.svelte';
	let { children } = $props();

	// import home from './home.svelte'
</script>

<!-- <header>
</header> -->
<Header user={null} onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}} />
<div class="content">
	{@render children()}
</div>
<Footer />

<style>
	:root {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	.content {
		padding: 1rem;
		padding-top: 2rem;
		display: flex;
		justify-content: center;
	}
</style>
