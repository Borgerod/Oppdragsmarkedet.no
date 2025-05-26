<svelte:options runes />

<script lang="ts">
	// > Note: commented out everything related to users

	import { is } from 'drizzle-orm';
	import { onMount } from 'svelte';
	// let users = [];
	let type_color = 'grey'; // Default color

	let type_color_map = {
		user: 'green',
		vendor: 'red',
		admin: 'purple'
	};

	// function setColorByUserType(user) {
	// 	// Set the background color based on user type
	// 	console.log(user.user_type);
	// 	console.log(type_color_map[user.user_type]);
	// 	// console.log(type_color);
	// 	return type_color_map[user.user_type] || 'grey';
	// }

	onMount(async () => {
		try {
			const res = await fetch('/api/users');
			if (res.ok) {
				// users = await res.json();
			} else {
				console.error('Failed to fetch users');
			}
		} catch (error) {
			console.error('Error fetching users:', error);
		}
	});
</script>

<!-- <div> -->

<h1>User List</h1>
<!-- {#if users.length > 0} -->
<ul>
	<!-- {#each users as user}
			<li>{user.id}</li>
			<li>{user.username}</li>
			<li>{user.passwordHash}</li>
			<li>{user.user_type}</li>
			<li>{user.listing_accsess}</li>
			<li>{user.listings}</li>
			<li>{user.first_name}</li>
			<li>{user.sur_name}</li>
			<li>{user.birth_date}</li>
			<li>{user.date_joined}</li>
			<li>{user.field}</li>
			<div class="checkerbox" style="background-color: {setColorByUserType(user)}">
				{user.user_type}
			</div>
		{/each} -->
</ul>
<!-- {:else} -->
<p>No users found.</p>

<!-- {/if} -->

<!-- </div> -->

<style>
	<!-- TEMPORARY -- > .checkerbox {
		margin: 10rem;
		height: 100px;
		width: 100px;
		background-color: grey;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
