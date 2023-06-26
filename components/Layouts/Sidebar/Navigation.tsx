import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Menus from './Menus/Menus';
import Icon from '../../Icon';

type Props = {
    routes: any
};

function Navigation({ routes }: Props) {
    const router = useRouter();
    const { pathname } = router
    return (
        routes?.map((route: any, idx: any) => {
            if (route?.routes) {
                return <Menus key={idx} route={route} />
            } else {
                return (
                    <li key={idx} className="w-full relative mb-3 rounded-md cursor-pointer px-4"
                    >
                        <Link href={{ pathname: route?.url, query: route?.query }}>
                            <div className={`w-full text-sm inline-flex py-2 px-2 items-center transition-colors duration-150 hover:text-green-400 hover:bg-green-100 dark:hover:text-green-200 rounded-lg ${pathname.includes(route?.path) ? "text-white bg-green-300 font-bold" : "text-gray-500"}`}>
                                {route?.icon && <Icon className="w-6 h-6" aria-hidden="true" icon={route.icon || ""} />}
                                <span className={`ml-2`}>{route.name || ""}</span>
                            </div>
                        </Link>
                    </li>
                )
            }
        }
        )
    )
};

export default Navigation