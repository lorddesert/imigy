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
        let imgURL = await itemRef.getDownloadURL()
        images = [...images, imgURL]
      });
      images = images
    } catch (error) {
      console.log(error)
      alert('Ups, something happened, come and see the console!')
    }
  }

  onMount(async () => {
    await listImages()
    console.log(uid)
    console.log('finished', images)
  })
</script>

<button on:click={setShowGallery}>Return home</button>
{#each images as img}
  <figure>
    <img src={img} alt="something nice and pretty" loading="lazy">
    <figcaption>my personal collection image</figcaption>
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
    text-align: center;
    margin-bottom: 3em;
    border: 2px solid #ccc;
    padding: 1em 0;
  }
  figcaption {
    font-size: 1.3rem;
  }

</style>