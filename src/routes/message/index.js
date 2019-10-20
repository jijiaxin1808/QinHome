import React, { useState, useEffect } from "react";
import "./index.less";
import { Link } from "react-router-dom";
// import Pagination from "../../components/pagination";
import MessaegeContent from "./messageContent";
import urlHandle from "../../config/urlHandle";
import { connect } from "dva";
import { Skeleton } from "antd";
import axios from "axios";
const  Message = (props) => {
	// const type = props.location.search.split('=')[1]
	const [id, setId] = useState(1);// 这里用于区别一级页面
	const [type, setType] = useState(1);// 这里用于区别二级页面
	const [ messageData, setmessageData ] = useState("");
	const [ contentData, setContentData ] = useState("");
	console.log("href",props);
	
	useEffect(() => {
		props.home.columnData&&setmessageData(props.home.columnData);
		axios({
			method: "GET",
			url: "http://yjxt.elatis.cn/posts/listPosts",
			params: {
				status: "draft",
				limit: 5,
				offset: 0,
				Category: `/${props.home.columnData[type].title}/${props.home.columnData[type].sec[id].title}`
			}
		}).then(res=> {
			if(res.data.code === 0) {
				console.log(res.data.data);
			}
		});
		urlHandle("id")&&setId(urlHandle("id"));
		setType(urlHandle("type"));
		console.log(urlHandle("id"),"aaa", urlHandle("type"));
	}, [props]);// 初始化一级页面和二级页面标记   这里监控props的变化了  可能会有bug！！！！！！！
	if(type&&messageData) {
		return (
			<div className='message'>
				<div className='message-header'>
					<i />
					<span>您当前的位置: </span>
					<Link to='/'>
                        首页&nbsp;>
					</Link>
					<Link to={`/message?type=${type}`}>
						{messageData[type - 1].title}>
					</Link>
					<span>
						{messageData[type - 1].sec[id - 1] && messageData[type - 1].sec[id - 1].title}
					</span>
					<span className='message-header-paper' />
				</div>
				<div className='message-content'>
					<div className='message-sidebar'>
						<ul>
							{
								messageData[type - 1].sec.map((item, index) => {
									return (
										<li key={index}>
											<Link to={`/index/message?type=${type}&id=${index + 1}`} className={id === item.key ? "clicked" : ""}>
												{item.title}
											</Link>
										</li>
									);
								})
							}
						</ul>
					</div>
					<div className='message-maincontent'>
						<div className='message-maincontent-header'>
							<span>
								{messageData[type - 1].sec[id - 1] ? messageData[type - 1].sec[id - 1].title : messageData[type - 1].title}
							</span>
						</div>
						<MessaegeContent  id = {id} type = {type}   />

					</div>
				</div>
			</div>);
	}
	else return <Skeleton/>;
};
export default connect(({home})=>({home}))(Message);