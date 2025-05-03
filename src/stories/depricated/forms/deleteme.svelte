
<script lang="ts">
	import './form.css';

	let {data} = $props();
	const dropdown_label = getLabel(data);
	let dropdown_value = $state(dropdown_label);
	
	
	function getLabel(data:string){
		return {
			'area' : 'Fylke',
			'municipalities': data.includes('Østfold') ? 'kommune' : 'Kommune',
			'work_field' : 'Kategori',
		}[data]
	};
	

	const sub_dropdown_label = getLabel('municipalities');
	let sub_dropdown_value = $state(sub_dropdown_label)
	let options = $state(getOptions(data));
	let sub_data = $state();
	let areaObject = $state(getOptions(data));

	if (data === 'area') {

		let selected_area = $state(dropdown_value);

		// if area it will spawn another field for municipalities
        // areaObject = getOptions(data); // First get the area object
		sub_data = areaObject[selected_area];
        const _data = Object.keys(areaObject); // Then get its keys
		options = _data;
    }

	function subForm(dropdown_value){
		sub_data = areaObject[dropdown_value]
	};

	// MOVE TO BACKEND MAYBE?
	// TODO [ ]: make proper function
	function getOptions(data:string){ // #placeholder
		// data is what kind of options getOptions should find, i.e.: area list, work fields,
		return{
			'area': {
					'Østfold': [
						'Aremark', 'Fredrikstad', 'Halden', 'Hvaler', 'Indre_Østfold',
						'Marker', 'Moss', 'Rakkestad', 'Råde', 'Sarpsborg', 'Skiptvet', 'Våler'
					],
					'Oslo': ['Oslo'],
					'Akershus': [
						'Asker', 'Aurskog-Høland', 'Bærum', 'Eidsvoll', 'Enebakk', 'Frogn',
						'Gjerdrum', 'Hurdal', 'Jevnaker', 'Lillestrøm', 'Lunner', 'Lørenskog',
						'Nannestad', 'Nes', 'Nesodden', 'Nittedal', 'Nordre_Follo', 'Rælingen',
						'Ullensaker', 'Vestby', 'Ås'
					],
					'Innlandet': [
						'Alvdal', 'Dovre', 'Eidskog', 'Elverum', 'Engerdal', 'Etnedal', 'Folldal',
						'Gausdal', 'Gjøvik', 'Gran', 'Grue', 'Hamar', 'Kongsvinger', 'Lesja',
						'Lillehammer', 'Lom', 'Løten', 'Nord-Aurdal', 'Nord-Fron', 'Nord-Odal',
						'Nordre_Land', 'Os', 'Rendalen', 'Ringebu', 'Ringsaker', 'Sel', 'Skjåk',
						'Stange', 'Stor-Elvdal', 'Søndre_Land', 'Sør-Aurdal', 'Sør-Fron',
						'Sør-Odal', 'Tolga', 'Trysil', 'Tynset', 'Vang', 'Vestre_Slidre',
						'Vestre_Toten', 'Vågå', 'Våler', 'Østre_Toten', 'Øyer', 'Øystre_Slidre',
						'Åmot', 'Åsnes'
					],
					'Buskerud': [
						'Drammen', 'Flesberg', 'Flå', 'Gol', 'Hemsedal', 'Hol', 'Hole',
						'Kongsberg', 'Krødsherad', 'Lier', 'Modum', 'Nesbyen', 'Nore_og_Uvdal',
						'Ringerike', 'Rollag', 'Sigdal', 'Ål', 'Øvre_Eiker'
					],
					'Vestfold': [
						'Færder', 'Holmestrand', 'Horten', 'Larvik', 'Sandefjord', 'Tønsberg'
					],
					'Telemark': [
						'Bamble', 'Drangedal', 'Fyresdal', 'Hjartdal', 'Kragerø', 'Kviteseid',
						'Midt-Telemark', 'Nissedal', 'Nome', 'Notodden', 'Porsgrunn', 'Seljord',
						'Siljan', 'Skien', 'Tinn', 'Tokke', 'Vinje'
					],
					'Agder': [
						'Arendal', 'Birkenes', 'Bygland', 'Bykle', 'Evje_og_Hornnes', 'Farsund',
						'Flekkefjord', 'Froland', 'Gjerstad', 'Grimstad', 'Hægebostad', 'Iveland',
						'Kristiansand', 'Kvinesdal', 'Lillesand', 'Lindesnes', 'Lyngdal',
						'Risør', 'Sirdal', 'Tvedestrand', 'Valle', 'Vegårshei', 'Vennesla',
						'Åmli', 'Åseral'
					],
					'Rogaland': [
						'Bjerkreim', 'Bokn', 'Eigersund', 'Gjesdal', 'Haugesund', 'Hjelmeland',
						'Hå', 'Karmøy', 'Klepp', 'Kvitsøy', 'Lund', 'Randaberg', 'Sandnes',
						'Sauda', 'Sokndal', 'Sola', 'Stavanger', 'Strand', 'Suldal', 'Time',
						'Tysvær', 'Utsira', 'Vindafjord'
					],
					'Vestland': [
						'Alver', 'Askvoll', 'Askøy', 'Aurland', 'Austevoll', 'Austrheim',
						'Bergen', 'Bjørnafjorden', 'Bremanger', 'Bømlo', 'Eidfjord', 'Etne',
						'Fedje', 'Fitjar', 'Fjaler', 'Gloppen', 'Gulen', 'Hyllestad', 'Høyanger',
						'Kinn', 'Kvam', 'Kvinnherad', 'Luster', 'Lærdal', 'Masfjorden', 'Modalen',
						'Osterøy', 'Samnanger', 'Sogndal', 'Solund', 'Stad', 'Stord', 'Stryn',
						'Sunnfjord', 'Sveio', 'Tysnes', 'Ullensvang', 'Ulvik', 'Vaksdal', 'Vik',
						'Voss', 'Årdal', 'Øygarden'
					],
					'Møre_og_Romsdal': [
						'Aukra', 'Aure', 'Averøy', 'Fjord', 'Giske', 'Gjemnes', 'Hareid', 'Herøy',
						'Hustadvika', 'Kristiansund', 'Molde', 'Rauma', 'Sande', 'Smøla',
						'Stranda', 'Sula', 'Sunndal', 'Surnadal', 'Sykkylven', 'Tingvoll',
						'Ulstein', 'Vanylven', 'Vestnes', 'Volda', 'Ålesund', 'Ørsta'
					],
					'Trøndelag': [
						'Flatanger', 'Frosta', 'Frøya', 'Grong', 'Heim', 'Hitra', 'Holtålen',
						'Høylandet', 'Inderøy', 'Indre_Fosen', 'Leka', 'Levanger', 'Lierne',
						'Malvik', 'Melhus', 'Meråker', 'Midtre_Gauldal', 'Namsos', 'Namsskogan',
						'Nærøysund', 'Oppdal', 'Orkland', 'Osen', 'Overhalla', 'Rennebu',
						'Rindal', 'Røros', 'Røyrvik', 'Selbu', 'Skaun', 'Snåsa', 'Steinkjer',
						'Stjørdal', 'Trondheim', 'Tydal', 'Verdal', 'Ørland', 'Åfjord'
					],
					'Nordland': [
						'Alstahaug', 'Andøy', 'Beiarn', 'Bindal', 'Bodø', 'Brønnøy', 'Bø',
						'Dønna', 'Evenes', 'Fauske', 'Flakstad', 'Gildeskål', 'Grane', 'Hadsel',
						'Hamarøy', 'Hattfjelldal', 'Hemnes', 'Herøy', 'Leirfjord', 'Lurøy',
						'Lødingen', 'Meløy', 'Moskenes', 'Narvik', 'Nesna', 'Rana', 'Rødøy',
						'Røst', 'Saltdal', 'Sortland', 'Steigen', 'Sømna', 'Sørfold', 'Træna',
						'Vefsn', 'Vega', 'Vestvågøy', 'Vevelstad', 'Vågan', 'Værøy', 'Øksnes'
					],
					'Troms': [
						'Balsfjord', 'Bardu', 'Dyrøy', 'Gratangen', 'Harstad', 'Ibestad',
						'Karlsøy', 'Kvæfjord', 'Kvænangen', 'Kåfjord', 'Lavangen', 'Lyngen',
						'Målselv', 'Nordreisa', 'Senja', 'Skjervøy', 'Storfjord', 'Sørreisa',
						'Tjeldsund', 'Tromsø'
					],
					'Finnmark': [
						'Alta', 'Berlevåg', 'Båtsfjord', 'Gamvik', 'Hammerfest', 'Hasvik',
						'Karasjok', 'Kautokeino', 'Lebesby', 'Loppa', 'Måsøy', 'Nesseby',
						'Nordkapp', 'Porsanger', 'Sør-Varanger', 'Tana', 'Vadsø', 'Vardø'
					]
				},
			'work_field':[
				'blikkenslager',
				'Elektriker',	
				'Entreprenør',	
				'Maler',	
				'Maskinentreprenør',	
				'Murer',	
				'Rengjøring',	
				'Rørlegger',	
				'Snekker',
				
				'metallarbeider',
				'Anleggsgartner',
				'River',
				'Skadedyr',
				'Sveiser',		
				'Transport',	
				'Store prosjekter',	
			],

		}[data]
	};
</script>

<!-- First Dropdown  -->
<p> Prosjekter i: {dropdown_value}</p> <!-- TEMP -->
<select class="field dropdown" bind:value={dropdown_value} on:change={() => {if (data === 'area') {subForm(dropdown_value);}}}>  
<!-- <select class="field dropdown" bind:value={dropdown_value} on:change={() => subForm(dropdown_value)}>   -->
	<option value={dropdown_value} disabled hidden> {dropdown_value}</option>
	{#each options as select_option}
	<option value={select_option}>{select_option}</option>
	{/each}
</select>

<!-- Second Dropdown (Municipalities), only shown if an area is selected -->
{#if sub_data && sub_data.length > 0}
	<p> Prosjekter i: {sub_dropdown_value}</p> <!-- TEMP -->
	<select class="field dropdown" bind:value={sub_dropdown_value} >    
		<option value={sub_dropdown_value} disabled hidden> {sub_dropdown_value}</option>
		{#each sub_data as select_option}
			<option value={select_option}>{select_option}</option>
		{/each}
	</select>
{/if} 


	
	
