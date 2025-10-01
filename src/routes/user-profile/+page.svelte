<svelte:options runes />

<script lang="ts">
	import { Fa } from 'svelte-fa';
	import {
		faEnvelope,
		faPhone,
		faMapMarkerAlt,
		faCalendarAlt,
		faUserCircle,
		faEdit,
		faStar,
		faCog,
		faSignOutAlt,
		faBookmark,
		faTrash
	} from '@fortawesome/free-solid-svg-icons';
	import { faLinkedinIn, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
	import Button from '@stories/Button.svelte';
	import Tags from '@stories/forms/Tags.svelte';
	import '@src/app.css';
	import '@stories/button.css';
	import '@stories/forms/form.css';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import '@stories/theme.css';
	const { data } = $props();

	const ownedProjects = data.ownedProjects;
	const vendoredProjects = data.vendoredProjects;
	const favoriteProjects = data.favoriteProjects;

	const user = data.user;
	const userProfile = data.userProfile ?? {};
	const vendorProfile = data.vendorProfile ?? {};
	const employeeProfile = data.employeeProfile ?? {};

	const isVendor = user?.userType === 'vendor';
	const isEmployee = user?.userType === 'employee';

	const profile = {
		...userProfile,
		...(user ?? {}),
		...(isVendor ? vendorProfile : {}),
		...(isEmployee ? employeeProfile : {})
	};

	// console.log('profile: ', profile);

	const ratingStars = getRatingStars((profile as any).clientReviewsRating ?? 0.0);

	let activeTab = $state('profile');
	let availableTabs = [
		{ id: 'profile', name: 'Profil' },
		{ id: 'projects', name: 'Prosjekter' },
		{ id: 'saved', name: 'Favoritter' },
		{ id: 'settings', name: 'Innstillinger' }
	];

	function getRatingStars(rating: number) {
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 >= 0.5;
		const stars = [];
		for (let i = 0; i < 5; i++) {
			if (i < fullStars) {
				stars.push('full');
			} else if (i === fullStars && hasHalfStar) {
				stars.push('half');
			} else {
				stars.push('empty');
			}
		}
		return stars;
	}
	function handleTabChange(event: { detail: string }) {
		activeTab = event.detail;
	}
	function handleEditProfile() {}
	function handleLogout() {}
	function saveChanges() {}
	function SavePassword() {}
	function SavePreferences() {}

	function getProgression(state: string | null) {
		switch (state) {
			case 'draft':
				return 1;
			case 'posted':
				return 2;
			case 'in_progress':
				return 3;
			case 'completed':
				return 4;
			case 'cancelled':
				return null;
		}
	}
</script>

<!--* New profile -->

<div class="profile-page-container">
	<!-- Profile Header Section -->
	<div class="profile-header">
		<div class="profile-header-content">
			<div class="profile-avatar">
				{#if profile.image}
					<img src={profile.image} alt={profile.name || 'User'} />
				{:else}
					<div class="avatar-placeholder">
						<Fa icon={faUserCircle} size="12x" />
					</div>
				{/if}
			</div>

			<div class="profile-info">
				<h1>{profile.firstName} {profile.lastName}</h1>
				<div class="username">@{profile.username}</div>
				<div class="user-type-tags">
					{#if Array.isArray(profile.userType)}
						{#each profile.userType as type}
							<span class="tag">{type}</span>
						{/each}
					{:else}
						<span class="tag">{profile.userType}</span>
					{/if}
				</div>

				<div class="rating-container">
					<div class="stars">
						{#each ratingStars as star}
							<span class="star {star}">
								<Fa icon={faStar} />
							</span>
						{/each}
					</div>
					<span class="rating-text"
						>{profile.clientReviewsRating} ({profile.clientReviewsCount} anmeldelser)</span
					>
				</div>

				<Button rounded size="small" label="Rediger Profil" onclick={handleEditProfile} hollow />
			</div>

			<div class="profile-actions">
				<button class="action-button" onclick={handleLogout}>
					<Fa icon={faSignOutAlt} />
					<span>Logg ut</span>
				</button>
			</div>
		</div>
	</div>

	<!-- Tabs Navigation -->
	<div class="profile-tabs">
		<div class="tabs-container">
			<div class="tabs-header">
				{#each availableTabs as tab}
					<button class:active={activeTab === tab.id} onclick={() => (activeTab = tab.id)}>
						{tab.name}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Tab Content -->
	<div class="tab-content">
		{#if activeTab === 'profile'}
			<div class="profile-content">
				{#if isVendor}
					<div class="profile-section">
						<h2>Beskrivelse</h2>
						<!-- <p>{profile.bio}</p> -->
					</div>
				{/if}
				<div class="profile-section">
					<h2>Kontakt Informasjon</h2>
					<div class="contact-info">
						<div class="contact-item">
							<Fa icon={faEnvelope} />
							<span>{profile.email}</span>
						</div>
						<div class="contact-item">
							<Fa icon={faPhone} />
							<span>{profile.phone}</span>
						</div>
						<div class="contact-item">
							<Fa icon={faMapMarkerAlt} />
							<span>{profile.location}</span>
						</div>
						<div class="contact-item">
							<Fa icon={faCalendarAlt} />
							<span
								>Medlem siden {profile.dateJoined
									? new Date(profile.dateJoined).toLocaleDateString()
									: 'Ukjent dato'}</span
							>
						</div>
					</div>
				</div>
				<!-- SOCIAL MEDIA -->
				{#if isVendor}
					<div class="profile-section">
						<h2>Ferdigheter og spesialiseringer</h2>
						<div class="skills-container">
							{#if Array.isArray(profile.fieldsOfWork)}
								{#each profile.fieldsOfWork as skill}
									<div class="skill-tag">{skill}</div>
								{/each}
							{:else}
								<span>Ingen ferdigheter registrert</span>
							{/if}
						</div>
					</div>

					<div class="profile-section">
						<h2>Sosiale Media</h2>
						<div class="social-links">
							{#if profile.linkedin}
								<a href={profile.linkedin} target="_blank" class="social-link">
									<Fa icon={faLinkedinIn} />
								</a>
							{/if}
							{#if profile.facebook}
								<a href={profile.facebook} target="_blank" class="social-link">
									<Fa icon={faFacebookF} />
								</a>
							{/if}
							{#if profile.instagram}
								<a href={profile.instagram} target="_blank" class="social-link">
									<Fa icon={faInstagram} />
								</a>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		{:else if activeTab === 'projects'}
			<div class="projects-content">
				<div class="projects-section">
					<h2>Som Oppdragsgiver</h2>
					<h3>Pågående oppdrag</h3>
					<!-- ownedProjects -->
					{#if ownedProjects.activeProjects?.length > 0}
						<div class="projects-list">
							{#each ownedProjects.activeProjects as project}
								<a class="project-card" href={project?.id ? `/project/${project.id}` : '#'}>
									<!-- <div class="project-card"> -->
									<h3>{project.title}</h3>
									<div class="project-details">
										<span
											class="tag {project.state
												? project.state.toLowerCase().replace(' ', '-')
												: ''}"
										>
											{project.state}
										</span>

										<!--TODO [ ]: MAKE PROGRESS BAR -->
										<!-- <div class="progress-bar-container">
											{#if project.state && getProgression(project.state) !== null}
												{@const progressValue = getProgression(project.state) || 0}
												<div class="progress-bar">
													{#each Array(4) as _, i}
														<div class="progress-step {i < progressValue ? 'completed' : ''}">
															<div class="step-circle"></div>
															{#if i < 3}
																<div
																	class="step-line {i < progressValue - 1 ? 'completed' : ''}"
																></div>
															{/if}
														</div>
													{/each}
												</div>
												<div class="progress-labels">
													<span>Utkast</span>
													<span>Publisert</span>
													<span>Pågående</span>
													<span>Fullført</span>
												</div>
											{:else}
												<div class="progress-cancelled">Kansellert</div>
											{/if}
										</div> -->
										<span class="project-client">Kunde: {project.clientId}</span>
										<span class="project-client">prosjektID: {project.id}</span>
										<span class="project-due">Frist: {project.dueDate}</span>
										<span class="project-due">started: {project.startDate}</span>
										<span class="project-due">posted: {project.postDate}</span>
									</div>
									<!-- </div> -->
								</a>
							{/each}
						</div>
					{:else}
						<p class="empty-state">Ingen aktive prosjekter</p>
					{/if}
				</div>

				<div class="projects-section">
					<h3>Fullførte oppdrag</h3>
					{#if ownedProjects.closedProjects?.length > 0}
						<div class="projects-list">
							{#each ownedProjects.closedProjects as project}
								<div class="project-card">
									<h3>{project.title}</h3>
									<div class="project-details">
										<span class="project-date">Fullført: {project.finishDate}</span>
										<span class="project-client">Kunde: {project.clientId}</span>
										<div class="project-rating">
											<Fa icon={faStar} />
											<span>{project.vendorRating}</span>
										</div>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<p class="empty-state">Ingen fullførte prosjekter</p>
					{/if}
				</div>
				<div class="divider-line"></div>
				<div class="projects-section">
					<h2>Som Oppdragstaker</h2>
					<h3>Pågående oppdrag</h3>
					{#if vendoredProjects.activeProjects?.length > 0}
						<div class="projects-list">
							{#each vendoredProjects.activeProjects as project}
								<a class="project-card" href={project?.id ? `/project/${project.id}` : '#'}>
									<h3>{project.title}</h3>
									<div class="project-details">
										<span
											class="tag {project.state
												? project.state.toLowerCase().replace(' ', '-')
												: ''}"
										>
											{project.state}
										</span>

										<!-- <div class="progress-bar-container">
											{#if project.state && getProgression(project.state) !== null}
												{@const progressValue = getProgression(project.state) || 0}
												<div class="progress-bar">
													{#each Array(4) as _, i}
														<div class="progress-step {i < progressValue ? 'completed' : ''}">
															<div class="step-circle"></div>
															{#if i < 3}
																<div
																	class="step-line {i < progressValue - 1 ? 'completed' : ''}"
																></div>
															{/if}
														</div>
													{/each}
												</div>
												<div class="progress-labels">
													<span>Utkast</span>
													<span>Publisert</span>
													<span>Pågående</span>
													<span>Fullført</span>
												</div>
											{:else}
												<div class="progress-cancelled">Kansellert</div>
											{/if}
										</div> -->
										<span class="project-client">Oppdragsgiver: {project.clientId}</span>
										<span class="project-client">prosjektID: {project.id}</span>
										<span class="project-due">Frist: {project.dueDate}</span>
										<span class="project-due">Frist: {project.dueDate}</span>
										<span class="project-due">started: {project.startDate}</span>
										<span class="project-due">posted: {project.postDate}</span>
									</div>
								</a>
							{/each}
						</div>
					{:else}
						<p class="empty-state">Ingen aktive oppdrag</p>
					{/if}
				</div>

				<div class="projects-section">
					<h3>Fullførte Oppdrag</h3>
					{#if vendoredProjects.closedProjects?.length > 0}
						<div class="projects-list">
							{#each vendoredProjects.closedProjects as project}
								<div class="project-card">
									<h3>{project.title}</h3>
									<div class="project-details">
										<span class="project-date">Fullført: {project.finishDate}</span>
										<span class="project-client">Oppdragsgiver: {project.clientId}</span>
										<div class="project-rating">
											<Fa icon={faStar} />
											<span>{project.clientRating}</span>
										</div>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<p class="empty-state">Ingen fullførte oppdrag</p>
					{/if}
				</div>
			</div>
		{:else if activeTab === 'saved'}
			<div class="saved-content">
				<div class="header-row">
					<h2>Favoritter</h2>
					<span class="empty-state">- Dine lagrede prosjekter</span>
				</div>
				{#if favoriteProjects?.favoriteProjects?.length > 0}
					<div class="saved-projects-list">
						{#each favoriteProjects.favoriteProjects as savedProject}
							<a
								class="saved-project-card"
								href={savedProject.project?.id ? `/project/${savedProject.project.id}` : '#'}
							>
								<div class="saved-project-info">
									{#if savedProject.project}
										<div class="h-row">
											<div class="corner">
												<div class="saved-project-icon">
													<Fa icon={faBookmark} />
												</div>
												<h3>{savedProject.project.title}</h3>
											</div>
											<div class="corner">
												<!-- {#if savedProject.project.isActive === false}
													<h3 class="warning">Ikke lenger aktiv</h3>
												{/if} -->
												<div class="delete-favorite-icon">
													<Fa icon={faTrash}></Fa>
												</div>
												<!-- <Button onclick={''} icon="faTrash"></Button> -->
											</div>
										</div>
										<span>
											{savedProject.dateSaved
												? new Date(savedProject.dateSaved).toLocaleDateString()
												: 'Dato ikke tilgjengelig'}
										</span>
										<div class="saved-project-details">
											<span
												>{savedProject.project.postDate &&
													new Date(savedProject.project.postDate).toLocaleDateString()}</span
											>
											<span>{savedProject.project.location || 'Ingen plassering'}</span>

											<span>
												{savedProject.project.state}
											</span>
										</div>
										<div class="corner right-side">
											{#if savedProject.project.isActive === false}
												<h3 class="warning">Ikke lenger aktiv</h3>
											{/if}
										</div>
									{:else}
										<h3>Prosjekt ikke funnet</h3>
										<span
											>{savedProject.dateSaved
												? new Date(savedProject.dateSaved).toLocaleDateString()
												: 'Dato ikke tilgjengelig'}</span
										>
										<div class="saved-project-details">
											<span>Prosjekt ID: {savedProject.projectId}</span>
										</div>
									{/if}
								</div>
							</a>
						{/each}
					</div>
				{:else}
					<p class="empty-state">Ingen lagrede prosjekter</p>
				{/if}
			</div>
		{:else if activeTab === 'settings'}
			<div class="settings-content">
				<h2>Kontoinnstillinger</h2>

				<div class="settings-section">
					<h3>Profilinformasjon</h3>
					<div class="settings-form">
						<div class="form-row">
							<div class="form-group">
								<label for="username">Brukernavn</label>
								<input type="text" id="username" class="field" value={profile.username} />
							</div>
							<div class="form-group">
								<label for="email">E-post</label>
								<input type="email" id="email" class="field" value={profile.email} />
							</div>
						</div>
						<div class="form-row">
							<div class="form-group">
								<label for="firstName">Fornavn</label>
								<input type="text" id="firstName" class="field" value={profile.firstName} />
							</div>
							<div class="form-group">
								<label for="lastName">Etternavn</label>
								<input type="text" id="lastName" class="field" value={profile.lastName} />
							</div>
						</div>

						<div class="form-row">
							<div class="form-group">
								<label for="phone">Telefon</label>
								<input type="tel" id="phone" class="field" value={profile.phone} />
							</div>
							<div class="form-group">
								<label for="location">Sted</label>
								<input type="text" id="location" class="field" value={profile.location} />
							</div>
						</div>

						<div class="form-group">
							<label for="bio">Biografi</label>
							<!-- <textarea id="bio" class="field" rows="4">{profile.bio}</textarea> -->
						</div>

						<div class="form-actions">
							<Button
								rounded
								size="medium"
								label="Lagre Endringer"
								style="secondary"
								onclick={saveChanges}
							/>
						</div>
					</div>
				</div>

				<div class="settings-section">
					<h3>Passord</h3>
					<div class="settings-form">
						<div class="form-group">
							<label for="currentPassword">Nåværende Passord</label>
							<input type="password" id="currentPassword" class="field" />
						</div>

						<div class="form-row">
							<div class="form-group">
								<label for="newPassword">Nytt Passord</label>
								<input type="password" id="newPassword" class="field" />
							</div>
							<div class="form-group">
								<label for="confirmPassword">Bekreft Passord</label>
								<input type="password" id="confirmPassword" class="field" />
							</div>
						</div>

						<div class="form-actions">
							<Button
								rounded
								size="medium"
								label="Oppdater Passord"
								style="secondary"
								onclick={SavePassword}
							/>
						</div>
					</div>
				</div>

				<div class="settings-section">
					<h3>Varslingsinnstillinger</h3>
					<div class="settings-form">
						<div class="checkbox-option">
							<input type="checkbox" id="emailNotifications" checked />
							<label for="emailNotifications">E-postvarsling</label>
						</div>
						<div class="checkbox-option">
							<input type="checkbox" id="projectUpdates" checked />
							<label for="projectUpdates">Prosjektoppdateringer</label>
						</div>
						<div class="checkbox-option">
							<input type="checkbox" id="marketingEmails" />
							<label for="marketingEmails">Markedsføringse-post</label>
						</div>

						<div class="form-actions">
							<Button
								rounded
								size="medium"
								label="Lagre Innstillinger"
								style="secondary"
								onclick={SavePreferences}
							/>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
	<div class="debug-container">
		<details class="mt-4" id="debug-information">
			<summary class="cursor-pointer font-semibold">Debug Data</summary>
			<div class="mt-2 rounded bg-gray-100 p-2">
				<h4 class="font-semibold">User Profile Data:</h4>
				<pre class="overflow-auto text-xs">{JSON.stringify(data.userProfile, null, 2)}</pre>

				<h4 class="mt-2 font-semibold">User Data:</h4>
				<pre class="overflow-auto text-xs">{JSON.stringify(data.user, null, 2)}</pre>
			</div>
		</details>
	</div>
</div>

<style>
	.tab-content h2 {
		margin-top: 0;
		margin-bottom: 1rem;
		color: var(--primary);
		font-size: 1.25rem;
		color: inherit;
	}
	.tab-content .header-row {
		display: flex;
		/* align-items: baseline; */
		gap: 0.5rem;
	}

	.tab-content .header-row span {
		padding: 0;
	}

	.debug-container {
		padding: 1rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		margin: 1rem;
	}

	/* Main container */
	.profile-page-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem;
	}

	/* Profile header styles */
	.profile-header {
		background-color: var(--secondary-bg);
		border-radius: 0.5rem;
		box-shadow:
			0 1px 6px var(--shadow-bright),
			0 1px 1px var(--shadow);
		margin-bottom: 2rem;
		overflow: hidden;
	}

	.profile-header-content {
		display: flex;
		padding: 2rem;
		position: relative;
	}

	.profile-avatar {
		width: 150px;
		height: 150px;
		overflow: hidden;
		border-radius: 50%;
		margin-right: 2rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	}

	.profile-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--secondary-very-translucent);
		color: var(--secondary);
	}

	.profile-info {
		flex: 1;
	}

	.profile-info h1 {
		margin: 0;
		margin-bottom: 0.25rem;
		color: var(--primary);
		font-size: 1.75rem;
	}

	.username {
		color: var(--secondary);
		font-size: 1rem;
		margin-bottom: 1rem;
	}

	.user-type-tags {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.user-type-tags .tag {
		padding: 0.25rem 0.75rem;
		background-color: var(--accent-very-translucent);
		color: var(--accent-dark);
		border-radius: 999px;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.rating-container {
		display: flex;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.stars {
		display: flex;
		margin-right: 0.5rem;
		color: var(--accent);
	}

	.star {
		margin-right: 2px;
	}

	.star.empty {
		opacity: 0.3;
	}

	.rating-text {
		color: var(--secondary);
		font-size: 0.875rem;
	}

	.profile-actions {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}

	.action-button {
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--secondary);
		padding: 0.5rem;
		border-radius: 0.25rem;
		transition: all 0.2s ease;
	}

	.action-button:hover {
		color: var(--accent-medium);
		background-color: var(--accent-very-translucent);
	}

	/* Tabs navigation */
	.profile-tabs {
		margin-bottom: 2rem;
	}

	.tabs-container {
		border: none;
	}

	.tabs-header {
		display: flex;
		border-bottom: 1px solid var(--shadow-brighter);
		background: none;
	}

	.tabs-header button {
		flex: 1;
		padding: 0.8rem;
		border: none;
		background: none;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s ease;
		color: var(--secondary);
		border-top-right-radius: 0.5rem;
		border-top-left-radius: 0.5rem;
		max-width: 150px;
	}

	.tabs-header button.active {
		background-color: var(--accent-very-translucent);
		color: var(--accent-dark);
		border-bottom: 2px solid var(--accent);
	}

	/* Tab content styles */
	.tab-content {
		background-color: var(--secondary-bg);
		border-radius: 0.5rem;
		box-shadow:
			0 1px 6px var(--shadow-bright),
			0 1px 1px var(--shadow);
		padding: 2rem;
	}

	/* Profile section styles */
	.profile-section {
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--shadow-brighter);
	}

	.profile-section:last-child {
		margin-bottom: 0;
		padding-bottom: 0;
		border-bottom: none;
	}

	/* .profile-section h2 {
		margin-top: 0;
		margin-bottom: 1rem;
		color: var(--primary);
		font-size: 1.25rem;
	} */

	.contact-info {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: var(--secondary);
	}

	.skills-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.skill-tag {
		padding: 0.5rem 1rem;
		background-color: var(--accent-very-translucent);
		color: var(--accent-dark);
		border-radius: 999px;
		font-size: 0.875rem;
	}

	.social-links {
		display: flex;
		gap: 1rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background-color: var(--accent-very-translucent);
		color: var(--accent-dark);
		border-radius: 50%;
		transition: all 0.2s ease;
	}

	.social-link:hover {
		background-color: var(--accent-translucent);
		color: var(--accent-darker);
	}

	/* Projects styling */
	.projects-section {
		margin-bottom: 2rem;
	}

	/* .projects-section h2 {
		margin-top: 0;
		margin-bottom: 1rem;
		color: var(--primary);
		font-size: 1.25rem;
	} */
	.divider-line {
		margin-bottom: 1rem;
		width: 100%;
		border-bottom-width: 1px;
		border-bottom-color: var(--shadow-brighter);
	}
	.projects-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
	}

	.project-card {
		background-color: var(--primary-bg);
		border-radius: 0.5rem;
		padding: 1.25rem;
		box-shadow: 0 1px 3px var(--shadow-bright);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.project-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px var(--shadow);
	}

	.project-card h3 {
		margin-top: 0;
		margin-bottom: 0.75rem;
		color: var(--primary);
		font-size: 1.125rem;
	}

	.project-details {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		color: var(--secondary);
		font-size: 0.875rem;
	}

	.project-rating {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		color: var(--accent);
	}

	.status {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.status.in-progress {
		background-color: rgba(25, 118, 210, 0.1);
		color: #1976d2;
	}

	.status.completed {
		background-color: rgba(76, 175, 80, 0.1);
		color: #4caf50;
	}

	/* Saved projects styling */
	.saved-projects-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
	}

	.saved-project-card {
		background-color: var(--primary-bg);
		border-radius: 0.5rem;
		padding: 1.25rem;
		box-shadow: 0 1px 3px var(--shadow-bright);
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.saved-project-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px var(--shadow);
	}

	.saved-project-icon {
		color: var(--accent);
		/* margin-top: 0.25rem; */
		/* margin-top: 1.25rem; */
		/* padding-top: 0.25rem; */
	}

	.saved-project-info {
		flex: 1;
	}
	.saved-project-info .h-row {
		padding: 0.5rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.saved-project_info .corner {
		display: flex;
		flex-direction: row;
		/* justify-content: space-between; */
		align-items: baseline;
		column-gap: 1rem;
	}
	.saved-project-info .corner.right-side {
		/* background-color: ; */
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: baseline;
		column-gap: 1rem;
		justify-content: flex-end;
	}

	.saved-project-info .warning {
		font-size: small;
		color: var(--negative-accent-dark);
		margin: 0;
		padding: 0;
		line-height: 0;
	}
	.saved-project-info .delete-favorite-icon {
		color: var(--secondary-very-translucent);
	}
	.saved-project-info .delete-favorite-icon:hover {
		color: var(--secondary);
	}
	.saved-project-info h3 {
		/* line-height: 0; */
		margin-top: 0;
		/* margin-bottom: 0.5rem; */
		color: var(--primary);
		font-size: 1.125rem;
	}

	.saved-project-details {
		display: flex;
		gap: 1rem;
		color: var(--secondary);
		font-size: 0.875rem;
	}

	/* Settings styling */
	.settings-section {
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--shadow-brighter);
	}

	.settings-section:last-child {
		margin-bottom: 0;
		padding-bottom: 0;
		border-bottom: none;
	}

	.settings-section h3 {
		margin-top: 0;
		margin-bottom: 1.5rem;
		color: var(--primary);
		font-size: 1.125rem;
		font-weight: 600;
	}

	.settings-form {
		max-width: 800px;
	}

	.form-row {
		display: flex;
		gap: 1.5rem;
		margin-bottom: 1rem;
	}

	.form-group {
		flex: 1;
		margin-bottom: 1.25rem;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		color: var(--secondary);
		font-size: 0.875rem;
	}

	.form-actions {
		margin-top: 1.5rem;
	}

	.checkbox-option {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.checkbox-option label {
		color: var(--secondary);
	}

	.empty-state {
		color: var(--secondary);
		font-style: italic;
		padding: 1rem 0;
	}

	/* Responsive styles */
	@media (max-width: 768px) {
		.profile-header-content {
			flex-direction: column;
			align-items: center;
			text-align: center;
			padding: 1.5rem;
		}

		.profile-avatar {
			margin-right: 0;
			margin-bottom: 1.5rem;
		}

		.profile-actions {
			position: relative;
			top: auto;
			right: auto;
			margin-top: 1.5rem;
		}

		.form-row {
			flex-direction: column;
			gap: 0;
		}

		.tabs-header {
			overflow-x: auto;
		}

		.tabs-header button {
			white-space: nowrap;
			min-width: 100px;
		}

		.contact-info {
			grid-template-columns: 1fr;
		}

		.tab-content {
			padding: 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.projects-list,
		.saved-projects-list {
			grid-template-columns: 1fr;
		}
	}

	/* Dark mode adjustments would be automatically handled by your dark-mode.css */

	/* Progress Bar Styles */
	.progress-bar-container {
		margin: 10px 0;
		width: 100%;
	}

	.progress-bar {
		display: flex;
		align-items: center;
		position: relative;
		width: 100%;
		margin-bottom: 5px;
	}

	.progress-step {
		display: flex;
		align-items: center;
		flex: 1;
		position: relative;
	}

	.step-circle {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: var(--secondary-very-translucent);
		border: 2px solid var(--secondary-very-translucent);
		z-index: 2;
	}

	.progress-step.completed .step-circle {
		background-color: var(--accent);
		border-color: var(--accent);
	}

	.step-line {
		flex: 1;
		height: 3px;
		background-color: var(--secondary-very-translucent);
	}

	.step-line.completed {
		background-color: var(--accent);
	}

	.progress-labels {
		display: flex;
		justify-content: space-between;
		width: 100%;
		font-size: 0.7rem;
		color: var(--secondary);
	}

	.progress-labels span {
		flex: 1;
		text-align: center;
	}

	.progress-cancelled {
		width: 100%;
		text-align: center;
		padding: 5px;
		background-color: var(--negative-accent-very-translucent);
		color: var(--negative-accent-dark);
		border-radius: 4px;
		font-size: 0.8rem;
		font-weight: 500;
	}

	@media (max-width: 480px) {
		.progress-labels {
			font-size: 0.6rem;
		}

		.progress-labels span {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>
