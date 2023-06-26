import { FirebaseApp, getApp, getApps, initializeApp } from '@firebase/app';
import { getMessaging, getToken, onMessage } from '@firebase/messaging';
import { DatabaseReference, getDatabase, onDisconnect, onValue, ref, set } from '@firebase/database';
import { Dispatch, SetStateAction } from 'react';
import { setCookie } from 'cookies-next';

let app: FirebaseApp;

export const firebaseConfig = {
    apiKey: "AIzaSyCZecBfTIm5DWQ7kY2iPwLvOmGc_J8a6aY",
    authDomain: "colony-58c81.firebaseapp.com",
    databaseURL: "https://colony-58c81-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "colony-58c81",
    storageBucket: "colony-58c81.appspot.com",
    messagingSenderId: "763680831897",
    appId: "1:763680831897:web:363c215390e5a75429bb08",
    measurementId: "G-ZKLNY6Q6E1"
};

getApps().length === 0 ? (app = initializeApp(firebaseConfig)) : (app = getApp());

export const messaging = getMessaging(app);
export const database = getDatabase(app);

type FirebaseTokenProps = {
    setIsTokenFound: Dispatch<SetStateAction<boolean>>;
    setFirebaseToken: Dispatch<SetStateAction<string>>;
    user?: any
}


export const requestForToken = async (props: FirebaseTokenProps) => {
    const { setIsTokenFound, setFirebaseToken, user } = props;
    try {
        const messagingResolve = await messaging;
        const currentToken = await getToken(messagingResolve, {
            vapidKey:
                "BAVrRRGNrqp3WbS4lRGLNKyixC8el1GT6Vddo6DZvePu4vGrPrj-OIX-6tQ4lcZo2O7d1ezAzCuuFd-j87P1Qb4",
        });
        if (currentToken) {
            setIsTokenFound(true);
            setFirebaseToken(currentToken)
            setCookie("firebaseToken", currentToken, { secure: true, sameSite: "strict" });

            // database user 
            const sRef: DatabaseReference = ref(database, "users/" + currentToken);
            set(sRef, { online: true })
            onDisconnect(sRef).set({ online: false })
            onValue(sRef, (snap) => {
                if (snap.val().online === true) {
                    console.log("connected / online");
                } else {
                    console.log("not connected / offline");
                }
            });
        } else {
            console.log("No registration token available. Request permission to generate one.");
            setIsTokenFound(false);
            setFirebaseToken("")
            setCookie("firebaseToken", "");
        }
    } catch (err) {
        console.log("An error occurred while retrieving token. ", err);
    }
};

export const onMessageListener = () =>
    new Promise((resolve, reject) =>
        onMessage(messaging, async (payload) => {
            console.log(messaging, payload);
            await resolve(payload);
        })
    );