import React from 'react'
import { colorfull } from '../../../utils/useHooks/useFunction';
import Tooltip from '../../Tooltip/Tooltip';

type TeamProps = {
    items: any;
    onClick?: () => void
}

export default function Teams({ items, onClick }: TeamProps) {
    const index = [0, 1, 2];

    return (
        <div className="w-full text-sm text-gray-500">
            <div className='w-full flex gap-2 items-center'>
                <div className='w-full max-w-max flex items-center -space-x-4'>
                    {items?.length > 3 ?
                        <React.Fragment>
                            {index?.map((val, idx) => {
                                return (
                                    <Tooltip
                                        className={`tooltip w-full text-sm focus:outline-none`}
                                        classTooltip='p-5 rounded-xl shadow-lg z-1 font-bold w-full min-w-max'
                                        tooltip={`${items?.[val]?.firstName} ${items?.[val]?.lastName}`}
                                        color='light'
                                        position={"top-left"}
                                        key={idx}
                                    >
                                        <button
                                            type='button'
                                            className="relative inline-flex text-blue-500 hover:text-red-500 duration-300 focus:outline-none">
                                            {items[val]?.profileImage ?
                                                <img
                                                    src={items[val]?.profileImage}
                                                    alt="images"
                                                    className='border rounded-full w-10 h-10 object-cover object-center'
                                                />
                                                : <div style={{ backgroundColor: `#${colorfull(items?.[val]?.id)}` }} className='border rounded-full flex items-center justify-center w-10 h-10 text-[10px] uppercase font-bold text-white'>
                                                    {items[val]?.firstName || items[val]?.lastName ?
                                                        items[val]?.firstName?.charAt(0) + items[val]?.lastName?.charAt(0) :
                                                        null
                                                    }
                                                </div>
                                            }
                                        </button>
                                    </Tooltip>
                                )
                            })}
                            {/* <button
                                type='button'
                                onClick={onClick}
                                className="group relative flex justify-center items-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full border-2 border-white hover:bg-gray-600 dark:border-gray-800"
                            >
                                {items?.length > 3
                                    ? `+${items?.length - 3}`
                                    : ""}
                            </button> */}
                        </React.Fragment> : items?.length == 0 ?
                            <div className='font-bold text-gray-5'>
                                Teams hasn't any member
                            </div> :
                            <React.Fragment>
                                {index?.map((val, idx) => {
                                    console.log(items?.[val]?.id, 'id')
                                    if (items?.[val]?.id) {
                                        return (
                                            <Tooltip
                                                className={`tooltip w-full text-sm focus:outline-none`}
                                                classTooltip='p-5 rounded-xl shadow-lg z-1 font-bold w-full min-w-max'
                                                tooltip={`${items?.[val]?.firstName} ${items?.[val]?.lastName}`}
                                                color='light'
                                                position={"bottom-left"}
                                                key={idx}
                                            >
                                                <button
                                                    type='button'
                                                    className="relative inline-flex text-blue-500 hover:text-red-500 duration-300 focus:outline-none">
                                                    {items[val]?.profileImage ?
                                                        <img
                                                            src={items[val]?.profileImage}
                                                            alt="images"
                                                            className='border rounded-full w-10 h-10 object-cover object-center'
                                                        />
                                                        : <div style={{ backgroundColor: `#${colorfull(items[val]?.id)}` }} className='border rounded-full flex items-center justify-center w-10 h-10 text-[10px] uppercase font-bold text-white'>
                                                            {items[val]?.firstName || items[val]?.lastName ?
                                                                items[val]?.firstName?.charAt(0) + items[val]?.lastName?.charAt(0) :
                                                                null
                                                            }
                                                        </div>
                                                    }
                                                </button>
                                            </Tooltip>
                                        )
                                    }
                                })}
                                {/* <button
                                    type='button'
                                    onClick={onClick}
                                    className="relative flex justify-center items-center w-10 h-10 text-xs font-medium text-white bg-gray rounded-full border-2 border-white hover:bg-gray-600 dark:border-gray-800"
                                >
                                    {items?.length > 3
                                        ? `+${items?.length - 3}`
                                        : ""}
                                </button> */}
                            </React.Fragment>
                    }
                </div>
                {items?.length > 2 ?
                    <div className='w-full hidden lg:flex'>
                        <p>
                            <span className='font-semibold'>{`${items[0].firstName}, ${items[1].firstName}`}</span>
                            <span>{`${items?.length - 2 == 0 ? "" : items.length - 2 == 1 ? ` and +${items.length} other` : ` and +${items.length} others`}`}</span>
                        </p>

                    </div>
                    : items?.length == 0 ? null :
                        <div className='w-full hidden lg:flex'>
                            <p className='flex gap-2'>
                                {index.map((e: any, i: any) => (
                                    <span key={i} className='font-semibold'>{items?.[i].firstName},</span>
                                ))}
                            </p>

                        </div>
                }
            </div>
        </div>
    )
};
