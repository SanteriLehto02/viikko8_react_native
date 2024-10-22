import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, query } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwtTSAQNMwHJ3LQ8KvhRbeZC7q15kT6qw",
  authDomain: "shoppinglist-cc2a7.firebaseapp.com",
  projectId: "shoppinglist-cc2a7",
  storageBucket: "shoppinglist-cc2a7.appspot.com",
  messagingSenderId: "360417069357",
  appId: "1:360417069357:web:3a0d8963538fb37fa4aba4"
};

// Initialize Firebase app with the config
initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore();

// Export the Firestore instance for use in other files

const MESSAGES = 'messages'
export {
  addDoc, collection, deleteDoc, doc, firestore, MESSAGES, onSnapshot, query
};

