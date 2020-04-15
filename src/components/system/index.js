/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import "./index.less";
import { Link } from "react-router-dom";

const System = () => {
	return (
		<div className='System'>
			<div className='IntelligentSecurity'>
				<div className='IntelligentSecurity-top'><img src="/img/1.png" alt = "" className='IntelligentSecurity-bottom-img' />秦皇岛市智慧安监</div>
				<div className='IntelligentSecurity-middle' />
				<div className='IntelligentSecurity-bom'>
					<a    href='http://111.63.38.37:9000/qhdsafety/login/login.jsp' target='_blank' className='IntelligentSecurity-bottom' style={{ marginLeft: "10px", marginRight: "43px" }}>管理端</a>
					<a href='http://111.63.38.37:9000/qhdcorp/login/login.jsp' target='_blank' className='IntelligentSecurity-bottom' style={{ marginRight: "43px" }}>企业端</a>
					<a href='http://yjgl.qhd.gov.cn/login/logon' target='_blank' className='IntelligentSecurity-bottom'>网站后台</a>
				</div>
			</div>
			<div className='Enforcement'>
				<Link  to = "/index/links" className='Enforcement-top'><img src="/img/2.png" className='IntelligentSecurity-bottom-img' alt = "" />应用系统</Link>
			</div>
			<div className='Note'>
				<Link to = "/index/services" className='Note-top'><img  alt = "" src="/img/3.png" className='IntelligentSecurity-bottom-img' />留言栏</Link>
			</div>
		</div>
	);
};
export default System;
