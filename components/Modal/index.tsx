import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'

type Props = {
    isOpen: boolean,
    onClose: () => void,
    children: JSX.Element | string | undefined,
    size?: string | "small" | "medium" | "large"
}

const Modal = ({ isOpen, onClose, children, size }: Props) => {
    const [sizes, setSizes] = useState("max-w-2xl");

    useEffect(() => {
        if (size === "large") setSizes("max-w-5xl");
        else if (size === "medium") setSizes("max-w-2xl");
        else if (size === "small") setSizes("max-w-sm");
        else setSizes("max-w-2xl")
    }, [size])
    return (
        <Transition
            as={Fragment} appear show={isOpen}
        >
            <Dialog as="div" onClose={onClose} className="fixed inset-0 z-[1000] overflow-y-auto">
                <div
                    className="fixed inset-0 bg-black/30"
                    aria-hidden="true"
                    onClick={onClose}
                />
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in-out duration-200"
                    leaveFrom="opacity-100 scale-95"
                    leaveTo="opacity-0 scale-100"
                >
                    <div className="flex min-h-screen items-center">
                        <Dialog.Panel
                            as='div'
                            className={`bg-white max-h-[700px] rounded-2xl overflow-y-auto overflow-x-hidden shadow-boxdark mx-auto w-full relative ${sizes}`}
                        >
                            {children}
                            <div className='' tabIndex={0}></div>
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}

export default Modal