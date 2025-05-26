import adapter from '@sveltejs/adapter-auto';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			'@src': 'src',
			'@db': 'src/db',
			'@components': 'src/components',
			'@stories': 'src/stories',
			'@forms': 'src/stories/forms'
		}
	}
};
export default config;
