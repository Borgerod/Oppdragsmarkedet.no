<script lang=ts>
	let searchQuery = $state('');
	let showAllTags = $state(false);
	const visibleTagsLimit = 7;
  
	const {
	  tagIntent = 'include',
	  display = 'false',
	  tagType = 'field',
	  selectedTags = [],
	  onTagChange = () => {}
	} = $props();
  
  
	const fieldTags = [
	  'asfaltering', 'brønnboring', 'drenering', 'radon',
	  'sprenging', 'graving', 'gulv', 'glassarbeid',
	  'termografering', 'betong', 'vanntetting', 'taktekking',
	  'steinlegger', 'snørydding', 'hagestell'
	];
  
	const jobAttributesTags = [
	  'stort_prosjekt', 'lite_prosjekt', 'enmannsjobb',
	  'flermannsjobb', 'haster', 'innejobb', 'utejobb',
	  'trapp', 'kjøretøy_tilgang'
	];
  
	const allTags = $derived(
	  tagType === 'field' ? fieldTags :
	  tagType === 'job_attributes' ? jobAttributesTags : []
	);
	const filteredTags = $derived(
	  allTags.filter(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
	);
  
	function toggleTag(tag: string) {
	  const updatedTags = selectedTags.includes(tag)
		? selectedTags.filter(t => t !== tag)
		: [...selectedTags, tag];
	  onTagChange(updatedTags);
	}
  
	function handleTagClick(tag: string) {
	  if (display === 'true') {
		console.log(`Navigating to search with tag: ${tag}`);
	  }
	}
  </script>
  
  <div class="tags-container">
	{#if display === 'false'}
	  <input 
		type="text" 
		bind:value={searchQuery}
		placeholder="Søk etter tagger..."
		class="search-field"
	  />
	{/if}
  
	<div class="tags-grid" style:maxHeight={showAllTags ? 'none' : '86px'}>
	  {#each (showAllTags ? filteredTags : filteredTags.slice(0, visibleTagsLimit)) as tag}
		<button
		  class="tag {display === 'true' ? 'profile' : ''} 
				 {selectedTags.includes(tag) && display !== 'true' ? 'selected' : ''}
				 {tagIntent}"
		  onclick={() => display === 'true' ? handleTagClick(tag) : toggleTag(tag)}
		  disabled={display === 'true'}
		>
		  {tag.replace(/_/g, ' ')}
		</button>
	  {/each}
	</div>
  
	{#if filteredTags.length > visibleTagsLimit}
	  <button 
		class="toggle-tags"
		onclick={() => showAllTags = !showAllTags}
	  >
		{showAllTags ? 'Vis færre' : 'Vis flere'}
	  </button>
	{/if}
  </div>
  
  <style>
	.tags-container {
	  display: flex;
	  flex-direction: column;
	  gap: 0.8rem;
	}
  
	/* .search-field {
	  padding: 0.5rem;
	  border: 1px solid #ccc;
	  border-radius: 4px;
	  width: 100%;
	} */
  
	.tags-grid {
	  display: grid;
	  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
	  gap: 0.5rem;
	  overflow-y: hidden;
	  transition: max-height 0.3s ease;
	}
  
	.tag {
	  padding: 0.4rem 0.8rem;
	  border-radius: 999px;
	  border: 1px solid #ccc;
	  /* background: white; */
	  cursor: pointer;
	  transition: all 0.2s ease;
	}
	/* .tag.include.selected {
	  background: #e0e0e0;
	  border-color: #999;
		  color:black;
	} */
	.tag.include.selected {
	  background: #e8f5e9;
		  border-color: #4caf50;
		  color:black;
	}
	  
	.tag.exclude.selected {
	  background: #ffebee;
		  border-color: #f44336;
		  color:black;
	}
  
	.tag.include:hover {
	  /* background: #e8f5e9; */
	  border-color: #4caf50;
		  color:black;
	}
  
	.tag.exclude:hover {
	  /* background: #ffebee; */
	  border-color: #f44336;
		  color:black;
	}
  
	.toggle-tags {
	  align-self: flex-start;
	  background: none;
	  border: none;
	  /* color: #666; */
	  cursor: pointer;
	  padding: 0.2rem 0;
	}
  </style>