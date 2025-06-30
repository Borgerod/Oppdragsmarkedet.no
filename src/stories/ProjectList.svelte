<svelte:options runes />

<script lang="ts">
	import ProjectCard from './ProjectCard.svelte';

	const props = $props<{
		projects?: any[];
		gridView: boolean;
		sortBy?: string;
	}>();

	// Make projects reactive to prop changes
	let currentPage = $state(1);

	// Use $derived for reactive sorting and pagination
	const currentProjects = $derived(props.projects || []);
	const sortedProjects = $derived(getSortedProjects(currentProjects));
	const visibleProjects = $derived(sortedProjects.slice((currentPage - 1) * 12, currentPage * 12));
	const totalPages = $derived(Math.ceil(currentProjects.length / 12));

	// Reset to first page when projects change
	$effect(() => {
		currentProjects;
		currentPage = 1;
	});
	// Apply sorting based on sortBy parameter
	function getSortedProjects(projectList: any[]) {
		const sortedProjects = [...projectList];
		// Helper function to parse dates safely
		function parseDate(dateStr: string | null): Date {
			if (!dateStr) return new Date(0);

			// Handle ISO timestamp format from database
			if (dateStr.includes('T') || dateStr.includes('-')) {
				const parsed = new Date(dateStr);
				if (!isNaN(parsed.getTime())) {
					return parsed;
				}
			}

			// Handle Norwegian date format (e.g., "15. Mai" or "5. Mai")
			if (dateStr.includes('.') && dateStr.includes(' ')) {
				const monthMap: { [key: string]: number } = {
					januar: 0,
					februar: 1,
					mars: 2,
					april: 3,
					mai: 4,
					juni: 5,
					juli: 6,
					august: 7,
					september: 8,
					oktober: 9,
					november: 10,
					desember: 11
				};

				const parts = dateStr.toLowerCase().split(/[\s.]+/);
				if (parts.length >= 2) {
					const day = parseInt(parts[0]);
					const month = monthMap[parts[1]];
					const year = new Date().getFullYear(); // Use current year as default

					if (!isNaN(day) && month !== undefined) {
						return new Date(year, month, day);
					}
				}
			}

			// Fallback to standard date parsing
			const fallback = new Date(dateStr);
			return isNaN(fallback.getTime()) ? new Date(0) : fallback;
		}

		if (props.sortBy) {
			switch (props.sortBy) {
				case 'Mest relevant':
					// Default sorting - prioritize paid listings, then by listing priority score
					sortedProjects.sort((a, b) => {
						// Paid listings first
						if (a.paidListing !== b.paidListing) {
							return b.paidListing ? 1 : -1;
						}
						// Then by priority score (if available)
						const scoreA = a.listingPriorityScore || 0;
						const scoreB = b.listingPriorityScore || 0;
						return scoreB - scoreA;
					});
					break;
				case 'Publisert (ny til gammel)':
					sortedProjects.sort((a, b) => {
						const dateA = parseDate(a.postDate);
						const dateB = parseDate(b.postDate);
						return dateB.getTime() - dateA.getTime();
					});
					break;
				case 'Publisert (gammel til ny)':
					sortedProjects.sort((a, b) => {
						const dateA = parseDate(a.postDate);
						const dateB = parseDate(b.postDate);
						return dateA.getTime() - dateB.getTime();
					});
					break;
				case 'Pris (høy til lav)':
					sortedProjects.sort((a, b) => {
						const budgetA = a.budget || 0;
						const budgetB = b.budget || 0;
						return budgetB - budgetA;
					});
					break;
				case 'Pris (lav til høy)':
					sortedProjects.sort((a, b) => {
						const budgetA = a.budget || 0;
						const budgetB = b.budget || 0;
						return budgetA - budgetB;
					});
					break;

				// TODO [ ] make this when log-in, stores and gps functionality has been implemented.
				//   case 'Nærmest':
				//         // sort by project closest to the user based on their current gps location. (gps location not yet added, will also make some filters obsoleete. )
				//         sortedProjects.sort((a, b) => {
				//             const userLocatrion = ... (get this from user)
				//             const dateA = ....
				//             const dateB = ....
				//             return .... ;
				//         });
				//         break;
				// complete this

				// make sure it uses the user gps-location (locationData: point('location_data'))
				// and for the projects, it should use the address (		address: text('address'),)

				case 'Frist (minst til størst)':
					//
					sortedProjects.sort((a, b) => {
						const dateA = parseDate(a.dueDate);
						const dateB = parseDate(b.dueDate);
						return dateA.getTime() - dateB.getTime();
					});
					break;

				case 'Frist (størst til minst)':
					sortedProjects.sort((a, b) => {
						const dateA = parseDate(a.dueDate);
						const dateB = parseDate(b.dueDate);
						return dateB.getTime() - dateA.getTime();
					});
					break;
				case 'Mest populær':
					sortedProjects.sort((a, b) => {
						// Sort by combination of favorited count, view count, and purchase count
						const popularityA =
							(a.favoritedCount || 0) + (a.viewCount || 0) + (a.purchaseCount || 0) * 2;
						const popularityB =
							(b.favoritedCount || 0) + (b.viewCount || 0) + (b.purchaseCount || 0) * 2;
						return popularityB - popularityA;
					});
					break;
				case 'Minst populær':
					sortedProjects.sort((a, b) => {
						// Sort by combination of favorited count, view count, and purchase count (reverse)
						const popularityA =
							(a.favoritedCount || 0) + (a.viewCount || 0) + (a.purchaseCount || 0) * 2;
						const popularityB =
							(b.favoritedCount || 0) + (b.viewCount || 0) + (b.purchaseCount || 0) * 2;
						return popularityA - popularityB;
					});
					break;
				default:
					// No sorting (default behavior)
					break;
			}
		}

		return sortedProjects;
	}

	function changePage(page: number) {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
		}
	}
</script>

<div class="project-list" class:grid-view={props.gridView}>
	{#each visibleProjects as project}
		<ProjectCard {project} gridView={props.gridView}></ProjectCard>
	{/each}
</div>

<div class="pagination">
	<button onclick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
	<div class="page-numbers">
		{#each Array(totalPages)
			.fill(0)
			.map((_, i) => i + 1) as page}
			<button onclick={() => changePage(page)} class:active={page === currentPage}>{page}</button>
		{/each}
	</div>
	<button onclick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}
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
