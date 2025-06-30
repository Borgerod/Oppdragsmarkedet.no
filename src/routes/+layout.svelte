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

	let { children, data } = $props();

	async function handleLogout() {
		// Create a form and submit it to the logout endpoint
		const form = document.createElement('form');
		form.method = 'POST';
		form.action = '/auth/signout';
		document.body.appendChild(form);
		form.submit();
	}
</script>

<!-- <header>
</header> -->
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

	@media (max-width: 530px) {
		.content {
			padding: 0;
		}
	}
</style>
