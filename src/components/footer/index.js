/* eslint-disable react/jsx-no-target-blank */
import './index.less'
import React from 'react'
// import friendlinkData from '../../assest/friendlinkData'
// import topicData from '../../assest/footerTopic'
// import axios from 'axios'
// import { message } from 'antd'
// import { Link } from 'react-router-dom'

const RealFooter = () => {
  return (
    <div className='footer'>
      <div className='footer-wechat'>
        {/* <img
          width='56px' height='56px' src={require('../../assest/weixin.png')}
          alt='秦皇岛市应急管理部官方微信' className='footer-wechat-img'
        /> */}
        <img
          src='/img/wechat-qrcode.jpg' alt='微信二维码'
          width='80px' height='80px'
        />
        <p>秦皇岛市应急管理部</p>
        <p>官方微信</p>
        <span className='wechat-qrcode'>
          {/* <img
            src={require('../../assest/wechat-qrcode.jpg')} alt='微信二维码'
            width='98px' height='98px'
          /> */}

        </span>
      </div>
      <div className='footer-weibo'>

        <a href='https://weibo.com/u/7269719941' target='_blank'>
          <img width='56px' height='56px' src='/img/微博.png' alt='秦皇岛市应急管理部官方微博' />
        </a>
        <p>秦皇岛市应急管理部</p>
        <p>官方微博</p>
      </div>
      <div className='footer-info'>
        <p> 主办单位：秦皇岛市应急管理局地址：秦皇岛市燕山大街109号</p>
        <p>电话：0335-3650560&nbsp;冀公网安备：13030202002230网站标识码：1303000020&nbsp;邮政编码：066001 </p>
        <p>ICP备案号：冀ICP备15003849号&nbsp;技术支持：北京安宏睿业科技有限公司</p>
      </div>
    </div>
  )
}
// const FriendLink = () => {
//   return (
//     <div className='footer-friendlink'>
//       <div className='friendlink-header'>友情链接</div>
//       <div className='friendlink-link'>
//         {
//           friendlinkData.map((item, index) => {
//             return (
//               <a alt={item.name} key={index} target='_blank' href={item.href}>
//                 {item.name}
//               </a>
//             )
//           })
//         }
//       </div>
//     </div>
//   )
// }

// const FooterTopic = () => {
//   const [topicData, setData] = useState([])
//   useEffect(() => {
//     axios.get('http://yjxt.elatis.cn/options/name/zsy-module').then((res) => {
//       if (res.data.code === 0) {
//         console.log(res.data)
//         setData(res.data.data)
//         console.log(topicData)
//       } else {
//         message.error(res.data.code)
//       }
//     })
//   }, [])
//   return (
//     <div className='footer-topic'>
//       <div className='footer-topic-header'><span>专题专栏</span></div>
//       <div className='footer-topic-content'>
//         {
//           topicData.map((item, index) => {
//             return (
//               <div className='footer-topic-item' key={index}>
//                 <Link to='/' style={{ display: 'block' }}>
//                   <img src={item.picUrl} style={{ height: '118px', width: '192px', verticalAlign: 'middle' }} />
//                 </Link>
//               </div>
//             )
//           })
//         }
//       </div>
//     </div>
//   )
// }

const Footer = () => {
  return (
    <div>
      {/* <FooterTopic />
      <FriendLink /> */}
      <RealFooter />
    </div>
  )
}
export default Footer
