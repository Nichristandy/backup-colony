import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useRouter } from 'next/router';
import Modal from '../../../Modal';
import { ModalHeader } from '../../../Modal/ModalComponent';

type Props = {
    sidebarOpen: boolean
    setSidebarOpen: any;
    children?: JSX.Element;
}

const SidebarBody = ({ sidebarOpen, setSidebarOpen, children }: Props) => {
    const router = useRouter()
    const { pathname, query } = router;
    const [isMobile, setIsMobile] = useState(false);
    const trigger = useRef<HTMLButtonElement>(null)
    const sidebar = useRef<HTMLDivElement>(null);

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, []);

    const getFromLocalStorage = (key: string) => {
        if (!key || typeof window === 'undefined') {
            return ""
        }
        return localStorage.getItem(key)
    };

    const initiaLocalStorage: any = { sidebar: getFromLocalStorage("sidebar-body") ? JSON.parse(getFromLocalStorage("sidebar-body") || '{}') : [] };

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

        localStorage.setItem('sidebar-body', sidebarExpanded?.toString())
        if (sidebarExpanded) {
            body?.classList.add('sidebar-body')
        } else {
            body?.classList.remove('sidebar-body')
        }
    }, [sidebarExpanded]);

    return (
        <Fragment>
            <aside
                className={`w-full max-w-xs lg:max-w-md hidden lg:flex flex-col overflow-y-hidden duration-300 ease-in-out ${sidebarOpen ? '' : 'lg:w-0'}`}
            >
                {/* <!-- SIDEBAR HEADER --> */}

                <div className='w-full flex flex-col h-full overflow-y-auto duration-300 ease-linear'>
                    {/* <!-- Sidebar Menu --> */}
                    <div className='w-full flex-flex-col gap-2 overflow-y-auto'>
                        {children}
                    </div>
                    {/* <!-- Sidebar Menu --> */}
                </div>
            </aside>
            {/* overlay */}
            {/* <button
                ref={trigger}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls='sidebar-body'
                aria-expanded={sidebarOpen}
                className={`lg:static ${sidebarOpen && 'fixed z-99 inset-0 bg-black bg-opacity-40 transition-opacity duration-100 transform opacity-100'}`}>

            </button> */}
            <div className=''>
                <Modal
                    isOpen={sidebarOpen && isMobile}
                    size=''
                    onClose={() => setSidebarOpen(false)}
                >
                    <div className='w-full'>
                        <div className=''>{children}</div>
                    </div>
                </Modal>
            </div>
        </Fragment>
    )
}

export default SidebarBody;
