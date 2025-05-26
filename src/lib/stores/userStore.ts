// // src/lib/stores/userStore.ts
// import { writable } from 'svelte/store';

// export interface SocialLinks {
// 	linkedin?: string;
// 	facebook?: string;
// 	instagram?: string;
// 	tiktok?: string;
// 	homepage?: string;
// 	proff?: string;
// }

// export interface FavoriteProject {
// 	id: string;
// 	title: string;
// 	date: string;
// 	location: string;
// }

// export interface ActiveProject {
// 	id: string;
// 	title: string;
// 	status: string;
// 	client: string;
// 	dueDate: string;
// }

// export interface CompletedProject {
// 	id: string;
// 	title: string;
// 	date: string;
// 	client: string;
// 	rating: number;
// }

// export interface SavedFilter {
// 	id: string;
// 	name: string;
// 	filterData: Record<string, any>;
// }

// export interface Following {
// 	id: string;
// 	userId: string;
// 	username: string;
// 	profileImage?: string;
// }

// export interface UserProfile {
// 	first_name: string;
// 	sur_name: string;
// 	birth_date: string;
// 	phone: string;
// 	location: string;
// 	location_data?: { x: number; y: number };
// 	bio: string;
// 	profile_image: string;
// 	rating: number;
// 	reviews_count: number;

// 	// Tags
// 	verified_user: boolean;
// 	verified_payment: boolean;
// 	choice: boolean;
// 	long_time_user: boolean;
// 	slow_replyer: boolean;
// 	fast_replyer: boolean;
// 	given_complaints: boolean;
// 	received_complaints: boolean;
// 	insurance: boolean;
// 	payment_insurance: boolean;

// 	job_poster_type: Array<'private' | 'business' | 'government'>;
// }

// export interface VendorProfile {
// 	logo: string;
// 	company_name: string;
// 	contact_phone: string;
// 	email_contact: string;
// 	area: string;
// 	business_address: string;
// 	org_number: string;
// 	fields_of_work: string[];
// 	specializations: string[];
// 	certificates: string[];
// }

// export interface Wallet {
// 	balance: number;
// 	transactions: Array<{
// 		id: string;
// 		amount: number;
// 		type: 'deposit' | 'withdrawal' | 'purchase';
// 		description: string;
// 		date: string;
// 	}>;
// }

// export interface FinancialStats {
// 	totalEarned: number;
// 	totalSpent: number;
// 	transactions: Array<{
// 		id: string;
// 		amount: number;
// 		isIncome: boolean;
// 		category: string;
// 		description: string;
// 		date: string;
// 		projectId?: string;
// 	}>;
// }

// export interface UserData {
// 	id: string;
// 	username: string;
// 	email: string;
// 	date_joined: string;
// 	last_login: string;
// 	is_active: boolean;
// 	user_type: 'user' | 'vendor' | 'employee' | 'admin';
// 	is_online: boolean;
// 	is_email_verified: boolean;
// 	is_phone_verified: boolean;

// 	// Related profiles and collections
// 	profile: UserProfile;
// 	vendor_profile?: VendorProfile;
// 	social: SocialLinks;
// 	wallet: Wallet;
// 	financial_stats: FinancialStats;

// 	// Collections
// 	favoriteProjects: FavoriteProject[];
// 	activeProjects: ActiveProject[];
// 	completedProjects: CompletedProject[];
// 	savedFilters: SavedFilter[];
// 	following: Following[];
// }

// // Initial mock data (simplified from your original)
// const defaultUserData: UserData = {
// 	id: 'user123',
// 	username: 'johndoe',
// 	email: 'john.doe@example.com',
// 	date_joined: '2023-01-10',
// 	last_login: '2025-04-30',
// 	is_active: true,
// 	user_type: 'vendor',
// 	is_online: true,
// 	is_email_verified: true,
// 	is_phone_verified: true,

// 	profile: {
// 		first_name: 'John',
// 		sur_name: 'Doe',
// 		birth_date: '1985-05-15',
// 		phone: '+47 123 45 678',
// 		location: 'Oslo, Norway',
// 		location_data: { x: 10.7522, y: 59.9139 },
// 		bio: 'Professional contractor with 15 years of experience in construction projects.',
// 		profile_image: 'https://randomuser.me/api/portraits/men/44.jpg',
// 		rating: 4.8,
// 		reviews_count: 24,

// 		verified_user: true,
// 		verified_payment: true,
// 		choice: true,
// 		long_time_user: true,
// 		slow_replyer: false,
// 		fast_replyer: true,
// 		given_complaints: false,
// 		received_complaints: false,
// 		insurance: true,
// 		payment_insurance: true,

// 		job_poster_type: ['business']
// 	},

// 	vendor_profile: {
// 		company_name: 'Doe Construction AS',
// 		org_number: '123456789',
// 		fields_of_work: ['construction', 'renovation'],
// 		specializations: ['asfaltering', 'betong'],
// 		certificates: ['Certified Builder', 'Safety Certification']
// 	},

// 	social: {
// 		linkedin: 'https://linkedin.com/in/johndoe',
// 		facebook: 'https://facebook.com/johndoe',
// 		instagram: 'https://instagram.com/johndoe',
// 		tiktok: 'https://tiktok.com/@johndoe',
// 		homepage: 'https://doeconstruction.no',
// 		proff: 'https://proff.no/selskap/doe-construction-as/123456789'
// 	},

// 	wallet: {
// 		balance: 5000,
// 		transactions: [
// 			{
// 				id: 'txn1',
// 				amount: 2000,
// 				type: 'deposit',
// 				description: 'Wallet top-up',
// 				date: '2025-04-15'
// 			},
// 			{
// 				id: 'txn2',
// 				amount: 500,
// 				type: 'purchase',
// 				description: 'Premium listing access',
// 				date: '2025-04-20'
// 			}
// 		]
// 	},

// 	financial_stats: {
// 		totalEarned: 25000,
// 		totalSpent: 5000,
// 		transactions: [
// 			{
// 				id: 'fin1',
// 				amount: 12000,
// 				isIncome: true,
// 				category: 'project_payment',
// 				description: 'Bathroom remodeling payment',
// 				date: '2024-12-15',
// 				projectId: 'proj2'
// 			},
// 			{
// 				id: 'fin2',
// 				amount: 1500,
// 				isIncome: false,
// 				category: 'materials',
// 				description: 'Building materials',
// 				date: '2024-11-30'
// 			}
// 		]
// 	},

// 	// Collections
// 	favoriteProjects: [
// 		{
// 			id: 'proj1',
// 			title: 'Garage renovation',
// 			date: '2025-06-15',
// 			location: 'Bergen'
// 		},
// 		{
// 			id: 'proj2',
// 			title: 'Bathroom remodeling',
// 			date: '2025-07-22',
// 			location: 'Oslo'
// 		}
// 	],

// 	activeProjects: [
// 		{
// 			id: 'active1',
// 			title: 'Kitchen expansion',
// 			status: 'In progress',
// 			client: 'Erika Hansen',
// 			dueDate: '2025-08-30'
// 		}
// 	],

// 	completedProjects: [
// 		{
// 			id: 'comp1',
// 			title: 'Driveway paving',
// 			date: '2024-12-10',
// 			client: 'Lars Andersen',
// 			rating: 5
// 		},
// 		{
// 			id: 'comp2',
// 			title: 'Concrete foundation',
// 			date: '2024-11-05',
// 			client: 'Maria Olsen',
// 			rating: 4.5
// 		}
// 	],

// 	savedFilters: [
// 		{
// 			id: 'filter1',
// 			name: 'Oslo area jobs',
// 			filterData: {
// 				location: 'Oslo',
// 				radius: 30,
// 				categories: ['construction', 'renovation']
// 			}
// 		}
// 	],

// 	following: [
// 		{
// 			id: 'follow1',
// 			userId: 'user456',
// 			username: 'byggmester_as',
// 			profileImage: 'https://randomuser.me/api/portraits/men/22.jpg'
// 		}
// 	]
// };

// // Create user store with traditional Svelte store
// export const userData = writable<UserData>(defaultUserData);

// // Helper functions to update user data
// export function setUserData(newData: UserData) {
// 	userData.set(newData);
// }

// export function updateUserData(partialData: Partial<UserData>) {
// 	userData.update((current) => ({ ...current, ...partialData }));
// }

// export function resetUserData() {
// 	userData.set(defaultUserData);
// }

// export function updateProfile(profileData: Partial<UserProfile>) {
// 	userData.update((current) => ({
// 		...current,
// 		profile: { ...current.profile, ...profileData }
// 	}));
// }

// export function addFavoriteProject(project: FavoriteProject) {
// 	userData.update((current) => ({
// 		...current,
// 		favoriteProjects: [...current.favoriteProjects, project]
// 	}));
// }

// export function removeFavoriteProject(projectId: string) {
// 	userData.update((current) => ({
// 		...current,
// 		favoriteProjects: current.favoriteProjects.filter((p) => p.id !== projectId)
// 	}));
// }

// export async function fetchUserData() {
// 	try {
// 		// This would be replaced with actual API call in production
// 		// const response = await fetch('/api/user/profile');
// 		// if (response.ok) {
// 		//   const fetchedData = await response.json();
// 		//   userData.set(fetchedData);
// 		// }

// 		// For now, we're using the mock data defined above
// 		console.log('Fetched user data (mock)');
// 	} catch (error) {
// 		console.error('Failed to fetch user data:', error);
// 	}
// }

// // _______________________________________________ OLD ___________________________________________

// // // User data interface
// // export interface SocialLinks {
// // 	linkedin?: string;
// // 	facebook?: string;
// // 	instagram?: string;
// // }

// // export interface SavedProject {
// // 	id: string;
// // 	title: string;
// // 	date: string;
// // 	location: string;
// // }

// // export interface ActiveProject {
// // 	id: string;
// // 	title: string;
// // 	status: string;
// // 	client: string;
// // 	dueDate: string;
// // }

// // export interface CompletedProject {
// // 	id: string;
// // 	title: string;
// // 	date: string;
// // 	client: string;
// // 	rating: number;
// // }

// // export interface UserData {
// // 	id: string;
// // 	username: string;
// // 	first_name: string;
// // 	sur_name: string;
// // 	birth_date: string;
// // 	date_joined: string;
// // 	email: string;
// // 	phone: string;
// // 	location: string;
// // 	user_type: string[];
// // 	field: string[];
// // 	bio: string;
// // 	profile_image: string;
// // 	rating: number;
// // 	reviews_count: number;
// // 	social: SocialLinks;
// // 	savedProjects: SavedProject[];
// // 	activeProjects: ActiveProject[];
// // 	completedProjects: CompletedProject[];
// // }

// // // Initial mock data
// // const defaultUserData: UserData = {
// // 	id: 'user123',
// // 	username: 'johndoe',
// // 	first_name: 'John',
// // 	sur_name: 'Doe',
// // 	birth_date: '1985-05-15',
// // 	date_joined: '2023-01-10',
// // 	email: 'john.doe@example.com',
// // 	phone: '+47 123 45 678',
// // 	location: 'Oslo, Norway',
// // 	user_type: ['vendor'],
// // 	field: ['asfaltering', 'betong'],
// // 	bio: 'Professional contractor with 15 years of experience in construction projects.',
// // 	profile_image: 'https://randomuser.me/api/portraits/men/44.jpg',
// // 	rating: 4.8,
// // 	reviews_count: 24,
// // 	social: {
// // 		linkedin: 'https://linkedin.com/in/johndoe',
// // 		facebook: 'https://facebook.com/johndoe',
// // 		instagram: 'https://instagram.com/johndoe'
// // 	},
// // 	savedProjects: [
// // 		{
// // 			id: 'proj1',
// // 			title: 'Garage renovation',
// // 			date: '2025-06-15',
// // 			location: 'Bergen'
// // 		},
// // 		{
// // 			id: 'proj2',
// // 			title: 'Bathroom remodeling',
// // 			date: '2025-07-22',
// // 			location: 'Oslo'
// // 		}
// // 	],
// // 	activeProjects: [
// // 		{
// // 			id: 'active1',
// // 			title: 'Kitchen expansion',
// // 			status: 'In progress',
// // 			client: 'Erika Hansen',
// // 			dueDate: '2025-08-30'
// // 		}
// // 	],
// // 	completedProjects: [
// // 		{
// // 			id: 'comp1',
// // 			title: 'Driveway paving',
// // 			date: '2024-12-10',
// // 			client: 'Lars Andersen',
// // 			rating: 5
// // 		},
// // 		{
// // 			id: 'comp2',
// // 			title: 'Concrete foundation',
// // 			date: '2024-11-05',
// // 			client: 'Maria Olsen',
// // 			rating: 4.5
// // 		}
// // 	]
// // };

// // import { writable } from 'svelte/store';

// // // Create user store with traditional Svelte store
// // export const userData = writable<UserData>(defaultUserData);

// // // Helper functions to update user data
// // export function setUserData(newData: UserData) {
// // 	userData.set(newData);
// // }

// // export function updateUserData(partialData: Partial<UserData>) {
// // 	userData.update((current) => ({ ...current, ...partialData }));
// // }

// // export function resetUserData() {
// // 	userData.set(defaultUserData);
// // }

// // export function updateProfile(profileData: Partial<UserData>) {
// // 	userData.update((current) => ({ ...current, ...profileData }));
// // }

// // export function addSavedProject(project: SavedProject) {
// // 	userData.update((current) => ({
// // 		...current,
// // 		savedProjects: [...current.savedProjects, project]
// // 	}));
// // }

// // export function removeSavedProject(projectId: string) {
// // 	userData.update((current) => ({
// // 		...current,
// // 		savedProjects: current.savedProjects.filter((p) => p.id !== projectId)
// // 	}));
// // }

// // export function addActiveProject(project: ActiveProject) {
// // 	userData.update((current) => ({
// // 		...current,
// // 		activeProjects: [...current.activeProjects, project]
// // 	}));
// // }

// // export function updateProjectStatus(projectId: string, status: string) {
// // 	userData.update((current) => {
// // 		const updatedProjects = current.activeProjects.map((p) =>
// // 			p.id === projectId ? { ...p, status } : p
// // 		);
// // 		return { ...current, activeProjects: updatedProjects };
// // 	});
// // }

// // export function completeProject(projectId: string, completedProject: CompletedProject) {
// // 	userData.update((current) => {
// // 		const updatedActiveProjects = current.activeProjects.filter((p) => p.id !== projectId);
// // 		return {
// // 			...current,
// // 			activeProjects: updatedActiveProjects,
// // 			completedProjects: [...current.completedProjects, completedProject]
// // 		};
// // 	});
// // }

// // export async function fetchUserData() {
// // 	try {
// // 		// This would be replaced with actual API call in production
// // 		// const response = await fetch('/api/user/profile');
// // 		// if (response.ok) {
// // 		//   const fetchedData = await response.json();
// // 		//   userData.set(fetchedData);
// // 		// }

// // 		// For now, we're using the mock data defined above
// // 		console.log('Fetched user data (mock)');
// // 	} catch (error) {
// // 		console.error('Failed to fetch user data:', error);
// // 	}
// // }
