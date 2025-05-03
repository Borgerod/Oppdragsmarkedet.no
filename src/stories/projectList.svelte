<!-- USED BY projectListPage, this is the list that contains the company cards (search results) -->
<script>
    import ProjectCard from "./projectCard.svelte";

    // import './form.css';

    const demo_project = {
        'area':'Vestland, Bergen',
        'job_title':'Bygge terasse rundt baksiden',
        'category':'Carpenter',
        'sub_category':'none',
        'lister_class':'private',
		'small_description':'Du har bachelorgrad eller mastergrad i regnskap og revisjon, og er gjerne statsautorisert revisor. Annen økonomiutdanning på mastergradsnivå kan også være aktuelt. Søkere med utdanning tatt i utlandet må vedlegge dokumentasjon fra HK-dir/NOKUT som bekrefter utdanningens omfang og nivå sammenlignet med tilsvarende norsk utdanning.',
        'description':'Som et resultat av ny teknologi er revisjon i stor endring. Riksrevisjonen har utviklet egne dataanalyser og vil fortsette å ta i bruk mulighetene som den nye teknologien gir oss. Du får muligheten til å jobbe tett med kolleger i grenseflaten mellom teknologi og revisjon.Vi legger vekt på kompetanseutvikling og har gode stipendordninger for etter- og videreutdanning. Du får tilbud om medlemskap i revisorforeningens kurspakke, Rekomp. Hvis du ønsker å bli statsautorisert revisor kan du opptjene den nødvendige veiledede praksis hos oss. Vi har fleksitid og sommertid, og hver uke får du en time til å trene i arbeidstiden. Du blir medlem i Statens pensjonskasse som innebærer en god tjenestepensjon, yrkesskade- og gruppelivsforsikring og mulighet for gunstig boliglån.Du vil bli ansatt som rådgiver med lønnsspenn fra 590.000 kroner til 650.000 kroner, eller som seniorrådgiver med lønnsspenn fra 650.000 kroner til 915.000 kroner. For spesielt kvalifiserte kandidater kan høyere lønn vurderes.',
		'date_issued':'07.04.2025',
        'due_date': '15.05.2025',
        'heart':false,
        'payed_listing':false,
        'tags':['flermannsjobb', 'har materiale', 'har ikke utstyr', 'maskin tilgang'],
        // 'image_link':'https://oppdragsmarkedet.no/prosjekt/36373826/assets/thumbnail.jpg',
        'image_link':'https://www.mycarpentry.com/image-files/xdeck-stair-house-perspective.jpg.pagespeed.ic.r3NyM_JrfO.webp',
        'project_link':'https://oppdragsmarkedet.no/prosjekt/36373826',
    };

    function getProjects(){
        var projects = Array(1).fill(demo_project);
		projects.push({
        'area':'END OF LIST',
        'job_title':'END OF LIST',
        'category':'carpenter',
        'lister_class':'private',
        'date_issued':'07.04.2025',
        'due_date': '15.05.2025',
        'heart':false,
        'payed_listing':false,
        'tags':['flermanns_jobb', 'har_materiale', 'har_ikke_utstyr', 'maskin_tilgang'],
        'image_link':'https://oppdragsmarkedet.no/prosjekt/36373826/assets/thumbnail.jpg',
        'project_link':'https://oppdragsmarkedet.no/prosjekt/36373826',
    })
		// console.log(projects)
        return projects;
    };

    const projects = getProjects();
    let currentPage = 1;
    const totalPages = Math.ceil(projects.length / 10);

    function changePage(page) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
        }
    }

    $: visibleProjects = projects.slice((currentPage - 1) * 10, currentPage * 10); // Each page contains 10 cards
</script>

<div class="project-list">
    {#each visibleProjects as _project}
        <ProjectCard project={_project}></ProjectCard>
    {/each}
	<div class="page-list">
		<button on:click={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
		{#each Array(totalPages).fill(0).map((_, i) => i + 1) as page}
			<button on:click={() => changePage(page)} class:active={page === currentPage}>{page}</button>
		{/each}
		<button on:click={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
	</div>
</div>

<style>



    /* NEUMORPHIC */
    .project-list{
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-content: flex-start;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		padding: 2rem;
		row-gap: 2rem;
    }

    .page-list button {
        margin: 0 5px;
        padding: 5px 10px;
        cursor: pointer;
    }

    .page-list button.active {
        font-weight: bold;
        text-decoration: underline;
    }

    .page-list button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
</style>