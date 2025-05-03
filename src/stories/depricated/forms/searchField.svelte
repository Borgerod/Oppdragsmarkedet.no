<script>
    import './form.css';
    import '../theme.css';
	let searchQuery = $state('');

</script>


<div class="searchbar-container">
	<input 
            type="text" 
            bind:value={searchQuery}
            placeholder="Søk etter prosjekt..."
            class="field search"
        />
</div>


<style>
	
	/* is a fake header extention */
	.searchbar-container{
		padding: 0 4rem;
		margin-bottom: 2rem;
		height: 2rem;
		background-color: var(--tertiary-bg)
	}

</style>