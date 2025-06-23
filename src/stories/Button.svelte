<svelte:options runes />

<script lang="ts">
	// new edit
	let buttonProps = {
		// class:[$$restProps.class]
	};
	// end of edit

	import './Button.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	// import './neumorphicButton.css';
	// import './button.scss';

	/**
   * @typedef {Object} Props
   * @property {boolean} [hollow]
   * @property {boolean} [inverted] make color inverted
   * @property {boolean} [primary] Is this the principal call to action on the page?
   * @property {boolean} [dark_bg] Is this the principal call to action on the page?
   * @property {boolean} [osl] Is this the principal call to action on the page?
   * @property {boolean} [osloff] Is this the principal call to action on the page?
   * @property {string} [backgroundColor] What background color to use
   * @property {string} [parentColor] What background color the parent has
   * @property {'small' | 'medium' | 'large'} [size] How large should the button be?
   * @property {string} label Button contents
   * @property {string} icon Button contents
   * @property {() => void} [onclick] The onclick event handler
   * 
   * @property {string} [style] potentially be the replacement for primary switches between: [primary, secondary, hollow, neomorphic]
   * @property {boolean} [wide] potentially be the replacement for primary switches between: [primary, secondary, hollow, neomorphic]
   * @property {boolean} [rounded] potentially be the replacement for primary switches between: [primary, secondary, hollow, neomorphic]
   * @property {'reset' | 'submit' | 'button'} [type] which type of button 
	
   */

	/** @type {Props} */
	const {
		hollow = false,
		rounded = false,
		wide = false,
		// inverted = false,
		// osloff = false,
		osl = false,
		dark_bg = false,
		primary = false,
		backgroundColor = '',
		size = 'medium',
		label = undefined,
		icon = undefined,
		onclick = undefined,
		style = 'secondary',
		type = 'button' as 'button' | 'submit' | 'reset'
	} = $props();
</script>

<button
	{type}
	class={['storybook-button', `storybook-button--${size}`].join(' ')}
	id={wide ? 'wide' : ''}
	class:storybook-button--primary={primary}
	class:storybook-button--hollow={!primary && hollow}
	class:storybook-button--secondary={!primary && !hollow}
	class:storybook-button--dark_bg={!primary && !hollow && dark_bg}
	class:storybook-button--osl={!primary && hollow && osl}
	style:background-color={backgroundColor}
	class:storybook-button--rounded={rounded}
	{onclick}
>
	{#if icon}
		<i class={`fa ${icon}`} aria-hidden="true"></i>
	{/if}
	{label}
</button>
