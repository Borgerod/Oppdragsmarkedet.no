<svelte:options runes />

<script lang="ts">
	import './Alert.css';
	import '@stories/theme.css';
	import '@src/app.css';
	import '@src/color_scheme.css';
	// Using signals (recommended in Svelte 5)
	type AlertType = 'info' | 'danger' | 'warning' | 'success';

	interface AlertData {
		id: string;
		type: AlertType;
		title?: string;
		message: string;
		dismissible?: boolean;
	} // Create a signal for alerts using let instead of const for reassignment
	let alertsList = $state<AlertData[]>([]);
	// Function to add an alert
	function addAlert(alert: Omit<AlertData, 'id'>) {
		const id = crypto.randomUUID();
		alertsList.push({ ...alert, id });
		return id;
	} // Function to dismiss an alert
	function dismissAlert(id: string) {
		alertsList = alertsList.filter((a) => a.id !== id);
		$effect(() => {
			document.dispatchEvent(new CustomEvent('alert-dismissed', { detail: { id } }));
		});
	}
	// Export the alert functions using defineProps and defineEmits in Svelte 5
	const { addAlert: propAddAlert, dismissAlert: propDismissAlert, alerts } = $props();

	// Use the props or the internal functions
	function handleAddAlert(alert: Omit<AlertData, 'id'>) {
		if (propAddAlert) {
			return propAddAlert(alert);
		}
		return addAlert(alert);
	}

	function handleDismissAlert(id: string) {
		if (propDismissAlert) {
			propDismissAlert(id);
		} else {
			dismissAlert(id);
		}
	}

	const icons = {
		info: 'info',
		danger: 'error_outline',
		warning: 'report_problem',
		success: 'check_circle'
	};
</script>

<div class="container">
	{#each alerts || alertsList as alert (alert.id)}
		<div class={`alert alert-${alert.type}`} role="alert">
			<span class="material-icons md-36 inline-icon">{icons[alert.type as AlertType]}</span>
			{#if alert.title}
				<b class="alert-heading">{alert.title}</b>
			{/if}
			<span class="text">
				{alert.message}
			</span>
			{#if alert.dismissible}
				<button class="close" onclick={() => handleDismissAlert(alert.id)}>
					<span class="material-icons">close</span>
				</button>
			{/if}
		</div>
	{/each}
</div>
