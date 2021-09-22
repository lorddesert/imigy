<script>
  import {onMount} from 'svelte'
  import Home from './Home.svelte'
  import Gallery from './Gallery.svelte'
  import Login from './Login.svelte'
  
  export let showGallery = false
  export let showGlobalFeed = false
  export let uid = ''
  const auth = firebase.auth()

  onMount(async () => {
        const thereIsUid = window.localStorage.getItem('uid')

        if (thereIsUid) {
          setUid(thereIsUid) // This is bad nomenclature. Sorry.
        } else if(auth.currentUser) {
          setUid(auth.currentUser.uid)
        }
    
  })

  function setShowGallery() {
    showGallery = !showGallery
  }
  
  function setShowGlobalFeed() {
    showGlobalFeed = !showGlobalFeed
  }

  function closeSession() {
    setUid('')
    window.localStorage.setItem('uid', '')
    alert("Session closed!\nCome back later!!!")
  }

  const setUid = (newUid) => uid = newUid

</script>
{#if uid}

  {#if showGlobalFeed}
    <GlobalFeed />

  {:else if showGallery}
    <Gallery 
      {setShowGallery}
      {uid}
    />

  {:else}
    <Home 
      {setShowGallery}
      {closeSession}
      {uid}
    />
    
  {/if}

  {:else}
    <Login 
      {setUid}
    />
{/if}


<style>
</style>