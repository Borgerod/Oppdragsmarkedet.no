<script>
	let {
		minAmount = $bindable(),
		maxAmount = $bindable(),
		...props
	} = $props();

	let validRange = $state(false);
	let rangeClass = $state('');

	function validateRange() {
		const min = +$minAmount;
		const max = +$maxAmount;
		const hasValues = $minAmount !== '' && $maxAmount !== '';
		validRange = hasValues && min <= max;
	}

	$effect(() => {
		const min = +$minAmount;
		const max = +$maxAmount;
		const hasValues = $minAmount !== '' && $maxAmount !== '';

		rangeClass = !validRange && hasValues ? 'invalid' : '';
	});
</script>

<div class="price-range">
	<h2>Pris</h2>
	<div class="range-container {rangeClass}">
		<input
			type="number"
			class="field"
			bind:value={$minAmount}
			placeholder="Fra"
			oninput={validateRange}
		/>
		–
		<input
			type="number"
			class="field"
			bind:value={$maxAmount}
			placeholder="Til"
			oninput={validateRange}
		/>
	</div>
</div>

<style>
.range-container {
	display: flex;
	flex-direction: row;
	column-gap: 1rem;
	align-items: center;
	justify-content: space-around;
	border: 2px solid transparent;
	padding: 0.5rem;
	border-radius: 0.4rem;
	transition: border-color 0.2s ease;
}

.range-container.invalid {
	border-color: red;
}

.price-range {
	display: flex;
	flex-direction: column;
}

.valid {
	color: green;
	font-size: 0.9rem;
	margin-top: 0.5rem;
}
</style>
