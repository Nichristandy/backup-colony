import React, { useState } from 'react'
import Cards from '../../Cards/Cards'
import DropdownSelect from '../../Dropdown/DropdownSelect'
import Button from '../../Button/Button'
import { MdEdit } from 'react-icons/md'

type Props = {}

const options = [
    // { label: "Select All", value: "all" },
    { value: "restaurant", label: "Restaurant" },
    { value: "unit-001", label: "Unit - 001" },
    { value: "unit-002", label: "Unit - 002" },
    { value: "unit-003", label: "Unit - 003" },
]

const FloorUnit = (props: Props) => {
    const [unit, setUnit] = useState({ value: "restaurant", label: "Restaurant" });

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
        <Cards className='relative rounded-lg border border-gray shadow-1 bg-white p-2 text-sm flex flex-col justify-between'>
            <div>
                <DropdownSelect
                    customStyles={customStylesSelect}
                    value={unit}
                    onChange={setUnit}
                    error=""
                    className='text-xs'
                    classNamePrefix=""
                    formatOptionLabel=""
                    instanceId='1'
                    isDisabled={false}
                    isMulti={false}
                    placeholder='Unit'
                    options={options}
                    icon=''
                />

                <div className='border border-t w-full border-gray mt-3'></div>

                <div className='flex items-center justify-between gap-2'>
                    <h3 className='text-lg font-semibold'>101</h3>

                    <Button
                        type="button"
                        className='py-1 px-1'
                        variant='primary-outline-none'
                        onClick={() => console.log("edit")}
                    >
                        <MdEdit className='w-4 h-4' />
                    </Button>
                </div>
            </div>

            <div className='flex items-center justify-between gap-2 text-gray-4 text-xs'>
                <h3 className=''>5 amenities</h3>
                <p>123m2</p>
            </div>
        </Cards>
    )
}

export default FloorUnit