<svelte:options runes />

<script lang="ts">
	import './form.css';
	let {
		value = $bindable(),
		placeholder = '',
		type = 'text',
		class_type = 'field',
		icon = ''
	} = $props();
</script>

{#if icon}
	<div class="input-container">
		<span class="material-icons input-icon icon">{icon}</span>
		<input class="{class_type} with-icon" {type} bind:value {placeholder} />
	</div>
{:else}
	<input class={class_type} {type} bind:value {placeholder} />
{/if}
