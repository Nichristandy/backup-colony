import React, { FormEvent, SetStateAction, useEffect, useState } from 'react'
import AuthLayout from '../../components/Layouts/AuthLayouts'
import { MdArrowBack } from 'react-icons/md'
import { useRouter } from 'next/router'
import { useInput } from '../../utils/useHooks/useHooks'
import { validation } from '../../utils/useHooks/validation'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { selectAuth, webForgotPassword } from '../../redux/features/auth/authReducers'
import ForgotPasswordForm from '../../components/Forms/authentication/ForgotPasswordForm'
import ChangePassword from '../../components/Forms/authentication/ChangePassword'
import Link from 'next/link'

type Props = {}

const ForgotPassword = (props: Props) => {
    const router = useRouter();
    const { pathname, query } = router;
    const [code, setCode] = useState<string>("");
    const [isChangePassword, setIsChangePassword] = useState(false);

    // redux
    const dispatch = useAppDispatch()
    const { data, error, message, pending } = useAppSelector(selectAuth);

    useEffect(() => {
        if (query?.code) setCode(query?.code as SetStateAction<string>)
    }, [query.code])

    useEffect(() => {
        let qr = {
            code: query?.code
        }
        if (code) ({ ...qr, code: code })
        router.replace({ pathname, query: qr })
    }, [code])

    console.log(code, 'code');

    useEffect(() => {
        if (!code) setIsChangePassword(false);
        else setIsChangePassword(true)
    }, [code])


    return (
        <AuthLayout
            title="Authentication"
            logo="../image/logo/logo-icon.svg"
            description=""
        >
            <div className='relative w-full h-full flex items-center rounded-xl bg-white shadow-default p-10'>
                <div className='w-full lg:w-1/2 h-full flex flex-col py-6 gap-2 text-gray-5 lg:pr-6'>
                    <button
                        className='mb-5.5 flex items-center gap-4'
                        type='button'
                        onClick={() => router.push({ pathname: "/authentication", query: { page: "sign-in" } })}
                    >
                        <span className='p-2 rounded-lg bg-primary text-white hover:opacity-80 hover:shadow-1'>
                            <MdArrowBack className='w-6 h-6' />
                        </span>
                        <h2 className='text-lg text-graydark dark:text-white sm:text-title-lg'>
                            back to login.
                        </h2>
                    </button>

                    <ForgotPasswordForm isOpen={!isChangePassword} />
                    <ChangePassword isOpen={isChangePassword} code={code} />
                </div>

                <div className={`hidden w-full lg:w-1/2 h-full lg:block transition-transform duration-500 border bg-primary text-white border-stroke rounded-3xl ease-in-out`}>
                    <div className="w-full h-full flex flex-col items-center justify-between">
                        <Link className='w-full pt-5.5 flex items-center gap-4 px-10' href='/authentication?page=sign-in'>
                            <img src="../image/logo/logo-icon-white.png" alt="logo" />
                            <h2 className='text-lg text-white sm:text-title-lg'>
                                Colony.
                            </h2>
                        </Link>
                        <div className='w-full flex flex-col px-10 justify-center'>
                            <div className='flex flex-col justify-center'>
                                <h2 className='text-title-md2 lg:text-title-lg mb-5'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                </h2>

                                <p className='leading-1 text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod, minus cumque molestias voluptatibus veniam minima soluta accusamus aspernatur praesentium maiores?</p>
                            </div>
                        </div>
                        <div className='w-full flex flex-col justify-end py-10 px-10 tracking-wider'>
                            <div className='w-full p-6 rounded-lg bg-[#111f2c3d] text-sm'>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In tempore debitis beatae doloremque eveniet eos sunt repellendus accusantium ab distinctio.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default ForgotPassword