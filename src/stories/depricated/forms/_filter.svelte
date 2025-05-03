<svelte:options runes />

<script lang="ts">
	// Filter Ideer:
	// 		- job condition/type: [repairig, new job, continuation, consultant] It will describe what kind of job it is or at what stage the project is currently in, if its a brand new project from scratch, or if it is something that just need repairing etc.
	// 		- job stage: [planning stages, prepping stage, rough work stage, building stage, final touches, maintanance, cleanup] will describe what stage the job is currently in.  (very similar to condition/type)
	// 		- Job Poster/oppdragsgiver: [private, business] Will describe who (what kind of leagal entity) are posting the jobs.
	// 		- Posted/Publiseringsdato: [Date] Will describe jobs postet after a certain date (add 'before/after' maybe?)
	// 		- Deadline / oppdragsfrist: [date]+(radio) will describe jobs that "expire" on  a certain date + before/after radio button.
	// 		- Estimated project length / Estimert prosjektlengde: describes how long it will take to complete a job based on job-posters opinion.
	//							note:	(ALT)(difficult) we could let the vendors pre-define job length based on their expertise. "I am a carpenter looking for deck-building-jobs and i know that it generally will take a week. so i will set job-length estimate to 1 week". ==> all jobs classified as a "deck-building-job" will then have 1 week subtracted from the deadlines.
	// 			- (additional associated filter)  (radio) ["Desired completion","Deadline/must be completed within", etc.] describes the severity of the deadline. Some jobs can become irrelavent after certain amount of time.
	//							note:	estimated-job length should be taken into account for this calculation (true_deadline = org_deadline - length - 1 day of negotiations). i.e., a 1-week-job with an deadline [10.05.25] would be listed with a deadline of [02.05.25] (10.05.25 - 7 - 1) or atleast be excluded from the list when that date has passed.
	//									this should only be implemented for projects marked with 'Deadline'. 'Desired completion' marked projects will not be excluded after that date but they will be prioritised lower than non-exceeding projects.
	//									(ALT)  alternetivly, neither 'deadlined' and 'desired completion'-jobs will be removed but will be marked with a red warning sign with the tooltip; "caution, this job might not be completed in time. Make sure to discuss this possibility with the job-poster."
	//										note: jobs marked with this warning will be excluded for any *'payment-insurance' obligations that we might have. (*for more information ragarding 'payment-insurance' see "IDEAS & overall TODOS.txt:business ideas:1" )
	// 							note:	this will also only apply if both; a deadline and a job length estimate has been set.
	//
	// 		- Job type / Oppdragstype
	// 		- requirements / Krav til kompetanse / Sertifisering: [journeyman’s certificate,Driver’s License, Certified Responsible Contractor, HSE Card] will describe the requirement for specific skills or certifications needed for the job.
	// 		- Availability / tilgjengelighet: (checkbox or tags)["Oppdragsgiver er tilgjengelig for kontakt nå"/"Møte etter avtale","Rask svarstid (innen 1 time)", "Kan besøkes før oppdrag","Helgetilgjengelig", ] describes the level of availability of the job poster, i.e., ready to discuss or answer questions or if the site is available for inspefction before committing.
	// 					+ [COOKIE CLAUS NEEDED] "Svartid" should be a tag that is fetched from the posters profile, which is calculated by response-time in chat logs* then assigned to the profile as a "medal/acvhevement"-tag. (*only 'timestamps', 'seen'-tags and 'user-ids' are surveilled)
	// 		- Poster-rating / Oppdragsgiver-score: (radio buttons or a slider+checkbox for "hide")["⭐ 4.5+", "⭐ 4.0+", "⭐ 3.0+", "❌ Hide unrated clients"]
	// 		- Proof of Payment / betalingsbevis: (checkbox or radio) will describe jobs from posters who have previasly payed for a job without complications or are in other ways have *'payment-insurance',fetched from "achievement-tags" assigned profiles.  (*for more information ragarding 'payment-insurance' see "IDEAS & overall TODOS.txt:business ideas:1" )
	// 		- Verified posters / verifiserte brukere: (radio) describes jobs from posters that have a complete profile and verified by us.
	// 			- (ALT) Choise/Reputable Poster/ Annerkjente oppdragsgivere: (radio) describes users who have earned the reputable achievement tag or are in other way trusted/hand picked by us and are more likely to provide a pleasant transaction. (possible payed listings, job posters with premuim membership, and/or people we personally know)

	// import DropDown from './_Dropdown.svelte';
	// import './form.css';
	// import '../../app.css';
	// import '../../color_scheme.css';
	// import Dropdown from './_Dropdown.svelte';
	// import Tags from './tags.svelte';
	// import Tabs from '../depricated/tabs.svelte';
	// import Accordion from '../depricated/accordion.svelte';
	// import PriceRange from './priceRange.svelte';
	// import Button from '../Button.svelte';
	// import { Drawer } from 'vaul-svelte';

	// todo [ ]: Labels - add a variable [list] containing all of the labels in filter. (UI labels/placeholders, not the variable names) so the labels/filter names can easily be changed in one place, which also helps for adding different languages.
	// todo [ ]: PriceRange - change label from "pris" to "busjett"
	// todo [ ]: 	PriceRange - change variable names from "price"- Min/Max to "budget"- Min/Max
	// todo?[ ]: 	PriceRange - change PriceRage to Budget?
	// todo [ ]:

	let {
		firstName = $bindable(),
		lastName = $bindable(),
		// county = $bindable(''),
		county = $bindable(),
		workfield = $bindable(),
		minAmount = $bindable(),
		maxAmount = $bindable(),
		fieldIncludeTags = $bindable(),
		fieldExcludeTags = $bindable(),
		infoIncludeTags = $bindable(),
		infoExcludeTags = $bindable(),
		onApply,
		...props
	} = $props();

	// console.log(workfield)
	console.log('init:');
	$inspect($workfield);
	$inspect($county);

	// $effect(()=>{
	// 	$inspect($workfield)
	// 	$inspect($county)
	// })
	$effect(() => {
		if (onApply) {
			console.log('onApply:');
			$inspect($workfield);
			$inspect($county);
		}
	});
	function applyFilter() {
		console.log('Current county:', $county);
		onApply?.({
			fylke: county,
			kategori: workfield,
			minPris: minAmount,
			maxPris: maxAmount,
			erfaringskrav: {
				include: fieldIncludeTags,
				exclude: fieldExcludeTags
			},
			andreTagger: {
				include: infoIncludeTags,
				exclude: infoExcludeTags
			}
		});
		// $inspect(county);
	}

	const resetFilter = () => {
		county = 'Fylke';
		workfield = 'Kategori';
		minAmount = '';
		maxAmount = '';
		fieldIncludeTags = [];
		fieldExcludeTags = [];
		infoIncludeTags = [];
		infoExcludeTags = [];
	};
</script>

<div class="filter">
	<div class="filter-top column">
		<div class="drag-indicator"></div>
		<div class="row" style="align-items: center; justify-content: center; position: relative;">
			<h2 style="margin: 0;">Filtrer søket</h2>
			<h2
				style="position: absolute; right: 0; color: var(--accent-medium); cursor: pointer;"
				onclick={resetFilter}
			>
				Nullstill
			</h2>
		</div>
	</div>

	<div class="content">
		<Dropdown {county} type="county" />
		<!-- <Dropdown county={$county} type="county" /> -->
		<DropDown county={workfield} type="workfield" />

		<!-- Original for field tags -->
		<Accordion
			title="Erfaringskrav"
			tooltip="Velg hvilke erfaringer som skal inkluderes eller ekskluderes"
		>
			<Tabs
				includeTags={fieldIncludeTags}
				excludeTags={fieldExcludeTags}
				onIncludeTagsChange={(tags) => (fieldIncludeTags = tags)}
				onExcludeTagsChange={(tags) => (fieldExcludeTags = tags)}
			>
				<div slot="inkluder" let:includeTags let:onIncludeTagsChange>
					<Tags
						tagIntent="include"
						tagType="field"
						display="false"
						selectedTags={includeTags}
						onTagChange={onIncludeTagsChange}
					/>
				</div>
				<div slot="ekskluder" let:excludeTags let:onExcludeTagsChange>
					<Tags
						tagIntent="exclude"
						tagType="field"
						display="false"
						selectedTags={excludeTags}
						onTagChange={onExcludeTagsChange}
					/>
				</div>
			</Tabs>
		</Accordion>

		<!-- Copy for info tags -->
		<Accordion
			title="Andre Tagger"
			tooltip="inkluder eller ekskluder oppdrag som inneholder disse taggene"
		>
			<Tabs
				includeTags={infoIncludeTags}
				excludeTags={infoExcludeTags}
				onIncludeTagsChange={(tags) => (infoIncludeTags = tags)}
				onExcludeTagsChange={(tags) => (infoExcludeTags = tags)}
			>
				<div slot="inkluder" let:includeTags let:onIncludeTagsChange>
					<Tags
						tagIntent="include"
						tagType="info"
						display="false"
						selectedTags={includeTags}
						onTagChange={onIncludeTagsChange}
					/>
				</div>
				<div slot="ekskluder" let:excludeTags let:onExcludeTagsChange>
					<Tags
						tagIntent="exclude"
						tagType="info"
						display="false"
						selectedTags={excludeTags}
						onTagChange={onExcludeTagsChange}
					/>
				</div>
			</Tabs>
		</Accordion>

		<!-- <PriceRange bind:minAmount bind:maxAmount /> -->
		<PriceRange {minAmount} {maxAmount} />
	</div>

	<div class="filter-bottom">
		<Button neomorphic size="medium" style="true" label="Apply" onClick={applyFilter} />
	</div>
</div>

<style>
	.filter {
		height: 100%;
		border-radius: 1rem 1rem 0 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: transparent;
	}

	.filter .content {
		background-color: transparent;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-content: center;
		row-gap: 2rem;
	}

	.filter-bottom {
		border-top-width: 1px;
		border-top-color: var(--shadow-inv);
		padding: 1rem 2rem;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.filter-top {
		border-bottom-width: 1px;
		border-bottom-color: var(--shadow-inv);
		width: 100%;
		height: 0;
		visibility: hidden;
		padding: 0;
	}

	.drag-indicator {
		visibility: hidden;
		width: 36px;
		height: 5px;
		background-color: #ccc;
		border-radius: 3rem;
		margin: 1rem auto;
		cursor: ns-resize;
	}

	/* DRAWER TEST */
	@media (max-width: 1050px) {
		.filter {
			height: 100%;
		}

		.drag-indicator {
			visibility: visible;
		}

		.filter-top {
			visibility: visible;
			height: 100px;
			padding: 0 1rem 1rem 1rem;
		}

		.filter .content {
			padding: 0 20%;
			overflow-y: auto;
		}
	}
</style>
