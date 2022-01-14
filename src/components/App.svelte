<script>
  import {onMount} from 'svelte'
  import Home from './Home.svelte'
  import Gallery from './Gallery.svelte'
  import Login from './Login.svelte'
  import Profile from './Profile.svelte'
  import ThemeSwitch from './ThemeSwitch.svelte'
  import { getAuth } from 'firebase/auth'
  import { getApp } from 'firebase/app'
  
  export let showGallery = false
  export let showGlobalFeed = false
  export let showProfile = false

  export let uid = ''
  export let darkTheme = false

  const auth = getAuth(getApp())
  const currentUser = auth.currentUser

  onMount(async () => {
        const thereIsUid = window.localStorage.getItem('uid')
        const themePreference = window.localStorage.getItem('theme')

        if (thereIsUid) {
          setUid(thereIsUid) // This is bad nomenclature. Sorry.

          if (themePreference) {
            document.querySelector("#themeSlider").click()
          }
        } else if(currentUser) {
          setUid(currentUser.uid)
        }
    
  })

  function setShowGallery() {
    showGallery = !showGallery
  }
  
  function setShowGlobalFeed() {
    showGlobalFeed = !showGlobalFeed
  }

  function setShowProfile() {
    showProfile = !showProfile
    showGallery = false
    showGlobalFeed = false

  }
  
  function closeSession() {
    setUid('')
    window.localStorage.setItem('uid', '')
    alert("Session closed!\nCome back later!!!")
  }

 function setUid (newUid) {
   uid = newUid
  }

  function toggleTheme() {
    document.querySelector("html").classList.toggle("dark-theme")
    darkTheme = !darkTheme

    darkTheme ? window.localStorage.setItem('theme', 'dark-theme') :  window.localStorage.setItem('theme', '')
  }
  function toggleNebulaTheme() {
    document.querySelector("html").classList.toggle("nebula-theme")
    darkTheme = !darkTheme
  }
  





</script>

<ThemeSwitch {toggleTheme} {toggleNebulaTheme}/>
{#if uid}
<!-- <Profile setShowGallery={setShowGallery}/> -->

  {#if showGlobalFeed}
    <Gallery 
      {showGlobalFeed}
      {setShowGallery}
      {setShowGlobalFeed}
      uid = "global"
      {darkTheme}
    />

  {:else if showGallery}
    <Gallery 
      {setShowGallery}
      {uid}
      {darkTheme}

    />

  {:else if showProfile}
    <Profile />
  {:else}
    <Home 
      {setShowGallery}
      {setShowGlobalFeed}
      {closeSession}
      {uid}
      {darkTheme}
    />

  {/if}

  {:else}
    <Login 
      {setUid}
    />
{/if}


<style>
</style>