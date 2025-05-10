<svelte:options runes />

<script lang="ts">
	import './form.css';
	let { min = $bindable(''), max = $bindable('') } = $props();

	// Format display values with thousand separators
	let displayMin = $state('');
	let displayMax = $state('');

	// Format number with thousand separators (spaces)
	function formatNumber(value: string | number): string {
		if (!value && value !== 0) return '';
		return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	}

	// Parse formatted string back to number
	function parseNumber(value: string): string {
		if (!value) return '';
		return value.replace(/\s/g, '');
	}

	// Update display values when underlying values change
	$effect(() => {
		displayMin = formatNumber(min);
		displayMax = formatNumber(max);
	});

	// Handle input change for min value
	function handleMinChange(e: Event) {
		const value = (e.target as HTMLInputElement).value;
		displayMin = value;
		min = parseNumber(value);
	}

	// Handle input change for max value
	function handleMaxChange(e: Event) {
		const value = (e.target as HTMLInputElement).value;
		displayMax = value;
		max = parseNumber(value);
	}

	// Handle focus to show unformatted value
	function handleFocus(e: FocusEvent) {
		const input = e.target as HTMLInputElement;
		const value = input.value;
		input.value = parseNumber(value);
	}

	// Handle blur to format value
	function handleBlur(e: FocusEvent) {
		const input = e.target as HTMLInputElement;
		const value = input.value;
		const parsedValue = parseNumber(value);
		input.value = formatNumber(parsedValue);

		// Update the appropriate bound value
		if (input.placeholder === 'Min') {
			min = parsedValue;
		} else {
			max = parsedValue;
		}
	}
</script>

<div class="row">
	<input
		type="text"
		value={displayMin}
		oninput={handleMinChange}
		onfocus={handleFocus}
		onblur={handleBlur}
		placeholder="Min"
		class="field"
	/>
	<input
		type="text"
		value={displayMax}
		oninput={handleMaxChange}
		onfocus={handleFocus}
		onblur={handleBlur}
		placeholder="Max"
		class="field"
	/>
</div>
