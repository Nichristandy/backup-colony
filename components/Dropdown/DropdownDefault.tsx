import React, { useState, useEffect, useRef } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

type Props = {
    title: React.ReactNode,
    className: string,
    data: any,
    position: string,
}

const DropdownDefault = ({ title, className, data, position }: Props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const trigger = useRef<HTMLButtonElement>(null)
    const dropdown = useRef<HTMLDivElement>(null)
    const [positions, setPositions] = useState("");

    // close on click outside
    useEffect(() => {
        type Props = {
            target: any
        }
        const clickHandler = ({ target }: Props) => {
            if (!dropdown.current) return
            if (!dropdownOpen || dropdown.current.contains(target) || trigger.current?.contains(target)
            )
                return
            setDropdownOpen(false)
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
            if (!dropdownOpen || keyCode !== 27) return
            setDropdownOpen(false)
        }
        document.addEventListener('keydown', keyHandler)
        return () => document.removeEventListener('keydown', keyHandler)
    });

    useEffect(() => {
        if (position === "left") setPositions("left-0")
        else if (position === "right") setPositions("right-0")
        else if (position === "center") setPositions("-inset-x-11");
        else setPositions("right-0")
    }, [position])


    return (
        <div className={`relative`}>
            <button className={className} ref={trigger} onClick={() => setDropdownOpen(!dropdownOpen)}>
                {title}
            </button>
            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute top-full z-40 w-40 space-y-1 rounded-sm border border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? 'block' : 'hidden'
                    } ${positions}`}
            >
                <button className='flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray dark:hover:bg-meta-4'>
                    <MdEdit className='w-5 h-5' />
                    Edit
                </button>
                <button className='flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray dark:hover:bg-meta-4'>
                    <MdDelete className='w-5 h-5' />
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DropdownDefault;
