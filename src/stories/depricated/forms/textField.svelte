<script>
	import './form.css';
	export let _value = '';
	export let label = '';
	export let type = 'text'; // Input type
	let isValid = true; // Validation state

	function validateInput() {
		if (type === 'number') {
			const sanitizedValue = _value.replace(/,/g, '.'); // Replace commas with periods for validation
			isValid = _value === '' || (!isNaN(parseFloat(sanitizedValue)) && sanitizedValue.trim() !== '');
		} else {
			isValid = true; // Add more type-specific validations if needed
		}
	}
</script>

<input 
	type={type} 
	class="field" 
	bind:value={_value} 
	placeholder={label} 
	on:input={validateInput} 
	class:is-invalid={!isValid} 
/>
<slot></slot>

<style>

</style>