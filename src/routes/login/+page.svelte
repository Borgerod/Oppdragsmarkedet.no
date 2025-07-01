<svelte:options runes />

<script lang="ts">
	import Button from '@stories/Button.svelte';
	import TextField from '@stories/forms/TextField.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let email = $state(form?.email ?? '');
	let password = $state('');
	let loading = $state(false);
	let showPassword = $state(false);

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}

	function handleLoginClick() {
		// Handle client-side validation
		if (!email || !password) {
			return;
		}
		loading = true;
	}
</script>

<svelte:head>
	<title>Login - Oppdragsmarkedet</title>
</svelte:head>

<div class="login-container">
	<div>
		<!-- <div class="login-card"> -->
		<div class="login-header">
			<h1>Welcome back</h1>
			<p>Sign in to your account</p>
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
			class="login-form"
		>
			{#if form?.message}
				<div class="error-message">
					{form.message}
				</div>
			{/if}

			<div class="form-group">
				<label for="email" class="label">Email</label>
				<TextField bind:value={email} type="email" placeholder="Enter your email" icon="email" />
				<input type="hidden" name="email" value={email} />
			</div>

			<div class="form-group">
				<label for="password" class="label">Password</label>
				<div class="password-field">
					<TextField
						bind:value={password}
						type={showPassword ? 'text' : 'password'}
						placeholder="Enter your password"
						icon="lock"
					/>
					<input type="hidden" name="password" value={password} />
					<button
						type="button"
						class="password-toggle"
						onclick={togglePasswordVisibility}
						aria-label={showPassword ? 'Hide password' : 'Show password'}
					>
						<span class="material-icons icon">
							{showPassword ? 'visibility_off' : 'visibility'}
						</span>
					</button>
				</div>
			</div>

			<div class="form-actions">
				<Button
					type="submit"
					label={loading ? 'Signing in...' : 'Sign In'}
					primary={true}
					wide={true}
					onclick={handleLoginClick}
				/>
			</div>
		</form>

		<div class="oauth-divider">
			<span>or</span>
		</div>
		<div class="oauth-buttons">
			<!-- <form action="/auth/signin/google" method="post"> -->
			<a href="/login/google">
				<!-- <form action="/auth/signin/google" method="post"> -->
				<Button type="submit" label="Sign in with Google" primary={false} wide={true} iconLeft>
					<img
						src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw"
						alt="Google"
						class="google-icon"
						slot="icon"
					/>
				</Button>
				<!-- </form> -->
			</a>
		</div>
		<div class="login-footer">
			<p>Don't have an account? <a href="/register" class="link">Sign up</a></p>
			<a href="/forgot-password" class="link">Forgot your password?</a>
		</div>
	</div>
</div>

<style>
	.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: calc(100vh - 200px);
		padding: 2rem 1rem;
	}

	.login-card {
		background: var(--primary-bg);
		border: 1px solid var(--secondary-very-translucent);
		border-radius: 1rem;
		padding: 2.5rem;
		width: 100%;
		max-width: 400px;
		box-shadow: 0 4px 6px var(--shadow);
	}

	.login-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.login-header h1 {
		color: var(--primary);
		font-size: 2rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
	}

	.login-header p {
		color: var(--secondary);
		margin: 0;
	}

	.login-form {
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

	.password-field {
		position: relative;
		display: flex;
		align-items: center;
	}

	.password-toggle {
		position: absolute;
		right: 1rem;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--secondary);
		padding: 0.5rem;
		z-index: 1;
	}

	.password-toggle:hover {
		color: var(--primary);
	}
	.form-actions {
		margin-top: 1rem;
	}

	.oauth-divider {
		display: flex;
		align-items: center;
		margin: 2rem 0 1.5rem 0;
		text-align: center;
	}

	.oauth-divider::before,
	.oauth-divider::after {
		content: '';
		flex: 1;
		height: 1px;
		background: var(--secondary-very-translucent);
	}

	.oauth-divider span {
		padding: 0 1rem;
		color: var(--secondary);
		font-size: 0.9rem;
	}
	.oauth-buttons {
		margin-bottom: 2rem;
		width: 100%;
	}

	.oauth-buttons form {
		margin: 0;
		width: 100%;
		display: block;
	}

	.google-icon {
		width: 20px;
		height: 20px;
		object-fit: contain;
	}

	.login-footer {
		margin-top: 2rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.login-footer p {
		margin: 0;
		color: var(--secondary);
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
		.login-container {
			padding: 1rem;
			min-height: calc(100vh - 150px);
		}

		.login-card {
			padding: 2rem 1.5rem;
		}

		.login-header h1 {
			font-size: 1.75rem;
		}
	}
</style>
