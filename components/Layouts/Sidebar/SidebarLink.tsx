import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SidebarLink = ({ children, href, className, activeClass, pages }: any) => {
    const router = useRouter();
    const { pathname } = router;
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (pathname === href?.pathname || pathname.includes(pages as string)) setActive(true);
        else setActive(false)
    }, [pathname, pages])

    return (
        <Link
            href={{ pathname: href?.pathname, query: href?.query }}
            scroll={true}
            // className={`${router.pathname === href?.pathname
            //     ? "border-primary font-bold mb-3 md:mb-0 text-primary"
            //     : "text-gray-500 hover:text-gray-700 border-transparent"
            //     } ${className} block py-4 text-base border-b-4 rounded focus:outline-none whitespace-no-wrap`}
            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${active ? `bg-primary ${activeClass}` : ""} ${className}`}
        >
            {children}
        </Link>
    );
};

export default SidebarLink