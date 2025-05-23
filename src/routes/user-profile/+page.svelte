<svelte:options runes />

<script lang="ts">
	const { data } = $props();
	import { enhance } from '$app/forms';
	// import { form } from '$app/stores';
</script>

<div>
	<p>user profile:</p>
	<p>{$inspect(data.profile)}</p>
</div>
