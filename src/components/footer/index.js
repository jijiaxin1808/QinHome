import "./index.less";
import React from "react";

const Footer = () => {
	return (
		<div>
			<div className='footer'>
				<div>
					<a href="http://bszs.conac.cn/sitename?method=show&id=082080304EE01E77E053012819AC76B5" target = "_blank">
						<img src={require("../../../public/img/稿定设计导出-20191018-103434.png")} alt = ""/>	
					</a>
				</div>
				<div className='footer-info'>
					<p>主办单位：秦皇岛市应急管理局  地址：秦皇岛市燕山大街109号</p>
					<p>电话： 0335-3650560  <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13030202002230"  target = "_blank"
						style={{fontSize:"15px",
							color: "#FFFFFF"
						}}><img src = "http://yjgl.hebei.gov.cn/portal/resources/images/nationalEmblem.png" width = "20px" height = "20px" target = "_blank"alt = ""/> 冀公网安备： 13030202002230</a>
					<br/>网站标识码： 1303000020  邮政编码： 066001 
					</p>
					<p><a href="http://www.beian.miit.gov.cn/state/outPortal/loginPortal.action" target = "_blank"
						style={{fontSize:"15px",
							color: "#FFFFFF"
						}}>ICP备案号： 冀ICP备15003849号</a>  技术支持： 秦皇岛昊锐科技有限公司</p>
				</div>
				<div className='footer-wechat'>
					<img
						src='/img/wechat-qrcode.jpg' alt='微信二维码'
						width='80px' height='80px'
					/>
					<p>秦皇岛市应急管理局</p>
					<p>官方微信</p>
					<span className='wechat-qrcode'>
					</span>
				</div>
				<div className='footer-weibo'>
					<a href='https://weibo.com/u/7269719941' target='_blank'>
						<img width='56px' height='56px' src='/img/微博.png' alt='秦皇岛市应急管理部官方微博' />
					</a>
					<p>秦皇岛市应急管理局</p>
					<p>官方微博</p>
				</div>
		</div>
	</div>
	);
};

export default Footer;
