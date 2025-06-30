<svelte:options runes />

<script lang="ts">
	import Button from '@stories/Button.svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { data, form }: { data: any; form: ActionData } = $props();

	// Prefer Google profile data if available, fallback to user from db/session
	let email = $state(data?.profile?.email || '');
	let name = $state(data?.profile?.name || '');
	let image = $state(data?.profile?.image || '');
	let id = $state(data?.user?.id || '');
	let userType = $state('client');
	let isThirdPartyVerified = $state(true);
	let userRole = $state('private');
	let loading = $state(false);

	async function fetchGoogleProfile() {
		try {
			console.log('[DEBUG] Fetching Google profile...');
			console.log('[DEBUG] Current data:', data);
			console.log('[DEBUG] Current profile:', data?.profile);
			console.log('[DEBUG] Current user:', data?.user);

			// Fetch session data from Auth.js
			const response = await fetch('/auth/session');
			const session = await response.json();
			console.log('[DEBUG] Auth.js session:', session);

			if (session?.user) {
				console.log('[DEBUG] Google profile from session:', {
					id: session.user.id,
					email: session.user.email,
					name: session.user.name,
					image: session.user.image
				});

				// Update form fields with session data if available
				if (session.user.email) email = session.user.email;
				if (session.user.name) name = session.user.name;
				if (session.user.image) image = session.user.image;
				if (session.user.id) id = session.user.id;
			} else {
				console.log('[DEBUG] No user found in session');
			}
		} catch (error) {
			console.error('[DEBUG] Error fetching Google profile:', error);
		}
	}
</script>

<svelte:head>
	<title>Complete Registration - Oppdragsmarkedet</title>
</svelte:head>

<div class="registration-container">
	<div class="registration-card">
		<div class="registration-header">
			<h1>Complete Your Registration</h1>
			<p>Please select your account type to continue</p>
		</div>

		{#if form?.message}
			<div class="error-message">
				{form.message}
			</div>
		{/if}

		<form
			method="post"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					// Fetch Google profile before submitting
					await fetchGoogleProfile();
					await update();
					loading = false;
				};
			}}
		>
			<input type="hidden" name="email" value={email} />
			<input type="hidden" name="name" value={name} />
			<input type="hidden" name="image" value={image} />
			<input type="hidden" name="id" value={id} />
			<!-- <input type="hidden" name="isThirdPartyVerified" value={isThirdPartyVerified} /> -->

			<div class="form-group">
				<label for="userType">I am a:</label>
				<select name="userType" bind:value={userType} required>
					<option value="client">Client (Looking for services)</option>
					<option value="vendor">Vendor (Providing services)</option>
				</select>
			</div>

			<div class="form-group">
				<label for="userRole">Account type:</label>
				<select name="userRole" bind:value={userRole} required>
					<option value="private">Private person</option>
					<option value="business">Business</option>
					<option value="government">Government</option>
				</select>
			</div>
			<div class="form-actions">
				<Button
					type="submit"
					label={loading ? 'Completing...' : 'Complete Registration'}
					primary={true}
					wide={true}
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

	.error-message {
		background: color-mix(in srgb, var(--negative-accent) 10%, transparent);
		color: var(--negative-accent-dark);
		padding: 1rem;
		border-radius: 0.5rem;
		border: 1px solid var(--negative-accent-translucent);
		font-size: 0.9rem;
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		color: var(--secondary);
		font-weight: 500;
	}

	.form-group select {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--secondary-very-translucent);
		border-radius: 0.5rem;
		background: var(--primary-bg);
		color: var(--primary);
		font-size: 1rem;
	}

	.form-group select:focus {
		outline: none;
		border-color: var(--accent-signal);
	}

	.form-actions {
		margin-top: 2rem;
	}

	@media (max-width: 530px) {
		.registration-container {
			padding: 1rem;
		}

		.registration-card {
			padding: 2rem 1.5rem;
		}

		.registration-header h1 {
			font-size: 1.75rem;
		}
	}
</style>
