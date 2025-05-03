<!-- <script lang="ts">
    type Tab = 'inkluder' | 'ekskluder';
    let activeTab = $state<Tab>('inkluder');
</script>

<div class="tabs-container">
    <div class="tabs-header">
        <button
            class:active={activeTab === 'inkluder'}
            onclick={() => activeTab = 'inkluder'}
        >
            Inkluder
        </button>
        <button
            class:active={activeTab === 'ekskluder'}
            onclick={() => activeTab = 'ekskluder'}
        >
            Ekskluder
        </button>
    </div>

    <div class="tabs-content">
        {#if activeTab === 'inkluder'}
            <slot name="inkluder" />
        {:else}
            <slot name="ekskluder" />
        {/if}
    </div>
</div> -->
<script lang="ts">
    type Tab = 'inkluder' | 'ekskluder';
    let activeTab = $state<Tab>('inkluder');
    
    const {
        includeTags = [] as string[],
        excludeTags = [] as string[],
        onIncludeTagsChange = (tags: string[]) => {},
        onExcludeTagsChange = (tags: string[]) => {}
    } = $props<{
        includeTags?: string[],
        excludeTags?: string[],
        onIncludeTagsChange?: (tags: string[]) => void,
        onExcludeTagsChange?: (tags: string[]) => void
    }>();
</script>

<div class="tabs-container">
    <div class="tabs-header">
        <button
            class:active={activeTab === 'inkluder'}
            on:click={() => activeTab = 'inkluder'}
        >
            Inkluder
        </button>
        <button
            class:active={activeTab === 'ekskluder'}
            on:click={() => activeTab = 'ekskluder'}
        >
            Ekskluder
        </button>
    </div>

    <div class="tabs-content">
        {#if activeTab === 'inkluder'}
            <slot name="inkluder" {includeTags} {onIncludeTagsChange} />
        {:else}
            <slot name="ekskluder" {excludeTags} {onExcludeTagsChange} />
        {/if}
    </div>
</div>


<style>
    .tabs-container {
		margin:0;
		padding:0;
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
    }

    .tabs-header {
        display: flex;
        border-bottom: 1px solid #e0e0e0;
    }

    .tabs-header button {
        flex: 1;
        padding: 12px 16px;
        background: none;
        border: none;
        cursor: pointer;
        font-weight: 600;
		color: var(--secondary);
        transition: all 0.2s ease;
        position: relative;
    }

    .tabs-header button.active {
        color: var(--tertiary-bg);
    }

    .tabs-header button.active::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--tertiary-bg);
    }

    .tabs-header button:hover:not(.active) {
        background-color: #f5f5f5;
        background-color: var(--secondary-bg);
    }

    .tabs-content {
        padding: 16px;
    }
</style>