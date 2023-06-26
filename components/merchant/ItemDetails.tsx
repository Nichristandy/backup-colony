import React from 'react'

const ItemDetails = () => {
  return (
    <table className="w-full overflow-hidden rounded-lg shadow-lg border-separate border-0 border-spacing-y-4">
                    <tbody className="text-gray-700 dark:text-gray-400 text-xs">
                        <tr className="bg-white rounded-sm">
                            <td className="py-6 px-4 border-y first:border-l last:border-r first:rounded-l-lg last:rounded-r-lg">
                                <div className="max-w-max flex flex-col lg:flex-row items-center">
                                    <div className="flex items-center mx-1 my-1 font-bold">
                                        <img src="" className="w-10 h-10 rounded object-cover object-center mr-2"/>
                                        <div className="mx-1 text-sm">
                                            <h3 className="uppercase text-[#5F59F7]">IT-06</h3>
                                            <span>NESTLE` - MILO </span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-6 px-4 border-y first:border-l last:border-r first:rounded-l-lg last:rounded-r-lg">
                                <div className="w-full flex flex-col lg:flex-row items-center">
                                    <div className="w-full max-w-max flex flex-wrap items-center text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-300 m-1">Drink</div>
                                </div>

                            </td>
                            <td className="py-6 px-4 border-y first:border-l last:border-r first:rounded-l-lg last:rounded-r-lg">
                                <div className="w-full max-w-max font-bold text-xs">
                                    <div className="line-through text-gray-300 hidden">IDR 0</div>
                                    <div>IDR 5,500</div>
                                </div>
                            </td>
                            <td className="py-6 px-4 border-y first:border-l last:border-r first:rounded-l-lg last:rounded-r-lg">
                                <div className="flex items-center mx-1 my-1 capitalize">
                                    <div>
                                        <button className=" bg-[#5F59F7] relative inline-flex h-[28px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75" tabIndex={0} id="headlessui-switch-:r9u:" role="switch" type="button"  aria-checked="false" data-headlessui-state="checked">
                                            <span aria-hidden="true" className="translate-x-6 pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"></span>
                                        </button>
                                    </div>
                                    <span className="ml-2">Active</span>
                                </div>
                            </td>
                            <td className="py-6 px-4 border-y first:border-l last:border-r first:rounded-l-lg last:rounded-r-lg">
                                <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-2">
                                    <button className="false false flex items-center text-gray-500 hover:text-secondary-500 font-bold text-[10px] p-2 uppercase focus:outline-none hover:shadow-offset-black focus:shadow-offset-black duration-300 transition transform rounded false false false undefined group">
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="w-5 h-5 hover:text-[#5F59F7]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 000-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"></path></svg>
                                    </button>
                                    <button className="false false flex items-center text-gray-500 hover:text-secondary-500 font-bold text-[10px] p-2 uppercase focus:outline-none hover:shadow-offset-black focus:shadow-offset-black duration-300 transition transform rounded false false false undefined group">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="w-5 h-5 hover:text-red-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"></path></svg>
                                    </button>
                                </div>

                            </td>
                        </tr>

                    </tbody>
                </table>
  )
}

export default ItemDetails