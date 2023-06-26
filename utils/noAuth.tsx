import { useRouter } from "next/router";
import { useEffect } from "react";
import { cookies } from 'next/headers';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

const noAuth = (WrappedComponent: any) => {
    return (props: any) => {
        // checks whether we are on client / browser or server.
        if (typeof window !== "undefined") {
            const Router = useRouter();
            const nextCookies = cookies();
            const token1 = nextCookies.get('token');
            const token = getCookie('token');

            useEffect(() => {
                if (token) {
                    Router.replace('/')
                }
            }, [])
        }

        // If we are on server, return null
        return <WrappedComponent {...props} />;
    };
};

export default noAuth;
