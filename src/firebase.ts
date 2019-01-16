import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  // config found in firebase
};

try {
  firebase.initializeApp(config);
  console.log('Firebase initialized');
} catch (err) {
  // taken from https://github.com/now-examples/next-news/blob/master/lib/db.js
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

export default firebase;

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export const db = firestore;
export const app = firebase.app();
