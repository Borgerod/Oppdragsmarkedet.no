<svelte:options runes />

<script lang="ts">
	import { onMount } from 'svelte';
	let dbStatus = $state('Checking database connection...');
	let isConnected = $state(false);
	let tables = $state([]);
	let tableResults = $state({});
	let schemaResults = $state({});
	let schemaInfo = $state({});
	let error = $state('');
	let loading = $state(true);

	onMount(async () => {
		try {
			const response = await fetch('/api/db-test');
			const data = await response.json();

			if (data.connected) {
				isConnected = true;
				dbStatus = 'Database is connected!';
				tables = data.tables || [];
				tableResults = data.tableResults || {};
				schemaResults = data.schemaResults || {};
				schemaInfo = data.schemaInfo || {};
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
				<div class="tables-section">
					<h3>Database Tables ({tables.length})</h3>
					<ul class="tables-list">
						{#each tables as table}
							<li>{table}</li>
						{/each}
					</ul>
					<h3>Table Test Results</h3>
					<div class="tables-grid">
						{#each Object.entries(tableResults) as [tableName, result]}
							{#if result.exists}
								<div class="table-item success">
									<strong>{tableName}</strong>
									<span class="count">{result.count} records</span>
								</div>
							{:else}
								<div class="table-item error">
									<strong>{tableName}</strong>
									<span class="error-msg">{result.error}</span>
								</div>
							{/if}
						{/each}
					</div>
					{#if Object.keys(schemaResults).length > 0}
						<h3>Schema Tables</h3>
						<div class="tables-grid">
							{#each Object.entries(schemaResults) as [tableName, result]}
								{#if result.exists}
									<div class="table-item success">
										<strong>{tableName}</strong>
										<span class="count">{result.count} records</span>
									</div>
								{:else}
									<div class="table-item error">
										<strong>{tableName}</strong>
										<span class="error-msg">{result.error}</span>
									</div>
								{/if}
							{/each}
						</div>
					{/if}

					{#if Object.keys(schemaInfo).length > 0}
						<h3>Database Schema Details</h3>

						{#if schemaInfo.users}
							<div class="schema-section">
								<h4>Users Table Structure</h4>
								<table class="schema-table">
									<thead>
										<tr>
											<th>Column</th>
											<th>Type</th>
											<th>Nullable</th>
										</tr>
									</thead>
									<tbody>
										{#each schemaInfo.users.columns as column}
											<tr>
												<td>{column.name}</td>
												<td>{column.type}</td>
												<td>{column.nullable}</td>
											</tr>
										{/each}
									</tbody>
								</table>

								{#if schemaInfo.userSample}
									<div class="sample-data">
										<h5>Sample User Data</h5>
										<pre>{JSON.stringify(schemaInfo.userSample, null, 2)}</pre>
									</div>
								{/if}
							</div>
						{/if}

						{#if schemaInfo.usersError}
							<div class="error-details">
								<p><strong>Users Table Error:</strong> {schemaInfo.usersError}</p>
							</div>
						{/if}

						{#if schemaInfo.sessions}
							<div class="schema-section">
								<h4>Sessions Table Structure</h4>
								<table class="schema-table">
									<thead>
										<tr>
											<th>Column</th>
											<th>Type</th>
											<th>Nullable</th>
										</tr>
									</thead>
									<tbody>
										{#each schemaInfo.sessions.columns as column}
											<tr>
												<td>{column.name}</td>
												<td>{column.type}</td>
												<td>{column.nullable}</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						{/if}

						{#if schemaInfo.sessionsError}
							<div class="error-details">
								<p><strong>Sessions Table Error:</strong> {schemaInfo.sessionsError}</p>
							</div>
						{/if}
					{/if}

					<p class="info-note">Full details have been logged to the server console.</p>
				</div>
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

	.tables-section {
		margin-top: 1rem;
	}

	.tables-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}

	.tables-list li {
		background-color: #f0f0f0;
		padding: 0.5rem;
		border-radius: 4px;
		font-family: monospace;
	}

	.tables-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 0.75rem;
		margin: 1rem 0;
	}

	.table-item {
		padding: 0.75rem;
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.table-item.success {
		background-color: #e6ffec;
		border: 1px solid #56d364;
	}

	.table-item.error {
		background-color: #ffebe9;
		border: 1px solid #f85149;
	}

	.count {
		font-size: 0.9rem;
		color: #388e3c;
	}

	.error-msg {
		font-size: 0.8rem;
		color: #d32f2f;
		font-family: monospace;
		word-break: break-word;
	}
	.info-note {
		font-style: italic;
		margin-top: 1rem;
		color: #666;
	}

	.schema-section {
		margin: 1.5rem 0;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 1rem;
		background-color: white;
	}

	.schema-section h4 {
		margin-top: 0;
		color: #333;
		border-bottom: 1px solid #eee;
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
	}

	.schema-table {
		width: 100%;
		border-collapse: collapse;
	}

	.schema-table th {
		background-color: #f5f5f5;
		text-align: left;
		padding: 0.5rem;
		border: 1px solid #ddd;
	}

	.schema-table td {
		padding: 0.5rem;
		border: 1px solid #ddd;
	}

	.sample-data {
		margin-top: 1.5rem;
	}

	.sample-data h5 {
		color: #333;
		margin-bottom: 0.5rem;
	}

	.sample-data pre {
		background-color: #f8f8f8;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 0.75rem;
		overflow: auto;
		max-height: 300px;
		font-size: 0.9rem;
	}
</style>
