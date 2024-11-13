// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDCo8wW2inW8_Hinr-qpOYRDvFyNeCOfTM",
  authDomain: "plataformadk-616b6.firebaseapp.com",
  projectId: "plataformadk-616b6",
  storageBucket: "plataformadk-616b6.appspot.com",
  messagingSenderId: "963401404756",
  appId: "1:963401404756:web:221ff80001f611dfbd38c1",
  measurementId: "G-8NCE6T8HHE"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
