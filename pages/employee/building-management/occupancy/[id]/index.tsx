import React, { Fragment, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import DefaultLayout from '../../../../../components/Layouts/DefaultLayouts'
import { MdAdd, MdArrowDropUp, MdArrowRightAlt, MdCleaningServices, MdClose, MdDashboard, MdDelete, MdEdit, MdEmail, MdFileUpload, MdLayers, MdLocalHotel, MdLocalParking, MdLocationCity, MdMap, MdOutlineBuild, MdOutlineDelete, MdOutlineEdit, MdOutlinePeople, MdOutlineVpnKey } from 'react-icons/md';
import Button from '../../../../../components/Button/Button';
import Modal from '../../../../../components/Modal';

import { ModalFooter, ModalHeader } from '../../../../../components/Modal/ModalComponent';
import { useRouter } from 'next/router';
import { ColumnItems, makeData } from '../../../../../components/tables/components/makeData';
import { GetServerSideProps } from 'next';
import { getCookies } from 'cookies-next';
import { useAppDispatch, useAppSelector } from '../../../../../redux/Hook';
import { selectAuth } from '../../../../../redux/features/auth/authReducers';
import { getAuthMe } from '../../../../../redux/features/auth/authReducers';
import { ColumnDef } from '@tanstack/react-table';
import Breadcrumb from '../../../../../components/Breadcrumb/Breadcrumb';
import SidebarComponent from '../../../../../components/Layouts/Sidebar/SidebarComponent';
import { menuBM } from '../../../../../utils/routes';

type Props = {
    pageProps: any
}

const UnitDetails = ({ pageProps }: Props) => {
    const router = useRouter();
    const { pathname, query } = router;
    const { token, accessToken, firebaseToken } = pageProps;

    // redux
    const dispatch = useAppDispatch();
    const { data, isLogin, pending, error, message } = useAppSelector(selectAuth);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    // modal
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [details, setDetails] = useState<ColumnItems>();
    const [isSelectedRow, setIsSelectedRow] = useState({});

    // data-table
    const [dataTable, setDataTable] = useState<ColumnItems[]>([]);
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState<number>(10);
    const [pageCount, setPageCount] = useState<number>(2000);
    const [total, setTotal] = useState<number>(1000)
    const [loading, setLoading] = useState(true);
    // scroll table
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [offsetHight, setOffsetHight] = useState<number>(0);
    const [scrollHeight, setScrollHeight] = useState<number>(0);
    let refTable = useRef<HTMLDivElement>(null);


    // console.log(dataTable, 'data table')

    const loadHandler = () => {
        setLimit(limit => limit + 10);
    }

    const handleScroll = useCallback((containerRefElement?: HTMLDivElement | null) => {
        if (containerRefElement) {
            const { scrollHeight, scrollTop, clientHeight } = containerRefElement
            if (
                scrollHeight - scrollTop - clientHeight < 10
            ) {
                loadHandler()
            }
        }
    }, [loadHandler]);

    useEffect(() => {
        handleScroll(refTable.current)
    }, [handleScroll]);

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

    // delete modal
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

    const columns = useMemo<ColumnDef<ColumnItems, any>[]>(
        () => [
            {
                accessorKey: 'fullName',
                cell: info => {
                    const avatar = info?.row?.original?.avatar
                    return (
                        <div className='cursor-pointer' onClick={() => onOpenDetail(info.row.original)}>
                            <div className='w-full flex items-center gap-2'>
                                <img src={avatar} alt="images" className='w-1/2 object-cover object-center' />
                                <div className='w-1/2'>
                                    {info.getValue()}
                                </div>
                            </div>
                        </div>
                    )
                },
                footer: props => props.column.id,
                // enableSorting: false,
                enableColumnFilter: false,
                size: 200,
                minSize: 10
            },
            {
                accessorKey: 'email',
                cell: info => {
                    return (
                        <div className='cursor-pointer px-4 py-6' onClick={() => onOpenDetail(info.row.original)}>
                            {info.getValue()}
                        </div>
                    )
                },
                header: () => <span>Email</span>,
                footer: props => props.column.id,
                enableColumnFilter: false,
            },
            {
                accessorKey: 'phoneNumber',
                cell: info => {
                    let phone = info.getValue();
                    return (
                        <div className='cursor-pointer px-4 py-6' onClick={() => onOpenDetail(info.row.original)}>
                            {/* {phone ? formatPhone("+", info.getValue()) : ""} */}
                            {phone ? phone : ""}
                        </div>
                    )
                },
                header: 'Phone',
                footer: props => props.column.id,
                enableColumnFilter: false,
            },
            {
                accessorKey: 'owned',
                cell: info => {
                    return (
                        <div className='cursor-pointer px-4 py-6' onClick={() => onOpenDetail(info.row.original)}>
                            {info.getValue()}
                        </div>
                    )
                },
                header: 'Owned',
                footer: props => props.column.id,
                enableColumnFilter: false,
            },
            {
                accessorKey: 'occupied',
                cell: info => {
                    return (
                        <div className='cursor-pointer px-4 py-6' onClick={() => onOpenDetail(info.row.original)}>
                            {info.getValue()}
                        </div>
                    )
                },
                header: 'Occ',
                footer: props => props.column.id,
                enableColumnFilter: false,
            },
            {
                accessorKey: 'date',
                cell: info => {
                    let date = info.getValue()
                    return (
                        <div className='cursor-pointer px-4 py-6' onClick={() => onOpenDetail(info.row.original)}>
                            {date}
                        </div>
                    )
                },
                header: 'Date Added',
                footer: props => props.column.id,
                enableColumnFilter: false,
            },
            {
                accessorKey: 'id',
                cell: ({ row, getValue }) => {
                    // console.log(row.original, "info")
                    return (
                        <div className='w-full text-center flex items-center justify-center cursor-pointer px-4 py-6'>
                            <Button
                                onClick={() => onOpenDetail(row?.original)}
                                className="px-0 py-0"
                                type="button"
                                variant="primary-outline-none"
                            >
                                <MdOutlineEdit className='w-5 h-5 text-gray-5' />
                            </Button>
                            <Button
                                onClick={() => onOpenDelete(row?.original)}
                                className="px-0 py-0"
                                type="button"
                                variant="danger-outline-none"
                            >
                                <MdOutlineDelete className='w-5 h-5 text-gray-5' />
                            </Button>
                        </div>
                    )
                },
                header: props => {
                    return (
                        <div>Actions</div>
                    )
                },
                footer: props => props.column.id,
                // enableSorting: false,
                enableColumnFilter: false,
                size: 10,
                minSize: 10
            }
        ],
        []
    );

    // console.log('pages :', {pages, limit})

    return (
        <DefaultLayout
            title="Colony"
            header="Building Management"
            head="Units"
            logo="../../image/logo/logo-icon.svg"
            images="../../image/logo/building-logo.svg"
            userDefault="../../image/user/user-01.png"
            description=""
            token={token}
        >
            <div className='absolute inset-0 mt-20 z-9 bg-boxdark flex text-white'>
                <SidebarComponent
                    className=''
                    menus={menuBM}
                    sidebar={sidebarOpen}
                    setSidebar={setSidebarOpen}
                />

                <div className="relative w-full lg:h-full bg-white lg:rounded-tl-[3rem] overflow-y-auto">

                    {/* content */}
                    <main className="w-full lg:h-full flex flex-col sm:flex-row tracking-wider text-left text-boxdark-2 text-base">
                        {/* col 1 */}
                        <section className="w-full lg:w-1/2 flex flex-col lg:h-full overflow-auto">
                            <div className="w-full p-4 2xl:p-6 static lg:sticky top-0 z-20 bg-white shadow-1">
                                <button
                                    aria-controls='sidebar'
                                    aria-expanded={sidebarOpen}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setSidebarOpen(!sidebarOpen)
                                    }}
                                    className='rounded-sm border p-1.5 shadow-sm border-strokedark bg-boxdark lg:hidden text-gray'
                                >
                                    <MdArrowRightAlt className={`w-5 h-5 delay-700 ease-in-out ${sidebarOpen ? "rotate-180" : ""}`} />
                                </button>
                                <Breadcrumb className='text-lg' page={{ pathname: "Occupancy", url: "/building-management/occupancy" }} pageName='Units' />
                            </div>

                            {/* detail unit */}
                            <div className='w-full shadow-1'>
                                <div className="w-full flex flex-col lg:flex-row gap-4 p-6 2xl:p-10">
                                    <div className='w-full lg:w-1/3 gap-2 flex flex-col'>
                                        <img src="../../image/no-image.jpeg" alt="images" className='w-full max-w-[200px] max-h-[200px] object-cover object-center rounded-xl mx-auto' />
                                        <Button
                                            type="button"
                                            variant="secondary-outline-none"
                                            onClick={() => console.log("upload")}
                                            className="border border-gray rounded-xl shadow-1 text-sm w-full max-w-[200px] mx-auto"
                                        >
                                            Upload a picture
                                            <MdFileUpload className='w-4 h-4' />
                                        </Button>
                                    </div>

                                    <div className='w-full lg:w-2/3 gap-4 flex flex-col'>
                                        <h3 className='text-lg font-semibold'>Unit 01</h3>
                                        <p className='text-gray-5 text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id, vitae?</p>
                                        <div className='w-full flex flex-wrap text-gray-5 text-sm gap-2'>
                                            <div className='w-full max-w-max flex items-center gap-2'>
                                                <MdLocationCity className='w-4 h-4' />
                                                <span>Tower 1</span>
                                            </div>
                                            <div className='w-full max-w-max flex items-center gap-2'>
                                                <MdLayers className='w-4 h-4' />
                                                <span>4F</span>
                                            </div>
                                            <div className='w-full max-w-max flex items-center gap-2'>
                                                <MdMap className='w-4 h-4' />
                                                <span>123 m<sup>2</sup></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* owner - occupant */}
                            <div className="w-full shadow-1">
                                <div className='w-full flex flex-col gap-4 p-6 2xl:p-10'>
                                    <div className='w-full flex flex-col gap-2'>
                                        <h3 className='text-gray-5'>Owner</h3>
                                        <div className='w-full flex p-4 rounded-xl shadow-card-2 border border-gray'>
                                            <div className='w-full flex flex-col text-sm gap-1'>
                                                <h3 className='font-semibold'>John Doe</h3>
                                                <div className='w-full max-w-max flex items-center gap-2 text-gray-5'>
                                                    <MdEmail className='w-4 h-4' />
                                                    john.doe@email.com
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-full flex flex-col gap-2'>
                                        <h3 className='text-gray-5'>Occupant</h3>
                                        <div className='w-full flex flex-col lg:flex-row gap-2 p-4 rounded-xl shadow-card-2 border-2 border-dashed border-gray-4 bg-gray'>
                                            <div className='w-full lg:w-4/5 flex flex-col text-sm gap-1 text-center lg:text-left'>
                                                <h3 className='font-semibold'>Set an occupant</h3>
                                                <div className='text-gray-5'>
                                                    There is no occupant in this unit
                                                </div>
                                            </div>
                                            <div className='w-full lg:w-1/5 flex'>
                                                <Button
                                                    variant="primary"
                                                    type="button"
                                                    className="rounded-lg py-1 px-1.5 my-auto mx-auto lg:mx-0 lg:ml-auto"
                                                    onClick={() => console.log("add")}
                                                >
                                                    <MdAdd className='w-4 h-4' />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* access */}
                            <div className="w-full shadow-1">
                                <div className='w-full flex flex-col gap-4 p-6 2xl:p-10'>
                                    <div className='w-full flex flex-col gap-2'>
                                        <h3 className='text-gray-5'>Access</h3>
                                        <div className="grid col-span-1 lg:grid-cols-2 gap-2">
                                            <div className='w-full flex p-2 rounded-xl shadow-card-2 border border-gray'>
                                                <div className='w-full flex flex-col text-sm gap-1'>
                                                    <div className='w-full max-w-max flex items-center gap-2 text-gray-5'>
                                                        <MdLocalParking className='w-5 h-5' />
                                                        <span className='font-semibold text-graydark'>12333 - 1444</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='w-full flex p-2 rounded-xl shadow-card-2 border border-gray'>
                                                <div className='w-full flex flex-col text-sm gap-1'>
                                                    <div className='w-full max-w-max flex items-center gap-2 text-gray-5'>
                                                        <MdLocalParking className='w-5 h-5' />
                                                        <span className='font-semibold text-graydark'>12333 - 1444</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='w-full flex p-2 rounded-xl shadow-card-2 border border-gray'>
                                                <div className='w-full flex flex-col text-sm gap-1'>
                                                    <div className='w-full max-w-max flex items-center gap-2 text-gray-5'>
                                                        <MdLocalParking className='w-5 h-5' />
                                                        <span className='font-semibold text-graydark'>12333 - 1444</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='w-full flex p-2 rounded-xl shadow-card-2 border border-gray'>
                                                <div className='w-full flex flex-col text-sm gap-1'>
                                                    <div className='w-full max-w-max flex items-center gap-2 text-gray-5'>
                                                        <MdLocalParking className='w-5 h-5' />
                                                        <span className='font-semibold text-graydark'>12333 - 1444</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='w-full flex p-2 rounded-xl shadow-card-2 border border-gray'>
                                                <div className='w-full flex flex-col text-sm gap-1'>
                                                    <div className='w-full max-w-max flex items-center gap-2 text-gray-5'>
                                                        <MdLocalParking className='w-5 h-5' />
                                                        <span className='font-semibold text-graydark'>12333 - 1444</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='w-full flex p-2 rounded-xl shadow-card-2 border border-gray'>
                                                <div className='w-full flex flex-col text-sm gap-1'>
                                                    <div className='w-full max-w-max flex items-center gap-2 text-gray-5'>
                                                        <MdLocalParking className='w-5 h-5' />
                                                        <span className='font-semibold text-graydark'>12333 - 1444</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='w-full flex p-2 rounded-xl shadow-card-2 border border-gray'>
                                                <div className='w-full flex flex-col text-sm gap-1'>
                                                    <div className='w-full max-w-max flex items-center gap-2 text-gray-5'>
                                                        <MdLocalParking className='w-5 h-5' />
                                                        <span className='font-semibold text-graydark'>12333 - 1444</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='w-full flex p-2 rounded-xl shadow-card-2 border border-gray'>
                                                <div className='w-full flex flex-col text-sm gap-1'>
                                                    <div className='w-full max-w-max flex items-center gap-2 text-gray-5'>
                                                        <MdLocalParking className='w-5 h-5' />
                                                        <span className='font-semibold text-graydark'>12333 - 1444</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* col 2 */}
                        <section className="w-full lg:w-1/2 flex flex-col bg-gray lg:h-full overflow-auto">
                            <div className="w-full p-4 2xl:p-6 static lg:sticky top-0 z-20 bg-gray shadow-1">
                                <h3 className='py-5 font-bold text-lg'>
                                    Activity History
                                </h3>
                            </div>
                            <div className="w-full flex flex-col lg:flex-row gap-4 p-6 2xl:p-10">
                                <div className="w-full flex flex-col gap-4">
                                    <div className='w-full flex p-2.5 rounded-xl shadow-card-2 border border-gray bg-white'>
                                        <div className='w-full flex flex-row items-center text-sm gap-2'>
                                            <div className='p-2.5 bg-gray rounded-xl text-gray-5'>
                                                <MdEdit className='w-6 h-6' />
                                            </div>
                                            <div className='w-full max-w-max flex flex-col gap-1 text-gray-5'>
                                                <p className='text-graydark'><strong>Admin_2</strong> changed the unit picture</p>
                                                <p className='text-xs'>15/02/2023, 15:33</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-full flex p-2.5 rounded-xl shadow-card-2 border border-gray bg-white'>
                                        <div className='w-full flex flex-row items-center text-sm gap-2'>
                                            <div className='p-2.5 bg-gray rounded-xl text-gray-5'>
                                                <MdEdit className='w-6 h-6' />
                                            </div>
                                            <div className='w-full max-w-max flex flex-col gap-1 text-gray-5'>
                                                <p className='text-graydark'><strong>Admin_2</strong> changed the unit picture</p>
                                                <p className='text-xs'>15/02/2023, 15:33</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-full flex p-2.5 rounded-xl shadow-card-2 border border-gray bg-white'>
                                        <div className='w-full flex flex-row items-center text-sm gap-2'>
                                            <div className='p-2.5 bg-gray rounded-xl text-gray-5'>
                                                <MdEdit className='w-6 h-6' />
                                            </div>
                                            <div className='w-full max-w-max flex flex-col gap-1 text-gray-5'>
                                                <p className='text-graydark'><strong>Admin_2</strong> changed the unit picture</p>
                                                <p className='text-xs'>15/02/2023, 15:33</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-full flex p-2.5 rounded-xl shadow-card-2 border border-gray bg-white'>
                                        <div className='w-full flex flex-row items-center text-sm gap-2'>
                                            <div className='p-2.5 bg-gray rounded-xl text-gray-5'>
                                                <MdEdit className='w-6 h-6' />
                                            </div>
                                            <div className='w-full max-w-max flex flex-col gap-1 text-gray-5'>
                                                <p className='text-graydark'><strong>Admin_2</strong> changed the unit picture</p>
                                                <p className='text-xs'>15/02/2023, 15:33</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div >
            </div >
            {/* detail edit*/}
            <Modal
                size=''
                onClose={onCloseDetail}
                isOpen={isOpenDetail}
            >
                <Fragment>
                    <ModalHeader
                        className='p-4 border-b-2 border-gray mb-3'
                        isClose={true}
                        onClick={onCloseDetail}
                    >
                        <h3 className='text-lg font-semibold'>Modal Header</h3>
                    </ModalHeader>
                    <div className="w-full px-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, optio. Suscipit cupiditate voluptatibus et ut alias nostrum architecto ex explicabo quidem harum, porro error aliquid perferendis, totam iste corporis possimus nobis! Aperiam, necessitatibus libero! Sunt dolores possimus explicabo ducimus aperiam ipsam dolor nemo voluptate at tenetur, esse corrupti sapiente similique voluptatem, consequatur sequi dicta deserunt, iure saepe quasi eius! Eveniet provident modi at perferendis asperiores voluptas excepturi eius distinctio aliquam. Repellendus, libero modi eligendi nisi incidunt inventore perferendis qui corrupti similique id fuga sint molestias nihil expedita enim dolor aperiam, quam aspernatur in maiores deserunt, recusandae reiciendis velit. Expedita, fuga.
                    </div>
                    <ModalFooter
                        className='p-4 border-t-2 border-gray mt-3'
                        isClose={true}
                        onClick={onCloseDetail}
                    ></ModalFooter>
                </Fragment>
            </Modal>

            {/* detail delete*/}
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
                        <h3 className='text-lg font-semibold'>Modal Header</h3>
                    </ModalHeader>
                    <div className="w-full px-4">
                        delete
                    </div>
                    <ModalFooter
                        className='p-4 border-t-2 border-gray mt-3'
                        isClose={true}
                        onClick={onCloseDelete}
                    ></ModalFooter>
                </Fragment>
            </Modal>

            {/* example */}
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
        </DefaultLayout >
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

export default UnitDetails;