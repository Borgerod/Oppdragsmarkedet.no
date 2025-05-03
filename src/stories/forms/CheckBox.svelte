<script lang="ts">
  let {
    options = [] as string[],
    selectedOptions = $bindable([] as string[]),
    label = ''
  } = $props();

  function toggleOption(option: string) {
    selectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(o => o !== option)
      : [...selectedOptions, option];
  }
</script>

<div class="checkbox-group">
  <label for="checkbox-group">{label}</label>
  <div class="options" id="checkbox-group" role="group" aria-label={label}>
    {#each options as option}
      <label class="checkbox-option">
        <input
          type="checkbox"
          checked={selectedOptions.includes(option)}
          onchange={() => toggleOption(option)}
        />
        {option}
      </label>
    {/each}
  </div>
</div>


<style>
  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .options {
    display: flex;
    gap: 1rem;
  }

  .checkbox-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
