import React, { Fragment, ReactNode, useEffect, useMemo, useState } from 'react'
import DefaultLayout from '../../../../components/Layouts/DefaultLayouts'
import SidebarBM from '../../../../components/Layouts/Sidebar/Building-Management';
import { MdAdd, MdArrowRightAlt, MdCalendarToday, MdChevronLeft, MdCleaningServices, MdClose, MdDashboard, MdDelete, MdEdit, MdEmail, MdFemale, MdLocalHotel, MdMale, MdPhone, MdPhotoSizeSelectActual } from 'react-icons/md';
import Button from '../../../../components/Button/Button';
import { SearchInput } from '../../../../components/Forms/SearchInput';
import Modal from '../../../../components/Modal';

import { ModalFooter, ModalHeader } from '../../../../components/Modal/ModalComponent';
import { useRouter } from 'next/router';
import DropdownSelect from '../../../../components/Dropdown/DropdownSelect';
import { ColumnDef } from '@tanstack/react-table';
import { ColumnItems } from '../../../../components/tables/components/makeData';
import { makeData } from '../../../../components/tables/components/makeData';
import { GetServerSideProps } from 'next';
import { getCookies } from 'cookies-next';
import { useAppDispatch, useAppSelector } from '../../../../redux/Hook';
import { getAuthMe, selectAuth } from '../../../../redux/features/auth/authReducers';
import SelectTables from '../../../../components/tables/layouts/SelectTables';
import { IndeterminateCheckbox } from '../../../../components/tables/components/TableComponent';
import Link from 'next/link';
import ActiveLink from '../../../../components/Layouts/ActiveLink';
import Navbar from '../../../../components/Layouts/Header/Navbar';
import NavbarMedia from '../../../../components/Media/NavbarMedia';

type Props = {
    pageProps: any
}

const sortOpt = [
    { value: "A-Z", label: "A-Z" },
    { value: "Z-A", label: "Z-A" },
];

const stylesSelect = {
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
        console.log(provided, "control")
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

const stylesSelectCat = {
    indicatorsContainer: (provided: any) => ({
        ...provided,
        flexDirection: ""
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
        console.log(provided, "control")
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

const Articles = ({ pageProps }: Props) => {
    const router = useRouter();
    const { pathname, query } = router;

    // props
    const { token, access, firebaseToken } = pageProps;
    // redux
    const dispatch = useAppDispatch();
    const { data } = useAppSelector(selectAuth);

    const [search, setSearch] = useState(null);
    const [sort, setSort] = useState(false);
    const [loading, setLoading] = useState(true);

    // data-table
    const [dataTable, setDataTable] = useState<ColumnItems[]>([]);
    const [isSelectedRow, setIsSelectedRow] = useState({});
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pageCount, setPageCount] = useState(2000);
    const [total, setTotal] = useState(1000)

    // modal
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [details, setDetails] = useState<ColumnItems>();

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
        setDataTable(() => makeData(50000))
    }, []);

    const columns = useMemo<ColumnDef<ColumnItems, any>[]>(
        () => [
            // {
            //     id: 'select',
            //     header: ({ table }) => {
            //         return (
            //             <IndeterminateCheckbox
            //                 {...{
            //                     checked: table?.getIsAllRowsSelected(),
            //                     indeterminate: table?.getIsSomeRowsSelected(),
            //                     onChange: table?.getToggleAllRowsSelectedHandler()
            //                 }}
            //             />
            //         )
            //     },
            //     cell: ({ row }) => (
            //         <div className="px-1">
            //             <IndeterminateCheckbox
            //                 {...{
            //                     checked: row.getIsSelected(),
            //                     disabled: !row.getCanSelect(),
            //                     indeterminate: row.getIsSomeSelected(),
            //                     onChange: row.getToggleSelectedHandler()
            //                 }}
            //             />
            //         </div>
            //     ),
            //     size: 10,
            //     minSize: 10
            // },
            {
                accessorKey: 'fullName',
                header: (info) => (
                    <div>
                        Zone Name
                    </div>
                ),
                cell: info => {
                    return (
                        <div className='cursor-pointer' onClick={() => onOpenDetail(info.row.original)}>
                            {info.getValue()}
                        </div>
                    )
                },
                footer: props => props.column.id,
                // enableSorting: false,
                enableColumnFilter: false,
                size: 10,
                minSize: 10
            },
            {
                accessorKey: 'email',
                header: (info) => "Description",
                cell: info => {
                    console.log(info.row.original, 'row item')
                    return (
                        <div className='cursor-pointer' onClick={() => onOpenDetail(info.row.original)}>
                            {info.getValue()}
                        </div>
                    )
                },
                footer: props => props.column.id,
                enableColumnFilter: false,
            },
            {
                accessorKey: 'phoneNumber',
                header: (info) => "Units",
                cell: info => {
                    return (
                        <div className='cursor-pointer' onClick={() => onOpenDetail(info.row.original)}>
                            {info.getValue()}
                        </div>
                    )
                },
                footer: props => props.column.id,
                enableColumnFilter: false,
            },
            {
                accessorKey: 'owned',
                cell: info => {
                    return (
                        <div className='cursor-pointer text-center' onClick={() => onOpenDetail(info.row.original)}>
                            {info.getValue()}
                        </div>
                    )
                },
                header: props => (<div className='w-full text-center'>Total Unit</div>),
                footer: props => props.column.id,
                enableColumnFilter: false,
            },
            {
                accessorKey: 'id',
                cell: ({ row, getValue }) => {
                    return (
                        <div className='w-full text-center flex items-center justify-center cursor-pointer'>
                            <Button
                                onClick={() => onOpen()}
                                variant="secondary-outline-none"
                                className="px-1 py-1"
                                type="button"
                            >
                                <MdEdit className='text-gray-5 w-4 h-4' />
                            </Button>
                            {/* <Button
                                onClick={() => onOpenDelete(row.original)}
                                variant="secondary-outline-none"
                                className="px-1 py-1"
                                type="button"
                            >
                                <MdDelete className='text-gray-5 w-4 h-4' />
                            </Button> */}
                        </div>
                    )
                },
                header: props => (<div className='w-full text-center'>Actions</div>),
                footer: props => props.column.id,
                // enableSorting: false,
                enableColumnFilter: false,
                size: 10,
                minSize: 10
            }
        ],
        []
    );

    useEffect(() => {
        if (token) {
            dispatch(getAuthMe({ token, callback: () => router.push("/authentication?page=sign-in") }))
        }
    }, [token]);

    return (
        <DefaultLayout
            title="Colony"
            header="Media"
            head="News & Articles"
            logo="../../image/logo/logo-icon.svg"
            images="../../image/logo/building-logo.svg"
            userDefault="../../image/user/user-01.png"
            description=""
            token={token}
            icons={{
                name: MdPhotoSizeSelectActual,
                className: "w-10 h-10 text-primary"
            }}
        >
            <div className='absolute inset-0 mt-20 z-9 bg-white flex flex-col text-boxdark'>
                {/* <SidebarBM sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
                <NavbarMedia />
                <main className="relative w-full overflow-y-auto">
                    <div className='relative tracking-wide text-left text-boxdark-2 mt-20 lg:mt-24 px-4'>
                        <div className="w-full flex flex-col overflow-auto gap-2.5 lg:gap-6">
                            {/* content */}
                            <div className='w-full grid grid-cols-1 lg:grid-cols-8 gap-2.5 p-4'>
                                <div className='w-full col-span-4'>
                                    <SearchInput
                                        className='w-full text-sm rounded-xl bg-white'
                                        classNamePrefix=''
                                        filter={search}
                                        setFilter={setSearch}
                                        placeholder='Search...'
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
                                        placeholder='Sorts...'
                                        options={sortOpt}
                                        icon='MdSort'
                                    />
                                </div>
                                <div className='w-full col-span-2 flex flex-col lg:flex-row items-center gap-2'>
                                    <DropdownSelect
                                        customStyles={stylesSelectCat}
                                        value={sort}
                                        onChange={setSort}
                                        error=""
                                        className='text-sm font-normal text-gray-5 w-full lg:w-2/10'
                                        classNamePrefix=""
                                        formatOptionLabel=""
                                        instanceId='1'
                                        isDisabled={false}
                                        isMulti={false}
                                        placeholder='All Categories...'
                                        options={sortOpt}
                                        icon=''
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="primary"
                                    className="rounded-xl"
                                >
                                    New Post
                                    <MdAdd className='w-5 h-5' />
                                </Button>
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
                            />
                        </div>
                    </div>
                </main>
            </div>

            {/* modal example */}
            <Modal
                size=''
                onClose={onClose}
                isOpen={isOpenModal}
            >
                <Fragment>
                    <ModalHeader
                        className='p-4 border-b-2 border-gray mb-3'
                        isClose={true}
                        onClick={onClose}
                    >
                        <h3 className='text-lg font-semibold'>Modal Header</h3>
                    </ModalHeader>
                    <div className="w-full px-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, optio. Suscipit cupiditate voluptatibus et ut alias nostrum architecto ex explicabo quidem harum, porro error aliquid perferendis, totam iste corporis possimus nobis! Aperiam, necessitatibus libero! Sunt dolores possimus explicabo ducimus aperiam ipsam dolor nemo voluptate at tenetur, esse corrupti sapiente similique voluptatem, consequatur sequi dicta deserunt, iure saepe quasi eius! Eveniet provident modi at perferendis asperiores voluptas excepturi eius distinctio aliquam. Repellendus, libero modi eligendi nisi incidunt inventore perferendis qui corrupti similique id fuga sint molestias nihil expedita enim dolor aperiam, quam aspernatur in maiores deserunt, recusandae reiciendis velit. Expedita, fuga.
                    </div>
                    <ModalFooter
                        className='p-4 border-t-2 border-gray mt-3'
                        isClose={true}
                        onClick={onClose}
                    ></ModalFooter>
                </Fragment>
            </Modal>

            {/* detail modal */}
            <Modal
                size='small'
                onClose={onCloseDetail}
                isOpen={isOpenDetail}
            >
                <Fragment>
                    <ModalHeader
                        className='p-6 mb-3'
                        isClose={true}
                        onClick={onCloseDetail}
                    >
                        <div className="flex-flex-col gap-2">
                            <h3 className='text-lg font-semibold'>{details?.firstName || ""}</h3>
                            <div className="flex items-center gap-2">
                                <p className='text-sm text-gray-5'>{details?.firstName || ""} {details?.lastName || ""}</p>
                                <p className='text-sm text-gray-5 capitalize flex items-center'>
                                    <span>{details?.gender === "female" ? <MdFemale className='w-4 h-4 text-danger' /> : details?.gender === "male" ? <MdMale className='w-4 h-4 text-primary' /> : null}</span>
                                    {details?.gender || ""}
                                </p>
                            </div>
                        </div>
                    </ModalHeader>
                    <div className="w-full px-6 mb-5">
                        <div className='w-full flex gap-2.5'>
                            <img src={details?.images ?? "../../../image/user/user-02.png"} alt="profile-images" className='w-32 h-32 rounded-full shadow-2 object-cover object-center' />

                            <div className='w-full flex flex-col gap-2 text-gray-5'>
                                <h3 className='font-bold text-lg'>{details?.fullName}</h3>
                                <div className='flex items-center gap-2'>
                                    <MdEmail />
                                    {details?.email}
                                </div>
                                <div className='flex items-center gap-2'>
                                    <MdPhone />
                                    {/* {formatPhone("+", details?.phoneNumber)} */}
                                    {details?.phoneNumber}
                                </div>
                                <div className='flex items-center gap-2'>
                                    <MdCalendarToday />
                                    {details?.date}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col divide-y-2 divide-gray shadow-3">
                        <div className='w-full flex flex-col px-6 lg:flex-row items-center justify-between py-2'>
                            <div className='text-lg text-primary'>Unit_05</div>
                            <p>Occupant</p>
                        </div>
                        <div className='w-full flex flex-col px-6 lg:flex-row items-center justify-between py-2'>
                            <div className='text-lg text-primary'>Unit_12</div>
                            <p>Occupant & Owner</p>
                        </div>
                        <div className='w-full flex flex-col px-6 lg:flex-row items-center justify-between py-2'>
                            <div className='text-lg text-primary'>Unit_55</div>
                            <p>Owner</p>
                        </div>
                    </div>
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

export default Articles;