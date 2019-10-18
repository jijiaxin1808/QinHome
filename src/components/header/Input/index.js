import React from 'react'
import './index.less'

export default function Input () {
  return (
    <div className='search'>
      <form id='search' method='post' action='/'>
        <input placeholder='搜索' />
        <a className='search-btn'>
          <img src={require('../../../assest/fangdajingcopy.png')} />
        </a>
      </form>
    </div>
  )
}
