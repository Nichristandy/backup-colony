import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Icon from '../../../Icon';
import Submenus from './Submenus';

type Props = {
    route: any
}

function Menus({ route }: Props) {
    const router = useRouter();
    const { pathname } = router;

    return (
        <div className='my-8 px-4'>
            <div className="flex items-center font-bold text-sm">
                {/* <Icon className="w-8 h-8" aria-hidden="true" icon={route.icon} /> */}
                <span className={'ml-2 md:ml-4 hover:text-gray-800'}>{route.name}</span>
            </div>
            <ul className="mt-6 leading-10 text-sm text-gray-500">
                {route?.routes?.length > 0 ?
                    route?.routes?.map((r: any, i: any) => {
                        // console.log('path',router.pathname?.includes(r.path), r.path )
                        if (r.menus) {
                            return (
                                <Submenus key={i} route={r} />
                            )
                        } else {
                            return (
                                <li key={i} className="relative mb-3 rounded-md cursor-pointer"
                                >
                                    <Link href={{ pathname: r?.url, query: r?.query }}>
                                        <div className={`text-sm inline-flex py-2 px-2 items-center w-full transition-colors duration-150 hover:text-green-400 hover:bg-green-100 dark:hover:text-green-200 rounded-lg ${router.pathname?.includes(r.path) ? "text-white bg-green-300 font-bold" : "text-gray-500"}`}>
                                            <Icon className="w-6 h-6" aria-hidden="true" icon={r.icon} />
                                            <span className={`ml-2`}>{r.name}</span>
                                        </div>
                                    </Link>
                                </li>
                            )
                        }
                    }) : null
                }
            </ul>
            <div className='border-b-2 border-gray-200 my-3'></div>
        </div>
    )
}

export default Menus