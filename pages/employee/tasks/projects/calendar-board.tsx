import React, { Dispatch, Fragment, SetStateAction, useEffect, useMemo, useState } from 'react'
import DefaultLayout from '../../../../components/Layouts/DefaultLayouts';
import { GetServerSideProps } from 'next';
import { getCookies } from 'cookies-next';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../../redux/Hook';
import { getAuthMe, selectAuth } from '../../../../redux/features/auth/authReducers';
import { ColumnItems } from '../../../../components/tables/components/makeData';
import { makeData } from '../../../../components/tables/components/makeData';
import { ColumnDef } from '@tanstack/react-table';
import { IndeterminateCheckbox } from '../../../../components/tables/components/TableComponent';
import Button from '../../../../components/Button/Button';
import { MdAdd, MdArrowRightAlt, MdCalendarToday, MdChevronLeft, MdDelete, MdEdit, MdEmail, MdFemale, MdMale, MdPhone, MdUpload, MdWork } from 'react-icons/md';
import SidebarComponent from '../../../../components/Layouts/Sidebar/SidebarComponent';
import { menuParkings, menuProjects, menuTask } from '../../../../utils/routes';
import Tabs from '../../../../components/Layouts/Tabs';
import { SearchInput } from '../../../../components/Forms/SearchInput';
import DropdownSelect from '../../../../components/Dropdown/DropdownSelect';
import SelectTables from '../../../../components/tables/layouts/SelectTables';
import Modal from '../../../../components/Modal';
import { ModalFooter, ModalHeader } from '../../../../components/Modal/ModalComponent';
import moment from 'moment';
import { Calendar } from '../../../../components/Timeline';
import { WorkProps, createDataTask } from '../../../../components/tables/components/taskData';

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
  indicatorsContainer: (provided: any) => ({
    ...provided,
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
    })
  },
  menuList: (provided: any) => (provided)
};

const CalendarBoard = ({ pageProps }: Props) => {
  moment.locale("id");
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

  // data-table
  const [dataTable, setDataTable] = useState<WorkProps[]>([]);
  const [isSelectedRow, setIsSelectedRow] = useState({});
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState(2000);
  const [total, setTotal] = useState(1000)

  // timeline
  const [timelineHeader, setTimelineHeader] = useState<any | any[]>([]);
  const [timelineItem, setTimelineItem] = useState<any | any[]>([]);

  // modal
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [details, setDetails] = useState<WorkProps>();

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
    setDataTable(() => createDataTask(20))
  }, []);

  const columns = useMemo<ColumnDef<WorkProps, any>[]>(
    () => [
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
              <Button
                onClick={() => onOpenDelete(row.original)}
                variant="secondary-outline-none"
                className="px-1 py-1"
                type="button"
              >
                <MdDelete className='text-gray-5 w-4 h-4' />
              </Button>
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

  console.log(details, "details")

  // color
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

  // timeline function
  useEffect(() => {
    let header: any[] = [];
    if (dataTable?.length > 0) {
      dataTable?.map((val) =>
        header?.push({
          id: val?.id,
          title: val?.workName,
          color: genColorProjectType(val?.workType),
        })
      );
      setTimelineHeader(header);
    } else {
      setTimelineHeader([]);
    }
  }, [dataTable]);

  useEffect(() => {
    let item: any[] = [];
    if (dataTable?.length > 0) {
      dataTable?.map((val) =>
        item?.push({
          ...val,
          id: val?.id,
          title: val?.workName,
          color: genColorProjectType(val?.workType),
          start_time: moment(val?.scheduleStart).toDate(),
          end_time: moment(val?.scheduleEnd).toDate(),
          group: val?.id,
          itemProps: {
            "data-custom-attribute": "Random content",
            "aria-hidden": true,
            onDoubleClick: () => {
              console.log("You clicked double!");
            },
            className: "weekend",
            style: {
              background: "fuchsia",
            },
          },
        })
      );
      setTimelineItem(item);
    } else {
      setTimelineItem([]);
    }
  }, [dataTable]);

  const onChangeVehicle = (newGroupId: any, dragTime: any, taskId: any) => {
    console.log("vehicles:", { newGroupId, dragTime, taskId });
  };

  const onCanvasClick = (groupId: any, time: any, e: any) => {
    if (groupId > 0) {
      setIsOpenDetail(true);
      console.log("canvas click :", groupId, time);
    }
  };

  const onItemContextMenu = (itemId: any, e: any, time: any) => {

    console.log("onItem", itemId);

    setIsOpenDetail(true);
    // setIsEditable(true);
  };

  const onItemDoubleClick = (itemId: any, e: any, time: any) => {
    // console.log("on double click", itemId);
    const items = dataTable.filter(item => item?.id == itemId);
    setIsOpenDetail(true);
    setDetails(items[0])
  };

  const onItemSelect = (id: any) => {
    console.log("on item select :", id);
    // setIsEditable(true);
  };

  const onSubmitProject = (task: any) => {
    console.log("on submit", task);
  };

  console.log({ timelineHeader, timelineItem }, "timeline")

  useEffect(() => {
    if (token) {
      dispatch(getAuthMe({ token, callback: () => router.push("/authentication?page=sign-in") }))
    }
  }, [token]);

  return (
    <DefaultLayout
      title="Colony"
      header="Task Management"
      head="Tables"
      logo="../../../image/logo/logo-icon.svg"
      images="../../../image/logo/building-logo.svg"
      userDefault="../../../image/user/user-01.png"
      description=""
      token={token}
      icons={{
        icon: MdWork,
        className: "w-8 h-8 text-meta-7"
      }}
    >
      <div className='absolute inset-0 mt-20 z-9 bg-boxdark flex text-white'>
        <SidebarComponent menus={menuTask} sidebar={sidebarOpen} setSidebar={setSidebarOpen} />

        <div className="relative w-full bg-white lg:rounded-tl-[3rem] p-8 pt-0 2xl:p-10 2xl:pt-0 overflow-y-auto">
          <div className='sticky bg-white top-0 z-50 py-6 mb-3 w-full flex flex-col gap-2'>
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
                    <h3 className='w-full lg:max-w-max text-center text-2xl font-semibold text-graydark'>Projects</h3>
                  </div>
                </Button>
              </div>

              <div className='w-full lg:max-w-max flex items-center justify-center gap-2 lg:ml-auto'>
                <Button
                  type="button"
                  className='rounded-lg text-sm font-semibold py-3'
                  onClick={onOpen}
                  variant='primary'
                >
                  <span className='hidden lg:inline-block'>New Project</span>
                  <MdAdd className='w-4 h-4' />
                </Button>
              </div>
            </div>
            {/* tabs */}
            <div className='w-full px-4'>
              <Tabs menus={menuProjects} />
            </div>
          </div>

          <main className='relative tracking-wide text-left text-boxdark-2'>
            <div className="w-full flex flex-col overflow-auto gap-2.5 lg:gap-6">
              {/* content */}
              {/* content */}
              <div className='w-full grid grid-cols-1 lg:grid-cols-5 gap-2.5 p-4'>
                <div className='w-full lg:col-span-2'>
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
                    placeholder='All Status...'
                    options={sortOpt}
                    icon=''
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
                    placeholder='All Type...'
                    options={sortOpt}
                    icon=''
                  />
                </div>
              </div>

              {/* Calendar timeline */}
              <Calendar
                groups={timelineHeader}
                items={timelineItem}
                onItemMove={onChangeVehicle}
                onCanvasClick={onCanvasClick}
                onItemContextMenu={onItemContextMenu}
                onItemSelect={onItemSelect}
                onItemDoubleClick={onItemDoubleClick}
              />
            </div>
          </main>
        </div>
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
              <h3
                className='text-sm font-semibold py-1 px-2 rounded-md w-full max-w-max'
                style={{
                  backgroundColor: !details?.workType ? "#FFFFFF" : genColorProjectType(details.workType),
                  color: !details?.workType ? "#333A48" : "#FFFFFF",
                }}
              >
                {details?.workType || ""}
              </h3>
              <div className="flex items-center gap-2">
                <p className='text-sm text-gray-5'>{details?.workName || ""}</p>
              </div>
            </div>
          </ModalHeader>
          <div className="w-full flex flex-col divide-y-2 divide-gray shadow-3 text-sm text-gray-5">
            <div className='w-full flex flex-col px-6 lg:flex-row items-center justify-between py-2'>
              <div className='text-sm text-graydark'>Start Date</div>
              <p>{dateFormat(details?.scheduleStart)}</p>
            </div>
            <div className='w-full flex flex-col px-6 lg:flex-row items-center justify-between py-2'>
              <div className='text-sm text-graydark'>End Date</div>
              <p>{dateFormat(details?.scheduleEnd)}</p>
            </div>
            <div className='w-full flex flex-col px-6 lg:flex-row items-center justify-between py-2 mb-2'>
              <div className='text-sm text-graydark'>Total Task</div>
              <p>{details?.totalTask}</p>
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

export default CalendarBoard;