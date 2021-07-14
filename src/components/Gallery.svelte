<script>
  import { onMount } from 'svelte'

  // State
  export let setShowGallery
  export let uid
  let images = []

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

  onMount(async () => {
    await listImages()
  })
</script>

<button on:click={setShowGallery}>Return home</button>
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
  }
  figcaption {
    font-size: 1.3rem;
  }

@media screen and (max-width: 480px) {
  img {
    max-width: 100%;
  }

  figure {
    margin: 0 !important;
  }

  img:not(:last-of-type) {
    margin-bottom: 2em;
  }
}
</style>