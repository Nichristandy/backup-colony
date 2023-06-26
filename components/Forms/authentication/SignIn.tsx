import Link from 'next/link'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { MdEmail, MdLockOutline, MdOutlineEmail, MdOutlineLockOpen } from 'react-icons/md'
import Button from '../../Button/Button'
import { useAppDispatch, useAppSelector } from '../../../redux/Hook'
import { useRouter } from 'next/router'
import { useInput } from '../../../utils/useHooks/useHooks'
import { validation } from '../../../utils/useHooks/validation'

// google
import { useGoogleLogin } from '@react-oauth/google';
import { selectAuth, webLogin, webLoginGoogle } from '../../../redux/features/auth/authReducers'
import { FaCircleNotch } from 'react-icons/fa'

type Props = {
    onChangePage: () => void
    isOpen: boolean
}

const SignIn = (props: any) => {
    const { value, setValue, onChangePage, isOpen, firebaseToken } = props;

    const isOpened = useMemo(() => isOpen, [isOpen])

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data, error, isLogin, message, pending } = useAppSelector(selectAuth);

    // state
    const [isHidden, setIsHidden] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [googleData, setGoogleData] = useState({});

    const { value: email, reset: resetEmail, error: emailError, setError: setEmailError, onChange: onEmailChange } = useInput({
        defaultValue: "",
        validate: (value) => validation?.email(value),
    });
    const { value: password, reset: resetPassword, error: passwordError, setError: setPasswordError, onChange: onPasswordChange } = useInput({
        defaultValue: "",
        validate: (value) => validation?.password(value),
    });

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (submitting) {
            console.log({ email, password, firebaseToken }, 'event form')
            let data = { email, password, firebaseToken }
            dispatch(webLogin({
                data,
                callback: () => router.push("/")
            }))
        }
    };

    const handleReset = () => {
        resetEmail()
        resetPassword()
    };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            await setGoogleData(tokenResponse);
            await dispatch(webLoginGoogle({
                data: {
                    token: tokenResponse.access_token,
                    firebaseToken
                },
                callback: () => router.push("/")
            }));
        },
        onError: responseGoogle => console.log(responseGoogle, 'error google')
    });

    const handleIsPassword = (value: boolean) => setIsHidden(!value);

    useEffect(() => {
        if (emailError || passwordError || !email || !password) {
            setSubmitting(false);
            // perform submission logic
        } else {
            setSubmitting(true)
        }
    }, [emailError, passwordError, email, password]);

    useEffect(() => {
        setValue({ email, password })
    }, [email, password]);

    return (
        // <div className={`static w-full h-full transition-transform duration-500 ${!isOpen ? "-translate-x-full" : ""}`}>
        <div className={`absolute bg-white left-0 top-0 z-50 flex w-full lg:w-1/2 h-full flex-col overflow-y-hidden duration-300 ease-in-out ${isOpened ? 'translate-x-0 visible' : '-translate-x-full invisible'}`}>
            <div className='w-full h-full flex flex-col justify-between gap-2 text-gray-5 py-6'>
                <Link className='mb-5.5 flex items-center gap-2.5 p-6 xl:px-10' href='/'>
                    <img className='' src={"../image/logo/logo-icon.svg"} alt='Logo' />
                    <h2 className='text-2xl text-graydark dark:text-white sm:text-title-xl2'>
                        Colony.
                    </h2>
                </Link>

                <div className='flex flex-col gap-2 p-6 xl:px-10'>
                    <h2 className='font-bold text-2xl text-graydark dark:text-white sm:text-title-xl2'>Welcome Back</h2>
                    <p className='text-gray-5 text-sm sm:text-title-sm'>Please sign in to continue</p>
                </div>

                <form onSubmit={onSubmit} className='relative overflow-y-auto overflow-x-hidden p-6 xl:px-10'>
                    <div className='mb-3'>
                        <label className='mb-2.5 block font-medium text-black dark:text-white'>
                            Email *
                        </label>
                        <div className="relative">
                            <input
                                type='email'
                                placeholder='Enter your email'
                                className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                                value={email}
                                onChange={onEmailChange}
                                autoFocus
                                autoComplete='true'
                            />

                            <MdOutlineEmail className={`absolute right-4 top-4 h-6 w-6 text-gray-5`} />
                        </div>
                        {emailError && <div className='mt-1 text-danger text-sm lg:text-md'>{emailError}</div>}
                    </div>

                    <div className='mb-5 sm:mb-20'>
                        <label className='mb-2.5 block font-medium text-black dark:text-white'>
                            Password *
                        </label>
                        <div className={`relative`}>
                            <input
                                type={isHidden ? "password" : "text"}
                                placeholder='6+ Characters, 1 Capital letter'
                                className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                                value={password}
                                onChange={onPasswordChange}
                            />
                            <button
                                type='button'
                                className='absolute z-40 right-4 top-4 text-gray-5 focus:outline-none'
                                onClick={() => handleIsPassword(isHidden)}
                            >
                                {isHidden ? <MdLockOutline className='w-6 h-6' /> :
                                    <MdOutlineLockOpen className='w-6 h-6' />
                                }
                            </button>

                        </div>
                        {passwordError && <div className='mt-1 text-danger text-sm lg:text-md'>{passwordError}</div>}
                    </div>

                    <div className='mb-5 sm:mb-20 text-center lg:text-left'>
                        <Link href={"/authentication/forgot-password"} className='w-full font-bold text-sm sm:text-title-sm mb-5 hover:text-graydark'>
                            Forgot your Password?
                        </Link>
                    </div>

                    <div className='w-full flex flex-col gap-2 items-center mb-5'>
                        <div className='w-full'>
                            <Button
                                type='submit'
                                variant="primary"
                                className='w-full cursor-pointer rounded-lg border py-4 text-white transition hover:bg-opacity-90'
                                onSubmit={onSubmit}
                                disabled={!submitting || pending}
                            >
                                {pending ?
                                    (<Fragment>
                                        Loading...
                                        <FaCircleNotch className='w-5 h-5 animate-spin-2' />
                                    </Fragment>)
                                    : "Sign in"}
                            </Button>
                        </div>

                        <button
                            type='button'
                            // @ts-ignore
                            onClick={loginWithGoogle}
                            className='flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50'
                            disabled={pending}
                        >
                            <span>
                                <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 20 20'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <g clipPath='url(#clip0_191_13499)'>
                                        <path
                                            d='M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217'
                                            fill='#4285F4'
                                        />
                                        <path
                                            d='M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999'
                                            fill='#34A853'
                                        />
                                        <path
                                            d='M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z'
                                            fill='#FBBC05'
                                        />
                                        <path
                                            d='M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z'
                                            fill='#EB4335'
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id='clip0_191_13499'>
                                            <rect width='20' height='20' fill='white' />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            Sign in with Google
                        </button>

                        <div className='w-full flex flex-col items-center justify-center'>
                            <p>Don’t have any account?</p>
                            <Button
                                type="button"
                                className='text-primary px-0 py-0'
                                onClick={() => onChangePage({ page: "sign-up", callback: () => handleReset() })}
                            >
                                Sign Up Here
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
};

export default SignIn;