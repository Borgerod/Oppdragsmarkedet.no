/** @type { import('@storybook/sveltekit').StorybookConfig } */
const config = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts|svelte)'],
	addons: [
		'@storybook/addon-essentials',
		{
			name: '@storybook/addon-svelte-csf',
			options: {
				legacyTemplate: true
			}
		},
		'@chromatic-com/storybook',
		'@storybook/experimental-addon-test'
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	}
};
export default config;
