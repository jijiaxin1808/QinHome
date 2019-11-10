/* eslint-disable linebreak-style */

import React from "react";
import { Table} from "antd";
import "./index.less";
export const Search = (props)=> {
	return (
		<div>
			<Table columns={props.columns} dataSource={props.dataSource} style={{width:"800px",paddingTop:"30px"}} showQuickJumper = {}/>  
		</div>
	);
};
export const Message = (props)=> {
	console.log(props);
	return (
		<div className="zx-message">
			<div className="zx-message-main">
				<p className="one">留言标题</p>
				<p className="second">{props.data.title}</p>
			</div>
			<div className="zx-message-main">
				<p className="one">留言消息</p>
				<p className="second">{props.data.content}</p>
			</div>
			<div className="zx-message-main">
				<p className="one"> 回复消息</p>
				<p className="second">{props.data.title?props.data.title:null}</p>
			</div>
		</div>
	);
};