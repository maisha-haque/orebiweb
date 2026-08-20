import React from 'react'

const Badge = ({badgeText, className}) => {
  return (
    <div className={`py-3 px-8 bg-black text-[14px] text-white font-sans uppercase w-23 ${className}`}>{badgeText}</div>
  )
}

export default Badge