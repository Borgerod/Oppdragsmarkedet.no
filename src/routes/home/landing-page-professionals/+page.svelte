<svelte:options runes />

<script lang="ts">
	// Add any imports or logic here if needed
	import '@src/app.css';
	import '@stories/forms/form.css';
	import '@src/color_scheme.css';
	import '@src/dark-mode.css';
	import '../home.css';
	import Button from '@stories/Button.svelte';

	function registerBusiness() {
		// > placeholder
	}

	function issueAdd() {
		// > placeholder
	}
</script>

<div class="thumbnail-img">
	<!-- ? TODO [ ]: this might need to be moved to a component -->
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
					<!-- PPDRAG -->
				</text>
				<text
					x="500"
					y="590"
					text-anchor="start"
					dominant-baseline="hanging"
					font-size="70"
					font-family="inherit"
					font-weight="900"
				>
					<!-- – utført av troverdige fagfolk -->
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
		<br />
		<br />
		<br />
		<br />
		<br />

		<div class="intro-content">
			<h1>OPPDRAG</h1>
			<h2>– utført av troverdige fagfolk</h2>

			<br />

			<p id="pitch" class="hidden">
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

			<div id="contractor-pitch " class="">
				<div id="payment-pitch ">
					<p>
						<!-- Vi behandler våre leverandører langt mer <span>rimelig og rettferdig</span> enn våre
						konkurenter.  -->
						Langt mer <span>rimelig og rettferdig</span> enn våre konkurenter.

						<br />
						<!-- Som fagperson hos oss har du <span>fri tilgang til alle prosjekter</span> i ditt
						nærområde.  -->
						Som fagperson hos oss får du <span>fri tilgang</span> til alle prosjekter
						<!-- <span>alle prosjekter</span>  -->
						i ditt nærområde.
					</p>

					<!-- <p class="list"> -->
					<!-- <hr class="rounded" /> -->
					<br />
					<div class="bottom alt2">
						<ul class="column list">
							<li>Betal kun per annonse</li>
							<!-- <br /> -->
							<li>Ingen abbonement</li>
							<!-- <br /> -->
							<li>Ingen bindingstid</li>
						</ul>
						<vr />

						<!-- </p> -->
						<div id="punch-line inline" class="inline">
							<!-- <p>VÅRT TILBUD ER HELT KOSTNADSFRITT OG UFORPLIKTENDE!</p> -->
							<!-- <p>Vårt tilbud er helt kostnadsfritt og uforpliktende</p> -->
							<p>Lynrask registrering, ta en titt selv!</p>
							<Button primary hollow size="larger" onclick={issueAdd} label="REGISTRER BEDRIFT" />
							<!-- <div class="row"></div> -->
						</div>
					</div>
				</div>
				<br />
				<!-- <div id="search-engine-pitch" class="hidden">
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
				</div> -->
			</div>
		</div>
	</div>
	<!-- <div id="punch-line">
		<p>VÅRT TILBUD ER HELT KOSTNADSFRITT OG UFORPLIKTENDE!</p>
		<div class="row">
			<Button primary glass size="larger" onclick={registerBusiness} label="LEGG UT OPPDRAG" />
			<Button primary gray glass size="larger" onclick={issueAdd} label="REGISTRER BEDRIFT" />
		</div>
	</div> -->
</div>

<article class="landing-page">
	<section class="card homepage-hero">
		<h1>Velkommen til Oppdragsmarkedet</h1>
		<!-- <h1>VELKOMMEN TIL OPPDRAGSTORGET</h1> -->
		<p>
			Oppdragsmarkedet er din plattform for å finne og tilby tjenester, prosjekter og samarbeid.
			Opprett en konto for å komme i gang, eller logg inn for å se dine prosjekter.
		</p>

		<p class="wide-text">VÅRT TILBUD ER HELT KOSTNADSFRITT OG UFORPLIKTENDE</p>
		<div class="homepage-actions">
			<div class="row">
				<Button primary glass size="larger" onclick={registerBusiness} label="LEGG UT OPPDRAG" />
				<Button primary gray glass size="larger" onclick={issueAdd} label="REGISTRER BEDRIFT" />
			</div>
		</div>
		<br />
		<p>
			<!-- <br /> -->
			<!-- Prøv ut demoen vår -->
		</p>
		<hr class="rounded" />
		<div class="homepage-actions bottom">
			<p></p>
			Fortsatt usikker?<br /> Ta en titt på hvordan det ser ut først
			<Button secondary glass size="larger" onclick={issueAdd} label="Se plattformen vår" />
		</div>
	</section>

	<section class="card homepage-professionals-pitch">
		<div id="" class="">
			<h3>
				Er du lei av å måtte blå igjennom sider på sider med annonser som er lite relevant til det
				du søker etter?
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
	</section>

	<section class=" homepage-features">
		<h2>Hvem er Oppdragsmarkedet for?</h2>
		<div class="oppdragsgivere">
			<h3>Oppdragsgivere</h3>

			<!-- <p>
			Oppdragsmarkdet er for alle typer oppdragsgivere, <br />
			fra private hjemmeprosjekter til store selskapsprosjekter
		</p> -->
			<!-- <br /> -->
			<div class="row">
				<!-- <p> -->
				<p class="rightside">
					<!-- Alt fra privatpersoner, bedrifter og statlige organisasjoner.  -->
					<!-- Alt fra private hjemmeprosjekter til større selskaps-/statlige- prosjekter.<br /> -->
					Oppdragsmarkdet er lagt opp for at hvem som helst kan legge ut oppdrag. <br />
					Vi tar i mot alle slags yrkesfags-prosjekter til enhver prisklasser og fra hvem som helst;<br
					/>
					Alt fra private hjemmeprosjekter til større selskapsprosjekter, til og med statlig.
				</p>
				<vr />
				<div class="leftside">
					<ul>
						<li>Er du en privatperson som vil pusse opp badet?</li>
						<li>Er du en bedrift som planlegger å erstatte fryseanlegget?</li>
						<li>Er du et friluftslivlag som trenger fler frivillige til dugnaden?</li>
						<li>Er du en statlig organisasjon med et skadedyrsproblem?</li>
						<!-- <li>Er du en statlig organisasjon som planlegger å rive et bygg?</li> -->
						<!-- <li>Er du en statlig organisasjon som planlegger en ny vei?</li> -->
						<!-- Svaret er det samme, vi er den rette plassen for deg!<br /> -->
						Svaret er det samme, så lengre du har et prosjekt, så vil vi ha deg!
					</ul>
				</div>
			</div>
			<br />
		</div>
		<!-- TODO: finn bilde av en gruppe fagfolk "strong blue collars, stand united, look at our workforce" type of shit.  -->
		<div>
			<!-- <img class="workfore-photo" src="/images/workers/photo-1583330700593-8cd61a3952dd.avif" alt=""\/> -->
		</div>
		<div class="oppdragstakere">
			<h3>Oppdragstakere</h3>

			<div class="row">
				<div class="leftside">
					<p>
						Her i oppdragmarkedet er kvalitet viktig, dermed slipper vi bare til <span
							>de beste</span
						>
						fagfolkene.
						<br />

						<br />
						Som personer som selv har prosjekter hjemme så vet vi hvor verdifullt det er å kunne jobbe
						med en profesjonell fagarbeider.

						<!-- Så <span class="big">vårt mål</span> er å skape en plattform hvor brukeren kan være
						<span class="big">trygg på at alle bud kommer fra dyktige fagfolk,</span>
						som leverer et godt resultat.
						<br /> -->
						<!-- <br /> -->
						<!-- <br /> -->

						Så vårt mål er å skape
						<br />
						<br />
						<!-- <br /> -->
						<span class="big">
							"En plattform hvor brukeren kan være <span class="thin">trygg</span> på at alle bud
							kommer fra <span class="thin">dyktige fagfolk</span>, som leverer et
							<span class="thin">godt resultat</span>."
						</span>

						<!-- <br /> -->
						<br />
						<br />
						Derfor blir alle bedrifter som registreres evaluert av oss før de får tilgang.
						<br />
					</p>
				</div>
				<vr />
				<div class="rightside">
					<p>
						<span>Andre platformer</span> på markedet består gjerne kun av forretningsmenn og
						Kontoransatte.
						<br />
						<br />
						<span class="big">Det gjør ikke vi.</span>
						<br />
						<br />
						Over <span>60%</span> av bemanningen på oppdragsmarkedet kommer selv fra yrkesfaget, så
						<span class="big wrap-around"> vi vet. </span>
						<br />
						<br />
						Vi vet hvor frustrerende det kan være å måtte jobbe med klienter som på grunn av være å måtte
						jobbe med klienter som på grunn av tidligere erfaring med useriøse aktører ikke
						<span> verdsetter hardt arbeid.</span>
					</p>

					<!-- </p> -->
					<!-- <ul></ul> -->
				</div>
			</div>
			<div class="under-text">
				<!-- <br /> -->
				Her er noe av det vi krever til oppdragstakerne våre: <br />
				<div>
					<ul>
						<li>
							<span class="material-symbols-outlined"> select_check_box </span>
							Registrert AS selskap
						</li>
						<li>
							<span class="material-symbols-outlined"> select_check_box </span>
							Sentral godkjenning, Mesterbrev etc.
						</li>
						<li>
							<span class="material-symbols-outlined"> select_check_box </span>
							..
						</li>
					</ul>
				</div>
				<br />
				Er du usikker? Registrer bedriften din så evaluerer vi deg!
			</div>
		</div>
	</section>

	<section>
		<br />
		<div class="card glass-component">
			<div class="dropdown-style">
				<span class="material-symbols-outlined"> 1k </span>
				<span class="material-icons-outlined"> favorite </span>
				<span>Some Message</span>
			</div>
			<div class="dropdown-style white">
				<span class="material-symbols-outlined"> 1k </span>
				<span class="material-icons-outlined"> favorite </span>
				<span>Some Message</span>
			</div>
			<div class="dropdown-style grey dark">
				<span class="material-symbols-outlined"> 1k </span>
				<span class="material-icons-outlined"> favorite </span>
				<span>Some Message</span>
			</div>
			<div class="dropdown-style black dark">
				<span class="material-symbols-outlined"> 1k </span>
				<span class="material-icons-outlined"> favorite </span>
				<span>Some Message</span>
			</div>
		</div>
	</section>

	<section>
		<br />
		<div class="card glass-component">
			<div class="dropdown-style white">
				<div class="under-text">
					<!-- <br /> -->
					Her er noe av det vi krever til oppdragstakerne våre: <br />
					<div>
						<ul>
							<li>
								<span class="material-symbols-outlined"> select_check_box </span>
								Registrert AS selskap
							</li>
							<li>
								<span class="material-symbols-outlined"> select_check_box </span>
								Sentral godkjenning, Mesterbrev etc.
							</li>
							<li>
								<span class="material-symbols-outlined"> select_check_box </span>
								..
							</li>
						</ul>
					</div>
					<br />
					Er du usikker? Registrer bedriften din så evaluerer vi deg!
				</div>
			</div>
		</div>
	</section>
	<br />
	<section class="alt3">
		<br />
		<div class="card glass-component">
			<div class="oppdragstakere">
				<div class="row">
					<div class="leftside dropdown-style white">
						<!-- <div class="leftside dropdown-style white"> -->
						<h3>Oppdragstakere</h3>
						<p>
							Her i oppdragmarkedet er kvalitet viktig, dermed slipper vi bare til <span
								>de beste</span
							>
							fagfolkene.
							<br />

							<br />
							Som personer som selv har prosjekter hjemme så vet vi hvor verdifullt det er å kunne jobbe
							med en profesjonell fagarbeider.

							<!-- Så <span class="big">vårt mål</span> er å skape en plattform hvor brukeren kan være
						<span class="big">trygg på at alle bud kommer fra dyktige fagfolk,</span>
						som leverer et godt resultat.
						<br /> -->
							<!-- <br /> -->
							<!-- <br /> -->

							Så vårt mål er å skape
							<br />
							<br />
							<!-- <br /> -->
							<!-- <span class="big dropdown-style white"> -->
							<span class="big">
								"En plattform hvor brukeren kan være <span class="thin">trygg</span> på at alle bud
								kommer fra <span class="thin">dyktige fagfolk</span>, som leverer et
								<span class="thin">godt resultat</span>."
							</span>

							<!-- <br /> -->
							<br />
							<br />
							Derfor blir alle bedrifter som registreres evaluert av oss før de får tilgang.
							<br />
						</p>
					</div>
					<div class="spacer"></div>
					<!-- <vr /> -->
					<div class="dropdown-style black">
						<div class="rightside">
							<p>
								<span>Andre platformer</span> på markedet består gjerne kun av forretningsmenn og
								Kontoransatte.
								<br />
								<br />
								<span class="big">Det gjør ikke vi.</span>
								<br />
								<br />
								Over <span>60%</span> av bemanningen på oppdragsmarkedet kommer selv fra yrkesfaget,
								så
								<span class="big wrap-around"> vi vet. </span>
								<br />
								<br />
								Vi vet hvor frustrerende det kan være å måtte jobbe med klienter som på grunn av være
								å måtte jobbe med klienter som på grunn av tidligere erfaring med useriøse aktører ikke
								<span> verdsetter hardt arbeid.</span>
							</p>
						</div>
					</div>
				</div>
				<div class="under-text dropdown-style white">
					<!-- <br /> -->
					Her er noe av det vi krever til oppdragstakerne våre: <br />
					<div>
						<ul>
							<li>
								<span class="material-symbols-outlined"> select_check_box </span>
								Registrert AS selskap
							</li>
							<li>
								<span class="material-symbols-outlined"> select_check_box </span>
								Sentral godkjenning, Mesterbrev etc.
							</li>
							<li>
								<span class="material-symbols-outlined"> select_check_box </span>
								..
							</li>
						</ul>
					</div>
					<br />
					Er du usikker? Registrer bedriften din så evaluerer vi deg!
				</div>
			</div>
		</div>
	</section>

	<!-- > IOS crystaline test -->
	<!-- <div id="TEST"> -->
	<!-- link: https://fjolt.com/article/css-ios-crystalline-effect-backdrop-filter -->
	<div class="hidden">
		<div class="effects">
			<div class="effect-holder">
				<div class="dropdown-style dark">
					<span class="material-symbols-outlined"> 1k </span>
					<span class="material-icons-outlined"> favorite </span>
					<span>Some Message</span>
				</div>
			</div>
			<div class="effect-holder">
				<div class="dropdown-style white">
					<span class="material-symbols-outlined"> 1k </span>
					<span class="material-icons-outlined"> favorite </span>
					<span>Some Message</span>
				</div>
			</div>
			<div class="effect-holder">
				<div class="dropdown-style grey dark">
					<span class="material-symbols-outlined"> 1k </span>
					<span class="material-icons-outlined"> favorite </span>
					<span>Some Message</span>
				</div>
			</div>

			<div class="effect-holder">
				<div class="dropdown-style black dark">
					<span class="material-symbols-outlined"> 1k </span>
					<span class="material-icons-outlined"> favorite </span>
					<span>Some Message</span>
				</div>
			</div>
		</div>
		<!-- display blend mode -->
		<div class="effects">
			<!-- <br />
			<div class="effect-holder">
				<div class="dropdown-style dark blend">
					<span class="material-symbols-outlined"> 1k </span>
					<span>Some Message</span>
				</div>
			</div>
			<div class="effect-holder">
				<div class="dropdown-style white blend">
					<span class="material-symbols-outlined"> 1k </span>
					<span>Some Message</span>
				</div>
			</div>
			<div class="effect-holder">
				<div class="dropdown-style grey dark blend">
					<span class="material-symbols-outlined"> 1k </span>
					<span>Some Message</span>
				</div>
			</div>
	
			<div class="effect-holder">
				<div class="dropdown-style black dark blend">
					<span class="material-symbols-outlined"> 1k </span>
					<span>Some Message</span>
				</div>
			</div> -->
		</div>
	</div>

	<!-- </div> -->

	<!-- TODO [ ]: continue with this -->
	<!-- <section class="card">
		<div class="how-it-works">
			<h2>Hvorfor bruke Oppdragsmarkedet</h2>
			<h2>Hvordan bruke Oppdragsmarkedet</h2>
			<ul>
				<li>Finn kvalifiserte leverandører og samarbeidspartnere</li>
				<li>Publiser og administrer prosjekter enkelt</li>
				<li>Trygg kommunikasjon og sikker betaling</li>
				<li>Bygg nettverk og få nye muligheter</li>
			</ul>
		</div>
	</section>

	<section class="card homepage-about">
		<h2>Om oss</h2>
		<p>
			Oppdragsmarkedet.no samler profesjonelle og privatpersoner for å gjøre det enkelt å finne og
			tilby oppdrag. Vi tror på åpenhet, kvalitet og effektivitet i alle ledd.
		</p>
	</section> -->
</article>

<style>
	/* > this is temporary remove after testing */
	:root {
		.rightside span {
		}

		.section span.big,
		.homepage-features span.big {
			font-size: 2rem;
			font-weight: 100;
			/* font-weight: 500; */
			color: var(--accent-medium);
		}

		.section span.thin,
		.homepage-features span.thin {
			font-size: 2rem;
			font-weight: 100;
			font-weight: 500;
			color: var(--accent-medium);
		}
		.homepage-features span {
			/* font-weight: 100; */
			font-weight: 500;
			/* color: var(--accent-medium); */
		}

		.homepage-features {
			padding: 0;
			display: flex;
			flex-direction: column;
			text-align: left;
			/* align-items: center !important; */
		}
		.homepage-features .row {
			display: flex;
			flex-direction: row;
			justify-content: right;
		}

		.material-symbols-outlined {
			color: var(--accent-medium);
			vertical-align: bottom;
		}
		section vr {
			border-left: 1px solid var(--shadow);
			border-radius: 3rem;
		}
		.oppdragstakere .under-text {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: left;
			padding: 2rem;
			gap: unset;
		}
		.oppdragstakere {
			max-width: 935px;
			/* padding-left: 0rem;
		margin: 0; */
			/* margin-left: 1rem; */
		}
		.oppdragstakere .rightside {
			flex: 2;
			/* display: flex; */
		}
		.oppdragstakere .leftside {
			flex: 3;
			/* display: flex; */
			/* flex-direction: column; */
			/* justify-content: center; */
		}

		.oppdragsgivere .leftside {
			flex: 4;
		}

		.oppdragsgivere ul,
		.oppdragstakere ul {
			gap: 0rem;
		}

		.oppdragsgivere li,
		.oppdragstakere li {
			margin-bottom: 0.25rem;
			font-size: small;
			vertical-align: center;
		}
		.oppdragsgivere p,
		.oppdragstakere p {
			flex: 3;
		}

		.oppdragsgivere div,
		.oppdragstakere div {
			gap: 2rem;

			/* flex-direction: row; */
			/* display: flex; */
		}
		.oppdragsgivere h3,
		.oppdragstakere h3 {
			text-align: left;
			padding-bottom: 1rem;
			/* align-items: start;
		display: flex;
		justify-content: start; */
		}

		.oppdragsgivere,
		.oppdragstakere {
			display: flex;
			flex-direction: column;
		}
		.workfore-photo {
			height: 250px;
			/* height: auto; */
			width: 100%;
			object-fit: cover;
			/* box-shadow:; */
			box-shadow: 0px 0px 8px 4px var(--shadow);
			/* padding: 1rem; */
			margin-bottom: 2rem;
			margin-top: 2rem;
		}
		.homepage-professionals-pitch {
			text-align: center;
		}
		.card {
			/* padding: 3rem 2rem; */
			padding: 3rem 2rem 2rem 2rem;
		}
		.homepage-features P {
			text-align: left;
		}
		article p {
			color: var(--secondary);
		}

		article h3 {
			font-size: large;
			font-size: medium;
		}

		article h2,
		article h1,
		article h3 {
			/* color: var(--primary); */
			color: var(--accent-dark);
		}
		.homepage-actions {
			color: var(--secondary);
			display: flex;
			flex-direction: row;
			align-items: center;
			text-align: start;
			text-align: end;
			/* : start; */
		}
		.homepage-actions.bottom {
			padding: 2rem;
		}
		/* .homepage-actions p {
		font-size: unset;
		padding: 0;
		margin-bottom: 0;
		color: var(--secondary);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		text-align: start;
	} */

		.thumbnail-intro vr {
			border-left: 1px solid var(--secondary-bg);
			/* border-right: .5px solid var(--secondary-bg); */
			border-radius: 3rem;
		}
		.wide-text {
			letter-spacing: 5px;
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

		.bottom.alt2 {
			/* bottom of payment pitch, idk why more specific naming didnt work */
			display: flex;
			flex-direction: row !important;
			justify-content: space-between;
			/* justify-content: space-around; */
			/* justify-content: center; */
		}

		.bottom.alt2 .inline {
			display: flex;
			flex-direction: column;
			padding: 1vw;
			gap: 1rem;
		}

		#punch-line {
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
		#punch-line {
			color: var(--secondary-bg);
			color: var(--accent-brightest);
			color: var(--accent-bright);
			font-size: 1.4vw;
			font-weight: 300;
			display: flex;
			flex-direction: column;
			justify-content: center;
			/* align-items: flex-end; */
			/* padding-top: 2vw; */
			/* padding-left: 2vw; */
			gap: 0.5rem;
			font-size: 1.4vw;
			/* font-size: 2vw; */
			font-weight: 300;
			/* font-weight: 600; */
			color: var(--secondary-bg);
		}
		hr {
			margin: 1rem 0rem;
			color: var(--secondary-brighter);
			color: var(--shadow-brighter);
		}
		.thumbnail-intro hr {
			/* padding: 1rem; */
			margin: 1rem 0rem;
			color: var(--secondary-bg);
		}
		.thumbnail-intro span {
			color: var(--secondary-bg);
			color: var(--accent-brightest);
			color: var(--accent-bright);
			font-size: 1.4vw;
			font-weight: 300;
			/* font-weight: 600; */

			/* color: var(--accent); */
			/* color: var(--accent-medium); */
			/* color: var(--accent-dark); */
		}
		.thumbnail-intro ul {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-end;
			/* padding-top: 2vw; */
			/* padding-left: 2vw; */
			padding-right: 1vw;
			gap: 0.5rem;
			font-size: 1.4vw;
			/* font-size: 2vw; */
			font-weight: 300;
			/* font-weight: 600; */
			color: var(--secondary-bg);
			/* color: var(--accent-brightest); */
			/* color: var(--accent); */
			/* color: var(--accent-medium); */
		}
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

		/* #pitch span {
		color: var(--accent-bright);
	} */
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

		.glass-component {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			background-image: url(/images/oIpwxeeSPy1cnwYpqJ1w_Dufer.jpg);
			background-image: url(/images/fav/medium-shot-man-working-with-helmet_23-2149343698.jpg);
			align-items: flex-start;
			background-image: url(/images/fav/photo-1489514354504-1653aa90e34e.avif);
			/* background-image: url(/images/csm_PNC_Varoddbrua_04_da7a405cb9.jpg); */
			/* background-image: url(/images/6633695340ae07127b4192db_construction-min.webp); */
			/* align-items: flex-start; */
			/* background-image: url(/images/rorlegger-comfort.jpg); */

			/* background-image: url(/images/photo-1686236589375-15fd83d4584e.avif); */
			/* background-image: url(/images/workers/photo-1583330700593-8cd61a3952dd.avif); */
			/* background-image: url(/images/photo-1565682461010-d6091fce4133.avif); */
			/* background: rgba(84, 84, 84, 0.089); */
			/* background-image: url(/images/rocks.jpg); */
			/* background-image: url(/images/fav/Jemco_Header_28-f4b63ba8.jpeg); */
			/* background-image: url(/images/fav/about-us-2.jpg); */
			/* background-image: url(/images/fav/about-us-1.jpg); */

			background-position: 70% 0%;
			/* background-position: 100% 50%; */
			background-repeat: no-repeat;

			min-width: 350px;
			padding: 1rem !important;
			background-size: contain;
			background-size: cover;
			filter: brightness(95%);
			/* align-items: flex-start; */

			/* background-position: right; */
			/* background */
			/* scale: 0.5; */
		}
		.glass-component .card,
		.glass-component p {
			display: flex;
			flex-direction: column;
			justify-content: right;
			/* justify-content: left; */
			width: 50%;
			min-width: 250px;
			max-width: 350px;
			color: var(--secondary-bg);
		}

		#glass-object {
			/* background-image: url(/images/fav/photo-1489514354504-1653aa90e34e.avif); */

			border-radius: 25px;
			backdrop-filter: blur(10.6px);
			padding: 2rem;
			box-shadow:
				0 2px 10px rgb(0 0 0 / 10%),
				0 10px 15px rgb(0 0 0 / 20%);
			box-sizing: border-box;
			background-image: linear-gradient(45deg, rgba(75, 72, 71, 0.255), rgba(156, 152, 151, 0.255));
			background-image: linear-gradient(45deg, rgba(75, 72, 71, 0.255), rgba(90, 90, 90, 0.255));
			background-image: linear-gradient(45deg, rgba(70, 70, 70, 0.255), rgba(0, 0, 0, 0.25));
			width: 100%;
			min-height: 70px;
			mix-blend-mode: hard-light;

			/* background: rgba(255, 255, 255, 0.25);
			backdrop-filter: blur(10px);
			-webkit-backdrop-filter: blur(10px);
			border-radius: 16px;
			box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
			border: 1px solid rgba(255, 255, 255, 0.3);
			*/
			background: rgba(29, 29, 29, 0.25);
			background: rgba(29, 29, 29, 0.25);
			backdrop-filter: blur(10px);
			-webkit-backdrop-filter: blur(10px);
			border-radius: 16px;
			box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
			/* border: 1px solid rgba(255, 255, 255, 0.3); */
			border: 1px solid rgba(154, 154, 154, 0.3);
		}
		.glass-component p {
			color: var(--secondary);
			/* color: var(--primary); */
		}
		.glass-component .card.frosted-glass {
			/* filter: brightness(90%) drop-shadow(8px 8px 10px rgba(105, 120, 84, 0.5)); */
			/* filter: brightness(90%); */

			background: rgba(255, 255, 255, 0.25);
			background: rgba(84, 84, 84, 0.089);
			background: rgba(0, 0, 0, 0.123);

			background: rgba(118, 122, 125, 0.255);
			background: rgba(156, 152, 151, 0.255);
			background: rgba(156, 152, 151, 0.0015);

			/* background: rgba(255, 255, 255, 0.15); */

			/* background: rgba(255, 255, 255, 0.15); */
			/* background: rgba(82, 74, 74, 0.338); */
			/* background: rgba(158, 143, 143, 0.338); */

			/* background: rgba(173, 173, 173, 0.418); */

			/* background: rgba(130, 146, 95, 0.15); */
			/* background: color-mix(in srgb, var(--third-bg) 40%, transparent); */

			z-index: 1;
			backdrop-filter: blur(10px) !important;
			/* backdrop-filter: unset; */

			/* > shadow */
			/* box-shadow: -4px 8px 16px rgba(0, 0, 0, 0.20); */
			/* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15); */
			/* box-shadow: 0 14px 16px rgba(0, 0, 0, 0.15); */

			/* > special border */
			/* border: 1px solid rgba(255, 255, 255, 0.15);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		border-right: 1px solid rgba(0, 0, 0, 0.1); */

			/* border: 1px solid rgba(255, 255, 255, 0.15);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		border-left: 1px solid rgba(0, 0, 0, 0.1); */
		}
	}

	/* 
















	 */
	/* > IOS crystaline test */

	.effects {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-around;
		gap: 2rem;
	}
	.effect-holder {
		height: auto;
		flex: 1 1 0;
		border-radius: 16px;
		float: left;
		background-size: 100%;
		background-repeat: no-repeat;
		background-image: url(image.png);
		background-image: url(/images/colorful_background.jpg);
	}
	.dropdown-style {
		margin: 0 1rem 0 0;
		margin: 2rem;
		border-radius: 12px;
		padding: 1rem;
		position: relative;
		box-shadow: 0 10px 15px rgb(0 0 0 / 20%);
		box-sizing: border-box;
		width: calc(100% - 4rem);
		color: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(33px);
		backdrop-filter: blur(15px);
		background-blend-mode: overlay;
		display: flex;
		align-items: center;
		font-weight: 300 !important;
		box-shadow: 0 10px 15px rgb(0 0 0 / 20%);
		color: rgba(0, 0, 0, 0.8) !important;
	}

	.dropdown-style.dark span.material-symbols-outlined {
		color: rgba(255, 255, 255, 0.8) !important;
	}

	.dropdown-style.dark span {
		/* TODO [ ]: make this a color var  */
		color: rgba(255, 255, 255, 0.8);
	}
	.dropdown-style.dark {
		box-shadow: 0 10px 15px rgb(0 0 0 / 30%);
	}
	.dropdown-style.blend {
		mix-blend-mode: lighten;
	}
	.dropdown-style.dark.blend {
		mix-blend-mode: darken;
	}
	/* .dropdown-style.white {
		--bg-color: #ffffff7d;
		background-color: var(--bg-color);
	}

	.dropdown-style.black {
		--bg-color: #4c3434e0;
		background-color: var(--bg-color);
	}
	.dropdown-style.grey {
		--bg-color: #423c5a80;
		background-color: var(--bg-color);
	}
	.material-icons-outlined {
		color: var(--bg-color) !important;
	} */

	.dropdown-style.white {
		--bg-color: #ffffff7d;
		background-color: var(--bg-color);

		--bg-color: rgba(255, 255, 255, 0.35);
	}
	.dropdown-style.black {
		--bg-color: #4c34349d;

		--bg-color: rgba(19, 13, 13, 0.35);
		background-color: var(--bg-color);
	}
	.dropdown-style.grey {
		background-color: var(--bg-color);
		--bg-color: #423c5a80;
		--bg-color: rgba(66, 60, 90, 0.35);
	}
	.dropdown-style.black .material-icons-outlined,
	.dropdown-style.white .material-icons-outlined,
	.dropdown-style.grey .material-icons-outlined {
		color: var(--bg-color) !important;
		opacity: 280% !important;
		color: hsl(from var(--bg-color) calc(h + 0) calc(s * 0.4) calc(l * 0.73)) !important;
	}
	.dropdown-style .material-icons-outlined {
		opacity: 80%;
	}

	.material-symbols-outlined {
		color: inherit !important;
		font-variation-settings:
			'FILL' 0,
			'wght' 200,
			'GRAD' 0,
			'opsz' 24;
	}
	.dropdown-style {
		flex: 1;
		/* display: flex; */
		/* justify-content: center; */
		/* justify-content: right; */
		/* max-width: 400px !important; */
		/* min-width: 200px !important; */
		/* width: 50%; */
	}
	.glass-component p {
		/* display: flex; */
		/* flex-direction: unset !important; */
		/* justify-content: right !important; */
		/* justify-content: flex-end !important; */
		/* width: 400px !important; */
		/* height: 400px; */
		/* width: 100% !important; */
		width: unset !important;
		min-width: unset !important;
		max-width: unset !important;
	}

	/* > ALT 3 */
	/* > ______________________________________________________ */

	/* .alt3 .glass-component .oppdragstakere .row .dropdown-style.white p { */
	.alt3 .oppdragstakere .row {
		gap: 0;
	}
	.alt3 .dropdown-style {
		margin: 1rem;
	}
	.alt3 .leftside {
		flex-direction: column;
		align-items: flex-start;
	}
	.alt3 .glass-component .rightside p {
		flex: 4;
		color: rgba(0, 0, 0, 0.8);
		color: rgba(255, 255, 255, 0.8);
	}
	.alt3 .glass-component .rightside span {
		color: rgba(0, 0, 0, 0.8);
		color: var(--accent);
	}
	.alt3 h3 {
		color: rgba(255, 255, 255, 1.8) !important;
	}

	.alt3,
	.alt3 .glass-component .leftside p {
		/* color: rgba(0, 0, 0, 0.8); */
		color: rgba(255, 255, 255, 1.8) !important;
		font-weight: 500;
	}
	.alt3 .leftside p {
		font-size: large !important;
		font-weight: 400 !important;
	}
	.alt3 .leftside span {
		font-weight: 600;
	}
	.alt3 span {
		font-weight: 300;
	}
	.alt3 span.big {
		font-size: 25px;
		font-weight: 400;
		/* color: var(--accent-brightest);
		color: var(--accent-darkest); */
	}
	.alt3 span.thin {
		font-weight: 500;
		/* color: var(--accent-darkest); */
	}

	.big.dropdown-style.white {
		display: unset;
	}

	/* alt3
				color: rgba(0, 0, 0, 0.8);
	color: rgba(255, 255, 255, 0.8); */
</style>
