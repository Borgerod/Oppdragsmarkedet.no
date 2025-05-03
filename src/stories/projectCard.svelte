<!-- USED BY projectListPage, is the container for each company displayed in list.  -->
<script>
	import './theme.css';
	import '@fortawesome/fontawesome-free/css/all.css';
	import '../app.css';
	// import '../stories/page.css'

	let { project } = $props();
</script>

<!-- OPTION 1 -->
<!-- <div class="main card row ">
		<div class="thumbnail">
			<div class="card neumorphic-inset"> 
				<img src={project.image_link} alt="Flowers in Chania" style="neumorphic-inset">
			</div>
		</div>

		<div class="container mini-profile">

			<div class="mini row">
				{#if project.heart === true}
				<div class="tag">{project.payed_listing}</div>
				{:else}
				{project.date_issued} | {project.area} | <div class="tag">{project.lister_class}</div>
				{/if}
			</div>

			<div class="card small neumorphic-inset">
				<h2> {project.job_title}</h2>
			</div>
			<div class="card medium row">
				<div class="card small space">
					<h2 class="">{project.category} {#if project.sub_category === true}, {project.sub_category}{/if}</h2>
				</div>
				<spacer></spacer>
				<div class="card small space neumorphic-inset row"><h2>Tidsfrist: </h2> {project.due_date}</div>
			</div>
			
				<div class="row">
					{#each project.tags as tag}
					<div class="tag">{tag}</div>
					{/each}
				</div>
		</div>
		<div class="icon favorite-button">
			{#if project.heart === false}
				<i class="fa-lg far fa-heart"></i> 
			{:else}
				<i class="fas fa-heart"></i> 
			{/if}
		</div>
	</div> -->

<!-- OPTION 3 -->
<div class="main card row">
	<!-- 
	<div class="thumbnail neumorphic-inset"> 
		<img src={project.image_link} alt="Flowers in Chania">
	</div> 
	-->
	<div
		class="thumbnail neumorphic-image"
		style="background-image: url({project.image_link}); background-size: cover; background-position: center;"
	></div>
	<!-- 	old thumbnail
		<div class="thumbnail">
			<div class="card neumorphic-inset"> 
				<img src={project.image_link} alt="Flowers in Chania" style="neumorphic-inset">
			</div>
		</div> 
	-->

	<div class="mini-profile container">
		<div class="mini row">
			{#if project.heart === true}
				<div class="tag">{project.payed_listing}</div>
			{:else}
				{project.date_issued} | {project.area}
			{/if}
		</div>

		<div class="card small neumorphic-inset">
			<h2>{project.job_title}</h2>
		</div>
		<div class="card medium row">
			<div class="card small space neumorphic-inset row">
				<h2 class="">
					{project.category}
					{#if project.sub_category === true}, {project.sub_category}{/if}
				</h2>
			</div>
			<div class="card small neumorphic-inset row">
				<h3>Tidsfrist:</h3>
				<p>{project.due_date}</p>
			</div>
			<spacer></spacer>
			<spacer></spacer>
			<spacer></spacer>
		</div>

		<div class="tag-row">
			<div class="tag green">{project.lister_class}</div>
			|
			{#each project.tags as tag}
				<div class="tag">{tag}</div>
			{/each}
		</div>
	</div>
	<div class="icon favorite-button">
		{#if project.heart === false}
			<i class="fa-lg far fa-heart"></i>
		{:else}
			<i class="fas fa-heart"></i>
		{/if}
	</div>
</div>

<style>
	/* NEUMORPHIC */

	.main {
	}

	.main:hover {
		box-shadow:
			inset 3px 3px 6px #c4c4c47e,
			inset -3px -3px 6px #ffffff,
			inset 0px 0px 20px #c4c4c47e;
		box-shadow:
			1px 1px 1px #b1b1b1,
			-1px -1px 1px #ffff,
			5px 5px 10px #c4c4c47e,
			-5px -5px 10px #ffffff;
	}

	.tag {
		padding: 1px 10px;
		border-radius: 1rem;
		background-color: var(--shadow-inv);
		display: flex;
		flex-wrap: nowrap;
		font-size: small;
	}

	.tag.green {
		background: rgba(from var(--accent) r g b / 50%);
	}

	.tag-row {
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
		column-gap: 0.5rem;
		row-gap: 0.5rem;
	}

	.column {
		flex-direction: column;
		row-gap: 1rem;
	}

	.row {
		display: flex;
		align-items: flex-end;
		/* align-items: center; */
		justify-content: space-between;
		column-gap: 1rem;
	}

	spacer {
		width: 100%;
	}

	.space {
		width: 100%;
		column-gap: 100%;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		flex-wrap: nowrap;
		row-gap: 1rem;
	}

	.card .mini {
		border-radius: 0.5rem;
		padding: 0.25rem 0.5rem;
		margin-bottom: -0.5rem;
	}

	.card .small {
		border-radius: 1rem;
		padding: 0.5rem 1rem;
		/* align-items: baseline; */
		align-items: flex-end;
		/* padding: .5rem .5rem; */
		/* padding: .5rem .5rem; */
		/* display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
		flex-wrap: nowrap; */
	}

	.card .medium {
		border-radius: 1rem;
		padding: 0rem;
		/* flex-direction: column; */

		/* width: 100%; */
		/* row-gap: 1rem; */
		/* column-gap: 1rem; */
	}

	.card .big {
		border-radius: 2rem;
		padding: 2rem;
		width: 100%;
		row-gap: 1rem;
		column-gap: 1rem;
	}

	.card {
		border-radius: 2rem;
		padding: 2rem;
		width: 100%;
		row-gap: 1rem;
		column-gap: 1rem;

		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-wrap: nowrap;
	}
	/*  backup
	.thumbnail {
		height: 100%;
		display: flex;
		align-items: stretch;
		align-content: center;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
		padding:1rem 0;
		padding:0;
		margin:0;
	} */

	.neumorphic-image {
		box-shadow:
			inset 5px 5px 6px #c4c4c47e,
			/* inset -3px -3px 6px #ffffff,  */ inset -5px -5px 6px #c4c4c47e,
			inset 0px 0px 20px #c4c4c47e;
	}
	.thumbnail {
		/* background-image: {project.image}; */
		height: 100%;
		display: flex;
		align-items: stretch;
		align-content: center;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
		padding: 1rem 0;
		padding: 0;
		margin: 0;
		height: 100%;
		width: 50%;
		min-width: 200px;
		max-width: 350px;
		border-radius: 1rem;
	}

	.thumbnail .card {
		height: 100%;
		border-radius: 0.5rem;
		padding: 0;
		overflow: hidden;
		border-width: 1px;
		border-color: #b1b1b1;
		/* height: 100%; */
		/* display: flex;
		flex-direction: column;
		align-items: center; */
	}

	.thumbnail .card img {
		/* object-fit: cover; */
		object-fit: fill;
		/* object-fit:contain; */
		/* height: 250px; */
		height: 200px;
		/* height: 150px; */
		height: 100%;
		/* width: 350px; */
		width: 450px;
	}
	.icon {
		justify-content: center;
		align-items: center;
		align-content: center;
		display: flex;
		/* height:3rem; */
		/* width:3rem; */
		/* background-color: aqua; */
	}
</style>
