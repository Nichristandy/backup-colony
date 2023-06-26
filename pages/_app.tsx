import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import NextNProgress from "nextjs-progressbar";
import { isSupported, onMessage } from "@firebase/messaging";
import { GoogleOAuthProvider } from "@react-oauth/google";
// timeline css
import "react-calendar-timeline/lib/Timeline.css";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";

const MyApp: FC<AppProps> = ({ Component, ...pageProps }) => {
  const router = useRouter();
  const { pathname, query } = router;
  const { store, props } = wrapper.useWrappedStore(pageProps);
  axios.defaults.baseURL = process.env.API_ENDPOINT;
  const [loading, setLoading] = useState(true);

  const [isNotification, setIsNotification] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "", context: "" });
  const [isTokenFound, setIsTokenFound] = useState(false);
  const [firebaseToken, setFirebaseToken] = useState("");

  useEffect(() => {
    (async () => {
      const hasFirebaseMessagingSupport = await isSupported();
      if (hasFirebaseMessagingSupport) {
        const { requestForToken, messaging } = await import("./api/firebaseConfig");
        await requestForToken({ setIsTokenFound, setFirebaseToken });
        onMessage(messaging, (payload: any) => {
          setIsNotification(true);
          setNotification({
            title: payload?.data.title,
            context: payload?.data.context,
            body: payload?.data.data,
          });
          console.log(payload, "test");
        });
      }
    })();
  }, []);


  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, []);

  useEffect(() => {
    !isTokenFound ? router.replace({ pathname, query }) : null
  }, [isTokenFound]);

  if (loading) return (
    <div id="preloader" className="fixed left-0 top-0 z-999999 h-screen flex items-center justify-center w-screen bg-white">
      <svg className="fill-current h-20 w-20 animate-spin-1.5" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.87843 4.34565C7.8566 1.6837 10.2832 0.394013 12.9481 0.0636506C16.0017 -0.311183 19.325 0.991205 21.1309 3.56422C21.4945 4.07882 21.8645 4.86025 22.0589 5.4638C21.9711 5.45109 21.877 5.45745 21.7955 5.4638C21.4945 5.48286 21.1998 5.55274 20.9051 5.62898C20.6167 5.70522 20.3345 5.79416 20.0586 5.90216C19.7827 6.01017 19.5131 6.13088 19.256 6.27064C19.024 6.39771 18.8046 6.53748 18.5914 6.68995C18.1086 7.04573 17.6696 7.46503 17.2746 7.92246C16.936 8.31 16.6288 8.71024 16.309 9.11049C15.9767 9.53615 15.6255 9.9491 15.2242 10.3112C14.4216 11.0418 13.4372 11.4866 12.365 11.5882C8.52752 11.9694 5.51777 8.01775 6.87843 4.34565Z" fill="#2620A9" />
        <path d="M24.316 6.96949C26.9433 7.96693 28.2161 10.4192 28.5422 13.1193C28.9121 16.2133 27.6267 19.5804 25.0872 21.4101C24.5794 21.7786 23.8081 22.1534 23.2124 22.3504C23.225 22.2614 23.2187 22.1661 23.2124 22.0836C23.1936 21.7786 23.1246 21.48 23.0494 21.1814C22.9742 20.8892 22.8864 20.6033 22.7798 20.3237C22.6732 20.0442 22.554 19.771 22.4161 19.5105C22.2907 19.2755 22.1527 19.0531 22.0023 18.8371C21.6511 18.3479 21.2373 17.9032 20.7858 17.503C20.4033 17.1599 20.0083 16.8486 19.6133 16.5246C19.1932 16.1879 18.7856 15.8321 18.4282 15.4255C17.7071 14.6123 17.2682 13.6149 17.1678 12.5285C16.7916 8.64036 20.6855 5.59086 24.316 6.96949Z" fill="#5F59F7" />
        <path d="M21.7263 24.6375C20.7419 27.2994 18.3215 28.5891 15.6567 28.9195C12.603 29.2943 9.27975 27.9855 7.4739 25.4125C7.11023 24.8979 6.74028 24.1165 6.5459 23.513C6.63368 23.5257 6.72774 23.5193 6.80925 23.513C7.11023 23.4939 7.40493 23.424 7.69964 23.3478C7.98807 23.2715 8.27023 23.1826 8.54613 23.0746C8.82202 22.9666 9.09165 22.8459 9.34873 22.7061C9.58073 22.579 9.80019 22.4393 10.0134 22.2868C10.4962 21.931 10.9351 21.5117 11.3301 21.0543C11.6687 20.6668 11.976 20.2665 12.2958 19.8663C12.6281 19.4406 12.9792 19.0277 13.3805 18.6655C14.1831 17.9349 15.1676 17.4902 16.2398 17.3885C20.071 17.0137 23.0807 20.959 21.7263 24.6375Z" fill="#44C2FD" />
        <path d="M4.28877 22.0137C1.66151 21.0163 0.388636 18.5576 0.06258 15.8639C-0.307368 12.7699 0.978046 9.40277 3.51752 7.57307C4.02542 7.20459 4.79667 6.82976 5.39235 6.63281C5.37981 6.72176 5.38608 6.81705 5.39235 6.89964C5.41116 7.20459 5.48013 7.50319 5.55537 7.80179C5.63062 8.09403 5.7184 8.37992 5.825 8.65946C5.93159 8.93899 6.05073 9.21218 6.18868 9.47266C6.31408 9.70772 6.45203 9.93008 6.60252 10.1461C6.95365 10.6353 7.36749 11.08 7.81896 11.4802C8.20145 11.8233 8.59648 12.1346 8.99151 12.4586C9.41162 12.7953 9.81919 13.1511 10.1766 13.5577C10.8977 14.3709 11.3366 15.3683 11.4369 16.4547C11.8131 20.3365 7.91301 23.386 4.28877 22.0137Z" fill="#6592FD" />
      </svg>
    </div>
  )
  return (
    <GoogleOAuthProvider clientId="51774239059-2i802tboo27kv3k78qv5tmkdg6aaa1v9.apps.googleusercontent.com">
      <Provider store={store}>
        <NextNProgress
          color="#5F59F7"
          startPosition={0.3}
          stopDelayMs={200}
          height={4}
          showOnShallow={true}
        />
        <Component {...props} />
        <ToastContainer position='top-right' limit={500} />
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default MyApp;