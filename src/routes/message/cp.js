import React from 'react'
import Message from './index'
const messageData = {
  sideBar: [
    {
      title: '党建服务',
      type: ' djfu',
      href: '/cp?type=djfu'
    }
  ]
}
const CpMessage = (props) => {
  return (
    <Message messageData={messageData} location={props.location} />
  )
}
export default CpMessage
