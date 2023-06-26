import React, { useEffect, useState } from 'react';

type Props = {
    children: React.ReactNode,
    className: string,
    variant: string,
    type: any,
    onClick: any
}

const Button = (props: any) => {
    const { children, variant, className } = props;
    const [variants, setVariants] = useState("")
    // variant 
    // primary, secondary, danger, outline
    const primary = "bg-primary text-white";
    const primaryOutline = "border border-primary text-primary";
    const primaryOutlineNone = "text-primary";
    const secondary = "bg-secondary text-white";
    const secondaryOutline = "border border-secondary text-secondary";
    const secondaryOutlineNone = "text-secondary";
    const danger = "bg-danger text-white";
    const dangerOutline = "border border-danger text-danger";
    const dangerOutlineNone = "text-danger";

    useEffect(() => {
        if (variant === "primary") setVariants(primary)
        else if (variant === "primary-outline") setVariants(primaryOutline)
        else if (variant === "primary-outline-none") setVariants(primaryOutlineNone)
        else if (variant === "secondary") setVariants(secondary)
        else if (variant === "secondary-outline") setVariants(secondaryOutline)
        else if (variant === "secondary-outline-none") setVariants(secondaryOutlineNone)
        else if (variant === "danger") setVariants(danger)
        else if (variant === "danger-outline") setVariants(dangerOutline)
        else if (variant === "danger-outline-none") setVariants(dangerOutlineNone)
        else setVariants("");
    }, [variant])


    return (
        <button
            {...props}
            className={`${variants} inline-flex gap-2.5 items-center justify-center py-2 px-4 text-center hover:bg-opacity-90 ${className} ${props?.disabled ? "opacity-25" : ""}`}
        >
            {children}
        </button>
    )
}

export default Button