<svelte:options runes />

<script lang="ts">
	import Button from '@stories/Button.svelte';
	import TextField from '@stories/forms/TextField.svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let email = $state(form?.email ?? '');
	let loading = $state(false);
	let submitted = $state(false);

	function handleResetClick() {
		if (!email) {
			return;
		}
		loading = true;
	}

	// Check if form was successfully submitted
	$effect(() => {
		if (form?.success) {
			submitted = true;
		}
	});
</script>

<svelte:head>
	<title>Forgot Password - Oppdragsmarkedet</title>
</svelte:head>

<div class="forgot-password-container">
	<div class="forgot-password-card">
		{#if !submitted}
			<div class="forgot-password-header">
				<h1>Forgot Password</h1>
				<p>Enter your email address and we'll send you a link to reset your password</p>
			</div>

			<form
				method="post"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						await update();
						loading = false;
					};
				}}
				class="forgot-password-form"
			>
				{#if form?.message && !form?.success}
					<div class="error-message">
						{form.message}
					</div>
				{/if}

				<div class="form-group">
					<label for="email" class="label">Email Address</label>
					<TextField
						bind:value={email}
						type="email"
						placeholder="Enter your email address"
						icon="email"
					/>
					<input type="hidden" name="email" value={email} />
				</div>

				<div class="form-actions">
					<Button
						type="submit"
						label={loading ? 'Sending...' : 'Send Reset Link'}
						primary={true}
						wide={true}
						onclick={handleResetClick}
					/>
				</div>
			</form>

			<div class="forgot-password-footer">
				<p>Remember your password? <a href="/login" class="link">Sign in</a></p>
				<p>Don't have an account? <a href="/register" class="link">Sign up</a></p>
			</div>
		{:else}
			<div class="success-message">
				<div class="success-icon">
					<span class="material-icons">check_circle</span>
				</div>
				<h1>Check Your Email</h1>
				<p>We've sent a password reset link to <strong>{email}</strong></p>
				<p>If you don't see the email in a few minutes, check your spam folder.</p>

				<div class="form-actions">
					<Button
						type="button"
						label="Back to Login"
						primary={true}
						wide={true}
						onclick={() => (window.location.href = '/login')}
					/>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.forgot-password-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: calc(100vh - 200px);
		padding: 2rem 1rem;
	}

	.forgot-password-card {
		background: var(--primary-bg);
		border: 1px solid var(--secondary-very-translucent);
		border-radius: 1rem;
		padding: 2.5rem;
		width: 100%;
		max-width: 450px;
		box-shadow: 0 4px 6px var(--shadow);
	}

	.forgot-password-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.forgot-password-header h1 {
		color: var(--primary);
		font-size: 2rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
	}

	.forgot-password-header p {
		color: var(--secondary);
		margin: 0;
		line-height: 1.5;
	}

	.forgot-password-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.error-message {
		background: color-mix(in srgb, var(--negative-accent) 10%, transparent);
		color: var(--negative-accent-dark);
		padding: 1rem;
		border-radius: 0.5rem;
		border: 1px solid var(--negative-accent-translucent);
		font-size: 0.9rem;
		text-align: center;
	}

	.form-actions {
		margin-top: 1rem;
	}

	.forgot-password-footer {
		margin-top: 2rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.forgot-password-footer p {
		margin: 0;
		color: var(--secondary);
	}

	.success-message {
		text-align: center;
	}

	.success-icon {
		margin-bottom: 1rem;
	}

	.success-icon .material-icons {
		font-size: 4rem;
		color: var(--accent-signal);
	}

	.success-message h1 {
		color: var(--primary);
		font-size: 2rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
	}

	.success-message p {
		color: var(--secondary);
		margin: 0 0 1rem 0;
		line-height: 1.5;
	}

	.success-message strong {
		color: var(--primary);
	}

	.link {
		color: var(--accent-signal);
		text-decoration: none;
		font-weight: 500;
	}

	.link:hover {
		text-decoration: underline;
		color: var(--accent-dark);
	}

	@media (max-width: 530px) {
		.forgot-password-container {
			padding: 1rem;
			min-height: calc(100vh - 150px);
		}

		.forgot-password-card {
			padding: 2rem 1.5rem;
		}

		.forgot-password-header h1,
		.success-message h1 {
			font-size: 1.75rem;
		}

		.success-icon .material-icons {
			font-size: 3rem;
		}
	}
</style>
