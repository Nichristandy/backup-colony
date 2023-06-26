import Link from 'next/link'
import React from 'react'
import { MdArrowBack } from 'react-icons/md';
import Button from '../../Button/Button';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

const ResendYourEmail = (props: any) => {
    const router = useRouter();
    const { pathname, query } = router;
    const { isOpen, isOpenResendEmail } = props;

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
        <div className={`w-full lg:w-1/2 h-full flex flex-col py-6 gap-2 text-gray-5 justify-between ${!isOpen ? "hidden" : ""}`}>
            <button className='mb-5.5 flex items-center gap-4' type='button' onClick={gotToLogin}>
                <span className='p-2 rounded-lg bg-primary text-white hover:opacity-80 hover:shadow-1'>
                    <MdArrowBack className='w-6 h-6' />
                </span>
                <h2 className='text-lg text-graydark dark:text-white sm:text-title-lg'>
                    Back to login.
                </h2>
            </button>

            <div className="w-full flex flex-col justify-center gap-6">
                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl text-graydark dark:text-white sm:text-title-xl2'>Resend E-mail!</h2>
                    <p className='text-gray-5 text-sm sm:text-title-sm'>We already sent an email to your account, please check regularly to verify</p>
                </div>
            </div>

            <div className="w-full flex flex-col justify-center gap-6">
                <div className='w-full flex flex-col gap-2 items-start mb-5 text-left'>
                    <p className='text-gray-5 text-sm lg:text-sm'>not receiving e-mail?</p>
                    <div className='w-full max-w-max'>
                        <Button
                            onClick={isOpenResendEmail}
                            type='button'
                            variant="primary-outline-none"
                            className='w-full cursor-pointer rounded-lg py-4 px-0 transition hover:bg-opacity-90 text-left text-sm font-semibold'
                        >
                            Resend e-mail
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResendYourEmail;