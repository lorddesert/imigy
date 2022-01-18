<script>
  import { onMount } from "svelte";
  import { getApp } from "@firebase/app";
  import { getStorage, ref, listAll, getDownloadURL } from "@firebase/storage";
  import ViewController from "./ViewController.svelte";
  import { doc, collection, setDoc, getFirestore, arrayUnion } from "firebase/firestore"; 
  // State
  export let setShowGallery;
  export let uid;
  export let setShowGlobalFeed;
  export let darkTheme;
  let listViewMode = false;

  let images = [];
  let title = {
    gallery: "My Gallery",
    global: "Global Feed",
  };

  const firebase = getApp();
  const storage = getStorage(firebase);

  let imagesRef = ref(storage, `images/${uid}/`);

  async function listImages() {
    try {
      let res = await listAll(imagesRef);
      res.items.forEach(async (itemRef) => {
        let img = {};

        let regex = /(.\w{3,}$)/;
        let name = itemRef.name.replace(regex, "");
        name = name.replace(/(-|_)/g, " ");
        img.name = name;
        img.URL = await getDownloadURL(itemRef);

        images = [...images, img];
      });
      images = images;
    } catch (error) {
      console.log(error);
      alert("Ups, something happened, come and see the console!");
    }
  }

  function returnHome() {
    if (uid === "global") setShowGlobalFeed();
    else setShowGallery();
  }

  /* This doesn't work properly xD */
  async function checkIfThereIsImages() {
    if (!images.length)
      document.querySelector("#loader").innerHTML = "Nothing here, empty ^^";
  }

  async function copyLink(e, URL, name) {
    await navigator.clipboard.writeText(`${name}\n\n\n${URL}`);
    const copyBtn = e.target;
    copyBtn.classList.toggle("is-danger");
    copyBtn.classList.toggle("is-success");
    copyBtn.innerHTML = "Copied!";
    setTimeout(() => {
      copyBtn.classList.toggle("is-danger");
      copyBtn.classList.toggle("is-success");
      copyBtn.innerHTML = "Copy";
    }, 1200);
  }

  function switchView() {
    const posts = document.querySelector("#posts");
    const list = document.querySelector("#list");

    document
      .querySelectorAll("figure")
      .forEach((figure) => figure.classList.toggle("list"));
    posts.classList.toggle("selected");
    list.classList.toggle("selected");
    listViewMode = !listViewMode;
  }

  async function postImagesOnDB() {
    const db = getFirestore()
    try {
      const imgs = arrayUnion(...images)
            
      if (imgs.Qa.length) {
        await setDoc(doc(db, `users/${uid}/`), {imgs})
        alert('DONE!')
      }

    } catch (error) {
      alert(`ERROR:\n ${error}`)
      console.error(error)
    }
  }

  onMount(async () => {
    await listImages();
    await checkIfThereIsImages();
  });
</script>

<button
  class="button is-rounded is-medium {darkTheme ? 'is-dark' : ''}"
  style="margin: 1em;"
  on:click={returnHome}>Return home</button
>
<button
  class="button is-rounded is-medium {darkTheme ? 'is-dark' : ''}"
  style="margin: 1em;"
  on:click={postImagesOnDB}>Post images to the DB</button
>
<h1 class="block">{uid === "global" ? title.global : title.gallery}</h1>
<main class="supergrid">
  <!-- <aside>
    <h3 class="is-$white">View</h3>
    <p class="view-switch">
      <span id="posts" class="selected">Posts</span> <Switch nonTheme action={switchView} /> <span id="list" class="">List</span>
    </p>
  </aside> -->

  <ViewController {switchView} />

  {#each images as img}
    <figure>
      <img src={img.URL} alt={`${img.name}`} loading="lazy" />
      <figcaption>
        {img.name}
        {#if listViewMode}
          <button
            class="copyBtn button is-medium {darkTheme ? 'is-danger' : ''}"
            style="margin: 1em;"
            on:click={(e) => copyLink(e, img.URL, img.name)}>Copy</button
          >
        {/if}
      </figcaption>
    </figure>
  {:else}
    <p id="loader">Loading _>:P)...</p>
  {/each}
</main>

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
    transition: all ease 150ms;
  }

  figure {
    display: grid;
    place-items: center;
    margin: 0 auto;
    padding: 1em 0;
    width: fit-content;
    max-width: 70vw;
    border-radius: 5px;

    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    padding: 2em;
    background-color: var(--card-background);
  }
  figure:not(:last-child) {
    margin-bottom: 2em;
  }
  figcaption {
    display: flex;
    place-items: center;
    font-size: 1.3rem;
    color: var(--card-font-color);
  }

  /* aside {
    margin-left: 20px;
    color: white;
  }

  span {
    transition: all ease 400ms;
    font-size: 1.2rem;
    font-weight: bold;
  }

  span:not(.selected) {
    color: var(--card-background);
  }

  .view-switch {
    display: flex;
    gap: .5em; 
  }

  .selected {
    font-weight: bold;
    color: crimson;
  } */

  .copyBtn {
    transition: all ease 150ms;
  }

  @media (max-width: 600px) {
    img {
      max-width: 100%;
    }

    figure {
      margin: 0  0 2em 0 !important;
      max-width: 100%;
      width: 100vw;
    }

    img:not(:last-of-type) {
      margin-bottom: 2em;
    }
    
    .list { 
      margin-bottom: 3em;
    }
  }
</style>
