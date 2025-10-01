import adapter from '@sveltejs/adapter-auto';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			'@images': 'static/images',
			'@src': 'src',
			'@lib': 'src/lib',
			'@db': 'src/db',
			'@components': 'src/components',
			'@stories': 'src/stories',
			'@forms': 'src/stories/forms'
		}
	}
};
export default config;
