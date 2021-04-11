import * as firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyC3B4ss-LgUQ6uEWZjyTZvY2Y3ZmpqGDBQ",
    authDomain: "carlos-calvo.firebaseapp.com",
    projectId: "carlos-calvo",
    storageBucket: "carlos-calvo.appspot.com",
    messagingSenderId: "688132016052",
    appId: "1:688132016052:web:1e48584149ba47c0f054e1",
    measurementId: "G-85T074W188"
})

export const getFirestore = () => firebase.firestore()