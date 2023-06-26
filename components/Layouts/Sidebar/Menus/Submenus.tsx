import React, { useState } from 'react';
import { motion, Variants } from "framer-motion";
import { useRouter } from 'next/router';
import Icon from '../../../Icon';
import { MdChevronRight, MdOutlineCheckCircleOutline } from "react-icons/md"
import Link from 'next/link';

type Props = {
    route: any
}

const itemVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

function Submenus({ route }: Props) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="w-full mb-3"
        >
            <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full items-center justify-between text-sm inline-flex py-2 px-2 transition-colors duration-150 hover:text-green-400 hover:bg-green-100 dark:hover:text-green-200 rounded-lg focus:outline-none
                ${router.pathname?.includes(route.path) ? "text-white bg-green-300" : "text-gray-500"}`}
            >
                <div className="relative inline-flex items-center focus:outline-none" >
                    {route?.icon && <Icon className="w-6 h-6" aria-hidden="true" icon={route.icon} />}
                    <span className={route?.icon ? 'ml-2' : 'ml-4'}>{route.name}</span>
                </div>
                <motion.div
                    variants={{
                        open: { rotate: 90 },
                        closed: { rotate: 0 }
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ originY: 0.55 }}
                >
                    <MdChevronRight className='w-5 h-5' />
                </motion.div>
            </motion.button>
            <motion.ul
                variants={{
                    open: {
                        clipPath: "inset(0% 0% 0% 0% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05
                        }
                    },
                    closed: {
                        clipPath: "inset(10% 50% 90% 50% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3
                        }
                    }
                }}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
                className={isOpen ? "flex flex-col" : "hidden"}
            >
                {route.menus.map((r: any, i: any) => (
                    <motion.li
                        key={i}
                        variants={itemVariants}
                        className="w-full block py-2 transition-colors duration-150 text-sm px-2 hover:text-green-400 hover:bg-green-100 dark:hover:text-green-200 rounded-lg text-gray-500 mb-3 focus:outline-none"
                    >
                        <Link href={{ pathname: r?.url, query: r?.query }}>
                            <div className="relative w-full flex items-center " >
                                {r?.icon && <Icon className="w-6 h-6" aria-hidden="true" icon={r.icon} />}
                                <span className={`${router.pathname === r.path ? 'ml-8 text-green-300 font-bold' : r?.icon ? 'ml-2' : 'ml-8'}`}>{r.name}</span>
                                {router.pathname === r.path &&
                                    <MdOutlineCheckCircleOutline className="w-4 h-4 text-green-300 mr-2 ml-1" />
                                }
                            </div>
                        </Link>
                    </motion.li>
                ))}
            </motion.ul>
        </motion.nav>
    )
}

export default Submenus