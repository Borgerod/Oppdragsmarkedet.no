<svelte:options runes />

<script lang="ts">
	// Add any imports or logic here if needed
	import '@src/app.css';
	import '@stories/forms/form.css';
	import '@src/color_scheme.css';
	import '@src/dark-mode.css';
</script>

<article>
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
	article {
		padding-left: 5rem;
		padding-right: 5rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.homepage-hero {
		padding: 4rem 2rem 2rem 2rem;
		text-align: center;
		background: var(--primary-bg, #f8f8f8);
	}
	.homepage-hero h1 {
		font-size: 2.5rem;
		color: var(--primary, #2c3e50);
		margin-bottom: 1rem;
	}
	.homepage-hero p {
		font-size: 1.2rem;
		color: var(--secondary, #444);
		margin-bottom: 2rem;
	}
	.homepage-actions {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
	}
	.homepage-btn {
		background: var(--accent, #1882a8);
		color: #fff;
		padding: 0.75rem 2rem;
		border-radius: 2rem;
		text-decoration: none;
		font-weight: 600;
		transition: background 0.2s;
	}
	.homepage-btn.secondary {
		background: var(--secondary, #444);
	}
	.homepage-btn:hover {
		background: var(--accent-bright, #1ba9e1);
	}
	.homepage-features {
		padding: 3rem 2rem 2rem 2rem;
		text-align: center;
	}
	.homepage-features h2 {
		font-size: 2rem;
		color: var(--primary, #2c3e50);
		margin-bottom: 1rem;
	}
	.homepage-features ul {
		list-style: none;
		padding: 0;
		margin: 0 auto;
		max-width: 500px;
	}
	.homepage-features li {
		font-size: 1.1rem;
		margin-bottom: 0.75rem;
		color: var(--secondary, #444);
		text-align: left;
	}
	.homepage-about {
		padding: 2rem 2rem 4rem 2rem;
		text-align: center;
	}
	.homepage-about h2 {
		font-size: 2rem;
		color: var(--primary, #2c3e50);
		margin-bottom: 1rem;
	}
	.homepage-about p {
		font-size: 1.1rem;
		color: var(--secondary, #444);
	}
</style>
