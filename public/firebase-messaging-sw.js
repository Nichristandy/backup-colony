// // Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyCZecBfTIm5DWQ7kY2iPwLvOmGc_J8a6aY",
    authDomain: "colony-58c81.firebaseapp.com",
    databaseURL: "https://colony-58c81-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "colony-58c81",
    storageBucket: "colony-58c81.appspot.com",
    messagingSenderId: "763680831897",
    appId: "1:763680831897:web:363c215390e5a75429bb08",
    measurementId: "G-ZKLNY6Q6E1"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload?.notification?.title;
    const notificationOptions = {
        body: payload?.notification?.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});
