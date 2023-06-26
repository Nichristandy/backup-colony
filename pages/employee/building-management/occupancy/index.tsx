import React, { Fragment, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import DefaultLayout from '../../../../components/Layouts/DefaultLayouts'
import { MdArrowDropUp, MdArrowRightAlt, MdEdit, MdKeyboardArrowRight, MdOutlineDelete, MdOutlineEdit, MdOutlinePeople, MdOutlineVpnKey } from 'react-icons/md';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal';

import { ModalFooter, ModalHeader } from '../../../../components/Modal/ModalComponent';
import { useRouter } from 'next/router';
import { ColumnItems, makeData } from '../../../../components/tables/components/makeData';
import Cards from '../../../../components/Cards/Cards';
import { GetServerSideProps } from 'next';
import { getCookies } from 'cookies-next';
import { useAppDispatch, useAppSelector } from '../../../../redux/Hook';
import { selectAuth } from '../../../../redux/features/auth/authReducers';
import { getAuthMe } from '../../../../redux/features/auth/authReducers';
import { ColumnDef } from '@tanstack/react-table';
import ScrollCardTables from '../../../../components/tables/layouts/ScrollCardTables';
import SidebarComponent from '../../../../components/Layouts/Sidebar/SidebarComponent';
import { menuBM } from '../../../../utils/routes';

type Props = {
  pageProps: any
}

const Occupancy = ({ pageProps }: Props) => {
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

  const goToDetails = (id: number | string) => {
    if (!id) {
      return;
    }
    router.push({ pathname: `/property/building-management/occupancy/${id}` })
  }

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

              <Button
                onClick={() => goToDetails(1)}
                className="px-0 py-0"
                type="button"
                variant="danger-outline-none"
              >
                <MdKeyboardArrowRight className='w-5 h-5 text-gray-5' />
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
      head="Occupancy"
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

        <div className="relative w-full bg-white lg:rounded-tl-[3rem] p-8 pt-0 2xl:p-10 2xl:pt-0 overflow-y-auto">
          <div className='sticky bg-white top-0 z-50 w-full flex flex-col lg:flex-row items-start lg:items-center justify-between py-6 mb-3 gap-2'>
            <div className='w-full flex items-center justify-between py-3'>
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
              <h3 className='w-full lg:max-w-max text-center text-2xl font-semibold text-graydark'>Occupancy</h3>
            </div>

            <div className='w-full lg:max-w-max flex items-center justify-center gap-2 lg:ml-auto'>
              <Button
                type="button"
                className='rounded-lg text-sm font-semibold py-3'
                onClick={() => router.push("occupancy/tenants")}
                variant='primary-outline'
                key={'1'}
              >
                <span className='hidden lg:inline-block text-graydark'>Tenant List</span>
                <MdOutlinePeople className='w-5 h-5' />
              </Button>

              <Button
                type="button"
                className='rounded-lg text-sm font-semibold py-3'
                onClick={() => console.log("klik")}
                variant='primary-outline'
                key={'2'}
              >
                <span className='hidden lg:inline-block text-graydark'>New Request</span>
                <MdOutlineVpnKey className='w-4 h-4' />
              </Button>
            </div>
          </div>

          <main className='tracking-wide text-left text-boxdark-2 mt-5'>
            <div className="w-full flex flex-col">
              {/* content */}
              <div className="w-full grid col-span-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 tracking-wider mb-5">
                <Cards className='w-full bg-white shadow-md text-gray-6 font-thin text-sm sm:text-base rounded-xl border border-gray'>
                  <div className="w-full p-4 flex flex-col gap-4">
                    <h1>Occupancy Level</h1>
                    <div className='w-full flex items-center gap-2'>
                      <span className='w-full max-w-max font-semibold'>86%</span>
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="overflow-hidden h-3 text-xs flex rounded-xl bg-[#EFEAD8] shadow-card w-full my-auto">
                          <div style={{ width: "70%" }} className="shadow-none z-10 flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary hover:opacity-50 font-semibold text-[.5rem]">70%</div>
                          <div style={{ width: "10%" }} className="shadow-none z-10 flex flex-col text-center whitespace-nowrap text-white justify-center bg-warning hover:opacity-50 font-semibold text-[.5rem]">16%</div>
                        </div>
                      </div>
                    </div>
                    <div className='w-full flex flex-col lg:flex-row items-center text-xs tracking-normal justify-between'>
                      <p>322 Occupied</p>
                      <p>400 Owned</p>
                      <p>500 Units</p>
                    </div>
                  </div>
                </Cards>

                <Cards className='w-full bg-white shadow-md text-gray-6 font-thin text-sm sm:text-base rounded-xl border border-gray'>
                  <div className="w-full p-4 flex flex-col gap-4">
                    <h1>Total Tenant</h1>
                    <div className='w-full flex items-center gap-2'>
                      <span className='w-full lg:w-2/12 font-semibold'>522</span>
                      <div className="w-full lg:w-10/12 flex items-center justify-between gap-2">
                        <div className="w-full max-w-max flex items-center gap-2">
                          <MdArrowDropUp className='w-4 h-4' />
                          <p>5 new tenants</p>
                        </div>
                        <Button
                          className="px-0 py-0"
                          type="button"
                          onClick={() => console.log("edit")}
                          variant="primary-outline-none"
                        >
                          <MdEdit className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                    <div className='w-full flex flex-col lg:flex-row items-center justify-between text-xs tracking-normal'>
                      <div className="w-full max-w-max flex items-center gap-2">
                        <MdArrowDropUp className='w-4 h-4' />
                        <p>5 new tenants</p>
                      </div>
                      <p>123 m2</p>
                    </div>
                  </div>
                </Cards>

                <Cards className='w-full bg-white shadow-md text-gray-6 font-thin text-sm sm:text-base rounded-xl border border-gray'>
                  <div className="w-full p-4 flex flex-col gap-4">
                    <h1>Total Tenant</h1>
                    <div className='w-full flex items-center gap-2'>
                      <span className='w-full lg:w-2/12 font-semibold'>522</span>
                      <div className="w-full lg:w-10/12 flex items-center justify-between gap-2">
                        <div className="w-full max-w-max flex items-center gap-2">
                          <MdArrowDropUp className='w-4 h-4' />
                          <p>5 new tenants</p>
                        </div>
                        <Button
                          className="px-0 py-0"
                          type="button"
                          onClick={() => console.log("edit")}
                          variant="primary-outline-none"
                        >
                          <MdEdit className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                    <div className='w-full flex flex-col lg:flex-row items-center justify-between text-xs tracking-normal'>
                      <div className="w-full max-w-max flex items-center gap-2">
                        <MdArrowDropUp className='w-4 h-4' />
                        <p>5 new tenants</p>
                      </div>
                      <p>123 m2</p>
                    </div>
                  </div>
                </Cards>

                <Cards className='w-full bg-white shadow-md text-gray-6 font-thin text-sm sm:text-base rounded-xl border border-gray'>
                  <div className="w-full p-4 flex flex-col gap-4">
                    <h1>Total Tenant</h1>
                    <div className='w-full flex items-center gap-2'>
                      <span className='w-full lg:w-2/12 font-semibold'>522</span>
                      <div className="w-full lg:w-10/12 flex items-center justify-between gap-2">
                        <div className="w-full max-w-max flex items-center gap-2">
                          <MdArrowDropUp className='w-4 h-4' />
                          <p>5 new tenants</p>
                        </div>
                        <Button
                          className="px-0 py-0"
                          type="button"
                          onClick={() => console.log("edit")}
                          variant="primary-outline-none"
                        >
                          <MdEdit className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                    <div className='w-full flex flex-col lg:flex-row items-center justify-between text-xs tracking-normal'>
                      <div className="w-full max-w-max flex items-center gap-2">
                        <MdArrowDropUp className='w-4 h-4' />
                        <p>5 new tenants</p>
                      </div>
                      <p>123 m2</p>
                    </div>
                  </div>
                </Cards>
              </div>

              {/* table test */}
              <ScrollCardTables
                columns={columns}
                dataTable={dataTable}
                loading={loading}
                setLoading={setLoading}
                pages={pages}
                setPages={setPages}
                limit={limit}
                setLimit={setLimit}
                pageCount={pageCount}
                total={total}
                isInfiniteScroll
              />
            </div>
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

export default Occupancy;