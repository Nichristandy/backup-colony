import React, { Dispatch, FC, SetStateAction } from 'react';
import DropdownSelect from '../../Dropdown/DropdownSelect';
import { GroupBase, OptionsOrGroups } from 'react-select';

type SelectProps = {
    value: number | string;
    label: number | string;
    images?: string;
    name?: string;
    id?: number | string;
}

type Props = {
    value?: SelectProps;
    setValue?: Dispatch<SetStateAction<string | any>>;
    token?: any;
    options?: any[] | OptionsOrGroups<any, GroupBase<any>>;
    defaultImage?: string | any;
}

const stylesSelect = {
    indicatorSeparator: (provided: any) => ({
        ...provided,
        display: 'none',
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
            paddingTop: '.335rem',
            paddingBottom: '.335rem',
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

const index: FC<Props> = ({ value, setValue, options, token, defaultImage }) => {
    const formatOptionLabel = (props: any) => {
        console.log(props, 'property select')
        return (
            <div className='w-full flex items-center gap-2 rounded'>
                <img src={props?.image || defaultImage} className='object-cover object-center w-10 h-10 rounded' alt="" />
                <div className="font-semibold text-lg">
                    {props.label}
                </div>
            </div>
        )
    }

    return (
        <div className='w-full'>
            <DropdownSelect
                customStyles={stylesSelect}
                value={value}
                onChange={setValue}
                error=""
                className='text-sm font-normal text-gray-5 w-full lg:w-2/10'
                classNamePrefix=""
                formatOptionLabel={formatOptionLabel}
                instanceId='taxType'
                isDisabled={false}
                isMulti={false}
                placeholder='Choose...'
                options={options}
                icon=''
            />
        </div>
    )
}

export default index;