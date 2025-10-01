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
		<svg class="frosted-glass-svg" viewBox="0 0 1200 1200" width="150vw" height="90vh">
			<defs>
				<filter id="frosted-bg-blur" x="-20%" y="-20%" width="140%" height="140%">
					<feGaussianBlur stdDeviation="16" />
				</filter>
				<mask id="letter-mask-only" style="position:sticky; left:0; z-index:3;">
					<rect
						width="100%"
						height="100%"
						fill="black"
						style="position:sticky; left:0; z-index:3;"
					/>
					<text
						class="M"
						display="absolute"
						x="-55%"
						y="-50%"
						text-anchor="start"
						dominant-baseline="hanging"
						font-size="2100"
						font-family="inherit"
						font-weight="900"
						fill="white"
						letter-spacing="-22"
						style="position:sticky; left:0; z-index:3;"
					>
						M
					</text>
				</mask>
			</defs>
			<image
				x="-525"
				y="-525"
				width="2400"
				height="2400"
				xlink:href="/images/fav/bathroom-renovation-1568x882.jpg"
				filter="url(#frosted-bg-blur)"
				mask="url(#letter-mask-only)"
			/>
			<text
				x="-55%"
				y="-50%"
				text-anchor="start"
				dominant-baseline="hanging"
				font-size="2100"
				font-family="inherit"
				font-weight="900"
				fill="rgba(255,255,255,0.18)"
				letter-spacing="-22"
				style="position:sticky; left:0; z-index:3;"
			>
				M
			</text>
		</svg>
	</figure> -->
	<!-- <figure id="thumbnail" class="thumbnail-fullwidth no-padding">
		<div class="icon-wrapper">
			<div class="backdrop-layer"></div>
			<span class="glass-icon">M</span>
		</div>
	</figure> -->

	<img class="thumbnail-fullwidth" src="/images/fav/bathroom-renovation-1568x882.jpg" />
	<!-- *dONT DELETE THIS -->
	<!--
	<img class="clipped" src="/images/fav/bathroom-renovation-1568x882.jpg" />
	 <svg height="0" width="0" style="visibility: hidden;">
		<defs>
			<clipPath id="svgTextPath">
				<text
				x="-50"
				y="415"
				textLength="400px"
				font-family="Nunito Sans, 'Helvetica Neue', Helvetica, Arial, sans-serif"
				font-size="700px"
				font-weight="700"
				>
				M
			</text>
		</clipPath>
	</defs>
	</svg> -->
	<!-- *dONT DELETE THIS -->

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

		<h1 class="frosted-glass-text">M</h1>
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
				<text
					x="-100"
					y="-220"
					text-anchor="start"
					dominant-baseline="hanging"
					font-size="1250"
					font-family="inherit"
					font-weight="900"
				>
					M
				</text>
			</clipPath>
		</defs>
		<image
			x="-200"
			y=""
			width="1868"
			height="882"
			xlink:href="/images/fav/bathroom-renovation-1568x882.jpg"
			style="filter: blur(20px);"
			clip-path="url(#svgTextPathMain)"
		/>

		<!-- 
				<image
			x="-100"
			y="-0"
			width="1568"
			height="882"
			xlink:href="/images/fav/bathroom-renovation-1568x882.jpg"
			style="filter: blur(30px);"
			clip-path="url(#svgTextPathMain)"
		/>
		 -->
	</svg>
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
	.glass-text-svg {
		margin: 0 !important;
		padding: 0 !important;
		overflow: hidden;
		position: relative;
		width: 100vw;
		min-width: 100vw;
		max-width: 100vw;
	}
	.frosted-glass-svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
	}
	.frosted-glass-letter-mask {
		/* Remove background and border, only used for positioning */
		background: none !important;
		border: none !important;
		box-shadow: none !important;
	}
	.frosted-glass-letter-mask-text {
		display: none;
	}
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
		/* transform: translateX(-50%); */
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

		padding: 0 !important;
		padding-top: 0 !important;
		padding-bottom: 0 !important;

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

	/* > GLASMORPHIC TEST */

	/* .icon-wrapper {
		height: 600px;
		width: 600px;
	}

	.glass-icon {
		display: inline-block;
		font-size: 800px;
		transform: translateX(-10%) translateY(-25%);
		font-weight: 700;
		background-clip: text;
		color: transparent;
		backdrop-filter: blur(12px) saturate(180%);
		filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 12px rgba(0, 0, 0, 0.25));
	} */

	/* .thumbnail-fullwidth {
		inset: 0;
		width: 100vw;
		height: 100vh;
		margin: 0 !important;
		padding: 0 !important;
		border: none;
		object-fit: cover;
		display: block;
		z-index: 0;
		pointer-events: none;
	} */
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

	.glass-icon {
		position: relative;
		font-size: 800px;
		font-weight: 700;
		color: transparent;
		background-clip: text;
		-webkit-background-clip: text;
		z-index: 1;
	}

	.clipped {
		position: absolute;
		top: 0;
		left: 0;

		width: 100vw;
		min-width: 100vw;
		max-width: 100vw;
		clip-path: url(#svgTextPath);
		filter: blur(10px);
	}

	.glass-icon {
		/* display: inline-block;
		font-size: 800px;
		transform: translateX(-10%) translateY(-25%);
		font-weight: 700;
		background-clip: text;
		color: transparent;
		backdrop-filter: blur(12px) saturate(180%);
		filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 12px rgba(0, 0, 0, 0.25)); */

		/* height: fit-content; */
		/* width: fit-content; */
		/* position: relative; */
		/* font-size: 1064px; */
		/* display: flex; */
		/* background-color: aqua; */

		/* -webkit-backdrop-filter: blur(12px) saturate(180%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent; */

		/* text-shadow: none; */
	}

	.M {
		margin-left: 20%;
		scale: 30;
		padding: 0;
		white-space: 0;
		margin-left: 0;
		margin-right: auto;
		/* scale: 1; */
		margin-left: 0;
		margin-right: auto;
		scale: 30;
		max-width: 3vw;
		max-height: 80vh;
		overflow: hidden;
		display: inline-block;
		margin-left: 0;
		margin-right: auto;
		scale: 31;
		max-width: none;
		max-height: 80vh;
		overflow: visible;
		display: inline-block;
		transform: translateX(37%);
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
</style>
