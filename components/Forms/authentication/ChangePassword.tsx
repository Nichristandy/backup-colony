import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useInput } from '../../../utils/useHooks/useHooks';
import { validation } from '../../../utils/useHooks/validation';
import { useAppDispatch, useAppSelector } from '../../../redux/Hook';
import { selectAuth, webForgotPassword, webNewPassword } from '../../../redux/features/auth/authReducers';
import { MdLockOutline, MdOutlineEmail, MdOutlineLockOpen } from 'react-icons/md';
import Button from '../../Button/Button';
import { FaCircleNotch } from 'react-icons/fa';
import { useRouter } from 'next/router';

interface ForgotPasswordProps {
    isOpen?: boolean;
    code?: string
}

const ChangePassword: FC<ForgotPasswordProps> = (props) => {
    const router = useRouter();
    const { pathname, query } = router;
    const { isOpen, code } = props
    const [submitting, setSubmitting] = useState(false);
    const [isHiddenPass, setIsHiddenPass] = useState(true);
    const [isHiddenCPass, setIsHiddenCPass] = useState(true);
    const { value: password, reset: resetPassword, error: passwordError, setError: setPasswordError, onChange: onPasswordChange } = useInput({
        defaultValue: "",
        validate: (value) => validation?.password(value),
    });
    const { value: confirmPassword, reset: resetConfirmPassword, error: confirmPasswordError, setError: setConfirmPasswordError, onChange: onConfirmPasswordChange } = useInput({
        defaultValue: "",
        validate: (value) => validation?.confirmPassword(value, password),
    });

    // redux
    const dispatch = useAppDispatch()
    const { data, error, message, pending } = useAppSelector(selectAuth);

    const handleIsPassword = (value: boolean) => setIsHiddenPass(!value);
    const handleIsCPassword = (value: boolean) => setIsHiddenCPass(!value);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let data = {
            password,
            confirmPassword
        }
        console.log(data, 'cek')
        dispatch(webNewPassword({
            data,
            code,
            callback: () => router.push({ pathname: "/authentication", query: { page: "sign-in" } })
        }))
    };

    const onReset = () => {
        resetPassword()
        resetConfirmPassword()
    };

    useEffect(() => {
        if (passwordError || !password) {
            setSubmitting(false);
            // perform submission logic
        } else {
            setSubmitting(true);
        }
    }, [passwordError, password]);

    return (
        <div className={`w-full h-full flex flex-col justify-center gap-6 ${!isOpen ? "hidden" : ""}`}>
            <div className='flex flex-col gap-2'>
                <h2 className='font-bold text-2xl text-graydark dark:text-white sm:text-title-xl2'>Change New Password</h2>
                {/* <p className='text-gray-5 text-sm sm:text-title-sm'>We will send you a message trough your email to reset your password.</p> */}
            </div>

            <form onSubmit={onSubmit}>
                <div className='mb-3'>
                    <label htmlFor="password" className='mb-2.5 block font-medium text-black dark:text-white'>
                        Password *
                    </label>
                    <div className='relative'>
                        <input
                            value={password}
                            onChange={onPasswordChange}
                            type={isHiddenPass ? "password" : "text"}
                            id="password"
                            placeholder='Enter your password'
                            autoFocus
                            className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        />

                        <button
                            type='button'
                            className='absolute z-40 right-4 top-4 text-gray-5 focus:outline-none'
                            onClick={() => handleIsPassword(isHiddenPass)}
                        >
                            {isHiddenPass ? <MdLockOutline className='w-6 h-6' /> :
                                <MdOutlineLockOpen className='w-6 h-6' />
                            }
                        </button>
                        {passwordError && <div className='mt-1 text-danger text-sm lg:text-md'>{passwordError}</div>}
                    </div>
                </div>

                <div className='mb-5 sm:mb-20'>
                    <label htmlFor="verify-password" className='mb-2.5 block font-medium text-black dark:text-white'>
                        Verify Password *
                    </label>
                    <div className='relative'>
                        <input
                            value={confirmPassword}
                            onChange={onConfirmPasswordChange}
                            type={isHiddenCPass ? "password" : "text"}
                            id="verify-password"
                            placeholder='Enter your verify password'
                            autoFocus
                            className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        />

                        <button
                            type='button'
                            className='absolute z-40 right-4 top-4 text-gray-5 focus:outline-none'
                            onClick={() => handleIsCPassword(isHiddenCPass)}
                        >
                            {isHiddenCPass ? <MdLockOutline className='w-6 h-6' /> :
                                <MdOutlineLockOpen className='w-6 h-6' />
                            }
                        </button>
                        {confirmPasswordError && <div className='mt-1 text-danger text-sm lg:text-md'>{confirmPasswordError}</div>}
                    </div>
                </div>

                <div className='w-full flex flex-col gap-2 items-center mb-5'>
                    <div className='w-full'>
                        <Button
                            type='submit'
                            variant="primary"
                            className='w-full cursor-pointer rounded-lg border py-4 text-white transition hover:bg-opacity-90'
                            onSubmit={onSubmit}
                            disabled={pending || !submitting}
                        >
                            {pending ?
                                <div className='flex items-center gap-2'>
                                    Loading...
                                    <FaCircleNotch className='w-5 h-5 animate-spin-2' />
                                </div>
                                : "Change New Password"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default ChangePassword;