<svelte:options runes />

<script lang="ts">
	import './form.css';
	let { min = $bindable(''), max = $bindable('') } = $props();

	// Format display values with thousand separators
	let displayMin = '';
	let displayMax = '';

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
		on:input={handleMinChange}
		on:focus={handleFocus}
		on:blur={handleBlur}
		placeholder="Min"
		class="field"
	/>
	<input
		type="text"
		value={displayMax}
		on:input={handleMaxChange}
		on:focus={handleFocus}
		on:blur={handleBlur}
		placeholder="Max"
		class="field"
	/>
</div>
