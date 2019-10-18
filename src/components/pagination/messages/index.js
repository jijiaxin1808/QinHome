import React, { useState } from 'react'
import './index.less'
import { Link } from 'react-router-dom'

export default function Messages () {
  const [messages] = useState([
    '安全生产',
    '安全生产',
    '安全生产',
    '安全生产',
    '安全生产',
    '安全生产',
    '安全生产',
    '安全生产',
    '安全生产',
    '安全生产',
    '安全生产',
    '安全生产',
    '安全生产',
    '安全生产',
    '安全生产',
    '安全生产',
    '安全生产',
    '安全生产',
    '安全生产',
    '安全生产'
  ])
  return (
    <ul className='message-list'>
      {
        messages.map((item, index) => {
          return (
            <li key={index}>
              {/* {`·  ${index + 1}`} */}·
              <Link to='/article?id=asdsa'>
                {`${item}`}
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}
