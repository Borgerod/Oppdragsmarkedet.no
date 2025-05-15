// User Structure:

// user profile employee admin
// ****\_\_\_****|****************\_\_****************|******\_******|******\_******|
// | | | | |
// vendor client <-- linked employee admin
// | ****\_\_****|****\_\_\_****
// | | | |
// business business private government

structure of id: (id_type char)(user_role_extention char)[unique number](user_role char)(role_class char)[area_number]
example u 1 00000001 c b 1101\* \*1101 is kommunenummer, 11 in that number is fylke.

id_type: [u, p, e, a]
user_role_extention: [1-4] (number version of id_type)
id_number: [0000000-9999999]
user_role: [v, c] [v, c] [e] [a]
role_class: [b] [b, p, g] [] []
examples:
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
is_phone_verified: true,
location: 'Oslo, Norway',
location_data: { x: 10.7522, y: 59.9139 },
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
    		postDate:'2025-06-12',
    		startDate: '',
    		dueDate: '',
    		budget: 45000,				// for financial purposes
    		currency: nok,
    	},
    	{
    		id: 'active01100128', // stands for active + job + 000 + unique_job_number
    		project_id:'proj0020019',
    		title: 'Kitchen expansion',
    		status: 'In progress',
    		client_id: 'u10000119cp',
    		vendor_id: 'u10000023vb', // note that this person is assigned to this job as a vendor
    		postDate:'2025-02-12',
    		startDate:'2025-07-11',
    		dueDate: '2025-09-15',
    		budget: 31000,				// for financial purposes
    		currency: nok,
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
    		postDate:'2025-06-12',
    		startDate:'2025-07-11',
    		finishDate:'2025-10-10',
    		dueDate: '2025-10-15',
    		budget: 37000,				// for financial purposes
    		currency: nok,
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
    		postDate:'2025-02-01',
    		startDate:'2025-04-11',
    		finishDate:'2025-10-15', //note it exceeded due date
    		dueDate: '2025-10-15',
    		budget: 45000,
    		currency: nok,
    		payment_verification: true
    	}
    ]

};

transactions: [
{
type: 'incomming',
context:'payed listing',
refill:false, //empty/ignored if not payed listing
days:7, //empty/ignored if not payed listing
from:'u10000023cp',
amount:300.00,
currency:'NOK',
timestamp:'1742332927' (UNIX)
},
{
//? should wallets be withdrawable?
type: 'incomming',
context:'refill wallet',
refill:false, //empty/ignored if not payed listing
days:7, //empty/ignored if not payed listing
from:'u10000023vb',
amount:300.00,
currency:'NOK',
timestamp:'1742332927' (UNIX)
},
{
type: 'incomming',
context:'bought accsess',
refill:false, //empty/ignored if not payed listing
days:7, //empty/ignored if not payed listing
from:'u10000023vb',
amount:300.00,
currency:'NOK',
timestamp:'1742332927' (UNIX)
},

];

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

    following:[
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

    wallet: {
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
    			projectId: 'proj2'
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
postDate:'2025-02-01',

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
    dueDate: '2025-10-15',
    title: 'Renovere Baderom 20kvm',
    _short_description: 'Renovere 20kvm baderom i andre etasje, har stort budsjett og åpen for design forslag',
    estimated_time: '00M:00W:14D:00h:00m',
    __long_description: "Søker erfaren rørlegger til totalrenovering av bad (20 kvm) Ønsker å komme i kontakt med en dyktig og pålitelig rørlegger for renovering av et ca. 20 kvm stort baderom. Jobben innebærer full oppussing, og jeg er åpen for forslag til løsninger og materialvalg. Kort om prosjektet: Totalrenovering av eksisterende bad Størrelse: ca. 20 kvm Ønsker inspirasjon og forslag til planløsning og materialer Oppstart etter avtale Kvalifikasjoner jeg ser etter: Erfaring med baderomsrenovering Godkjenninger i henhold til norske krav (f.eks. våtromsnorm) Referanser fra tidligere prosjekter Gjerne mulighet for befaring Ta kontakt for mer informasjon eller for å avtale befaring.",

    // these are assigned

    _favorittedCount: 0,
    _clicked:12,
    _bought: 2,
    ___assigned: 'u10000023vb',
    payed_listing: false,
    ___listing_priority_score: 0, //0 is the default. (can be negative) higher the score the further up the list it goes. you get points from tags like; choise, verified_user, long_time_user, etc. deduction of points for negative tags. payed_listings are allways above non_payed_listings.
    ___status: 'In progress',
    ___startDate:'2025-04-11',
    ___finishDate:'',

    // NOTE: variables starting with '_' are hidden untill the project is clicked by vendor and is for the large preview
    // NOTE: variables starting with '__' are hidden untill the project is bought by vendor
    // NOTE: variables starting with '___' are secret and used by backend

}
