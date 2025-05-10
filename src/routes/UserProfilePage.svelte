<svelte:options runes />

<script lang="ts">
	import { onMount } from 'svelte';
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
		faBookmark
	} from '@fortawesome/free-solid-svg-icons';
	import { faLinkedinIn, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
	import Button from '../stories/Button.svelte';
	import Tabs from '../stories/forms/Tabs.svelte';
	import '../app.css';
	import '../stories/button.css';
	import '../stories/forms/form.css';

	// User data model based on the schema found in the project
	let userData = $state({
		id: 'user123',
		username: 'johndoe',
		first_name: 'John',
		sur_name: 'Doe',
		birth_date: '1985-05-15',
		date_joined: '2023-01-10',
		email: 'john.doe@example.com',
		phone: '+47 123 45 678',
		location: 'Oslo, Norway',
		user_type: ['vendor'],
		field: ['asfaltering', 'betong'],
		bio: 'Professional contractor with 15 years of experience in construction projects.',
		profile_image: 'https://randomuser.me/api/portraits/men/44.jpg',
		rating: 4.8,
		reviews_count: 24,
		social: {
			linkedin: 'https://linkedin.com/in/johndoe',
			facebook: 'https://facebook.com/johndoe',
			instagram: 'https://instagram.com/johndoe'
		},
		savedProjects: [
			{
				id: 'proj1',
				title: 'Garage renovation',
				date: '2025-06-15',
				location: 'Bergen'
			},
			{
				id: 'proj2',
				title: 'Bathroom remodeling',
				date: '2025-07-22',
				location: 'Oslo'
			}
		],
		activeProjects: [
			{
				id: 'active1',
				title: 'Kitchen expansion',
				status: 'In progress',
				client: 'Erika Hansen',
				dueDate: '2025-08-30'
			}
		],
		completedProjects: [
			{
				id: 'comp1',
				title: 'Driveway paving',
				date: '2024-12-10',
				client: 'Lars Andersen',
				rating: 5
			},
			{
				id: 'comp2',
				title: 'Concrete foundation',
				date: '2024-11-05',
				client: 'Maria Olsen',
				rating: 4.5
			}
		]
	});

	// For the tabs component
	let activeTab = $state('profile');
	let availableTabs = [
		{ id: 'profile', name: 'Profile' },
		{ id: 'projects', name: 'Projects' },
		{ id: 'saved', name: 'Saved' },
		{ id: 'settings', name: 'Settings' }
	];

	// Fetch user data from API
	onMount(async () => {
		try {
			// This would be replaced with actual API call
			// const response = await fetch('/api/user/profile');
			// if (response.ok) {
			//   userData = await response.json();
			// }
			// For now, we're using the mock data defined above
		} catch (error) {
			console.error('Failed to fetch user data:', error);
		}
	});

	function handleTabChange(event: { detail: string }) {
		activeTab = event.detail;
	}
	function handleEditProfile() {
		// Handle edit profile action
		// TEMP placeholder
		// TODO [ ]: add functionality
		console.log('Edit profile clicked');
	}

	function handleLogout() {
		// TEMP placeholder
		// TODO [ ]: add functionality
		// Handle logout action
		console.log('Logout clicked');
	}

	function saveChanges() {
		// TEMP placeholder
		// TODO [ ]: add functionality
		// Handle save changes action
		console.log('Saving profile changes');
	}

	function SavePassword() {
		// TEMP placeholder
		// TODO [ ]: add functionality
		// Handle password action
		console.log('Saving Password');
	}

	function SavePreferences() {
		// TEMP placeholder
		// TODO [ ]: add functionality
		// Handle save preferences action
		console.log('Saving Preferences');
	}

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

	const ratingStars = getRatingStars(userData.rating);
</script>

<div class="profile-page-container">
	<!-- Profile Header Section -->
	<div class="profile-header">
		<div class="profile-header-content">
			<div class="profile-avatar">
				{#if userData.profile_image}
					<img src={userData.profile_image} alt="{userData.first_name} {userData.sur_name}" />
				{:else}
					<div class="avatar-placeholder">
						<Fa icon={faUserCircle} size="4x" />
					</div>
				{/if}
			</div>

			<div class="profile-info">
				<h1>{userData.first_name} {userData.sur_name}</h1>
				<div class="username">@{userData.username}</div>

				<div class="user-type-tags">
					{#each userData.user_type as type}
						<span class="tag">{type}</span>
					{/each}
				</div>

				<div class="rating-container">
					<div class="stars">
						{#each ratingStars as star}
							<span class="star {star}">
								<Fa icon={faStar} />
							</span>
						{/each}
					</div>
					<span class="rating-text">{userData.rating} ({userData.reviews_count} reviews)</span>
				</div>

				<Button rounded size="small" label="Edit Profile" onclick={handleEditProfile} hollow />
			</div>

			<div class="profile-actions">
				<button class="action-button" onclick={handleLogout}>
					<Fa icon={faSignOutAlt} />
					<span>Log out</span>
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
				<div class="profile-section">
					<h2>About</h2>
					<p>{userData.bio}</p>
				</div>

				<div class="profile-section">
					<h2>Contact Information</h2>
					<div class="contact-info">
						<div class="contact-item">
							<Fa icon={faEnvelope} />
							<span>{userData.email}</span>
						</div>
						<div class="contact-item">
							<Fa icon={faPhone} />
							<span>{userData.phone}</span>
						</div>
						<div class="contact-item">
							<Fa icon={faMapMarkerAlt} />
							<span>{userData.location}</span>
						</div>
						<div class="contact-item">
							<Fa icon={faCalendarAlt} />
							<span>Member since {new Date(userData.date_joined).toLocaleDateString()}</span>
						</div>
					</div>
				</div>

				<div class="profile-section">
					<h2>Skills & Specialization</h2>
					<div class="skills-container">
						{#each userData.field as skill}
							<div class="skill-tag">{skill}</div>
						{/each}
					</div>
				</div>

				<div class="profile-section">
					<h2>Social Media</h2>
					<div class="social-links">
						{#if userData.social?.linkedin}
							<a href={userData.social.linkedin} target="_blank" class="social-link">
								<Fa icon={faLinkedinIn} />
							</a>
						{/if}
						{#if userData.social?.facebook}
							<a href={userData.social.facebook} target="_blank" class="social-link">
								<Fa icon={faFacebookF} />
							</a>
						{/if}
						{#if userData.social?.instagram}
							<a href={userData.social.instagram} target="_blank" class="social-link">
								<Fa icon={faInstagram} />
							</a>
						{/if}
					</div>
				</div>
			</div>
		{:else if activeTab === 'projects'}
			<div class="projects-content">
				<div class="projects-section">
					<h2>Active Projects</h2>
					{#if userData.activeProjects?.length > 0}
						<div class="projects-list">
							{#each userData.activeProjects as project}
								<div class="project-card">
									<h3>{project.title}</h3>
									<div class="project-details">
										<span class="status {project.status.toLowerCase().replace(' ', '-')}"
											>{project.status}</span
										>
										<span class="project-client">Client: {project.client}</span>
										<span class="project-due">Due: {project.dueDate}</span>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<p class="empty-state">No active projects</p>
					{/if}
				</div>

				<div class="projects-section">
					<h2>Completed Projects</h2>
					{#if userData.completedProjects?.length > 0}
						<div class="projects-list">
							{#each userData.completedProjects as project}
								<div class="project-card">
									<h3>{project.title}</h3>
									<div class="project-details">
										<span class="project-date">Completed: {project.date}</span>
										<span class="project-client">Client: {project.client}</span>
										<div class="project-rating">
											<Fa icon={faStar} />
											<span>{project.rating}</span>
										</div>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<p class="empty-state">No completed projects</p>
					{/if}
				</div>
			</div>
		{:else if activeTab === 'saved'}
			<div class="saved-content">
				<h2>Saved Projects</h2>
				{#if userData.savedProjects?.length > 0}
					<div class="saved-projects-list">
						{#each userData.savedProjects as project}
							<div class="saved-project-card">
								<div class="saved-project-icon">
									<Fa icon={faBookmark} />
								</div>
								<div class="saved-project-info">
									<h3>{project.title}</h3>
									<div class="saved-project-details">
										<span>{project.date}</span>
										<span>{project.location}</span>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<p class="empty-state">No saved projects</p>
				{/if}
			</div>
		{:else if activeTab === 'settings'}
			<div class="settings-content">
				<h2>Account Settings</h2>

				<div class="settings-section">
					<h3>Profile Information</h3>
					<div class="settings-form">
						<div class="form-row">
							<div class="form-group">
								<label for="username">Username</label>
								<input type="text" id="username" class="field" value={userData.username} />
							</div>
							<div class="form-group">
								<label for="email">Email</label>
								<input type="email" id="email" class="field" value={userData.email} />
							</div>
						</div>

						<div class="form-row">
							<div class="form-group">
								<label for="first_name">First Name</label>
								<input type="text" id="first_name" class="field" value={userData.first_name} />
							</div>
							<div class="form-group">
								<label for="sur_name">Last Name</label>
								<input type="text" id="sur_name" class="field" value={userData.sur_name} />
							</div>
						</div>

						<div class="form-row">
							<div class="form-group">
								<label for="phone">Phone</label>
								<input type="tel" id="phone" class="field" value={userData.phone} />
							</div>
							<div class="form-group">
								<label for="location">Location</label>
								<input type="text" id="location" class="field" value={userData.location} />
							</div>
						</div>

						<div class="form-group">
							<label for="bio">Bio</label>
							<textarea id="bio" class="field" rows="4">{userData.bio}</textarea>
						</div>

						<div class="form-actions">
							<Button
								rounded
								size="medium"
								label="Save Changes"
								style="secondary"
								onclick={saveChanges}
							/>
						</div>
					</div>
				</div>

				<div class="settings-section">
					<h3>Password</h3>
					<div class="settings-form">
						<div class="form-group">
							<label for="current_password">Current Password</label>
							<input type="password" id="current_password" class="field" />
						</div>

						<div class="form-row">
							<div class="form-group">
								<label for="new_password">New Password</label>
								<input type="password" id="new_password" class="field" />
							</div>
							<div class="form-group">
								<label for="confirm_password">Confirm Password</label>
								<input type="password" id="confirm_password" class="field" />
							</div>
						</div>

						<div class="form-actions">
							<Button
								rounded
								size="medium"
								label="Update Password"
								style="secondary"
								onclick={SavePassword}
							/>
						</div>
					</div>
				</div>

				<div class="settings-section">
					<h3>Notification Preferences</h3>
					<div class="settings-form">
						<div class="checkbox-option">
							<input type="checkbox" id="email_notifications" checked />
							<label for="email_notifications">Email Notifications</label>
						</div>
						<div class="checkbox-option">
							<input type="checkbox" id="project_updates" checked />
							<label for="project_updates">Project Updates</label>
						</div>
						<div class="checkbox-option">
							<input type="checkbox" id="marketing_emails" />
							<label for="marketing_emails">Marketing Emails</label>
						</div>

						<div class="form-actions">
							<Button
								rounded
								size="medium"
								label="Save Preferences"
								style="secondary"
								onclick={SavePreferences}
							/>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
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
		border: 4px solid var(--accent-bright);
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

	.profile-section h2 {
		margin-top: 0;
		margin-bottom: 1rem;
		color: var(--primary);
		font-size: 1.25rem;
	}

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

	.projects-section h2 {
		margin-top: 0;
		margin-bottom: 1rem;
		color: var(--primary);
		font-size: 1.25rem;
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
		margin-top: 0.25rem;
	}

	.saved-project-info {
		flex: 1;
	}

	.saved-project-info h3 {
		margin-top: 0;
		margin-bottom: 0.5rem;
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
</style>
