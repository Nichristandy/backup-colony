import React, { Fragment, SetStateAction, useEffect, useMemo, useState } from 'react'
import DefaultLayout from '../../../../components/Layouts/DefaultLayouts'
import SidebarBM from '../../../../components/Layouts/Sidebar/Building-Management';
import { MdAdd, MdArrowRightAlt, MdCleaningServices, MdClose, MdDelete, MdLocalHotel, MdOutlinePeople, MdOutlineVpnKey } from 'react-icons/md';
import Button from '../../../../components/Button/Button';
import { SearchInput } from '../../../../components/Forms/SearchInput';
import Modal from '../../../../components/Modal';

import { ModalFooter, ModalHeader } from '../../../../components/Modal/ModalComponent';
import { useRouter } from 'next/router';
import DropdownSelect from '../../../../components/Dropdown/DropdownSelect';
import RowSelectTables from '../../../../components/tables/layouts/RowSelectTables';
import SelectTables from '../../../../components/tables/layouts/SelectTables';
import { ColumnDef } from '@tanstack/react-table';
import { ColumnItems, makeData } from '../../../../components/tables/components/makeData';
import { IndeterminateCheckbox } from '../../../../components/tables/components/TableComponent';
import SidebarComponent from '../../../../components/Layouts/Sidebar/SidebarComponent';
import { menuBM } from '../../../../utils/routes';

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

const stylesSelectStatus = {
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
      minHeight: 40
    })
  },
  menuList: (provided: any) => (provided)
};

const sortOpt = [
  { value: "A-Z", label: "A-Z" },
  { value: "Z-A", label: "Z-A" },
]

const towerOpt = [
  { value: "Tower A", label: "Tower A" },
  { value: "Tower B", label: "Tower B" },
  { value: "Tower C", label: "Tower C" },
  { value: "Tower D", label: "Tower D" },
  { value: "Tower F", label: "Tower F" },
  { value: "Tower F", label: "Tower F" },
]

const statusOpt = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Non - Active" },
]

type Props = {}

const Occupancy = (props: any) => {
  const router = useRouter();
  const { pathname, query } = router;

  const [loading, setLoading] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState(null);
  const [sort, setSort] = useState(false);
  const [towers, setTowers] = useState(null);
  const [status, setStatus] = useState(null);

  // modal
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [details, setDetails] = useState<ColumnItems>();
  const [isSelectedRow, setIsSelectedRow] = useState({});
  // data-table
  const [dataTable, setDataTable] = useState<ColumnItems[]>([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState(2000);
  const [total, setTotal] = useState(1000)

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

  const columns = useMemo<ColumnDef<ColumnItems>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => {
          return (
            <IndeterminateCheckbox
              {...{
                checked: table?.getIsAllRowsSelected(),
                indeterminate: table?.getIsSomeRowsSelected(),
                onChange: table?.getToggleAllRowsSelectedHandler()
              }}
            />
          )
        },
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
            />
          </div>
        ),
      },
      {
        header: 'Name',
        footer: props => props.column.id,
        columns: [
          {
            accessorKey: 'firstName',
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            accessorFn: row => row.lastName,
            id: 'lastName',
            cell: info => info.getValue(),
            header: () => <span>Last Name</span>,
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Info',
        footer: props => props.column.id,
        columns: [
          {
            accessorKey: 'age',
            header: () => 'Age',
            footer: props => props.column.id,
          },
          {
            header: 'More Info',
            columns: [
              {
                accessorKey: 'visits',
                header: () => <span>Visits</span>,
                footer: props => props.column.id,
              },
              {
                accessorKey: 'status',
                header: 'Status',
                footer: props => props.column.id,
              },
              {
                accessorKey: 'progress',
                header: 'Profile Progress',
                footer: props => props.column.id,
              },
            ],
          },
        ],
      },
    ],
    []
  );

  return (
    <DefaultLayout
      title="Colony"
      header="Building Management"
      head="Occupancy"
      logo="../../image/logo/logo-icon.svg"
      images="../../image/logo/building-logo.svg"
      userDefault="../../image/user/user-01.png"
      description=""
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
              <div className='w-full flex flex-col lg:flex-row gap-2.5 px-4'>
                <div className='w-full lg:w-1/2'>
                  <SearchInput
                    className='w-full text-sm rounded-xl'
                    classNamePrefix=''
                    filter={search}
                    setFilter={setSearch}
                    placeholder='Search...'
                  />
                </div>
                <div className='w-full lg:w-1/2 flex flex-col lg:flex-row items-center gap-2'>
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

                  <DropdownSelect
                    customStyles={stylesSelect}
                    value={towers}
                    onChange={setTowers}
                    error=""
                    className='text-sm font-normal text-gray-5 w-full lg:w-4/10'
                    classNamePrefix=""
                    formatOptionLabel=""
                    instanceId='1'
                    isDisabled={false}
                    isMulti={false}
                    placeholder='Towers...'
                    options={towerOpt}
                    icon='MdPlace'
                  />

                  <DropdownSelect
                    customStyles={stylesSelectStatus}
                    value={status}
                    onChange={setStatus}
                    error=""
                    className='text-sm font-normal text-gray-5 w-full lg:w-4/10'
                    classNamePrefix=""
                    formatOptionLabel=""
                    instanceId='1'
                    isDisabled={false}
                    isMulti={false}
                    placeholder='All Status...'
                    options={statusOpt}
                    icon=''
                  />
                </div>
              </div>

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
          </main>
        </div>
      </div>
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
    </DefaultLayout>
  )
}

export default Occupancy;