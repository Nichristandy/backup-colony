import React, { useEffect, useMemo, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Controller, EventType, useForm } from 'react-hook-form';
import { MdCheck, MdInfo, MdWarning } from 'react-icons/md';
import { ModalFooter } from '../../../../Modal/ModalComponent';
import Button from '../../../../Button/Button';
import DropdownSelect from '../../../../Dropdown/DropdownSelect';

type Props = {
    items?: any
    isOpen?: boolean;
    onClose: () => void
}

type FormValues = {
    id?: any,
    taxName?: string | any,
    taxCode?: string | number | any,
    taxType?: any,
    total?: number | string | any
}

type WatchProps = {
    value?: any | null
}

type WatchChangeProps = {
    name?: any | null;
    type?: EventType | any
};

const stylesSelect = {
    indicatorSeparator: (provided: any) => ({
        ...provided,
        display: 'none',
    }),
    dropdownIndicator: (provided: any) => {
        return ({
            ...provided,
            color: '#7B8C9E',
        })
    },
    clearIndicator: (provided: any) => {
        return ({
            ...provided,
            color: '#7B8C9E',
        })
    },
    singleValue: (provided: any) => {
        return ({
            ...provided,
            color: '#5F59F7',
        })
    },
    control: (provided: any, state: any) => {
        // console.log(provided, "control")
        return ({
            ...provided,
            background: "",
            padding: '0',
            paddingTop: '.335rem',
            paddingBottom: '.335rem',
            borderRadius: ".5rem",
            borderColor: state.isFocused ? "#5F59F7" : "#E2E8F0",
            color: "#5F59F7",
            "&:hover": {
                color: state.isFocused ? "#E2E8F0" : "#5F59F7",
                borderColor: state.isFocused ? "#E2E8F0" : "#5F59F7"
            },
            minHeight: 38,
            // flexDirection: "row-reverse"
        })
    },
    menuList: (provided: any) => (provided)
};

const unitOptions = [
    { id: "1", value: "currency", label: "IDR" },
    { id: "2", value: "percent", label: "Percent" },
]

const TaxForm = ({ items, isOpen, onClose }: Props) => {
    const [watchValue, setWatchValue] = useState<FormValues | any>();
    const [watchChangeValue, setWatchChangeValue] = useState<WatchChangeProps>();

    const {
        register,
        getValues,
        setValue,
        handleSubmit,
        watch,
        reset,
        setError,
        clearErrors,
        formState: { errors, isValid },
        control,
    } = useForm({
        mode: "all",
        defaultValues: useMemo<FormValues>(() => ({
            id: null,
            taxName: null,
            taxCode: null,
            taxType: null,
            total: null
        }), [])
    });

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (value) {
                setWatchValue(value)
                setWatchChangeValue({ name, type })
            }
        }
        );
        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <form className="w-full">
            <div className='w-full mb-3 px-4'>
                <label className='mb-2.5 block font-medium text-black dark:text-white'>
                    Tax Name
                    <span>*</span>
                </label>
                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Tax Name'
                        className='w-full rounded-xl border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        {...register("taxName", {
                            required: {
                                value: true,
                                message: "Tax Name is required."
                            }
                        })}
                    />
                </div>
                {errors?.taxName && (
                    <div className="mt-1 text-xs flex items-center text-red-300">
                        <MdWarning className="w-4 h-4 mr-1" />
                        <span className="text-red-300">
                            {errors?.taxName?.message as any}
                        </span>
                    </div>
                )}
            </div>

            <div className='w-full grid grid-cols-2 gap-2 mb-3'>
                <div className='w-full px-4'>
                    <label className='mb-2.5 block font-medium text-black dark:text-white'>
                        Tax ID
                    </label>
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Tax ID'
                            className='w-full rounded-xl border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            {...register("taxCode")}
                        />
                    </div>
                </div>

                <div className='w-full px-4'>
                    <label htmlFor='taxType' className='mb-2.5 block font-medium text-black dark:text-white'>
                        Type
                    </label>
                    <div className='relative'>
                        <Controller
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error },
                            }) => (
                                <DropdownSelect
                                    customStyles={stylesSelect}
                                    value={value}
                                    onChange={onChange}
                                    error=""
                                    className='text-sm font-normal text-gray-5 w-full lg:w-2/10'
                                    classNamePrefix=""
                                    formatOptionLabel=""
                                    instanceId='taxType'
                                    isDisabled={false}
                                    isMulti={false}
                                    placeholder='Unit...'
                                    options={unitOptions}
                                    icon=''
                                />
                            )}
                            name={`taxType`}
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Type is required."
                                }
                            }}
                        />
                        {errors?.taxType && (
                            <div className="mt-1 text-xs flex items-center text-red-300">
                                <MdWarning className="w-4 h-4 mr-1" />
                                <span className="text-red-300">
                                    {errors?.taxType?.message as any}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='mb-4 px-4'>
                <label htmlFor='total' className='mb-2.5 block font-medium text-black dark:text-white'>
                    Total Tax
                    <span>*</span>
                </label>
                <div className='relative'>
                    <Controller
                        render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState: { invalid, isTouched, isDirty, error },
                        }) => (
                            <CurrencyFormat
                                onValueChange={(values) => {
                                    const { value } = values
                                    onChange(value);
                                }}
                                id='total'
                                value={value || ""}
                                thousandSeparator={true}
                                placeholder="IDR"
                                prefix={"IDR "}
                                className="w-full rounded-xl border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        )}
                        name="total"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Total tax is required."
                            }
                        }}
                    />
                    {errors?.total && (
                        <div className="mt-1 text-xs flex items-center text-red-300">
                            <MdWarning className="w-4 h-4 mr-1" />
                            <span className="text-red-300">
                                {errors.total.message as any}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* footer */}
            <ModalFooter
                className='p-4 border-t-2 border-gray mt-3'
                isClose={false}
                onClick={onClose}
            >
                <div className='w-full flex items-center gap-2'>
                    <Button
                        type="button"
                        className="rounded-lg"
                        variant="secondary-outline-none"
                    >
                        <MdInfo className='w-4 h-4' />
                        Help
                    </Button>

                    <Button
                        type="button"
                        className="rounded-lg ml-auto"
                        variant="secondary-outline"
                        onClick={onClose}
                    >
                        Discard
                    </Button>
                    <Button
                        type="button"
                        className="rounded-lg"
                        variant="primary"
                    >
                        Confirm
                        <MdCheck className='w-4 h-4' />
                    </Button>
                </div>
            </ModalFooter>
        </form>
    )
}

export default TaxForm