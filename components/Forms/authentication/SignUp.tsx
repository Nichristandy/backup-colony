import Link from 'next/link'
import React, { Dispatch, Fragment, SetStateAction, useEffect, useMemo, useState } from 'react'
import { MdEmail, MdLockOutline, MdOutlineCalendarToday, MdOutlineEmail, MdOutlineLockOpen, MdOutlinePerson } from 'react-icons/md'
import Button from '../../Button/Button'
import DropdownSelect from '../../Dropdown/DropdownSelect'
import PhoneInput from 'react-phone-input-2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDatePicker, useInput, usePhoneInput, useSelect } from '../../../utils/useHooks/useHooks'
import { validation } from '../../../utils/useHooks/validation'
import { useAppDispatch, useAppSelector } from '../../../redux/Hook'
import { selectAuth, webRegister } from '../../../redux/features/auth/authReducers'
import { FaCircleNotch } from 'react-icons/fa'
import { useRouter } from 'next/router'

type Props = {
    onChangePage: () => void
    isOpen: boolean
    value: any
    setValue: Dispatch<SetStateAction<any>>
};

const genderOption = [
    {
        value: 1,
        gender: "male",
        label: "Mr"
    },
    {
        value: 2,
        gender: "female",
        label: "Mrs"
    },
    {
        value: 3,
        gender: "female",
        label: "Miss"
    },
    {
        value: 4,
        gender: "any",
        label: "Any"
    }
];

const stylesSelect = {
    indicatorSeparator: (provided: any) => ({
        ...provided,
        display: 'none',
    }),
    dropdownIndicator: (provided: any) => {
        return ({
            ...provided,
            // color: '#5F59F7',
            padding: "1rem"
        })
    },
    clearIndicator: (provided: any) => {
        return ({
            ...provided,
            // color: '#5F59F7',
            padding: "1rem"
        })
    },
    singleValue: (provided: any) => {
        return (provided)
    },
    control: (provided: any, state: any) => {
        return ({
            ...provided,
            background: "#F5F9FD",
            borderColor: state.isFocused ? "#5F59F7" : "#E2E8F0",
            minHeight: 38
        })
    }
};

const SignUp = (props: any) => {
    const { value, setValue, onChangePage, isOpen } = props;
    const router = useRouter();
    const { pathname, query } = router;

    const isOpened = useMemo(() => isOpen, [isOpen])

    // redux
    const dispatch = useAppDispatch();
    const { data, error, message, pending } = useAppSelector(selectAuth);

    // state
    const [isHiddenPass, setIsHiddenPass] = useState(true);
    const [isHiddenCPass, setIsHiddenCPass] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const { value: email, setValue: setEmail, reset: resetEmail, error: emailError, setError: setEmailError, onChange: onEmailChange } = useInput({
        defaultValue: "",
        validate: (value) => validation?.email(value),
    });
    const { value: gender, setValue: setGender, reset: resetGender, error: genderError, setError: setGenderError, onChange: onGenderChange } = useSelect({
        validate: (value) => validation?.required(value),
    });
    const { value: firstName, setValue: setFirstName, reset: resetFirstName, error: firstNameError, setError: setFirstNameError, onChange: onFirstNameChange } = useInput({
        defaultValue: "",
        validate: (value) => validation?.required(value),
    });
    const { value: lastName, setValue: setLastName, reset: resetLastName, error: lastNameError, setError: setLastNameError, onChange: onLastNameChange } = useInput({
        defaultValue: "",
        validate: (value) => validation?.required(value),
    });
    const { value: nickName, setValue: setNickName, reset: resetNickName, error: nickNameError, setError: setNickNameError, onChange: onNickNameChange } = useInput({
        defaultValue: "",
        // validate: (value) => validation?.required(value),
    });
    const { value: phoneNumber, setValue: setPhoneNumber, reset: resetPhoneNumber, error: phoneNumberError, setError: setPhoneNumberError, onChange: onPhoneNumberChange } = usePhoneInput({
        defaultCountry: "",
        validate: (value) => validation?.required(value),
    });
    const { value: birthday, setValue: setBirthday, reset: resetBirthday, error: birthdayError, setError: setBirthdayError, onChange: onBirthdayChange } = useDatePicker({
        validate: (date) => validation?.required(date),
    });
    const { value: password, setValue: setPassword, reset: resetPassword, error: passwordError, setError: setPasswordError, onChange: onPasswordChange } = useInput({
        defaultValue: "",
        validate: (value) => validation?.password(value),
    });
    const { value: confirmPassword, setValue: setConfirmPassword, reset: resetConfirmPassword, error: confirmPasswordError, setError: setConfirmPasswordError, onChange: onConfirmPasswordChange } = useInput({
        defaultValue: "",
        validate: (value) => validation?.confirmPassword(value, password),
    });

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (submitting) {
            dispatch(webRegister({
                data: {
                    email,
                    firstName,
                    lastName,
                    nickName,
                    phoneNumber,
                    birthday,
                    password,
                    confirmPassword
                },
                callback:() => router.push({ 
                    pathname: "/authentication",
                    query: {
                        page: "sign-in",
                    }
                }),
            }))
        }
    };

    const handleReset = () => {
        resetFirstName()
        resetLastName()
        resetNickName()
        resetGender()
        resetPhoneNumber()
        resetBirthday()
        resetEmail()
        resetPassword()
        resetConfirmPassword()
    };

    const handleIsPassword = (value: boolean) => setIsHiddenPass(!value);
    const handleIsCPassword = (value: boolean) => setIsHiddenCPass(!value);

    useEffect(() => {
        if (
            !email ||
            !password ||
            !confirmPassword ||
            !firstName ||
            !lastName ||
            !phoneNumber ||
            !birthday ||
            emailError ||
            passwordError ||
            confirmPasswordError ||
            firstNameError ||
            lastNameError ||
            phoneNumberError ||
            birthdayError
        ) {
            setSubmitting(false);
            // perform submission logic
        } else {
            setSubmitting(true)
        }
    }, 
    [
        email, 
        password, 
        confirmPassword, 
        firstName, 
        lastName, 
        phoneNumber, 
        birthday,
        emailError, 
        passwordError, 
        confirmPasswordError, 
        firstNameError, 
        lastNameError, 
        phoneNumberError, 
        birthdayError,
    ]);

    useEffect(() => {
      if(value.email || value.password) {
        setEmail(value.email)
        setPassword(value.password)
      }
    }, [value.email, value.password])

    return (
        <div className={`absolute bg-white right-0 top-0 z-50 flex w-full lg:w-1/2 h-full flex-col overflow-hidden duration-300 ease-in-out ${isOpened ? 'translate-x-0 visible' : 'translate-x-full invisible'}`}>
            <div className='relative bg-white z-50 w-full h-full flex flex-col justify-between gap-2.5 text-gray-5 py-6'>
                <div className=' w-full flex flex-col gap-2 p-6 xl:pl-10'>
                    <h2 className='font-bold text-2xl text-graydark dark:text-white sm:text-title-xl2'>Welcome Back User</h2>
                    <p className='text-gray-5 text-sm sm:text-title-sm'>Sign your informations to continue</p>
                </div>

                <form onSubmit={onSubmit} className='relative overflow-auto p-6 xl:px-10'>
                    <div className='mb-3'>
                        <label htmlFor='name' className='mb-2.5 block font-medium text-black dark:text-white'>
                            Contact Name *
                        </label>
                        <div className="w-full flex flex-col lg:flex-row gap-2">
                            <div className="w-full lg:w-1/3">
                                <DropdownSelect
                                    customStyles={stylesSelect}
                                    value={gender}
                                    onChange={onGenderChange}
                                    options={genderOption}
                                    className='text-sm lg:text-md font-normal'
                                    classNamePrefix=""
                                    formatOptionLabel=""
                                    instanceId='1'
                                    isDisabled={false}
                                    isMulti={false}
                                    placeholder='Choose...'
                                    icon=''
                                    error=""
                                />
                                {genderError && <div className='mt-1 text-danger text-sm lg:text-md'>{genderError}</div>}
                            </div>

                            <div className="w-full lg:w-2/3 flex flex-col lg:flex-row gap-2">
                                <div className='w-full lg:w-1/2 relative'>
                                    <input
                                        id='name'
                                        value={firstName}
                                        onChange={onFirstNameChange}
                                        type='text'
                                        placeholder='Firstname'
                                        className='text-sm lg:text-md w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />

                                    <MdOutlinePerson className='absolute right-4 top-4 h-6 w-6 text-gray-5' />
                                    {firstNameError && <div className='mt-1 text-danger text-sm lg:text-md'>{firstNameError}</div>}
                                </div>
                                <div className='w-full lg:w-1/2 relative'>
                                    <input
                                        id='name'
                                        value={lastName}
                                        onChange={onLastNameChange}
                                        type='text'
                                        placeholder='Lastname'
                                        className='text-sm lg:text-md w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />

                                    <MdOutlinePerson className='absolute right-4 top-4 h-6 w-6 text-gray-5' />
                                    {lastNameError && <div className='mt-1 text-danger text-sm lg:text-md'>{lastNameError}</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col lg:flex-row mb-0 lg:mb-3 gap-2">
                        <div className='w-full lg:w-1/2 mb-3 lg:mb-0'>
                            <label htmlFor='phone' className='mb-2.5 block font-medium text-black dark:text-white'>
                                Phone Number *
                            </label>
                            <div className='text-gray-5'>
                                <PhoneInput
                                    specialLabel=''
                                    country={"id"}
                                    value={phoneNumber}
                                    onChange={onPhoneNumberChange}
                                    buttonClass='shadow-default'
                                    placeholder='1 123 4567 8910'
                                    inputClass='form-control py-4 px-6 border border-stroke focus:border-primary rounded-lg text-sm lg:text-md'
                                    dropdownClass='right-0 text-sm lg:text-md'
                                    searchClass='p-2 outline-none sticky z-10 bg-white top-0 shadow-2'
                                    containerClass='flex flex-row-reverse'
                                    enableSearch
                                // disableSearchIcon
                                />
                            </div>
                            {phoneNumberError && <div className='mt-1 text-danger text-sm lg:text-md'>{phoneNumberError}</div>}
                        </div>

                        <div className='w-full lg:w-1/2 mb-3 lg:mb-0'>
                            <span className='mb-2.5 block font-medium text-black dark:text-white'>Date of Birth *</span>
                            <label className='w-full text-gray-5 overflow-hidden'>
                                <div className='relative'>
                                    <DatePicker
                                        selected={birthday}
                                        onChange={onBirthdayChange}
                                        placeholderText={"Date of birth"}
                                        todayButton
                                        // customInput={<ExampleCustomInput />}
                                        dropdownMode="select"
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        className='text-sm lg:text-md w-full text-gray-5 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                    <MdOutlineCalendarToday className='absolute right-4 top-4 h-6 w-6 text-gray-5' />
                                </div>
                            </label>
                            {birthdayError && <div className='mt-1 text-danger text-sm lg:text-md'>{birthdayError}</div>}
                        </div>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='email' className='mb-2.5 block font-medium text-black dark:text-white'>
                            Email *
                        </label>
                        <div className='relative'>
                            <input
                                value={email}
                                onChange={onEmailChange}
                                type='email'
                                autoFocus
                                placeholder='Enter your email'
                                className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            />

                            <MdOutlineEmail className='absolute right-4 top-4 h-6 w-6 text-gray-5' />
                            {emailError && <div className='mt-1 text-danger text-sm lg:text-md'>{emailError}</div>}
                        </div>
                    </div>

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

                    <div className='w-full flex flex-col lg:flex-row gap-2 items-center mb-5'>
                        <div className='w-full max-w-max'>
                            <Button
                                type='submit'
                                variant="primary"
                                className='w-full cursor-pointer rounded-lg border py-4 text-white transition hover:bg-opacity-90 gap-2'
                                onClick={onSubmit}
                                disabled={pending || !submitting}
                            >
                                {pending ?
                                    (<Fragment>
                                        Loading...
                                        <FaCircleNotch className='w-5 h-5 animate-spin-2' />
                                    </Fragment>)
                                    : "Create an account"}
                            </Button>
                        </div>

                        <div className='w-full flex flex-col justify-center items-center lg:items-start'>
                            <p>Already have an account?</p>
                            <Button
                                type="button"
                                className='text-primary px-0 py-0 text-left'
                                onClick={() => onChangePage({ page: "sign-in", callback:() => handleReset() })}
                            >
                                Sign in Here
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default SignUp