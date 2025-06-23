<svelte:options runes />

<script lang="ts">
	import '@stories/theme.css';
	import '@src/app.css';
	import '@stories/Tag.css';

	// const props = $props<{
	// 	label: string;
	// 	// gridView: boolean;
	// 	color: string;
	// }>();

	/**
	 * @typedef {Object} Props
	 * @property {string} [label] Button contents
	 * @property {string} [color]
	 * @property {string} [textColor]
	 * @property {boolean} [shadow]
	 * @property {boolean} [shadow]
	 * @property {'small' | 'medium' | 'large'} [size] How large should the button be?
	 **/
	//  * @property {boolean} currency

	/** @type {Props} */
	const {
		label = undefined,
		color = 'button' as 'green' | 'red' | 'grey' | 'accent' | 'darkgrey',
		textColor = 'button' as 'black' | 'white' | 'grey',
		shadow = false,
		size = 'medium'
	} = $props();

	let _shadow = shadow ? 'shadow' : '';
</script>

<div class={['tag', `${color}`, `text-${textColor}`, `${_shadow}`, `${size}`].join(' ')}>
	<!-- class:_shadow = {shadow} -->
	{label}
</div>
