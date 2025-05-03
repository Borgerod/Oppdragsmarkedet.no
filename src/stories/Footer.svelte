<script lang="ts">
	import './Footer.css';

	let locale = $state('en');

	import { Fa } from 'svelte-fa';
	import {
		faEarthAmerica,
		faEnvelope,
		faEnvelopeSquare,
		faLanguage,
		faMoon,
		faPhone,
		faPhoneSquare,
		faSun
	} from '@fortawesome/free-solid-svg-icons';
	import {
		faGithub,
		faFacebook,
		faSquareFacebook,
		faInstagram,
		faLinkedin,
		faTiktok,
		faInstagramSquare,
		faLinkedinIn,
		faFacebookF
	} from '@fortawesome/free-brands-svg-icons';
	// import Button from './Button.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {{name: string}} [user] The user object
	 * @property {() => void} [onLogin] The login event handler
	 * @property {() => void} [onLogout] The logout event handler
	 * @property {() => void} [onCreateAccount] The account creation event handler
	 * @property {boolean} [darkmode] The dark mode state
	 */

	let darkmode = $state(false);

	function handleDarkMode() {
		darkmode = !darkmode;
		if (darkmode) {
			document.body.classList.add('dark-mode');
		} else {
			document.body.classList.remove('dark-mode');
		}
	}
	const languages = ['en', 'no'];
</script>

<footer class="footer">
	<div class="col-1">
		<h3 class="footer">USEFUL LINKS</h3>
		<a href=""> About </a>
		<a href=""> Services </a>
		<a href=""> Contact </a>
		<a href=""> Shop </a>
		<a href=""> Blog </a>
	</div>
	<div class="col-2">
		<h3 class="footer">NEWSLETTER</h3>
		<form>
			<input type="text" placeholder="Your Email Address" required />
			<br />
			<button type="submit">SUBSCRIBE</button>
		</form>
	</div>
	<div class="col-3">
		<h3 class="footer">CONTACT</h3>
		<p>123, XYV Road, BSK 3 <br /> Bangalore, karantaka, IN</p>

		<div class="social-icons">
			<a class="social-button" href="/stonks"><Fa icon={faFacebookF} /></a>
			<a class="social-button" href="/stonks"><Fa icon={faLinkedinIn} /></a>
			<a class="social-button" href="/stonks"><Fa icon={faInstagram} /></a>
			<a class="social-button" href="/stonks"><Fa icon={faTiktok} /></a>
			<a class="social-button" href="/stonks"><Fa icon={faEnvelope} /></a>
			<a class="social-button" href="/stonks"><Fa icon={faPhone} /></a>
		</div>
	</div>

	<div class="language-dark-light-mode-buttons">
		<div class="relative inline-block w-30">
			<select
				class="language-select appearance-none rounded border border-gray-300 pr-10 focus:outline-none"
			>
				{#each languages as lang}
					<!-- <option class="options" style="color: var(--primary); background-color: var(--tertiary-bg);" value={lang}>{lang}</option> -->
					<option class="options" value={lang}>{lang}</option>
				{/each}
			</select>

			<!-- Custom icon -->
			<div class="pointer-events-none absolute inset-y-0 right-3 flex items-center">
				<Fa icon={faEarthAmerica} />
			</div>
		</div>
		<button type="button" onclick={handleDarkMode} aria-label="Toggle dark mode">
			{#if darkmode}
				<Fa icon={faSun} />
			{:else}
				<Fa icon={faMoon} />
			{/if}
		</button>
	</div>
</footer>

<style>
	.options {
		color: var(--primary);
	}

	.language-select {
		color: var(--white);
		padding-right: 45px;
		padding-left: 10px;
	}

	.language-dark-light-mode-buttons {
		padding: 0 !important;
		position: absolute;
		bottom: 0;
		right: 1rem;
		display: flex;
		flex-direction: row;
	}
	:global(body.dark-mode) button {
		color: white;
	}

	:global(body.dark-mode) footer {
		color: white;
		background-color: var(--accent-deep-shade);
	}
	:global(body) {
	}
	:global(body.dark-mode) {
		background-color: var(--primary);
		color: #bfc2c7;
	}
	p {
		color: var(--primary-bg);
		font-size: small;
	}
	a {
		font-size: small;
	}

	h3 {
		color: #bdada1;
		font-size: 1rem;
	}

	.footer div {
		padding: 1rem;
		text-align: center;
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
		color: var(--tertiary-bg);
		border-radius: 2px;
	}
	footer {
		width: 100%;
		margin-top: auto; /* This helps push the footer to the bottom */
	}

	.footer {
		margin-top: 10px;
		width: 100%;
		padding: 2vw 6vw;
		justify-content: space-around;
		background: #333;
		background: var(--tertiary-bg);
		color: #efefef;
		display: flex;
	}

	.footer div {
		text-align: center;
	}

	.footer div h3 {
		font-weight: 300;
		letter-spacing: 1px;
	}

	.col-1 a {
		display: block;
		text-decoration: none;
		color: #efefef;
		margin-bottom: 10px;
	}

	.col-1 a:hover {
		color: #ee4141;
	}

	.col-2 {
		flex-grow: 2;
		padding-bottom: 3vw;
		display: flex;
		flex-direction: column;
	}

	form input {
		margin-bottom: 2vw;
		width: 30vw;
		height: 4vw;
		border-radius: 4px;
		text-align: center;
		outline: none;
		border: none;
	}

	input {
		background-color: var(--secondary-bg);
		color: var(--secondary);
		/* color: var(--primary); */
		font-size: small;
	}

	form button {
		border-radius: 0.5rem;
		padding: 1vw 2vw;
		background-color: transparent;
		border: 1vw;
		/* outline: rgb(110, 106, 102) solid medium; */
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
		padding-top: 1vw;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
</style>
