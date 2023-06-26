import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdKeyboardArrowLeft } from 'react-icons/md';

interface BreadcumbProps {
    page?: {
        pathname: string,
        url: string
    }
    pageName?: string;
    className?: string;
}

const Breadcrumb: FC<BreadcumbProps> = ({ page, pageName, className }) => {
    const router = useRouter();
    return (
        <div className={`w-full py-5 gap-3 flex flex-row items-center tracking-wider ${className}`}>
            <button onClick={() => router.back()}>
                <MdKeyboardArrowLeft className='w-6 h-6' />
            </button>

            <nav>
                <ol className='flex items-center gap-2'>
                    <li>
                        <button onClick={() => router.push({ pathname: `${!page?.url ? '/' : page?.url}` })}>{!page?.pathname ? "Dashboard" : page?.pathname} /</button>
                    </li>
                    <li className='text-graydark font-semibold'>{pageName}</li>
                </ol>
            </nav>
        </div>
    )
}

export default Breadcrumb;
