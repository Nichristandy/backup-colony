import React, { Fragment, useEffect, useRef, useState } from 'react'
import Navbar from '../Layouts/Header/Navbar'
import ActiveLink from '../Layouts/ActiveLink';

type Props = {}

const NavbarMedia = (props: Props) => {
    const [navbarOpen, setNavbarOpen] = useState(true);

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setNavbarOpen(false);
        } else {
            setNavbarOpen(true);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, []);

    const trigger = useRef<HTMLButtonElement>(null)
    const navbar = useRef<HTMLDivElement>(null)

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

    const initiaLocalStorage: any = { navbar: getFromLocalStorage("navbar-expanded") ? JSON.parse(getFromLocalStorage("navbar-expanded") || '{}') : [] };

    const [navbarExpanded, setNavbarExpanded] = useState(initiaLocalStorage === null ? false : initiaLocalStorage === 'true');

    useEffect(() => {
        setNavbarExpanded(initiaLocalStorage === null ? false : initiaLocalStorage === 'true')
    }, [initiaLocalStorage])


    // console.log(initiaLocalStorage, 'side')

    // close on click outside
    useEffect(() => {
        type Props = {
            target: any
        }
        const clickHandler = ({ target }: Props) => {
            if (!navbar.current || !trigger.current) return
            if (
                !navbarOpen ||
                navbar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return
            setNavbarOpen(false)
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
            if (!navbarOpen || keyCode !== 27) return
            setNavbarOpen(false)
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

        localStorage.setItem('navbar-expanded', navbarExpanded?.toString())
        if (navbarExpanded) {
            body?.classList.add('navbar-expanded')
        } else {
            body?.classList.remove('navbar-expanded')
        }
    }, [navbarExpanded]);

    return (
        <Fragment>
            <Navbar sticky>
                <div className='absolute lg:static left-0 top-0 z-9999 w-full flex flex-col'>
                    <div className='bg-boxdark text-white relative w-full flex items-center justify-between p-4 lg:hidden z-40 border-b-2 border-gray'>
                        <span>Menus</span>
                        <button
                            aria-controls='navbar'
                            aria-expanded={navbarOpen}
                            onClick={(e) => {
                                e.stopPropagation()
                                setNavbarOpen(!navbarOpen)
                            }}
                            className='z-99999 block rounded-sm border p-1.5 shadow-sm border-strokedark bg-boxdark'
                        >
                            <span className='relative block h-5.5 w-5.5 cursor-pointer'>
                                <span className='du-block absolute right-0 h-full w-full'>
                                    <span
                                        className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm delay-[0] duration-200 ease-in-out bg-white ${!navbarOpen && '!w-full delay-300'
                                            }`}
                                    ></span>
                                    <span
                                        className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm delay-150 duration-200 ease-in-out bg-white ${!navbarOpen && 'delay-400 !w-full'
                                            }`}
                                    ></span>
                                    <span
                                        className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm delay-200 duration-200 ease-in-out bg-white ${!navbarOpen && '!w-full delay-500'
                                            }`}
                                    ></span>
                                </span>
                                <span className='absolute right-0 h-full w-full rotate-45'>
                                    <span
                                        className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm delay-300 duration-200 ease-in-out bg-white ${!navbarOpen && '!h-0 !delay-[0]'
                                            }`}
                                    ></span>
                                    <span
                                        className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm duration-200 ease-in-out bg-white ${!navbarOpen && '!h-0 !delay-200'
                                            }`}
                                    ></span>
                                </span>
                            </span>
                        </button>
                    </div>

                    <div className='relative'>
                        <ul className={`absolute bg-boxdark text-white w-full flex flex-col lg:flex-row gap-2 transform duration-300 ease-in-out py-4 lg:px-4 ${navbarOpen ? "" : "-translate-y-full invisible"}`}>
                            <li className='w-full lg:max-w-max gap-2'>
                                <ActiveLink pages={"videos"} href={{ pathname: "/property/media/videos" }} activeClass="bg-graydark" className='w-full lg:justify-center text-base lg:text-lg text-gray hover:text-white'>
                                    Video Media
                                </ActiveLink>
                            </li>
                            <li className='w-full lg:max-w-max gap-2'>
                                <ActiveLink pages={"articles"} href={{ pathname: "/property/media/articles" }} activeClass="bg-graydark" className='w-full lg:justify-center text-base lg:text-lg text-gray hover:text-white'>
                                    News & Articles
                                </ActiveLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </Navbar>
            <button
                ref={trigger}
                onClick={() => setNavbarOpen(!navbarOpen)}
                aria-controls='navbar-expanded'
                aria-expanded={navbarOpen}
                className={`${navbarOpen && 'fixed z-40 inset-0 bg-black bg-opacity-40 transition-opacity duration-100 transform opacity-100 lg:hidden'}`}>

            </button>
        </Fragment>
    )
}

export default NavbarMedia