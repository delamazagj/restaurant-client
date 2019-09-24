import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    
    apiKey: "AIzaSyAkW4Ovg2Kj-ImKWvJXSvm8kafd3ZzrItI",
    authDomain: "test-c0551.firebaseapp.com",
    databaseURL: "https://test-c0551.firebaseio.com",
    projectId: "test-c0551",
    storageBucket: "test-c0551.appspot.com",
    messagingSenderId: "591842859400"
  
}

firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()
const settings = {
    timestampsInSnapshots: true
}

firestore.settings(settings)

export default firebase;