<script>
    import Switch from './Switch.svelte'

    export let switchView


</script>

<aside>
    <h3 class="is-$white">View</h3>
    <p class="view-switch">
      <span id="posts" class="selected">Posts</span> <Switch nonTheme action={switchView} /> <span id="list" class="">List</span>
    </p>
</aside>

<style>
    
  aside {
    margin-left: 20px;
    color: white;
  }

  span {
    transition: all ease 400ms;
    font-size: 1.2rem;
    font-weight: bold;
  }

  span:not(.selected) {
    color: var(--card-background);
  }

  .view-switch {
    display: flex;
    gap: .5em; 
  }

  .selected {
    font-weight: bold;
    color: crimson;
  }

  .copyBtn {
    transition: all ease 150ms;
  }

</style>