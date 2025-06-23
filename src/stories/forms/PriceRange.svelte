<svelte:options runes />

<script lang="ts">
	import './form.css';
	let { min = $bindable(''), max = $bindable('') } = $props();

	// Slider configuration
	const SLIDER_MIN = 0;
	const SLIDER_MAX = 1000000; // 1 million max
	const SLIDER_STEP = 1000; // 1k increments	// Format display values with thousand separators
	let displayMin = $state('');
	let displayMax = $state(''); // Slider values (numeric) - start empty
	let sliderMin = $state('');
	let sliderMax = $state('');
	// Toggle slider visibility
	let showSlider = $state(false);

	// Format number with thousand separators (spaces)
	function formatNumber(value: string | number): string {
		if (!value && value !== 0) return '';
		return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	}

	// Parse formatted string back to number
	function parseNumber(value: string): string {
		if (!value) return '';
		return value.replace(/\s/g, '');
	} // Update display values when underlying values change
	$effect(() => {
		displayMin = formatNumber(min);
		displayMax = formatNumber(max);

		// // Sync slider values with text inputs
		// if (min !== '') sliderMin = Number(parseNumber(min));
		// if (max !== '') sliderMax = Number(parseNumber(max));
		// Sync slider values with text inputs
		if (min !== '') sliderMin = parseNumber(min);
		if (max !== '') sliderMax = parseNumber(max);
		// Add these lines to reset slider values when min/max are empty
		if (min === '') sliderMin = '';
		if (max === '') sliderMax = '';
	});
	// Update text inputs when slider values change
	$effect(() => {
		if (sliderMin !== '' && Number(sliderMin) >= 0) {
			min = String(sliderMin);
		}
		if (sliderMax !== '' && Number(sliderMax) >= 0) {
			max = String(sliderMax);
		}
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
		input.value = formatNumber(parsedValue); // Update the appropriate bound value
		if (input.placeholder === 'Min') {
			min = parsedValue;
			sliderMin = Number(parsedValue);
		} else {
			max = parsedValue;
			sliderMax = Number(parsedValue);
		}
	}
	// Handle slider changes
	function handleSliderMinChange(e: Event) {
		const value = Number((e.target as HTMLInputElement).value);
		sliderMin = value;
		// Ensure min doesn't exceed max
		if (sliderMin > sliderMax) {
			sliderMax = sliderMin;
		}
	}
	function handleSliderMaxChange(e: Event) {
		const value = Number((e.target as HTMLInputElement).value);
		sliderMax = value;
		// Ensure max doesn't go below min
		if (sliderMax < sliderMin) {
			sliderMin = sliderMax;
		}
	}
	// Handle clear button - reset to empty defaults
	function handleClear() {
		min = '';
		max = '';
		displayMin = '';
		displayMax = '';
		sliderMin = '';
		sliderMax = '';
	}

	// Toggle slider visibility
	function toggleSlider() {
		showSlider = !showSlider;
	}
</script>

<div class="price-range-container">
	<h3>Budsjett</h3>
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
		<button onclick={toggleSlider} class="slider-button" title="Clear price range">
			<span
				class="material-symbols-outlined icon dark-accent"
				style="transform: rotate(90deg); cursor: pointer;"
				title={showSlider ? 'Hide slider' : 'Show slider'}
			>
				discover_tune
			</span></button
		>
	</div>

	{#if showSlider}
		<div class="slider-container">
			<div class="slider-track">
				<div
					class="slider-range"
					style="left: {sliderMin !== ''
						? (sliderMin / SLIDER_MAX) * 100
						: 0}%; width: {sliderMin !== '' && sliderMax !== ''
						? ((sliderMax - sliderMin) / SLIDER_MAX) * 100
						: 0}%;"
				></div>
			</div>
			<input
				type="range"
				min={SLIDER_MIN}
				max={SLIDER_MAX}
				step={SLIDER_STEP}
				bind:value={sliderMin}
				oninput={handleSliderMinChange}
				class="slider slider-min"
			/>
			<input
				type="range"
				min={SLIDER_MIN}
				max={SLIDER_MAX}
				step={SLIDER_STEP}
				bind:value={sliderMax}
				oninput={handleSliderMaxChange}
				class="slider slider-max"
			/>
			<button onclick={handleClear} class="clear-button" title="Clear price range">
				<span class="material-symbols-outlined">clear</span>
			</button>
		</div>
	{/if}

	<div class="slider-labels">
		<!-- <span>{formatNumber(SLIDER_MIN)}</span>
		<span>{formatNumber(SLIDER_MAX)}</span> -->
	</div>
</div>

<style>
	.icon {
	}
	.slider-button {
		margin: 0.5rem;
		margin-right: 0rem;
		margin-left: 0.2rem;
		/* position: absolute; */
		/* right: 0; */
		/* top: 50%; */
		/* transform: translateY(-50%); */

		background: none;
		border: none;
		cursor: pointer;
		padding: 1rem;
		border-radius: 5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--secondary, #666);
		transition: all 0.2s ease;
		width: 2.5rem;
		height: 2.5rem;
		/* background-color: #007acc; */
	}
	.slider-button:hover {
		background-color: var(--light-accent, #f0f0f0);
	}
	.price-range-container {
		display: flex;
		flex-direction: column;
		/* gap: 1rem; */
	}
	.slider-container {
		position: relative;
		height: 2rem;
		margin: 0.5rem 0;
		padding-right: 2.5rem; /* Make space for the clear button */
	}
	.slider-track {
		position: absolute;
		top: 50%;
		left: 0;
		right: 2.5rem;
		right: 3rem;
		height: 4px;
		background: #e0e0e0;
		border-radius: 2px;
		transform: translateY(-50%);
	}

	.slider-range {
		position: absolute;
		height: 100%;
		/* background: var(--primary, #007acc); */
		background: var(--secondary, #007acc);
		background: var(--accent-medium, #007acc);

		border-radius: 2px;
		transition: all 0.1s ease;
	}
	.slider {
		position: absolute;
		top: 0;
		left: 0;
		width: calc(100% - 2.5rem); /* Adjust width to not overlap with clear button */
		height: 100%;
		background: transparent;
		appearance: none;
		-webkit-appearance: none;
		cursor: pointer;
		pointer-events: none;
	}

	.slider::-webkit-slider-thumb {
		appearance: none;
		-webkit-appearance: none;
		width: 20px;
		height: 20px;
		background: var(--secondary, #007acc);
		background: var(--accent-medium, #007acc);
		border-radius: 50%;
		cursor: pointer;
		pointer-events: all;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		transition: all 0.1s ease;
	}

	.slider::-webkit-slider-thumb:hover {
		transform: scale(1.1);
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
	}

	.slider::-moz-range-thumb {
		width: 20px;
		height: 20px;
		background: var(--primary, #007acc);
		border-radius: 50%;
		cursor: pointer;
		pointer-events: all;
		border: none;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		transition: all 0.1s ease;
	}

	.slider::-moz-range-thumb:hover {
		transform: scale(1.1);
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
	}
	.slider-labels {
		display: flex;
		justify-content: space-between;
		font-size: 0.8rem;
		color: var(--secondary, #666);
	}
	.clear-button {
		position: absolute;
		right: 0.25rem;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
		width: 2rem;
		height: 2rem;
	}
	.clear-button span {
		color: var(--accent-dark);
	}

	.clear-button:hover {
		background: var(--light-accent, #f0f0f0);
		color: var(--accent-medium, #007acc);
		transform: translateY(-50%) scale(1.1);
	}

	.clear-button span {
		font-size: 1.2rem;
	}
</style>
