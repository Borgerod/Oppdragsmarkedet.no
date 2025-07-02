<svelte:options runes />

<script lang="ts">
	import './form.css';
	let {
		value = $bindable(),
		placeholder = '',
		type = 'text',
		class_type = 'field',
		icon = '',
		showPassword = $bindable()
	} = $props();

	let internalShowPassword = $state(false);

	// Use internal state if showPassword prop is not provided
	let actualShowPassword = $derived(
		showPassword !== undefined ? showPassword : internalShowPassword
	);

	function togglePasswordVisibility() {
		if (showPassword !== undefined) {
			showPassword = !showPassword;
		} else {
			internalShowPassword = !internalShowPassword;
		}
	}
	let actualType = $derived(type === 'password' && actualShowPassword ? 'text' : type);
</script>

{#if type === 'password'}
	<div class={class_type}>
		{#if icon}
			<span class="material-icons input-icon icon">{icon}</span>
		{/if}
		<input type={actualType} bind:value {placeholder} />
		<button
			type="button"
			class="password-toggle"
			onclick={togglePasswordVisibility}
			aria-label={actualShowPassword ? 'Hide password' : 'Show password'}
		>
			<span class="material-icons icon">
				{actualShowPassword ? 'visibility_off' : 'visibility'}
			</span>
		</button>
	</div>
{:else if icon}
	<div class={class_type}>
		<span class="material-icons input-icon icon">{icon}</span>
		<input {type} bind:value {placeholder} />
	</div>
{:else}
	<input class={class_type} {type} bind:value {placeholder} />
{/if}

<style></style>
