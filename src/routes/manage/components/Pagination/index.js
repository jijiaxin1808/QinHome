import React from 'react'
import { Pagination as P } from 'antd'
import styles from "./index.css";

export default function Pagination () {
  return (
      <div className="p">
        <P
          className={styles.pagination}
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
