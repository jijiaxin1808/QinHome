import React from 'react'
import { Pagination as P } from 'antd'
import './index.less'

export default function Pagination(props) {
  return (
    <div>
      <P {...props}/>
    </div>
  )
}


