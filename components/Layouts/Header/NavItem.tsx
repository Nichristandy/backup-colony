import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { MdNotifications, MdChevronLeft, MdLayers, MdChevronRight, MdOutlineEmojiEmotions, MdOutlineExitToApp } from "react-icons/md";
import Menus from './Menus';
import Link from "next/link";

type Props = {}

function NavItem(props: any) {
    const { handleSidebar, defaultImage } = props;
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);

    const dropdownBtn = [
        {
            text: "Profile",
            icon: "MdPerson",
            onSubmit: (e: any) => {
                console.log("submit");
            },
        },
        {
            text: "Logout",
            icon: "MdLogout",
            onSubmit: (e: any) => console.log("logout"),
        },
    ];

    // const handleResize = () => {
    //     if (window.innerWidth < 768) {
    //         setIsMobile(true);
    //     } else {
    //         setIsMobile(false);
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener("resize", handleResize);
    // }, []);

    return (
        <Fragment>
            <div className="relative z-20 w-full flex flex-row items-center md:hidden bg-[#111F2C] py-3.5 md:py-5 px-4">
                <button
                    className="p-4 flex justify-center md:hidden"
                    onClick={handleSidebar}
                >
                    <MdChevronLeft className="w-5 h-5 text-gray-400" />
                </button>
                <button
                    type="button"
                    onClick={() => setIsMobile((e) => !e)}
                    className="relative flex md:hidden ml-auto w-8 h-8 text-sm font-semibold hover:text-gray-300 focus:outline-none underline p-1 border-2 border-gray-300 rounded"
                >
                    <div className={`absolute w-[1.2rem] h-0.5 bg-gray-300 duration-300 ${isMobile ? "rotate-45 top-[0.84rem]" : "rotate-0 top-[0.45rem]"}`}></div>
                    <div className={`absolute w-[1.2rem] h-0.5 bg-gray-300 duration-300 ${isMobile ? "-rotate-45 bottom-[0.84rem]" : "rotate-0 bottom-[0.45rem]"}`}></div>
                    <div className={`absolute w-[1.2rem] h-0.5 bg-gray-300 duration-300 ${isMobile ? "-rotate-45 bottom-[0.84rem]" : "rotate-0 bottom-[0.8rem]"}`}></div>
                </button>
            </div>

            {/* desktop */}
            <div className={`relative w-full hidden md:flex items-center bg-[#111F2C] py-3.5 md:py-5 px-4 `}>
                <div className="w-full flex items-center">
                    <Link href="/home">
                        <div className="w-full max-w-xs">
                            <div className="h-14 flex items-center">
                                <img
                                    src={props?.images ?? "./image/eclipse-icon.png"} alt="logo"
                                    className="w-10 h-10 my-auto mr-5"
                                />
                                <span className='hover:visible font-extrabold tracking-wide text-3xl py-2 text-white'>{props?.header || 'Menus'}</span>
                            </div>
                        </div>
                    </Link>

                    <div className="flex items-center">

                    </div>

                    <div className="flex flex-row justify-between items-center md:ml-auto">
                        <Menus
                            menus={dropdownBtn}
                            title={
                                <div className="w-full flex items-center">
                                    <div className="text-sm font-bold mx-2 flex items-center">
                                        <img
                                            className="w-8 h-8 rounded-full object-cover object-center"
                                            src={defaultImage}
                                            alt="img"
                                        />
                                    </div>
                                    <div className="w-auto flex flex-col items-start text-white">
                                        John Doe
                                    </div>
                                </div>
                            }
                        />
                        <div className="relative flex h-8 mx-3">
                            <div className="border border-gray-300 absolute inset-y-0"></div>
                        </div>
                        <button
                            className={`relative focus:outline-none flex py-[0.20rem] px-3 text-gray-500 hover:text-primary-600 focus:text-primary-600`}
                            onClick={e => console.log("open notification")}
                        >
                            <MdNotifications className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile */}
            {/* <div className={`fixed z-50 top-[5rem] w-full inset-x-0 inset-y-0 bg-white transform trasition-all duration-300 border-t-[1px] ${isMobile ? "scale-100 -translate-x-0" : "scale-0 translate-x-full"} flex flex-col md:hidden p-6`}> */}
            <div className={`fixed z-50 w-full inset-x-0 inset-y-0 bg-white transform trasition-all duration-300 border-t-[1px] ${isMobile ? "scale-100 -translate-x-0" : "scale-0 translate-x-full"} flex flex-col md:hidden p-6`}>
                <div className="w-full">
                    <button
                        type="button"
                        onClick={() => setIsMobile((e) => !e)}
                        className="relative flex md:hidden ml-auto w-8 h-8 text-sm font-semibold hover:text-gray-300 focus:outline-none underline p-1 border-2 border-gray-300 rounded"
                    >
                        <div className={`absolute w-[1.2rem] h-0.5 bg-gray-300 duration-300 ${isMobile ? "rotate-45 top-[0.84rem]" : "rotate-0 top-[0.45rem]"}`}></div>
                        <div className={`absolute w-[1.2rem] h-0.5 bg-gray-300 duration-300 ${isMobile ? "-rotate-45 bottom-[0.84rem]" : "rotate-0 bottom-[0.45rem]"}`}></div>
                        <div className={`absolute w-[1.2rem] h-0.5 bg-gray-300 duration-300 ${isMobile ? "-rotate-45 bottom-[0.84rem]" : "rotate-0 bottom-[0.8rem]"}`}></div>
                    </button>

                    <button
                        className="w-full flex justify-start items-center mb-3 px-4 py-1.5 rounded hover:bg-green-100 hover:text-green-300 hover:border"
                        onClick={() => console.log('profile')}
                    >
                        <MdOutlineEmojiEmotions className="w-5 h-5 mr-2" />
                        <span>Profile</span>
                    </button>
                    <button
                        className="w-full flex justify-start items-center mb-3 px-4 py-1.5 rounded hover:bg-green-100 hover:text-green-300 hover:border"
                        onClick={() => console.log('notifications')}
                    >
                        <MdNotifications className="w-5 h-5 mr-2" />
                        <span>Notifications</span>
                    </button>
                    <button
                        className="w-full flex justify-start items-center px-4 py-1.5 rounded hover:bg-green-100 hover:text-green-300 hover:border"
                        onClick={() => console.log('logout')}
                    >
                        <MdOutlineExitToApp className="w-5 h-5 mr-2" />
                        Logout
                    </button>
                </div>
            </div>
            {/* Modal */}
            {/* <AlertModal
                isOpen={logoutNotif}
                closeModal={handleCloseSignout}
                title="Sign Out"
                content="Are you sure to sign out?"
                buttonText="Sign Out"
                variant="primary"
                sizes="max-w-sm"
                onSubmit={logout}
                icon={<QuestionMarkCircleIcon className="w-20 text-green-300" />}
            /> */}
        </Fragment>
    )
}

export default NavItem