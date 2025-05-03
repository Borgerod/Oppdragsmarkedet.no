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
	// 		- requirements / Krav til kompetanse / Sertifisering: [journeyman’s certificate,Driver’s License, Certified Responsible Contractor, HSE Card] will describe the requirement for specific skills or certifications needed for the job.
	// 		- Availability / tilgjengelighet: (checkbox or tags)["Oppdragsgiver er tilgjengelig for kontakt nå"/"Møte etter avtale","Rask svarstid (innen 1 time)", "Kan besøkes før oppdrag","Helgetilgjengelig", ] describes the level of availability of the job poster, i.e., ready to discuss or answer questions or if the site is available for inspefction before committing.
	// 					+ [COOKIE CLAUS NEEDED] "Svartid" should be a tag that is fetched from the posters profile, which is calculated by response-time in chat logs* then assigned to the profile as a "medal/acvhevement"-tag. (*only 'timestamps', 'seen'-tags and 'user-ids' are surveilled)
	// 		- Poster-rating / Oppdragsgiver-score: (radio buttons or a slider+checkbox for "hide")["⭐ 4.5+", "⭐ 4.0+", "⭐ 3.0+", "❌ Hide unrated clients"]
	// 		- Proof of Payment / betalingsbevis: (checkbox or radio) will describe jobs from posters who have previasly payed for a job without complications or are in other ways have *'payment-insurance',fetched from "achievement-tags" assigned profiles.  (*for more information ragarding 'payment-insurance' see "IDEAS & overall TODOS.txt:business ideas:1" )
	// 		- Verified posters / verifiserte brukere: (radio) describes jobs from posters that have a complete profile and verified by us.
	// 			- (ALT) Choise/Reputable Poster/ Annerkjente oppdragsgivere: (radio) describes users who have earned the reputable achievement tag or are in other way trusted/hand picked by us and are more likely to provide a pleasant transaction. (possible payed listings, job posters with premuim membership, and/or people we personally know)

	import TextField from './forms/TextField.svelte';
	import PriceRange from './forms/PriceRange.svelte';
	import DropDown from './forms/DropDown.svelte'; // Updated casing here
	import Accordion from './Accordion.svelte';
	import Tabs from './forms/Tabs.svelte';
	import Tags from './forms/Tags.svelte';
	import CheckBox from './forms/CheckBox.svelte';
	import Button from './Button.svelte';

	const { filterData, onApply } = $props();
</script>

<div class="filter-form">
	<TextField bind:value={filterData.name} />

	<DropDown bind:value={filterData.county} type="county" />
	<DropDown bind:value={filterData.workfield} type="workfield" />
	<CheckBox
		label="Oppdragsgiver"
		options={['Private', 'Business']}
		bind:selectedOptions={filterData.job_poster}
	/>
	<PriceRange bind:min={filterData.price_min} bind:max={filterData.price_max} />

	<Accordion
		title="Erfaringskrav"
		tooltip="Velg hvilke erfaringer som skal inkluderes eller ekskluderes"
	>
		<Tabs
			includeTags={filterData.field_include}
			excludeTags={filterData.field_exclude}
			onIncludeTagsChange={(tags: string[]) => (filterData.field_include = tags)}
			onExcludeTagsChange={(tags: string[]) => (filterData.field_exclude = tags)}
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
		tooltip="inkluder eller ekskluder oppdrag som inneholder disse taggene"
	>
		<Tabs
			includeTags={filterData.job_attributes_include}
			excludeTags={filterData.job_attributes_exclude}
			onIncludeTagsChange={(tags: string[]) => (filterData.job_attributes_include = tags)}
			onExcludeTagsChange={(tags: string[]) => (filterData.job_attributes_exclude = tags)}
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

	<Button rounded size="small" label="Apply" onclick={onApply} />
</div>

<style>
	.filter-form {
		display: grid;
		gap: 1rem;
		max-width: 300px;
	}
</style>
