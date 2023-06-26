import Head from 'next/head'
import React, { ReactNode, useRef, useState } from 'react'
import { useDimensions } from '../../utils/useHooks/use-dimensions';

type Props = {
    children: ReactNode,
    title: string,
    description: string,
    logo: string,
    images: string,
    header: string,
    sidebar: boolean,
    handleSidebar: () => void,
}

function MainLayout({
    children,
    title,
    description,
    logo,
    images,
    header,
    sidebar,
    handleSidebar,
}: Props) {
    const containerRef = useRef(null);
    const { height, width } = useDimensions(containerRef);

    console.log(height, 'height', width)

    return (
        <div ref={containerRef}>
            <Head>
                <title>{title} | Colony</title>
                <link rel="icon" href={logo ? logo : `./image/logo-bar.png`} />
                <meta name="description" content={`Colony - ${description}`} />
            </Head>

            <div className="font-sans relative flex w-full bg-gray-50 overflow-y-auto">
                {/* main */}
                <div className="flex flex-col items-center w-full h-screen min-h-full duration-300 ease-in-out">
                    <div className='w-full relative flex'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout