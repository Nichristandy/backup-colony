import React,{useState} from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";

type Props = {
    pageProps: any;
  };

const merchantMenu = ({}) =>{

    const [isOpen,setIsOpen] = useState(false)
    const router = useRouter();
    
    return(
        <>
                <div className="w-full mt-2 lg:mt-3">
                    <div className="hidden md:flex flex-row justify-between items-center">
                        <div className="flex items-center w-full border-b-2 text-white">
                            <div className={router.pathname === '/access/merchant/detail' ? 'text-[#5F59F7] font-bold' : 'text-white'}>
                                <Link 
                                    href="/access/merchant/detail"
                                    className="mx-2 font-bold active:border-b-[#5F59F7] active:text-[#5F59F7] p-2 hover:text-[#5F59F7] hover:border-b-[#5F59F7]">
                                    <span>Item list</span>
                                </Link>
                            </div>
                            <div className={router.pathname === '/access/merchant/category' ? 'text-[#5F59F7] font-bold' : 'text-white'}>
                                <Link 
                                    href="/access/merchant/category"
                                    className="mx-2 font-bold active:border-b-[#5F59F7] active:text-[#5F59F7]  p-2 hover:text-[#5F59F7] hover:border-b-[#5F59F7]">
                                    <span>Category list</span>
                                </Link>
                            </div>
                            <div className={router.pathname === '/access/merchant/discounts' ? 'text-[#5F59F7] font-bold' : 'text-white'}>
                                <Link 
                                    href="/access/merchant/discounts"
                                    className="mx-2 font-bold active:border-b-[#5F59F7] active:text-[#5F59F7]  p-2 hover:text-[#5F59F7] hover:border-b-[#5F59F7]">
                                    <span>Discounts</span>
                                </Link>
                            </div>
                            <div className={router.pathname === '/access/merchant/hours' ? 'text-[#5F59F7] font-bold' : 'text-white'}>
                                <Link 
                                    href="/access/merchant/hours"
                                    className="mx-2 font-bold active:border-b-[#5F59F7] active:text-[#5F59F7]  p-2  hover:text-[#5F59F7] hover:border-b-[#5F59F7]">
                                    <span>Open hours</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:hidden">
                        <div className="flex flex-row w-full justify-between items-center bg-white rounded-lg p-2">
                            <h1 className="font-bold text-[#5f59f7]">Menu</h1>
                            <button onClick={() =>setIsOpen(!isOpen)} 
                            type ="button" 
                            className='inline-flex items-center justify-center p-2 rounded-md text-[#5F59F7] focus:outline-none focus:ring-offset-2 focus:ring-white'
                            aria-controls='mobile-menu'
                            aria-expanded='false'
                            >
                                <span className='sr-only'>Open main menu</span>
                                {/* tking icon from w3 website */}
                                {/* d = shape code */}
                                {!isOpen ?(
                                    <svg 
                                        className='block h-6 w-6' 
                                        xmlns='http:www.w3.org/2000/svg' 
                                        fill='none' 
                                        viewBox='0 0 24 24' 
                                        stroke='currentColor' 
                                        aria-hidden="true"
                                    >
                                        <path 
                                            strokeLinecap='round' 
                                            strokeLinejoin='round' 
                                            strokeWidth="2" 
                                            d='M4 6h16M4 12h16M4 18h16'// for menu shape
                                        />

                                    </svg>
                                ):(
                                    <svg 
                                        className='block h-6 w-6' 
                                        xmlns='http:www.w3.org/2000/svg' 
                                        fill='none' 
                                        viewBox='0 0 24 24' 
                                        stroke='currentColor' 
                                        aria-hidden="true"
                                    >
                                        <path 
                                            strokeLinecap='round' 
                                            strokeLinejoin='round' 
                                            strokeWidth="2" 
                                            d='M6 18L18 6M6 6l12 12'//for cross shape
                                        />

                                    </svg>

                                )}
                            </button>
                        </div>
                    </div>
                    <Transition 
                    show={isOpen} 
                    enter="transition ease-out duration-100 transform"
                    enterFrom='opacity-0 scale-95'
                    enterTo="opacity-100 scale-100"
                    leave='transition ease-in duration-75 transform'
                    leaveFrom="opacity-100 scale-100"
                    leaveTo='opacity-0 scale-95'
                >
                    {(ref) => (
                        //handle the mobile menu tabs
                        <div className="md:hidden id=mobile-menu">
                            <div ref={ref} className='bg-white rounded-lg mt-2 pt-2 px-2 pb-3 space-y-1 sm:px-3'>
                                <Link 
                                href='/items'
                                className='cursor-pointer hover:bg-[#5F59F7] text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                                >
                                    Item List
                                </Link>
                                <Link 
                                href='/category'
                                className='cursor-pointer hover:bg-[#5F59F7] text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                                >
                                    Category list
                                </Link>
                                <Link 
                                href='/discounts'
                                className='cursor-pointer hover:bg-[#5F59F7] text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                                >
                                    Discounts
                                </Link>
                                <Link 
                                href='/open'
                                className='cursor-pointer hover:bg-[#5F59F7] text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                                >
                                    Open hours
                                </Link>
                            </div>
                        </div>
                    )}
                </Transition>
                            


                </div>
        </>
    )
}

export default merchantMenu;