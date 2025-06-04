<svelte:options runes />

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Alert from './Alert.svelte';
	import { fn } from '@storybook/test';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Components/Alert',
		component: Alert,
		tags: ['autodocs'],
		argTypes: {
			alerts: {
				control: 'object'
			},
			dismissAlert: { action: 'dismissed' }
		}
	});

	// Sample alerts for each type
	const sampleAlerts = {
		info: [
			{
				id: '1',
				type: 'info',
				title: 'Information',
				message: 'This is an informational alert.',
				dismissible: true
			}
		],
		success: [
			{
				id: '2',
				type: 'success',
				title: 'Success',
				message: 'Operation completed successfully!',
				dismissible: true
			}
		],
		warning: [
			{
				id: '3',
				type: 'warning',
				title: 'Warning',
				message: 'This action may have consequences.',
				dismissible: true
			}
		],
		danger: [
			{
				id: '4',
				type: 'danger',
				title: 'Error',
				message: 'Something went wrong!',
				dismissible: true
			}
		],
		multiple: [
			{
				id: '5',
				type: 'info',
				message: 'Notification without title',
				dismissible: false
			},
			{
				id: '6',
				type: 'success',
				title: 'Success',
				message: 'Action completed',
				dismissible: true
			},
			{
				id: '7',
				type: 'warning',
				title: 'Attention',
				message: 'Something requires your attention',
				dismissible: true
			}
		]
	};
</script>

<!-- Info alert -->
<Story name="Info Alert" args={{ alerts: sampleAlerts.info }} />

<!-- Success alert -->
<Story name="Success Alert" args={{ alerts: sampleAlerts.success }} />

<!-- Warning alert -->
<Story name="Warning Alert" args={{ alerts: sampleAlerts.warning }} />

<!-- Danger alert -->
<Story name="Danger Alert" args={{ alerts: sampleAlerts.danger }} />

<!-- Multiple alerts -->
<Story name="Multiple Alerts" args={{ alerts: sampleAlerts.multiple }} />
