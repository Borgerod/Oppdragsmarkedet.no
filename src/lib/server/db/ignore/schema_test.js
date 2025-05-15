import { datetime, int } from 'drizzle-orm/mysql-core';
import {
	pgTable,
	text,
	integer,
	timestamp,
	boolean,
	json,
	point,
	pgEnum
} from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
	id: text('id').primaryKey(), //'u10000023cp'
	username: text('username'), //'johndoe'
	passwordHash: text('password_hash').notNull(), //
	email: text('email'), // 'john.doe@example.com',
	field: text('field'), // 'electrition'
	user_type: text('user_type'), //'vendor'
	user_role: text('user_role'), //'business'
	date_joined: timestamp('date_joined'), // '2023-01-10',
	last_login: timestamp('last_login'), // '2025-04-30',
	is_active: boolean('is_active'), //  'true',
	is_online: boolean('is_online'), // 'false'
	is_email_verified: boolean('is_email_verified'), // 'false'
	is_phone_verified: boolean('is_phone_verified'), // 'false'
	location: text('location'), //'oslo, norway'
	location_data: point('location_data') //'x: 10.7522, y: 59.9139'
});

export const profileData = pgTable('profileData', {
	id: text('id').primaryKey(), // 'p20000023cp'
	owner_id: text('owner_id'), // 'u10000023cp',
	username: text('username'), //'johndoe',
	first_name: text('first_name'), //'John',
	sur_name: text('sur_name'), //'Doe',
	birth_date: text('birth_date'), //'1985-05-15',
	date_joined: text('date_joined'), //'2023-01-10',
	email: text('email'), //'john.doe@example.com',
	phone: text('phone'), //'+47 123 45 678',
	profile_image: text('profile_image'), //'https://randomuser.me/api/portraits/men/44.jpg',
	client_reviews_rating: text('client_reviews_rating'), //4.8,
	client_reviews_count: text('client_reviews_count'), //24,
	profile_tags: {
		verified_user: boolean('verified_user'), //'true'
		verified_payment: boolean('verified_payment'), //'true'
		choice: boolean('choice'), //'true'
		long_time_user: boolean('long_time_user'), //'true'
		slow_replyer: boolean('slow_replyer'), //'false'
		fast_replyer: boolean('fast_replyer'), //'true'
		given_complaints: boolean('given_complaints'), //'false'
		received_complaints: boolean('received_complaints'), //'false'
		insurance: boolean('insurance'), //'true'
		payment_insurance: boolean('payment_insurance'), //'true'
		slow_worker: boolean('slow_worker'), //'true'
		fast_worker: boolean('fast_worker') //'false'
	},

	activeProjects: json('activeProjects'),
	completedProjects: json('completedProjects'),
	transactionsLog: json('transactionsLog'),
	wallets: json('wallets')
});

export const _projects = pgTable('_projects', {
	// these are generated
	id: text('id').primaryKey(),
	poster_id: text('poster_id').references(() => user.id),
	post_date: timestamp('post_date'),

	// these are fetched from the client's userData and Profile
	client_username: text('client_username').references(() => user.id),
	client_first_name: text('client_first_name'),
	client_sur_name: text('client_sur_name'),
	client_email: text('client_email'),
	client_phone: text('client_phone'),
	client_rating: integer('client_rating'),
	client_attributes: json('client_attributes'),
	client_user_type: text('client_user_type'),

	// these are filled:
	location: text('location'),
	address: text('address'),
	category: json('category'),
	experience_requirements: json('experience_requirements'),
	job_attributes: json('job_attributes'),
	budget: integer('budget'),
	due_date: timestamp('due_date'),
	title: text('title'),
	short_description: text('short_description'),
	estimated_time: integer('estimated_time'),
	long_description: text('long_description'),

	// these are assigned
	favorittedCount: integer('favorittedCount'),
	clicked: integer('clicked'),
	bought: integer('bought'),
	assigned: text('assigned').references(() => user.id),
	paid_listing: boolean('paid_listing'),
	listing_priority_score: integer('listing_priority_score'),
	status: text('status'),
	start_date: timestamp('start_date'),
	finish_date: timestamp('finish_date')

	// EXAMPLE: {

	// 	id: 'proj0020019',
	// 	post_date:'2025-02-01',

	// 	// these are fetched from the client's userData and Profile
	// 	__client_username: 'johndoe',
	// 	__client_first_name: 'John',
	// 	__client_sur_name: 'Doe',
	// 	__client_email: 'john.doe@example.com',
	// 	__client_phone: '+47 123 45 678',
	// 	_client_rating: 4.7,
	// 	_client_attributes: ['verified_user','verified_payment','fast_replyer','received_complaints',],
	// 	client_user_type: ['private'],

	// 	// these are filled:
	// 	location: 'Oslo, Norway',
	// 	__address: 'Oslogaten 165b',
	// 	_category: ['rørlegger', 'renovation'], // [category, sub_category]
	// 	_experience_requirements:  ['fliselegging', 'betong'],
	// 	_job_attributes: ['trapp', 'innejobb', 'enmannsjobb'],
	// 	budget: 100000, //might make it __budget and add budget_lvl [$,$$,$$$,$$$$,open]
	// 	due_date: '2025-10-15',
	// 	title: 'Renovere Baderom 20kvm',
	// 	_short_description: 'Renovere 20kvm baderom i andre etasje, har stort budsjett og åpen for design forslag',
	// 	estimated_time: '00M:00W:14D:00h:00m',
	// 	__long_description: "Søker erfaren rørlegger til totalrenovering av bad (20 kvm) Ønsker å komme i kontakt med en dyktig og pålitelig rørlegger for renovering av et ca. 20 kvm stort baderom. Jobben innebærer full oppussing, og jeg er åpen for forslag til løsninger og materialvalg. Kort om prosjektet: Totalrenovering av eksisterende bad Størrelse: ca. 20 kvm Ønsker inspirasjon og forslag til planløsning og materialer Oppstart etter avtale Kvalifikasjoner jeg ser etter: Erfaring med baderomsrenovering Godkjenninger i henhold til norske krav (f.eks. våtromsnorm) Referanser fra tidligere prosjekter Gjerne mulighet for befaring Ta kontakt for mer informasjon eller for å avtale befaring.",

	// 	// these are assigned

	// 	_favorittedCount: 0,
	// 	_clicked:12,
	// 	_bought: 2,
	// 	___assigned: 'u10000023vb',
	// 	paid_listing: false,
	// 	___listing_priority_score: 0, //0 is the default. (can be negative) higher the score the further up the list it goes. you get points from tags like; choise, verified_user, long_time_user, etc. deduction of points for negative tags. paid_listings are allways above non_paid_listings.
	// 	___status: 'In progress',
	// 	___start_date:'2025-04-11',
	// 	___finish_date:'',
	// }
});

export const activeProjects = pgTable('activeProjects', {
	id: text('id').primaryKey(),
	project_id: text('project_id')
		.notNull()
		.references(() => projects.id),
	client_id: text('client_id')
		.notNull()
		.references(() => user.id),
	vendor_id: text('vendor_id').references(() => user.id),
	title: text('title'),
	status: text('status'),
	post_date: text('post_date'),
	start_date: text('start_date'),
	due_date: text('due_date'),
	budget: text('budget'),
	currency: text('currency')

	// * EXAMPLES :[
	// 		{
	// 			id: 'active0090028', // job_status + 000 + unique_job_number
	// 			project_id:'proj0020019',
	// 			title: 'Kitchen expansion',
	// 			status: 'In progress',
	// 			client_id: 'u10000023cp',
	// 			vendor_id: '', // is empty untill a vendor is assigned to it.
	// 			post_date:'2025-06-12',
	// 			start_date: '',
	// 			due_date: '',
	// 			budget: 45000,				// for financial purposes
	// 			currency: 'NOK',
	// 		},
	// 		{
	// 			id: 'active01100128', // stands for active + job + 000 + unique_job_number
	// 			project_id:'proj0020019',
	// 			title: 'Kitchen expansion',
	// 			status: 'In progress',
	// 			client_id: 'u10000119cp',
	// 			vendor_id: 'u10000023vb', // note that this person is assigned to this job as a vendor
	// 			post_date:'2025-02-12',
	// 			start_date:'2025-07-11',
	// 			due_date: '2025-09-15',
	// 			budget: 31000,				// for financial purposes
	// 			currency: 'NOK',
	// 		},
	// 	]
});

export const completedProjects = pgTable('completedProjects', {
	id: text('id').primaryKey(),
	project_id: text('project_id')
		.notNull()
		.references(() => projects.id),
	client_id: text('client_id')
		.notNull()
		.references(() => user.id),
	vendor_id: text('vendor_id')
		.notNull()
		.references(() => user.id),
	title: text('title'),
	date: timestamp('date'),
	rating_of_vendor: text('rating_of_vendor'),
	rating_of_client: text('rating_of_client'),
	post_date: timestamp('post_date'),
	start_date: timestamp('start_date'),
	finish_date: timestamp('finish_date'),
	due_date: timestamp('due_date'),
	budget: integer('budget'),
	currency: text('currency'),
	payment_verification: boolean('payment_verification')

	// * EXAMPLES: [
	// 	{
	// 		id: 'comp00900212', // stands for completed + job + 000 + unique_job_number
	// 		project_id:'proj0020019',
	// 		title: 'Driveway paving',
	// 		date: '2024-12-10',
	// 		client: 'u10000023cp',
	// 		vendor_id: 'u10000066vb', //should never be empty
	// 		vendor_rating: 5,
	// 		user_rating: 5,
	// 		post_date:'2025-06-12',
	// 		start_date:'2025-07-11',
	// 		finish_date:'2025-10-10',
	// 		due_date: '2025-10-15',
	// 		budget: 37000,				// for financial purposes
	// 		currency: 'NOK',
	// 		payment_verification: true
	// 	},
	// 	{
	// 		id: 'comp000132',
	// 		project_id:'proj0020019',
	// 		title: 'Concrete foundation',
	// 		date: '2024-11-05',
	// 		client: 'u10000023cp',
	// 		vendor_id: 'u10000010vb', //should never be empty
	// 		vendor_rating: 3,			// assigned to vendor
	// 		user_rating: 1,				//assigned to user
	// 		post_date:'2025-02-01',
	// 		start_date:'2025-04-11',
	// 		finish_date:'2025-10-15', //note it exceeded due date
	// 		due_date: '2025-10-15',
	// 		budget: 45000,
	// 		currency: 'NOK',
	// 		payment_verification: true
	// 	}
	// ]
});

// ALTERNATIVE:
export const projects = pgTable('projects', {
	id: text('id').primaryKey(),
	poster_id: text('poster_id').references(() => user.id),
	post_date: timestamp('post_date'),
	// these are filled:
	location: text('location'),
	address: text('address'),
	category: json('category'),
	experience_requirements: json('experience_requirements'),
	job_attributes: json('job_attributes'),
	budget: integer('budget'),
	due_date: timestamp('due_date'),
	title: text('title'),
	short_description: text('short_description'),
	estimated_time: integer('estimated_time'),
	long_description: text('long_description'),

	// these are assigned
	favorittedCount: integer('favorittedCount'),
	clicked: integer('clicked'),
	bought: integer('bought'),
	assigned: text('assigned').references(() => user.id),
	paid_listing: boolean('paid_listing'),
	listing_priority_score: integer('listing_priority_score'),
	status: text('status'),
	start_date: timestamp('start_date'),
	finish_date: timestamp('finish_date')
});

const projectsWithClientInfo = await db
	.select()
	.from(projects)
	// .leftJoin(user, eq(projects.poster_id, user.id))
	.leftJoin(profileData, eq(projects.poster_id, profileData.owner_id));
