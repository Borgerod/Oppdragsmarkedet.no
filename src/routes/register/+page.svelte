<svelte:options runes />

<script lang="ts">
	import Button from '@stories/Button.svelte';
	import TextField from '@stories/forms/TextField.svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let email = $state(form?.email ?? '');
	let password = $state('');
	let confirmPassword = $state('');
	let firstName = $state(form?.firstName ?? '');
	let lastName = $state(form?.lastName ?? '');
	let loading = $state(false);
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}

	function toggleConfirmPasswordVisibility() {
		showConfirmPassword = !showConfirmPassword;
	}

	function handleRegisterClick() {
		if (!email || !password || !confirmPassword || !firstName || !lastName) {
			return;
		}
		if (password !== confirmPassword) {
			return;
		}
		loading = true;
	}
</script>

<svelte:head>
	<title>Register - Oppdragsmarkedet</title>
</svelte:head>

<div class="register-container">
	<div class="register-card">
		<div class="register-header">
			<h1>Create Account</h1>
			<p>Join Oppdragsmarkedet today</p>
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
			class="register-form"
		>
			{#if form?.message}
				<div class="error-message">
					{form.message}
				</div>
			{/if}

			<div class="name-row">
				<div class="form-group">
					<label for="firstName" class="label">First Name</label>
					<TextField bind:value={firstName} type="text" placeholder="First name" icon="person" />
					<input type="hidden" name="firstName" value={firstName} />
				</div>

				<div class="form-group">
					<label for="lastName" class="label">Last Name</label>
					<TextField bind:value={lastName} type="text" placeholder="Last name" icon="person" />
					<input type="hidden" name="lastName" value={lastName} />
				</div>
			</div>

			<div class="form-group">
				<label for="email" class="label">Email</label>
				<TextField bind:value={email} type="email" placeholder="Enter your email" icon="email" />
				<input type="hidden" name="email" value={email} />
			</div>
			<div class="form-group">
				<label for="number" class="label">number</label>
				<!-- todo [ ]: make a date field -->
				<TextField bind:value={email} type="number" placeholder="Enter your number" icon="phone" />
				<!-- <input type="hidden" name="number" value={number} /> -->
			</div>

			<div class="form-group">
				<label for="birthdate" class="label">Birthdate</label>
				<!-- todo [ ]: make a date field -->
				<TextField
					bind:value={email}
					type="birthdate"
					placeholder="dd/mm/yyyy"
					icon="calendar_month"
				/>

				<!-- <input type="hidden" name="birthdate" value={birthdate} /> -->
			</div>

			<div class="form-group">
				<label for="password" class="label">Password</label>
				<div class="password-field">
					<TextField
						bind:value={password}
						type={showPassword ? 'text' : 'password'}
						placeholder="Create a password"
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

			<div class="form-group">
				<label for="confirmPassword" class="label">Confirm Password</label>
				<div class="password-field">
					<TextField
						bind:value={confirmPassword}
						type={showConfirmPassword ? 'text' : 'password'}
						placeholder="Confirm your password"
						icon="lock"
					/>
					<input type="hidden" name="confirmPassword" value={confirmPassword} />
					<button
						type="button"
						class="password-toggle"
						onclick={toggleConfirmPasswordVisibility}
						aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
					>
						<span class="material-icons icon">
							{showConfirmPassword ? 'visibility_off' : 'visibility'}
						</span>
					</button>
				</div>
				{#if password && confirmPassword && password !== confirmPassword}
					<div class="field-error">Passwords do not match</div>
				{/if}
			</div>

			<div class="form-actions">
				<Button
					type="submit"
					label={loading ? 'Creating Account...' : 'Create Account'}
					primary={true}
					wide={true}
					onclick={handleRegisterClick}
				/>
			</div>
		</form>

		<div class="oauth-divider">
			<span>or</span>
		</div>
		<!-- <div class="oauth-buttons">
			<form action="/auth/signin/google" method="post">
				<Button type="submit" label="Continue with Google" hollow={true} wide={true}>
					<img
						src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw"
						alt="Google"
						class="google-icon"
						slot="icon"
					/>
				</Button>
			</form>
		</div> -->
		<div class="oauth-buttons">
			<form action="/auth/signin/google" method="post">
				<Button type="submit" label="Register with Google" primary={false} wide={true} iconLeft>
					<img
						src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw"
						alt="Google"
						class="google-icon"
						slot="icon"
					/>
				</Button>
			</form>
		</div>

		<div class="register-footer">
			<p>
				By continuing, you agree to Oppdragsmarkedet's <u>Terms of Service</u> and acknowledge
				you've read our
				<u>Privacy Policy</u>. Notice at collection.
			</p>
			<br />

			<p>Already have an account? <a href="/login" class="link">Sign in</a></p>
		</div>
	</div>
</div>

<style>
	.register-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: calc(100vh - 200px);
		padding: 2rem 1rem;
	}

	.register-card {
		background: var(--primary-bg);
		border: 1px solid var(--secondary-very-translucent);
		border-radius: 1rem;
		padding: 2.5rem;
		width: 100%;
		max-width: 500px;
		box-shadow: 0 4px 6px var(--shadow);
	}

	.register-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.register-header h1 {
		color: var(--primary);
		font-size: 2rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
	}

	.register-header p {
		color: var(--secondary);
		margin: 0;
	}

	.register-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.name-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
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

	.field-error {
		color: var(--negative-accent-dark);
		font-size: 0.85rem;
		margin-top: 0.25rem;
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
		/* width: 100%; */
		padding-left: 8rem;
		padding-right: 8rem;
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

	.register-footer {
		margin-top: 2rem;
		text-align: center;
	}

	.register-footer p {
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
		.register-container {
			padding: 1rem;
			min-height: calc(100vh - 150px);
		}

		.register-card {
			padding: 2rem 1.5rem;
		}

		.register-header h1 {
			font-size: 1.75rem;
		}

		.name-row {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
</style>
