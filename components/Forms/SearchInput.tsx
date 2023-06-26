import React, { useCallback, useRef, useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";

type Props = {
    filter: any,
    setFilter: any,
    placeholder: string,
    className: string,
    classNamePrefix: string
}

export const SearchInput = ({ filter, setFilter, placeholder, className, classNamePrefix }: Props) => {
    const [value, setValue] = useState("");
    let inputRef = useRef<HTMLInputElement | null>(null);

    function handleChange(e: any) {
        setValue(e.target.value);
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        setFilter(value);
        // setValue("");
    }

    const handleDeleteSearch = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.value = '';
            setValue(inputRef.current.value);
            setFilter(inputRef.current.value);
        }
        // console.log(inputRef.current?.value, 'input')
    }, []);

    // console.log(value, 'value')

    return (
        <div className="w-full">
            <form
                onSubmit={handleSubmit}
                className="flex my-auto items-center relative w-full mr-6 text-gray-500 focus-within:text-primary"
            >
                <div className='relative w-full'>
                    {filter ? (
                        <MdClose
                            onClick={handleDeleteSearch}
                            className={`w-6 h-6 absolute z-20 left-3 top-4 hover:cursor-pointer text-gray-5 ${classNamePrefix}`}
                        />

                    ) :
                        <MdSearch onClick={handleSubmit} className={`w-6 h-6 absolute left-3 top-4 hover:cursor-pointer text-gray-5 ${classNamePrefix}`} />
                    }
                    <input
                        type='text'
                        placeholder={placeholder}
                        onChange={handleChange}
                        ref={inputRef}
                        className={`w-full rounded-lg border border-stroke py-4 pl-10 pr-6 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${className}`}
                    />
                </div>
                {/* <button
                    type="submit"
                    className="px-4 py-2 bg-green-300 ml-1 rounded-md text-white focus:outline-none focus:ring-4 focus:ring-green-100 disabled:opacity-50"
                >
                    <MdSearch className="w-5 h-5" />
                </button> */}
            </form>
        </div>
    );
};
