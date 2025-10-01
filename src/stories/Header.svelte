<svelte:options runes />

<script lang="ts">
	import './header.css';
	import Button from './Button.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	/**
	 * @typedef {Object} Props
	 * @property {{name: string}} [user] The user object
	 * @property {() => void} [onLogin] The login event handler
	 * @property {() => void} [onLogout] The logout event handler
	 * @property {() => void} [onCreateAccount] The account creation event handler
	 */

	/** @type {Props} */
	const { user, onLogin, onLogout, onCreateAccount } = $props();
</script>

<header>
	<div class="storybook-header">
		<a class="title-card" href="/home" onclick={() => goto('/home')}>
			<h1>OPPDRAGS<span>M</span>ARKEDET</h1>
			<!-- <h1 style="color:var(--accent-darker)"> -->
			<h1>
				<!-- OPPDRAGS<span style="color:var(--accent-bright)">M</span>ARKEDET -->
				<!-- OPPDRAGS<span style="color:var(--accent-darker)">M</span>ARKEDET -->
			</h1>
		</a>
		<div class="button-container">
			{#if user}
				<Button hollow osl size="small" onclick={onLogout} label="Logg ut" style="neomorphic" />
			{:else}
				<!-- <Button hollow size="small" onclick={onLogin} label="Logg inn" /> -->

				<!-- <Button hollow osl size="small" onclick={onLogin} label="Logg inn" /> -->
				<Button size="small" onclick={onLogin} label="Logg inn" />
				<div class="register-button-container">
					<!-- <Button hollow osl size="small" onclick={onCreateAccount} label="Registrer konto" /> -->
					<Button size="small" onclick={onCreateAccount} label="Registrer konto" />
					<!-- <Button hollow size="small" onclick={onCreateAccount} label="Legg ut oppdrag" /> -->
				</div>
				<div class="menu-button-container">
					<Button hollow osl size="small" onclick={onCreateAccount} icon="fa-bars" />
				</div>
			{/if}
		</div>
	</div>
</header>
