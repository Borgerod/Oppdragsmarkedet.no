<script lang="ts">
	import { Fa } from 'svelte-fa';
    import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
    import './form.css';
    import '../theme.css';
	
    let isOpen = $state(false);
    let { title = '', tooltip = '' } = $props();
    let showTooltip = $state(false);

</script>


<div class="accordion">
    <button 
        class="accordion-header " 
        onclick={() => isOpen = !isOpen}
        aria-expanded={isOpen}
        onmouseenter={() => showTooltip = true}
        onmouseleave={() => showTooltip = false}
        onfocus={() => showTooltip = true}
        onblur={() => showTooltip = false}
    >
        <h2>{title}</h2>
        {#if tooltip && showTooltip}
            <div class="filter tooltip">{tooltip}</div>
        {/if}
		<Fa icon={faChevronDown} />
	</button>
    
    {#if isOpen}
        <div class="accordion expanded"  >
            <slot/>
        </div>
    {/if}
</div>
<!-- <style>
	
    .accordion-header {
		display: flex;
		padding: 1rem;
		width: 100%;
		justify-content: space-between;
		align-items: center;
        position: relative; 
        margin-bottom: 1rem;   
		border-bottom: 1px solid var(--secondary);
    }
    
    .tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 0.5rem;
        border-radius: 4px;
        font-size: 0.875rem;
        white-space: nowrap;
        margin-bottom: 0.5rem;
        z-index: 10;
    }
    
    .tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #333 transparent transparent transparent;
    }
</style> -->



<!--  NEUMORPHIC  -->
<style>


</style>


