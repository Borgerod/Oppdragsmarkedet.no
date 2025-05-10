<script lang="ts">
	import { Fa } from 'svelte-fa';
	import { faMapLocation, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import './button.css';

	export let displayedData: Record<string, any> = {};
	export let initialValues: Record<string, any> = {};
	export let mapViewBaseLink = 'https://oppdragsmarkedet.no/';

	let currentUrl = '';

	onMount(() => {
		// Get the current URL when component is mounted
		if (typeof window !== 'undefined') {
			currentUrl = window.location.href;
		}
	});

	function linkBuilderMapView() {
		// map view redirect; builds link for mapView then returns it.

		// Use current URL as base, but fallback to mapViewBaseLink if not available
		const baseUrl = currentUrl || mapViewBaseLink;

		// Add map view parameters to URL
		const mapParams = new URLSearchParams();

		// Add filter parameters to map view URL if they exist
		Object.entries(displayedData).forEach(([key, value]) => {
			if (Array.isArray(value) && value.length > 0) {
				mapParams.append(key, value.join(','));
			} else if (value && value !== initialValues[key]) {
				mapParams.append(key, String(value));
			}
		});

		const redirectLink = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}view=map&${mapParams.toString()}`;
		return redirectLink;
	}

	function handleMapView() {
		// map view redirect; builds link for redirect then routes
		const mapViewUrl = linkBuilderMapView();

		// Navigate to the map view URL
		if (typeof window !== 'undefined') {
			window.location.href = mapViewUrl;
		}
	}
</script>

<button
	onclick={handleMapView}
	class="
	storybook-button--rounded
	storybook-button--secondary
	storybook-button
	storybook-button--small
	storybook-button--icon-text
	"
>
	<Fa icon={faMapLocationDot} />

	<span> Vis på kart </span>
</button>

<style>
</style>
