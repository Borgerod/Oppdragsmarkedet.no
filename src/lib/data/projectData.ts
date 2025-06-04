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

// export const projects: Project[] = [
// {
// 	project_id: generateProjectId(),
// 	area: 'Vestland, Bergen',
// 	job_title: 'Bygge terasse rundt baksiden',
// 	category: 'Carpenter',
// 	sub_category: null,
// 	lister_class: 'private',
// 	small_description:
// 		'Trenger hjelp til å bygge en terasse på baksiden av huset. Terassen skal være omtrent 20 kvadratmeter.',
// 	description:
// 		'Har en terasse som trenger å byttes ut, jeg ønsker ny terasse på baksiden av huset (ca 20km2), og trenger hjelp av en snekker.',
// 	tags: ['siteworks', 'deck', 'outdoor'],
// 	due_date: '30. Mai',
// 	date_issued: '9. Mai',
// 	heart: false,
// 	payed_listing: false,
// 	image_link: 'https://www.cadpro.com/wp-content/uploads/2013/09/deck-plan.jpg'
// },
// {
// 	project_id: generateProjectId(),
// 	area: 'Oslo, Frogner',
// 	job_title: 'Maler ønskes til fasade',
// 	category: 'Painter',
// 	sub_category: 'Exterior',
// 	lister_class: 'business',
// 	small_description:
// 		'Boligforening søker maler for oppussing av fasade på boligblokk fra 1930-tallet. Total fasadeflate ca 400 kvm.',
// 	description:
// 		'Vi er en boligforening i Oslo sentrum som trenger profesjonell hjelp til oppussing av fasade. Bygget er fra 1930-tallet og har originale detaljer som må bevares. Jobben inkluderer vask, skraping og maling. Vi ønsker å starte arbeidet så snart som mulig.',
// 	tags: ['fasade', 'heritage', 'professional'],
// 	due_date: '15. Juni',
// 	date_issued: '2. Mai',
// 	heart: false,
// 	payed_listing: true,
// 	image_link:
// 		'https://upload.wikimedia.org/wikipedia/commons/7/72/House_at_J%C3%A6ren_in_Norway_Garborgheimen.JPG'
// },
// {
// 	project_id: generateProjectId(),
// 	area: 'Tromsø, Sentrum',
// 	job_title: 'Boring av brønn',
// 	category: 'Plumber',
// 	sub_category: 'Drilling',
// 	lister_class: 'private',
// 	small_description:
// 		'Trenger å få boret brønn for vannforsyning til hytte. Ca 100 meter fra vei, må regne med tyngre utstyr.',
// 	description:
// 		'Har kjøpt hytte og trenger egen vannforsyning. Ønsker å få boret en brønn som kan gi stabilt vann året rundt. Hytta ligger i et område med mye fjell, så det kreves profesjonelt utstyr og erfaring.',
// 	tags: ['water', 'drilling', 'cabin', 'urgent'],
// 	due_date: '10. Juni',
// 	date_issued: '29. April',
// 	heart: false,
// 	payed_listing: false,
// 	image_link: 'https://i.pinimg.com/736x/70/97/6e/70976e6b44a4cfb10968252a696d0c04.jpg'
// },
// {
// 	project_id: generateProjectId(),
// 	area: 'Trondheim, Byåsen',
// 	job_title: 'Sparkling av begge soverom',
// 	category: 'Painter',
// 	sub_category: 'Interior',
// 	lister_class: 'private',
// 	small_description:
// 		'To soverom trenger sparkling og maling. Rommene er klargjort og tømt for møbler.',
// 	description:
// 		'Vi har nettopp flyttet inn i ny leilighet og ønsker å pusse opp begge soverommene. Veggene har noen hull og ujevnheter etter tidligere bilder og hyller. Vi trenger profesjonell hjelp til sparkling og maling for å få en perfekt overflate.',
// 	tags: ['interior', 'bedrooms', 'renovation'],
// 	due_date: '25. Mai',
// 	date_issued: '5. Mai',
// 	heart: true,
// 	payed_listing: false,
// 	image_link: 'https://i.pinimg.com/736x/4b/3a/82/4b3a82bc593d456b37f951bb55d83f81.jpg'
// },
// {
// 	project_id: generateProjectId(),
// 	area: 'Stavanger, Tasta',
// 	job_title: 'Kabling av nytt kontorlokale',
// 	category: 'Electrician',
// 	sub_category: 'Commercial',
// 	lister_class: 'business',
// 	small_description:
// 		'IT-selskap trenger komplett kabling av nytt kontorlokale på 300 kvm. Både strøm og nettverk.',
// 	description:
// 		'Vi flytter inn i nye lokaler og trenger fullstendig opplegg for strøm og nettverk. Totalt 20 arbeidsstasjoner, møterom med videokonferanse-utstyr, kjøkken og fellesarealer. Vi ønsker skjulte løsninger i vegger og tak der det er mulig. Må være ferdig innen oppstart i nye lokaler.',
// 	tags: ['IT', 'networking', 'commercial', 'certified'],
// 	due_date: '1. Juni',
// 	date_issued: '20. April',
// 	heart: false,
// 	payed_listing: true,
// 	image_link: 'https://i.pinimg.com/736x/c7/95/73/c7957353e44987b20a41b41985b576e6.jpg'
// },
// {
// 	project_id: generateProjectId(),
// 	area: 'Bergen, Laksevåg',
// 	job_title: 'Installere solcellepanel',
// 	category: 'Electrician',
// 	sub_category: 'Renewable',
// 	lister_class: 'business',
// 	small_description:
// 		'Borettslag søker tilbud på installasjon av solcellepaneler på tak. 10 bygninger med flate tak.',
// 	description:
// 		'Vi representerer et borettslag med 10 bygninger som ønsker å investere i solenergi. Vi har flate tak som egner seg godt for solcellepaneler. Totalt takareal tilgjengelig er ca 1500 kvm. Vi ønsker tilbud på installasjon, inkludert alt nødvendig utstyr og kobling til strømnettet. Må være ferdig sertifisert installatør med erfaring fra lignende prosjekter.',
// 	tags: ['solar', 'renewable', 'housing-cooperative', 'green'],
// 	due_date: '15. Juli',
// 	date_issued: '1. Mai',
// 	heart: false,
// 	payed_listing: true,
// 	image_link:
// 		'https://566971-www.web.tornado-node.net/wp-content/uploads/2018/04/Hedalm-Anebyhus-bilder_1110x624_2018_Rosendal_klassisk.jpg'
// },
// {
// 	project_id: generateProjectId(),
// 	area: 'Ålesund, Sentrum',
// 	job_title: 'Montering av kjøkken',
// 	category: 'Carpenter',
// 	sub_category: 'Interior',
// 	lister_class: 'private',
// 	small_description:
// 		'Nytt kjøkken fra IKEA trenger montering. Alt er kjøpt inn og befinner seg på stedet.',
// 	description:
// 		'Vi har kjøpt nytt kjøkken fra IKEA som trenger profesjonell montering. Alle deler er levert og står klare. Kjøkkenet er ca 12 kvm og inkluderer øy, integrerte hvitevarer og spesialtilpassede løsninger. Vi ønsker en håndverker med erfaring fra IKEA-kjøkken.',
// 	tags: ['kitchen', 'IKEA', 'mounting', 'installation'],
// 	due_date: '20. Mai',
// 	date_issued: '7. Mai',
// 	heart: true,
// 	payed_listing: false,
// 	image_link: 'https://i.pinimg.com/736x/7f/1d/0a/7f1d0ae5870e57fa598cf47aeb0b447b.jpg'
// },
// {
// 	project_id: generateProjectId(),
// 	area: 'Bodø, Hunstad',
// 	job_title: 'Ny garasjeport med automatisk åpner',
// 	category: 'Mechanic',
// 	sub_category: 'Garage',
// 	lister_class: 'private',
// 	small_description:
// 		'Ønsker å bytte ut gammel garasjeport med ny, inkludert automatisk portåpner med fjernkontroll.',
// 	description:
// 		'Eksisterende garasjeport er fra 90-tallet og trenger utskiftning. Vi ønsker en ny isolert port med moderne design og automatisk åpner. Garasjeåpning er standard størrelse, ca 240cm x 210cm. Ønsker tilbud på både port og montering.',
// 	tags: ['garage', 'automation', 'installation'],
// 	due_date: '30. Mai',
// 	date_issued: '3. Mai',
// 	heart: false,
// 	payed_listing: false,
// 	image_link: 'https://mora.no/wp-content/uploads/2021/08/Fotland-trend-lys.jpg'
// },
// {
// 	project_id: generateProjectId(),
// 	area: 'Kristiansand, Lund',
// 	job_title: 'Graving av tomt for nybygg',
// 	category: 'Machine Operator',
// 	sub_category: 'Excavation',
// 	lister_class: 'business',
// 	small_description:
// 		'Byggefirma søker maskinentreprenør for utgraving av tomt til enebolig. Tomt på 800 kvm.',
// 	description:
// 		'Vi er et lokalt byggefirma som skal sette opp en enebolig i Kristiansand. Vi trenger en erfaren maskinoperatør for utgraving av tomten før fundamentering. Tomten er på 800 kvm og krever ca 400 kubikk masse fjernet. Maskiner må være på plass innen en uke for å holde byggetidsplanen.',
// 	tags: ['excavation', 'construction', 'machinery', 'urgent'],
// 	due_date: '15. Mai',
// 	date_issued: '1. Mai',
// 	heart: false,
// 	payed_listing: true,
// 	image_link:
// 		'https://byggeboligblobstorage.blob.core.windows.net/imageoriginals/17cfb0bb1190a06cb253388d482670b8ab0a1be9.jpg?maxwidth=900'
// },
// {
// 	project_id: generateProjectId(),
// 	area: 'Tromsø, Tromsdalen',
// 	job_title: 'Varmepumpe installasjon',
// 	category: 'HVAC Technician',
// 	sub_category: 'Heating',
// 	lister_class: 'private',
// 	small_description:
// 		'Ønsker installasjon av luft-til-luft varmepumpe i enebolig fra 2010. Ca 150 kvm.',
// 	description:
// 		'Vi ønsker å få installert en moderne, energieffektiv varmepumpe i vår enebolig. Huset er fra 2010 og er ca 150 kvm fordelt på to etasjer. Vi har sett på Mitsubishi-modeller, men er åpne for anbefalinger fra fagfolk. Installasjonen må inkludere all nødvendig kabling og boring gjennom vegg.',
// 	tags: ['heating', 'energy-efficient', 'installation', 'winter'],
// 	due_date: '1. September',
// 	date_issued: '5. Mai',
// 	heart: false,
// 	payed_listing: false,
// 	image_link:
// 		'https://de462635d7.clvaw-cdnwnd.com/004b2d2905246109abb4231b8d5abe7e/200002286-6714c6714e/Multi_overs.png?ph=de462635d7'
// },
// {
// 	project_id: generateProjectId(),
// 	area: 'Bergen, Fyllingsdalen',
// 	job_title: 'Legging av panel i stue',
// 	category: 'Carpenter',
// 	sub_category: 'Flooring',
// 	lister_class: 'private',
// 	small_description:
// 		'Trenger hjelp til legging av eikeparkett i stue på ca 25 kvm. Gulvet er klargjort.',
// 	description:
// 		'Vi har kjøpt eikeparkett til vår stue og trenger en snekker for legging. Eksisterende gulvbelegg er fjernet, og undergulvet er jevnt. Stuen er ca 25 kvm, med en enkel rektangulær form. Vi har alle materialer på plass, inkludert parketten og underlag.',
// 	tags: ['flooring', 'parquet', 'oak', 'interior'],
// 	due_date: '25. Mai',
// 	date_issued: '8. Mai',
// 	heart: true,
// 	payed_listing: false,
// 	image_link:
// 		'https://cdn.sanity.io/images/m6nlvvfa/production/ffb3b3500f117be791f7119a6ce365f3aa9bf778-1280x720.jpg?w=3840&q=75&fm=webp&fit=clip'
// },
// {
// 	project_id: generateProjectId(),
// 	area: 'Oslo, Grünerløkka',
// 	job_title: 'Totalrenovering av bad 5kvm',
// 	category: 'Plumber',
// 	sub_category: 'Bathroom',
// 	lister_class: 'private',
// 	small_description:
// 		'Ønsker komplett renovering av lite bad i leilighet fra 1920-tallet. Godkjent for våtrom.',
// 	description:
// 		'Vi bor i en eldre bygård og trenger komplett renovering av badet vårt som er på ca 5 kvm. Arbeidet omfatter riving av eksisterende innredning, legging av membran, fliser, montering av ny servant, dusj og toalett. Badet må være godkjent for våtrom og arbeidet må utføres av fagfolk med våtromssertifikat. Vi har arkitekttegninger klare.',
// 	tags: ['bathroom', 'renovation', 'wetroom', 'certified', 'plumbing'],
// 	due_date: '30. Juni',
// 	date_issued: '2. Mai',
// 	heart: false,
// 	payed_listing: false,
// 	image_link:
// 		'https://cdn.prod.website-files.com/5c8f85a650ed9d042570a882/5d2f353744c1f9e9628222c9_AdobeStock_66744291.jpeg'
// },
// {
// 	project_id: generateProjectId(),
// 	area: 'Trondheim, Lade',
// 	job_title: 'Skifte av tak på enebolig',
// 	category: 'Roofer',
// 	sub_category: 'Residential',
// 	lister_class: 'private',
// 	small_description:
// 		'Enebolig fra 1980 trenger nytt tak. Ca 180 kvm takflate med standard takstein.',
// 	description:
// 		'Vi trenger å bytte ut taket på vår enebolig fra 1980. Takflaten er ca 180 kvm med en takvinkel på ca 30 grader. Vi ønsker å gå for klassisk takstein i teracotta farge. Arbeidet inkluderer fjerning av eksisterende takstein, kontroll av undertak og lekter, og legging av ny takstein. Stillas må inkluderes i tilbudet.',
// 	tags: ['roof', 'renovation', 'house', 'exterior'],
// 	due_date: '15. August',
// 	date_issued: '30. April',
// 	heart: false,
// 	payed_listing: true,
// 	image_link: 'https://i.pinimg.com/736x/cd/95/70/cd957091761a7e8a909476d4386730c4.jpg'
// },
// {
// 	project_id: generateProjectId(),
// 	area: 'Stavanger, Hillevåg',
// 	job_title: 'Bygging av carport',
// 	category: 'Carpenter',
// 	sub_category: 'Outdoor',
// 	lister_class: 'private',
// 	small_description:
// 		'Ønsker å bygge carport for to biler ved siden av eksisterende bolig. Ca 35 kvm.',
// 	description:
// 		'Vi ønsker å bygge en carport for to biler ved siden av huset vårt. Området er ca 6x6 meter og carporten skal ha saltak med takstein som matcher huset. Vi har allerede støpt støttemur mot nabotomt. Carporten skal ikke ha vegger, kun stolper og tak. Vi har tegninger klare men mangler byggesøknadspapirer.',
// 	tags: ['carport', 'construction', 'outdoor', 'woodwork'],
// 	due_date: '1. Juli',
// 	date_issued: '6. Mai',
// 	heart: false,
// 	payed_listing: false,
// 	image_link: 'https://www.cadpro.com/wp-content/uploads/2013/09/deck-plan.jpg'
// },
// {
// 	project_id: generateProjectId(),
// 	area: 'Bergen, Sandviken',
// 	job_title: 'Utskifting av vinduer i verneverdig bygg',
// 	category: 'Carpenter',
// 	sub_category: 'Windows',
// 	lister_class: 'business',
// 	small_description:
// 		'Sameie trenger utskifting av 24 vinduer i verneverdig bygård fra 1904. Må følge antikvariske prinsipper.',
// 	description:
// 		'Vi representerer et sameie i en verneverdig bygård fra 1904. Vi trenger å skifte ut 24 vinduer som er i dårlig stand. Utskiftingen må følge antikvariske prinsipper og godkjennes av Byantikvaren. Vinduene skal se identiske ut med de originale, men med moderne isolering og funksjoner. Vi trenger en snekker med erfaring fra verneverdige bygg.',
// 	tags: ['heritage', 'windows', 'renovation', 'professional', 'historical'],
// 	due_date: '30. September',
// 	date_issued: '5. Mai',
// 	heart: false,
// 	payed_listing: true,
// 	image_link:
// 		'https://upload.wikimedia.org/wikipedia/commons/7/72/House_at_J%C3%A6ren_in_Norway_Garborgheimen.JPG'
// },
// {
// 	project_id: generateProjectId(),
// 	area: 'Oslo, Nydalen',
// 	job_title: 'Oppussing av kontorlandskap',
// 	category: 'Painter',
// 	sub_category: 'Commercial',
// 	lister_class: 'business',
// 	small_description:
// 		'IT-selskap trenger oppussing av kontorlokaler på 400 kvm. Maling, gulvlegging og noe snekkerarbeid.',
// 	description:
// 		'Vi er et voksende IT-selskap som trenger å fornye våre kontorlokaler. Lokalene er ca 400 kvm og trenger ny maling (vegg og tak), nytt vinylgulv i fellesarealer, og noen tilpasninger med lettvegger for å skape bedre arbeidsflyt. Arbeidet må utføres effektivt, helst over en langhelg eller en ferieperiode for minimal forstyrrelse av arbeidsdagen.',
// 	tags: ['office', 'commercial', 'renovation', 'professional', 'deadline'],
// 	due_date: '15. Juli',
// 	date_issued: '3. Mai',
// 	heart: false,
// 	payed_listing: true,
// 	image_link: 'https://i.pinimg.com/736x/04/9a/27/049a27597a6964e54b280e0342571566.jpg'
// }

// ];

export const projects = [
	{
		id: 'pro91827364510',
		clientId: 'u42198376510',
		vendorId: null,
		title: 'Renovering av bad i eldre leilighet',
		shortDescription:
			'Totalrenovering av bad på 6 kvm i bygård fra 1930. Må følge våtromsstandard.',
		longDescription:
			'Vi bor i en leilighet i en verneverdig bygård fra 1930-tallet og trenger en komplett renovering av badet. Rommet er ca 6 kvm og krever full oppgradering inkludert nye rør, membran, fliser, servant, dusj og toalett. Arbeidet må utføres i henhold til gjeldende våtromsstandard og av fagfolk med dokumentert kompetanse. Vi har allerede innhentet tillatelse fra sameiet.',
		location: 'Oslo, Grünerløkka',
		address: 'Thorvald Meyers gate 45',
		category: 'Plumber',
		experienceRequirements: ['Bathroom', 'Renovation'],
		jobAttributes: ['Våtrom', 'Flislegging', 'Rørarbeid', 'Membran'],
		thumbnailImageLink:
			'https://cdn.prod.website-files.com/5c8f85a650ed9d042570a882/5d2f353744c1f9e9628222c9_AdobeStock_66744291.jpeg',
		imageGallery: [
			'https://cdn.prod.website-files.com/5c8f85a650ed9d042570a882/5d2f353744c1f9e9628222c9_AdobeStock_66744291.jpeg',
			'https://i.pinimg.com/736x/4b/3a/82/4b3a82bc593d456b37f951bb55d83f81.jpg',
			'https://mora.no/wp-content/uploads/2021/08/Fotland-trend-lys.jpg'
		],
		postDate: '2025-04-02 10:15:00',
		startDate: '2025-05-15 08:00:00',
		dueDate: '2025-06-30 16:00:00',
		finishDate: null,
		estimatedTime: '3 uker',
		budget: 150000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'private',
		isActive: true,
		favoritedCount: 12,
		viewCount: 87,
		purchaseCount: 0,
		paidListing: true,
		listingPriorityScore: 72,
		vendorRating: null,
		clientRating: 4.8
	},
	{
		id: 'pro26374819502',
		clientId: 'u57294618390',
		vendorId: null,
		title: 'Installasjon av varmepumpe',
		shortDescription: 'Luft-til-luft varmepumpe ønskes montert i enebolig fra 2008, ca 180 kvm.',
		longDescription:
			'Vi ønsker å installere en energieffektiv luft-til-luft varmepumpe i vår enebolig for å redusere strømutgifter. Huset er på ca 180 kvm fordelt på to etasjer med åpen planløsning i første etasje. Vi har sett på modeller fra Mitsubishi og Daikin, men er åpne for anbefalinger fra fagpersoner. Installasjonen må inkludere boring gjennom yttervegg og all nødvendig kabling.',
		location: 'Trondheim, Ranheim',
		address: 'Ranheimsveien 123',
		category: 'HVAC Technician',
		experienceRequirements: ['Heating', 'Ventilation'],
		jobAttributes: ['Energieffektivisering', 'Oppvarming', 'Inneklima'],
		thumbnailImageLink:
			'https://de462635d7.clvaw-cdnwnd.com/004b2d2905246109abb4231b8d5abe7e/200002286-6714c6714e/Multi_overs.png?ph=de462635d7',
		imageGallery: [
			'https://de462635d7.clvaw-cdnwnd.com/004b2d2905246109abb4231b8d5abe7e/200002286-6714c6714e/Multi_overs.png?ph=de462635d7',
			'https://i.pinimg.com/736x/cd/95/70/cd957091761a7e8a909476d4386730c4.jpg',
			'https://566971-www.web.tornado-node.net/wp-content/uploads/2018/04/Hedalm-Anebyhus-bilder_1110x624_2018_Rosendal_klassisk.jpg'
		],
		postDate: '2025-04-10 14:30:00',
		startDate: '2025-05-01 09:00:00',
		dueDate: '2025-05-15 17:00:00',
		finishDate: null,
		estimatedTime: '1-2 dager',
		budget: 32000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'private',
		isActive: true,
		favoritedCount: 8,
		viewCount: 65,
		purchaseCount: 0,
		paidListing: false,
		listingPriorityScore: 42,
		vendorRating: null,
		clientRating: 4.9
	},
	{
		id: 'pro73910285647',
		clientId: 'u18374659201',
		vendorId: null,
		title: 'Utskifting av vinduer i enebolig',
		shortDescription:
			'Trenger å bytte ut 8 vinduer i enebolig fra 90-tallet. Ønsker energieffektive løsninger.',
		longDescription:
			'Vi ønsker å bytte ut 8 vinduer i vår enebolig fra 1992. Dagens vinduer er originale og har dårlig isolasjonsevne. Vi søker en erfaren snekker som kan demontere eksisterende vinduer og montere nye med høy isolasjonsverdi. Vinduene har standard størrelser, men ett av dem er et hjørnevindu som krever spesialtilpasning. Vi har ikke kjøpt vinduer ennå og ønsker råd om gode alternativer.',
		location: 'Stavanger, Madla',
		address: 'Madlaveien 78',
		category: 'Carpenter',
		experienceRequirements: ['Windows', 'Installation'],
		jobAttributes: ['Energieffektivisering', 'Isolasjon', 'Håndverk'],
		thumbnailImageLink:
			'https://upload.wikimedia.org/wikipedia/commons/7/72/House_at_J%C3%A6ren_in_Norway_Garborgheimen.JPG',
		imageGallery: [
			'https://upload.wikimedia.org/wikipedia/commons/7/72/House_at_J%C3%A6ren_in_Norway_Garborgheimen.JPG',
			'https://mora.no/wp-content/uploads/2021/08/Fotland-trend-lys.jpg',
			'https://i.pinimg.com/736x/cd/95/70/cd957091761a7e8a909476d4386730c4.jpg'
		],
		postDate: '2025-04-05 09:45:00',
		startDate: '2025-05-20 08:00:00',
		dueDate: '2025-06-10 16:00:00',
		finishDate: null,
		estimatedTime: '5 dager',
		budget: 85000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'private',
		isActive: true,
		favoritedCount: 15,
		viewCount: 92,
		purchaseCount: 0,
		paidListing: false,
		listingPriorityScore: 56,
		vendorRating: null,
		clientRating: 4.5
	},
	{
		id: 'pro48291037564',
		clientId: 'u63728105942',
		vendorId: null,
		title: 'Fasaderehabilitering av boligblokk',
		shortDescription:
			'Borettslag søker entreprenør for fasaderehabilitering av 5-etasjes blokk fra 1970-tallet.',
		longDescription:
			'Vi representerer et borettslag med 42 leiligheter fordelt på 5 etasjer. Bygget er fra 1972 og trenger omfattende fasaderehabilitering. Arbeidet inkluderer utskifting av kledning, etterisolering, nye beslag rundt vinduer og dører, samt maling. Total fasadeflate er ca 1200 kvm. Vi har tekniske tegninger og tilstandsrapport tilgjengelig. Prosjektet må gjennomføres i henhold til gjeldende tekniske forskrifter og med minimal forstyrrelse for beboerne.',
		location: 'Bergen, Fyllingsdalen',
		address: 'Løvåsbakken 20',
		category: 'Contractor',
		experienceRequirements: ['Facade', 'Renovation'],
		jobAttributes: ['Borettslag', 'Isolasjon', 'Kledning', 'Maling'],
		thumbnailImageLink:
			'https://566971-www.web.tornado-node.net/wp-content/uploads/2018/04/Hedalm-Anebyhus-bilder_1110x624_2018_Rosendal_klassisk.jpg',
		imageGallery: [
			'https://566971-www.web.tornado-node.net/wp-content/uploads/2018/04/Hedalm-Anebyhus-bilder_1110x624_2018_Rosendal_klassisk.jpg',
			'https://upload.wikimedia.org/wikipedia/commons/7/72/House_at_J%C3%A6ren_in_Norway_Garborgheimen.JPG',
			'https://i.pinimg.com/736x/c7/95/73/c7957353e44987b20a41b41985b576e6.jpg'
		],
		postDate: '2025-03-15 11:30:00',
		startDate: '2025-06-01 07:00:00',
		dueDate: '2025-09-30 16:00:00',
		finishDate: null,
		estimatedTime: '3-4 måneder',
		budget: 3500000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'business',
		isActive: true,
		favoritedCount: 27,
		viewCount: 183,
		purchaseCount: 0,
		paidListing: true,
		listingPriorityScore: 91,
		vendorRating: null,
		clientRating: 4.7
	},
	{
		id: 'pro31782940651',
		clientId: 'u28173946520',
		vendorId: null,
		title: 'Legging av parkett i stue og gang',
		shortDescription:
			'Trenger håndverker for legging av eikeparkett i stue (25 kvm) og gang (10 kvm).',
		longDescription:
			'Vi har kjøpt eikeparkett til vår stue og gang og trenger en dyktig håndverker for legging. Dagens gulv er laminat som skal fjernes. Undergulvet er betong. Total flate er ca 35 kvm fordelt på stue (25 kvm) og gang (10 kvm). Vi har alle materialer klare, inkludert parkett, underlag og lister. Ønsker profesjonelt utført arbeid med fint resultat rundt døråpninger og overganger.',
		location: 'Oslo, Lambertseter',
		address: 'Langbølgen 15',
		category: 'Carpenter',
		experienceRequirements: ['Flooring', 'Interior'],
		jobAttributes: ['Parkett', 'Gulvlegging', 'Interiør'],
		thumbnailImageLink:
			'https://cdn.sanity.io/images/m6nlvvfa/production/ffb3b3500f117be791f7119a6ce365f3aa9bf778-1280x720.jpg?w=3840&q=75&fm=webp&fit=clip',
		imageGallery: [
			'https://cdn.sanity.io/images/m6nlvvfa/production/ffb3b3500f117be791f7119a6ce365f3aa9bf778-1280x720.jpg?w=3840&q=75&fm=webp&fit=clip',
			'https://i.pinimg.com/736x/7f/1d/0a/7f1d0ae5870e57fa598cf47aeb0b447b.jpg',
			'https://i.pinimg.com/736x/4b/3a/82/4b3a82bc593d456b37f951bb55d83f81.jpg'
		],
		postDate: '2025-04-12 16:20:00',
		startDate: '2025-05-02 09:00:00',
		dueDate: '2025-05-10 18:00:00',
		finishDate: null,
		estimatedTime: '2-3 dager',
		budget: 15000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'private',
		isActive: true,
		favoritedCount: 6,
		viewCount: 47,
		purchaseCount: 0,
		paidListing: false,
		listingPriorityScore: 38,
		vendorRating: null,
		clientRating: 4.2
	},
	{
		id: 'pro56291034782',
		clientId: 'u91283740562',
		vendorId: null,
		title: 'Nytt tak på enebolig',
		shortDescription:
			'Enebolig fra 1985 trenger nytt tak. Takflate ca 170 kvm med standard takstein.',
		longDescription:
			'Vi trenger å bytte ut taket på vår enebolig fra 1985. Det er lekkasjer og flere takstein er ødelagte. Takflaten er ca 170 kvm med en takvinkel på 35 grader. Vi ønsker å gå for moderne betongtakstein i mørk grå farge. Arbeidet inkluderer fjerning av eksisterende takstein, kontroll og eventuell utbedring av undertak og lekter, og legging av ny takstein. Vi trenger også nye takrenner og nedløp. Stillas må inkluderes i tilbudet.',
		location: 'Kristiansand, Lund',
		address: 'Lundsiden 42',
		category: 'Roofer',
		experienceRequirements: ['Residential', 'Roofing'],
		jobAttributes: ['Tak', 'Takstein', 'Takrenner', 'Utbedring'],
		thumbnailImageLink: 'https://i.pinimg.com/736x/cd/95/70/cd957091761a7e8a909476d4386730c4.jpg',
		imageGallery: [
			'https://i.pinimg.com/736x/cd/95/70/cd957091761a7e8a909476d4386730c4.jpg',
			'https://upload.wikimedia.org/wikipedia/commons/7/72/House_at_J%C3%A6ren_in_Norway_Garborgheimen.JPG',
			'https://mora.no/wp-content/uploads/2021/08/Fotland-trend-lys.jpg'
		],
		postDate: '2025-03-28 13:40:00',
		startDate: '2025-06-15 07:00:00',
		dueDate: '2025-07-15 16:00:00',
		finishDate: null,
		estimatedTime: '2 uker',
		budget: 195000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'private',
		isActive: true,
		favoritedCount: 19,
		viewCount: 108,
		purchaseCount: 0,
		paidListing: true,
		listingPriorityScore: 76,
		vendorRating: null,
		clientRating: 4.6
	},
	{
		id: 'pro82910456372',
		clientId: 'u54628109735',
		vendorId: null,
		title: 'Installasjon av solcellepaneler',
		shortDescription: 'Ønsker montering av solcellepaneler på enebolig. Sørvendt tak på ca 50 kvm.',
		longDescription:
			'Vi ønsker å installere solcellepaneler på vår enebolig for å bli mer selvforsynt med strøm. Huset har et sørvendt tak på ca 50 kvm med optimal vinkel for solceller. Vi ønsker en komplett løsning med montering av paneler, inverter og kobling til strømnettet. Taket er tekket med betongtakstein og er i god stand. Vi ønsker også batteripakke for lagring av overskuddsstrøm. Installatøren må være godkjent for tilkobling til strømnettet og kunne hjelpe med søknad om støtte fra Enova.',
		location: 'Ålesund, Spjelkavik',
		address: 'Spjelkavikveien 87',
		category: 'Electrician',
		experienceRequirements: ['Renewable', 'Solar'],
		jobAttributes: ['Fornybar energi', 'Strøm', 'Miljøvennlig', 'Energieffektivisering'],
		thumbnailImageLink:
			'https://566971-www.web.tornado-node.net/wp-content/uploads/2018/04/Hedalm-Anebyhus-bilder_1110x624_2018_Rosendal_klassisk.jpg',
		imageGallery: [
			'https://566971-www.web.tornado-node.net/wp-content/uploads/2018/04/Hedalm-Anebyhus-bilder_1110x624_2018_Rosendal_klassisk.jpg',
			'https://i.pinimg.com/736x/cd/95/70/cd957091761a7e8a909476d4386730c4.jpg',
			'https://i.pinimg.com/736x/c7/95/73/c7957353e44987b20a41b41985b576e6.jpg'
		],
		postDate: '2025-04-05 10:15:00',
		startDate: '2025-05-25 08:00:00',
		dueDate: '2025-06-15 16:00:00',
		finishDate: null,
		estimatedTime: '5-7 dager',
		budget: 175000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'private',
		isActive: true,
		favoritedCount: 24,
		viewCount: 142,
		purchaseCount: 0,
		paidListing: true,
		listingPriorityScore: 83,
		vendorRating: null,
		clientRating: 4.9
	},
	{
		id: 'pro67391024857',
		clientId: 'u37291084657',
		vendorId: null,
		title: 'Bygging av terrasse med trapp',
		shortDescription:
			'Ønsker å bygge terrasse på 30 kvm med trapp ned til hagen. Skal være i trykkimpregnert virke.',
		longDescription:
			'Vi ønsker å bygge en terrasse på baksiden av huset vårt med en trapp ned til hagen. Terrassen skal være ca 30 kvm og bygges i trykkimpregnert virke. Høyden fra bakken varierer fra 1 til 1,8 meter. Vi trenger også en trapp med ca 8-10 trinn og rekkverk rundt hele terrassen. Vi har tegninger klare men trenger hjelp til materialberegning og selve byggingen. Terrassen skal også ha innebygd benk langs den ene siden.',
		location: 'Trondheim, Ranheim',
		address: 'Presthusvegen 32',
		category: 'Carpenter',
		experienceRequirements: ['Outdoor', 'Deck'],
		jobAttributes: ['Terrasse', 'Treverk', 'Uteplass', 'Snekkerarbeid'],
		thumbnailImageLink: 'https://www.cadpro.com/wp-content/uploads/2013/09/deck-plan.jpg',
		imageGallery: [
			'https://www.cadpro.com/wp-content/uploads/2013/09/deck-plan.jpg',
			'https://i.pinimg.com/736x/70/97/6e/70976e6b44a4cfb10968252a696d0c04.jpg',
			'https://i.pinimg.com/736x/cd/95/70/cd957091761a7e8a909476d4386730c4.jpg'
		],
		postDate: '2025-04-08 15:30:00',
		startDate: '2025-05-10 09:00:00',
		dueDate: '2025-05-31 16:00:00',
		finishDate: null,
		estimatedTime: '1 uke',
		budget: 65000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'private',
		isActive: true,
		favoritedCount: 17,
		viewCount: 95,
		purchaseCount: 0,
		paidListing: false,
		listingPriorityScore: 51,
		vendorRating: null,
		clientRating: 4.7
	},
	{
		id: 'pro45910278365',
		clientId: 'u82719304658',
		vendorId: null,
		title: 'Montering av IKEA-kjøkken',
		shortDescription:
			'Trenger snekker for montering av nytt IKEA-kjøkken på 14 kvm. Alle deler er levert.',
		longDescription:
			'Vi har kjøpt et nytt kjøkken fra IKEA som vi trenger hjelp til å montere. Kjøkkenet er ca 14 kvm med L-formet innredning. Alle deler er levert og befinner seg i leiligheten. Vi har integrerte hvitevarer (komfyr, oppvaskmaskin, kjøleskap) som også må monteres. Det gamle kjøkkenet er allerede demontert, og rommet er klargjort. Vi ønsker en snekker med erfaring fra IKEA-kjøkken som kan sikre et profesjonelt resultat.',
		location: 'Sandnes, Ganddal',
		address: 'Ganddalsgata 12',
		category: 'Carpenter',
		experienceRequirements: ['Interior', 'Kitchen'],
		jobAttributes: ['IKEA', 'Kjøkken', 'Montering', 'Interiør'],
		thumbnailImageLink: 'https://i.pinimg.com/736x/7f/1d/0a/7f1d0ae5870e57fa598cf47aeb0b447b.jpg',
		imageGallery: [
			'https://i.pinimg.com/736x/7f/1d/0a/7f1d0ae5870e57fa598cf47aeb0b447b.jpg',
			'https://i.pinimg.com/736x/4b/3a/82/4b3a82bc593d456b37f951bb55d83f81.jpg',
			'https://cdn.sanity.io/images/m6nlvvfa/production/ffb3b3500f117be791f7119a6ce365f3aa9bf778-1280x720.jpg?w=3840&q=75&fm=webp&fit=clip'
		],
		postDate: '2025-04-15 09:00:00',
		startDate: '2025-04-25 08:00:00',
		dueDate: '2025-05-05 18:00:00',
		finishDate: null,
		estimatedTime: '3-4 dager',
		budget: 25000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'private',
		isActive: true,
		favoritedCount: 9,
		viewCount: 68,
		purchaseCount: 0,
		paidListing: false,
		listingPriorityScore: 47,
		vendorRating: null,
		clientRating: 4.4
	},
	{
		id: 'pro23918746502',
		clientId: 'u17293846502',
		vendorId: null,
		title: 'Oppgradering av el-anlegg i eldre bolig',
		shortDescription:
			'Enebolig fra 1963 trenger komplett oppgradering av el-anlegg. 150 kvm over to etasjer.',
		longDescription:
			'Vi har kjøpt en eldre enebolig fra 1963 som trenger en fullstendig oppgradering av det elektriske anlegget. Huset er på 150 kvm fordelt på to etasjer. Dagens anlegg har skrusikringer og for få kurser til moderne bruk. Vi ønsker nytt sikringsskap med automatsikringer, jordfeilbrytere, flere stikkontakter i alle rom, ny kabling der det er nødvendig, og generell oppgradering til dagens standard. Vi planlegger også å installere elbillader i garasjen.',
		location: 'Drammen, Gulskogen',
		address: 'Gulskogveien 54',
		category: 'Electrician',
		experienceRequirements: ['Residential', 'Renovation'],
		jobAttributes: ['El-anlegg', 'Sikringsskap', 'Oppgradering', 'Sertifisert'],
		thumbnailImageLink: 'https://i.pinimg.com/736x/c7/95/73/c7957353e44987b20a41b41985b576e6.jpg',
		imageGallery: [
			'https://i.pinimg.com/736x/c7/95/73/c7957353e44987b20a41b41985b576e6.jpg',
			'https://upload.wikimedia.org/wikipedia/commons/7/72/House_at_J%C3%A6ren_in_Norway_Garborgheimen.JPG',
			'https://i.pinimg.com/736x/cd/95/70/cd957091761a7e8a909476d4386730c4.jpg'
		],
		postDate: '2025-03-20 11:45:00',
		startDate: '2025-05-15 08:00:00',
		dueDate: '2025-06-30 16:00:00',
		finishDate: null,
		estimatedTime: '2-3 uker',
		budget: 120000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'private',
		isActive: true,
		favoritedCount: 14,
		viewCount: 103,
		purchaseCount: 0,
		paidListing: true,
		listingPriorityScore: 68,
		vendorRating: null,
		clientRating: 4.3
	},
	{
		id: 'pro39102847563',
		clientId: 'u72819304657',
		vendorId: null,
		title: 'Bygging av carport med bod',
		shortDescription:
			'Ønsker å bygge carport for to biler med integrert bod. Total størrelse ca 45 kvm.',
		longDescription:
			'Vi ønsker å bygge en carport med integrert bod på tomten vår. Carporten skal ha plass til to biler (ca 35 kvm) og en bod på ca 10 kvm for lagring av hageredskaper og sykler. Konstruksjonen skal ha pulttak med takstein som matcher hovedhuset. Vi har søkt og fått godkjent byggetillatelse, og har tegninger klare. Grunnarbeidet er allerede utført, og betongplaten er støpt. Vi trenger en snekker til å sette opp selve konstruksjonen.',
		location: 'Bergen, Fana',
		address: 'Fanaveien 134',
		category: 'Carpenter',
		experienceRequirements: ['Outdoor', 'Construction'],
		jobAttributes: ['Carport', 'Bod', 'Konstruksjon', 'Snekkerarbeid'],
		thumbnailImageLink: 'https://www.cadpro.com/wp-content/uploads/2013/09/deck-plan.jpg',
		imageGallery: [
			'https://www.cadpro.com/wp-content/uploads/2013/09/deck-plan.jpg',
			'https://mora.no/wp-content/uploads/2021/08/Fotland-trend-lys.jpg',
			'https://i.pinimg.com/736x/70/97/6e/70976e6b44a4cfb10968252a696d0c04.jpg'
		],
		postDate: '2025-04-02 14:15:00',
		startDate: '2025-05-20 08:00:00',
		dueDate: '2025-06-15 16:00:00',
		finishDate: null,
		estimatedTime: '2 uker',
		budget: 95000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'private',
		isActive: true,
		favoritedCount: 11,
		viewCount: 82,
		purchaseCount: 0,
		paidListing: false,
		listingPriorityScore: 59,
		vendorRating: null,
		clientRating: 4.8
	},
	{
		id: 'pro56102937485',
		clientId: 'u93827104658',
		vendorId: null,
		title: 'Oppussing av kommunale barnehager',
		shortDescription:
			'Kommune søker malerfirma for oppussing av 3 barnehager. Totalt 800 kvm veggflate.',
		longDescription:
			'Kommunen trenger malerentreprenør for oppussing av tre barnehager i sommerferien. Arbeidet omfatter sparkling og maling av innvendige vegger og tak. Total veggflate er ca 800 kvm. Alle rommene skal males i lyse, barnevennlige farger etter kommunens fargeplan. Arbeidet må utføres i perioden 1.-31. juli mens barnehagene er stengt for ferie. Det kreves dokumentert erfaring fra lignende oppdrag og referanser fra offentlige bygg.',
		location: 'Tromsø, Sentrum',
		address: 'Storgata 25',
		category: 'Painter',
		experienceRequirements: ['Commercial', 'Interior'],
		jobAttributes: ['Offentlig', 'Barnehage', 'Maling', 'Tidsfrist'],
		thumbnailImageLink: 'https://i.pinimg.com/736x/04/9a/27/049a27597a6964e54b280e0342571566.jpg',
		imageGallery: [
			'https://i.pinimg.com/736x/04/9a/27/049a27597a6964e54b280e0342571566.jpg',
			'https://i.pinimg.com/736x/4b/3a/82/4b3a82bc593d456b37f951bb55d83f81.jpg',
			'https://cdn.prod.website-files.com/5c8f85a650ed9d042570a882/5d2f353744c1f9e9628222c9_AdobeStock_66744291.jpeg'
		],
		postDate: '2025-03-15 13:00:00',
		startDate: '2025-07-01 07:00:00',
		dueDate: '2025-07-31 16:00:00',
		finishDate: null,
		estimatedTime: '4 uker',
		budget: 350000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'public',
		isActive: true,
		favoritedCount: 22,
		viewCount: 156,
		purchaseCount: 0,
		paidListing: true,
		listingPriorityScore: 87,
		vendorRating: null,
		clientRating: 4.6
	},
	{
		id: 'pro78102934657',
		clientId: 'u27193845602',
		vendorId: null,
		title: 'Graving av tomt til garasje',
		shortDescription:
			'Trenger gravemaskin og sjåfør for utgraving av tomt til garasje. Ca 60 kvm flate.',
		longDescription:
			'Vi skal bygge ny garasje og trenger hjelp til gravearbeidet. Tomten må graves ut til ca 60 kvm grunnflate og 50 cm dybde. Massene skal kjøres bort til godkjent deponi. Det er leire i grunnen, og vi må sannsynligvis drenere og legge pukk før støping av såle. Vi trenger en erfaren maskinentreprenør med egnet gravemaskin (ca 8-10 tonn) og lastebil for bortkjøring av masser. Adkomst til tomten er god.',
		location: 'Lillehammer, Vingnes',
		address: 'Vingnesvegen 87',
		category: 'Machine Operator',
		experienceRequirements: ['Excavation', 'Transport'],
		jobAttributes: ['Graving', 'Massetransport', 'Tomt', 'Garasje'],
		thumbnailImageLink:
			'https://byggeboligblobstorage.blob.core.windows.net/imageoriginals/17cfb0bb1190a06cb253388d482670b8ab0a1be9.jpg?maxwidth=900',
		imageGallery: [
			'https://byggeboligblobstorage.blob.core.windows.net/imageoriginals/17cfb0bb1190a06cb253388d482670b8ab0a1be9.jpg?maxwidth=900',
			'https://mora.no/wp-content/uploads/2021/08/Fotland-trend-lys.jpg',
			'https://www.cadpro.com/wp-content/uploads/2013/09/deck-plan.jpg'
		],
		postDate: '2025-04-10 10:30:00',
		startDate: '2025-05-05 08:00:00',
		dueDate: '2025-05-12 16:00:00',
		finishDate: null,
		estimatedTime: '3-4 dager',
		budget: 45000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'private',
		isActive: true,
		favoritedCount: 7,
		viewCount: 59,
		purchaseCount: 0,
		paidListing: false,
		listingPriorityScore: 43,
		vendorRating: null,
		clientRating: 4.5
	},
	{
		id: 'pro12938475603',
		clientId: 'u87291035647',
		vendorId: null,
		title: 'Renovering av verneverdig bygård',
		shortDescription:
			'Sameie søker entreprenør for renovering av fasade på verneverdig bygård fra 1890.',
		longDescription:
			'Vi representerer et sameie i en verneverdig bygård fra 1890-tallet. Fasaden trenger omfattende renovering, inkludert reparasjon av puss, utskifting av råtne vinduskarmer, restaurering av ornamenter og maling. Arbeidet må utføres i henhold til antikvariske prinsipper og i samråd med Byantikvaren. Bygget er på 4 etasjer med total fasadeflate på ca 500 kvm. Vi søker en entreprenør med dokumentert erfaring fra tilsvarende prosjekter på verneverdige bygg.',
		location: 'Oslo, Frogner',
		address: 'Bygdøy allé 12',
		category: 'Contractor',
		experienceRequirements: ['Heritage', 'Facade'],
		jobAttributes: ['Verneverdig', 'Restaurering', 'Fasade', 'Antikvarisk'],
		thumbnailImageLink:
			'https://upload.wikimedia.org/wikipedia/commons/7/72/House_at_J%C3%A6ren_in_Norway_Garborgheimen.JPG',
		imageGallery: [
			'https://upload.wikimedia.org/wikipedia/commons/7/72/House_at_J%C3%A6ren_in_Norway_Garborgheimen.JPG',
			'https://i.pinimg.com/736x/c7/95/73/c7957353e44987b20a41b41985b576e6.jpg',
			'https://i.pinimg.com/736x/04/9a/27/049a27597a6964e54b280e0342571566.jpg'
		],
		postDate: '2025-03-01 14:45:00',
		startDate: '2025-05-15 07:00:00',
		dueDate: '2025-09-15 16:00:00',
		finishDate: null,
		estimatedTime: '4 måneder',
		budget: 2500000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'business',
		isActive: true,
		favoritedCount: 31,
		viewCount: 198,
		purchaseCount: 0,
		paidListing: true,
		listingPriorityScore: 93,
		vendorRating: null,
		clientRating: 4.9
	},
	{
		id: 'pro65901283745',
		clientId: 'u48219037564',
		vendorId: null,
		title: 'Installasjon av automatisk garasjeport',
		shortDescription:
			'Trenger elektriker for installasjon av automatisk garasjeport med fjernkontroll og kodepanel.',
		longDescription:
			'Vi har kjøpt en ny automatisk garasjeport som trenger profesjonell installasjon. Porten er en leddport fra Hörmann med elektrisk motor og fjernkontroll. Vi ønsker også å installere et kodepanel ved siden av porten for nøkkelfri adgang. Dagens port er en manuell vippeport som må fjernes. Garasjen har strøm, men det kan være behov for ny kurs. Garasjeåpningen er standard størrelse på 240x210 cm.',
		location: 'Bodø, Mørkved',
		address: 'Mørkvedveien 45',
		category: 'Electrician',
		experienceRequirements: ['Garage', 'Automation'],
		jobAttributes: ['Garasjeport', 'Elektrisk', 'Fjernkontroll', 'Installasjon'],
		thumbnailImageLink: 'https://mora.no/wp-content/uploads/2021/08/Fotland-trend-lys.jpg',
		imageGallery: [
			'https://mora.no/wp-content/uploads/2021/08/Fotland-trend-lys.jpg',
			'https://i.pinimg.com/736x/c7/95/73/c7957353e44987b20a41b41985b576e6.jpg',
			'https://566971-www.web.tornado-node.net/wp-content/uploads/2018/04/Hedalm-Anebyhus-bilder_1110x624_2018_Rosendal_klassisk.jpg'
		],
		postDate: '2025-04-08 09:15:00',
		startDate: '2025-04-25 09:00:00',
		dueDate: '2025-05-10 16:00:00',
		finishDate: null,
		estimatedTime: '1-2 dager',
		budget: 18000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'private',
		isActive: true,
		favoritedCount: 5,
		viewCount: 42,
		purchaseCount: 0,
		paidListing: false,
		listingPriorityScore: 39,
		vendorRating: null,
		clientRating: 4.2
	},
	{
		id: 'pro43918027465',
		clientId: 'u15728394650',
		vendorId: null,
		title: 'Boring av energibrønn til varmepumpe',
		shortDescription:
			'Trenger boring av energibrønn for installasjon av bergvarmepumpe til enebolig på 200 kvm.',
		longDescription:
			'Vi skal installere bergvarmepumpe i vår enebolig og trenger boring av energibrønn. Huset er på ca 200 kvm over to etasjer pluss kjeller. Ifølge forhandler av varmepumpe trenger vi en brønn på ca 200 meter. Tomten er på 1,2 mål og har god plass for borerigg. Grunnen består hovedsakelig av fjell med et tynt lag løsmasse over. Vi ønsker tilbud på boring, foring av hull gjennom løsmasser, og installasjon av kollektorslange. Selve varmepumpen installeres av annen leverandør.',
		location: 'Tønsberg, Tolvsrød',
		address: 'Tolvsrødveien 78',
		category: 'Plumber',
		experienceRequirements: ['Drilling', 'Geothermal'],
		jobAttributes: ['Bergvarme', 'Energibrønn', 'Boring', 'Miljøvennlig'],
		thumbnailImageLink: 'https://i.pinimg.com/736x/70/97/6e/70976e6b44a4cfb10968252a696d0c04.jpg',
		imageGallery: [
			'https://i.pinimg.com/736x/70/97/6e/70976e6b44a4cfb10968252a696d0c04.jpg',
			'https://566971-www.web.tornado-node.net/wp-content/uploads/2018/04/Hedalm-Anebyhus-bilder_1110x624_2018_Rosendal_klassisk.jpg',
			'https://i.pinimg.com/736x/cd/95/70/cd957091761a7e8a909476d4386730c4.jpg'
		],
		postDate: '2025-03-25 16:40:00',
		startDate: '2025-05-10 08:00:00',
		dueDate: '2025-05-20 16:00:00',
		finishDate: null,
		estimatedTime: '2-3 dager',
		budget: 85000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'private',
		isActive: true,
		favoritedCount: 10,
		viewCount: 76,
		purchaseCount: 0,
		paidListing: true,
		listingPriorityScore: 64,
		vendorRating: null,
		clientRating: 4.7
	},
	{
		id: 'pro29178346502',
		clientId: 'u63718294560',
		vendorId: null,
		title: 'Oppussing av kontorlandskap',
		shortDescription:
			'IT-selskap trenger oppussing av kontorlokaler på 350 kvm. Maling, gulv og lettvegger.',
		longDescription:
			'Vi er et voksende IT-selskap som trenger oppussing av våre kontorlokaler på 350 kvm. Arbeidet omfatter maling av alle vegger og tak, legging av nytt vinylgulv i fellesarealer (ca 150 kvm), og oppsetting av noen lettvegger for å skape møterom og stillesoner. Vi ønsker også nye himlingsplater i deler av lokalet. Arbeidet må utføres raskt og effektivt, helst i løpet av en ferieperiode for minimal forstyrrelse av arbeidsdagen. Vi har tegninger og fargeplan klar.',
		location: 'Oslo, Nydalen',
		address: 'Nydalsveien 28',
		category: 'Contractor',
		experienceRequirements: ['Commercial', 'Interior'],
		jobAttributes: ['Kontor', 'Maling', 'Gulv', 'Lettvegger'],
		thumbnailImageLink: 'https://i.pinimg.com/736x/04/9a/27/049a27597a6964e54b280e0342571566.jpg',
		imageGallery: [
			'https://i.pinimg.com/736x/04/9a/27/049a27597a6964e54b280e0342571566.jpg',
			'https://i.pinimg.com/736x/7f/1d/0a/7f1d0ae5870e57fa598cf47aeb0b447b.jpg',
			'https://cdn.sanity.io/images/m6nlvvfa/production/ffb3b3500f117be791f7119a6ce365f3aa9bf778-1280x720.jpg?w=3840&q=75&fm=webp&fit=clip'
		],
		postDate: '2025-03-10 11:15:00',
		startDate: '2025-07-01 08:00:00',
		dueDate: '2025-07-15 16:00:00',
		finishDate: null,
		estimatedTime: '2 uker',
		budget: 420000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'business',
		isActive: true,
		favoritedCount: 18,
		viewCount: 127,
		purchaseCount: 0,
		paidListing: true,
		listingPriorityScore: 85,
		vendorRating: null,
		clientRating: 4.8
	},
	{
		id: 'pro76104928375',
		clientId: 'u92837104657',
		vendorId: null,
		title: 'Legging av nytt tak på hytte',
		shortDescription:
			'Trenger taktekker for legging av nytt tak på hytte. 85 kvm takflate, ønsker torvtak.',
		longDescription:
			'Vi har en fjellhytte som trenger nytt tak. Dagens tak er et gammelt torvtak som er i dårlig stand og lekker. Vi ønsker å legge nytt torvtak med moderne underlagsmaterialer for å sikre tett konstruksjon. Takflaten er på ca 85 kvm med relativt slak takvinkel. Hytta ligger i fjellet med ca 1 km fra bilvei, så materialer må fraktes inn med ATV eller helikopter. Vi ønsker å få arbeidet utført i løpet av sommeren når hytta er tilgjengelig.',
		location: 'Hemsedal, Grøndalen',
		address: 'Grøndalsvegen 112',
		category: 'Roofer',
		experienceRequirements: ['Turf', 'Cabin'],
		jobAttributes: ['Torvtak', 'Hytte', 'Fjell', 'Tradisjonelt'],
		thumbnailImageLink: 'https://i.pinimg.com/736x/70/97/6e/70976e6b44a4cfb10968252a696d0c04.jpg',
		imageGallery: [
			'https://i.pinimg.com/736x/70/97/6e/70976e6b44a4cfb10968252a696d0c04.jpg',
			'https://i.pinimg.com/736x/cd/95/70/cd957091761a7e8a909476d4386730c4.jpg',
			'https://upload.wikimedia.org/wikipedia/commons/7/72/House_at_J%C3%A6ren_in_Norway_Garborgheimen.JPG'
		],
		postDate: '2025-04-05 15:30:00',
		startDate: '2025-06-15 08:00:00',
		dueDate: '2025-07-31 16:00:00',
		finishDate: null,
		estimatedTime: '1-2 uker',
		budget: 145000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'private',
		isActive: true,
		favoritedCount: 13,
		viewCount: 89,
		purchaseCount: 0,
		paidListing: false,
		listingPriorityScore: 58,
		vendorRating: null,
		clientRating: 4.6
	},
	{
		id: 'pro54910283756',
		clientId: 'u72918304657',
		vendorId: null,
		title: 'Rørleggerarbeid i ny butikk',
		shortDescription:
			'Ny klesbutikk trenger rørlegger for installasjon av toaletter, vask og kjøkkenkrok.',
		longDescription:
			'Vi skal åpne ny klesbutikk i kjøpesenter og trenger rørlegger for installasjon av kundetoalett, personaltoalett, vask i bakrom og enkel kjøkkenkrok med oppvaskbenk. Lokalet er nytt og har tilrettelagt for disse installasjonene med rørføringer i gulv og vegger. Vi har kjøpt inn all sanitærutstyr og trenger kun montering og tilkobling. Arbeidet må utføres før butikkåpning og koordineres med andre håndverkere som jobber i lokalet.',
		location: 'Sandnes, Kvadrat',
		address: 'Kvadrat kjøpesenter',
		category: 'Plumber',
		experienceRequirements: ['Commercial', 'Installation'],
		jobAttributes: ['Butikk', 'Sanitær', 'Montering', 'Kjøpesenter'],
		thumbnailImageLink: 'https://i.pinimg.com/736x/c7/95/73/c7957353e44987b20a41b41985b576e6.jpg',
		imageGallery: [
			'https://i.pinimg.com/736x/c7/95/73/c7957353e44987b20a41b41985b576e6.jpg',
			'https://i.pinimg.com/736x/04/9a/27/049a27597a6964e54b280e0342571566.jpg',
			'https://i.pinimg.com/736x/7f/1d/0a/7f1d0ae5870e57fa598cf47aeb0b447b.jpg'
		],
		postDate: '2025-04-12 12:45:00',
		startDate: '2025-05-05 08:00:00',
		dueDate: '2025-05-15 16:00:00',
		finishDate: null,
		estimatedTime: '3-4 dager',
		budget: 38000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'business',
		isActive: true,
		favoritedCount: 8,
		viewCount: 61,
		purchaseCount: 0,
		paidListing: true,
		listingPriorityScore: 67,
		vendorRating: null,
		clientRating: 4.5
	},
	{
		id: 'pro18293746502',
		clientId: 'u38291047563',
		vendorId: null,
		title: 'Maling av hus utvendig',
		shortDescription: 'Enebolig fra 2005 trenger utvendig maling. Ca 250 kvm veggflate, 2 etasjer.',
		longDescription:
			'Vi trenger å få malt vår enebolig utvendig. Huset er fra 2005 og har trepanel som trenger ny maling. Total veggflate er ca 250 kvm fordelt på 2 etasjer. Nåværende farge er hvit, og vi ønsker å beholde samme farge. Arbeidet inkluderer vask, skraping der det er nødvendig, grunning av flekker og to strøk maling. Vi har stillas som kan benyttes. Arbeidet må utføres i tørt vær og helst i løpet av sommeren.',
		location: 'Haugesund, Skåredalen',
		address: 'Skåredalsveien 45',
		category: 'Painter',
		experienceRequirements: ['Exterior', 'Residential'],
		jobAttributes: ['Maling', 'Utvendig', 'Trepanel', 'Enebolig'],
		thumbnailImageLink:
			'https://upload.wikimedia.org/wikipedia/commons/7/72/House_at_J%C3%A6ren_in_Norway_Garborgheimen.JPG',
		imageGallery: [
			'https://upload.wikimedia.org/wikipedia/commons/7/72/House_at_J%C3%A6ren_in_Norway_Garborgheimen.JPG',
			'https://566971-www.web.tornado-node.net/wp-content/uploads/2018/04/Hedalm-Anebyhus-bilder_1110x624_2018_Rosendal_klassisk.jpg',
			'https://i.pinimg.com/736x/cd/95/70/cd957091761a7e8a909476d4386730c4.jpg'
		],
		postDate: '2025-04-01 10:30:00',
		startDate: '2025-06-01 08:00:00',
		dueDate: '2025-07-31 16:00:00',
		finishDate: null,
		estimatedTime: '2 uker',
		budget: 65000,
		currency: 'NOK',
		paymentVerification: true,
		state: 'posted',
		poster_type: 'private',
		isActive: true,
		favoritedCount: 16,
		viewCount: 94,
		purchaseCount: 0,
		paidListing: false,
		listingPriorityScore: 52,
		vendorRating: null,
		clientRating: 4.4
	}
];
