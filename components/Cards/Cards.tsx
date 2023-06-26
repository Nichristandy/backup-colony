import React from 'react'

type Props = {
  children: React.ReactNode,
  className: string
}

export default function Cards({ children, className }: Props) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}