import Link from 'next/link'
import React from 'react'
import { MdArrowBack } from 'react-icons/md'

type Props = {}

const AccountVerified = (props: any) => {
    const { isOpen } = props;
    return (
        <div className={`w-full lg:w-1/2 h-full flex flex-col py-6 gap-10 text-gray-5 justify-center ${!isOpen ? "hidden" : ""}`}>
            <div className="w-full flex flex-col justify-center gap-6">
                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl text-graydark dark:text-white sm:text-title-xl2'>Thanks for registering</h2>
                    <p className='text-gray-5 text-sm sm:text-title-sm'>Your account has been verified. please continue to login to access the platform</p>
                </div>
            </div>

            <Link className='mb-5.5 flex items-center gap-4' href='/authentication?page=sign-in'>
                <span className='p-2 rounded-lg bg-primary text-white hover:opacity-80 hover:shadow-1'>
                    <MdArrowBack className='w-6 h-6' />
                </span>
                <h2 className='text-lg text-graydark dark:text-white sm:text-title-lg'>
                    back to login.
                </h2>
            </Link>
        </div>
    )
}

export default AccountVerified;