import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';
import { MdOutlineNotifications } from 'react-icons/md';

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const trigger = useRef<HTMLButtonElement>(null)
  const dropdown = useRef<HTMLDivElement>(null)

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
  })

  return (
    <li className='relative'>
      <button
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className='relative flex h-8.5 w-8.5 items-center justify-center rounded-full hover:text-gray text-white'
      >
        <span className='absolute -top-1 right-0 z-1 h-2 w-2 rounded-full bg-meta-1'>
          <span className='absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75'></span>
        </span>

        <MdOutlineNotifications className='w-6 h-6' />
      </button>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default right-0 sm:w-80 text-graydark ${dropdownOpen === true ? 'block' : 'hidden'
          }`}
      >
        <div className='px-4.5 py-3'>
          <h5 className='text-sm font-medium text-bodydark2'>Notification</h5>
        </div>

        <ul className='flex h-auto flex-col overflow-y-auto'>
          <li>
            <button
              onClick={() => console.log("test")}
              className='text-left flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4'
            >
              <p className='text-sm'>
                <span className='text-black dark:text-white'>
                  Edit your information in a swipe
                </span>{' '}
                Sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim.
              </p>

              <p className='text-xs'>12 May, 2025</p>
            </button>
          </li>
          <li>
            <button
              onClick={() => console.log("test")}
              className='text-left flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4'
            >
              <p className='text-sm'>
                <span className='text-black dark:text-white'>
                  It is a long established fact
                </span>{' '}
                that a reader will be distracted by the readable.
              </p>

              <p className='text-xs'>24 Feb, 2025</p>
            </button>
          </li>
          <li>
            <button
              onClick={() => console.log("test")}
              className='text-left flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4'
            >
              <p className='text-sm'>
                <span className='text-black dark:text-white'>
                  There are many variations
                </span>{' '}
                of passages of Lorem Ipsum available, but the majority have
                suffered
              </p>

              <p className='text-xs'>04 Jan, 2025</p>
            </button>
          </li>
          <li>
            <button
              onClick={() => console.log("test")}
              className='text-left flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4'
            >
              <p className='text-sm'>
                <span className='text-black dark:text-white'>
                  There are many variations
                </span>{' '}
                of passages of Lorem Ipsum available, but the majority have
                suffered
              </p>

              <p className='text-xs'>04 Jan, 2025</p>
            </button>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default DropdownNotification;
