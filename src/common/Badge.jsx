import React from 'react'

const Badge = ({ badgeText, className = '' }) => {
  if (!badgeText) return null;
  return (
    <span className={`inline-block px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider shadow-sm text-center ${className}`}>
      {badgeText}
    </span>
  )
}

export default Badge