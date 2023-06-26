"use client"

import React from 'react';

interface TooltipProps {
    children?: JSX.Element | string | null | undefined;
    tooltip?: JSX.Element | string | null | undefined;
    className?: string;
    classTooltip?: string;
    position?: string | "top" | 'bottom' | 'left' | 'right';
    color?: string | "dark" | "light";
}

const Tooltip: React.FC<TooltipProps> = ({ 
    children, 
    className = '', 
    classTooltip, 
    position = "top", 
    color = "dark", 
    tooltip
}) => {
    // const { children, className, classTooltip, position, color, tooltip } = props;
    return (
        <div className={'tooltip cursor-pointer' + className}>
            {children}
            <span 
                data-position={position} 
                data-color={color} 
                className={'tooltiptext ' + classTooltip}>{tooltip}</span>
        </div>
    );
};

export default Tooltip;