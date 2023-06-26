import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useRouter } from 'next/router';

type Props = {
    isOpen: boolean;
    sidebarOpen: boolean
    setSidebarOpen: any;
    children?: JSX.Element;
}

const Sideleft = ({ sidebarOpen, setSidebarOpen, children, isOpen }: Props) => {
    const router = useRouter()
    const { pathname, query } = router;
    const trigger = useRef<HTMLButtonElement>(null)
    const sidebar = useRef<HTMLDivElement>(null)

    const getFromLocalStorage = (key: string) => {
        if (!key || typeof window === 'undefined') {
            return ""
        }
        return localStorage.getItem(key)
    };

    const initiaLocalStorage: any = { sidebar: getFromLocalStorage("sidebar-left") ? JSON.parse(getFromLocalStorage("sidebar-left") || '{}') : [] };

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

        localStorage.setItem('sidebar-left', sidebarExpanded?.toString())
        if (sidebarExpanded) {
            body?.classList.add('sidebar-left')
        } else {
            body?.classList.remove('sidebar-left')
        }
    }, [sidebarExpanded]);

    return (
        <Fragment>
            <aside
                // ref={sidebar}
                className={`border-gray-4 shadow-card absolute inset-y-0 left-0 z-999 flex w-full max-w-sm flex-col overflow-y-hidden bg-gray duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${!isOpen ? "hidden" : ""}`}
            >
                {/* <!-- SIDEBAR HEADER --> */}

                <div className='w-full flex flex-col h-full overflow-y-auto duration-300 ease-linear mt-20 lg:mt-14'>
                    {/* <!-- Sidebar Menu --> */}
                    <div className='w-full flex-flex-col gap-2 px-4 lg:px-6 overflow-y-auto lg:pt-12'>
                        {children}
                    </div>
                    {/* <!-- Sidebar Menu --> */}
                </div>
            </aside>
            {/* overlay */}
            <button
                ref={trigger}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls='sidebar-left'
                aria-expanded={sidebarOpen}
                className={`lg:static ${sidebarOpen && 'fixed z-99 inset-0 bg-black bg-opacity-40 transition-opacity duration-100 transform opacity-100'}`}>

            </button>
        </Fragment>
    )
}

export default Sideleft;
