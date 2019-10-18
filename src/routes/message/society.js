import React from 'react'
import Message from './index'
const messageData = {
  sideBar: [
    {
      title: '服务项目',
      type: 'fuxm',
      href: '/society?type=fuxm'
    }, {
      title: '安全评价机构',
      type: 'aqpjjg',
      href: '/society?type=aqpjjg'
    }, {
      title: '检测检验机构',
      type: 'jcjjjg',
      href: '/society?type=jcjjjg'
    }, {
      title: '安全培训机构',
      type: 'aqpxjg',
      href: '/society?type=aqpxjg'
    }, {
      title: '专家库',
      type: 'zjk',
      href: '/society?type=zjk'
    }
  ]
}
const SocietyMessage = (props) => {
  return (
    <Message messageData={messageData} location={props.location} />
  )
}
export default SocietyMessage
