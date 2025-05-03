
<script lang="ts">
	import "./form.css";
	type TagIntent = 'include' | 'exclude';
    type TagDisplay = 'true' | 'false';
    type TagType = 'info' | 'field';

    let searchQuery = $state('');
    let showAllTags = $state(false);
    let visibleTagsLimit = 7;
	let max_height = $state('86px');

    const {
        tagIntent = 'include' as TagIntent,
        display = 'false' as TagDisplay,
        tagType = 'field' as TagType,
        selectedTags = [] as string[],
        onTagChange = (tags: string[]) => {} 
    } = $props<{
        tagIntent?: TagIntent,
        display?: TagDisplay,
        tagType?: TagType,
        selectedTags?: string[],
        onTagChange?: (tags: string[]) => void
    }>();

    function toggleTag(tag: string) {
        let updatedTags = selectedTags.includes(tag)
            ? selectedTags.filter(t => t !== tag)
            : [...selectedTags, tag];

        onTagChange(updatedTags);
    }
    function getFieldTags(): string[] {
        return [
            'asfaltering', 'brønnboring', 'drenering', 'radon',
            'sprenging', 'graving', 'gulv', 'glassarbeid',
            'termografering', 'betong', 'vanntetting', 'taktekking',
            'steinlegger', 'snørydding', 'hagestell',
        ];
    }

    function getInfoTags(): string[] {
        return [
            'stort_prosjekt', 'lite_prosjekt', 'enmannsjobb',
            'flermannsjobb', 'haster', 'innejobb', 'utejobb',
            'trapp', 'kjøretøy_tilgang',
        ];
    }

    function handleTagClick(tag: string) {
        if (display === 'true') {
            console.log(`Navigating to search with tag: ${tag}`);
        }
    }

    const allTags = $derived(
        tagType === 'field' ? getFieldTags() : getInfoTags()
    );

    const filteredTags = $derived(
        allTags.filter(tag => 
            tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

	
	let title = $state()
	let sub_title = $state()



</script>
<div class="tags-container">
	<h2>{title}</h2>
	<h3>{sub_title}</h3>
    {#if display === 'false'} 
        <input 
            type="text" 
            bind:value={searchQuery}
            placeholder="Søk etter tagger..."
            class="field search"
        />
    {/if}

    <div class="tags-grid {display === 'true' ? 'profile-tags' : ''}" style="--max_height: {max_height}">
        {#each (showAllTags ? filteredTags : filteredTags.slice(0, visibleTagsLimit)) as tag}
            <button
                class="tag {display === 'true' ? 'profile-tag' : ''} 
                      {selectedTags.includes(tag) && display !== 'true' ? 'selected' : ''} 
                      {tagIntent}"
                onclick={() => display === 'true' ? handleTagClick(tag) : toggleTag(tag)}
                disabled={display === 'true'}
            >
                {tag.replace(/_/g, ' ')}
                {#if tagIntent === 'exclude' && selectedTags.includes(tag) && display !== 'true'}
                    <!-- <span class="exclude-icon">✕</span> -->
                {/if}
            </button>
        {/each}
    </div>

    {#if filteredTags.length > visibleTagsLimit}
        <button 
            class="show-more-button" 
            onclick={() => {
                showAllTags = !showAllTags;
                max_height = showAllTags ? 'none' : '80px';
            }}>
            {showAllTags ? 'Vis færre' : 'Vis flere'}
        </button>
    {/if}
</div>

<style>
    .tags-container {
        max-width: 600px;
        margin: 0 auto;
    }

    /* .tag-search {
        width: 100%;
        padding: 8px;
        margin-bottom: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
    } */

    /* .tags-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
		overflow: hidden;
		max-height: var(--max_height);
		padding:.5rem;
    } */

	/* NEUMORPHIC	 */
	.tags-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
		overflow: hidden;
		max-height: var(--max_height);
		/* max-width: {max_width}; */
		padding:.5rem;
    }

    .tag {
        padding: 6px 12px;
        /* border: 1px solid #ddd; */
        border-radius: 16px;
        /* background:#f7f7f7; */
        background: var(--primary-bg);
        /* background: var(--secondary-bg); */
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.9rem;
		box-shadow:  1px 1px 1px #b1b1b1,  -1px -1px 1px #ffff, 3px 3px 6px  #c4c4c47e,  -3px -3px 6px #ffff;


    }

    .include.tag.selected {
        /* background: #e3f2fd; */
        /* border-color: #2196f3; */
		/* box-shadow: inset 3px 3px 2px var(--accent-dark), inset -3px -3px 2px var(--hightlight); */
		box-shadow: inset 3px 3px 2px var(--accent-dark), inset -1px -1px 1px var(--white), inset -5px -5px 5px var(--accent-bright) ;
		background: var(--accent-translucent);
		/* background: var(--accent-bright); */

    }
	/* background: #ffebee; */
    .exclude.tag.selected {
		border-color: #f44336;
		
		box-shadow: inset 3px 3px 5px #aa7975, inset -1px -1px 1px var(--white), inset -3px -3px 5px  #ffcac6;
		background: var(--negative-accent-bright-translucent);
        background: #ffdee3;
        
		/* background: #f44336a9; */

    }

    .exclude-icon {
        color: #f44336;
        color: #a50e00;
        margin-left: 4px;
    }

    .profile-tags {
        gap: 6px;
    }

    .profile-tag {
        padding: 4px 8px;
        font-size: 0.8rem;
        background: #f0f0f0;
        color: #555;
        border: none;
        cursor: pointer;
    }

    .profile-tag:hover {
        background: #e0e0e0;
    }


	/* NEUMORPHIC */
    .show-more-button {
        margin-top: 12px;
        padding: 6px 12px;
        background: transparent;
        /* border: 1px solid #ddd; */
        cursor: pointer;
        color: var(--accent-dark);
        border-radius: 3rem;
		box-shadow: inset 3px 3px 6px  #c4c4c47e, inset -3px -3px 6px #ffffff, inset 0px 0px 20px  #c4c4c47e;
		box-shadow:  1px 1px 1px #b1b1b1,   -1px -1px 1px #ffff,  5px 5px 10px  #c4c4c47e,  -5px -5px 10px #ffffff; 

		
    }

    .show-more-button:hover {
        background: #f5f5f5;
    }

    /* .show-more-button {
        margin-top: 12px;
        padding: 6px 12px;
        background: transparent;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
        color: #2196f3;
    }

    .show-more-button:hover {
        background: #f5f5f5;
    } */
</style>