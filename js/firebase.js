const firebaseConfig = {
  apiKey: "AIzaSyA-TcFNufXBxffwNYEFMFC6lJjGo5ki9ug",
  authDomain: "ml-registration-portal.firebaseapp.com",
  projectId: "ml-registration-portal",
  storageBucket: "ml-registration-portal.firebasestorage.app",
  messagingSenderId: "762761455691",
  appId: "1:762761455691:web:b71cefeba33033ad4485ce"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const auth = firebase.auth();

console.log("Firebase initialized");
console.log(firebase);
console.log(auth);
