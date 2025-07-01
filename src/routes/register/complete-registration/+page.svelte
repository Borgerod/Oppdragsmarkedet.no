<svelte:options runes />

<script lang="ts">
	import Button from '@stories/Button.svelte';
	import TextField from '@stories/forms/TextField.svelte';
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let userType = $state('client');
	let userRole = $state('private');
	let loading = $state(false);

	function handleSubmit() {
		loading = true;
	}
</script>

<svelte:head>
	<title>Complete Registration - Oppdragsmarkedet</title>
</svelte:head>

<div class="registration-container">
	<div class="registration-card">
		<div class="registration-header">
			<h1>Complete Your Registration</h1>
			<p>Choose your account type to continue</p>
		</div>

		{#if data.profile}
			<div class="profile-info">
				<p><strong>Email:</strong> {data.profile.email}</p>
				<p><strong>Name:</strong> {data.profile.name}</p>
			</div>
		{/if}

		<form
			method="post"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update();
					loading = false;
				};
			}}
			class="registration-form"
		>
			{#if form?.message}
				<div class="error-message">
					{form.message}
				</div>
			{/if}

			<div class="form-group">
				<label for="userType" class="label">I am a:</label>
				<select bind:value={userType} name="userType" required>
					<option value="client">Client (looking for services)</option>
					<option value="vendor">Vendor (providing services)</option>
				</select>
			</div>

			<div class="form-group">
				<label for="userRole" class="label">Account type:</label>
				<select bind:value={userRole} name="userRole" required>
					<option value="private">Private</option>
					<option value="business">Business</option>
				</select>
			</div>

			<div class="form-actions">
				<Button
					type="submit"
					label={loading ? 'Creating Account...' : 'Complete Registration'}
					primary={true}
					wide={true}
					onclick={handleSubmit}
				/>
			</div>
		</form>
	</div>
</div>

<style>
	.registration-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: calc(100vh - 200px);
		padding: 2rem 1rem;
	}

	.registration-card {
		background: var(--primary-bg);
		border: 1px solid var(--secondary-very-translucent);
		border-radius: 1rem;
		padding: 2.5rem;
		width: 100%;
		max-width: 400px;
		box-shadow: 0 4px 6px var(--shadow);
	}

	.registration-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.registration-header h1 {
		color: var(--primary);
		font-size: 2rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
	}

	.registration-header p {
		color: var(--secondary);
		margin: 0;
	}

	.profile-info {
		background: var(--secondary-very-translucent);
		padding: 1rem;
		border-radius: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.profile-info p {
		margin: 0.5rem 0;
		color: var(--secondary);
	}

	.registration-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.label {
		color: var(--primary);
		font-weight: 500;
	}

	select {
		padding: 0.75rem;
		border: 1px solid var(--secondary-very-translucent);
		border-radius: 0.5rem;
		background: var(--primary-bg);
		color: var(--primary);
		font-size: 1rem;
	}

	select:focus {
		outline: none;
		border-color: var(--accent);
	}

	.error-message {
		background: color-mix(in srgb, var(--negative-accent) 10%, transparent);
		color: var(--negative-accent-dark);
		padding: 1rem;
		border-radius: 0.5rem;
		border: 1px solid var(--negative-accent-translucent);
		font-size: 0.9rem;
	}
</style>
