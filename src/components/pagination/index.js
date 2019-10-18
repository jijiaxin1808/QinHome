import React from 'react'
import { Pagination as P } from 'antd'
import Messages from './messages'
import './index.less'

export default function Pagination (props) {
  return (
    <div>
      <Messages />
      <P
        hideOnSinglePage
        onChange={onChange}
        defaultCurrent={1}
        defaultPageSize={20}
        total={200}
        showQuickJumper
      />
    </div>
  )
}

function onChange (page) {
  console.log(page)
}
