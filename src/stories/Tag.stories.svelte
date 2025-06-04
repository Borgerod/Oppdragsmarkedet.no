<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tag from './Tag.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Components/Tag',
		component: Tag,
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: 'object',
				description: 'text to display in the tag'
			},

			color: {
				control: { type: 'select', control: 'color' },
				options: ['green', 'red', 'grey', 'accent', 'darkgrey']
			},

			textColor: {
				control: { type: 'select', control: 'color' },
				options: ['black', 'white']
			}
		},
		args: {
			label: 'Tag Label',
			color: 'grey',
			textColor: 'black'
		}
	});
</script>

<Story name="Green" args={{ label: 'Tag Label', color: 'green', textColor: 'black' }} />
<Story name="Grey" args={{ label: 'Tag Label', color: 'grey', textColor: 'black' }} />
<Story name="Red" args={{ label: 'Tag Label', color: 'red', textColor: 'black' }} />
<Story name="accent" args={{ label: 'Tag Label', color: 'accent', textColor: 'black' }} />
<Story name="darkgrey" args={{ label: 'Tag Label', color: 'darkgrey', textColor: 'black' }} />
