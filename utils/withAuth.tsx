import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { reauthenticate } from "../../redux/actions/AuthActions";
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import { cookies } from 'next/headers';

const withAuth = (WrappedComponent: any) => {
    return (props: any) => {
        // checks whether we are on client / browser or server.
        if (typeof window !== "undefined") {
            const router = useRouter();
            // const token = getCookie("token");
            const nextCookies = cookies();
            const token1 = nextCookies.get('token');
            const token = getCookie('token');
            const dispatch = useDispatch();

            useEffect(() => {
                let mouted;
                if (!token) {
                    router.push('/login')
                }
                // return () => {
                //     dispatch(reauthenticate(token))
                // }
            }, [])

            return <WrappedComponent {...props} />;
        }

        // If we are on server, return null
        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
