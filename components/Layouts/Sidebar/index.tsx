import React, { useState, useEffect, useRef, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { menuMaster } from '../../../utils/routes';
import SidebarLink from './SidebarLink';
import Icon from '../../Icon';
import SidebarLinkGroup from './SidebarLinkGroup';
import SidebarList from './SidebarList';

type Props = {
    sidebarOpen?: boolean,
    setSidebarOpen?: any,
    logo?: any,
    title?: any,
    images?: string,
    token?: any
}

const Sidebar = (props: Props) => {
    const { sidebarOpen, setSidebarOpen, logo, title, images, token } = props;
    const router = useRouter()
    const { pathname, query } = router

    const trigger = useRef<HTMLButtonElement>(null)
    const sidebar = useRef<HTMLDivElement>(null)

    const getFromLocalStorage = (key: string) => {
        if (!key || typeof window === 'undefined') {
            return ""
        }
        return localStorage.getItem(key)
    };

    const initiaLocalStorage: any = { sidebar: getFromLocalStorage("sidebar-expanded") ? JSON.parse(getFromLocalStorage("sidebar-expanded") || '{}') : [] };

    const [sidebarExpanded, setSidebarExpanded] = useState(initiaLocalStorage === null ? false : initiaLocalStorage === 'true');

    useEffect(() => {
        setSidebarExpanded(initiaLocalStorage === null ? false : initiaLocalStorage === 'true')
    }, [initiaLocalStorage])

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
    }, [])

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
    }, [])

    useEffect(() => {
        const body = document.querySelector('body');
        const parentNode = body?.parentNode;

        if (!(parentNode instanceof Element)) {
            throw new Error('box.parentNode is not an Element');
        }

        localStorage.setItem('sidebar-expanded', sidebarExpanded?.toString())
        if (sidebarExpanded) {
            body?.classList.add('sidebar-expanded')
        } else {
            body?.classList.remove('sidebar-expanded')
        }
    }, [sidebarExpanded]);

    return (
        <Fragment>
            <aside
                ref={sidebar}
                // className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                className={`absolute left-0 top-0 z-9999 flex h-screen w-full lg:w-90 flex-col overflow-y-hidden bg-black duration-300 ease-in-out dark:bg-boxdark ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* <!-- SIDEBAR HEADER --> */}
                <div className='flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5'>
                    <Link href='/'>
                        <div className="flex items-center gap-2">
                            <img src={logo || "image/logo/logo-icon.png"} alt='logo-icon' className='object-cover object-center' />
                            <span className='flex-shrink-0 lg:flex text-white text-2xl font-semibold'>{!title ? "Building" : title}</span>
                        </div>
                    </Link>

                    <button
                        type='button'
                        ref={trigger}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-controls='sidebar'
                        aria-expanded={sidebarOpen}
                        className='block text-white'
                    >
                        <svg
                            className='fill-current'
                            width='20'
                            height='18'
                            viewBox='0 0 20 18'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z'
                                fill=''
                            />
                        </svg>
                    </button>
                </div>
                {/* <!-- SIDEBAR HEADER --> */}

                <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
                    {/* <!-- Sidebar Menu --> */}
                    <nav className='mt-3 py-4 px-4  lg:px-6'>
                        {/* <!-- Menu Group --> */}
                        <div>
                            <div className='w-full flex justify-between items-center mb-6 px-4 py-2.5 bg-white rounded-lg'>
                                <div className='flex items-center gap-2'>
                                    <img src={`${images ? images : "./image/logo/building-logo.svg"}`} alt='building logo' />
                                    <h3 className='text-lg font-semibold text-black'>
                                        Building Name
                                    </h3>
                                </div>
                            </div>

                            <SidebarList menus={menuMaster} sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
                        </div>
                    </nav>
                    {/* <!-- Sidebar Menu --> */}
                </div>
            </aside>
            <button
                ref={trigger}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls='sidebar'
                aria-expanded={sidebarOpen}
                className={`${sidebarOpen && 'fixed z-9998 inset-0 bg-black bg-opacity-40 transition-opacity duration-100 transform opacity-100'}`}>

            </button>
        </Fragment>
    )
}

export default Sidebar;
