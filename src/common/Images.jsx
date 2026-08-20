import React from 'react'

const Images = ({imgSrc, imgAlt, className}) => {
  return (
    <img src={imgSrc} alt={imgAlt} className={`${className}`}/>
  )
}

export default Images