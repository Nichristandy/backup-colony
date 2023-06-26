import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import DefaultLayout from '../../../../../../components/Layouts/DefaultLayouts';
import { GetServerSideProps } from 'next';
import { getCookies } from 'cookies-next';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/Hook';
import { getAuthMe, selectAuth } from '../../../../../../redux/features/auth/authReducers';
import { ColumnDef } from '@tanstack/react-table';
import Button from '../../../../../../components/Button/Button';
import { MdAdd, MdArrowRightAlt, MdCheck, MdChevronLeft, MdDelete, MdDownload, MdEdit, MdInfo, MdMonetizationOn, MdMoreHoriz, MdOutlineCalendarToday, MdSave, MdUploadFile, MdWarning, MdWork } from 'react-icons/md';
import SidebarComponent from '../../../../../../components/Layouts/Sidebar/SidebarComponent';
import { menuPayments, menuTask } from '../../../../../../utils/routes';
import { SearchInput } from '../../../../../../components/Forms/SearchInput';
import DropdownSelect from '../../../../../../components/Dropdown/DropdownSelect';
import Modal from '../../../../../../components/Modal';
import { ModalFooter, ModalHeader } from '../../../../../../components/Modal/ModalComponent';
import { DivisionProps, createDivisionArr } from '../../../../../../components/tables/components/taskData';
import moment from 'moment';
import CardTables from '../../../../../../components/tables/layouts/CardTables';
import Teams from '../../../../../../components/Task/Teams';
import DropdownDefault from '../../../../../../components/Dropdown/DropdownDefault';
import { CustomDateRangePicker } from '../../../../../../components/DatePicker/CustomDateRangePicker';
import SidebarMedia from '../../../../../../components/Layouts/Sidebar/Media';
import SidebarBody from '../../../../../../components/Layouts/Sidebar/SidebarBody';
import SelectTables from '../../../../../../components/tables/layouts/SelectTables';
import { BillingProps, createBillingArr } from '../../../../../../components/tables/components/billingData';
import ManualForm from '../../../../../../components/Forms/Billings/Invoices/ManualForm';
import Cards from '../../../../../../components/Cards/Cards';
import DatePicker from 'react-datepicker';
import { Control, Controller, FieldErrors, RegisterOptions, SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import CurrencyFormat from 'react-currency-format';
import { formatMoney } from '../../../../../../utils/useHooks/useFunction';

type Props = {
    pageProps: any
}

const discountOpt = [
    { type: "currency", value: "20000", label: "Promo IDR 20.000" },
    { type: "percent", value: "10", label: "Promo Mingguan 10%" },
    { type: "percent", value: "50", label: "Promo Lebaran 50%" },
    { type: "percent", value: "80", label: "Big Sale 80%" },
    { type: "percent", value: "100", label: "Gratis 100%" },
];

const taxOpt = [
    { type: "percent", value: "10", label: "PPH10" },
    { type: "percent", value: "12", label: "PPH12" },
    { type: "currency", value: "50000", label: "IDR 50.000" },
];

const stylesSelect = {
    indicatorSeparator: (provided: any) => ({
        ...provided,
        display: 'none'
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

type BillingTypeProps = {
    id?: any | null,
    billingTypeCode?: number | string | any | null,
    billingTypeName?: number | string | any | null,
    billingAmount?: number | string | any | null,
    discount?: any | null,
    discountAmount?: number | string | any | null,
    tax?: any | null,
    taxAmount?: number | string | any | null,
    total?: number | string | any | null
};

type FormValues = {
    id: number | string | any | null,
    billingCode: string | number | any | null,
    billingName: string | any | null,
    durationStart: any | null,
    durationEnd: any | null,
    periodStart: any | null,
    periodEnd: any | null,
    billingTypes: BillingTypeProps[],
    units: any | any[],
    billingDescription: string | null,
};

type FormStateProps = {
    error: FieldErrors,
    isValid: boolean
}

const TemplatesForm = ({ pageProps }: Props) => {
    moment.locale("id")
    const router = useRouter();
    const { pathname, query } = router;

    // props
    const { token, access, firebaseToken } = pageProps;
    // redux
    const dispatch = useAppDispatch();
    const { data } = useAppSelector(selectAuth);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    // modal
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [details, setDetails] = useState<DivisionProps>();

    // form
    const [isCode, setIsCode] = useState<boolean>(false);
    const [isTitle, setIsTitle] = useState<boolean>(false);

    const [watchValue, setWatchValue] = useState<FormValues | any>()
    const [watchChange, setWatchChange] = useState<any | null>(null)

    // form
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
            billingCode: null,
            billingName: null,
            durationStart: null,
            durationEnd: null,
            periodStart: null,
            periodEnd: null,
            billingDescription: null,
            billingTypes: [{
                id: null,
                billingTypeCode: "",
                billingTypeName: "",
                billingAmount: null,
                discount: null,
                discountAmount: null,
                tax: null,
                taxAmount: null,
                total: null
            }],
            units: []
        }), [])
    });

    const { fields, remove, replace, append } = useFieldArray({ control, name: "billingTypes" });

    useEffect(() => {
        const subscription = watch((value, { name, type }): any => {
            if (value) {
                setWatchValue(value)
                setWatchChange({ name, type })
            }
        }
        );
        return () => subscription.unsubscribe();
    }, [watch]);

    const formValues = useWatch({
        name: "billingTypes",
        control
    });

    const addNewCols = () => {
        append({
            id: "",
            billingTypeCode: "",
            billingTypeName: "",
            billingAmount: null,
            discount: null,
            discountAmount: null,
            tax: null,
            taxAmount: null,
            total: null
        })
    };

    useEffect(() => {
        // console.log(formValues, "watchChange")
        if (formValues?.length > 0) {
            formValues.map((value, index) => {
                let billingAmount = watchChange?.name === `billingTypes.${index}.billingAmount`;
                let discount = watchChange?.name === `billingTypes.${index}.discount`;
                let tax = watchChange?.name === `billingTypes.${index}.tax`;
                let discountAmount = watchChange?.name === `billingTypes.${index}.discountAmount`;
                let taxAmount = watchChange?.name === `billingTypes.${index}.taxAmount`;

                let totalDiscount = value?.discount?.type == "percent" ? ((Number(value.billingAmount) || 0) * ((Number(value?.discount?.value) || 0) / 100)) : (Number(value?.discount?.value) || 0);
                let totalTax = value?.tax?.type == "percent" ? ((Number(value.billingAmount) || 0) * ((Number(value?.tax?.value) || 0) / 100)) : (Number(value?.tax?.value) || 0);
                let total = (Number(value.billingAmount) || 0) + (Number(value?.taxAmount) || 0) - ((Number(value?.discountAmount) || 0));

                if (discount) setValue(`billingTypes.${index}.discountAmount`, totalDiscount)
                if (tax) setValue(`billingTypes.${index}.taxAmount`, totalTax)
                if (billingAmount || discountAmount || taxAmount) setValue(`billingTypes.${index}.total`, total)
                if (total < 0) {
                    setError(`billingTypes.${index}.total`, {
                        type: "validate",
                        message: "Your Payment is not enough."
                    })
                } else {
                    clearErrors(`billingTypes.${index}.total`);
                }
            })
        }
        // setValue("billingTypes", newBill)
        // console.log(watchValue?.billingTypes, 'hasil')
    }, [formValues, watchChange?.name])

    const onSubmit: SubmitHandler<FormValues> = (value) => {
        console.log(value, 'event form')
    }

    // date format
    const dateFormat = (value: string | any) => {
        if (!value) return "-";
        return moment(new Date(value)).format("MMM DD, YYYY, HH:mm")
    }

    // form modal
    const onClose = () => setIsOpenModal(false);
    const onOpen = () => setIsOpenModal(true);

    // detail modal
    const onCloseDetail = () => {
        setDetails(undefined)
        setIsOpenDetail(false)
    };
    const onOpenDetail = (items: any) => {
        setDetails(items)
        setIsOpenDetail(true)
    };

    console.log(errors, 'error form')
    // console.log(watchValue?.billingTypes, 'watch')

    // detail modal
    const onCloseDelete = () => {
        setDetails(undefined)
        setIsOpenDelete(false)
    };
    const onOpenDelete = (items: any) => {
        setDetails(items)
        setIsOpenDelete(true)
    };

    useEffect(() => {
        if (token) {
            dispatch(getAuthMe({ token, callback: () => router.push("/authentication?page=sign-in") }))
        }
    }, [token]);

    console.log(watchValue, 'data table')
    const descriptionValue = useWatch({
        name: "billingDescription",
        control
    });

    const Total = ({ control }: { control: Control<FormValues> }) => {
        const subTotal = formValues.reduce(
            (acc, current) => acc + (Number(current.billingAmount) || 0),
            0
        );
        const totalTax = formValues.reduce(
            (acc, current) => acc + (Number(current.taxAmount) || 0),
            0
        );
        const totalDiscount = formValues.reduce(
            (acc, current) => acc + (Number(current.discountAmount) || 0),
            0
        );
        const total = formValues.reduce(
            (acc, current) => acc + (Number(current.billingAmount) || 0) + (Number(current.taxAmount) || 0) - (Number(current.discountAmount) || 0),
            0
        );
        return (
            <div className='w-full col-span-1'>
                <div className="grid grid-cols-2 gap-2">
                    <div className='w-full flex flex-col gap-4 text-gray-5 text-left'>
                        <div>Subtotal</div>
                        <div>Tax</div>
                        <div>Discount</div>
                        <div>Total</div>
                    </div>
                    <div className='w-full flex flex-col gap-4 text-right'>
                        <div className=''>IDR {formatMoney({ amount: subTotal })}</div>
                        <div className=''>IDR {formatMoney({ amount: totalTax })}</div>
                        <div className=''>IDR {formatMoney({ amount: totalDiscount })}</div>
                        <div className='text-lg font-semibold'>IDR {formatMoney({ amount: total })}</div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <DefaultLayout
            title="Colony"
            header="Billings & Payments"
            head="Templates"
            logo="../../../../image/logo/logo-icon.svg"
            images="../../../../image/logo/building-logo.svg"
            userDefault="../../../../image/user/user-01.png"
            description=""
            token={token}
            icons={{
                icon: MdMonetizationOn,
                className: "w-8 h-8 text-meta-3"
            }}
        >
            <div className='absolute inset-0 mt-20 z-20 bg-boxdark flex text-white'>
                <SidebarComponent menus={menuPayments} sidebar={sidebarOpen} setSidebar={setSidebarOpen} />

                <form onSubmit={handleSubmit(onSubmit)} className="relative w-full bg-white lg:rounded-tl-[3rem] p-8 pt-0 2xl:p-10 2xl:pt-0 lg:overflow-y-hidden text-sm">
                    <div className='sticky bg-white top-0 z-50 py-6 w-full flex flex-col gap-2'>
                        {/* headers */}
                        <div className='w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 border-b-2 border-gray'>
                            <div className='w-full flex items-center justify-between py-3 lg:hidden'>
                                <button
                                    type='button'
                                    aria-controls='sidebar'
                                    aria-expanded={sidebarOpen}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setSidebarOpen(!sidebarOpen)
                                    }}
                                    className='rounded-sm border p-1.5 shadow-sm border-strokedark bg-boxdark lg:hidden'
                                >
                                    <MdArrowRightAlt className={`w-5 h-5 delay-700 ease-in-out ${sidebarOpen ? "rotate-180" : ""}`} />
                                </button>
                            </div>

                            <div className='w-full max-w-max flex gap-2 items-center mx-auto lg:mx-0'>
                                <Button
                                    type="button"
                                    className='rounded-lg text-sm font-semibold py-3 border-0 gap-2.5'
                                    onClick={() => router.back()}
                                    variant='secondary-outline'
                                    key={'1'}
                                >
                                    <MdChevronLeft className='w-5 h-5' />
                                    <div className='flex flex-col gap-1 items-start'>
                                        <h3 className='w-full lg:max-w-max text-center text-2xl font-semibold text-graydark'>New Templates</h3>
                                    </div>
                                </Button>
                            </div>

                            <div className='w-full lg:max-w-max flex items-center justify-center gap-2 lg:ml-auto'>
                                <Button
                                    type="button"
                                    className='rounded-lg text-sm font-semibold py-3'
                                    onClick={onOpen}
                                    variant='danger'
                                >
                                    <MdDelete className='w-4 h-4' />
                                    <span className='hidden lg:inline-block'>Discard Template</span>
                                </Button>
                                <Button
                                    type="button"
                                    className='rounded-lg text-sm font-semibold py-3'
                                    onClick={handleSubmit(onSubmit)}
                                    variant='primary-outline'
                                >
                                    <span className='hidden lg:inline-block'>Export Excel</span>
                                    <MdDownload className='w-4 h-4' />
                                </Button>
                                <Button
                                    type="button"
                                    className='rounded-lg text-sm font-semibold py-3'
                                    onClick={handleSubmit(onSubmit)}
                                    variant='primary'
                                >
                                    <span className='hidden lg:inline-block'>Save</span>
                                    <MdSave className='w-4 h-4' />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <main className='relative h-full lg:max-h-[700px] tracking-wide text-left text-boxdark-2 lg:overflow-auto'>
                        <div className='w-full h-full flex'>
                            <div className="w-full h-full flex flex-col overflow-auto gap-2.5 lg:gap-6 lg:overflow-y-auto">
                                {/* form */}
                                <Cards
                                    className='w-full grid col-span-1 lg:grid-cols-2 items-center gap-2 mb-5'
                                >
                                    <div className='w-full max-w-max flex items-center gap-2'>
                                        <div className='relative'>
                                            <span className='absolute left-1 top-3.5 cursor-pointer text-primary'>#</span>
                                            <input
                                                type='text'
                                                placeholder='Invoice code...'
                                                autoFocus
                                                className={`w-full max-w-45 text-lg text-primary rounded-lg border border-stroke bg-transparent py-3 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary disabled:border-0 disabled:bg-transparent`}
                                                {...register("billingCode")}
                                                disabled={!isCode}
                                                onBlur={() => setIsCode(false)}
                                            />
                                            <span className='absolute right-5 top-4 cursor-pointer'>
                                                <MdEdit onClick={() => setIsCode(e => !e)} className='w-6 h-6 fill-current text-primary opacity-80' />
                                            </span>
                                            {errors?.billingCode && (
                                                <div className="mt-1 text-xs flex items-center text-red-300">
                                                    <MdWarning className="w-4 h-4 mr-1" />
                                                    <span className="text-red-300">
                                                        {errors.billingCode.message as any}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className='border-r-2 border-gray h-14'></div>

                                        <div className='relative'>
                                            <input
                                                type='text'
                                                placeholder='Monthly bill...'
                                                autoFocus
                                                className={`w-full max-w-45 text-lg text-primary rounded-lg border border-stroke bg-transparent py-3 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary disabled:border-0 disabled:bg-transparent`}
                                                {...register("billingName")}
                                                disabled={!isTitle}
                                                onBlur={() => setIsTitle(false)}
                                            />

                                            <span className='absolute right-4 top-4 cursor-pointer'>
                                                <MdEdit onClick={() => setIsTitle(e => !e)} className='w-6 h-6 fill-current text-primary opacity-80' />
                                            </span>
                                            {errors?.billingName && (
                                                <div className="mt-1 text-xs flex items-center text-red-300">
                                                    <MdWarning className="w-4 h-4 mr-1" />
                                                    <span className="text-red-300">
                                                        {errors?.billingName?.message as any}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Cards>

                                <div className='w-full grid col-span-1 lg:grid-cols-2 gap-4'>
                                    <Cards
                                        className="w-full grid grid-cols-2 gap-2 bg-gray p-4 rounded-xl"
                                    >
                                        <div className='w-full'>
                                            <span className='mb-2.5 block font-medium text-black dark:text-white'>Start Period:</span>
                                            <label className='w-full text-gray-5 overflow-hidden'>
                                                <div className='relative'>
                                                    <MdOutlineCalendarToday className='absolute left-4 top-2.5 h-6 w-6 text-gray-5 z-1' />
                                                    <Controller
                                                        render={({
                                                            field: { onChange, onBlur, value, name, ref },
                                                            fieldState: { invalid, isTouched, isDirty, error },
                                                        }) => (
                                                            <DatePicker
                                                                selected={value}
                                                                onChange={onChange}
                                                                selectsStart
                                                                startDate={value}
                                                                endDate={watchValue?.periodEnd}
                                                                dropdownMode="select"
                                                                peekNextMonth
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                isClearable
                                                                placeholderText='00/00/0000'
                                                                className='text-sm lg:text-md w-full text-gray-5 rounded-lg border border-stroke bg-white py-3 pl-10 pr-8 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                            />
                                                        )}
                                                        name="periodStart"
                                                        control={control}
                                                        rules={{
                                                            required: {
                                                                value: true,
                                                                message: "Start Period is required.",
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </label>
                                            {errors?.periodStart && (
                                                <div className="mt-1 text-xs flex items-center text-red-300">
                                                    <MdWarning className="w-4 h-4 mr-1" />
                                                    <span className="text-red-300">
                                                        {errors.periodStart.message as any}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className='w-full'>
                                            <span className='mb-2.5 block font-medium text-black dark:text-white'>End Period:</span>
                                            <label className='w-full text-gray-5 overflow-hidden'>
                                                <div className='relative'>
                                                    <MdOutlineCalendarToday className='absolute left-4 top-2.5 h-6 w-6 text-gray-5 z-1' />
                                                    <Controller
                                                        render={({
                                                            field: { onChange, onBlur, value, name, ref },
                                                            fieldState: { invalid, isTouched, isDirty, error },
                                                        }) => (
                                                            <DatePicker
                                                                selected={value}
                                                                onChange={onChange}
                                                                selectsEnd
                                                                startDate={watchValue?.periodStart}
                                                                endDate={value}
                                                                minDate={watchValue?.periodStart}
                                                                dropdownMode="select"
                                                                peekNextMonth
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                isClearable
                                                                placeholderText='00/00/0000'
                                                                className='text-sm lg:text-md w-full text-gray-5 rounded-lg border border-stroke bg-white py-3 pl-10 pr-6 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                            />
                                                        )}
                                                        name="periodEnd"
                                                        control={control}
                                                        rules={{
                                                            required: {
                                                                value: true,
                                                                message: "End Period is required.",
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </label>
                                            {errors?.periodEnd && (
                                                <div className="mt-1 text-xs flex items-center text-red-300">
                                                    <MdWarning className="w-4 h-4 mr-1" />
                                                    <span className="text-red-300">
                                                        {errors.periodEnd.message as any}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </Cards>
                                    <Cards
                                        className="w-full grid grid-cols-2 gap-2 bg-gray p-4 rounded-xl"
                                    >
                                        <div className='w-full'>
                                            <span className='mb-2.5 block font-medium text-black dark:text-white'>Release Date:</span>
                                            <label className='w-full text-gray-5 overflow-hidden'>
                                                <div className='relative'>
                                                    <MdOutlineCalendarToday className='absolute left-4 top-2.5 h-6 w-6 text-gray-5 z-1' />
                                                    <Controller
                                                        render={({
                                                            field: { onChange, onBlur, value, name, ref },
                                                            fieldState: { invalid, isTouched, isDirty, error },
                                                        }) => (
                                                            <DatePicker
                                                                selected={value}
                                                                onChange={onChange}
                                                                selectsStart
                                                                startDate={value}
                                                                endDate={watchValue?.durationEnd}
                                                                dropdownMode="select"
                                                                peekNextMonth
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                isClearable
                                                                placeholderText='00/00/0000'
                                                                className='text-sm lg:text-md w-full text-gray-5 rounded-lg border border-stroke bg-white py-3 pl-10 pr-8 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                            />
                                                        )}
                                                        name="durationStart"
                                                        control={control}
                                                        rules={{
                                                            required: {
                                                                value: true,
                                                                message: "Start Date is required.",
                                                            },
                                                            validate: (value) => value >= watchValue?.periodStart || "Start Date must be smaller than Start Periode"
                                                        }}
                                                    />
                                                </div>
                                            </label>
                                            {errors?.durationStart && (
                                                <div className="mt-1 text-xs flex items-center text-red-300">
                                                    <MdWarning className="w-4 h-4 mr-1" />
                                                    <span className="text-red-300">
                                                        {errors.durationStart.message as any}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className='w-full'>
                                            <span className='mb-2.5 block font-medium text-black dark:text-white'>Due Date:</span>
                                            <label className='w-full text-gray-5 overflow-hidden'>
                                                <div className='relative'>
                                                    <MdOutlineCalendarToday className='absolute left-4 top-2.5 h-6 w-6 text-gray-5 z-1' />
                                                    <Controller
                                                        render={({
                                                            field: { onChange, onBlur, value, name, ref },
                                                            fieldState: { invalid, isTouched, isDirty, error },
                                                        }) => (
                                                            <DatePicker
                                                                selected={value}
                                                                onChange={onChange}
                                                                selectsEnd
                                                                startDate={watchValue?.durationStart}
                                                                endDate={value}
                                                                minDate={watchValue?.durationStart}
                                                                dropdownMode="select"
                                                                peekNextMonth
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                isClearable
                                                                placeholderText='00/00/0000'
                                                                className='text-sm lg:text-md w-full text-gray-5 rounded-lg border border-stroke bg-white py-3 pl-10 pr-6 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                            />
                                                        )}
                                                        name="durationEnd"
                                                        control={control}
                                                        rules={{
                                                            required: {
                                                                value: true,
                                                                message: "Due Date is required.",
                                                            },
                                                            validate: (value) => value <= watchValue?.periodEnd || "End Date must be smaller than End Periode"
                                                        }}
                                                    />
                                                </div>
                                            </label>
                                            {errors?.durationEnd && (
                                                <div className="mt-1 text-xs flex items-center text-red-300">
                                                    <MdWarning className="w-4 h-4 mr-1" />
                                                    <span className="text-red-300">
                                                        {errors.durationEnd.message as any}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </Cards>
                                </div>
                                <Cards
                                    className="w-full flex flex-col gap-4 bg-gray p-4 rounded-xl"
                                >
                                    {fields?.length > 0 ?
                                        fields?.map((field, index) => {
                                            return (
                                                <div key={field.id} className='w-full flex flex-col gap-2'>
                                                    <div className='grid col-span-2 sm:grid-cols-4 lg:grid-cols-8 gap-2'>
                                                        <div className='mb-2.5 hidden lg:block font-medium text-black dark:text-white'>
                                                            Payment for *
                                                        </div>
                                                        <div className='mb-2.5 hidden lg:block font-medium text-black dark:text-white'>
                                                            Amount for *
                                                        </div>
                                                        <div className='mb-2.5 hidden lg:block font-medium text-black dark:text-white'>
                                                            Discount
                                                        </div>
                                                        <div className='mb-2.5 hidden lg:block font-medium text-black dark:text-white'>
                                                            Disc. Amount
                                                        </div>
                                                        <div className='mb-2.5 hidden lg:block font-medium text-black dark:text-white'>
                                                            Tax *
                                                        </div>
                                                        <div className='mb-2.5 hidden lg:block font-medium text-black dark:text-white'>
                                                            Tax Amount *
                                                        </div>
                                                        <div className='mb-2.5 hidden lg:block font-medium text-black dark:text-white'>
                                                            Total *
                                                        </div>
                                                    </div>

                                                    <div className='grid col-span-2 sm:grid-cols-4 lg:grid-cols-8 gap-2'>
                                                        <div className='w-full'>
                                                            <label htmlFor='' className='mb-2.5 block lg:hidden font-medium text-black dark:text-white'>
                                                                Payment for *
                                                            </label>
                                                            <div className='relative'>
                                                                <input
                                                                    type='text'
                                                                    autoFocus
                                                                    placeholder='Payments...'
                                                                    className='w-full rounded-lg border border-stroke bg-white py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                                    {...register(`billingTypes.${index}.billingTypeName` as const, {
                                                                        required: {
                                                                            value: true,
                                                                            message: "Billing Type Name is required.",
                                                                        }
                                                                    })}
                                                                />
                                                                {errors?.billingTypes?.[index]?.billingTypeName && (
                                                                    <div className="mt-1 text-xs flex items-center text-red-300">
                                                                        <span className="text-red-300">
                                                                            {errors?.billingTypes?.[index]?.billingTypeName?.message as any}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className='w-full'>
                                                            <label htmlFor='amount' className='mb-2.5 block lg:hidden font-medium text-black dark:text-white'>
                                                                Amount *
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
                                                                            id='amount'
                                                                            value={value || ""}
                                                                            thousandSeparator={true}
                                                                            placeholder="IDR"
                                                                            prefix={"IDR "}
                                                                            className="w-full rounded-lg border border-stroke bg-white py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                                        />
                                                                    )}
                                                                    name={`billingTypes.${index}.billingAmount`}
                                                                    control={control}
                                                                    rules={{
                                                                        required: {
                                                                            value: true,
                                                                            message: "Amount is required."
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                            {errors?.billingTypes?.[index]?.billingAmount && (
                                                                <div className="mt-1 text-xs flex items-center text-red-300">
                                                                    <span className="text-red-300">
                                                                        {errors?.billingTypes?.[index]?.billingAmount?.message as any}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className='w-full'>
                                                            <label htmlFor='' className='mb-2.5 block lg:hidden font-medium text-black dark:text-white'>
                                                                Discount
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
                                                                            instanceId='1'
                                                                            isDisabled={false}
                                                                            isMulti={false}
                                                                            placeholder='Discount...'
                                                                            options={discountOpt}
                                                                            icon=''
                                                                        />
                                                                    )}
                                                                    name={`billingTypes.${index}.discount`}
                                                                    control={control}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='w-full'>
                                                            <label htmlFor='discAmount' className='mb-2.5 block lg:hidden font-medium text-black dark:text-white'>
                                                                Disc. Amount
                                                            </label>
                                                            <div className='relative'>
                                                                <Controller
                                                                    render={({
                                                                        field: { onChange, onBlur, value, name, ref },
                                                                        fieldState: { invalid, isTouched, isDirty, error }
                                                                    }) => (
                                                                        <CurrencyFormat
                                                                            onValueChange={(values) => {
                                                                                const { value } = values
                                                                                onChange(value);
                                                                            }}
                                                                            id='discAmount'
                                                                            value={value || ""}
                                                                            onBlur={onBlur}
                                                                            thousandSeparator={true}
                                                                            placeholder="IDR"
                                                                            prefix={"IDR "}
                                                                            className="w-full rounded-lg border border-stroke bg-white py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                                        />
                                                                    )}
                                                                    name={`billingTypes.${index}.discountAmount`}
                                                                    control={control}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='w-full'>
                                                            <label htmlFor='' className='mb-2.5 block lg:hidden font-medium text-black dark:text-white'>
                                                                Tax *
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
                                                                            instanceId='1'
                                                                            isDisabled={false}
                                                                            isMulti={false}
                                                                            placeholder='Tax...'
                                                                            options={taxOpt}
                                                                            icon=''
                                                                        />
                                                                    )}
                                                                    name={`billingTypes.${index}.tax`}
                                                                    control={control}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='w-full'>
                                                            <label htmlFor='taxAmount' className='mb-2.5 block lg:hidden font-medium text-black dark:text-white'>
                                                                Tax Amount *
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
                                                                            id='taxAmount'
                                                                            value={value || ""}
                                                                            thousandSeparator={true}
                                                                            placeholder="IDR"
                                                                            prefix={"IDR "}
                                                                            className="w-full rounded-lg border border-stroke bg-white py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                                        />
                                                                    )}
                                                                    name={`billingTypes.${index}.taxAmount`}
                                                                    control={control}
                                                                    rules={{
                                                                        required: {
                                                                            value: true,
                                                                            message: "Tax Amount is required."
                                                                        }
                                                                    }}
                                                                />

                                                                {errors?.billingTypes?.[index]?.taxAmount && (
                                                                    <div className="mt-1 text-xs flex items-center text-red-300">
                                                                        <span className="text-red-300">
                                                                            {errors?.billingTypes?.[index]?.taxAmount?.message as any}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className='w-full'>
                                                            <label htmlFor='total' className='mb-2.5 block lg:hidden font-medium text-black dark:text-white'>
                                                                Total
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
                                                                            className="w-full rounded-lg border border-stroke bg-white py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                                        />
                                                                    )}
                                                                    name={`billingTypes.${index}.total`}
                                                                    control={control}
                                                                    rules={{
                                                                        required: {
                                                                            value: true,
                                                                            message: "Total is required."
                                                                        }
                                                                    }}
                                                                />

                                                                {errors?.billingTypes?.[index]?.total && (
                                                                    <div className="mt-1 text-xs flex items-center text-red-300">
                                                                        <span className="text-red-300">
                                                                            {errors?.billingTypes?.[index]?.total?.message as any}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className='w-full flex'>
                                                            <Button
                                                                type="button"
                                                                className="w-full lg:max-w-max bg-white lg:mx-auto mb-auto rounded-lg inline-block"
                                                                onClick={() => remove(index)}
                                                            >
                                                                <MdDelete className='w-5 h-5' />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        : null}
                                    <div className="w-full">
                                        <Button
                                            type="button"
                                            variant="primary"
                                            className="rounded-lg"
                                            onClick={addNewCols}
                                        >
                                            <span>Add Row</span>
                                            <MdAdd className='w-4 h-4' />
                                        </Button>
                                    </div>

                                    <div className="border-b-2 border-gray-4 w-full my-4"></div>

                                    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
                                        <div className='w-full lg:col-span-1'>
                                            <label htmlFor='' className='mb-2.5 block lg:hidden font-medium text-black dark:text-white'>
                                                Notes
                                            </label>
                                            <div className='relative'>
                                                <textarea
                                                    cols={0.5}
                                                    rows={5}
                                                    maxLength={400}
                                                    autoFocus
                                                    placeholder=''
                                                    className='w-full rounded-lg border border-stroke bg-white py-2 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                    {...register("billingDescription")}
                                                />
                                                <div className="mt-1 text-xs flex items-center">
                                                    <span className="text-graydark">
                                                        {descriptionValue?.length || 0} / 400 characters.
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div></div>
                                        <Total control={control} />
                                    </div>
                                </Cards>
                            </div>
                        </div>
                    </main>
                </form>
            </div>

            {/* delete modal */}
            <Modal
                size='small'
                onClose={onCloseDelete}
                isOpen={isOpenDelete}
            >
                <Fragment>
                    <ModalHeader
                        className='p-4 border-b-2 border-gray mb-3'
                        isClose={true}
                        onClick={onCloseDelete}
                    >
                        <h3 className='text-lg font-semibold'>Delete Tenant</h3>
                    </ModalHeader>
                    <div className='w-full my-5 px-4'>
                        <h3>Are you sure to delete tenant data ?</h3>
                    </div>

                    <ModalFooter
                        className='p-4 border-t-2 border-gray'
                        isClose={true}
                        onClick={onCloseDelete}
                    >
                        <Button
                            variant="primary"
                            className="rounded-md text-sm"
                            type="button"
                            onClick={onCloseDelete}
                        >
                            Yes, Delete it!
                        </Button>
                    </ModalFooter>
                </Fragment>
            </Modal>
        </DefaultLayout>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Parse cookies from the request headers
    const cookies = getCookies(context)

    // Access cookies using the cookie name
    const token = cookies['accessToken'] || null;
    const access = cookies['access'] || null;
    const firebaseToken = cookies['firebaseToken'] || null;

    if (!token) {
        return {
            redirect: {
                destination: "/authentication?page=sign-in", // Redirect to the home page
                permanent: false
            },
        };
    }

    return {
        props: { token, access, firebaseToken },
    };
};

export default TemplatesForm;