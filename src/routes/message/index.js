import React, { useState, useEffect } from "react";
import "./index.less";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination";
import urlHandle from "../../config/urlHandle";
import { connect } from "dva";
import { Skeleton } from "antd";
// const messageData = [
// 	{
// 		key: "1",
// 		title: "首页",
// 		state: true,
// 		link: "/",
// 		weight: 100,
// 		sec: [
// 			{
// 				key: "1",
// 				title: "二级1"
// 			},
// 			{
// 				key: "2",
// 				title: "二级1"
// 			}
// 		]
// 	},
// 	{
// 		key: "2",
// 		title: "新闻中心",
// 		state: true,
// 		link: "/news",
// 		weight: 101,
// 		sec: [
// 			{
// 				key: "1",
// 				title: "二级1"
// 			},
// 			{
// 				key: "2",
// 				title: "二级1"
// 			}
// 		]
// 	},
// 	{
// 		key: "3",
// 		title: "政府公开",
// 		state: true,
// 		weight: 102,
// 		link: "/message?type=3",
// 		sec: [
// 			{
// 				key: "1",
// 				title: "二级1"
// 			},
// 			{
// 				key: "2",
// 				title: "二级1"
// 			}
// 		]
// 	},
// 	{
// 		key: "4",
// 		title: "安全生产",
// 		state: true,
// 		link: "/message?type=4",
// 		weight: 103,
// 		sec: [
// 			{
// 				key: "1",
// 				title: "二级1"
// 			},
// 			{
// 				key: "2",
// 				title: "二级1"
// 			}
// 		]
// 	},
// 	{
// 		key: "5",
// 		title: "防灾减灾",
// 		state: true,
// 		link: "/message?type=5",
// 		weight: 104,
// 		sec: [
// 			{
// 				key: "1",
// 				title: "二级1"
// 			},
// 			{
// 				key: "2",
// 				title: "二级1"
// 			}
// 		]
// 	},
// 	{
// 		key: "6",
// 		title: "应急救援",
// 		weight: 105,
// 		state: true,
// 		link: "/message?type=6",
// 		sec: []
// 	},
// 	{
// 		key: "7",
// 		title: "党建工作",
// 		weight: 106,
// 		state: true,
// 		link: "/message?type=7",
// 		sec: []
// 	},
// 	{
// 		key: "8",
// 		title: "社会化服务",
// 		weight: 107,
// 		state: true,
// 		link: "/message?type=8",
// 		sec: []
// 	}
// ];

const  Message = (props) => {
	// const type = props.location.search.split('=')[1]
	const [id, setId] = useState(1);// 这里用于区别一级页面
	const [type, setType] = useState(1);// 这里用于区别二级页面
	const [ messageData, setmessageData ] = useState("");
	console.log("href",props);
	useEffect(() => {
		props.home.columnData&&setmessageData(props.home.columnData);
		console.log(props.home.columnData)
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
						<Pagination />
					</div>
				</div>
			</div>);
	}
	else return <Skeleton/>;
};


export default connect(({home})=>({home}))(Message);