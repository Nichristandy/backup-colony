import React, { useState, useEffect, useRef, Fragment } from 'react';
import SidebarLinkGroup from '../SidebarLinkGroup';
// import Logo from '../images/logo/logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { MdArrowBack, MdCardMembership, MdLocalParking, MdOutlineBusiness, MdOutlineDashboard, MdOutlineMap, MdOutlinePeople, MdOutlinePeopleAlt } from 'react-icons/md';
import { menuBM } from '../../../../utils/routes';
import SidebarList from '../SidebarList';

type Props = {
    sidebarOpen: boolean,
    setSidebarOpen: any
}

const SidebarBM = ({ sidebarOpen, setSidebarOpen }: Props) => {
    const router = useRouter()
    const { pathname, query } = router;



    const trigger = useRef<HTMLButtonElement>(null)
    const sidebar = useRef<HTMLDivElement>(null)

    // const storedSidebarExpanded = localStorage?.getItem('sidebar-expanded')
    // const [storeParse, setStoreParse] = useState(null);

    // useEffect(() => {
    //     if (typeof storedSidebarExpanded === 'string') {
    //         setStoreParse(JSON.parse(storedSidebarExpanded))
    //     }
    // }, [storedSidebarExpanded])

    const getFromLocalStorage = (key: string) => {
        if (!key || typeof window === 'undefined') {
            return ""
        }
        return localStorage.getItem(key)
    };

    const initiaLocalStorage: any = { sidebar: getFromLocalStorage("sidebar-bm") ? JSON.parse(getFromLocalStorage("sidebar-bm") || '{}') : [] };

    const [sidebarExpanded, setSidebarExpanded] = useState(initiaLocalStorage === null ? false : initiaLocalStorage === 'true');

    // console.log(initiaLocalStorage, 'side')

    // close on click outside
    useEffect(() => {
        type Props = {
            target: any
        }
        const clickHandler = ({ target }: Props) => {
            if (!sidebar.current || !trigger.current) return
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return
            setSidebarOpen(false)
        }
        document.addEventListener('click', clickHandler)
        return () => document.removeEventListener('click', clickHandler)
    })

    // close if the esc key is pressed
    useEffect(() => {
        type Props = {
            keyCode: any
        }
        const keyHandler = ({ keyCode }: Props) => {
            if (!sidebarOpen || keyCode !== 27) return
            setSidebarOpen(false)
        }
        document.addEventListener('keydown', keyHandler)
        return () => document.removeEventListener('keydown', keyHandler)
    })

    useEffect(() => {
        const body = document.querySelector('body');
        const parentNode = body?.parentNode;

        if (!(parentNode instanceof Element)) {
            throw new Error('box.parentNode is not an Element');
        }

        console.log(parentNode.querySelector('body'), 'body');

        localStorage.setItem('sidebar-bm', sidebarExpanded?.toString())
        if (sidebarExpanded) {
            body?.classList.add('sidebar-bm')
        } else {
            body?.classList.remove('sidebar-bm')
        }
    }, [sidebarExpanded]);

    return (
        <Fragment>
            <aside
                ref={sidebar}
                className={`absolute left-0 top-0 bottom-0 z-999 flex w-90 flex-col overflow-y-hidden bg-boxdark duration-300 ease-in-out dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    // className={`absolute left-0 top-0 z-9999 flex h-screen w-full lg:w-90 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* <!-- SIDEBAR HEADER --> */}

                <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
                    {/* <!-- Sidebar Menu --> */}
                    <nav className='mt-3 py-4 px-4 lg:px-6'>
                        {/* <!-- Menu Group --> */}
                        <div>
                            <div className='w-full flex justify-between items-center mb-4 px-4 py-2.5 bg-white rounded-lg'>
                                <div className='flex items-center gap-2'>
                                    <MdOutlineBusiness className='w-5 h-5 text-black' />
                                    <h3 className='text-lg font-semibold text-black'>
                                        Building Name
                                    </h3>
                                </div>

                                <button
                                    type='button'
                                    ref={trigger}
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    aria-controls='sidebar'
                                    aria-expanded={sidebarOpen}
                                    className='block text-black lg:hidden'
                                >
                                    <MdArrowBack className='w-5 h-5' />
                                </button>

                            </div>

                            <SidebarList menus={menuBM} sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
                        </div>
                    </nav>
                    {/* <!-- Sidebar Menu --> */}
                </div>
            </aside>
            {/* overlay */}
            <button
                ref={trigger}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls='sidebar'
                aria-expanded={sidebarOpen}
                className={`lg:static ${sidebarOpen && 'fixed z-99 inset-0 bg-black bg-opacity-40 transition-opacity duration-100 transform opacity-100'}`}>

            </button>
        </Fragment>
    )
}

export default SidebarBM;
