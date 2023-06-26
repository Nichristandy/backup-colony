import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react'
import Icon from '../../../Icon';
import { MdChevronRight } from "react-icons/md";


// type Props = {
//     menus: any,
//     data: any
//     title: string,
//     icon: string,
// }

function Menus(props: any) {
    const { menus, title, data, icon } = props;
    return (
        <div className="text-right">
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="inline-flex w-full justify-center items-center rounded-md p-1 text-sm hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    {title}
                    {icon ? <MdChevronRight className='w-5 h-5 ml-1' /> : null}
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute z-20 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {menus?.map?.((menu: any, idx: any) => (
                            <div key={idx} className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={data ? () => menu?.onSubmit(data) : menu?.onSubmit}
                                            className={`${active ? 'bg-green-300 text-white' : 'text-gray-800'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            {menu?.icon ?
                                                active ? (
                                                    <Icon className="mr-2 h-5 w-5" aria-hidden="true" icon={menu.icon} />
                                                ) : (
                                                    <Icon className="mr-2 h-5 w-5" aria-hidden="true" icon={menu.icon} />
                                                ) :
                                                null
                                            }
                                            {menu?.text}
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        ))}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default Menus