<svelte:options runes />

<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import TextField from './TextField.svelte';

	let searchValue = $state('');
	let emailValue = $state('');
	let passwordValue = $state('');
	let plainValue = $state('');
</script>

<Meta title="Forms/TextField" component={TextField} />

<Template let:args>
	<TextField {...args} />
</Template>

<Story name="Default" args={{ placeholder: 'Enter text...' }} />

<Story name="With Search Icon">
	<TextField bind:value={searchValue} placeholder="Search..." icon="search" />
</Story>

<Story name="With Email Icon">
	<TextField bind:value={emailValue} placeholder="Enter email..." icon="email" type="email" />
</Story>

<Story name="With Lock Icon">
	<TextField
		bind:value={passwordValue}
		placeholder="Enter password..."
		icon="lock"
		type="password"
	/>
</Story>

<Story name="Without Icon">
	<TextField bind:value={plainValue} placeholder="Plain text field..." />
</Story>
