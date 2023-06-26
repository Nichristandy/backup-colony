import React, { Dispatch, SetStateAction } from 'react';
import DekstopComponent from './DekstopComponent';
import { MenuProps } from '../../../utils/routes';

type Props = {
    sidebar: boolean;
    setSidebar: Dispatch<SetStateAction<boolean>>;
    menus: MenuProps[];
    className?: string;
    token?: any;
    defaultImage?: string;
    isSelectProperty?: boolean
}

function SidebarComponent({ sidebar, setSidebar, menus, className, token, defaultImage, isSelectProperty }: Props) {

    return (
        <React.Fragment>
            <DekstopComponent
                menus={menus}
                sidebar={sidebar}
                setSidebar={setSidebar}
                className={className}
                token={token}
                defaultImage={defaultImage}
                isSelectProperty={isSelectProperty}
            />
        </React.Fragment>
    )
}

export default SidebarComponent