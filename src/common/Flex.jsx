import React from 'react'

const Flex = ({children,className }) => {
  return (
    <div className={`${className} flex items-center justify-between`}>{children}</div>
  )
}

export default Flex