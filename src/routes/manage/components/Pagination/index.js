import React from 'react'
import { Pagination as P } from 'antd'

export default function Pagination(props) {
  return (
      <div className="p">
        <P {...props}/> 
      </div>
  )
}

