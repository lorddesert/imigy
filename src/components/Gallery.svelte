<script>
  import { onMount } from 'svelte'

  // State
  export let setShowGallery
  export let uid
  export let setShowGlobalFeed
  export let darkTheme

  let images = []
  let title = {
    gallery: "My Gallery",
    global: "Global Feed"
  }

  let imagesRef = firebase.storage().ref().child(`images/${uid}/`)

  async function listImages () {
    try {
      let res = await imagesRef.listAll()
      res.items.forEach( async itemRef => {
        let img = {}

        let regex = /(.\w{3,}$)/
        let name = itemRef.name.replace(regex, '')
        name = name.replace(/(-|_)/g, ' ')
        img.name = name
        img.URL = await itemRef.getDownloadURL()

        images = [...images, img]
      });
      images = images

    } catch (error) {
      console.log(error)
      alert('Ups, something happened, come and see the console!')
    }
  }

  function returnHome() {
    if(uid === "global") setShowGlobalFeed()
    else setShowGallery()
    
  }

  /* This doesn't work properly xD */
  async function checkIfThereIsImages() {
    if (!images.length) document.querySelector("#loader").innerHTML = "Nothing here, empty ^^"

  }

  onMount(async () => {
    await listImages()
    await checkIfThereIsImages()

  })
</script>

<button class="button is-rounded is-medium {darkTheme ? "is-dark" : ''}" style="margin: 1em;" on:click={returnHome}>Return home</button>

<h1 class="block">{uid === "global" ? title.global : title.gallery}</h1>
{#each images as img}
  <figure>
    <img src={img.URL} alt={`${img.name}`} loading="lazy">
    <figcaption>{img.name}</figcaption>
  </figure>
{:else}
  <p id="loader">Loading _>:P)...</p>
{/each}


<!-- this block renders when photos.length === 0 -->

<style>

  h1 {
    text-align: center;
  }

  #loader {
    display: grid;
    place-items: center;
    width: 100vw;
    height: 100vh;
    text-align: center;
    font-size: 3rem;
  }
  img {
    max-width: 100%;
    padding: 2em 0;
  }
  
  figure {
    display: grid;
    place-items: center;
    margin: 0 auto;
    padding: 1em 0;
    width: fit-content;
	  max-width: 70vw;
    border-radius: 5px;

    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    padding: 2em;
    background-color: var(--card-background);
    

  }

  figure:not(:last-child) {
    margin-bottom: 2em;
  }
  figcaption {
    font-size: 1.3rem;
    color: var(--card-font-color);
  }

@media screen and (max-width: 480px) {
  img {
    max-width: 100%;
  }

  figure {
    margin: 0 !important;
    max-width: 100%;

  }

  img:not(:last-of-type) {
    margin-bottom: 2em;
  }
}
</style>