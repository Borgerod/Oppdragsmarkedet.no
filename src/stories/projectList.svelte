<svelte:options runes />

<script lang="ts">
	// import ProjectCard from './ProjectCard.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import { writable, derived } from 'svelte/store';

	// ! bug
	// TODO [ ]: fix bug; the favorite icon are not unique. if i favorite the first project  page 1, but when next page; the first project on page 2 is also favoritted.
	const props = $props<{
		projects?: any[];
		gridView: boolean;
		sortBy?: string;
	}>();
	// console.log('ALL PROJECTS:___________________________');
	// console.log(props.projects);
	// console.log(props.projects.length);
	const currentPage = writable(1);
	const totalPages = Math.ceil(props.projects.length / 12);
	function changePage(page: number) {
		if (page >= 1 && page <= totalPages) {
			currentPage.set(page);
		}
	}

	// TODO [] make sure that this is working, it doesn't seem like it is.
	// > copilot referance: could you make the sortby dropdown to actually work?
	// Apply sorting based on sortBy parameter
	function getSortedProjects(projectList: any[]) {
		const sortedProjects = [...projectList];

		if (props.sortBy) {
			switch (props.sortBy) {
				case 'Mest relevant':
					// Default sorting (no change required)
					break;
				case 'Publisert (ny til gammel)':
					sortedProjects.sort((a, b) => {
						// Parse dates and sort by newest first
						const dateA = new Date(a.date_issued.split('.').reverse().join('-'));
						const dateB = new Date(b.date_issued.split('.').reverse().join('-'));
						return dateB.getTime() - dateA.getTime();
					});
					break;
				case 'Publisert (gammel til ny)':
					sortedProjects.sort((a, b) => {
						// Parse dates and sort by oldest first
						const dateA = new Date(a.date_issued.split('.').reverse().join('-'));
						const dateB = new Date(b.date_issued.split('.').reverse().join('-'));
						return dateA.getTime() - dateB.getTime();
					});
					break;
				case 'Pris (høy til lav)':
					// If price data becomes available, sort by price high to low
					// Currently no price data in the project objects
					break;
				case 'Pris (lav til høy)':
					// If price data becomes available, sort by price low to high
					// Currently no price data in the project objects
					break;
				case 'Nærmest':
					// This would require geolocation data, currently using due date as a proxy for "nearest"
					sortedProjects.sort((a, b) => {
						// Parse due dates and sort by closest deadline first
						const dateA = new Date(a.due_date.split('.').reverse().join('-'));
						const dateB = new Date(b.due_date.split('.').reverse().join('-'));
						return dateA.getTime() - dateB.getTime();
					});
					break;
				default:
					// No sorting (default behavior)
					break;
			}
		}

		return sortedProjects;
	}

	// Computed value with runes - now with sorting applied
	const visibleProjects = derived(currentPage, ($currentPage) => {
		const sortedProjects = getSortedProjects(props.projects);
		return sortedProjects.slice(($currentPage - 1) * 12, $currentPage * 12);
	});

	// console.log('in ProjectList, gridView:', props.gridView);
	// console.log('in ProjectList, sortBy:', props.sortBy);
</script>

<div class="project-list" class:grid-view={props.gridView}>
	{#each $visibleProjects as project}
		{console.log(project)}
		<ProjectCard {project} gridView={props.gridView}></ProjectCard>
	{/each}
</div>

<div class="pagination">
	<button onclick={() => changePage($currentPage - 1)} disabled={$currentPage === 1}
		>Previous</button
	>
	<div class="page-numbers">
		{#each Array(totalPages)
			.fill(0)
			.map((_, i) => i + 1) as page}
			<button onclick={() => changePage(page)} class:active={page === $currentPage}>{page}</button>
		{/each}
	</div>
	<button onclick={() => changePage($currentPage + 1)} disabled={$currentPage === totalPages}
		>Next</button
	>
</div>

<style>
	/* NEUMORPHIC */
	.project-list {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-content: flex-start;
		justify-content: flex-start;
		/* align-items: flex-start; */
		width: 100%;
		/* padding: 2rem; */
		row-gap: 2rem;
		max-width: 100%;
		/* overflow: hidden; */
		padding-top: 2rem;
		/* padding-bottom: 0.5rem;
		padding-right: 0.5rem;
		padding-left: 0.5rem; */
	}

	.project-list.grid-view {
		/* grid-template-columns: repeat(3, 1fr); */
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		width: 100%;
	}

	/* Media queries for responsive grid view */
	@media (min-width: 1200px) {
		.project-list.grid-view {
			/* grid-template-columns: repeat(3, 1fr); */
		}
	}

	@media (max-width: 1000px) {
		.project-list.grid-view {
			/* grid-template-columns: repeat(2, 1fr); */
			/* grid-template-columns: repeat(3, 1fr); */
		}
	}

	/* @media (max-width: 630px) { */
	@media (max-width: 990px) {
		.project-list.grid-view {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
			/* grid-template-columns: 1fr; */
		}
	}
	@media (max-width: 890px) {
		.project-list.grid-view {
			grid-template-columns: repeat(3, 1fr);
			gap: 1rem;
			/* grid-template-columns: 1fr; */
		}
	}

	/* @media (max-width: 630px) { */
	@media (max-width: 740px) {
		.project-list.grid-view {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
			/* grid-template-columns: 1fr; */
		}
	}

	/* @media (max-width: 630px) { */
	@media (max-width: 630px) {
		.project-list.grid-view {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
			/* grid-template-columns: 1fr; */
		}
	}

	.grid-view :global(.main.card) {
		flex-direction: column;
		height: auto;
		row-gap: 0;
		/* min-width: 250px; */
		/* max-width: 100%; */
	}

	.grid-view :global(.thumbnail) {
		width: 100%;
		height: 200px;
		min-width: unset;
	}

	.grid-view :global(.main.card .mini-profile.container) {
		width: 100%;
	}

	.pagination {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 2rem;
		width: 100%;
	}

	.pagination .page-numbers {
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		margin: 0 1rem;
	}

	.pagination button {
		margin: 0 5px;
		padding: 5px 10px;
		cursor: pointer;
	}

	.pagination button.active {
		font-weight: bold;
		text-decoration: underline;
	}

	.pagination button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.favorite-container {
		border-radius: 5rem;
	}
	.favorite-icon {
		/* background-color: var(--shadow); */
		/* display: flex; */
		/* justify-content: center; */
		/* align-items: center; */
		/* padding: 5px 5px 5px 5px; */
		/* line-height: 1; */
		/* border-radius: 5rem; */
		color: var(--primary-bg);
		color: var(--accent-medium);
		font-variation-settings:
			'FILL' 0,
			'wght' 400,
			'GRAD' 0,
			'opsz' 24;
	}

	.paid-icon {
		border-radius: 5rem;
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
		background-color: var(--primary-bg);
		color: var(--accent-medium);
		/* color: var(--accent-brighter); */
		/* background-color: var(--accent-medium);
		color: var(--primary-bg); */
		/* color: var(--primary-bg); */
	}
</style>
