<script>
    export let setShowGallery
</script>

<header>
    <div id="profile-image" on:click={setShowGallery}>
        <img src="/favicon.png" alt="profile" />
    </div>
    <form on:submit={() => alert('asdasd')}>
        <input class="input is-rounded" type="search" name="search" id="search" placeholder="See for any profile!" on/>
        <button class="button is-danger is-outlined is-rounded control">Search</button>
    </form>
    <!-- <div>Options</div> -->
</header>
<main />

<style>
    main {
        display: grid;
        place-items: center;
        /* min-height: 100vh; */
        font-family: "Dosis", sans-serif;
    }

    header {
        display: grid;
        place-content: center;
        place-items: center;
        padding-top: 5em;
        gap: .5em;
        grid-template-columns: 50px 350px;
        transition: all ease .35s;
    }
    #profile-image {
        display: grid;
        place-items: center;
        padding: .3em;
        background-color: var(--font-color);
        border-radius: 50%;
    }
    #profile-image:hover {
        cursor: pointer;
    }
    img {
        max-width: 100%;
    }
    form {
        display: flex;
        gap: .5em;
        width: 100%;
    }

    @media (min-width: 600px) {
        header {
            padding-top: 5vh;
        }
    }
</style>
