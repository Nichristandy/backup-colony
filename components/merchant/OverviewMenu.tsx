import { useState } from "react";
import React from 'react'
import Overview from "./Overview";
import Display from "./Display";
import Transaction from "./Transaction";

const OverviewMenu = () => {

    const [activeComponent, setActiveComponent] = useState<string>('');
    const [isActive, setIsActive] = useState(true);

    const handleClick = (componentName: string) => {
      setActiveComponent(componentName);
    };

  return (
    <div>
        <div className="hidden md:flex flex-row justify-between items-center">
            <ul className="flex items-center w-full border-b-2 text-white">
                <li onClick={() => handleClick('Overview')} className="mx-2 font-bold active:border-b-[#5F59F7] p-2 hover:text-[#5F59F7] hover:border-b-[#5F59F7]">
                    <span>Overview</span>
                </li>
                <li onClick={() => handleClick('Display')} className="mx-2 font-bold active:border-b-[#5F59F7] p-2 hover:text-[#5F59F7] hover:border-b-[#5F59F7]">
                    <span>Menu Display</span>
                </li>
                <li onClick={() => handleClick('Transaction')} className="mx-2 font-bold active:border-b-[#5F59F7] p-2 hover:text-[#5F59F7] hover:border-b-[#5F59F7]">
                    <span>Transaction History</span>
                </li>
            </ul>
        </div>
        <div>
            {activeComponent === 'Overview' && <Overview/>}
            {activeComponent === 'Display' && <Display/>}
            {activeComponent === 'Transaction' && <Transaction/>}
        </div>

    </div>
  )
}

export default OverviewMenu;