// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyGQ2eKxmkK70S023_muqXqvv91FpCVLQ",
    authDomain: "idpa-c5061.firebaseapp.com",
    projectId: "idpa-c5061",
    storageBucket: "idpa-c5061.appspot.com",
    messagingSenderId: "293629245575",
    appId: "1:293629245575:web:b9e6975ddffffb3908e022"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const functions = getFunctions(app)

if (window.location.hostname === 'localhost' && false) {
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099/', { disableWarnings: true });
    connectFunctionsEmulator(functions, "localhost", 5001);
}

// Initialize Firebase
export default app;
export { auth, db };
