<!-- USED BY projectListPage, is the container for each company displayed in list.  -->
<svelte:options runes />

<script lang="ts">
	import './theme.css';
	import '@fortawesome/fontawesome-free/css/all.css';
	import '../app.css';
	import Tag from '@stories/Tag.svelte';

	const props = $props<{
		project: any;
		gridView: boolean;
	}>();

	let favorite = $state(false);
	let isExpanded = $state(false);
	let mainCardElement: HTMLElement;

	function formatBudget(budget: number | string): string {
		// Convert to number if it's a string
		const numValue = typeof budget === 'string' ? parseFloat(budget) : budget;

		// Format to have spaces for thousands and comma for decimals
		return numValue.toLocaleString('nb-NO', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});
	}
	// Format date to YYYY.MM.DD
	function formatDate(dateString: string): string {
		if (!dateString) return '';

		try {
			const date = new Date(dateString);

			// Check if date is valid
			if (isNaN(date.getTime())) {
				return dateString;
			}

			const day = date.getDate().toString();

			// Array of month names in Norwegian
			const monthNames = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'Mai',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Okt',
				'Nov',
				'Des'
			];

			const month = monthNames[date.getMonth()];
			const year = date.getFullYear();

			return `${day}. ${month} ${year}`;
		} catch (error) {
			console.error('Error formatting date:', error);
			return dateString;
		}
	}

	// Toggle expanded state
	function toggleExpand() {
		isExpanded = !isExpanded;
	}

	function handleFavorite() {
		favorite = !favorite;
	}

	// console.log('in ProjectCard, gridView:', props.gridView);
	console.log('props.project.image_link: ', props.project.thumbnail);
</script>

<div
	class="main card row"
	class:grid-view={props.gridView}
	class:expanded={isExpanded}
	bind:this={mainCardElement}
>
	<div class="thumbnail">
		<img src={props.project.thumbnail} alt="project thumbnail" style="" />
		{#if props.gridView}
			<!-- acts as outer rim fill for favorite-button -->
			<button
				class="favorite-button upper-layer"
				class:grid-view={props.gridView}
				onclick={handleFavorite}
			>
				<div class="icon upper-layer">
					{#if favorite === false}
						<i class="fa-lg far fa-heart"></i>
					{:else}
						<i class="fa-lg far fa-heart" style="color: var(--accent-signal);"></i>
					{/if}
				</div>
			</button>
			<!-- acts as inner fill for favorite-button -->
			<button class="favorite-button" onclick={handleFavorite}>
				<div class="icon">
					{#if favorite === false}
						<i class="fa-lg fas fa-heart" style="color: var(--secondary-medium-translucent);"></i>
					{:else}
						<i class="fa-lg fas fa-heart" style="color: var(--accent-signal);"></i>
					{/if}
				</div>
			</button>
		{/if}
		{#if props.project.paidListing === true}
			<span class="material-icons md-36 inline-icon paid-icon" style="top:1rem; left:1rem"
				>paid</span
			>
		{/if}
		<!-- {:else if props.project.paidListing === true}
			<span class="material-icons md-36 inline-icon paid-icon">paid</span>
		{/if} -->
	</div>

	<div class="mini-profile container">
		<div class="upper">
			<div class="column">
				<div class="mini row">
					<p>
						{formatDate(props.project.postDate)} | {props.project.location}
					</p>
				</div>
				<p></p>
				<!-- <div class="small"></div> -->
				<div class="small">
					<h2>{formatBudget(props.project.budget)} kr</h2>
					<h3>{props.project.title}</h3>

					<!-- <Tag>
						</Tag> -->
				</div>
			</div>
			{#if !props.gridView}
				<div
					class="spacer"
					aria-label="will be stand in for favorite button, act as its margin"
				></div>
				<button class="favorite-button" onclick={handleFavorite}>
					<div class="icon">
						{#if favorite === false}
							<i class="fa-lg far fa-heart"></i>
						{:else}
							<i class="fa-lg fas fa-heart" style="color: var(--accent);"></i>
						{/if}
					</div>
				</button>
			{/if}
		</div>

		<div class="lower">
			<div class="small row">
				<div class="small space row">
					<h4 class="">
						<!-- {props.project.category} -->
						{#if props.project.subCategory === true}, {props.project.subCategory}{/if}
					</h4>
				</div>
			</div>
			<div class="row">
				<div class="tag-row-container">
					<div class="tag-row">
						<div class="tag green">{props.project.clientRole}</div>
						<!-- TODO [ ] this does not exist add or remove this -->
						|
						{#each props.project.experienceRequirements as tag}
							<div class="tag">{tag}</div>
						{/each}
						{#each props.project.jobAttributes as tag}
							<div class="tag">{tag}</div>
						{/each}
					</div>
				</div>
				<div class="column s-SdDzWjP088pA due-date-container">
					<p>Frist</p>
					<p>{formatDate(props.project.dueDate)}</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.card h4 {
		color: var(--primary);
		font-weight: 100;
		font-size: medium;
	}
	.card h3 {
		/* color: var(--primary); */
		font-weight: 100;
		font-size: medium;
	}
	.card h2 {
		font-size: large;
		color: var(--primary);
		font-weight: 500;
	}
	.card p {
		color: var(--secondary);
	}
	.thumbnail {
		position: relative;
		min-width: 150px;
		width: 30%; /* Fixed width percentage */
		padding: 0;
		margin: 0;
	}
	.thumbnail .paid-icon {
		position: absolute;
		top: 0.5rem;
		left: 0.5rem;
		top: 1rem;
		left: 1rem;
		border-radius: 5rem;
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 19px;
		height: 19px;
		/* background-color: var(--primary-bg); */
		/* background-color: var(--primary); */
		color: var(--accent-medium);
		/* color: var(--accent-brighter); */
		/* background-color: var(--accent-brightest); */
		background-color: var(--primary-bg);
		/* background-color: var(--accent-medium);
		color: var(--primary-bg); */
	}
	.thumbnail img {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: center;
		border-radius: 0.5rem 0 0 0.5rem;
	}

	.main.card.grid-view .thumbnail img {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: center;
		border-radius: 0.5rem 0.5rem 0 0;
	}

	/* Ensure the main card has proper structure to support the thumbnail */
	.main.card {
		display: flex;
		align-items: stretch;
		padding: 0;
		min-height: 200px;
		transition: height 0.3s ease;
		min-width: 250px;
		max-width: 100%;
	}

	/* Grid view styling */
	.main.card.grid-view {
		flex-direction: column;
		height: auto;
		min-height: 350px;
		max-height: 450px;
	}

	.main.card.grid-view .tag-row {
		padding-right: 20%;
	}

	/* Expanded card state */
	.main.card.expanded {
		height: auto;
		min-height: 200px;
		overflow: visible;
	}

	/* Adjust container to properly align with the thumbnail */
	.mini-profile.container {
		padding: 1rem;
		flex: 1;
		justify-content: space-between;
		overflow: hidden;
		row-gap: 1rem;
		position: relative;
	}

	.upper {
		display: flex;
		flex-direction: row;
		row-gap: 1rem;
		width: 100%;
		justify-content: space-between;
	}
	.lower {
		display: flex;
		flex-direction: column;
		row-gap: 0.5rem;
	}
	.lower .column {
		row-gap: 0.25rem;
		display: flex;
		align-items: flex-end;
	}

	.due-date-container {
		margin-top: 1rem;
		margin-left: 1rem;
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		text-align: right;
		display: flex;
		flex-direction: column;
		row-gap: 0.25rem;
	}

	.column {
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
	}

	.row {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
	.mini.row {
		justify-content: flex-start;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		flex-wrap: nowrap;
		flex: 3;
		justify-content: space-between;
	}

	.spacer {
		width: 42px;
		height: 42px;
	}

	.space {
		width: 100%;
		column-gap: 100%;
	}

	.card .mini {
		border-radius: 0.5rem;
		margin-bottom: -0.5rem;
	}

	.card .small {
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		align-items: flex-end;
		padding: 0;
	}

	.card {
		border-radius: 0.5rem;
		padding: 2rem;
		width: 100%;
		row-gap: 1rem;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-wrap: nowrap;
	}
	.main.card {
		box-shadow:
			0 1px 6px var(--shadow-bright),
			0 1px 1px var(--shadow);
	}

	.main.card:hover {
		background-color: var(--accent-very-translucent);
		box-shadow:
			0 3px 6px var(--shadow-bright),
			0 3px 8px var(--shadow);
	}

	.favorite-button:hover {
		background-color: var(--accent-brightest);
	}
	.favorite-button:hover i {
		color: black;
	}

	.favorite-button .icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
	}

	.favorite-button {
		width: 42px;
		height: 42px;
		padding: 0;
		border-radius: 8px;
		box-shadow: none;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 999px;
		position: absolute;
		top: 5px;
		right: 5px;
		text-align: right;
		display: flex;
		flex-direction: column;
		row-gap: 0.25rem;
	}

	@media (max-width: 400px) {
		.main.card {
			min-width: 100%;
		}

		.due-date-container {
			position: relative;
			bottom: auto;
			right: auto;
			margin: 0.5rem 0 0 0;
			align-items: flex-start;
		}
	}
</style>
