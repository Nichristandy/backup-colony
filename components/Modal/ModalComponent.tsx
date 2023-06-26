import React from 'react'
import Button from '../Button/Button'
import { MdClose } from 'react-icons/md'

type ModalProps = {
    className?: string, 
    children?: JSX.Element | string,
    isClose?: boolean , 
    onClick?: () => void
}

const ModalHeader = ({ className, children, isClose, onClick }: ModalProps) => {

    return (
        <div className={`w-full flex items-center ${className}`}>
            {children}
            <Button
                type="button"
                onClick={onClick}
                variant=''
                className={`border border-gray rounded-md px-1 py-[0.25rem] ml-auto mr-2 bg-gray focus:outline-none ${!isClose ? "hidden" : "inline-block"}`}
            >
                <MdClose className='text-gray-4 w-5 h-5' />
            </Button>
        </div>
    )
};

const ModalFooter = ({ className, children, isClose, onClick }: ModalProps) => {

    return (
        <div className={`w-full flex items-center gap-2 justify-end ${className}`}>
            {children}
            <Button
                type="button"
                onClick={onClick}
                variant='danger'
                className={`rounded-md text-sm focus:outline-none ${!isClose ? "hidden" : "inline-block"}`}
            >
                Close
            </Button>
        </div>
    )
};

export { ModalHeader, ModalFooter }