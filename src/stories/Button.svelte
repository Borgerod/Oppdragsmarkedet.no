<script>
	// new edit
	let buttonProps = {
		// class:[$$restProps.class]
	};
	// end of edit

	import './button.css';
	import './neumorphicButton.css';
	//   import './button.scss';

	/**
   * @typedef {Object} Props
   * @property {boolean} [hollow]
   * @property {boolean} [inverted] make color inverted
   * @property {boolean} [primary] Is this the principal call to action on the page?
   * @property {boolean} [neomorphic] Is this the principal call to action on the page?
   * @property {boolean} [green] Is this the principal call to action on the page?
   * @property {boolean} [osl] Is this the principal call to action on the page?
   * @property {boolean} [osloff] Is this the principal call to action on the page?
   * @property {string} [backgroundColor] What background color to use
   * @property {'small' | 'medium' | 'large'} [size] How large should the button be?
   * @property {string} label Button contents
   * @property {() => void} [onclick] The onclick event handler
   * @property {string} [style] potentially be the replacement for primary switches between: [primary, secondary, hollow, neomorphic]
   * @property {boolean} [wide] potentially be the replacement for primary switches between: [primary, secondary, hollow, neomorphic]
   * @property {boolean} [rounded] potentially be the replacement for primary switches between: [primary, secondary, hollow, neomorphic]
	
   */

	/** @type {Props} */
	const {
		hollow = false,
		rounded = false,
		wide = false,
		inverted = false,
		osloff = false,
		osl = false,
		green = false,
		primary = false,
		neomorphic = false,
		backgroundColor,
		size = 'medium',
		label,
		onclick,
		style = 'secondary'
	} = $props();
</script>

<button
	type="button"
	class={['storybook-button', `storybook-button--${size}`].join(' ')}
	id={wide ? 'wide' : ''}
	class:storybook-button--primary={primary}
	class:storybook-button--hollow={!primary && hollow}
	class:storybook-button--secondary={!primary && !hollow}
	class:storybook-button--neomorphic={!primary && neomorphic}
	class:storybook-button--green={!primary && neomorphic && green}
	class:storybook-button--neomorphic-osl={!primary && neomorphic && osl}
	class:storybook-button--neomorphic-osl_off={osloff}
	style:background-color={backgroundColor}
	class:storybook-button--rounded={rounded}
	{onclick}
>
	{label}
	<!-- style:background-color=var({backgroundColor}) -->
</button>
<!-- onmouseover={onmouseover}
onmouseenter={onmouseenter}
onmouseleave={onmouseleave}
{...buttonProps} -->
<!-- id = {neomorphic ? 'storybook-button--neomorphic' : ''} -->
<!-- class:storybook-button--neomorphic-${primary?:primary|secondary} = {neomorphic} -->

<!-- BACKUP, old button. Do not delete -->
<!-- <button
  type="button"
  class = {['storybook-button', `storybook-button--${size}`].join(' ')}
  class:storybook-button--primary = {primary}
  class:storybook-button--neumorphic = {!primary}
  style:background-color = {backgroundColor}
  onclick = {onclick}
>
  {label}
</button> -->
