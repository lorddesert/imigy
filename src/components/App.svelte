<script>
  import Home from './Home.svelte'
  import Gallery from './Gallery.svelte';
  
  export let showGallery = false

  function setShowGallery() {
    showGallery = !showGallery
  }
</script>

{#if showGallery}
  <Gallery 
    {setShowGallery} 
  />
{:else}
  <Home 
    {setShowGallery} 
  />
{/if}

<style>
</style>