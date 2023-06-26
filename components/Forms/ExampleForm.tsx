import React, { Fragment, useEffect, useState } from 'react'
import { useCheckbox, useInput, useRadioInput, useSelect, useTextArea } from '../../utils/useHooks/useHooks';
import { validation } from '../../utils/useHooks/validation';
import { MdOutlinePerson } from 'react-icons/md';
import DropdownSelect from '../Dropdown/DropdownSelect';
import { ModalFooter, ModalHeader } from '../Modal/ModalComponent';
import Button from '../Button/Button';

const customStylesSelect = {
    indicatorSeparator: (provided: any) => ({
        ...provided,
        display: 'none',
    }),
    dropdownIndicator: (provided: any) => {
        return ({
            ...provided,
            color: '#5F59F7',
            // padding: 0,
            // paddingTop: 0,
            // paddingBottom: 0,
            // paddingLeft: 0,
            // paddingRight: 0,
        })
    },
    clearIndicator: (provided: any) => {
        return ({
            ...provided,
            color: '#5F59F7',
            // padding: 0,
            // paddingTop: 0,
            // paddingBottom: 0,
            // paddingLeft: 0,
            // paddingRight: 0,
        })
    },
    singleValue: (provided: any) => {
        return ({
            ...provided,
            color: '#5F59F7',
        })
    },
    control: (provided: any, state: any) => {
        console.log(provided, "control")
        return ({
            ...provided,
            background: "",
            padding: '.5rem',
            borderColor: state.isFocused ? "#5F59F7" : "#E2E8F0",
            color: "#5F59F7",
            "&:hover": {
                color: state.isFocused ? "#E2E8F0" : "#5F59F7",
                borderColor: state.isFocused ? "#E2E8F0" : "#5F59F7"
            },
            minHeight: 38
        })
    },
    menuList: (provided: any) => ({
        ...provided,
        padding: 0
    })
};

const ExampleForm = (props: any) => {
    const { isOpen, isOpenModal, isCloseModal, items } = props

    const [jobChecked, setJobChecked] = useState(true);

    interface Option {
        label: string;
        value: string;
    }

    const genderOpt: Option[] = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Any', value: 'any' },
    ];

    let data = "ridho@gmail.com";
    const [submitting, setSubmitting] = useState(false);
    const { value: name, reset: resetName, error: nameError, onChange: onNameChange } = useInput({
        defaultValue: "",
        validate: (value) => validation?.required(value),
    });
    const { value: email, reset: resetEmail, error: emailError, onChange: onEmailChange } = useInput({
        defaultValue: "",
        validate: (value) => validation?.email(value),
    });
    const { value: password, reset: resetPassword, error: passwordError, onChange: onPasswordChange } = useInput({
        defaultValue: "",
        validate: (value) => validation?.password(value),
    });
    const { value: description, setValue: setDescription, reset: resetDescription, error: descriptionError, onChange: onDescriptionChange } = useTextArea({
        defaultValue: "",
        validate: (value) => validation?.description(value),
    });
    const { checked: jobs, setChecked: setJobs, reset: resetJobs, error: jobsError, onChange: onJobsChange } = useCheckbox({
        defaultChecked: false
    });
    // @ts-ignore
    const { value: gender, error: genderError, onChange: onGenderChange, reset: resetGender } = useSelect<Option>({
        defaultValue: null,
        validate: (value) => validation.select(value),
    });
    const radioOpt = ['Option 1', 'Option 2', 'Option 3'];
    const { value: radio, setValue: setRadio, error: radioError, onChange: onRadioChange, reset: resetRadio } = useRadioInput(radioOpt, {
        defaultValue: '',
        validate: (value) => validation?.radio(value)
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submitting) {
            console.log({ name, email, password, gender, description }, 'event form')
        }
    };

    const handleReset = () => {
        resetEmail()
        resetPassword()
        resetGender()
        resetName()
        resetDescription()
        resetJobs()
        resetRadio()
    }

    useEffect(() => {
        if (emailError || passwordError || genderError || nameError || descriptionError || jobsError || !name || !email || !password || !gender) {
            setSubmitting(false);
            // perform submission logic
        } else {
            setSubmitting(true)
        }
    }, [emailError, passwordError, genderError, nameError, descriptionError, jobsError, name, email, password, gender]);

    useEffect(() => {
        if (jobChecked) {
            setJobs(jobChecked)
        }
    }, [jobChecked])

    console.log({ emailError, passwordError, genderError, nameError, descriptionError, jobsError }, 'submit')

    return (
        <Fragment>
            <ModalHeader onClick={isOpenModal} isClose={true} className="sticky z-9 top-0 p-4 bg-white border-b-2 border-gray mb-3">
                <div className='flex flex-col'>
                    <h3 className='text-lg font-semibold'>Add/Edit Tower</h3>
                    <p className='text-gray-4'>Fill your tower information.</p>
                </div>
            </ModalHeader>

            <form onSubmit={handleSubmit}>
                <div className='mb-4 px-4'>
                    <label className='mb-2.5 block font-medium text-black dark:text-white'>
                        Name
                    </label>
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Enter your name'
                            className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            value={name}
                            onChange={onNameChange}
                        />

                        <span className='absolute right-4 top-4'>
                            <MdOutlinePerson className='w-6 h-6 fill-current text-gray-4 opacity-80' />
                        </span>
                        {nameError && <div className='mt-1 text-danger'>{nameError}</div>}
                    </div>
                </div>

                <div className='mb-4 px-4'>
                    <label className='mb-2.5 block font-medium text-black dark:text-white'>
                        Email
                    </label>
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Enter your email'
                            className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            value={email}
                            onChange={onEmailChange}
                        />

                        <span className='absolute right-4 top-4'>
                            <svg
                                className='fill-current'
                                width='22'
                                height='22'
                                viewBox='0 0 22 22'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <g opacity='0.5'>
                                    <path
                                        d='M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z'
                                        fill=''
                                    />
                                </g>
                            </svg>
                        </span>

                        {emailError && <div className='mt-1 text-danger'>{emailError}</div>}
                    </div>
                </div>

                <div className='mb-4 px-4'>
                    <label className='mb-2.5 block font-medium text-black dark:text-white'>
                        Password
                    </label>
                    <div className='relative'>
                        <input
                            type='password'
                            placeholder='6+ Characters, 1 Capital letter'
                            className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            value={password}
                            onChange={onPasswordChange}
                        />

                        <span className='absolute right-4 top-4'>
                            <svg
                                className='fill-current'
                                width='22'
                                height='22'
                                viewBox='0 0 22 22'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <g opacity='0.5'>
                                    <path
                                        d='M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z'
                                        fill=''
                                    />
                                    <path
                                        d='M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z'
                                        fill=''
                                    />
                                </g>
                            </svg>
                        </span>

                        {passwordError && <div className='mt-1 text-danger'>{passwordError}</div>}
                    </div>
                </div>

                <div className='mb-4 px-4'>
                    <label className='mb-2.5 block font-medium text-black dark:text-white'>
                        Gender
                    </label>
                    <div className='relative'>
                        <DropdownSelect
                            customStyles={customStylesSelect}
                            value={gender}
                            onChange={onGenderChange}
                            error=""
                            className='text-sm font-normal'
                            classNamePrefix=""
                            formatOptionLabel=""
                            instanceId='1'
                            isDisabled={false}
                            isMulti={false}
                            placeholder='Unit'
                            options={genderOpt}
                            icon=''
                        />

                        {genderError && <div className='mt-1 text-danger'>{genderError}</div>}
                    </div>
                </div>

                <div className="mb-4 px-4">
                    <label htmlFor='1' className='flex cursor-pointer'>
                        <div className='relative pt-0.5'>
                            <input
                                type='checkbox'
                                id='1'
                                className='taskCheckbox sr-only'
                                checked={jobs}
                                onChange={onJobsChange}
                            />
                            <div className={`box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark ${jobs ? "border-primary" : ""}`}>
                                <span className={`text-primary ${jobs ? "opacity-100" : "opacity-0"}`}>
                                    <svg
                                        className='fill-current'
                                        width='10'
                                        height='7'
                                        viewBox='0 0 10 7'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            clipRule='evenodd'
                                            d='M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z'
                                            fill=''
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <p>Remember me</p>
                    </label>
                </div>

                <div className="mb-4 px-4 flex flex-wrap items-center gap-2">
                    {radioOpt.map((option) => (
                        <label key={option} className='flex items-center gap-2'>
                            <input
                                type="radio"
                                value={option}
                                checked={radio === option}
                                onChange={onRadioChange}
                            />
                            {option}
                        </label>
                    ))}
                </div>

                <div className='mb-4 px-4'>
                    <label className='mb-2.5 block font-medium text-black dark:text-white'>
                        Description
                    </label>
                    <div className='relative'>
                        <textarea
                            rows={6}
                            value={description}
                            onChange={onDescriptionChange}
                            placeholder='Type your message'
                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        ></textarea>
                        {descriptionError && <div className='mt-1 text-danger'>{descriptionError}</div>}
                    </div>
                </div>

                <ModalFooter
                    className='sticky bottom-0 bg-white p-4 border-t-2 border-gray mt-3'
                    isClose={true}
                    onClick={isCloseModal}
                >
                    <Fragment>
                        <Button
                            type="submit"
                            variant="primary"
                            className="rounded-md text-sm"
                            onClick={handleSubmit}
                            disabled={!submitting}
                        >
                            Submit
                        </Button>

                        <Button
                            type="buuton"
                            variant="danger"
                            className="rounded-md text-sm"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </Fragment>
                </ModalFooter>
            </form>
        </Fragment>
    )
}

export default ExampleForm