<!-- USED BY projectListPage, is the container for each company displayed in list.  -->
<svelte:options runes />

<script lang="ts">
	import './theme.css';
	import '@fortawesome/fontawesome-free/css/all.css';
	import '../app.css';
	// Note: Tag import has compilation issue - broader Svelte 5 config problem
	// @ts-ignore
	import Tag from '@stories/Tag.svelte';
	const props = $props<{
		project: any;
		gridView: boolean;
	}>();
	let favorite = $state(false);
	let isExpanded = $state(false);
	let mainCardElement: HTMLElement;
	let tagsOverflowing = $state(false);
	let showAllTags = $state(false);
	let tagRowElement: HTMLElement;
	let hiddenShowMoreButtonElement = $state<HTMLElement | undefined>(undefined);
	let regularShowMoreButtonElement = $state<HTMLElement | undefined>(undefined);
	let visibleTagCount = $state(0); // How many tags to show (0 means show all)
	let resizeObserver: ResizeObserver | undefined;
	let showMoreDivVisible = $state(false);
	let shouldHideRegularButton = $state(false); // Flag to hide regular button when it can't fit
	let tagRowWidth = $state(0); // Track tag-row width
	let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

	// Initialize the state properly
	$effect(() => {
		// Reset flags when component initializes
		shouldHideRegularButton = false;
		showMoreDivVisible = false;
	});

	// Debounced function to update tag row width
	function updateTagRowWidth(width: number) {
		if (resizeTimeout) {
			clearTimeout(resizeTimeout);
		}
		resizeTimeout = setTimeout(() => {
			tagRowWidth = width;
		}, 50); // 50ms debounce
	}

	// Track tag-row width and show/hide buttons based on width
	$effect(() => {
		if (tagRowElement) {
			// Set up ResizeObserver to track tag-row width with debouncing
			const resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					updateTagRowWidth(entry.contentRect.width);
				}
			});

			resizeObserver.observe(tagRowElement);

			// Initial measurement
			tagRowWidth = tagRowElement.offsetWidth;

			return () => {
				resizeObserver.disconnect();
				if (resizeTimeout) {
					clearTimeout(resizeTimeout);
				}
			};
		}
	});
	// Reactive logic: hidden-show-more is visible when tag-row width is 155px or less
	$effect(() => {
		// Always start by checking if showAllTags is true - if so, hide hidden-show-more
		if (showAllTags) {
			showMoreDivVisible = false;
			shouldHideRegularButton = false;
			return;
		}

		// If tags are not overflowing, no button should be shown
		if (!tagsOverflowing) {
			showMoreDivVisible = false;
			shouldHideRegularButton = false;
			return;
		}
		// Only update if tagRowWidth is a valid number to prevent unnecessary updates
		if (tagRowWidth > 0) {
			// Show hidden-show-more when tag-row width is 155px or less
			const shouldShowHidden = tagRowWidth <= 155;
			console.log(
				'tagRowWidth:',
				tagRowWidth,
				'shouldShowHidden:',
				shouldShowHidden,
				'tagsOverflowing:',
				tagsOverflowing
			);

			// Only update state if it actually changed to prevent unnecessary re-renders
			if (showMoreDivVisible !== shouldShowHidden) {
				showMoreDivVisible = shouldShowHidden;
				shouldHideRegularButton = shouldShowHidden;
			}
		}
	});

	// Toggle expanded state
	function toggleExpand() {
		isExpanded = !isExpanded;
	}

	function handleFavorite() {
		favorite = !favorite;
	}
	function toggleShowAllTags(event: Event) {
		showAllTags = !showAllTags;
		event.stopPropagation(); // Prevent triggering card click

		// If showing all tags, calculate and adjust heights after a small delay to ensure DOM update
		if (showAllTags) {
			setTimeout(adjustCardExpandedHeight, 10);
		}
	} // Get combined array of all tags for easier processing
	function getAllTags() {
		return [
			...(props.project.tags || []),
			...(props.project.experienceRequirements || []),
			...(props.project.jobAttributes || [])
		];
	}

	// Calculate total available tags
	function getTotalTagCount() {
		return getAllTags().length;
	}

	// Check if tags overflow and calculate optimal visible count
	function checkAndAdjustTagOverflow() {
		if (!tagRowElement) return;

		const allTags = getAllTags();
		const totalTags = allTags.length;

		if (totalTags === 0) {
			tagsOverflowing = false;
			visibleTagCount = 0;
			return;
		}

		// Reset to show all tags first
		visibleTagCount = totalTags;
		tagsOverflowing = false;

		// Force a DOM update
		setTimeout(() => {
			if (!tagRowElement) return;

			// Check if content overflows (more than 2 lines)
			const isOverflowing = tagRowElement.scrollHeight > tagRowElement.clientHeight;

			if (isOverflowing) {
				tagsOverflowing = true;
				// Start with showing one less tag to make room for the button
				visibleTagCount = Math.max(1, totalTags - 1);

				// Give time for button to render, then check if it fits
				setTimeout(() => {
					adjustVisibleTagCount();
				}, 50);
			}
		}, 10);
	}
	// Progressively reduce visible tags until the show-more button fits
	function adjustVisibleTagCount() {
		if (!regularShowMoreButtonElement || !tagRowElement) return;

		const buttonRect = regularShowMoreButtonElement.getBoundingClientRect();
		const containerRect = tagRowElement.getBoundingClientRect();

		// Check if button is being clipped or pushed outside
		const buttonOverflowing =
			buttonRect.right > containerRect.right + 5 || // 5px tolerance
			buttonRect.bottom > containerRect.bottom + 5 ||
			buttonRect.width === 0 ||
			buttonRect.height === 0;
		if (buttonOverflowing && visibleTagCount > 1) {
			// Reduce visible tags and try again
			visibleTagCount = visibleTagCount - 1;
			setTimeout(() => adjustVisibleTagCount(), 50);
		} else if (!buttonOverflowing && visibleTagCount < getTotalTagCount() - 1) {
			// Try to show one more tag if button still fits
			const testCount = visibleTagCount + 1;
			visibleTagCount = testCount;
			setTimeout(() => {
				// Check if it still fits after adding one more tag
				if (regularShowMoreButtonElement && tagRowElement) {
					const newButtonRect = regularShowMoreButtonElement.getBoundingClientRect();
					const newContainerRect = tagRowElement.getBoundingClientRect();
					const newOverflowing =
						newButtonRect.right > newContainerRect.right + 5 ||
						newButtonRect.bottom > newContainerRect.bottom + 5 ||
						newButtonRect.width === 0 ||
						newButtonRect.height === 0;

					if (newOverflowing) {
						// Revert back to previous count
						visibleTagCount = testCount - 1;
					}
				}
			}, 50);
		}
	} // Reset visible tag count when overflow state changes
	$effect(() => {
		if (!showAllTags) {
			// Reset and recalculate when not showing all tags
			setTimeout(() => checkAndAdjustTagOverflow(), 100);
		}
	});

	// Main effect to set up observers and handle initial overflow check
	$effect(() => {
		if (tagRowElement) {
			// Initial check
			checkAndAdjustTagOverflow();

			// Set up ResizeObserver for better performance than window resize events
			if (typeof ResizeObserver !== 'undefined') {
				resizeObserver?.disconnect();
				resizeObserver = new ResizeObserver(() => {
					if (!showAllTags) {
						checkAndAdjustTagOverflow();
					}
				});
				resizeObserver.observe(tagRowElement);
			}

			// Fallback to window resize if ResizeObserver isn't available
			const handleResize = () => {
				if (!showAllTags) {
					checkAndAdjustTagOverflow();
				}
			};

			window.addEventListener('resize', handleResize);

			return () => {
				resizeObserver?.disconnect();
				window.removeEventListener('resize', handleResize);
			};
		}
	});
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

	// Helper functions to handle property name variations and fallbacks
	function getImageUrl(project: any): string {
		return (
			project.thumbnail ||
			project.image_link ||
			project.imageGallery?.[0] ||
			'https://via.placeholder.com/400x200?text=No+Image'
		);
	}

	function isPaidListing(project: any): boolean {
		return project.paidListing || project.paid_listing || project.payed_listing || false;
	}

	function getProjectTitle(project: any): string {
		return project.title || project.job_title || 'Tittel ikke oppgitt';
	}

	function getLocation(project: any): string {
		// return project.location || project.area || 'Ikke oppgitt';
		// ?TODO [ ]:  make this be based on the filter value
		const location = project.location.split(',');

		// return location.slice(0);
		return location[0];
	}
	function getPostDate(project: any): string {
		const date = project.postDate || project.post_date || project.date_issued;
		if (!date || date === 'Ikke oppgitt') return 'Ikke oppgitt';

		try {
			return new Date(date).toLocaleDateString('nb-NO', {
				day: '2-digit',
				month: 'short',
				year: 'numeric'
			});
		} catch {
			return date; // Return original if parsing fails
		}
	}

	// function getDueDate(project: any, length: any = 'normal'): string {
	function getDueDate(project: any): string {
		const date = project.dueDate || project.due_date;
		if (!date || date === 'Ikke oppgitt') return 'Ikke oppgitt';

		try {
			if (props.gridView) {
				return new Date(date)
					.toLocaleDateString('nb-NO', {
						day: '2-digit',
						month: 'short'
					})
					.replace(/\.$/, '');
			} else {
				return new Date(date).toLocaleDateString('nb-NO', {
					day: '2-digit',
					month: 'short',

					year: 'numeric'
				});
			}
		} catch {
			return date; // Return original if parsing fails
		}
	}

	function getCategory(project: any): string {
		return project.category || 'Kategori ikke oppgitt';
	}

	function getBudget(project: any): string {
		let currency = 'NOK';
		let language = 'no-NO';
		let budget = new Intl.NumberFormat(language, {
			style: 'currency',
			currency: currency
		});
		// TODO [ ]:  make it fetch this from language
		return budget.format(project.budget) || 'budsjett ikke oppgitt';
	}

	function getPosterType(project: any): string {
		return project.poster_type || project.lister_class || project.clientRole || 'privat';
	}

	// console.log('in ProjectCard, gridView:', props.gridView);
	// console.log('Project data:', props.project);
	// console.log('Budget value:', );
</script>

<div
	class="main card row"
	class:grid-view={props.gridView}
	class:expanded={isExpanded || showAllTags}
	bind:this={mainCardElement}
>
	<div class="thumbnail">
		<img src={getImageUrl(props.project)} alt={getProjectTitle(props.project)} />
		{#if props.gridView}
			<!-- acts as outer rim fill for favorite-button -->
			{#if isPaidListing(props.project)}
				<!-- <div class="favorite-button icon upper-layer"> -->
				<div class="upper-layer left">
					<span class="material-icons md-36 inline-icon paid-icon">paid</span>
				</div>
			{/if}
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
	</div>

	<div class="mini-profile">
		<div class="upper">
			<div class="column">
				<div class="mini row">
					{#if isPaidListing(props.project)}
						<!-- <div class="tag">Betalt plassering</div> -->
						<!-- <Tag label="Betalt plassering" color="accent" textColor="grey" /> -->
						{#if !props.gridView}
							<div class="price-tag">
								<span class="material-icons md-36 inline-icon paid-icon">paid</span>
							</div>
						{/if}
					{/if}
					<div class="upper-p">
						<p>
							{getPostDate(props.project)} | {getLocation(props.project)}
						</p>
					</div>
				</div>

				<div class="small">
					<div class="budget">
						<h4>{getBudget(props.project)}</h4>
					</div>
					<div class="title">
						<!-- <h4>{getBudget(props.project)}</h4> -->
						<h5>{getProjectTitle(props.project)}</h5>
					</div>
					<!-- <h4>{props.project.budget} kr</h4> -->
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
			<div class="small row category-header">
				<!-- <div class="small space row">
					<h4 class="">
						{getCategory(props.project)}
						{#if props.project.sub_category}, {props.project.sub_category}{/if}
					</h4>
				</div> -->
			</div>
			<div class="row">
				<div class="tag-row-container">
					<!-- <div class="tag-row"> -->
					<div class="tag-row" bind:this={tagRowElement} class:expanded={showAllTags}>
						{#if showAllTags}
							<!-- Show all tags when expanded -->
							<Tag
								label={getPosterType(props.project)}
								color="accent"
								textColor="grey"
								size="small"
							/>
							|
							<!-- {#each props.project.tags || [] as tag}
								<div class="tag">{tag}</div>
							{/each} -->

							<!-- <Tag label={props.project.category} color="grey" textColor="grey" size="small" />
							{#if props.project.sub_category}
								<Tag
									label={props.project.sub_category}
									color="grey"
									textColor="grey"
									size="small"
								/>
							{/if} -->
							{#each props.project.experienceRequirements || [] as req}
								<!-- <Tag label={req} color="grey" textColor="grey" size="small" /> -->
								<Tag label={req} color="grey" textColor="grey" size="small" />
								<!-- <Tag label={req} color="grey" size="small" /> -->
							{/each}
							{#each props.project.jobAttributes || [] as attr}
								<!-- <Tag label={attr} color="grey" textColor="grey" size="small" /> -->
								<Tag label={attr} color="grey" textColor="grey" size="small" />
								<!-- <Tag label={attr} color="grey" size="small" /> -->
							{/each}
							<!-- <button class="show-more-tags" onclick={toggleShowAllTags}> -færre </button> -->
							<button
								class:visible={showMoreDivVisible}
								bind:this={hiddenShowMoreButtonElement}
								onclick={toggleShowAllTags}
							>
								<Tag label="- Vis færre" color="grey" textColor="grey" size="small" />
							</button>
						{:else}
							<!-- Show limited tags with show-more button -->
							{@const allTags = getAllTags()}
							{@const tagsToShow =
								visibleTagCount > 0 ? allTags.slice(0, visibleTagCount) : allTags}
							<Tag
								label={getPosterType(props.project)}
								color="accent"
								textColor="grey"
								size="small"
							/>
							| {#if tagsOverflowing && shouldHideRegularButton}
								<!-- <div class="hidden-show-more" class:visible={showMoreDivVisible}> -->
								<!-- class="show-more-tags" -->

								<button
									class:visible={showMoreDivVisible}
									bind:this={hiddenShowMoreButtonElement}
									onclick={toggleShowAllTags}
								>
									<Tag label="+ Vis flere" color="grey" textColor="grey" size="small" />
								</button>
								<!-- </div> -->
							{/if}
							{#each tagsToShow as item, index}
								<!-- <Tag label={props.project.category} color="grey" textColor="grey" size="small" />
								{#if props.project.sub_category}
									<Tag
										label={props.project.sub_category}
										color="grey"
										textColor="grey"
										size="small"
									/>
								{/if} -->
								{#if index < (props.project.tags || []).length}
									<!-- Regular tag -->
									<Tag label={item} color="grey" textColor="grey" size="small" />
								{:else if index < (props.project.tags || []).length + (props.project.experienceRequirements || []).length}
									<!-- Experience requirement -->
									<Tag label={item} color="grey" textColor="grey" size="small" />
								{:else}
									<!-- Job attribute -->
									<Tag label={item} color="grey" textColor="grey" size="small" />
								{/if}
							{/each}
							{#if tagsOverflowing && !shouldHideRegularButton}
								{@const hiddenCount = allTags.length - visibleTagCount}
								<button
									class:visible={showMoreDivVisible}
									bind:this={hiddenShowMoreButtonElement}
									onclick={toggleShowAllTags}
								>
									<Tag label="+ Vis flere" color="grey" textColor="grey" size="small" />
								</button>
							{/if}
						{/if}
					</div>
				</div>

				<!-- <div class="column s-SdDzWjP088pA due-date-container">
					<p>Frist</p>
					<p>{getDueDate(props.project)}</p>
				</div> -->

				<div class="column s-SdDzWjP088pA date-container">
					<p>Frist</p>
					<!-- <p>{getDueDate(props.project, short)}</p> -->
					<p>{getDueDate(props.project)}</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	p {
		color: var(--primary-brighter);
	}
	.budget h4 {
		color: var(--primary);
		font-weight: 600;
	}
	/* .title h4 {
		color: var(--primary);

	} */

	/* Alternative fallback for browsers that don't support aspect-ratio */
	.thumbnail::before {
		content: '';
		display: block;
		padding-top: 100%; /* 1:1 aspect ratio fallback */
		width: 0;
	}

	.thumbnail img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
	.date-container {
		display: flex;

		height: fit-content;
	}
	/* .main.card.grid-view .thumbnail {
		width: 100%;
		border-radius: 0.5rem 0.5rem 0 0;
	}

	.main.card.grid-view .thumbnail img {
		border-radius: 0.5rem 0.5rem 0 0;
	} */

	/* MOBILE VERSION */

	/* @media (max-width: 768px) {
		.tag-row-container {
			margin-right: 0 !important;
		}
	} */

	.main.card {
		display: flex;
		align-items: stretch;
		padding: 0;
		max-height: 150px;
		transition: max-height 0.3s ease; /* Add smooth transition */
		box-shadow:
			0 1px 6px var(--shadow-bright),
			0 1px 1px var(--shadow);
		/* width: 100%; */
		/* Remove height constraints to allow thumbnail to control height */
		/* min-height: 200px;
		transition: height 0.3s ease;
		min-width: 250px;
		max-width: 100%;
		min-height: 100px; */
		/* min-width: 380px !important; */
		min-width: 380px;
	}

	/* Adjust container to properly align with the thumbnail */
	.mini-profile {
		padding: 1rem;
		justify-content: space-between;
		overflow: hidden;
		row-gap: 1rem;
		position: relative;
		display: flex;
		flex: 1;
		/*  */
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		flex-wrap: nowrap;
		justify-content: space-between;
		/* min-width: 300px; */
		/* flex-grow: 3; */
		/* Remove height constraints to allow thumbnail to control height */
		/* height: 100%; */
		/* min-width: 0; */
	} /* Ensure the main card has proper structure to support the thumbnail */

	/* Thumbnail styling */
	.thumbnail {
		position: relative;
		width: 20%;
		aspect-ratio: 1 / 1 !important;
		overflow: hidden;
		border-radius: 0.5rem 0 0 0.5rem;
		height: auto; /* Let aspect-ratio control height */
		min-height: 0; /* Prevent minimum height conflicts */
		display: flex;
		align-items: center;
		justify-content: center;
		/* min-width: 100px; */
		/* flex-shrink: 0; */
	}

	.tag-row-container {
		/* Ensure container doesn't clip expanded content */
		overflow: visible;
		display: flex;
		flex-direction: column;
		/* container-name: 'tagrow'; */
		/* flex: 1; */
		/* margin-right: 6.5rem; */
	}

	.tag-row {
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
		column-gap: 0.5rem;
		row-gap: 0.5rem;
		padding-right: 1.6rem;
		max-height: 4rem;
		overflow: hidden;
		transition: max-height 0.3s ease;
		position: relative;
		min-width: 0;
	}

	/* 


 */

	/* Grid view styling */
	.main.card.grid-view {
		flex-direction: column;
		height: auto;
		min-height: 350px;
		max-height: 450px;
		/* min-width: 0 !important; */
		min-width: 10rem;
		max-width: 25rem;
		/* width: 15rem; */
	}

	.main.card.grid-view .tag-row {
		/* padding-right: 20%; */
		padding-right: 0%;
	}

	/* Expanded card state */
	.main.card.expanded {
		height: auto;
		min-height: 200px;
		max-height: none !important; /* Remove max-height constraint when expanded */
		overflow: visible;
	}

	.upper {
		display: flex;
		flex-direction: row;
		/* row-gap: 1rem; */
		width: 100%;
		justify-content: space-between;
	}
	.lower {
		display: flex;
		flex-direction: column;
		row-gap: 0.5rem;
		width: 100%;
		overflow: visible; /* Ensure lower container can expand */
	}
	.lower .column {
		row-gap: 0.25rem;
		display: flex;
		align-items: flex-end;
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
		align-content: flex-start;
	}

	/* Override row alignment for main card to allow thumbnail proper sizing */
	.main.card.row {
		align-items: stretch;
	}

	.mini.row {
		justify-content: flex-start;
		align-items: start;
	}

	.hidden-show-more {
		/* min-width: 50px;
		font-size: x-small;
		padding: 1px 8px; */
		display: flex !important; /* Force visibility */
		align-items: center;
		gap: 0.25rem;
		padding: 1px 10px;
		border-radius: 1rem;
		background-color: var(--shadow-inv);
		border: 1px solid #ccc;
		cursor: pointer;
		font-size: small;
		height: fit-content;
		min-width: 60px;
		min-height: 24px;
		transition: background-color 0.2s ease;
		flex-shrink: 0;
		position: relative;
		z-index: 2;
		opacity: 1 !important;
		display: none;
	}

	.hidden-show-more.visible {
		display: flex;
	}

	.tag-row.expanded {
		max-height: none; /* Remove height limit when expanded */
		overflow: visible;
	}

	.show-more-tags {
		display: flex !important; /* Force visibility */
		align-items: center;
		gap: 0.25rem;
		padding: 1px 10px;
		border-radius: 1rem;
		background-color: var(--shadow-inv);
		border: 1px solid #ccc;
		cursor: pointer;
		font-size: small;
		height: fit-content;
		min-width: 60px;
		min-height: 24px;
		transition: background-color 0.2s ease;
		flex-shrink: 0; /* Prevent button from shrinking */
		position: relative;
		z-index: 2; /* Ensure button stays above other elements */
		visibility: visible !important; /* Force visibility */
		opacity: 1 !important; /* Force opacity */
	}

	.show-more-tags:hover {
		background-color: var(--accent-translucent);
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
	.paid-icon {
		border-radius: 5rem;
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 15px;
		height: 15px;
		/* width: 42px; */
		/* height: 42px; */
		background-color: var(--primary-bg);
		color: var(--accent-medium);
		font-size: large;
		/* color: var(--accent-brighter); */
		/* background-color: var(--accent-medium);
		color: var(--primary-bg); */
		/* color: var(--primary-bg); */
	}
	.upper-layer.left {
		width: 42px;
		height: 42px;
		/* width: 20px; */
		/* height: 20px; */
		position: absolute;
		top: 5px;
		left: 5px;
		padding: 0;
		border-radius: 8px;
		box-shadow: none;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 999px;
		text-align: left;
		display: flex;
		flex-direction: column;
		row-gap: 0.25rem;
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
		/* .main.card {
			min-width: 100%;
		} */
		.tag-row-container {
			margin-right: 0; /* Remove right margin when due-date is repositioned */
		}

		.tag-row {
			padding-right: 0;
			/* Remove padding when in mobile view */
		}

		.show-more-tags {
			min-width: 50px; /* Smaller minimum width on mobile */
			font-size: x-small; /* Smaller font to fit better */
			padding: 1px 8px; /* Reduced padding */
		}
	}

	@container (max-width: 600px) {
		.tag-row-container {
			margin-right: 2.5rem;
			margin-right: 0rem;
		}
	}

	@media (max-width: 690px) {
		.category-header {
			display: none !important;
		}
	}

	@media (max-width: 530px) {
		p {
			font-size: smaller;
		}
		span {
			font-size: smaller;
		}
		.mini-profile {
			padding: 0.8rem !important;
			padding: 0.8rem 0.8rem 0.8rem 0.5rem !important;
		}
	}

	@media (max-width: 768px) {
		.tag-row-container {
			margin-right: 0 !important;
		}
		.tag-row {
			padding-right: 0 !important;
		}
	}
</style>
