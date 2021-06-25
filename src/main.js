import App from './components/App.svelte'

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCOP9rpHYSA465DReJ0AnhFQTXVpqFYSQI",
    authDomain: "imigy-5baee.firebaseapp.com",
    projectId: "imigy-5baee",
    storageBucket: "imigy-5baee.appspot.com",
    messagingSenderId: "110918614375",
    appId: "1:110918614375:web:f4f35b5fc7955d425a83c2",
    measurementId: "G-6QFR6WL4G3"
  };
  // Initialize Firebase
  let fapp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
  // firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;