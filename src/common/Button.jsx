import React from 'react'

const Button = ({btntext, className}) => {
  return (
    <button className={`py-2.5 px-9 bg-black text-white cursor-pointer ${className}`}>{btntext}</button>
  )
}

export default Button