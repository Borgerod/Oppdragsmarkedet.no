<svelte:options runes />

<script lang="ts" module>
	// import '../src/color_scheme.css';
	// import '../src/app.css';
	// import '../src/theme.css';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
	import { fn } from '@storybook/test';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Components/Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {
			backgroundColor: { control: 'color' },
			size: {
				control: { type: 'select' },
				options: ['small', 'medium', 'large']
			},
			style: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'hollow', 'neomorphic']
			},
			type: {
				control: { type: 'select' },
				options: ['button', 'submit', 'reset']
			},
			icon: {
				control: 'text',
				description: 'Font Awesome icon class (e.g., "fa-home")'
			},
			rounded: { control: 'boolean' },
			wide: { control: 'boolean' },
			hollow: { control: 'boolean' },
			primary: { control: 'boolean' },
			dark_bg: { control: 'boolean' },
			osl: { control: 'boolean' }
		},
		args: {
			onclick: fn(),
			size: 'medium',
			type: 'button',
			label: 'Button'
		}
	});
</script>

<!-- Basic Button Variants -->
<Story name="Primary" args={{ primary: true }} />

<Story name="Secondary" args={{ style: 'secondary' }} />

<Story name="Hollow" args={{ hollow: true }} />

<!-- Size Variants -->
<Story name="Small" args={{ size: 'small' }} />

<Story name="Medium" args={{ size: 'medium' }} />

<Story name="Large" args={{ size: 'large' }} />

<!-- Special Styles -->
<Story name="Rounded" args={{ rounded: true }} />

<Story name="Wide" args={{ wide: true, label: 'Wide Button' }} />

<Story name="Dark Background" args={{ dark_bg: true }} />

<Story name="OSL Style" args={{ osl: true, hollow: true }} />

<!-- With Icon -->
<Story name="With Icon" args={{ icon: 'fa-star', label: 'Favorite' }} />

<Story name="Icon Only" args={{ icon: 'fa-home', label: '' }} />

<!-- Button Types -->
<Story name="Submit Button" args={{ type: 'submit', label: 'Submit' }} />

<Story name="Reset Button" args={{ type: 'reset', label: 'Reset' }} />

<!-- Customized -->
<Story
	name="Custom Color"
	args={{
		backgroundColor: '#6200ee',
		label: 'Custom Color',
		rounded: true
	}}
/>

<!-- Combined Features -->
<Story
	name="Feature Rich"
	args={{
		primary: true,
		rounded: true,
		size: 'large',
		icon: 'fa-check',
		label: 'Complete'
	}}
/>
