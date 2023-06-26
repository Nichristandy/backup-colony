import React, { useEffect, useMemo, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Controller, EventType, useForm } from 'react-hook-form';
import { MdCheck, MdInfo, MdWarning } from 'react-icons/md';
import { ModalFooter } from '../../../Modal/ModalComponent';
import Button from '../../../Button/Button';

type Props = {
    items?: any
    isOpen?: boolean;
    onClose: () => void
}

type WatchProps = {
    value?: any | null
}

type WatchChangeProps = {
    name?: any | null;
    type?: EventType | any
}

const ManualForm = ({ items, isOpen, onClose }: Props) => {
    const [watchValue, setWatchValue] = useState<WatchProps | any>();
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
        defaultValues: useMemo(() => ({
            amount: null,
            discount: null,
            pinalty: null,
            remainingPayment: null
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
            <div className='mb-4 px-4'>
                <label className='mb-2.5 block font-medium text-black dark:text-white'>
                    Payment Amount
                    <span>*</span>
                </label>
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
                            id='amount'
                            value={value || ""}
                            thousandSeparator={true}
                            placeholder="IDR"
                            prefix={"IDR "}
                            className="w-full rounded-xl border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    )}
                    name="amount"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Payment amount is required."
                        }
                    }}
                />
                {errors?.amount && (
                    <div className="mt-1 text-xs flex items-center text-red-300">
                        <MdWarning className="w-4 h-4 mr-1" />
                        <span className="text-red-300">
                            {errors.amount.message}
                        </span>
                    </div>
                )}
            </div>

            <div className='w-full grid grid-cols-2 gap-2 mb-3'>
                <div className='w-full px-4'>
                    <label className='mb-2.5 block font-medium text-black dark:text-white'>
                        Discount
                        <span>*</span>
                    </label>
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='IDR'
                            className='w-full rounded-xl border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'

                        />
                    </div>
                </div>

                <div className='w-full px-4'>
                    <label className='mb-2.5 block font-medium text-black dark:text-white'>
                        Pinalty
                        <span>*</span>
                    </label>
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='IDR'
                            className='w-full rounded-xl border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'

                        />
                    </div>
                </div>
            </div>

            <div className='mb-4 px-4'>
                <label className='mb-2.5 block font-medium text-black dark:text-white'>
                    Remaining Payment
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
                                id='remainingPayment'
                                value={value || ""}
                                thousandSeparator={true}
                                placeholder="IDR"
                                prefix={"IDR "}
                                className="w-full rounded-xl border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        )}
                        name="remainingPayment"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Remaining payment is required."
                            }
                        }}
                    />
                    {errors?.remainingPayment && (
                        <div className="mt-1 text-xs flex items-center text-red-300">
                            <MdWarning className="w-4 h-4 mr-1" />
                            <span className="text-red-300">
                                {errors.remainingPayment.message}
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

export default ManualForm