<script>
import { onMount } from "svelte";
import { getApp } from 'firebase/app'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { fade, fly  } from 'svelte/transition';

    // export let setUserIsOnline
    export let setUid
    let visible = false

    let showLogin = true
    let passwordInput = "password"
    const app = getApp()
    const auth = getAuth(app)

    async function login(e) {
        try {
            e.preventDefault()

            const rememberMe = e.target[3].checked;
            const email = e.target[0].value
            const password = e.target[1].value
            
            await signInWithEmailAndPassword(auth, email, password)

            if (rememberMe) window.localStorage.setItem('uid', auth.currentUser.uid)

            alert("Signed up perfectly!!!!")
            setUid(auth.currentUser.uid)

            
        } catch (error) {
            switch (error.code) {

                case "auth/wrong-password":
                    alert('Wrrrrrrrrrrrrong password!!!')
                    break;

                case "auth/invalid-email":
                    alert('Invalid email.')
                    break;

                case "auth/user-not-found":
                    alert('User not found.')
                    break;

                case "auth/user-disabled":
                    alert('Sorry, user disabled my friend.')
                    break;
            
                default:
                    alert('Unexpected error, hmm... Maybe you want to contact the support.')
                    break;
            }
            console.log(error.message)
            
        }
    }
    async function register(e) {
        try {
            alert('BAD')
            e.preventDefault()

            const rememberMe = e.target[3].checked;
            const email = e.target[0].value
            const password = e.target[1].value
    
           await createUserWithEmailAndPassword(email, password)
           if (rememberMe) window.localStorage.setItem('uid', auth.currentUser.uid)


           alert('Registered succesfully!')
           setUid(auth.currentUser.uid)

        } catch (error) {
            switch (error.code) {

                case "auth/weak-password":
                    alert('The password is too weak, maybe try another one.')
                    break;

                case "auth/email-already-in-use":
                    alert('This email is already in use, you forgotten?')
                    break;

                case "auth/operation-not-allowed":
                    alert('Operation not allowed.')
                    break;

                case "auth/invalid-email":
                    alert('Sorry, invalid email my friend.')
                    break;
            
                default:
                    alert('Unexpected error, hmm... Maybe you want to contact the support.')
                    break;
            }
            console.log(error.message)
        }
    }

    onMount(() => {
        visible = true
    })

    let changeForm = () => showLogin = !showLogin
    let changePasswordType = () => passwordInput === "password" ? passwordInput = "text" :  passwordInput = "password"

</script>

{#if !showLogin}
    <form method="POST" on:submit={register}>
        {#if visible}
        <h1 transition:fly="{{ y: -50, duration: 300 }}">Imigy</h1>
        
        <section class="field">
            <label class="label" for="username">Email</label>
            <input class="control input" type="text" name="username" autocomplete="email"/>
        </section>

        <section class="field">
            <label class="label" for="password">Password</label>
            <input class="control input" type={`${passwordInput}`} name="password"/>
        </section>

        <section class="password-container checkbox">
            <label for="check">
                <input  type="checkbox" name="check" on:change={changePasswordType}>
                Show password
            </label>
        </section>

        <section class="password-container checkbox">
            <label class="label" for="check">
                <input  type="checkbox" name="check" />
                Remember me
            </label>
        </section>

        <button class="button is-medium is-danger" type="submit" >Register</button>
        <button class="button is-ghost" type="button" on:click={changeForm}>Already have an account?</button>
        {/if}
    </form>
{:else}
    <form  action="" on:submit={login}>
        {#if visible}            
          <h1 in:fly="{{delay: 350, duration: 300}}">Imigy</h1>

          <section class="field">
              <label class="label" for="username">Email</label>
              <input class="input control" type="text" name="username"/>
          </section>

          <section class="field">
              <label class="label" for="password">Password</label>
              <input class="input control"  type={`${passwordInput}`} name="password"/>
          </section>

          <section class="password-container checkbox">
              <label class="checkbox" for="check">
                  <input  type="checkbox" name="check" on:change={changePasswordType}>
                  Show password
              </label>
          </section>

          <section class="password-container checkbox">
              <label class="checkbox" for="rememberMe">
                  <input type="checkbox" name="rememberMe" >
                  Remember me
              </label>
          </section>

          <button class="button is-medium is-danger" type="submit">Login</button>
          <button class="button is-ghost" type="button" on:click={changeForm}>Don't have an account?</button>
        {/if}
    </form>
{/if}

<style>
    h1 {
        text-align: center;
        font-size: 2.5rem;
        color: crimson;
    }

    form {
        display: grid;
        place-content: center;
        grid-gap: 1.5em;
        min-height: 100vh;
    }
    .password-container {
        display: flex;
        grid-gap: .5em;
    }

    .password-container label {
        display: flex;
        align-items: center;
        gap: .5em;
    }
    label {
        color: var(--font-color);
        font-weight: 500;
    }

    input[type=checkbox] {
        margin: none !important;
        width: 18px;
        height: 18px;
    }

</style>
