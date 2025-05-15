// User Structure:			
//             					       user
//                   ___________________|________________________________________
//                   |               		                 	 |              |
//                profile         			                  employee        admin
//     ______________|______________		                     |              |
//     |              				|                            |              | 
//   vendor					      client                      employee	      admin
//     |			  ______________|_______________
//     |	 	      |             |              |
//  business       business      private      government
											
//             					       
//                   ____________________________________________________________
//                   |               	          | 	      	 |              |
//                  user         		        profile	       employee       admin
//     ______________|______________		      |               |             |
//     |              				|             |      		  |             | 
//   vendor			<-- 	      client     <-- linked        employee	      admin
//     |			  ______________|_______________
//     |	 	      |             |              |
//  business       business      private      government
												

// structure of id: (id_type char)(user_role_extention char)[unique number](user_role char)(role_class char)[area_number]
// example 				u 				1 						00000001 			c 			b 				1101* 			*1101 is kommunenummer, 11 in that number is fylke.

// id_type: [u, p, e, a]
// user_role_extention: [1-4] (number version of id_type)
// id_number: [0000000-9999999]
// user_role: [v, c] [v, c] [e] [a]
// role_class: [b] [b, p, g] [] []
// examples:
// 1.1.1) A private client user's userdata id, would be: u10000023cp
// 1.1.2) A private client user's profiledata id, would be: p20000023cp

// 1.2.1) A business client user's userData id, would be: u10000192cb
// 1.2.2) A business client user's profiledata id, would be: p20000192cb

// 1.3.1) A Government client user's userData id, would be: u10000016cg
// 1.3.2) A Government client user's profiledata id, would be: p20000016cg

// 2.1) A business vendor user's userData id, would be: u10000010vb
// 2.2) A business vendor user's profiledata id, would be: p20000010vb

// 3) A employees's id, would be: e30000008cp
// 4) A admin's id, would be: a40000001vb




import { datetime, int } from 'drizzle-orm/mysql-core';
import { pgTable, text, integer, timestamp, boolean, json, point, pgEnum, } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
	id:text('id').primaryKey(),   //'u10000023cp'
	username:text('username'),  //'johndoe'
	passwordHash: text('password_hash').notNull(),  // 
	email:text('email'), // 'john.doe@example.com',
	field: text('field'), // 'electrition'
	user_type:text('user_type'), //'vendor'
	user_role:text('user_role'), //'business'
	date_joined: timestamp('date_joined'), // '2023-01-10',
	last_login: timestamp('last_login'),	 // '2025-04-30',
	is_active:boolean('is_active'), //  'true',
	is_online:boolean('is_online'), // 'false'
	is_email_verified:boolean('is_email_verified'), // 'false'
	is_phone_verified:boolean('is_phone_verified'), // 'false'
	location:text('location'), //'oslo, norway'
	location_data: point('location_data'), //'x: 10.7522, y: 59.9139'
});


export const profileData = pgTable('profileData', {
	id:text('id').primaryKey(),// 'p20000023cp'
	owner_id: text('owner_id'), // 'u10000023cp',
	username: text('username'),	//'johndoe',
	first_name: text('first_name'),	//'John',
	sur_name: text('sur_name'),	//'Doe',
	birth_date: text('birth_date'),	//'1985-05-15',
	date_joined: text('date_joined'),	//'2023-01-10',
	email: text('email'),	//'john.doe@example.com',
	phone: text('phone'),	//'+47 123 45 678',
	profile_image: text('profile_image'),	//'https://randomuser.me/api/portraits/men/44.jpg',
	client_reviews_rating: text('client_reviews_rating'),	//4.8,
	client_reviews_count: text('client_reviews_count'),	 //24,
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
		fast_worker: boolean('fast_worker'), //'false'
	},
	
    activeProjects: json('activeProjects'),
    completedProjects: json('completedProjects'),
    transactionsLog: json('transactionsLog'),
	wallets: json('wallets'),


	
}
);

export const projects = pgTable('projects', {
	id: text('id').primaryKey(),
	poster_id: text('poster_id').references(() => user.id),
	post_date: timestamp('post_date'),
	// these are filled:
	location:text('location'),
	address:text('address'),
	category:json('category'),
	experience_requirements:json('experience_requirements'),
	job_attributes:json('job_attributes'),
	budget:integer('budget'),
	due_date:timestamp('due_date'),
	title:text('title'),
	short_description:text('short_description'),
	estimated_time:integer('estimated_time'),
	long_description:text('long_description'),

	// these are assigned
	favorittedCount:integer('favorittedCount'),
	clicked:integer('clicked'),
	bought:integer('bought'),
	assigned:text('assigned').references(()=> user.id),
	paid_listing:boolean('paid_listing'),
	listing_priority_score:integer('listing_priority_score'),
	status:text('status'),
	start_date:timestamp('start_date'),
	finish_date:timestamp('finish_date'),
});

const projectsWithClientInfo = await db.select()
	.from(projects)
	// .leftJoin(user, eq(projects.poster_id, user.id))
	.leftJoin(profileData, eq(projects.poster_id, profileData.owner_id),
	);

export const _projects = pgTable('_projects', {
	// these are generated
	id: text('id').primaryKey(),
	poster_id:text('poster_id').references(() => user.id),
	post_date:timestamp('post_date'),

	// these are fetched from the client's userData and Profile
	client_username:text('client_username').references(() => user.id),
	client_first_name:text('client_first_name'),
	client_sur_name:text('client_sur_name'),
	client_email:text('client_email'),
	client_phone:text('client_phone'),
	client_rating:integer('client_rating'),
	client_attributes:json('client_attributes'),
	client_user_type:text('client_user_type'),
	
	// these are filled:
	location:text('location'),
	address:text('address'),
	category:json('category'),
	experience_requirements:json('experience_requirements'),
	job_attributes:json('job_attributes'),
	budget:integer('budget'),
	due_date:timestamp('due_date'),
	title:text('title'),
	short_description:text('short_description'),
	estimated_time:integer('estimated_time'),
	long_description:text('long_description'),

	// these are assigned
	favorittedCount:integer('favorittedCount'),
	clicked:integer('clicked'),
	bought:integer('bought'),
	assigned:text('assigned').references(()=> user.id),
	paid_listing:boolean('paid_listing'),
	listing_priority_score:integer('listing_priority_score'),
	status:text('status'),
	start_date:timestamp('start_date'),
	finish_date:timestamp('finish_date'),



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
	vendor_id: text('vendor_id')
		.references(() => user.id),
	title: text('title'),
	status: text('status'),
	post_date: text('post_date'),
	start_date: text('start_date'),
	due_date: text('due_date'),
	budget: text('budget'),
	currency: text('currency'),


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
	payment_verification: boolean('payment_verification'),

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

// combined: financialTransactions and walletTransactions, 
//> NOT IN USE atm
// export const transactionsLog = pgTable('transactionsLog', {
// 	id: text('id').primaryKey(),
// 	from_id: text('from_id'),  
// 	// source: text('source'), // act as boolean: 'wallets'|'direct'
// 	// type: text('type'),  // act as boolean: 'incomming' | 'outgoing'
// 	source: pgEnum('source', ['wallets', 'direct']),
// 	type: pgEnum('type', ['incoming', 'outgoing']),
// 	context: text('context'),  // describes the reason for transaction e.g., 'refill wallets', 'paid listing', 'request access'
// 	wallet_id: text('wallet_id'), //if source==='wallets'
// 	paid_listing_refill: boolean('paid_listing_refill').default(false),    //if context==='paid listing'
// 	paid_listing_days: integer('paid_listing_days'),   //if context==='paid listing'
// 	amount: integer('amount'), 
// 	currency: text('currency'),  
// 	timestamp: timestamp('timestamp'),  

// 	// EXAMPLES: [
// 	// {
// 	// 	type: 'incomming',
// 	// 	context:'paid listing',
// 	// 	refill:false, //empty/ignored if not paid listing
// 	// 	days:7, //empty/ignored if not paid listing
// 	// 	from:'u10000023cp',
// 	// 	amount:300.00,
// 	// 	currency:'NOK',
// 	// 	timestamp:'1742332927'// (UNIX)
// 	// },
// 	// {
// 	// 	//? should wallets be withdrawable?
// 	// 	type: 'incomming',
// 	// 	context:'refill wallets',
// 	// 	refill:false, //empty/ignored if not paid listing
// 	// 	days:7, //empty/ignored if not paid listing
// 	// 	from:'u10000023vb',
// 	// 	amount:300.00,
// 	// 	currency:'NOK',
// 	// 	timestamp:'1742332927'// (UNIX)
// 	// },
// 	// {
// 	// 	type: 'incomming',
// 	// 	context:'bought accsess',
// 	// 	refill:false, //empty/ignored if not paid listing
// 	// 	days:7, //empty/ignored if not paid listing
// 	// 	from:'u10000023vb',
// 	// 	amount:300.00,
// 	// 	currency:'NOK',
// 	// 	timestamp:'1742332927'// (UNIX)
// 	// },

// 	// ];
// })

// Financial transactions
export const financialTransactions = pgTable('financial_transactions', {
	id: text('id').primaryKey(),
	wallet_id: text('wallet_id')
		.notNull()
		.references(() => wallets.id),
	transaction_type: text('transaction_type').notNull(), // 'deposit', 'withdrawal', 'payment', etc.
	amount: text('amount').notNull(),
	currency: text('currency').notNull(),
	description: text('description'),
	status: text('status').notNull(),
	created_at: timestamp('created_at').notNull(),
	completed_at: timestamp('completed_at')
});


export const wallets = pgTable('wallets', {
	id: text('id').primaryKey(),
	user_id:text('id') //u20000192cb
		.notNull()
		.references(() => user.id),
	balance: integer('balance'),
	sum_wallet_transactions:json('sum_wallet_transactions'), //will insert all transactions where wallet_or_direct='wallets'
	is_balance_valid: boolean('is_balance_valid'), // will check if sum(transaction_log)===balance
})


// Wallet transactions - for payment/transfers between wallets
// wallets will only do transaction between Us and the wallets owner. 
export const walletTransactions = pgTable('wallet_transactions', {
	id: text('id').primaryKey(),
	sender_wallet_id: text('sender_wallet_id')
		.notNull()
		.references(() => wallets.id),
	receiver_wallet_id: text('receiver_wallet_id')
		.notNull()
		.references(() => wallets.id),
	receiver_id: text('receiver_id')
		.notNull()
		.references(() => wallets.user_id), //maybe this doesn't work like this
	sender_id: text('sender_id')
		.notNull()
		.references(() => wallets.user_id), //maybe this doesn't work like this
	amount: text('amount').notNull(),
	currency: text('currency').notNull(),
	status: text('status').notNull(),
	description: text('description'),
	project_id: text('project_id'),
	created_at: timestamp('created_at').notNull(),
	completed_at: timestamp('completed_at')
});


export const vendorProfileExtension = pgTable('vendorProfileExtension', {
	id:text('id').primaryKey(), //sm20000023cp
	user_id:text('id') //u20000192cb
		.notNull()
		.references(() => user.id),
	company_name: text('company_name'),
	org_number: integer('org_number'),
	category: json('fields_of_work'), //field(s) of work
	sub_category: json('specializations'), //specializations
	certificates: json('certificates'),
	description: text('description'),
	logo: text('logo'),
	socialMedia: json('socialMedia'),
	savedFilters: text('savedFilters'),
	followedClients: text('followedClients'),
	favorittedProjects: text('favorittedProjects'),
	financialStats: text('financialStats'),
})

export const socialMedia = pgTable('socialMedia', {
	id:text('id').primaryKey(), //sm20000023cp
	user_id:text('id') //u20000192cb
		.notNull()
		.references(() => user.id),
	facebook: text('facebook'),
	tiktok:text('tiktok'),
	linkedin:text('linkedin'),
	twitter:text('twitter'),
	instagram:text('instagram'),
	homepage:text('homepage'),
})

export const savedFilters = pgTable('savedFilters', {
	id:text('id').primaryKey(), //sf20000192cb
		user_id:text('id') //u20000192cb
		.notNull()
		.references(() => user.id),
	save_name:text('save_name'),
	url: text('url'),
	date_saved: timestamp('date_saved'),
})

export const followedClients = pgTable('followedClients', {
	id:text('id').primaryKey(), //fc20000192cb
		user_id:text('id') //u20000192cb
		.notNull()
		.references(() => user.id),
	client_id: text('client_id'),
	date_saved: timestamp('date_saved'),
})

export const favorittedProjects = pgTable('favorittedProjects', {
	id:text('id').primaryKey(), //fp20000192cb
	user_id:text('id') //u20000192cb
		.notNull()
		.references(() => user.id),
	project_id: text('project_id'), // proj0000452cb
	date_saved: timestamp('date_saved'),
})

export const financialStats = pgTable('financialStats', {
	id:text('id').primaryKey(), //fs20000192cb
	user_id:text('id') //u20000192cb
		.notNull()
		.references(() => user.id),
	total_earned: integer('total_earned').notNull(), //shouldnt these be able to be null aka 0 
	total_spent: integer('total_spent').notNull(),   //shouldnt these be able to be null aka 0 
	average_project_value: text('average_project_value'),
	currency: text('currency').notNull(),
	last_updated: timestamp('last_updated').notNull(),
	time_efficiancy: integer('time_efficiancy'),

})






const defaultUserData: UserData = {
	id: 'u10000023cp',
	username: 'johndoe',
	email: 'john.doe@example.com',
	date_joined: '2023-01-10',
	last_login: '2025-04-30',
	is_active: true,
	user_type: 'vendor',
	user_role: 'business',
	is_online: true,
	is_email_verified: true,	
	location_data: { x: 10.7522, y: 59.9139 },
	is_phone_verified: true,
	location: 'Oslo, Norway',
}

const profile_data = {
	id: 'p20000023cp',
	owner_id:'u10000023cp',
	username: 'johndoe',
	first_name: 'John',
	sur_name: 'Doe',
	birth_date: '1985-05-15',
	date_joined: '2023-01-10',
	email: 'john.doe@example.com',
	phone: '+47 123 45 678',
	profile_image: 'https://randomuser.me/api/portraits/men/44.jpg',
	client_reviews_rating: 4.8,
	client_reviews_count: 24,
	profile_tags:
{
	verified_user: true,
	verified_payment: true,
	choice: true,
	long_time_user: true,
	slow_replyer: false,
	fast_replyer: true,
	given_complaints: false,
	received_complaints: false,
	insurance: true,
	payment_insurance: true,
	slow_worker: true,
	fast_worker:false,
},

// Project ID explaination:
// active + 009 + 002 + 1
// | | |  
// status category sub_category unique_number

    activeProjects: [
    	{
    		id: 'active0090028', // job_status + 000 + unique_job_number
    		project_id:'proj0020019',
    		title: 'Kitchen expansion',
    		status: 'In progress',
    		client_id: 'u10000023cp',
    		vendor_id: '', // is empty untill a vendor is assigned to it.
    		post_date:'2025-06-12',
    		start_date: '',
    		due_date: '',
    		budget: 45000,				// for financial purposes
    		currency: 'NOK',
    	},
    	{
    		id: 'active01100128', // stands for active + job + 000 + unique_job_number
    		project_id:'proj0020019',
    		title: 'Kitchen expansion',
    		status: 'In progress',
    		client_id: 'u10000119cp',
    		vendor_id: 'u10000023vb', // note that this person is assigned to this job as a vendor
    		post_date:'2025-02-12',
    		start_date:'2025-07-11',
    		due_date: '2025-09-15',
    		budget: 31000,				// for financial purposes
    		currency: 'NOK',
    	},

    ],

    completedProjects: [
    	{
    		id: 'comp00900212', // stands for completed + job + 000 + unique_job_number
    		project_id:'proj0020019',
    		title: 'Driveway paving',
    		date: '2024-12-10',
    		client: 'u10000023cp',
    		vendor_id: 'u10000066vb', //should never be empty
    		vendor_rating: 5,
    		user_rating: 5,
    		post_date:'2025-06-12',
    		start_date:'2025-07-11',
    		finish_date:'2025-10-10',
    		due_date: '2025-10-15',
    		budget: 37000,				// for financial purposes
    		currency: 'NOK',
    		payment_verification: true
    	},
    	{
    		id: 'comp000132',
    		project_id:'proj0020019',
    		title: 'Concrete foundation',
    		date: '2024-11-05',
    		client: 'u10000023cp',
    		vendor_id: 'u10000010vb', //should never be empty
    		vendor_rating: 3,			// assigned to vendor
    		user_rating: 1,				//assigned to user
    		post_date:'2025-02-01',
    		start_date:'2025-04-11',
    		finish_date:'2025-10-15', //note it exceeded due date
    		due_date: '2025-10-15',
    		budget: 45000,
    		currency: 'NOK',
    		payment_verification: true
    	}
    ]

};






const vendorExtensionUserData: UserData = {
// NOTE; if a user has a vendor profile it should allways be visisble on their user profile, and their user_profile on their vendor profile.
// active projects related to vendor/user should be visible to each other if a project request is bought.
// this is to prevent middle-man-scamming

    owner_id: 'p10000010vb', //this data is added to owner_id's profiledatas to create the vendor profile
    company_name: 'Doe Construction AS',
    org_number: '123456789',
    fields_of_work: ['construction', 'renovation'],
    specializations: ['asfaltering', 'betong'],
    certificates: ['Certified Builder', 'Safety Certification'],
    description: 'Professional contractor with 15 years of experience in construction projects.',
    logo: 'https://randomuser.me/api/portraits/men/44.jpg',
    social: {
    	linkedin: 'https://linkedin.com/in/johndoe',
    	facebook: 'https://facebook.com/johndoe',
    	instagram: 'https://instagram.com/johndoe',
    	tiktok: 'https://tiktok.com/@johndoe',
    	homepage: 'https://doeconstruction.no',
    	proff: 'https://proff.no/selskap/doe-construction-as/123456789'
    },
    // these are only visible to owner:
    saved_filters:[

    	{
    		'ikke statlig':'oppdragsmarkedet.no/oppdrag&workfield=Elektriker&field_include=asfaltering%2Cbrønnboring&field_exclude=&job_attributes_include=&job_attributes_exclude=&job_poster=privat%2Cbedrift',
    	},
    ],

    followedClients:[
    		{
    		id: 'u10000023cp',
    		date: '2025-06-15',
    	},
    ],

    favorittedProjects: [
    	{
    		id: 'proj00900212',
    		title: 'Garage renovation',
    	},
    	{
    		id: 'proj0020019',
    		title: 'Bathroom remodeling',
    		// date: '2025-07-22',
    		// location: 'Oslo'
    	}
    ],

    wallets: {
    	balance: 5000,
    	transactions: [
    		{
    			id: 'txn1',
    			amount: 2000,
    			type: 'deposit',
    			description: 'Wallet top-up',
    			date: '2025-04-15'
    		},
    		{
    			id: 'txn2',
    			amount: 500,
    			type: 'purchase',
    			description: 'Premium listing access',
    			date: '2025-04-20'
    		}
    	]
    },

    financial_stats: {
    	totalEarned: 25000,
    	totalSpent: 5000,
    	transactions: [
    		{
    			id: 'fin1',
    			amount: 12000,
    			isIncome: true,
    			category: 'project_payment',
    			description: 'Bathroom remodeling payment',
    			date: '2024-12-15',
    			project_id: 'proj2'
    		},
    		{
    			id: 'fin2',
    			amount: 1500,
    			isIncome: false,
    			category: 'materials',
    			description: 'Building materials',
    			date: '2024-11-30'
    		}
    	]
    },

}

const ProjectProfile = {
// generated
id: 'proj0020019',
post_date:'2025-02-01',

    // these are fetched from the client's userData and Profile
    __client_username: 'johndoe',
    __client_first_name: 'John',
    __client_sur_name: 'Doe',
    __client_email: 'john.doe@example.com',
    __client_phone: '+47 123 45 678',
    _client_rating: 4.7,
    _client_attributes: ['verified_user','verified_payment','fast_replyer','received_complaints',],
    client_user_type: ['private'],

    // these are filled:
    location: 'Oslo, Norway',
    __address: 'Oslogaten 165b',
    _category: ['rørlegger', 'renovation'], // [category, sub_category]
    _experience_requirements:  ['fliselegging', 'betong'],
    _job_attributes: ['trapp', 'innejobb', 'enmannsjobb'],
    budget: 100000, //might make it __budget and add budget_lvl [$,$$,$$$,$$$$,open]
    due_date: '2025-10-15',
    title: 'Renovere Baderom 20kvm',
    _short_description: 'Renovere 20kvm baderom i andre etasje, har stort budsjett og åpen for design forslag',
    estimated_time: '00M:00W:14D:00h:00m',
    __long_description: "Søker erfaren rørlegger til totalrenovering av bad (20 kvm) Ønsker å komme i kontakt med en dyktig og pålitelig rørlegger for renovering av et ca. 20 kvm stort baderom. Jobben innebærer full oppussing, og jeg er åpen for forslag til løsninger og materialvalg. Kort om prosjektet: Totalrenovering av eksisterende bad Størrelse: ca. 20 kvm Ønsker inspirasjon og forslag til planløsning og materialer Oppstart etter avtale Kvalifikasjoner jeg ser etter: Erfaring med baderomsrenovering Godkjenninger i henhold til norske krav (f.eks. våtromsnorm) Referanser fra tidligere prosjekter Gjerne mulighet for befaring Ta kontakt for mer informasjon eller for å avtale befaring.",

    // these are assigned

    _favorittedCount: 0,
    _clicked:12,
    _bought: 2,
    ___assigned: 'u10000023vb',
    paid_listing: false,
    ___listing_priority_score: 0, //0 is the default. (can be negative) higher the score the further up the list it goes. you get points from tags like; choise, verified_user, long_time_user, etc. deduction of points for negative tags. paid_listings are allways above non_paid_listings.
    ___status: 'In progress',
    ___start_date:'2025-04-11',
    ___finish_date:'',

    // NOTE: variables starting with '_' are hidden untill the project is clicked by vendor and is for the large preview
    // NOTE: variables starting with '__' are hidden untill the project is bought by vendor
    // NOTE: variables starting with '___' are secret and used by backend

}
