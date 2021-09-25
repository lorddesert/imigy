
<script>
    import saveImage from '../services/saveImage.js'
  
    // State
    export let setShowGallery
    export let closeSession
    export let uid
    export let setShowGlobalFeed
    export let darkTheme
    export let toggleTheme
  
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

<!-- Rounded switch -->

<header>
	<h1>Hello man!</h1>
  <label class="switch">
    <input type="checkbox" on:change={toggleTheme}>
    <span class="slider round"></span>
  </label>
</header>

  <div class="field is-grouped">
    <button class="button is-rounded control {darkTheme ? "is-dark" : ''}" on:click={setShowGallery}>
      My collection
    </button>

    <button class="button is-rounded control {darkTheme ? "is-dark" : ''}" on:click={setShowGlobalFeed}>
      Global feed
    </button>

    <button class="button is-danger is-outlined is-rounded control {darkTheme ? "is-dark" : ''}" on:click={closeSession} >
      Close session
    </button>
  </div>
  
  <div style="display: grid; grid-gap: 1em">
    <button class="button  is-medium is-danger {darkTheme ? "is-dark" : ''}" on:click={globalUpload}>Upload to the global feed</button>
    <button class="button  is-medium {darkTheme ? "is-dark" : ''}" on:click={galleryUpload}>Upload</button>
  </div>

  {#if currentImage}
    <img src={currentImage} alt="Something maybe"> 
  {/if}
  <!-- Validate the files in the server.  -->


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

</main>

<style>

    main {
    display: grid;
    place-items: center;
    min-height: 100vh;
    font-family: 'Dosis', sans-serif;
	}

  header {
    display: grid;
    place-items: center end;
    width: 100%;
    grid-template-columns: 1fr auto 1fr;
  }

  header h1 {
    grid-column: 2/3;
  }

  label {
    margin-right: 2em;
  }

  img {
    max-width: 100%;
  }

  .orange {
    background: var(--orange)
  }

  /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--background-color);
  -webkit-transition: .4s;
  transition: .4s;
  border: 2px solid var(--font-color);
}

.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 3px;
  bottom: 3px;
  background-color: var(--font-color);
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--background-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--font-color);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>