import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCgBkcKGqMd7u89-OYh9PgS0WyKK_uaFSE",
    authDomain: "crwn-db-75a29.firebaseapp.com",
    databaseURL: "https://crwn-db-75a29.firebaseio.com",
    projectId: "crwn-db-75a29",
    storageBucket: "crwn-db-75a29.appspot.com",
    messagingSenderId: "85298027545",
    appId: "1:85298027545:web:fbf493bc81967475bc1e88",
    measurementId: "G-0EVST47BYC"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;