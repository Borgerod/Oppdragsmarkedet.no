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

	function handleLoginClick() {
		// Handle client-side validation
		if (!email || !password) {
			return;
		}
		loading = true;
	}

	// TODO [ ] add Vipps and facebook login functionality
</script>

<svelte:head>
	<title>Login - Oppdragsmarkedet</title>
</svelte:head>

<div class="login-container">
	<div>
		<!-- <div class="login-card"> -->
		<div class="login-header">
			<h1>Velkommen tilbake</h1>
			<p>Logg inn</p>
			<!-- <h1>Welcome back</h1>
			<p>Sign in to your account</p> -->
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
				<!-- <label for="email" class="label">Email</label> -->
				<TextField bind:value={email} type="email" placeholder="Epost" icon="email" />
				<input type="hidden" name="email" value={email} />
			</div>

			<div class="form-group">
				<!-- <label for="password" class="label">Password</label> -->
				<div class="password-field">
					<TextField
						bind:value={password}
						type={showPassword ? 'text' : 'password'}
						placeholder="Passord"
						icon="lock"
						{showPassword}
					/>
					<input type="hidden" name="password" value={password} />
					<!-- <button
						type="button"
						class="password-toggle"
						onclick={togglePasswordVisibility}
						aria-label={showPassword ? 'Hide password' : 'Show password'}
					>
						<span class="material-icons icon">
							{showPassword ? 'visibility_off' : 'visibility'}
						</span>
					</button> -->
				</div>
				<div class="forgot-password">
					<a href="/forgot-password" class="link">Glemt passord?</a>
					<!-- <a href="/forgot-password" class="link">Forgot your password?</a> -->
				</div>
			</div>

			<div class="form-actions">
				<Button
					type="submit"
					label={loading ? 'Logger inn...' : 'Logg inn'}
					primary={true}
					wide={true}
					onclick={handleLoginClick}
				/>
			</div>
		</form>

		<div class="oauth-divider">
			<!-- <span>or</span> -->
			<span>eller</span>
		</div>
		<div class="oauth-buttons">
			<!-- <form action="/auth/signin/google" method="post"> -->
			<a href="/login/google">
				<!-- <form action="/auth/signin/google" method="post"> -->

				<button class="gsi-material-button">
					<div class="gsi-material-button-state"></div>
					<div class="gsi-material-button-content-wrapper">
						<div class="gsi-material-button-icon">
							<svg
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 48 48"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								style="display: block;"
							>
								<path
									fill="#EA4335"
									d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
								></path>
								<path
									fill="#4285F4"
									d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
								></path>
								<path
									fill="#FBBC05"
									d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
								></path>
								<path
									fill="#34A853"
									d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
								></path>
								<path fill="none" d="M0 0h48v48H0z"></path>
							</svg>
						</div>
						<span class="gsi-material-button-contents">Logg på med Google</span>
						<span style="display: none;">Sign in with Google</span>
					</div>
				</button>

				<!-- </form> -->
			</a>
			<a href="/login/facebook">
				<button class="gsi-material-button">
					<div class="gsi-material-button-state"></div>
					<div class="gsi-material-button-content-wrapper">
						<div class="gsi-material-button-icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								enable-background="new 0 0 24 24"
								height="20"
								viewBox="0 0 24 24"
								width="20"
								fill="#1877F2"
								><path
									d="M24,12c0-6.627-5.373-12-12-12S0,5.373,0,12c0,5.808,4.134,10.654,9.6,11.76V16H6v-4h3.6V9.6C9.6,7.2,11.2,6,13.2,6H18v4h-3.6
    c-0.72,0-1.2,0.48-1.2,1.2V12H18v4h-4.8v7.76C19.866,22.654,24,17.808,24,12z"
								/></svg
							>
						</div>
						<span class="gsi-material-button-contents">Logg på med Facebook</span>
						<span style="display: none;">Sign in with Facebook</span>
					</div>
				</button>
			</a>
			<a href="/login/vipps">
				<button class="gsi-material-button">
					<div class="gsi-material-button-state"></div>
					<div class="gsi-material-button-content-wrapper">
						<div class="gsi-material-button-icon">
							<svg
								width="20"
								height="20"
								viewBox="0 0 512 512"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256C0 397.385 114.615 512 256 512Z"
									fill="#FF5B24"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M310.929 209.439C330.502 209.439 347.277 194.578 347.277 173.219H347.282C347.282 151.855 330.502 137 310.929 137C291.359 137 274.589 151.855 274.589 173.219C274.589 194.578 291.359 209.439 310.929 209.439ZM358.459 267.959C334.222 299.53 308.595 321.359 263.392 321.359H263.397C217.279 321.359 181.391 293.495 153.435 252.632C142.248 235.911 125.006 232.198 112.423 241.021C100.776 249.382 97.9869 267.028 108.698 282.356C147.371 341.333 200.955 375.692 263.392 375.692C320.713 375.692 365.448 347.834 400.391 301.393C413.434 284.213 412.97 266.566 400.391 256.812C388.738 247.516 371.498 250.781 358.459 267.959Z"
									fill="white"
								/>
							</svg>
						</div>
						<span class="gsi-material-button-contents">Logg på med Vipps</span>
						<span style="display: none;">Sign in with Vipps</span>
					</div>
				</button>
			</a>
		</div>
		<br />
		<!-- <div class="spacer" /> -->
		<div class="login-footer">
			<p>Har du ikke en konto? <a href="/register" class="link">Registrer konto</a></p>

			<!-- <p>Don't have an account? <a href="/register" class="link">Sign up</a></p>
			-->
		</div>
	</div>
</div>

<style>
	.gsi-material-button {
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		-webkit-appearance: none;
		/* background-color: #f2f2f2; */
		background-image: none;
		border: none;
		-webkit-border-radius: 20px;
		border-radius: 20px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		color: #1f1f1f;
		cursor: pointer;
		font-family: 'Roboto', arial, sans-serif;
		font-size: 14px;
		height: 40px;
		letter-spacing: 0.25px;
		outline: none;
		overflow: hidden;
		padding: 0 12px;
		position: relative;
		text-align: center;
		-webkit-transition:
			background-color 0.218s,
			border-color 0.218s,
			box-shadow 0.218s;
		transition:
			background-color 0.218s,
			border-color 0.218s,
			box-shadow 0.218s;
		vertical-align: middle;
		white-space: nowrap;
		width: auto;
		max-width: 400px;
		min-width: min-content;

		/* background-color: var(--secondary-bg); */
		/* border-width: 1px; */
		/* border-color: var(--accent); */
		box-shadow: var(--accent-medium) 0px 0px 0px 0.5px inset;
	}

	.gsi-material-button .gsi-material-button-icon {
		height: 20px;
		margin-right: 12px;
		min-width: 20px;
		width: 20px;
	}

	.gsi-material-button .gsi-material-button-content-wrapper {
		-webkit-align-items: center;
		align-items: center;
		display: flex;
		-webkit-flex-direction: row;
		flex-direction: row;
		-webkit-flex-wrap: nowrap;
		flex-wrap: nowrap;
		height: 100%;
		justify-content: space-between;
		position: relative;
		width: 100%;
	}

	.gsi-material-button .gsi-material-button-contents {
		-webkit-flex-grow: 1;
		flex-grow: 1;
		font-family: 'Roboto', arial, sans-serif;
		font-weight: 500;
		overflow: hidden;
		text-overflow: ellipsis;
		vertical-align: top;
		color: var(--secondary);
		text-align: left;
	}

	.gsi-material-button .gsi-material-button-state {
		-webkit-transition: opacity 0.218s;
		transition: opacity 0.218s;
		bottom: 0;
		left: 0;
		opacity: 0;
		position: absolute;
		right: 0;
		top: 0;
	}

	.gsi-material-button:disabled {
		cursor: default;
		background-color: #ffffff61;
		/* background-color: var; */
	}

	.gsi-material-button:disabled .gsi-material-button-state {
		background-color: #1f1f1f1f;
	}

	.gsi-material-button:disabled .gsi-material-button-contents {
		opacity: 38%;
	}

	.gsi-material-button:disabled .gsi-material-button-icon {
		opacity: 38%;
	}

	.gsi-material-button:not(:disabled):active .gsi-material-button-state,
	.gsi-material-button:not(:disabled):focus .gsi-material-button-state {
		opacity: 12%;
	}

	.gsi-material-button:not(:disabled):hover {
		box-shadow: var(--accent-translucent) 0px 0px 0px 0.5px inset;
	}

	.gsi-material-button:not(:disabled):hover .gsi-material-button-state {
		opacity: 100%;
		background-color: var(--accent-translucent);
	}

	/* _______________________________________ */
	.oauth-buttons,
	a {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 2rem;
		padding-right: 2rem;
		row-gap: 1rem;
	}

	.forgot-password a {
		padding: 0;
		text-align: right;
	}

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
		right: 0.25rem;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--secondary);
		padding: 0.5rem;
		z-index: 1;
		/* transform: translateX(30%); */

		transform: translateY(-5%);
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
		color: var(--accent-medium);
		/* color: var(--accent); */
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
