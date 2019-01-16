"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("firebase/app"));
require("firebase/firestore");
const config = {
    apiKey: 'AIzaSyBoYz9Rs1Ezn4Ca4Kpem1JotS8nNWqhXqw',
    authDomain: 'hot-potato-store.firebaseapp.com',
    databaseURL: 'https://hot-potato-store.firebaseio.com',
    projectId: 'hot-potato-store',
    storageBucket: 'hot-potato-store.appspot.com',
    messagingSenderId: '769395966178',
};
try {
    app_1.default.initializeApp(config);
    console.log('Firebase initialized');
}
catch (err) {
    // taken from https://github.com/now-examples/next-news/blob/master/lib/db.js
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack);
    }
}
exports.default = app_1.default;
const firestore = app_1.default.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
exports.db = firestore;
exports.app = app_1.default.app();
//# sourceMappingURL=firebase.js.map