<svelte:options runes />

<script lang="ts">
	import './theme.css';
	import '@fortawesome/fontawesome-free/css/all.css';
	import '../app.css';
	import './ProjectCard.css';

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
	let visibleTagCount = $state(0);
	let resizeObserver: ResizeObserver | undefined;
	let showMoreDivVisible = $state(false);
	let shouldHideRegularButton = $state(false);
	let tagRowWidth = $state(0);
	let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

	$effect(() => {
		shouldHideRegularButton = false;
		showMoreDivVisible = false;
	});

	function updateTagRowWidth(width: number) {
		if (resizeTimeout) {
			clearTimeout(resizeTimeout);
		}
		resizeTimeout = setTimeout(() => {
			tagRowWidth = width;
		}, 50);
	}

	$effect(() => {
		if (tagRowElement) {
			const resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					updateTagRowWidth(entry.contentRect.width);
				}
			});

			resizeObserver.observe(tagRowElement);

			tagRowWidth = tagRowElement.offsetWidth;

			return () => {
				resizeObserver.disconnect();
				if (resizeTimeout) {
					clearTimeout(resizeTimeout);
				}
			};
		}
	});

	$effect(() => {
		if (showAllTags) {
			showMoreDivVisible = false;
			shouldHideRegularButton = false;
			return;
		}

		if (!tagsOverflowing) {
			showMoreDivVisible = false;
			shouldHideRegularButton = false;
			return;
		}
		if (tagRowWidth > 0) {
			const shouldShowHidden = tagRowWidth <= 155;

			if (showMoreDivVisible !== shouldShowHidden) {
				showMoreDivVisible = shouldShowHidden;
				shouldHideRegularButton = shouldShowHidden;
			}
		}
	});

	function handleFavorite() {
		favorite = !favorite;
	}
	function toggleShowAllTags(event: Event) {
		showAllTags = !showAllTags;
		event.stopPropagation();

		if (showAllTags) {
			setTimeout(adjustCardExpandedHeight, 10);
		}
	}
	function getAllTags() {
		const categoryTags = [];
		if (props.project.category) {
			categoryTags.push(props.project.category);
		}
		if (props.project.sub_category) {
			categoryTags.push(props.project.sub_category);
		}

		return [
			...categoryTags,
			...(props.project.tags || []),
			...(props.project.experienceRequirements || []),
			...(props.project.jobAttributes || [])
		];
	}

	function getTotalTagCount() {
		return getAllTags().length;
	}

	function checkAndAdjustTagOverflow() {
		if (!tagRowElement) return;

		const allTags = getAllTags();
		const totalTags = allTags.length;

		if (totalTags === 0) {
			tagsOverflowing = false;
			visibleTagCount = 0;
			return;
		}

		visibleTagCount = totalTags;
		tagsOverflowing = false;

		setTimeout(() => {
			if (!tagRowElement) return;

			const isOverflowing = tagRowElement.scrollHeight > tagRowElement.clientHeight;

			if (isOverflowing) {
				tagsOverflowing = true;

				visibleTagCount = Math.max(1, totalTags - 1);

				setTimeout(() => {
					adjustVisibleTagCount();
				}, 50);
			}
		}, 10);
	}

	function adjustVisibleTagCount() {
		if (!regularShowMoreButtonElement || !tagRowElement) return;

		const buttonRect = regularShowMoreButtonElement.getBoundingClientRect();
		const containerRect = tagRowElement.getBoundingClientRect();

		const buttonOverflowing =
			buttonRect.right > containerRect.right + 5 ||
			buttonRect.bottom > containerRect.bottom + 5 ||
			buttonRect.width === 0 ||
			buttonRect.height === 0;
		if (buttonOverflowing && visibleTagCount > 1) {
			visibleTagCount = visibleTagCount - 1;
			setTimeout(() => adjustVisibleTagCount(), 50);
		} else if (!buttonOverflowing && visibleTagCount < getTotalTagCount() - 1) {
			const testCount = visibleTagCount + 1;
			visibleTagCount = testCount;
			setTimeout(() => {
				if (regularShowMoreButtonElement && tagRowElement) {
					const newButtonRect = regularShowMoreButtonElement.getBoundingClientRect();
					const newContainerRect = tagRowElement.getBoundingClientRect();
					const newOverflowing =
						newButtonRect.right > newContainerRect.right + 5 ||
						newButtonRect.bottom > newContainerRect.bottom + 5 ||
						newButtonRect.width === 0 ||
						newButtonRect.height === 0;

					if (newOverflowing) {
						visibleTagCount = testCount - 1;
					}
				}
			}, 50);
		}
	}
	$effect(() => {
		if (!showAllTags) {
			setTimeout(() => checkAndAdjustTagOverflow(), 100);
		}
	});

	$effect(() => {
		if (tagRowElement) {
			checkAndAdjustTagOverflow();

			if (typeof ResizeObserver !== 'undefined') {
				resizeObserver?.disconnect();
				resizeObserver = new ResizeObserver(() => {
					if (!showAllTags) {
						checkAndAdjustTagOverflow();
					}
				});
				resizeObserver.observe(tagRowElement);
			}

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
	function adjustCardExpandedHeight() {
		if (!tagRowElement || !mainCardElement) return;

		const tagRowHeight = tagRowElement.scrollHeight;

		mainCardElement.style.setProperty('--expanded-tag-height', `${tagRowHeight}px`);

		const baseCardHeight = 450;
		const expandedTagHeight = tagRowHeight - 50;
		const expandedCardHeight = baseCardHeight + expandedTagHeight;

		mainCardElement.style.setProperty('--expanded-card-height', `${expandedCardHeight}px`);
	}

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
		const location = project.location.split(',');
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
			return date;
		}
	}

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
			return date;
		}
	}

	function getBudget(project: any): string {
		let currency = 'NOK';
		let language = 'no-NO';
		let budget = new Intl.NumberFormat(language, {
			style: 'currency',
			currency: currency
		});
		// TODO make it fetch this from language
		return budget.format(project.budget) || 'budsjett ikke oppgitt';
	}
	function getPosterType(project: any): string {
		return project.poster_type || project.lister_class || project.clientRole || 'privat';
	}
</script>

<div
	class="main card row"
	class:grid-view={props.gridView}
	class:expanded={isExpanded || showAllTags}
	bind:this={mainCardElement}
>
	<div class="thumbnail" class:grid-view={props.gridView}>
		<img src={getImageUrl(props.project)} alt={getProjectTitle(props.project)} />
		{#if props.gridView}
			{#if isPaidListing(props.project)}
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
					{#if !props.gridView}
						{#if isPaidListing(props.project)}
							<div class="paid-icon-container">
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
						<h5>{getProjectTitle(props.project)}</h5>
					</div>
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
			<div class="small row category-header"></div>
			<div class="row">
				<div class="tag-row-container">
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
							{#if props.project.category}
								<Tag label={props.project.category} color="grey" textColor="grey" size="small" />
							{/if}
							{#if props.project.sub_category}
								<Tag
									label={props.project.sub_category}
									color="grey"
									textColor="grey"
									size="small"
								/>
							{/if}
							{#each props.project.tags || [] as tag}
								<Tag label={tag} color="grey" textColor="grey" size="small" />
							{/each}
							{#each props.project.experienceRequirements || [] as req}
								<Tag label={req} color="grey" textColor="grey" size="small" />
							{/each}
							{#each props.project.jobAttributes || [] as attr}
								<Tag label={attr} color="grey" textColor="grey" size="small" />
							{/each}
							<button
								class="show-more-tags"
								class:visible={showMoreDivVisible}
								bind:this={hiddenShowMoreButtonElement}
								onclick={toggleShowAllTags}
							>
								<Tag label="- Vis færre" color="grey" textColor="grey" size="small" />
							</button>
						{:else}
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
								<button
									class:visible={showMoreDivVisible}
									bind:this={hiddenShowMoreButtonElement}
									onclick={toggleShowAllTags}
								>
									<Tag label="+ Vis flere" color="grey" textColor="grey" size="small" />
								</button>
							{/if}
							{#each tagsToShow as item, index}
								{#if index < (props.project.category ? 1 : 0) + (props.project.sub_category ? 1 : 0)}
									<Tag label={item} color="grey" textColor="grey" size="small" />
								{:else if index < (props.project.category ? 1 : 0) + (props.project.sub_category ? 1 : 0) + (props.project.tags || []).length}
									<Tag label={item} color="grey" textColor="grey" size="small" />
								{:else if index < (props.project.category ? 1 : 0) + (props.project.sub_category ? 1 : 0) + (props.project.tags || []).length + (props.project.experienceRequirements || []).length}
									<Tag label={item} color="grey" textColor="grey" size="small" />
								{:else}
									<Tag label={item} color="grey" textColor="grey" size="small" />
								{/if}
							{/each}
							{#if tagsOverflowing && !shouldHideRegularButton}
								{@const hiddenCount = allTags.length - visibleTagCount}
								<button
									class="show-more-tags"
									bind:this={regularShowMoreButtonElement}
									onclick={toggleShowAllTags}
								>
									<Tag label="+ Vis flere" color="grey" textColor="grey" size="small" />
								</button>
							{/if}
						{/if}
					</div>
				</div>

				<div class="column s-SdDzWjP088pA date-container">
					<p>Frist</p>
					<p>{getDueDate(props.project)}</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* p {
		color: var(--primary-brighter);
	}
	.budget h4 {
		color: var(--primary);
		font-weight: 600;
	}
	.thumbnail::before {
		content: '';
		display: block;
		padding-top: 100%;
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
	.main.card {
		display: flex;
		align-items: stretch;
		padding: 0;
		max-height: 150px;
		transition: max-height 0.3s ease;
		box-shadow:
			0 1px 6px var(--shadow-bright),
			0 1px 1px var(--shadow);
		min-width: 380px;
	}

	.mini-profile {
		padding: 1rem;
		justify-content: space-between;
		overflow: hidden;
		row-gap: 1rem;
		position: relative;
		display: flex;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		flex-wrap: nowrap;
		justify-content: space-between;
	}

	.thumbnail {
		position: relative;
		width: 20%;
		aspect-ratio: 1 / 1 !important;
		overflow: hidden;
		border-radius: 0.5rem 0 0 0.5rem;
		height: auto;
		min-height: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tag-row-container {
		overflow: visible;
		display: flex;
		flex-direction: column;
	}
	.tag-row {
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
		column-gap: 0.5rem;
		row-gap: 0.5rem;
		padding-right: 1.6rem;
		max-height: 3.8rem;
		overflow: hidden;
		transition: max-height 0.3s ease;
		position: relative;
		min-width: 0;
	}

	.main.card.grid-view {
		flex-direction: column;
		height: auto;
		min-height: 350px;
		max-height: 450px;
		min-width: 10rem;
		max-width: 25rem;
	}
	.main.card.grid-view .tag-row {
		padding-right: 0%;
	}

	.main.card.expanded {
		height: auto;
		min-height: 200px;
		max-height: none !important;
		overflow: visible;
	}
	.upper {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
	}
	.lower {
		display: flex;
		flex-direction: column;
		row-gap: 0.5rem;
		width: 100%;
		overflow: visible;
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

	.main.card.row {
		align-items: stretch;
	}

	.mini.row {
		justify-content: flex-start;
		align-items: start;
	}

	.tag-row.expanded {
		max-height: none;
		overflow: visible;
	}

	.show-more-tags {
		display: flex !important;
		cursor: pointer;
		margin-bottom: 1rem;
		border-radius: 5rem;
		z-index: 2;
		visibility: visible !important;
	}

	.show-more-tags:hover {
		background-color: var(--accent-translucent);
	}

	.spacer {
		width: 42px;
		height: 42px;
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
		background-color: var(--primary-bg);
		color: var(--accent-medium);
		font-size: large;
	}
	.upper-layer.left {
		width: 42px;
		height: 42px;
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
		.tag-row-container {
			margin-right: 0;
		}
		.tag-row {
			padding-right: 0;
		}
	}
	@container (max-width: 600px) {
		.tag-row-container {
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
	} */
</style>
