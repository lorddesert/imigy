<script>
import { onMount } from "svelte";


    // export let setUserIsOnline
    export let setUid

    let showLogin = true
    let passwordInput = "password"

    const auth = firebase.auth();


    async function login(e) {
        try {
            e.preventDefault()

            const rememberMe = e.target[3].checked;
            const email = e.target[0].value
            const password = e.target[1].value
            
            await auth.signInWithEmailAndPassword(email, password)

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
            e.preventDefault()

            const rememberMe = e.target[3].checked;
            const email = e.target[0].value
            const password = e.target[1].value
    
           await auth.createUserWithEmailAndPassword(email, password)
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

    let changeForm = () => showLogin = !showLogin
    let changePasswordType = () => passwordInput === "password" ? passwordInput = "text" :  passwordInput = "password"

</script>

{#if !showLogin}
    <form method="POST" on:submit={register}>
        <h1>Imigy</h1>
        <section>
            <label for="username">Email</label>
            <input type="text" name="username" autocomplete="email"/>
        </section>

        <section>
            <label for="password">Password</label>
            <input type={`${passwordInput}`} name="password"/>
        </section>

        <section class="password-container">
            <input type="checkbox" name="check" on:change={changePasswordType}>
            <label for="check">Show password</label>
        </section>

        <section class="password-container">
            <input type="checkbox" name="check" />
            <label for="check">Remember me</label>
        </section>

        <button type="submit">Register</button>
        <button  on:click={changeForm}>Already have an account?</button>
    </form>
{:else}
    <form action="" on:submit={login}>
        <h1>Imigy</h1>

        <section>
            <label for="username">Email</label>
            <input type="text" name="username"/>

        </section>

        <section>
            <label for="password">Password</label>
            <input type={`${passwordInput}`} name="password"/>
        </section>

        <section class="password-container">
            <input type="checkbox" name="check" on:change={changePasswordType}>
            <label for="check">Show password</label>
        </section>

        <section class="password-container">
            <input type="checkbox" name="check" on:change={changePasswordType}>
            <label for="check">Remember me</label>
        </section>

        <button type="submit">Login</button>
        <button on:click={changeForm}>Don't have an account?</button>
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

    input[type=checkbox] {
        margin: none !important;
        width: 18px;
        height: 18px;
    }

    a {
        text-align: center;
    }
</style>
