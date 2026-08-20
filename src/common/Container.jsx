import React from 'react'

const Container = ({children, className}) => {
  return (
    <div className={`${className} m-auto w-330`}>{children}</div>
  )
}

export default Container