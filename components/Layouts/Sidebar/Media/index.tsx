import React, { Dispatch, SetStateAction, useMemo } from 'react';
import Sideleft from './Sideleft';
import Sideright from './Sideright';

type Props = {
    sidebar: boolean,
    setSidebar: Dispatch<SetStateAction<boolean>>
    position?: string | "right" | "left";
    children: any
}

function SidebarMedia({ sidebar, setSidebar, children, position }: Props) {

    const positions = useMemo(() => {
        if (position === 'right') {
            return true;
        }
        return false;
    }, [position])

    return (
        <React.Fragment>
            <Sideleft
                isOpen={!positions}
                sidebarOpen={sidebar}
                setSidebarOpen={setSidebar}
            >
                {children}
            </Sideleft>
            <Sideright
                isOpen={positions}
                sidebarOpen={sidebar}
                setSidebarOpen={setSidebar}
            >
                {children}
            </Sideright>
        </React.Fragment>
    )
}

export default SidebarMedia