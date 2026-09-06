import React from 'react'

const Button = ({ btntext, className = '', onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`py-3 px-8 bg-black text-white dark:bg-white dark:text-black font-semibold text-xs uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors cursor-pointer ${className}`}
    >
      {btntext}
    </button>
  )
}

export default Button