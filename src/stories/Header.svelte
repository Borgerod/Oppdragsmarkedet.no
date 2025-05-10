<svelte:options runes />

<script lang="ts">
	import './header.css';
	import Button from './Button.svelte';
	// import NeumorphicButton from '../stories/NeumorphicButton.svelte';

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
		<a class="title-card" href="https://oppdragsmarkedet.no">
			<h1>OPPDRAGS<span>M</span>ARKEDET</h1>
		</a>
		<div class="button-container">
			{#if user}
				<Button hollow osl size="small" onclick={onLogout} label="Logg ut" style="neomorphic" />
			{:else}
				<Button hollow osl size="small" onclick={onLogin} label="Logg inn" />
				<!-- <Button hollow osl size="small" onclick={onCreateAccount} label="Sign up" /> -->
				<Button hollow osl size="small" onclick={onCreateAccount} label="Registrer konto" />
			{/if}
		</div>
	</div>
</header>
