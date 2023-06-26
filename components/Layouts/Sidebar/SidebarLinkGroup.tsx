import React, { useState } from 'react';

type Props = {
    children: any,
    activeCondition: boolean
}

const SidebarLinkGroup = ({ children, activeCondition, ...props }: Props) => {
    const [open, setOpen] = useState(activeCondition)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <li {...props}>
            {children(handleClick, open)}
        </li>
    )
}

export default SidebarLinkGroup;
