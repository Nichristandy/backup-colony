import React from 'react';
import { IconType } from 'react-icons';

interface IconProps extends React.SVGAttributes<SVGElement> {
    icon: IconType;
    className?: string;
}

const Icon = ({ icon, ...props }: IconProps) => {
    const Icon : IconType = icon;
    return <Icon {...props} />
};

export default Icon;
