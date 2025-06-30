<svelte:options runes />

<script lang="ts">
	import { page } from '$app/stores';

	let errorMessage = $state('');

	// Extract error information from URL params
	$effect(() => {
		const error = $page.url.searchParams.get('error');
		if (error) {
			switch (error) {
				case 'Configuration':
					errorMessage = 'Server configuration error. Please contact support.';
					break;
				case 'AccessDenied':
					errorMessage = 'Access denied. Please try again.';
					break;
				case 'Verification':
					errorMessage = 'Verification failed. Please try again.';
					break;
				default:
					errorMessage = 'Authentication error. Please try again.';
			}
		}
	});
</script>

<svelte:head>
	<title>Authentication Error - Oppdragsmarkedet</title>
</svelte:head>

<div class="error-container">
	<div class="error-card">
		<div class="error-icon">
			<span class="material-icons">error_outline</span>
		</div>

		<h1>Authentication Error</h1>

		{#if errorMessage}
			<p class="error-message">{errorMessage}</p>
		{:else}
			<p class="error-message">An error occurred during authentication. Please try again.</p>
		{/if}

		<div class="error-actions">
			<a href="/login" class="retry-button"> Try Again </a>
			<a href="/" class="home-button"> Go Home </a>
		</div>
	</div>
</div>

<style>
	.error-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: calc(100vh - 200px);
		padding: 2rem 1rem;
	}

	.error-card {
		background: var(--primary-bg);
		border: 1px solid var(--secondary-very-translucent);
		border-radius: 1rem;
		padding: 3rem 2rem;
		width: 100%;
		max-width: 450px;
		text-align: center;
		box-shadow: 0 4px 6px var(--shadow);
	}

	.error-icon {
		margin-bottom: 1.5rem;
	}

	.error-icon .material-icons {
		font-size: 4rem;
		color: var(--negative-accent);
	}

	h1 {
		color: var(--primary);
		font-size: 2rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
	}

	.error-message {
		color: var(--secondary);
		font-size: 1rem;
		line-height: 1.5;
		margin: 0 0 2rem 0;
	}

	.error-actions {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.retry-button,
	.home-button {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		text-decoration: none;
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.retry-button {
		background: var(--accent-signal);
		color: white;
	}

	.retry-button:hover {
		background: var(--accent-dark);
	}

	.home-button {
		background: transparent;
		color: var(--secondary);
		border: 1px solid var(--secondary-very-translucent);
	}

	.home-button:hover {
		background: var(--secondary-very-translucent);
		color: var(--primary);
	}

	@media (max-width: 530px) {
		.error-container {
			padding: 1rem;
		}

		.error-card {
			padding: 2rem 1.5rem;
		}

		h1 {
			font-size: 1.75rem;
		}

		.error-icon .material-icons {
			font-size: 3rem;
		}
	}
</style>
