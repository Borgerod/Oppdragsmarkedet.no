<script lang="ts">
	import './Footer.css';
	import './forms/form.css';
	import Button from './Button.svelte';
	// Import our new DarkModeToggle component
	import DarkModeToggle from './DarkModeToggle.svelte';

	let locale = $state('en');

	import { Fa } from 'svelte-fa';
	import { faEarthAmerica, faEnvelope, faPhoneSquare } from '@fortawesome/free-solid-svg-icons';
	import {
		faGithub,
		faFacebook,
		faInstagram,
		faLinkedin,
		faTiktok,
		faLinkedinIn,
		faFacebookF
	} from '@fortawesome/free-brands-svg-icons';

	const languages = ['en', 'no'];

	function handleSubscribe() {
		// > PLAVEHODLER
		// todo [] make this
	}
</script>

<footer class="footer">
	<div class="row">
		<div class="col">
			<h3>USEFUL LINKS</h3>
			<div class="url-list">
				<a href="https://oppdragsmarkedet.no/about"> About </a>
				<a href="https://oppdragsmarkedet.no/Services"> Services </a>
				<a href="https://oppdragsmarkedet.no/partners"> Partners </a>
				<a href="https://oppdragsmarkedet.no/contant"> Contact </a>
				<a href="https://oppdragsmarkedet.no/blog"> Blog </a>
			</div>
		</div>
		<div class="col newsletter-col">
			<h3>NEWSLETTER</h3>
			<form class="newsletter-form">
				<input type="text" placeholder="Your Email Address" required class="field" />
				<br />
				todo: pick one
				<Button
					rounded
					size="large"
					label="SUBSCRIBE"
					type="submit"
					onclick={handleSubscribe}
					osl
					hollow
				/>

				<Button
					rounded
					size="large"
					label="SUBSCRIBE"
					type="submit"
					onclick={handleSubscribe}
					dark_bg
				/>
			</form>
		</div>
		<div class="col">
			<h3>CONTACT</h3>
			<p>123, XYV Road, BSK 3 <br /> Bangalore, karantaka, IN</p>

			<div class="social-icons">
				<a class="social-button" href="/stonks"><Fa icon={faFacebookF} /></a>
				<a class="social-button" href="/stonks"><Fa icon={faLinkedinIn} /></a>
				<a class="social-button" href="/stonks"><Fa icon={faInstagram} /></a>
				<a class="social-button" href="/stonks"><Fa icon={faTiktok} /></a>
				<a class="social-button" href="/stonks"><Fa icon={faEnvelope} /></a>
				<a class="social-button" href="/stonks"><Fa icon={faPhoneSquare} /></a>
			</div>
		</div>
	</div>

	<div class="language-dark-mode-container">
		<div class="relative inline-block w-30">
			<select
				class="language-select appearance-none rounded border border-gray-300 pr-10 focus:outline-none"
			>
				{#each languages as lang}
					<option class="options" value={lang}>{lang}</option>
				{/each}
			</select>

			<!-- Custom icon -->
			<div class="pointer-events-none absolute inset-y-0 right-3 flex items-center">
				<Fa icon={faEarthAmerica} class="icon" />
			</div>
		</div>
		<!-- Replace the old button with our new component -->
		<DarkModeToggle />
	</div>
</footer>

<style>
	.options {
		color: var(--primary);
	}

	/* Add hover effect for select options */
	option:hover,
	select option:hover,
	select option:focus,
	select option:active {
		background-color: var(--accent-bright) !important;
		color: white !important;
	}

	/* Fix for some browsers that don't support :hover on options */
	select:focus option:checked {
		background-color: var(--accent-bright) !important;
		color: white !important;
	}

	.language-select {
		color: var(--white);
		padding-right: 45px;
		padding-left: 10px;
	}

	.language-dark-mode-container {
		padding: 0 !important;
		position: absolute;
		bottom: 0;
		right: 1rem;
		display: flex;
		flex-direction: row;
		color: var(--secondary-bg);
	}

	/* Add hover effect for the icon in the select dropdown */
	.pointer-events-none {
		transition: color 0.2s ease;
	}

	.relative:hover .pointer-events-none {
		color: var(--accent-bright);
	}

	p {
		color: var(--primary-bg);
		font-size: small;
	}
	a {
		font-size: small;
	}

	footer h3 {
		color: var(--secondary-bg);
		font-size: 1rem;
		justify-content: space-around;
		padding: 2vw 0;
		/* margin-top: 10px; */
	}

	footer div {
		/* padding: 1rem; */
		text-align: center;
	}
	.language-dark-mode-container div {
		padding: 1rem;
	}

	footer .row {
		display: flex;
		flex-direction: row;
		column-gap: 2rem;
		width: 100%;
		justify-content: space-between;
	}

	.col {
		flex: 1;
		width: 25%;
		max-width: 300px;
		min-width: 180px;
		padding: 0 15px;
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 1rem;
	}
	.newsletter-col {
		flex: 2;
		width: 50%;
		max-width: 600px;
	}

	.newsletter-form {
		width: 100%;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		footer .row {
			flex-direction: column;
			align-items: center;
		}

		.col,
		.newsletter-col {
			width: 100%;
			max-width: 100%;
			margin-bottom: 2rem;
		}

		.newsletter-form {
			max-width: 80%;
		}
	}

	.icon-container {
		font-size: 0.7rem;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 0.9rem;
		width: 0.9rem;
		background: #efefef;
		color: var(--third-bg);
		border-radius: 2px;
	}
	footer {
		padding: 2rem 3rem 1rem 3rem;
		width: 100%;
		margin-top: auto; /* This helps push the footer to the bottom */
		justify-content: space-around;
		justify-content: space-evenly;
		background: var(--third-bg);
		color: #efefef;
		display: flex;
		position: relative; /* Add this to make absolute positioning work correctly */
	}

	@media (max-width: 768px) {
		.footer {
			flex-direction: column;
		}
	}

	.footer div h3 {
		font-weight: 300;
		letter-spacing: 1px;
	}

	.col a {
		/* padding: 0.25rem; */
		height: 20px;
		width: 20px;
		display: block;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 0.25rem;
		text-decoration: none;
		color: var(--secondary-bg);
		margin-bottom: 10px;
	}
	.social-icons a:hover {
		color: var(--third-bg);
		background-color: var(--accent-bright);
	}

	.url-list a:hover {
		color: var(--accent-bright);
		/* background-color: var(--accent-bright); */
	}

	form input {
		margin-bottom: 2vw;
		text-align: center;
		border: none;
		font-size: small;
		background-color: var(--secondary-bg);
		color: var(--secondary);
	}

	form button {
		border-radius: 0.5rem;
		padding: 1vw 2vw;
		background-color: transparent;
		border: 1vw;
		outline: var(--secondary-darker) solid 1px;
		outline: var(--primary-invert) solid 1px;
		color: var(--primary-invert);
		text-align: center;
		text-decoration: none;
		display: inline-block;
		cursor: pointer;
	}

	form button:hover {
		outline-color: var(--accent-medium);
		color: var(--accent-medium);
	}

	div.social-icons {
		/* padding-top: 1vw; */
		display: flex;
		justify-content: space-around;
		justify-content: center;
		column-gap: 1rem;
		align-items: center;
	}

	.language-select:hover {
		color: var(--accent-bright);
		border-color: var(--accent-bright);
	}
</style>
