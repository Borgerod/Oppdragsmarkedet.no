<svelte:options runes />

<script context="module" lang="ts">
	import tippy, { type Props } from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import './tooltip.css'; // Import our custom theme CSS

	// Export the tooltip function from the module context
	export function tooltip(node: HTMLElement, content: string | Partial<Props>) {
		// Configure tooltip based on whether content is a string or options object
		const options = typeof content === 'string' ? { content } : content;

		const tooltip = tippy(node, {
			delay: [800, 200],
			theme: 'oppdragsmarkedet bright',
			// theme: 'oppdragsmarkedet',

			...options,
			appendTo: document.body
		});
		return {
			update(newContent: string | Partial<Props>) {
				// Update tooltip content when props change
				if (typeof newContent === 'string') {
					tooltip.setProps({ content: newContent });
				} else {
					tooltip.setProps(newContent);
				}
			},
			destroy() {
				tooltip.destroy();
			}
		};
	}
</script>

<script lang="ts">
	// Component props can go here if needed
</script>

<style>
	/* Remove the old tomato theme since we now have our custom theme in tooltip.css */
</style>
