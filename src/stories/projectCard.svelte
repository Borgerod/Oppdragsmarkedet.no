<!-- USED BY projectListPage, is the container for each company displayed in list.  -->
<svelte:options runes />

<script lang="ts">
	import './theme.css';
	import '@fortawesome/fontawesome-free/css/all.css';

	// import { Fa } from 'svelte-fa';
	// import { faHeart } from '@fortawesome/free-solid-svg-icons;

	import '../app.css';
	// import { onMount } from 'svelte';

	const props = $props<{
		project: any;
		gridView: boolean;
	}>();

	let favorite = $state(false);
	// let favorite = $state(true);

	let isExpanded = $state(false);
	let mainCardElement: HTMLElement;

	// Toggle expanded state
	function toggleExpand() {
		isExpanded = !isExpanded;
	}

	function handleFavorite() {
		favorite = !favorite;
	}

	console.log('in ProjectCard, gridView:', props.gridView);
</script>

<!-- OPTION 3 -->
<div
	class="main card row"
	class:grid-view={props.gridView}
	class:expanded={isExpanded}
	bind:this={mainCardElement}
>
	<div class="thumbnail">
		<img src={props.project.image_link} alt="decking schema" style="" />
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
						<!-- <i class="fa-lg far fa-heart" style="color: var(--accent-darker);"></i> -->
						<!-- <i class="fa-lg far fa-heart" style="color: var(--white);"></i> -->
						<!-- <i class="fa-lg far fa-heart" style="color: var(--white);"></i> -->
						<i class="fa-lg far fa-heart" style="color: var(--accent-signal);"></i>
					{/if}
				</div>
			</button>
			<!-- acts as inner fill for favorite-button -->
			<button class="favorite-button" onclick={handleFavorite}>
				<div class="icon">
					<!-- <div class="icon bottom-layer"> -->
					{#if favorite === false}
						<!-- <i class="fa-lg far fa-heart"></i> -->
						<!-- <i class="fa-lg fas fa-heart" style="color: var(--shadow-brighter);"></i> -->
						<i class="fa-lg fas fa-heart" style="color: var(--secondary-medium-translucent);"></i>
						<!-- <i class="fa-lg fas fa-heart" style="color: var(--secondary-translucent);"></i> -->
					{:else}
						<!-- <i class="fa-lg far fa-heart"></i> -->
						<!-- <i class="fa-lg fas fa-heart" style="color: var(--accent-medium);"></i> -->
						<i class="fa-lg fas fa-heart" style="color: var(--accent-signal);"></i>
						<!-- <i class="fa-lg fas fa-heart" style="color: var(--accent-little-translucent);"></i> -->
					{/if}
				</div>
			</button>
		{/if}
	</div>

	<div class="mini-profile container">
		<div class="upper">
			<div class="column">
				<div class="mini row">
					{#if props.project.payed_listing === true}
						<div class="tag">{props.project.payed_listing}</div>
					{/if}
					<p>
						{props.project.date_issued} | {props.project.area}
					</p>
				</div>

				<div class="small">
					<h4>{props.project.job_title}</h4>
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
						{props.project.category}
						{#if props.project.sub_category === true}, {props.project.sub_category}{/if}
					</h4>
				</div>
				<!-- <spacer></spacer> -->
				<!-- <spacer></spacer> -->
				<!-- <spacer></spacer> -->
			</div>
			<div class="row">
				<div class="tag-row-container">
					<div class="tag-row">
						<div class="tag green">{props.project.lister_class}</div>
						|
						{#each props.project.tags as tag}
							<div class="tag">{tag}</div>
						{/each}
					</div>
				</div>
				<div class="column s-SdDzWjP088pA due-date-container">
					<p>Frist</p>
					<p>{props.project.due_date}</p>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- {#if hasOverflow && !isExpanded}
	<button class="show-more-btn" onclick={toggleExpand}>
		<i class="fas fa-chevron-down"></i> Show more
	</button>
{/if}
{#if isExpanded}
	<button class="show-less-btn" onclick={toggleExpand}>
		<i class="fas fa-chevron-up"></i> Show less
	</button>
{/if} -->

<style>
	.thumbnail {
		position: relative;
		min-width: 150px;
		width: 30%; /* Fixed width percentage */
		padding: 0;
		margin: 0;
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
		/* overflow: auto; */
		min-height: 200px;
		/* height: 200px; */
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
		/* padding-right: 2rem; */
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
		/* bottom: 0; */
		/* max-height: 50%; */
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
		/* row-gap: 1rem; */
		flex: 3;
		justify-content: space-between;
	}

	.tag {
		padding: 1px 10px;
		border-radius: 1rem;
		background-color: var(--shadow-inv);
		display: flex;
		flex-wrap: nowrap;
		font-size: small;
		align-items: center;
	}

	.tag.green {
		background: rgba(from var(--accent) r g b / 50%);
	}

	.tag-row-container {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.tag-row {
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
		column-gap: 0.5rem;
		row-gap: 0.5rem;
		padding-right: 1.6rem;
	}

	.show-more-btn,
	.show-less-btn {
		background: none;
		border: none;
		color: var(--accent);
		cursor: pointer;
		font-size: small;
		padding: 4px 8px;
		margin: 8px auto;
		display: flex;
		align-items: center;
		gap: 4px;
		width: fit-content;
	}

	.show-more-btn:hover,
	.show-less-btn:hover {
		text-decoration: underline;
	}

	spacer {
		width: 100%;
	}

	.spacer {
		/* width: 25%;
		height: 100%; */
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
		/* filter: drop-shadow(0px 0px 0px var(--grey));
		filter: drop-shadow(0px 0px 0px grey); */
	}
	.icon.bottom-layer {
		z-index: -1;
	}
	.icon.upper-layer {
		/* z-index: 1; */
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

		/* margin-top: 1rem; */
		/* margin-left: 1rem; */
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
