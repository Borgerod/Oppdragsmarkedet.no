<svelte:options runes />

<script lang="ts">
	import { onMount } from 'svelte';

	let dbStatus = $state('Checking database connection...');
	let isConnected = $state(false);
	let userCount = $state(0);
	let error = $state('');
	let loading = $state(true);

	onMount(async () => {
		try {
			const response = await fetch('/api/db-test');
			const data = await response.json();

			if (data.connected) {
				isConnected = true;
				dbStatus = 'Database is connected!';
				userCount = data.userCount;
			} else {
				dbStatus = 'Database connection failed.';
				error = data.error || 'Unknown error';
			}
		} catch (err) {
			dbStatus = 'Error testing database connection.';
			error = err.message;
		} finally {
			loading = false;
		}
	});
</script>

<div class="db-test">
	<h2>Database Connection Test</h2>

	{#if loading}
		<p>Testing database connection...</p>
	{:else}
		<div class="result {isConnected ? 'success' : 'error'}">
			<p><strong>Status:</strong> {dbStatus}</p>

			{#if isConnected}
				<p><strong>User Count:</strong> {userCount}</p>
				<p>Full user data has been logged to the server console.</p>
			{/if}

			{#if error}
				<div class="error-details">
					<p><strong>Error:</strong> {error}</p>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.db-test {
		max-width: 600px;
		margin: 2rem auto;
		padding: 1.5rem;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		background-color: white;
	}

	h2 {
		margin-top: 0;
		color: #333;
	}

	.result {
		padding: 1rem;
		border-radius: 4px;
		margin-top: 1rem;
	}

	.success {
		background-color: #e6ffec;
		border: 1px solid #56d364;
	}

	.error {
		background-color: #ffebe9;
		border: 1px solid #f85149;
	}

	.error-details {
		margin-top: 1rem;
		padding: 0.75rem;
		background-color: #f8f8f8;
		border-radius: 4px;
		overflow-wrap: break-word;
	}
</style>
