<svelte:options runes />

<script lang="ts">
	// Add any imports or logic here if needed
	import '@src/app.css';
	import '@stories/forms/form.css';
	import '@src/color_scheme.css';
	import '@src/dark-mode.css';
	import './home.css';
	import Button from '@stories/Button.svelte';

	function registerBusiness() {
		// > placeholder
	}

	function issueAdd() {
		// > placeholder
	}
</script>

<div class="thumbnail-img">
	<img
		class="thumbnail-fullwidth"
		src="/images/fav/bathroom-renovation-1568x882.jpg"
		alt="Bathroom renovation project showcase"
	/>
	<svg
		class="glass-text-svg"
		viewBox="0 0 1568 882"
		width="100%"
		height="auto"
		preserveAspectRatio="none"
		style="position:absolute; top:0; left:0; width:100%; height:auto; pointer-events:none; z-index:0;"
	>
		<defs>
			<clipPath id="svgTextPathMain">
				<!-- old transform -->
				<!-- x="-100" -->
				<text
					x="-300"
					y="-220"
					text-anchor="start"
					dominant-baseline="hanging"
					font-size="1300"
					font-family="inherit"
					font-weight="900"
				>
					<!-- O -->
					<!-- M -->
				</text>
				<text
					x="-500"
					y="-220"
					text-anchor="start"
					dominant-baseline="hanging"
					font-size="1300"
					font-family="inherit"
					font-weight="900"
				>
					O
					<!-- M -->
				</text>
				<text
					x="460"
					y="350"
					text-anchor="start"
					dominant-baseline="hanging"
					font-size="250"
					font-family="inherit"
					font-weight="900"
				>
					PPDRAG
				</text>
				<!-- alt  -->
				<text
					x="-100"
					y="290"
					text-anchor="start"
					dominant-baseline="hanging"
					font-size="190"
					font-family="inherit"
					font-weight="900"
				>
					<!-- OPPDRAGSMARKEDET -->
				</text>
				<text
					x="-60"
					y="250"
					text-anchor="start"
					dominant-baseline="hanging"
					font-size="350"
					font-family="inherit"
					font-weight="900"
				>
					<!-- OPPDRAGS -->
				</text>
				<text
					x="-60"
					y="150"
					text-anchor="start"
					dominant-baseline="hanging"
					font-size="300"
					font-family="inherit"
					font-weight="900"
				>
					<!-- OPPDRAGS -->
				</text>
				<text
					x="-60"
					y="350"
					text-anchor="start"
					dominant-baseline="hanging"
					font-size="300"
					font-family="inherit"
					font-weight="900"
				>
					<!-- MARKEDET -->
				</text>
			</clipPath>
		</defs>
		<image
			x="-200"
			y=""
			width="1868"
			height="882"
			xlink:href="/images/fav/bathroom-renovation-1568x882.jpg"
			style="filter: blur(30px) brightness(90%) drop-shadow(8px 8px 10px rgba(105, 120, 84, .5));"
			clip-path="url(#svgTextPathMain)"
		/>
		<!-- > alt styles -->
		<!-- style="filter: blur(20px) hue-rotate(20deg)  brightness(80%) drop-shadow(8px 8px 10px rgba(105, 120, 84, .5));" -->
		<!-- style="filter: blur(20px) hue-rotate(10deg) brightness(90%) drop-shadow(8px 8px 10px rgba(105, 120, 84, .5));" -->
	</svg>
	<!-- * Will be the overlay of landing thumbnail -->
	<div class="thumbnail-intro">
		<div class="intro-content">
			<h1>OPPDRAG</h1>
			<h2>– utført av troverdige fagfolk</h2>

			<br />

			<p id="pitch" class="">
				Her på oppdragsmarkedet slipper vi <span>bare</span> til seriøse AS selskaper,
				<br />
				kvalitetssikret og håndplukket,
				<br />
				for å forsikre deg om at du får tilbud fra <span>kun</span> de beste.
				<br />
			</p>
			<br />

			<div id="user pitch" class="hidden">
				<h3 style="color:var(--accent-medium)">
					gi slipp på uærlige fagfolk, og problematiske prosjekter.
				</h3>
				<p>
					Få alle de beste lokale leverandørene i din hule hånd,
					<br />
					og ha full kontroll til å gi deg selv den rimeligste og mest vellutførte jobben
					<br />
					som ditt drømmeprosjekt fortjener.
				</p>
				<br />
			</div>

			<div id="contractor-pitch">
				<div id="payment-pitch" class="hidden">
					<p>
						Vi behandler våre leverandører langt mer rimelig og rettferdig enn våre konkurenter. <br
						/>
						Det betyr som fagpeson som oss har du fri tilgang til alle prosjekter i ditt nærområde.
						<!-- Med oss har du som fagperson fri tilgang til alle prosjekter i ditt nærområde. -->
						<br />
						Betal kun per annonse.
						<br />
						Ingen abbonement.
						<br />
						Ingen bindingstid.
					</p>
				</div>
				<br />
				<div id="search-engine-pitch" class="hidden">
					<h3 style="color:var(--accent-medium)">
						Er du lei av å måtte blå igjennom sider på sider med annonser som er lite relevant til
						det du søker etter?
					</h3>
					<p>
						Dette er en irritasjon vi i oppdragsmarkedet deler med dere, og som vi personlig tar i
						betraktning.
						<br />
						Slik at du som leverandør hos oss får tilgang til en komleks søkemotor,
						<br />
						som sørger for at du finner nøyaktig de prosjektene du leter etter.
					</p>
					<br />
				</div>
			</div>
		</div>
		<!-- <div id="punch-line">
			<p>LEGG UT OPPDRAG HOS OSS HELT KOSTNADSFRITT OG UFORPLIKTENDE!</p>
			<div class="row">
				<Button primary glass size="small" onclick={registerBusiness} label="Registrer bedrift" />
				<Button primary gray glass size="small" onclick={issueAdd} label="Legg ut oppdrag" />
			</div>
		</div> -->
	</div>
	<div id="punch-line">
		<!-- <p>LEGG UT OPPDRAG HOS OSS HELT KOSTNADSFRITT OG UFORPLIKTENDE!</p> -->
		<!-- <p>TJENESTEN VÅR ER HELT KOSTNADSFRITT OG UFORPLIKTENDE!</p> -->
		<p>VÅRT TILBUD ER HELT KOSTNADSFRITT OG UFORPLIKTENDE!</p>
		<div class="row">
			<Button primary glass size="larger" onclick={registerBusiness} label="LEGG UT OPPDRAG" />
			<Button primary gray glass size="larger" onclick={issueAdd} label="REGISTRER BEDRIFT" />
			<!-- <Button hollow glass size="larger" onclick={registerBusiness} label="LEGG UT OPPDRAG" />
			<Button hollow glass size="larger" onclick={issueAdd} label="REGISTRER BEDRIFT" /> -->
		</div>
	</div>
</div>

<article>
	<div class="landing-page">
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
	</div>
</article>

<style>
	.landing-page {
		padding-top: 2rem;
		padding-bottom: 2rem;
		gap: 2rem;
	}
	.landing-page {
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: stretch;
	}
	.thumbnail-img {
		position: relative;
		width: 100%;
	}
	#pitch {
		color: var(--secondary-brighter);
		color: var(--secondary-bg);
		/* color: var(--primary-darkmode); */
		font-weight: 400;
		font-size: 1.5vw;
		font-size: 1vw;
		padding-left: 5vw;
	}
	#pitch span {
		color: var(--accent-bright);
	}
	.thumbnail-intro {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		/* margin: auto;
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: center;
		width: 80%;
		max-width: 900px;
		height: fit-content;
		z-index: 2; */
	}
	@media (max-width: 900px) {
		.thumbnail-intro {
			width: 95%;
			max-width: 98vw;
		}
	}
	.thumbnail-intro {
		position: absolute;
		/* transform: translate(10%, -10%); */
		width: 100%;
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: stretch;
		/* row-gap: 0; */
	}

	.thumbnail-intro {
		/* position: absolute; */
		/* position-anchor: ; */
		/* top: 25vh; */
		/* left: 25vw; */
		/* margin-left: 0;
		padding-left: 0;
		width: 100%; */
	}
	.intro-content {
		display: flex;
		padding-left: 30vw !important;
		padding-left: 40vw !important;
		font-size: initial;
		font-size: 1vw;
		flex-direction: column;
		align-content: center;
		align-items: flex-start;
	}

	#punch-line {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		margin: 2vw;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		align-content: center;
		gap: 0.5rem;
		/* gap: 1vw; */
		z-index: 3;
	}
	/* .thumbnail-img {
		position: relative;
		width: 100%;
		min-height: 350px;
	} */
	#punch-line p {
		/* padding-left: 1rem; */
		font-size: 1.2vw;
		font-size: 1vw;
		font-size: 0.9vw;
		font-weight: 400;
	}
	#punch-line .row {
		width: 100% !important;
		flex-wrap: wrap;
		row-gap: 1rem;
		width: 50%;
		justify-content: flex-start;
	}

	.thumbnail-intro h1 {
		color: var(--accent);
		font-size: xxx-large;
		font-size: 7vw;
		font-weight: 100;
		/* margin-bottom: 0.2em; */
	}
	.thumbnail-intro h2 {
		color: var(--secondary-brighter);
		color: var(--accent-medium);
		font-size: 3vw;
		font-size: 2vw;
		font-weight: 400;
		padding-left: 5vw;

		/* transform: translateY(-10px); */
	}
	.thumbnail-intro h1,
	.thumbnail-intro h2 {
		line-height: 1;
	}

	.intro-content {
		padding-left: 3rem;
		font-size: initial;
		font-size: 1vw;
	}

	/* .thumbnail-intro {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: stretch;
	} */

	/* 






	 */
	:global(.content.s-7IPF32Wcq3s8) {
		padding-top: 0 !important;
		padding-bottom: 0 !important;
	}

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
	.frosted-glass {
		/* > MOVED TO app.css < */
	}

	.glass-text-svg {
		margin-left: -1rem !important;
		padding: 0 !important;
		overflow: hidden;
		position: relative;
		/* width: 100vw; */
		min-width: 100vw;

		/* max-width: 100vw; */
		/* transform: translateX(-10%); */
	}

	.thumbnail-fullwidth {
		width: 100vw;
		min-width: 100vw;
		max-width: 100vw;
		height: auto;
		margin: 0;
		padding: 0 !important;
		overflow: hidden;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		display: block;
		object-fit: cover;
		border: none;
	}

	/* 
	.glass-icon::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
	}

	.glass-icon::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 1px;
		height: 100%;
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.8),
			transparent,
			rgba(255, 255, 255, 0.3)
		);
	}

	.glass-icon > .material-symbols-outlined,
	.glass-icon > svg {
		font-size: 28px;
		color: #222;
		z-index: 1;
	} */

	/* ...existing code... */

	/* >___ OLD Thumbnail css, might need this _________________________________________________________________ */

	#thumbnail {
		width: 100vw;
		height: 60vh;
		/* height: 50vh; */
		/* height: auto; */
		/* height: 100vh; */

		max-height: 90vh;
		min-height: 200px;

		padding: 0 !important;
		padding-top: 0 !important;
		padding-bottom: 0 !important;

		object-fit: contain;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}

	image {
		background-color: rgb(105, 120, 84);
		filter: drop-shadow(1px 1px 1px rgb(105, 120, 84));
	}
	#thumbnail::before {
		background-image: url(/images/fav/photo-1738162837369-a2beec3a1d47.avif);
		background-image: url(/images/fav/bathroom-renovation-1024x589_upscayl_2x_high-fidelity-4x.png);
		background-image: url(/images/fav/Servicepakken-HMS-KS-Devinco-Services-1-scaled.jpg);
		background-image: url(/images/fav/Cabin-at-Trolls-Peak-by-Rever-Drage-Architects-3.jpg);
		background-image: url(/images/fav/bathroom-renovation-1568x882.jpg);
		/* *good ones above */
		/* background-image: url(/images/fav/Jemco_Header_28-f4b63ba8.jpeg); */
		/* background-image: url(/images/fav/photo-1489514354504-1653aa90e34e.avif); */
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
</style>
