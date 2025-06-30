<svelte:options runes />

<script lang="ts">
	// Filter Ideer:
	// 		- New todday: (boolean, checkbox) [new today] describes all jobs that got posted since 00:00 today.
	// 			- (ALT) New: [today, this week, this month] describes all the jobs that got posted 00:00; today, 1st day of the week, or 1st day of the month. default is empty, which means all gets shown.
	// 		- job condition/type: [repairig, new job, continuation, consultant] It will describe what kind of job it is or at what stage the project is currently in, if its a brand new project from scratch, or if it is something that just need repairing etc.
	// 		- job stage: [planning stages, prepping stage, rough work stage, building stage, final touches, maintanance, cleanup] will describe what stage the job is currently in.  (very similar to condition/type)
	// 		- Job Poster/oppdragsgiver: [private, business] Will describe who (what kind of leagal entity) are posting the jobs.
	// 		- Posted/Publiseringsdato: [Date] Will describe jobs postet after a certain date (add 'before/after' maybe?)
	// 		- Deadline / oppdragsfrist: [date]+(radio) will describe jobs that "expire" on  a certain date + before/after radio button.
	// 		- Estimated project length / Estimert prosjektlengde: describes how long it will take to complete a job based on job-posters opinion.
	//							note:	(ALT)(difficult) we could let the vendors pre-define job length based on their expertise. "I am a carpenter looking for deck-building-jobs and i know that it generally will take a week. so i will set job-length estimate to 1 week". ==> all jobs classified as a "deck-building-job" will then have 1 week subtracted from the deadlines.
	// 			- (additional associated filter)  (radio) ["Desired completion","Deadline/must be completed within", etc.] describes the severity of the deadline. Some jobs can become irrelavent after certain amount of time.
	//				s			note:	estimated-job length should be taken into account for this calculation (true_deadline = org_deadline - length - 1 day of negotiations). i.e., a 1-week-job with an deadline [10.05.25] would be listed with a deadline of [02.05.25] (10.05.25 - 7 - 1) or atleast be excluded from the list when that date has passed.
	//									this should only be implemented for projects marked with 'Deadline'. 'Desired completion' marked projects will not be excluded after that date but they will be prioritised lower than non-exceeding projects.
	//									(ALT)  alternetivly, neither 'deadlined' and 'desired completion'-jobs will be removed but will be marked with a red warning sign with the tooltip; "caution, this job might not be completed in time. Make sure to discuss this possibility with the job-poster."
	//										note: jobs marked with this warning will be excluded for any *'payment-insurance' obligations that we might have. (*for more information ragarding 'payment-insurance' see "IDEAS & overall TODOS.txt:business ideas:1" )
	// 							note:	this will also only apply if both; a deadline and a job length estimate has been set.
	//
	// 		- Job type / Oppdragstype
	// 		- requirements / Krav til kompetanse / Sertifisering: [journeyman's certificate,Driver's License, Certified Responsible Contractor, HSE Card] will describe the requirement for specific skills or certifications needed for the job.
	// 		- Availability / tilgjengelighet: (checkbox or tags)["Oppdragsgiver er tilgjengelig for kontakt nå"/"Møte etter avtale","Rask svarstid (innen 1 time)", "Kan besøkes før oppdrag","Helgetilgjengelig", ] describes the level of availability of the job poster, i.e., ready to discuss or answer questions or if the site is available for inspefction before committing.
	// 					+ [COOKIE CLAUS NEEDED] "Svartid" should be a tag that is fetched from the posters profile, which is calculated by response-time in chat logs* then assigned to the profile as a "medal/acvhevement"-tag. (*only 'timestamps', 'seen'-tags and 'user-ids' are surveilled)
	// 		- Poster-rating / Oppdragsgiver-score: (radio buttons or a slider+checkbox for "hide")["⭐ 4.5+", "⭐ 4.0+", "⭐ 3.0+", "❌ Hide unrated clients"]
	// 		- Proof of Payment / betalingsbevis: (checkbox or radio) will describe jobs from posters who have previasly payed for a job without complications or are in other ways have *'payment-insurance',fetched from "achievement-tags" assigned profiles.  (*for more information ragarding 'payment-insurance' see "IDEAS & overall TODOS.txt:business ideas:1" )
	// 		- Verified posters / verifiserte brukere: (radio) describes jobs from posters that have a complete profile and verified by us.
	// 			- (ALT) Choise/Reputable Poster/ Annerkjente oppdragsgivere: (radio) describes user who have earned the reputable achievement tag or are in other way trusted/hand picked by us and are more likely to provide a pleasant transaction. (possible payed listings, job posters with premuim membership, and/or people we personally know)

	import TextField from './forms/TextField.svelte';
	import PriceRange from './forms/PriceRange.svelte';
	import DropDown from './forms/DropDown.svelte';
	import Accordion from './Accordion.svelte';
	import Tabs from './forms/Tabs.svelte';
	import Tags from './forms/Tags.svelte';
	import CheckBox from './forms/CheckBox.svelte';
	import Button from './Button.svelte';
	import { Drawer } from 'vaul-svelte';
	import './forms/form.css';
	/**
	 * @typedef {Object} Props
	 * @property {Object} [filterData] the data object containing all filter values.
	 * @property {function} [onApply] the apply buttons functionality, handled in parent.
	 * @property {boolean} [drawer] integrated vaul-svelte drawer component.
	 * @property {function} [resetAll] function to reset all filter values.
	 */
	/** @type {Props} */
	let { filterData = {}, onApply, drawer = false, resetAll } = $props();

	// Parse the location string into parts
	function parseLocation(locationString: string) {
		if (!locationString || locationString === ',,') {
			return { countyValue: '', cityValue: '', cityAreaValue: '' };
		}
		const parts = locationString.split(',');
		return {
			cityAreaValue: parts[0] || '',
			cityValue: parts[1] || '',
			countyValue: parts[2] || ''
		};
	}

	// Initialize location state variables
	let countyValue = $state('');
	let cityValue = $state('');
	let cityAreaValue = $state('');

	// Initialize location values on load and update when filterData.location changes (e.g., on reset)
	$effect(() => {
		const parts = parseLocation(filterData.location);
		countyValue = parts.countyValue;
		cityValue = parts.cityValue;
		cityAreaValue = parts.cityAreaValue;
	});

	// Update filterData.location when individual parts change
	function updateLocation() {
		const newLocation = `${cityAreaValue},${cityValue},${countyValue}`;
		if (newLocation === ',,') {
			filterData.location = ',,';
		} else {
			filterData.location = newLocation;
		}
	}

	// Reset dependent dropdowns when parent selection changes
	$effect(() => {
		// When county changes, reset city and city-area
		if (countyValue === '') {
			cityValue = '';
			cityAreaValue = '';
		}
		updateLocation();
	});

	$effect(() => {
		// When city changes, reset city-area
		if (cityValue === '') {
			cityAreaValue = '';
		}
		updateLocation();
	});

	$effect(() => {
		// Update location when city area changes
		updateLocation();
	});

	// Function to handle apply action (avoids reference to potentially undefined handleApply)
	function handleApplyAction() {
		if (onApply) onApply();
	}
</script>

{#snippet Filter()}
	<div class="filter-form">
		<TextField bind:value={filterData.textSearch} placeholder="Søk på oppdrag" icon="search" />
		<div class="location-container">
			<h3>Sted</h3>
			<div class="location-dropdowns">
				<DropDown bind:value={countyValue} type="county" label="Fylke" />
				<div class="dropdown-wrapper" class:hidden={!countyValue}>
					<DropDown bind:value={cityValue} type="city" parent={countyValue} label="Kommune" />
				</div>
				<div class="dropdown-wrapper" class:hidden={!cityValue}>
					<DropDown bind:value={cityAreaValue} type="city-area" parent={cityValue} label="Område" />
				</div>
			</div>
		</div>

		<DropDown bind:value={filterData.category} type="category" />

		<PriceRange bind:min={filterData.budget_min} bind:max={filterData.budget_max} />
		<div>
			<h3>Oppdragsgiver</h3>

			<Tags
				tagIntent="grey"
				tagType="clientRole"
				selectedTags={filterData.clientRole}
				onTagChange={(tags: string[]) => (filterData.clientRole = tags)}
				showSearch={false}
				size="s"
				row={true}
			/>
		</div>
		<Accordion
			title="Erfaringskrav"
			tooltip_content="Velg hvilke erfaringer som skal inkluderes eller ekskluderes"
		>
			<Tabs
				includeTags={filterData.experienceRequirements_include}
				excludeTags={filterData.experienceRequirements_exclude}
				onIncludeTagsChange={(tags: string[]) => (filterData.experienceRequirements_include = tags)}
				onExcludeTagsChange={(tags: string[]) => (filterData.experienceRequirements_exclude = tags)}
			>
				<div slot="inkluder" let:includeTags let:onIncludeTagsChange>
					<Tags
						tagIntent="include"
						tagType="field"
						selectedTags={includeTags}
						onTagChange={onIncludeTagsChange}
					/>
				</div>
				<div slot="ekskluder" let:excludeTags let:onExcludeTagsChange>
					<Tags
						tagIntent="exclude"
						tagType="field"
						selectedTags={excludeTags}
						onTagChange={onExcludeTagsChange}
					/>
				</div>
			</Tabs>
		</Accordion>

		<Accordion
			title="Andre Tagger"
			tooltip_content="inkluder eller ekskluder oppdrag som inneholder disse taggene"
		>
			<Tabs
				includeTags={filterData.jobAttributes_include}
				excludeTags={filterData.jobAttributes_exclude}
				onIncludeTagsChange={(tags: string[]) => (filterData.jobAttributes_include = tags)}
				onExcludeTagsChange={(tags: string[]) => (filterData.jobAttributes_exclude = tags)}
			>
				<div slot="inkluder" let:includeTags let:onIncludeTagsChange>
					<Tags
						tagIntent="include"
						tagType="job_attributes"
						display="false"
						selectedTags={includeTags}
						onTagChange={onIncludeTagsChange}
					/>
				</div>
				<div slot="ekskluder" let:excludeTags let:onExcludeTagsChange>
					<Tags
						tagIntent="exclude"
						tagType="job_attributes"
						display="false"
						selectedTags={excludeTags}
						onTagChange={onExcludeTagsChange}
					/>
				</div>
			</Tabs>
		</Accordion>

		<!-- <Button rounded size="small" label="Apply" onclick={onApply} /> -->
	</div>
{/snippet}

{#snippet applyButton()}
	<div class="apply-container">
		<Button rounded wide size="small" label="Søk" onclick={onApply} />
	</div>
{/snippet}

{#if drawer}
	<!-- filter-drawer controls if drawer is displayed based on window size -->

	<!-- <div class="filter-button-console"> -->
	<div class="filter-button">
		<Drawer.Root>
			<Drawer.Trigger
				><Button
					rounded
					size="small"
					label="Filter"
					onclick="Drawer.Trigger will handle the onclick"
				/></Drawer.Trigger
			>
			<Drawer.Portal>
				<Drawer.Overlay class="fixed inset-0 bg-black/40" />
				<!-- class="fixed right-0 bottom-0 left-0 mt-24 flex flex-col rounded-t-[10px] bg-zinc-100 " -->
				<Drawer.Content
					class="fixed right-0 bottom-0 left-0 flex max-h-[96%] flex-col rounded-t-[10px]"
					style="background: var(--primary-bg)
					
					"
				>
					<div class="flex flex-1 flex-col rounded-t-[10px] p-4">
						<div class="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300"></div>
						<Drawer.Title class="mb-4 font-medium"
							><div class="filter-header-drawer">
								<div></div>
								<span>Filtrer søket</span>
								<div class="reset-container">
									<Button rounded size="small" label="Nullstill" onclick={resetAll} />
								</div>
							</div></Drawer.Title
						>
						<div class="filter-drawer">
							{@render Filter()}
						</div>
					</div>
					<div class="sticky-apply-button">
						<Drawer.Close class="close-button" style="width:100%;">
							{@render applyButton()}
						</Drawer.Close>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	</div>
	<!-- </div> -->
{:else}
	<!-- filter-container controls if filter is displayed based on window size -->
	<div class="filter-container">
		{@render Filter()}
		{@render applyButton()}
	</div>
{/if}

<style>
	/* .filter-container {
	} */

	.filter-button {
		display: none;
	}

	/* @media (max-width: 768px) { */
	@media (max-width: 890px) {
		.filter-container {
			display: none;
		}

		.filter-button {
			display: contents;
		}
		.filter-form {
			padding: 2rem;
			overflow-y: auto;
		}
		.filter-drawer {
			overflow-y: auto;
			max-height: calc(96vh - 120px); /* Account for header and apply button */
			padding-bottom: 1rem;
		}
		.apply-container {
			padding: 1rem 2rem !important;
		}
	}
	.filter-form {
		display: grid;
		gap: 1rem;
		/* z-index: 3; */
	}

	.apply-container {
		padding: 2rem 0;
		width: 100%;
	}
	.sticky-apply-button {
		position: sticky;
		bottom: 0;
		background: var(--primary-bg);
	}
	.filter-header-drawer {
		display: grid;
		grid-column: 3;
		grid-auto-flow: column;
		grid-template-columns: repeat(3, 1fr);
		border-bottom: 1px solid var(--shadow-brighter) !important;
		align-items: flex-start;
		padding: 0 1rem 1rem 1rem;
		/* z-index: 3; */
	}
	.filter-header-drawer span {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	.reset-container {
		height: 100%;
		display: flex;
		align-items: end;
		align-items: center;
		justify-content: end;
	}

	.location-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.location-dropdowns {
		display: grid;
		gap: 0.5rem;
	}

	.dropdown-wrapper {
		transition:
			opacity 0.2s ease-in-out,
			max-height 0.2s ease-in-out;
		overflow: hidden;
	}

	.dropdown-wrapper.hidden {
		opacity: 0;
		max-height: 0;
		margin: 0;
		padding: 0;
		pointer-events: none;
	}
</style>
