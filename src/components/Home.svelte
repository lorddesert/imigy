
<script>
    import saveImage from '../services/saveImage.js'
  
    // State
    export let name
    export let setShowGallery

  
    let storage = firebase.storage()
    let imageStorage = storage.ref('images/')
      
    let currentImage
  
  
    function fileCLick() {
      document.querySelectorAll('#file')[0].click()
    }
  
    async function changeImage(e) {
      const file = e.target.files[0]
  
      currentImage = window.URL.createObjectURL(e.target.files[0])
      console.log(currentImage)
      await saveImage(imageStorage, file)
    }
  

  // lordvlaim
  </script>

<main>
	<h1>Hello {name}!</h1>
  <button on:click={setShowGallery}>
    My collection
  </button>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

  <input 
    id="file" 
    type="file" 
    accept="image/*" 
    style="display: none;"
    on:change={changeImage}
  />
  
  <button class="primary" on:click={fileCLick}>Upload <strong>IMG</strong></button>
  {#if currentImage}
    <img src={currentImage} alt="Something maybe"> 
  {/if}
  <!-- Validate the files in the server.  -->
</main>

<style>

    main {
    display: grid;
    place-items: center;
    min-height: 100vh;

	}

  img {
    max-width: 100%;
  }

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

</style>