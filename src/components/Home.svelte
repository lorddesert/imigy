<script>
  import saveImage from "../services/saveImage.js";
  import { getApp } from "firebase/app";
  import { getStorage, ref, getDownloadURL } from "@firebase/storage";
  import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
  import { onMount } from "svelte";

  // State
  export let setShowGallery;
  export let closeSession;
  export let uid;
  export let setShowGlobalFeed;
  export let darkTheme;
  export let serverImages = [];

  const storage = getStorage(getApp());
  let imageStorage = ref(storage, "images/");

  let currentImage;
  const db = getFirestore();

  onMount(async () => {
    await getImages();
  });

  function galleryUpload() {
    document.querySelector("#galleryUpload").click();
  }

  function globalUpload() {
    document.querySelector("#globalUpload").click();
  }

  async function uploadImage(e, uploadToGlobal = false) {
    try {
      const file = e.target.files[0];
      const uploadTarget = uploadToGlobal ? "global" : uid;

      /* We show a preview of the image */
      currentImage = window.URL.createObjectURL(e.target.files[0]);

      // We need to finish the global post feed upload.
      const imageURL = await saveImage(imageStorage, file, uploadTarget);
      await postImagesOnDB(file, imageURL);

      alert("Done!");
    } catch (error) {
      alert(`ERROR:\n ${error}`);
      console.error(error);
    }
  }

  async function uploadGlobalImage(e) {
    try {
      await uploadImage(e, true);
    } catch (error) {
      console.log(error);
      alert("Ups, something went wrong!");
    }
  }

  async function postImagesOnDB(image, imageURL) {
    try {
      const newImg = {
        name: image.name,
        URL: await getDownloadURL(imageURL.ref),
      };
      let imgs = [];

      await getImages();

      if (Array.isArray(serverImages)) imgs.push(...serverImages);

      imgs.push(newImg);

      setDoc(doc(db, `users/${uid}`), { imgs });
    } catch (error) {
      alert(`ERROR:\n ${error}`);
      console.error(error);
    }
  }

  async function getImages() {
    const response = await getDoc(doc(db, `users/${uid}`));
    serverImages = await response.get("imgs");
  }
  // lordvlaim
</script>

<main>
  <!-- Rounded switch -->

  <header>
    <h1>Hello man!</h1>
  </header>

  <div class="field is-grouped">
    <button
      class="button is-rounded control {darkTheme ? 'is-dark' : ''}"
      on:click={setShowGallery}
    >
      My collection
    </button>

    <button
      class="button is-rounded control {darkTheme ? 'is-dark' : ''}"
      on:click={setShowGlobalFeed}
    >
      Global feed
    </button>

    <button
      class="button is-danger is-outlined is-rounded control {darkTheme
        ? 'is-dark'
        : ''}"
      on:click={closeSession}
    >
      Close session
    </button>
  </div>

  <div style="display: grid; grid-gap: 1em">
    <button
      class="button  is-medium is-danger {darkTheme ? 'is-dark' : ''}"
      on:click={globalUpload}>Upload to the global feed</button
    >
    <button
      class="button  is-medium {darkTheme ? 'is-dark' : ''}"
      on:click={galleryUpload}>Upload</button
    >
  </div>

  {#if currentImage}
    <p class="subtitle  success" style="">
      Image uploaded! <strong class="title  success"
        >See the preview below!</strong
      >
    </p>
    <!-- {:else}
    <p class="title">Loading... >:P</p> -->
  {/if}

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

{#if currentImage}
  <img src={currentImage} alt="Something maybe" />
{/if}

<style>
  .success {
    color: hsl(171, 100%, 41%);
  }

  main {
    display: grid;
    place-items: center;
    min-height: 100vh;
    font-family: "Dosis", sans-serif;
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
  img {
    max-width: 100%;
  }
</style>
