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
				<span class="welcome">
					Welcome, <b>{user.name}</b>!
				</span>
				<Button hollow osl size="small" onclick={onLogout} label="Log out" style="neomorphic" />
				<!-- <Button hollow size="small" onclick={onLogout} label="Log out" style="neomorphic" /> -->
			{:else}
				<Button hollow osl size="small" onclick={onLogin} label="Log in" />
				<Button hollow osl size="small" onclick={onCreateAccount} label="Sign up" />
				<!-- <Button hollow size="small" onclick={onLogin} label="Log in" />
			<Button hollow size="small" onclick={onCreateAccount} label="Sign up" /> -->

				<!-- <NeumorphicButton hollow onClick={onLogin} label="Log in" /> -->
				<!-- <NeumorphicButton size="small" onClick={onCreateAccount} label="Sign up" /> -->

				<!-- <Button primary size="small" onClick={onCreateAccount} label="Sign up" /> -->
				<!-- <Button primary size="small" onClick={onCreateAccount} label="Sign up" /> -->
			{/if}
		</div>
	</div>
</header>
