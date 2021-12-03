import App from './components/App.svelte'
// import 'https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js'
// import 'https://www.gstatic.com/firebasejs/8.6.8/firebase-analytics.js0'
// import 'https://www.gstatic.com/firebasejs/8.6.5/firebase-firestore.js'
// import 'https://www.gstatic.com/firebasejs/8.6.5/firebase-storage.js'
// import 'https://www.gstatic.com/firebasejs/8.6.5/firebase-auth.js'
import { initializeApp } from 'firebase/app';

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
  let app = initializeApp(firebaseConfig)
  // firebase.initializeApp(firebaseConfig);

const Main = new App({
	target: document.body,
});

export default Main;