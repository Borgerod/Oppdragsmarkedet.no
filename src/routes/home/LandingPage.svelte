<svelte:options runes />

<script lang="ts">
	// Add any imports or logic here if needed
	import '@src/app.css';
	import '@stories/forms/form.css';
	import '@src/color_scheme.css';
	import '@src/dark-mode.css';
	import './home.css';
	import Button from '@stories/Button.svelte';

	function registerBusiness() {}

	function issueAdd() {}
</script>

<article>
	<!-- <figure id="thumbnail" class="thumbnail-fullwidth no-padding override-parent-padding">
		<div class="card frosted-glass">
			<h1>Legg ut et oppdrag</h1>
			<h1>– få tilbud fra leverandører</h1>
			<br />
			<p>
				Til forskjell fra andre anbudstjenester får du tilbud fra kvalitetssikret og håndplukkede
				bedrifter. Det sikrer at du som kunde får levert gode kvalitetstjenester samtidig som du
				sparer penger.
			</p>
			<br />
			<br />
			<p>VÅRT TILBUD ER HELT KOSTNADSFRITT OG UFORPLIKTENDE!</p>
			<br />
			<div class="row">
				<Button primary glass size="small" onclick={registerBusiness} label="Registrer bedrift" />
				<Button primary gray glass size="small" onclick={issueAdd} label="Legg ut oppdrag" />
			</div>
		</div>
	</figure> -->

	<section class="card homepage-hero">
		<h1>Velkommen til Oppdragsmarkedet</h1>
		<p>
			Oppdragsmarkedet er din plattform for å finne og tilby tjenester, prosjekter og samarbeid.
			Opprett en konto for å komme i gang, eller logg inn for å se dine prosjekter.
		</p>
		<div class="homepage-actions">
			<a href="/register" class="homepage-btn">Registrer deg</a>
			<a href="/login" class="homepage-btn secondary">Logg inn</a>
		</div>
	</section>

	<section class="card homepage-features">
		<h2>Hvorfor bruke Oppdragsmarkedet?</h2>
		<ul>
			<li>Finn kvalifiserte leverandører og samarbeidspartnere</li>
			<li>Publiser og administrer prosjekter enkelt</li>
			<li>Trygg kommunikasjon og sikker betaling</li>
			<li>Bygg nettverk og få nye muligheter</li>
		</ul>
	</section>

	<section class="card homepage-about">
		<h2>Om oss</h2>
		<p>
			Oppdragsmarkedet.no samler profesjonelle og privatpersoner for å gjøre det enkelt å finne og
			tilby oppdrag. Vi tror på åpenhet, kvalitet og effektivitet i alle ledd.
		</p>
	</section>
</article>

<style>
	.homepage-btn {
		/* background: var(--accent, #1882a8); */
		padding: 0.75rem 2rem;
		border-radius: 2rem;
		text-decoration: none;
		font-weight: 600;
		transition: background 0.2s;
		border-width: 1px;
		color: var(--secondary-bg);
		border-color: var(--secondary-bg);
		background-color: transparent;
	}
	figure h1 {
		font-size: 30px;
	}
	figure .row {
		gap: 1rem;
		display: flex;
		justify-content: flex-start;
	}
	:global(.content.s-7IPF32Wcq3s8) {
		padding-top: 0 !important;
		padding-bottom: 0 !important;
	}

	.frosted-glass {
		/* > MOVED TO app.css < */
	}

	figure .card {
		/* display: flex;
		flex-direction: column;
		justify-content: center;
		height: inherit;
		width: 50%;
		max-width: 100%;
		padding: 2rem;
		margin-top: auto;
		margin-bottom: auto;
		margin-top: 3rem;
		margin-bottom: 3rem;
		align-self: flex-start; */
	}

	.thumbnail-fullwidth {
		/* width: 100vw;
		margin: 0;
		padding: 0 !important;
		overflow: hidden;
		position: relative;
		left: 50%;
		right: 50%;
		transform: translateX(-50%); */
	}
	/* #thumbnail {
		object-fit: contain;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		width: 100vw;
		height: 40vw;
		max-height: 90vh;
		min-height: 200px;
		padding: 2rem !important;
		background-image: url(/images/fav/bathroom-renovation-1568x882.jpg);
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		background-color: #fff;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
	} */

	/* >TEST (goes along with glass header test) */
	figure .card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: inherit;
		width: 50%;
		max-width: 100%;
		padding: 2rem;
		margin-top: auto;
		margin-bottom: auto;
		margin-top: 3rem;
		margin-bottom: 3rem;
		align-self: flex-start;
	}

	.thumbnail-fullwidth {
		width: 100vw;
		margin: 0;
		padding: 0 !important;
		overflow: hidden;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		/* right: 50%; */
	}

	#thumbnail {
		width: 100vw;
		height: 60vh;
		/* height: 50vh; */
		/* height: auto; */
		/* height: 100vh; */

		max-height: 90vh;
		min-height: 200px;

		padding: 4rem !important;
		padding-top: 10rem !important;
		padding-bottom: 5rem !important;

		object-fit: contain;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}
	#thumbnail::before {
		background-image: url(/images/fav/photo-1738162837369-a2beec3a1d47.avif);
		background-image: url(/images/fav/bathroom-renovation-1024x589_upscayl_2x_high-fidelity-4x.png);
		background-image: url(/images/fav/Servicepakken-HMS-KS-Devinco-Services-1-scaled.jpg);
		background-image: url(/images/fav/Cabin-at-Trolls-Peak-by-Rever-Drage-Architects-3.jpg);
		background-image: url(/images/fav/bathroom-renovation-1568x882.jpg);
		/* *good ones above */
		background-image: url(/images/fav/Jemco_Header_28-f4b63ba8.jpeg);
		background-image: url(/images/fav/photo-1489514354504-1653aa90e34e.avif);
		/* >maybe above*/

		/* background-image: url(/images/fav/); */
		content: '';
		position: absolute;
		inset: 0;
		z-index: 0;

		pointer-events: none;

		background-repeat: no-repeat;
		/* background-position: center; */
		/* background-position: top; */
		/* background-position: bottom; */
		background-size: contain;
		background-size: cover;

		/* height: auto; */
		/* height: 50vh; */
		/* height: 100%; */
	}

	/* > MIRROR */
	#thumbnail::before {
		/* transform: scaleX(-1); */
	}

	#thumbnail > * {
		position: relative;
		z-index: 1;
	}
	/* >____________________________________________________________________ */

	/* #thumbnail {
		object-fit: cover;
		display: block;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		width: 100vw;
		height: 40vw;
		padding: 2rem !important;
		background-image: url(/images/fav/bathroom-renovation-1568x882.jpg);
	} */
</style>
