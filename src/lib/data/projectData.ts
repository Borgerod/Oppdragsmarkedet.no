// Project data for display in project listings

export interface Project {
	project_id: string;
	area: string;
	job_title: string;
	category: string;
	sub_category: string | null;
	lister_class: 'private' | 'business' | 'public';
	small_description: string;
	description: string;
	tags: string[];
	due_date: string;
	date_issued: string;
	heart: boolean;
	payed_listing: boolean;
	image_link: string;
}

// Generate a random project ID
const generateProjectId = (): string => {
	return Math.floor(Math.random() * 1000000000).toString();
};

export const projects: Project[] = [
	{
		project_id: generateProjectId(),
		area: 'Vestland, Bergen',
		job_title: 'Bygge terasse rundt baksiden',
		category: 'Carpenter',
		sub_category: null,
		lister_class: 'private',
		small_description:
			'Trenger hjelp til å bygge en terasse på baksiden av huset. Terassen skal være omtrent 20 kvadratmeter.',
		description:
			'Har en terasse som trenger å byttes ut, jeg ønsker ny terasse på baksiden av huset (ca 20km2), og trenger hjelp av en snekker.',
		tags: ['siteworks', 'deck', 'outdoor'],
		due_date: '30. Mai',
		date_issued: '9. Mai',
		heart: false,
		payed_listing: false,
		image_link: 'https://www.cadpro.com/wp-content/uploads/2013/09/deck-plan.jpg'
	},
	{
		project_id: generateProjectId(),
		area: 'Oslo, Frogner',
		job_title: 'Maler ønskes til fasade',
		category: 'Painter',
		sub_category: 'Exterior',
		lister_class: 'business',
		small_description:
			'Boligforening søker maler for oppussing av fasade på boligblokk fra 1930-tallet. Total fasadeflate ca 400 kvm.',
		description:
			'Vi er en boligforening i Oslo sentrum som trenger profesjonell hjelp til oppussing av fasade. Bygget er fra 1930-tallet og har originale detaljer som må bevares. Jobben inkluderer vask, skraping og maling. Vi ønsker å starte arbeidet så snart som mulig.',
		tags: ['fasade', 'heritage', 'professional'],
		due_date: '15. Juni',
		date_issued: '2. Mai',
		heart: false,
		payed_listing: true,
		image_link:
			'https://upload.wikimedia.org/wikipedia/commons/7/72/House_at_J%C3%A6ren_in_Norway_Garborgheimen.JPG'
	},
	{
		project_id: generateProjectId(),
		area: 'Tromsø, Sentrum',
		job_title: 'Boring av brønn',
		category: 'Plumber',
		sub_category: 'Drilling',
		lister_class: 'private',
		small_description:
			'Trenger å få boret brønn for vannforsyning til hytte. Ca 100 meter fra vei, må regne med tyngre utstyr.',
		description:
			'Har kjøpt hytte og trenger egen vannforsyning. Ønsker å få boret en brønn som kan gi stabilt vann året rundt. Hytta ligger i et område med mye fjell, så det kreves profesjonelt utstyr og erfaring.',
		tags: ['water', 'drilling', 'cabin', 'urgent'],
		due_date: '10. Juni',
		date_issued: '29. April',
		heart: false,
		payed_listing: false,
		image_link: 'https://i.pinimg.com/736x/70/97/6e/70976e6b44a4cfb10968252a696d0c04.jpg'
	},
	{
		project_id: generateProjectId(),
		area: 'Trondheim, Byåsen',
		job_title: 'Sparkling av begge soverom',
		category: 'Painter',
		sub_category: 'Interior',
		lister_class: 'private',
		small_description:
			'To soverom trenger sparkling og maling. Rommene er klargjort og tømt for møbler.',
		description:
			'Vi har nettopp flyttet inn i ny leilighet og ønsker å pusse opp begge soverommene. Veggene har noen hull og ujevnheter etter tidligere bilder og hyller. Vi trenger profesjonell hjelp til sparkling og maling for å få en perfekt overflate.',
		tags: ['interior', 'bedrooms', 'renovation'],
		due_date: '25. Mai',
		date_issued: '5. Mai',
		heart: true,
		payed_listing: false,
		image_link: 'https://i.pinimg.com/736x/4b/3a/82/4b3a82bc593d456b37f951bb55d83f81.jpg'
	},
	{
		project_id: generateProjectId(),
		area: 'Stavanger, Tasta',
		job_title: 'Kabling av nytt kontorlokale',
		category: 'Electrician',
		sub_category: 'Commercial',
		lister_class: 'business',
		small_description:
			'IT-selskap trenger komplett kabling av nytt kontorlokale på 300 kvm. Både strøm og nettverk.',
		description:
			'Vi flytter inn i nye lokaler og trenger fullstendig opplegg for strøm og nettverk. Totalt 20 arbeidsstasjoner, møterom med videokonferanse-utstyr, kjøkken og fellesarealer. Vi ønsker skjulte løsninger i vegger og tak der det er mulig. Må være ferdig innen oppstart i nye lokaler.',
		tags: ['IT', 'networking', 'commercial', 'certified'],
		due_date: '1. Juni',
		date_issued: '20. April',
		heart: false,
		payed_listing: true,
		image_link: 'https://i.pinimg.com/736x/c7/95/73/c7957353e44987b20a41b41985b576e6.jpg'
	},
	{
		project_id: generateProjectId(),
		area: 'Bergen, Laksevåg',
		job_title: 'Installere solcellepanel',
		category: 'Electrician',
		sub_category: 'Renewable',
		lister_class: 'business',
		small_description:
			'Borettslag søker tilbud på installasjon av solcellepaneler på tak. 10 bygninger med flate tak.',
		description:
			'Vi representerer et borettslag med 10 bygninger som ønsker å investere i solenergi. Vi har flate tak som egner seg godt for solcellepaneler. Totalt takareal tilgjengelig er ca 1500 kvm. Vi ønsker tilbud på installasjon, inkludert alt nødvendig utstyr og kobling til strømnettet. Må være ferdig sertifisert installatør med erfaring fra lignende prosjekter.',
		tags: ['solar', 'renewable', 'housing-cooperative', 'green'],
		due_date: '15. Juli',
		date_issued: '1. Mai',
		heart: false,
		payed_listing: true,
		image_link:
			'https://566971-www.web.tornado-node.net/wp-content/uploads/2018/04/Hedalm-Anebyhus-bilder_1110x624_2018_Rosendal_klassisk.jpg'
	},
	{
		project_id: generateProjectId(),
		area: 'Ålesund, Sentrum',
		job_title: 'Montering av kjøkken',
		category: 'Carpenter',
		sub_category: 'Interior',
		lister_class: 'private',
		small_description:
			'Nytt kjøkken fra IKEA trenger montering. Alt er kjøpt inn og befinner seg på stedet.',
		description:
			'Vi har kjøpt nytt kjøkken fra IKEA som trenger profesjonell montering. Alle deler er levert og står klare. Kjøkkenet er ca 12 kvm og inkluderer øy, integrerte hvitevarer og spesialtilpassede løsninger. Vi ønsker en håndverker med erfaring fra IKEA-kjøkken.',
		tags: ['kitchen', 'IKEA', 'mounting', 'installation'],
		due_date: '20. Mai',
		date_issued: '7. Mai',
		heart: true,
		payed_listing: false,
		image_link: 'https://i.pinimg.com/736x/7f/1d/0a/7f1d0ae5870e57fa598cf47aeb0b447b.jpg'
	},
	{
		project_id: generateProjectId(),
		area: 'Bodø, Hunstad',
		job_title: 'Ny garasjeport med automatisk åpner',
		category: 'Mechanic',
		sub_category: 'Garage',
		lister_class: 'private',
		small_description:
			'Ønsker å bytte ut gammel garasjeport med ny, inkludert automatisk portåpner med fjernkontroll.',
		description:
			'Eksisterende garasjeport er fra 90-tallet og trenger utskiftning. Vi ønsker en ny isolert port med moderne design og automatisk åpner. Garasjeåpning er standard størrelse, ca 240cm x 210cm. Ønsker tilbud på både port og montering.',
		tags: ['garage', 'automation', 'installation'],
		due_date: '30. Mai',
		date_issued: '3. Mai',
		heart: false,
		payed_listing: false,
		image_link: 'https://mora.no/wp-content/uploads/2021/08/Fotland-trend-lys.jpg'
	},
	{
		project_id: generateProjectId(),
		area: 'Kristiansand, Lund',
		job_title: 'Graving av tomt for nybygg',
		category: 'Machine Operator',
		sub_category: 'Excavation',
		lister_class: 'business',
		small_description:
			'Byggefirma søker maskinentreprenør for utgraving av tomt til enebolig. Tomt på 800 kvm.',
		description:
			'Vi er et lokalt byggefirma som skal sette opp en enebolig i Kristiansand. Vi trenger en erfaren maskinoperatør for utgraving av tomten før fundamentering. Tomten er på 800 kvm og krever ca 400 kubikk masse fjernet. Maskiner må være på plass innen en uke for å holde byggetidsplanen.',
		tags: ['excavation', 'construction', 'machinery', 'urgent'],
		due_date: '15. Mai',
		date_issued: '1. Mai',
		heart: false,
		payed_listing: true,
		image_link:
			'https://byggeboligblobstorage.blob.core.windows.net/imageoriginals/17cfb0bb1190a06cb253388d482670b8ab0a1be9.jpg?maxwidth=900'
	},
	{
		project_id: generateProjectId(),
		area: 'Tromsø, Tromsdalen',
		job_title: 'Varmepumpe installasjon',
		category: 'HVAC Technician',
		sub_category: 'Heating',
		lister_class: 'private',
		small_description:
			'Ønsker installasjon av luft-til-luft varmepumpe i enebolig fra 2010. Ca 150 kvm.',
		description:
			'Vi ønsker å få installert en moderne, energieffektiv varmepumpe i vår enebolig. Huset er fra 2010 og er ca 150 kvm fordelt på to etasjer. Vi har sett på Mitsubishi-modeller, men er åpne for anbefalinger fra fagfolk. Installasjonen må inkludere all nødvendig kabling og boring gjennom vegg.',
		tags: ['heating', 'energy-efficient', 'installation', 'winter'],
		due_date: '1. September',
		date_issued: '5. Mai',
		heart: false,
		payed_listing: false,
		image_link:
			'https://de462635d7.clvaw-cdnwnd.com/004b2d2905246109abb4231b8d5abe7e/200002286-6714c6714e/Multi_overs.png?ph=de462635d7'
	},
	{
		project_id: generateProjectId(),
		area: 'Bergen, Fyllingsdalen',
		job_title: 'Legging av panel i stue',
		category: 'Carpenter',
		sub_category: 'Flooring',
		lister_class: 'private',
		small_description:
			'Trenger hjelp til legging av eikeparkett i stue på ca 25 kvm. Gulvet er klargjort.',
		description:
			'Vi har kjøpt eikeparkett til vår stue og trenger en snekker for legging. Eksisterende gulvbelegg er fjernet, og undergulvet er jevnt. Stuen er ca 25 kvm, med en enkel rektangulær form. Vi har alle materialer på plass, inkludert parketten og underlag.',
		tags: ['flooring', 'parquet', 'oak', 'interior'],
		due_date: '25. Mai',
		date_issued: '8. Mai',
		heart: true,
		payed_listing: false,
		image_link:
			'https://cdn.sanity.io/images/m6nlvvfa/production/ffb3b3500f117be791f7119a6ce365f3aa9bf778-1280x720.jpg?w=3840&q=75&fm=webp&fit=clip'
	},
	{
		project_id: generateProjectId(),
		area: 'Oslo, Grünerløkka',
		job_title: 'Totalrenovering av bad 5kvm',
		category: 'Plumber',
		sub_category: 'Bathroom',
		lister_class: 'private',
		small_description:
			'Ønsker komplett renovering av lite bad i leilighet fra 1920-tallet. Godkjent for våtrom.',
		description:
			'Vi bor i en eldre bygård og trenger komplett renovering av badet vårt som er på ca 5 kvm. Arbeidet omfatter riving av eksisterende innredning, legging av membran, fliser, montering av ny servant, dusj og toalett. Badet må være godkjent for våtrom og arbeidet må utføres av fagfolk med våtromssertifikat. Vi har arkitekttegninger klare.',
		tags: ['bathroom', 'renovation', 'wetroom', 'certified', 'plumbing'],
		due_date: '30. Juni',
		date_issued: '2. Mai',
		heart: false,
		payed_listing: false,
		image_link:
			'https://cdn.prod.website-files.com/5c8f85a650ed9d042570a882/5d2f353744c1f9e9628222c9_AdobeStock_66744291.jpeg'
	},
	{
		project_id: generateProjectId(),
		area: 'Trondheim, Lade',
		job_title: 'Skifte av tak på enebolig',
		category: 'Roofer',
		sub_category: 'Residential',
		lister_class: 'private',
		small_description:
			'Enebolig fra 1980 trenger nytt tak. Ca 180 kvm takflate med standard takstein.',
		description:
			'Vi trenger å bytte ut taket på vår enebolig fra 1980. Takflaten er ca 180 kvm med en takvinkel på ca 30 grader. Vi ønsker å gå for klassisk takstein i teracotta farge. Arbeidet inkluderer fjerning av eksisterende takstein, kontroll av undertak og lekter, og legging av ny takstein. Stillas må inkluderes i tilbudet.',
		tags: ['roof', 'renovation', 'house', 'exterior'],
		due_date: '15. August',
		date_issued: '30. April',
		heart: false,
		payed_listing: true,
		image_link: 'https://i.pinimg.com/736x/cd/95/70/cd957091761a7e8a909476d4386730c4.jpg'
	},
	{
		project_id: generateProjectId(),
		area: 'Stavanger, Hillevåg',
		job_title: 'Bygging av carport',
		category: 'Carpenter',
		sub_category: 'Outdoor',
		lister_class: 'private',
		small_description:
			'Ønsker å bygge carport for to biler ved siden av eksisterende bolig. Ca 35 kvm.',
		description:
			'Vi ønsker å bygge en carport for to biler ved siden av huset vårt. Området er ca 6x6 meter og carporten skal ha saltak med takstein som matcher huset. Vi har allerede støpt støttemur mot nabotomt. Carporten skal ikke ha vegger, kun stolper og tak. Vi har tegninger klare men mangler byggesøknadspapirer.',
		tags: ['carport', 'construction', 'outdoor', 'woodwork'],
		due_date: '1. Juli',
		date_issued: '6. Mai',
		heart: false,
		payed_listing: false,
		image_link: 'https://www.cadpro.com/wp-content/uploads/2013/09/deck-plan.jpg'
	},
	{
		project_id: generateProjectId(),
		area: 'Bergen, Sandviken',
		job_title: 'Utskifting av vinduer i verneverdig bygg',
		category: 'Carpenter',
		sub_category: 'Windows',
		lister_class: 'business',
		small_description:
			'Sameie trenger utskifting av 24 vinduer i verneverdig bygård fra 1904. Må følge antikvariske prinsipper.',
		description:
			'Vi representerer et sameie i en verneverdig bygård fra 1904. Vi trenger å skifte ut 24 vinduer som er i dårlig stand. Utskiftingen må følge antikvariske prinsipper og godkjennes av Byantikvaren. Vinduene skal se identiske ut med de originale, men med moderne isolering og funksjoner. Vi trenger en snekker med erfaring fra verneverdige bygg.',
		tags: ['heritage', 'windows', 'renovation', 'professional', 'historical'],
		due_date: '30. September',
		date_issued: '5. Mai',
		heart: false,
		payed_listing: true,
		image_link:
			'https://upload.wikimedia.org/wikipedia/commons/7/72/House_at_J%C3%A6ren_in_Norway_Garborgheimen.JPG'
	},
	{
		project_id: generateProjectId(),
		area: 'Oslo, Nydalen',
		job_title: 'Oppussing av kontorlandskap',
		category: 'Painter',
		sub_category: 'Commercial',
		lister_class: 'business',
		small_description:
			'IT-selskap trenger oppussing av kontorlokaler på 400 kvm. Maling, gulvlegging og noe snekkerarbeid.',
		description:
			'Vi er et voksende IT-selskap som trenger å fornye våre kontorlokaler. Lokalene er ca 400 kvm og trenger ny maling (vegg og tak), nytt vinylgulv i fellesarealer, og noen tilpasninger med lettvegger for å skape bedre arbeidsflyt. Arbeidet må utføres effektivt, helst over en langhelg eller en ferieperiode for minimal forstyrrelse av arbeidsdagen.',
		tags: ['office', 'commercial', 'renovation', 'professional', 'deadline'],
		due_date: '15. Juli',
		date_issued: '3. Mai',
		heart: false,
		payed_listing: true,
		image_link: 'https://i.pinimg.com/736x/04/9a/27/049a27597a6964e54b280e0342571566.jpg'
	}
];
