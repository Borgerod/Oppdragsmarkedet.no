<svelte:options runes />

<script lang="ts">
	const { data } = $props();
	import { enhance } from '$app/forms';
</script>

<div class="db-management">
	<h2>Database Management</h2>
	<div class="user">
		<p>{$inspect(data.user)}</p>
		{#if data.user}
			<div class="result-section">
				<h4>Users</h4>
				<pre>{JSON.stringify(data.user, null, 2)}</pre>
			</div>
		{/if}

		<form method="POST" use:enhance action="?/createUsers">
			<div class="form-group">
				<p>Add Users</p>
				<textarea id="form" name="form" placeholder="Enter JSON here..." rows="8"></textarea>
				<small>Enter JSON data for custom records, or leave empty for random mock data</small>
			</div>

			<button type="submit" class="button primary">Submit</button>
		</form>
	</div>
	<div class="user-profiles">
		<p>{$inspect(data.userProfiles)}</p>
		{#if data.userProfiles}
			<div class="result-section">
				<h4>User Profiles</h4>
				<pre>{JSON.stringify(data.userProfiles, null, 2)}</pre>
			</div>
		{/if}
		<form method="POST" use:enhance action="?/createUserProfile">
			<div class="form-group">
				<p>Add User Profile</p>
				<textarea id="form" name="form" placeholder="Enter JSON here..." rows="8"></textarea>
				<small>Enter JSON data for custom records, or leave empty for random mock data</small>
			</div>

			<button type="submit" class="button primary">Submit</button>
		</form>
	</div>

	<div class="projects">
		<p>{$inspect(data.projects)}</p>
		{#if data.projects}
			<div class="result-section">
				<h4>Projects</h4>
				<pre>{JSON.stringify(data.projects, null, 2)}</pre>
			</div>
		{/if}
		<form method="POST" use:enhance action="?/createProject">
			<div class="form-group">
				<p>Add Project</p>
				<textarea id="form" name="form" placeholder="Enter JSON here..." rows="8"></textarea>
				<small>Enter JSON data for custom records, or leave empty for random mock data</small>
			</div>

			<button type="submit" class="button primary">Submit</button>
		</form>
	</div>
</div>

<style>
	.db-management {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}
	.user,
	.user-profiles,
	.projects {
		margin-bottom: 3rem;
		padding: 1.5rem;
		background: #f5f5f5;
		border-radius: 8px;
		max-width: 800px;
		margin: 2rem auto;
		padding: 1.5rem;
		overflow: auto;
	}
	.form-group {
		margin-bottom: 1.5rem;
	}

	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-family: monospace;
	}
	small {
		display: block;
		color: #666;
		margin-top: 0.25rem;
	}
	.button {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}
	.primary {
		background: #007bff;
		color: white;
	}
	pre {
		background: #fff;
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
	}
	.result-section {
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid #eee;
		overflow: auto;
		max-height: 500px;
	}
</style>
