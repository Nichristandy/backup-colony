import React, { Fragment, useEffect, useMemo, useState } from 'react'
import DefaultLayout from '../../../../components/Layouts/DefaultLayouts';
import { GetServerSideProps } from 'next';
import { getCookies } from 'cookies-next';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../../redux/Hook';
import { getAuthMe, selectAuth } from '../../../../redux/features/auth/authReducers';
import { ColumnDef } from '@tanstack/react-table';
import Button from '../../../../components/Button/Button';
import { MdAdd, MdArrowRightAlt, MdMonetizationOn, MdMoreHoriz, MdWork } from 'react-icons/md';
import SidebarComponent from '../../../../components/Layouts/Sidebar/SidebarComponent';
import { menuPayments } from '../../../../utils/routes';
import { SearchInput } from '../../../../components/Forms/SearchInput';
import DropdownSelect from '../../../../components/Dropdown/DropdownSelect';
import Modal from '../../../../components/Modal';
import { ModalFooter, ModalHeader } from '../../../../components/Modal/ModalComponent';
import moment from 'moment';
import SidebarBody from '../../../../components/Layouts/Sidebar/SidebarBody';
import SelectTables from '../../../../components/tables/layouts/SelectTables';
import { BillingProps, createBillingArr } from '../../../../components/tables/components/billingData';
import ManualForm from '../../../../components/Forms/Billings/Invoices/ManualForm';
import Cards from '../../../../components/Cards/Cards';
import { formatMoney } from '../../../../utils/useHooks/useFunction';

type Props = {
    pageProps: any
}

const sortOpt = [
    { value: "A-Z", label: "A-Z" },
    { value: "Z-A", label: "Z-A" },
];

const stylesSelectSort = {
    indicatorsContainer: (provided: any) => ({
        ...provided,
        flexDirection: "row-reverse"
    }),
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
        return ({
            ...provided,
            background: "",
            padding: '.6rem',
            borderRadius: ".75rem",
            borderColor: state.isFocused ? "#5F59F7" : "#E2E8F0",
            color: "#5F59F7",
            "&:hover": {
                color: state.isFocused ? "#E2E8F0" : "#5F59F7",
                borderColor: state.isFocused ? "#E2E8F0" : "#5F59F7"
            },
            minHeight: 40,
            flexDirection: "row-reverse"
        })
    },
    menuList: (provided: any) => (provided)
};

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
            padding: '.6rem',
            borderRadius: ".75rem",
            borderColor: state.isFocused ? "#5F59F7" : "#E2E8F0",
            color: "#5F59F7",
            "&:hover": {
                color: state.isFocused ? "#E2E8F0" : "#5F59F7",
                borderColor: state.isFocused ? "#E2E8F0" : "#5F59F7"
            },
            minHeight: 40,
            // flexDirection: "row-reverse"
        })
    },
    menuList: (provided: any) => (provided)
};

const Invoices = ({ pageProps }: Props) => {
    moment.locale("id")
    const router = useRouter();
    const { pathname, query } = router;

    // props
    const { token, access, firebaseToken } = pageProps;
    // redux
    const dispatch = useAppDispatch();
    const { data } = useAppSelector(selectAuth);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState(null);
    const [sort, setSort] = useState(false);
    const [loading, setLoading] = useState(true);
    // side-body
    const [sidebar, setSidebar] = useState(false);

    // data-table
    const [dataTable, setDataTable] = useState<BillingProps[]>([]);
    const [isSelectedRow, setIsSelectedRow] = useState({});
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pageCount, setPageCount] = useState(2000);
    const [total, setTotal] = useState(1000);

    // modal
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [details, setDetails] = useState<BillingProps>();

    // date
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    const [startDate, setStartDate] = useState<Date | null>(start);
    const [endDate, setEndDate] = useState<Date | null>(end);

    // date format
    const dateFormat = (value: string | any) => {
        if (!value) return "-";
        return moment(new Date(value)).format("MMM DD, YYYY")
    }

    // form modal
    const onClose = () => setIsOpenModal(false);
    const onOpen = () => setIsOpenModal(true);

    // detail modal
    const onCloseDetail = () => {
        setDetails(undefined)
        setSidebar(false)
    };
    const onOpenDetail = (items: any) => {
        setDetails(items)
        setSidebar(true)
    };

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
        setDataTable(() => createBillingArr(100))
    }, []);

    const goToTask = (id: any) => {
        if (!id) return;
        return router.push({ pathname: `/property/tasks/settings/team-members/${id}` })
    };

    const genWorkStatus = (value: string) => {
        if (!value) return "-";
        if (value === "Open") return <div className='w-full max-w-max p-1 rounded-lg text-xs text-center border border-meta-8 text-meta-8 bg-orange-200'>{value}</div>;
        if (value === "On Progress") return <div className='w-full max-w-max p-1 rounded-lg text-xs text-center border border-meta-8 text-meta-8 bg-orange-200'>{value}</div>;
        if (value === "Closed") return <div className='w-full max-w-max p-1 rounded-lg text-xs text-center border border-green-600 text-green-600 bg-green-200'>{value}</div>;
        if (value === "Overdue") return <div className='w-full max-w-max p-1 rounded-lg text-xs text-center border border-meta-1 text-meta-1 bg-red-200'>{value}</div>;
    };

    const genColorProjectType = (value: any) => {
        // #333A48
        let color = "";
        if (!value) return "";
        if (value == "Project") color = "#5E59CE";
        if (value == "Complaint Handling") color = "#FF8859";
        if (value == "Regular Task") color = "#38B7E3";
        if (value == "Maintenance") color = "#EC286F";
        return color;
    };

    const columns = useMemo<ColumnDef<BillingProps, any>[]>(() => [
        {
            accessorKey: 'billingName',
            header: (info) => (
                <div className='uppercase text-left'>Invoice ID</div>
            ),
            cell: ({ getValue, row }) => {
                let id = row?.original?.id
                let code = row?.original?.billingCode;
                return (
                    <div onClick={() => onOpenDetail(row?.original)} className='w-full flex flex-col cursor-pointer p-4 hover:cursor-pointer text-left'>
                        <div className='text-lg font-semibold text-primary'>{code}</div>
                        <div className='text-sm capitalize'>{getValue()}</div>
                    </div>
                )
            },
            footer: props => props.column.id,
            enableColumnFilter: false,
        },
        {
            accessorKey: 'billingCode',
            header: (info) => (
                <div className='uppercase'>Unit</div>
            ),
            cell: ({ getValue, row }) => {
                let id = row?.original?.id
                return (
                    <div onClick={() => onOpenDetail(row?.original)} className='w-full flex flex-col cursor-pointer p-4 hover:cursor-pointer'>
                        <div className='text-lg font-semibold text-primary'>{getValue()}</div>
                        <div className='text-sm'>Tower - 1 F</div>
                    </div>
                )
            },
            footer: props => props.column.id,
            enableColumnFilter: false,
        },
        {
            accessorKey: 'billingDescription',
            cell: ({ row, getValue }) => {
                return (
                    <div onClick={() => onOpenDetail(row?.original)} className='w-full text-sm text-gray-5 text-left p-4 hover:cursor-pointer'>
                        {/* {getValue().length > 70 ? `${getValue().substring(70, 0)}...` : getValue()} */}
                        <div className='font-semibold'>John Doe</div>
                        <div className=''>johndoe@email.com</div>
                    </div>
                )
            },
            header: props => (<div className='w-full text-left uppercase'>Owner</div>),
            footer: props => props.column.id,
            enableColumnFilter: false,
            size: 150
        },
        {
            accessorKey: 'totalBill',
            cell: ({ row, getValue }) => {
                const value = row?.original?.periodEnd
                return (
                    <div onClick={() => onOpenDetail(row?.original)} className='w-full text-sm p-4 text-right hover:cursor-pointer'>
                        {`IDR ${formatMoney({ amount: getValue() })}`}
                    </div>
                )
            },
            header: props => (<div className='w-full text-right uppercase'>Payment Amount</div>),
            footer: props => props.column.id,
            enableColumnFilter: false,
        },
    ], []);

    useEffect(() => {
        if (token) {
            dispatch(getAuthMe({ token, callback: () => router.push("/authentication?page=sign-in") }))
        }
    }, [token]);

    // console.log(dataTable, 'data table')
    console.log(details, 'data details');

    useEffect(() => {
        if (!sidebar) {
            setDetails(undefined)
        }
    }, [sidebar]);

    const Total = ({ detail }: any) => {
        // const {  } = detailVal;
        const subTotal = detail?.reduce(
            (acc: any, current: any) => acc + (Number(current?.amount) || 0),
            0
        );
        const totalTax = detail?.reduce(
            (acc: any, current: any) => acc + (Number(current?.tax) || 0),
            0
        );
        const totalDiscount = detail?.reduce(
            (acc: any, current: any) => acc + (Number(current?.discount) || 0),
            0
        );
        const total = detail?.reduce(
            (acc: any, current: any) => acc + (Number(current?.amount) || 0) + (Number(current?.tax) || 0) - (Number(current?.discount) || 0),
            0
        );

        console.log(detail, "data value")

        return (
            <Fragment>

                <div className='w-full border-b-2 border-gray p-4'>
                    <div className='w-full flex items-center justify-between gap-2'>
                        <div className='flex flex-col gap-2 text-gray-5'>
                            <h3>Sub Total</h3>
                            <h3>Tax</h3>
                            <h3>Discount</h3>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p>{`IDR ${formatMoney({ amount: (Number(subTotal) || 0) })}`}</p>
                            <p>{`IDR ${formatMoney({ amount: (Number(totalTax) || 0) })}`}</p>
                            <p>{`IDR ${formatMoney({ amount: (Number(totalDiscount) || 0) })}`}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center justify-between gap-2 p-4'>
                    <div className='flex flex-col gap-2 text-gray-5'>
                        <h3>Total</h3>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-lg'>{`IDR ${formatMoney({ amount: (Number(total) || 0) })}`}</p>
                    </div>
                </div>
            </Fragment>
        )
    }

    return (
        <DefaultLayout
            title="Colony"
            header="Billings & Payments"
            head="Draft"
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

                <div className="relative w-full bg-white lg:rounded-tl-[3rem] p-8 pt-0 2xl:p-10 2xl:pt-0 lg:overflow-y-hidden">
                    <div className='sticky bg-white top-0 z-50 py-6 w-full flex flex-col gap-2'>
                        {/* headers */}
                        <div className='w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2'>
                            <div className='w-full flex items-center justify-between py-3 lg:hidden'>
                                <button
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
                                    <div className='flex flex-col gap-1 items-start'>
                                        <h3 className='w-full lg:max-w-max text-center text-2xl font-semibold text-graydark'>Invoices</h3>
                                        <div className='flex items-center gap-3 font-semibold text-gray-5 tracking-wide'>
                                            <div>322 Overdue</div>
                                            <div>322 Ongoing</div>
                                            <div>32 Posted</div>
                                        </div>
                                    </div>
                                </Button>
                            </div>

                            <div className='w-full lg:max-w-max flex items-center justify-center gap-2 lg:ml-auto'>
                                <Button
                                    type="button"
                                    className='rounded-lg text-sm font-semibold py-3'
                                    onClick={() => router.push("/property/billings/invoices/form")}
                                    variant='primary'
                                >
                                    <span className='hidden lg:inline-block'>New Invoices</span>
                                    <MdAdd className='w-4 h-4' />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <main className='relative h-full lg:max-h-[700px] tracking-wide text-left text-boxdark-2 lg:overflow-auto'>
                        <div className='w-full h-full flex'>
                            <div className="w-full h-full flex flex-col overflow-auto gap-2.5 lg:gap-6 lg:overflow-y-auto">
                                {/* filters */}
                                <div className='w-full grid grid-cols-1 lg:grid-cols-5 gap-2.5 p-4'>
                                    <div className='w-full lg:col-span-3'>
                                        <SearchInput
                                            className='w-full text-sm rounded-xl'
                                            classNamePrefix=''
                                            filter={search}
                                            setFilter={setSearch}
                                            placeholder='Search...'
                                        />
                                    </div>
                                    <div className='w-full flex flex-col lg:flex-row items-center gap-2'>
                                        <DropdownSelect
                                            customStyles={stylesSelectSort}
                                            value={sort}
                                            onChange={setSort}
                                            error=""
                                            className='text-sm font-normal text-gray-5 w-full lg:w-2/10'
                                            classNamePrefix=""
                                            formatOptionLabel=""
                                            instanceId='1'
                                            isDisabled={false}
                                            isMulti={false}
                                            placeholder='Sorts...'
                                            options={sortOpt}
                                            icon='MdSort'
                                        />
                                    </div>
                                    <div className='w-full flex flex-col lg:flex-row items-center gap-2'>
                                        <DropdownSelect
                                            customStyles={stylesSelect}
                                            value={sort}
                                            onChange={setSort}
                                            error=""
                                            className='text-sm font-normal text-gray-5 w-full lg:w-2/10'
                                            classNamePrefix=""
                                            formatOptionLabel=""
                                            instanceId='1'
                                            isDisabled={false}
                                            isMulti={false}
                                            placeholder='All status...'
                                            options={sortOpt}
                                            icon=''
                                        />
                                    </div>
                                </div>
                                {/* table */}
                                <SelectTables
                                    loading={loading}
                                    setLoading={setLoading}
                                    pages={pages}
                                    setPages={setPages}
                                    limit={limit}
                                    setLimit={setLimit}
                                    pageCount={pageCount}
                                    columns={columns}
                                    dataTable={dataTable}
                                    total={total}
                                    setIsSelected={setIsSelectedRow}
                                    // isInfiniteScroll
                                    classTable="bg-gray p-4"
                                />
                            </div>

                            <SidebarBody
                                sidebarOpen={sidebar}
                                setSidebarOpen={setSidebar}
                            >
                                <div className="w-full h-full">
                                    <ModalHeader
                                        className='sticky top-0 bg-white border-b-2 border-gray p-4'
                                        isClose
                                        onClick={() => setSidebar(false)}
                                    >
                                        <div className='flex flex-col tracking-wide'>
                                            <h3 className='font-semibold text-primary'>{details?.billingCode}</h3>
                                            <p>{details?.billingName}</p>
                                        </div>
                                    </ModalHeader>
                                    <div className='w-full border-b-2 border-gray p-4'>
                                        <div className='w-full flex items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <h3>Status:</h3>
                                                <span className='px-4 py-2 rounded-lg bg-red-300 text-red-500 font-semibold'>{details?.billingStatus}</span>
                                            </div>
                                            <div>
                                                <Button
                                                    type="button"
                                                    className='rounded-lg text-sm font-semibold py-3'
                                                    onClick={onOpen}
                                                    variant='primary'
                                                >
                                                    <span className='inline-block'>Manual Payment</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-full border-b-2 border-gray p-4'>
                                        <div className='text-gray-5'>Tagihan</div>
                                        <div>
                                            <span>{`${details?.billingCode} - ${details?.billingName}`}</span>
                                        </div>
                                    </div>

                                    <div className='w-full border-b-2 border-gray p-4'>
                                        <div className='text-gray-5'>Periode</div>
                                        <p>{`${dateFormat(details?.periodStart)} - ${dateFormat(details?.periodEnd)}`}</p>
                                    </div>

                                    <div className='w-full border-b-2 border-gray p-4'>
                                        <div className='text-gray-5'>Owner</div>
                                        <div className='flex items-center gap-2'>
                                            <h3 className='text-base font-semibold'>John Doe</h3>
                                            <p>johndoe@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className='w-full border-b-2 border-gray p-4'>
                                        <div className='w-full flex items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <h3 className='text-gray-5'>Release Date:</h3>
                                                <p className=''>{dateFormat(details?.durationStart)}</p>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <h3 className='text-gray-5'>Due Date:</h3>
                                                <p className=''>{dateFormat(details?.durationEnd)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className='w-full border-b-2 border-gray p-4'>
                                        <div className='w-full flex items-center justify-between gap-2'>
                                            <div className='flex flex-col gap-2 text-gray-5'>
                                                <h3>Electricity</h3>
                                                <h3>Facility</h3>
                                                <h3>Water Supply</h3>
                                                <h3>Environment</h3>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <p>IDR 00.000.000</p>
                                                <p>IDR 00.000.000</p>
                                                <p>IDR 00.000.000</p>
                                                <p>IDR 00.000.000</p>
                                            </div>
                                        </div>
                                    </div> */}

                                    <Total detail={details?.billingTypes} />

                                    {/* payment */}
                                    <div className='w-full flex flex-col gap-2 p-4'>
                                        <h3 className='mb-2'>Payment</h3>
                                        <Cards className='w-full bg-gray p-4 flex items-center justify-between gap-2 text-sm'>
                                            <div className='flex flex-col gap-2 text-gray-5'>
                                                <h3 className='text-primary'>#333A48</h3>
                                                <h3>Payment with Gopay</h3>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <p>IDR 00.000.000</p>
                                                <p>00/00/0000</p>
                                            </div>
                                        </Cards>

                                        <Cards className='w-full bg-gray p-4 flex items-center justify-between gap-2 text-sm'>
                                            <div className='flex flex-col gap-2 text-gray-5'>
                                                <h3 className='text-primary'>#333A48</h3>
                                                <h3>Payment with Gopay</h3>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <p>IDR 00.000.000</p>
                                                <p>00/00/0000</p>
                                            </div>
                                        </Cards>
                                    </div>
                                </div>
                            </SidebarBody>
                        </div>
                    </main>
                </div>
            </div>

            {/* modal example */}
            <Modal
                size='small'
                onClose={onClose}
                isOpen={isOpenModal}
            >
                <Fragment>
                    <ModalHeader
                        className='p-4 mb-3'
                        isClose={true}
                        onClick={onClose}
                    >
                        <h3 className='text-lg font-semibold'>Manual Payment</h3>
                    </ModalHeader>
                    <ManualForm isOpen={isOpenModal} onClose={onClose} />
                </Fragment>
            </Modal>

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

export default Invoices;