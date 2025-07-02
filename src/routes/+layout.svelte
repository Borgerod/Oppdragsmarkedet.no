<svelte:options runes />

<script lang="ts">
	import '@src/app.css';
	import '@src/color_scheme.css';
	import '@src/dark-mode.css';
	import '@stories/header.css';
	import '@stories/footer.css';
	import Header from '@stories/Header.svelte';
	import Footer from '@stories/Footer.svelte';
	import { goto } from '$app/navigation';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();

	async function handleLogout() {
		const form = document.createElement('form');
		form.method = 'POST';
		form.action = '/';
		document.body.appendChild(form);
		form.submit();
	}
</script>

<Header
	user={data?.user}
	onLogin={() => goto('/login')}
	onLogout={handleLogout}
	onCreateAccount={() => goto('/register')}
/>
<div class="content">
	{@render children()}
</div>
<Footer />

<style>
</style>
