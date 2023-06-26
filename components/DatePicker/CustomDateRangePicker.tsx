import "react-datepicker/dist/react-datepicker.css";

import React, { Dispatch, SetStateAction} from "react";

import { MdDateRange } from "react-icons/md";
import DatePicker from "react-datepicker";

export type DateRangeProps = {
    start: Date | null | any;
    setStart: Dispatch<SetStateAction<Date | null>>;
    end: Date | null | any;
    setEnd: Dispatch<SetStateAction<Date | null>>;
    disabled?: boolean;
    classLabel?: string;
    classInput?: string;
    classPrefix?: string;
}

export const CustomDateRangePicker = ({ start, setStart, end, setEnd, disabled, classInput, classLabel, classPrefix }: DateRangeProps) => {
    return (
        <div className="w-full max-w-max flex items-center text-gray-5 gap-1">
            <span className={`text-sm ${classLabel}`}>From</span>
            <div className='w-full max-w-[15rem] px-4'>
                <label className='w-full text-gray-5 overflow-hidden'>
                    <div className='relative'>
                        <MdDateRange className={`absolute left-4 top-2.5 h-6 w-6 text-gray-5 ${classPrefix}`} />
                        <DatePicker
                            selected={start}
                            onChange={(date) => setStart(date)}
                            selectsStart
                            startDate={start}
                            endDate={end}
                            dropdownMode="select"
                            disabled={disabled}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            className={`text-sm lg:text-md w-full text-gray-5 rounded-lg border border-stroke bg-transparent py-3 pl-12 pr-6 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${classInput}`}
                        />
                    </div>
                </label>
            </div>
            <span className={`text-sm ${classLabel}`}>to</span>
            <div className='w-full max-w-[15rem] px-4'>
                <label className='w-full text-gray-5 overflow-hidden'>
                    <div className='relative'>
                        <MdDateRange className={`absolute left-4 top-2.5 h-6 w-6 text-gray-5 ${classPrefix}`} />
                        <DatePicker
                            selected={end}
                            onChange={(date) => setEnd(date)}
                            selectsEnd
                            startDate={start}
                            endDate={end}
                            minDate={start}
                            dropdownMode="select"
                            disabled={disabled}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            className={`text-sm lg:text-md w-full text-gray-5 rounded-lg border border-stroke bg-transparent py-3 pl-12 pr-6 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${classInput}`}
                        />
                    </div>
                </label>
            </div>
        </div>
    );
};
