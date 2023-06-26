import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Head from 'next/head';

type Props = {
    children: any,
    title: any,
    description: any,
    logo: string,
}

const AuthLayout = ({ children, title, description, logo }: Props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className='dark:bg-boxdark-2 dark:text-bodydark'>
            <Head>
                <title>{title} | Colony</title>
                <link rel="icon" href={logo ? logo : `./image/logo-bar.png`} />
                <meta name="description" content={`Colony - ${description}`} />
            </Head>
            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                <div className='w-full flex lg:h-screen overflow-hidden'>
                    {/* <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'> */}
                        {children}
                    {/* <div className='w-full h-full'>
                    </div> */}
                    {/* <!-- ===== Main Content Start ===== --> */}

                    {/* <!-- ===== Main Content End ===== --> */}
                </div>
            </div>
            {/* <!-- ===== Page Wrapper End ===== --> */}
        </div>
    )
}

export default AuthLayout;
