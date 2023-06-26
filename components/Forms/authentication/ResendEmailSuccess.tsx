import { deleteCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import Button from '../../Button/Button'

type Props = {}

const ResendEmailSuccess = (props: any) => {
    const router = useRouter();
    const { isOpen } = props;

    const gotToLogin = () => {
        deleteCookie("access")
        deleteCookie("accessToken")
        deleteCookie("refreshToken")
        router.push({
            pathname: "/authentication",
            query: {
                page: "sign-in"
            }
        })
    }


    return (
        <div className={`w-full lg:w-1/2 h-full flex flex-col py-6 gap-10 text-gray-5 justify-center ${!isOpen ? "hidden" : ""}`}>
            <div className="w-full flex flex-col justify-center gap-6">
                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl text-graydark dark:text-white sm:text-title-xl2'>Resend E-mail is successfully!</h2>
                    <p className='text-gray-5 text-sm sm:text-title-sm'>Your email has been resend. check yout email regularly</p>
                </div>
            </div>

            <Button 
                className='w-full max-w-max flex items-center gap-4 py-0 px-0'
                onClick={gotToLogin}
                type="button"
            >
                <span className='p-2 rounded-lg bg-primary text-white hover:opacity-80 hover:shadow-1'>
                    <MdArrowBack className='w-6 h-6' />
                </span>
                <h2 className='text-lg text-graydark dark:text-white sm:text-title-lg'>
                    back to login.
                </h2>
            </Button>
        </div>
    )
}

export default ResendEmailSuccess;