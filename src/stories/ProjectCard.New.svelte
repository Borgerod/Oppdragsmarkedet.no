<!-- USED BY projectListPage, is the container for each company displayed in list.  -->
<svelte:options runes />

<script lang="ts">
	// import '@fortawesome/fontawesome-free/css/all.css';
	import '@stories/theme.css';
	import '@src/app.css';
	import { onMount } from 'svelte';
	import Button from '@stories/Button.svelte';
	import Tag from '@stories/Tag.svelte';
	// import Carousel from 'svelte-carousel';

	const props = $props<{
		gridView: boolean;
		project: any;
	}>();
	let favorite = $state(false);
	let isExpanded = $state(false);
	let showAllTags = $state(false);
	let tagsOverflowing = $state(false);
	let mainCardElement: HTMLElement;
	let tagRowElement: HTMLElement;

	function formatBudget(budget: number | string): string {
		// Convert to number if it's a string
		const numValue = typeof budget === 'string' ? parseFloat(budget) : budget;

		// Format to have spaces for thousands and comma for decimals
		return numValue.toLocaleString('nb-NO', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});
	}
	function formatDate(date: number | string): string {
		// Convert to number if it's a string
		const numValue = typeof budget === 'string' ? parseFloat(budget) : budget;

		// Format to have spaces for thousands and comma for decimals
		return numValue.toLocaleString('nb-NO', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});
	}

	function handleClick() {
		isExpanded = !isExpanded;
	}

	// Using onclick as a variable to comply with instructions to use onaction format
	const onclick = handleClick;

	// Stand-in placeholder for image_link:
	props.project.image_link =
		// 'https://upload.wikimedia.org/wikipedia/commons/7/72/House_at_J%C3%A6ren_in_Norway_Garborgheimen.JPG';
		// 'https://i.pinimg.com/736x/7c/2b/98/7c2b980c9523a6d5bc9fa666478d9b95.jpg';
		'https://i.imgur.com/vSUTabR.png';
	// Set up CSS custom property when component mounts
	onMount(() => {
		document.documentElement.style.setProperty(
			'--project-image-url',
			`url(${props.project.image_link})`
		);

		// Check for tag overflow after rendering
		checkTagOverflow();

		// Also check on window resize
		window.addEventListener('resize', checkTagOverflow);

		return () => {
			window.removeEventListener('resize', checkTagOverflow);
		};
	});
	// const budget = props.project.currency + ' ' + formatBudget(props.project.budget);
	const budget = formatBudget(props.project.budget) + ' ' + 'kr';
	// const budget = formatBudget(props.project.budget);

	function formatTimestamp(date: Date, format: string = 'DD.MM.YYYY'): string {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		return format.replace('YYYY', year.toString()).replace('MM', month).replace('DD', day);
	}
	const formattedDate = formatTimestamp(new Date());

	function handleFavorite(event: Event) {
		favorite = !favorite;
		const target = event.currentTarget as HTMLElement;
		if (favorite) {
			target.textContent = 'favorite';
		} else {
			target.textContent = 'favorite_border';
		}
		event.stopPropagation(); // Prevent triggering card click
	}
	function toggleShowAllTags(event: Event) {
		showAllTags = !showAllTags;
		event.stopPropagation(); // Prevent triggering card click

		// If showing all tags, calculate and adjust heights after a small delay to ensure DOM update
		if (showAllTags) {
			setTimeout(adjustCardExpandedHeight, 10);
		}
	}

	// Check if tags are overflowing
	function checkTagOverflow() {
		if (tagRowElement) {
			// Compare scrollHeight (total content height) with clientHeight (visible height)
			tagsOverflowing = tagRowElement.scrollHeight > tagRowElement.clientHeight;
		}
	}

	// Dynamically adjust card height based on content
	function adjustCardExpandedHeight() {
		if (!tagRowElement || !mainCardElement) return;

		// Get the actual height needed for tags
		const tagRowHeight = tagRowElement.scrollHeight;

		// Set custom properties based on actual content size
		mainCardElement.style.setProperty('--expanded-tag-height', `${tagRowHeight}px`);

		// Calculate the total height needed for the expanded card
		// Base height plus the additional height needed for tags
		const baseCardHeight = 450; // Current max-height
		const expandedTagHeight = tagRowHeight - 50; // Subtract the default tag height
		const expandedCardHeight = baseCardHeight + expandedTagHeight;

		// Set the custom property for expanded card height
		mainCardElement.style.setProperty('--expanded-card-height', `${expandedCardHeight}px`);
	}
</script>

<div
	class="card project-card"
	class:grid-view={props.gridView}
	class:expanded={isExpanded}
	bind:this={mainCardElement}
>
	<div class="top-row">
		{#if props.project.paidListing}
			<!-- <div class="payed-listing-tag">
				<span> betalt plassering </span>
			</div> -->
			<span class="material-icons md-36 inline-icon paid-icon">paid</span>
			<!-- <Tag label="Betalt plassering" color="accent" textColor="white" /> -->
			<div class="price-tag"></div>
		{/if}
		<div class="leftside">
			<div class="price-tag">
				<Tag label={budget} color="darkgrey" textColor="white" shadow size="small" />
			</div>
			<div class="favorite-container"></div>
			<span class="material-icons md-36 inline-icon favorite-icon" onclick={handleFavorite}
				>favorite_border</span
			>
		</div>
		<!-- <span class="material-icons md-36 inline-icon favorite-icon">favorite</span> -->
	</div>
	<div class="filler-box"></div>
	<div class="card-image-overlay"></div>
	<div class="info-container">
		<div class="title-row">
			<h2>
				{props.project.title}
			</h2>

			<!-- <div>{budget}</div> -->
		</div>
		<div class="description">
			<p>
				{props.project.shortDescription}
			</p>
		</div>
		<!-- <div class="date-grid">
			<span>
				lagt ut: <span>{formatTimestamp(new Date(props.project.postDate))}</span>
			</span>
			<span>
				Frist: <span>{formatTimestamp(new Date(props.project.dueDate))}</span>
			</span>
			<span>
				arbeidstid: <span>{props.project.estimatedTime}</span>
			</span>
		</div> -->
		<div class="tag-row" bind:this={tagRowElement} class:expanded={showAllTags}>
			{#each props.project.experienceRequirements as req}
				<Tag label={req} color="grey" textColor="white" size="small" shadow />

				<!-- <Tag label="your" color="grey" textColor="white" /> -->
				<!-- <Tag label="dad" color="grey" textColor="white" /> -->
			{/each}
			{#each props.project.jobAttributes as attr}
				<!-- <div class="tag"> -->
				<Tag label={attr} color="grey" textColor="white" size="small" shadow />
				<!-- </div> -->
			{/each}
			{#if tagsOverflowing}
				<button class="show-more-tags" onclick={toggleShowAllTags}>
					<span class="material-icons">{showAllTags ? 'expand_less' : 'expand_more'}</span>
					<span>{showAllTags ? 'Vis færre' : 'Vis flere'}</span>
				</button>
			{/if}
		</div>
		<!-- <div class="button"> -->
		<Button
			{onclick}
			size="medium"
			type="button"
			label="Les mer"
			primary={true}
			hollow={false}
			dark_bg={false}
			osl={false}
			rounded={true}
			wide
		/>
		<!-- </div> -->
	</div>
</div>

<style>
	:root {
		--base-max-height: 350px;
		--base-min-height: 450px;
		--expanded-tag-height: auto;
		--expanded-card-height: 480px;
		--tag-row-base-height: 50px;
		--transition-speed: 0.3s;
	}
	.card {
		/* display: flex;
		transition: height 0.3s ease;
		padding: 0;
		border-radius: 2rem;		
		border-radius: 1rem;
		min-height: 200px;
		min-width: 250px;
		max-width: 100%;

		box-shadow:
			inset 0 0 40px var(--primary-bg),
			0 5px 15px var(--shadow),
			0 1px 6px var(--shadow-bright),
			0 1px 1px var(--shadow); */

		/* > TEST */
		display: flex;
		transition: height 0.3s ease;
		padding: 0;
		border-radius: 2.5rem;
		/* border-radius: 1rem; */
		/* height: 400px; */
		/* min-width: 250px;
		max-width: 300px; */

		box-shadow:
			inset 0 0 10px var(--primary-bg),
			0 5px 15px var(--shadow),
			0 1px 6px var(--shadow-bright),
			0 1px 1px var(--shadow);
	}

	.project-card.grid-view {
		flex-direction: column;
		/* height: auto; */

		/* min-height: var(--base-min-height);
		max-height: var(--base-max-height); */

		min-width: 250px;
		max-width: 300px;
	}
	.card.project-card {
		background-image: var(--project-image-url);
		background-size: 100% 100%;
		/* Show top half of the image */
		background-position: center top;
		position: relative;
		overflow: hidden;

		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		justify-content: space-between;
		align-items: center;
		/* min-height: 350px;
		max-height: 450px; */

		min-height: 350px;
		max-height: 450px;

		transition: max-height 0.3s ease;
		padding: 1rem;
	} /* When tags are expanded, allow the card to grow */
	.card.project-card:has(.tag-row.expanded) {
		max-height: var(--expanded-card-height);
		height: var(--expanded-card-height);
		/* Use flexbox to maintain proportional sizes */
		display: flex;
		flex-direction: column;
	}
	.info-container:has(.tag-row.expanded),
	.card.project-card:has(.info-container .tag-row.expanded) .info-container {
		max-height: calc(
			var(--base-max-height) * 0.6 + var(--expanded-tag-height) - var(--tag-row-base-height)
		);
		height: auto;
		overflow: visible;
		/* Ensure it has enough space for expanded content */
		min-height: calc(var(--base-min-height) * 0.6);
		padding-bottom: 1rem; /* Add some bottom padding */
	} /* When tag-row is expanded, adjust the card-image-overlay to grow */
	.card.project-card:has(.tag-row.expanded) .card-image-overlay {
		/* Grow proportionally */
		height: 50%; /* Keep same percentage */
		max-height: calc(
			var(--base-max-height) * 0.5 * (var(--expanded-card-height) / var(--base-max-height))
		);
		min-height: calc(
			var(--base-min-height) * 0.5 * (var(--expanded-card-height) / var(--base-min-height))
		);
		bottom: 0;
		position: absolute;
	}

	.info-container:has(.tag-row.expanded) .description,
	.info-container:has(.tag-row.expanded) .description p {
		/* Keep description visible but don't change its height constraints */
		max-height: 70px; /* Maintain the same max-height */
	}

	/* Ensure the title row stays properly visible */
	.info-container:has(.tag-row.expanded) .title-row {
		overflow: visible;
	}
	.card .info-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		z-index: 2; /* Increased z-index to stay above the overlay */
		pointer-events: auto;
		flex-wrap: nowrap;
		min-height: 175px;
		max-height: 225px;
		gap: 1rem;
		justify-content: flex-end;
		min-height: calc(var(--base-min-height) * 0.45);
		max-height: calc(var(--base-max-height) * 0.45);
		padding-top: 1rem;
		transition:
			max-height 0.3s ease,
			height 0.3s ease;
	}
	/* .info-container:has(.tag-row.expanded) {
		max-height: none;
		height: auto;
	} */
	.card-image-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50%;
		background-image: var(--project-image-url);
		background-size: 100% 200%;
		background-position: center bottom;
		z-index: 1;
		filter: blur(8px);
		--shadow-inv: hsla(from var(--shadow) h s calc(l * 4.5) / alpha);
		--shadow-brighter: hsla(0, 0%, 0%, 0.05);
		--shadow-bright: hsla(0, 0%, 0%, 0.122);
		--shadow: hsla(0, 0%, 0%, 0.161);
		--shadow-dark: #00000044;
		--shadow-white: hsla(0, 0%, 100%, 0.589);
		--primary-bg-translucent: hsla(from var(--primary-bg) h s l / 0.5);
		min-height: 175px;
		max-height: 225px;
		box-shadow:
			inset -20px -5px 15px -10px var(--primary-bg-translucent),
			inset 20px -5px 15px -10px var(--primary-bg-translucent),
			inset 0px -20px 15px -10px var(--primary-bg-translucent);
		transition:
			height 0.3s ease,
			max-height 0.3s ease;

		min-height: calc(var(--base-min-height) * 0.45);
		max-height: calc(var(--base-max-height) * 0.45);
	}
	.card .filler-box {
		width: 100px;
		height: 175px;
		transition: height 0.3s ease;
		flex-shrink: 0; /* Prevent shrinking */
	}
	/* Make the filler-box grow proportionally when tag-row is expanded */
	.card.project-card:has(.tag-row.expanded) .filler-box {
		/* Grow proportionally based on the expansion factor */
		height: calc(
			var(--base-min-height) * 0.4 * (var(--expanded-card-height) / var(--base-min-height))
		);
	}

	/* When tag-row is expanded, adjust the overlay */
	/* .card-image-overlay:has(+ .info-container .tag-row.expanded) {
		height: auto;
		max-height: none;
	} */

	/* .info-image-overlay:has(.tag-row.expanded) {
		max-height: none;
		height: auto;
	} */
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

	.card h2 {
		color: var(--secondary-bg);
		font-weight: 600;
	}
	.card p {
		color: var(--secondary-darkmode);
		font-size: smaller;
		font-size: small;
	}
	.card .top-row {
		/* padding: 1rem; */
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	.top-row .leftside {
		display: flex;
		flex-direction: row;
		column-gap: 0.25rem;
		align-items: center;
		justify-content: flex-end;
	}
	.inline-icon {
		margin-right: 0rem;
	}
	.card .price-tag {
		/* padding: 1rem; */
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: flex-end;
		/* width: 50px;
		height: 10px; */
	}
	.top-row .payed-listing-tag {
		padding: 0.5rem;
		background-color: var(--accent-brighter);
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-items: auto;
	}
	.card .date-grid {
		display: grid;
		grid-template-columns: auto auto;
		/* display: flex; */
		/* flex-direction: column; */
	}
	.date-grid span {
		color: var(--secondary-darkmode);
	}

	.info-container .title-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		max-height: 20px;
		overflow: hidden;
	}
	.info-container .description,
	.info-container .description p {
		overflow: hidden;
		/* overflow-wrap: break-word; */
		/* white-space: nowrap; */
		text-overflow: ellipsis;
		/* min-height: 40px;
		max-height: 80px; */
		max-height: 70px;
		min-height: 20px;
		/* height: 70px; */
	}
	.info-container .tag-row {
		height: var(--tag-row-base-height);
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		max-height: var(--tag-row-base-height);
		overflow: hidden;
		padding: 0;
		margin: 0;
		list-style: none;
		transition:
			max-height var(--transition-speed) ease,
			height var(--transition-speed) ease;
		position: relative; /* For positioning the show-more button */
	}

	.info-container .tag-row.expanded {
		max-height: var(--expanded-tag-height);
		height: var(--expanded-tag-height);
		overflow: visible;
		padding-bottom: 2.5rem; /* Space for the show-more button */
	}

	/* .info-container:has(.tag-row.expanded) {
		max-height: none;
		height: auto;
	} */
	/* When tag-row is expanded, also adjust the info-container */
	.info-container .show-more-tags {
		position: absolute;
		right: 0;
		bottom: 0;
		background: linear-gradient(to left, var(--primary-bg) 60%, transparent);
		border: none;
		font-size: 0.8rem;
		padding: 2px 8px;
		display: flex;
		align-items: center;
		color: var(--accent-medium);
		cursor: pointer;
		z-index: 3; /* Ensure it's above other elements */
	}

	.info-container .tag-row.expanded .show-more-tags {
		bottom: 0; /* Keep at the bottom when expanded */
	}

	.info-container .show-more-tags .material-icons {
		font-size: 1rem;
		margin-right: 2px;
	}

	.info-container .button {
		display: flex;
		flex-direction: column;
		width: 100%;
		overflow: hidden;
		align-items: stretch;
		justify-content: center;
		align-content: stretch;
	}

	.tag-row .tag {
		height: 20px;
	} /* Additional transitions for smoother animation */
	.card.project-card,
	.card .info-container,
	.card-image-overlay,
	.info-container .tag-row,
	.card .filler-box {
		transition: all var(--transition-speed) ease;
	}

	/* Add proper spacing in expanded state */
	.card.project-card:has(.tag-row.expanded) {
		justify-content: space-between;
		min-height: var(--expanded-card-height);
	}
</style>
