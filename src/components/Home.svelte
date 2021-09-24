
<script>
    import saveImage from '../services/saveImage.js'
  
    // State
    export let setShowGallery
    export let closeSession
    export let uid
    export let setShowGlobalFeed
  
    let storage = firebase.storage()
    let imageStorage = storage.ref('images/')
      
    let currentImage
  
  
    function galleryUpload() {
      document.querySelector('#galleryUpload').click()
    }

    function globalUpload() {
      document.querySelector('#globalUpload').click()
    }
  
    async function uploadImage(e, uploadToGlobal = false) {
      const file = e.target.files[0]
      const uploadTarget = uploadToGlobal ? "global" : uid
  
      /* We show a preview of the image */
      currentImage = window.URL.createObjectURL(e.target.files[0])

      // We need to finish the global post feed upload.
      await saveImage(imageStorage, file, uploadTarget)
    }

    async function uploadGlobalImage(e) {
      try {
        await uploadImage(e, true);
        
      } catch (error) {
        console.log(error)
        alert('Ups, something went wrong!');
      }
    }
  

  // lordvlaim
  </script>

<main>
	<h1>Hello man!</h1>

  <div>
    <button on:click={setShowGallery}>
      My collection
    </button>

    <button on:click={setShowGlobalFeed}>
      Global feed
    </button>

    <button on:click={closeSession} style="color:firebrick; border-color: firebrick">
      Close session
    </button>
  </div>
  
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

  <input 
    id="galleryUpload" 
    type="file" 
    accept="image/*" 
    style="display: none;"
    on:change={uploadImage}
  />

  <input 
    id="globalUpload" 
    type="file" 
    accept="image/*" 
    style="display: none;"
    on:change={uploadGlobalImage}
  />
  
  <button class="primary" on:click={galleryUpload}>Upload <strong>IMG</strong></button>
  <button class="primary" on:click={globalUpload}>Upload <strong>IMG</strong> to the global profile</button>
  
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