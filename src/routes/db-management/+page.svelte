<svelte:options runes />

<script lang="ts">
	import { onMount } from 'svelte';

	// UI State
	let availableTables = $state([]);
	let selectedTable = $state('users');
	let dataCount = $state(1);
	let customJson = $state('');
	let result = $state(null);
	let loading = $state(false);
	let error = $state('');
	let success = $state('');

	// Load available tables on mount
	onMount(async () => {
		try {
			const response = await fetch('/api/data');
			const data = await response.json();

			if (data.success) {
				availableTables = data.tables;
				if (availableTables.length > 0) {
					selectedTable = availableTables[0].name;
				}
			} else {
				error = data.message || 'Failed to load available tables';
			}
		} catch (err) {
			error = err.message || 'Error loading available tables';
		}
	});

	async function addData() {
		loading = true;
		error = '';
		success = '';
		result = null;

		try {
			// Parse custom JSON if provided
			let customData;
			if (customJson.trim()) {
				try {
					customData = JSON.parse(customJson);
				} catch (err) {
					error = 'Invalid JSON: ' + err.message;
					loading = false;
					return;
				}
			}

			const payload = {
				table: selectedTable,
				count: dataCount,
				...(customData ? { customData } : {})
			};

			const response = await fetch('/api/data', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			const data = await response.json();
			result = data;

			if (data.success) {
				success = `Added ${data.results.length} records to ${selectedTable}`;

				// Refresh page after 2 seconds
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			} else {
				error = data.message || 'Failed to add data';
			}
		} catch (err) {
			error = err.message || 'Error adding data';
		} finally {
			loading = false;
		}
	}

	async function clearTable() {
		if (!confirm(`Are you sure you want to clear all data from the "${selectedTable}" table?`)) {
			return;
		}

		loading = true;
		error = '';
		success = '';
		result = null;

		try {
			const response = await fetch('/api/data', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ table: selectedTable })
			});

			const data = await response.json();

			if (data.success) {
				success = `Successfully cleared all data from ${selectedTable}`;

				// Refresh page after 2 seconds
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			} else {
				error = data.message || 'Failed to clear data';
			}
		} catch (err) {
			error = err.message || 'Error clearing data';
		} finally {
			loading = false;
		}
	}
</script>

<div class="db-management">
	<h2>Database Management</h2>

	<div class="card">
		<h3>Add Data to Tables</h3>

		{#if error}
			<div class="alert error">
				<p>{error}</p>
			</div>
		{/if}

		{#if success}
			<div class="alert success">
				<p>{success}</p>
			</div>
		{/if}

		<form on:submit|preventDefault={addData}>
			<div class="form-group">
				<label for="table">Table</label>
				<select id="table" bind:value={selectedTable} required>
					{#if availableTables.length === 0}
						<option value="">Loading tables...</option>
					{:else}
						{#each availableTables as table}
							<option value={table.name}>{table.name} - {table.description}</option>
						{/each}
					{/if}
				</select>
			</div>

			<div class="form-group">
				<label for="count">Number of Records</label>
				<input type="number" id="count" bind:value={dataCount} min="1" max="100" required />
				<small>How many records to generate</small>
			</div>

			<div class="form-group">
				<label for="customJson">Custom Data (Optional)</label>
				<textarea id="customJson" bind:value={customJson} placeholder="Enter JSON here..." rows="8"
				></textarea>
				<small>Enter JSON data for custom records, or leave empty for random mock data</small>
			</div>

			<div class="button-group">
				<button type="submit" class="primary" disabled={loading}>
					{loading ? 'Adding...' : 'Add Data'}
				</button>
				<button type="button" class="danger" on:click={clearTable} disabled={loading}>
					Clear Table
				</button>
			</div>
		</form>

		{#if result}
			<div class="result-section">
				<h4>Result</h4>
				<pre>{JSON.stringify(result, null, 2)}</pre>
			</div>
		{/if}
	</div>

	<p class="info-note">
		After adding data, visit the <a href="/db-test">Database Test</a> page to see the results.
	</p>
</div>

<style>
	.db-management {
		max-width: 800px;
		margin: 2rem auto;
		padding: 1.5rem;
	}

	h2 {
		color: #333;
		margin-bottom: 1.5rem;
	}

	.card {
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		padding: 1.5rem;
		margin-bottom: 1.5rem;
	}

	h3 {
		margin-top: 0;
		color: #333;
		border-bottom: 1px solid #eee;
		padding-bottom: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.form-group {
		margin-bottom: 1rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-family: inherit;
		font-size: 1rem;
	}

	small {
		display: block;
		color: #666;
		margin-top: 0.25rem;
		font-size: 0.8rem;
	}

	.button-group {
		display: flex;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: 500;
		font-size: 1rem;
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	button.primary {
		background-color: #0070f3;
		color: white;
	}

	button.danger {
		background-color: #f85149;
		color: white;
	}

	.alert {
		padding: 0.75rem;
		border-radius: 4px;
		margin-bottom: 1rem;
	}

	.alert p {
		margin: 0;
	}

	.error {
		background-color: #ffebe9;
		border: 1px solid #f85149;
		color: #d32f2f;
	}

	.success {
		background-color: #e6ffec;
		border: 1px solid #56d364;
		color: #388e3c;
	}

	.result-section {
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid #eee;
	}

	.result-section h4 {
		margin-top: 0;
		color: #333;
	}

	pre {
		background-color: #f8f8f8;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 0.75rem;
		overflow: auto;
		max-height: 300px;
		font-size: 0.9rem;
	}

	.info-note {
		text-align: center;
		font-style: italic;
		color: #666;
	}

	a {
		color: #0070f3;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
