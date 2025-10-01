<svelte:options runes />

<script lang="ts">
	// Add any imports or logic here if needed
	import '@src/app.css';
	import '@stories/forms/form.css';
	import '@src/color_scheme.css';
	import '@src/dark-mode.css';
	import '../home.css';
	import Button from '@stories/Button.svelte';
	import './landing-page-professionals.css';

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

	<section class="homepage-features">
		<div class="section-content">
			<h2>Hvem er Oppdragsmarkedet for?</h2>
			<br />

			<div class="oppdragsgivere row">
				<div class="image-card left"></div>

				<div class="column rightside">
					<div class="content">
						<h3>Oppdragsgivere</h3>
						<p class="rightside">
							Oppdragsmarkdet er lagt opp for at hvem som helst kan legge ut oppdrag. <br />
							Vi tar i mot alle slags yrkesfags-prosjekter til enhver prisklasser og fra hvem som helst;<br
							/>
							Alt fra private hjemmeprosjekter til større selskapsprosjekter, til og med statlig.
						</p>
					</div>
					<div class="floating-1">
						<div class="dropdown-style black">
							<ul>
								<li>Er du en privatperson som vil pusse opp badet?</li>
								<li>Er du en bedrift som planlegger å erstatte fryseanlegget?</li>
								<li>Er du et friluftslivlag som trenger fler frivillige til dugnaden?</li>
								<li>Er du en statlig organisasjon med et skadedyrsproblem?</li>

								Svaret er det samme, så lengre du har et prosjekt, så vil vi ha deg!
							</ul>
						</div>
					</div>
				</div>
				<br />
			</div>
			<br />

			<!-- TODO: finn bilde av en gruppe fagfolk "strong blue collars, stand united, look at our workforce" type of shit.  -->
			<div></div>
			<div class="oppdragstakere">
				<div class="title">
					<h3>Oppdragstakere</h3>
				</div>

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
							med en profesjonell fagarbeider. Så vårt mål er å skape
							<br />
							<br />
							<span class="big">
								"En plattform hvor brukeren kan være <span class="thin">trygg</span> på at alle bud
								kommer fra <span class="thin">dyktige fagfolk</span>, som leverer et
								<span class="thin">godt resultat</span>."
							</span>

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
							Over <span>60%</span> av bemanningen på oppdragsmarkedet kommer selv fra yrkesfaget,
							så
							<span class="big wrap-around"> vi vet. </span>
							<br />
							<br />
							Vi vet hvor frustrerende det kan være å måtte jobbe med klienter som på grunn av være å
							måtte jobbe med klienter som på grunn av tidligere erfaring med useriøse aktører ikke
							<span> verdsetter hardt arbeid.</span>
						</p>
					</div>
				</div>
				<br />
				<div class="image-card right">
					<div class="floating-2">
						<div class="dropdown-style black">
							<div class="under-text">
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
				</div>
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
</style>
