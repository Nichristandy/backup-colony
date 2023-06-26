import React, { Dispatch, SetStateAction } from 'react'
import { MenuProps } from '../../../utils/routes'
import SidebarLink from './SidebarLink';
import Icon from '../../Icon';
import SidebarLinkGroup from './SidebarLinkGroup';
import { useRouter } from 'next/router';

type Props = {
    menus: MenuProps[];
    sidebarExpanded: boolean;
    setSidebarExpanded: Dispatch<SetStateAction<boolean>>;
}

const SidebarList = ({ menus, sidebarExpanded, setSidebarExpanded }: Props) => {
    const router = useRouter();
    const { pathname, query } = router;
    return (
        <ul className='mb-6 flex flex-col gap-1.5'>
            {menus?.length > 0 ?
                menus.map((route, idx) => {
                    const { subMenus, routes } = route;
                    if (subMenus && subMenus?.length > 0) {
                        return (
                            <div key={idx}>
                                {!route.title ?
                                    <div className='border-gray border-t w-full border-2 my-4'></div> :
                                    <h3 className='my-4 text-lg font-semibold text-white'>
                                        {route?.title}
                                    </h3>
                                }

                                <ul className='mb-6 flex flex-col gap-1.5'>
                                    {/* <!-- Menu Parking List --> */}
                                    {subMenus?.map((menu, i) => {
                                        const { routes } = menu;
                                        if (!routes) {
                                            return (
                                                <li key={i}>
                                                    <SidebarLink
                                                        href={{ pathname: menu.url, query: menu?.query }}
                                                        className={`text-base ${menu.className}`}
                                                        pages={menu?.pages}
                                                    >
                                                        {!menu?.icons?.icon ? null :
                                                            <Icon className={menu?.icons?.className} icon={menu.icons.icon} />
                                                        }
                                                        {menu?.pathname}
                                                    </SidebarLink>
                                                </li>
                                            )
                                        }
                                        return (
                                            <SidebarLinkGroup key={i} activeCondition={pathname === menu?.url || pathname.includes(menu?.pages as string)}>
                                                {(handleClick: any, open: boolean) => {
                                                    return (
                                                        <React.Fragment>
                                                            <button
                                                                type='button'
                                                                className={`w-full group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === menu?.url ||
                                                                    pathname.includes(menu?.pages as string)) &&
                                                                    'bg-primary'
                                                                    } ${menu?.className}`}
                                                                onClick={(e) => {
                                                                    e.preventDefault()
                                                                    sidebarExpanded
                                                                        ? handleClick()
                                                                        : setSidebarExpanded(true)
                                                                }}
                                                            >
                                                                {menu?.icons?.icon ? <Icon className={route?.icons?.className} icon={menu?.icons.icon} /> : null}
                                                                {menu?.pathname}
                                                                <svg
                                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
                                                                        }`}
                                                                    width='20'
                                                                    height='20'
                                                                    viewBox='0 0 20 20'
                                                                    fill='none'
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                >
                                                                    <path
                                                                        fillRule='evenodd'
                                                                        clipRule='evenodd'
                                                                        d='M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z'
                                                                        fill=''
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <div
                                                                className={`translate transform overflow-hidden ${!open && 'hidden'
                                                                    }`}
                                                            >
                                                                <ul className='mt-4 mb-5.5 flex flex-col gap-2.5'>
                                                                    {routes && routes?.length > 0 ?
                                                                        routes?.map((route, id) => {
                                                                            return (
                                                                                <li key={id}>
                                                                                    <SidebarLink
                                                                                        href={{ pathname: route.url, query: route?.query }}
                                                                                        className={`text-base pl-6 ${route?.className}`}
                                                                                        activeClass="bg-graydark"
                                                                                        pages={route?.pages}
                                                                                    >
                                                                                        {!route?.icons?.icon ? null :
                                                                                            <Icon className={route?.icons?.className} icon={route.icons.icon} />
                                                                                        }
                                                                                        {route?.pathname}
                                                                                    </SidebarLink>
                                                                                </li>
                                                                            )
                                                                        }) : null
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </React.Fragment>
                                                    )
                                                }}
                                            </SidebarLinkGroup>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    } else {
                        if (!routes) {
                            return (
                                <li key={idx}>
                                    <SidebarLink
                                        href={{ pathname: route.url, query: route?.query }}
                                        className={`text-base ${route?.className}`}
                                        pages={route?.pages}
                                    >
                                        {!route?.icons?.icon ? null :
                                            <Icon className={route?.icons?.className} icon={route.icons.icon} />
                                        }
                                        {route?.pathname}
                                    </SidebarLink>
                                </li>
                            )
                        }
                        return (
                            <SidebarLinkGroup key={idx} activeCondition={pathname === route?.url || pathname.includes(route?.pages as string)}>
                                {(handleClick: any, open: boolean) => {
                                    return (
                                        <React.Fragment>
                                            <button
                                                type='button'
                                                className={`w-full group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === route?.url ||
                                                    pathname.includes(route?.pages as string)) &&
                                                    'bg-primary'
                                                    } ${route?.className}`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true)
                                                }}
                                            >
                                                {route?.icons?.icon ?
                                                    <Icon
                                                        className={route?.icons?.className}
                                                        icon={route?.icons.icon}
                                                    />
                                                    : null
                                                }
                                                {route?.pathname}
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
                                                        }`}
                                                    width='20'
                                                    height='20'
                                                    viewBox='0 0 20 20'
                                                    fill='none'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                >
                                                    <path
                                                        fillRule='evenodd'
                                                        clipRule='evenodd'
                                                        d='M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z'
                                                        fill=''
                                                    />
                                                </svg>
                                            </button>
                                            <div
                                                className={`translate transform overflow-hidden ${!open && 'hidden'
                                                    }`}
                                            >
                                                <ul className='mt-4 mb-5.5 flex flex-col gap-2.5'>
                                                    {route?.routes && route?.routes?.length > 0 ?
                                                        route?.routes?.map((r, id) => {
                                                            return (
                                                                <li key={id}>
                                                                    <SidebarLink
                                                                        href={{ pathname: r.url, query: r?.query }}
                                                                        className={`text-base pl-6 ${r.className}`}
                                                                        activeClass="bg-graydark"
                                                                        pages={r?.pages}
                                                                    >
                                                                        {!r?.icons?.icon ? null :
                                                                            <Icon className={r?.icons?.className} icon={r.icons.icon} />
                                                                        }
                                                                        {r?.pathname}
                                                                    </SidebarLink>
                                                                </li>
                                                            )
                                                        }) : null
                                                    }
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>
                        )
                    }
                }) : null
            }
        </ul>
    )
}

export default SidebarList