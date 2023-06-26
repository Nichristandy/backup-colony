import React, { Fragment, useState } from 'react'
import Cards from '../../Cards/Cards'
import { MdAdd, MdArrowDropDown, MdEdit, MdLocationOn, MdMoreHoriz } from 'react-icons/md'
import Button from '../../Button/Button'
import DropdownDefault from '../../Dropdown/DropdownDefault'
import DropdownSelect from '../../Dropdown/DropdownSelect'
import FloorUnit from './FloorUnit'

type Props = {
    items: any
}

const options = [
    // { label: "Select All", value: "all" },
    { value: "restaurant", label: "Restaurant" },
    { value: "unit-001", label: "Unit - 001" },
    { value: "unit-002", label: "Unit - 002" },
    { value: "unit-003", label: "Unit - 003" },
]

const CardTower = (props: Props) => {
    const [value, setValue] = useState({ value: "restaurant", label: "Restaurant" });

    const customStylesSelect = {
        indicatorSeparator: (provided: any) => ({
            ...provided,
            display: 'none',
        }),
        dropdownIndicator: (provided: any) => {
            return ({
                ...provided,
                color: '#5F59F7',
                padding: 0,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
            })
        },
        clearIndicator: (provided: any) => {
            return ({
                ...provided,
                color: '#5F59F7',
                padding: 0,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
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
                background: "#F5F9FD",
                borderColor: state.isFocused ? "#5F59F7" : "#5F59F7",
                color: "#5F59F7",
                "&:hover": {
                    color: state.isFocused ? "gray" : "#5F59F7",
                    borderColor: state.isFocused ? "gray" : "#5F59F7"
                },
                minHeight: 20
            })
        },
        menuList: (provided: any) => ({
            ...provided,
            padding: 0
        })
    };

    return (
        <Cards className='w-full py-4 border border-gray rounded-xl shadow-1'>
            <div className='w-full px-4 flex items-start lg:items-center justify-between tracking-wide'>
                <div className='w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center gap-2.5'>
                    <div className="w-full lg:max-w-max flex items-center justify-between">
                        <h3 className='text-2xl lg:text-4xl font-semibold'>TA001</h3>
                        <Button
                            type="button"
                            onClick={() => console.log("edit")}
                            variant='primary-outline-none'
                            className='rounded-lg text-md font-semibold lg:hidden'
                        >
                            <span className='hidden lg:inline-block'>Edit Info</span>
                            <MdEdit className='w-6 h-6' />
                        </Button>
                    </div>
                    <div className='border-t-2 lg:border-l-2 border-gray lg:h-14 hidden lg:inline-block'></div>
                    <div className='w-full flex flex-col'>
                        <h3 className='text-xl lg:text-2xl'>Tower Name</h3>
                        <div className='w-full flex gap-2 py-2 text-meta-4 items-start'>
                            <MdLocationOn className='w-1/12 my-1' />
                            <p className='text-sm w-11/12'>Jl. Arteri Pd. Indah, RT.10/RW.6, Kby. Lama Utara, Kec. Kebayoran</p>
                        </div>
                    </div>
                </div>

                <Button
                    type="button"
                    onClick={() => console.log("edit")}
                    variant='primary-outline-none'
                    className='rounded-lg text-md font-semibold hidden lg:inline-flex'
                >
                    <span className='hidden lg:inline-block'>Edit Info</span>
                    <MdEdit className='w-6 h-6' />
                </Button>
            </div>

            {/* floor */}
            <div className='w-full flex items-start lg:items-center justify-between border-t border-b border-gray mt-3 gap-2'>
                <div className='flex flex-wrap w-10/12 gap-2 items-center'>
                    <DropdownDefault
                        className=''
                        position='left'
                        data={""}
                        title={
                            <div className='inline-flex gap-2 items-center px-4 py-2 border-b-4 border-primary text-primary font-semibold'>
                                LG
                                <MdMoreHoriz className='w-4 h-4' />
                            </div>
                        }
                    />
                    <Button
                        className='font-semibold'
                        variant=''
                        type="button"
                        onClick={() => console.log("tabs")}
                    >
                        G
                    </Button>
                    <Button
                        className='font-semibold'
                        variant=''
                        type="button"
                        onClick={() => console.log("tabs")}
                    >
                        1F
                    </Button>
                    <Button
                        className='font-semibold'
                        variant=''
                        type="button"
                        onClick={() => console.log("tabs")}
                    >
                        2F
                    </Button>
                    <Button
                        className='font-semibold'
                        variant=''
                        type="button"
                        onClick={() => console.log("tabs")}
                    >
                        3F
                    </Button>
                    <Button
                        className='font-semibold'
                        variant=''
                        type="button"
                        onClick={() => console.log("tabs")}
                    >
                        4F
                    </Button>
                    <Button
                        className='font-semibold'
                        variant=''
                        type="button"
                        onClick={() => console.log("tabs")}
                    >
                        5F
                    </Button>
                </div>
                <div className='p-2'>
                    <Button
                        className='text-xs py-1 px-2 font-semibold rounded-md'
                        variant='primary'
                        type="button"
                        onClick={() => console.log("add floor")}
                    >
                        <span className='hidden lg:inline-block'>New Floor</span>
                        <MdAdd className='w-4 h-4' />
                    </Button>
                </div>
            </div>

            {/* units */}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-6 2xl:gap-7.5 border-b border-gray bg-[#F5F9FD] p-4 h-full max-h-70 overflow-y-auto overflow-x-hidden'>
                <Button
                    className='text-sm py-6 px-8 font-semibold rounded-md mr-4'
                    variant='primary-outline-none'
                    type="button"
                    onClick={() => console.log("add unit")}
                >
                    <div className='flex flex-col items-center gap-2'>
                        <div className='p-2 bg-primary rounded-md'>
                            <MdAdd className='w-4 h-4 text-white' />
                        </div>
                        <span className=''>Add Room</span>
                    </div>
                </Button>

                <FloorUnit />
                <FloorUnit />
                <FloorUnit />
                <FloorUnit />
                <FloorUnit />
                <FloorUnit />
                <FloorUnit />
            </div>

            <div className='w-full flex items-center mt-3 px-4 gap-2.5 lg:gap-6 text-sm'>
                <p className='ml-auto font-semibold'>Total:</p>
                <p className='text-gray-4'>14 Floors</p>
                <p className='text-gray-4'>222 Units</p>
            </div>
        </Cards>
    )
};

export default CardTower;