import React, { useState, useEffect } from "react";
import "./index.less";
import { Link } from "react-router-dom";
// import Pagination from "../../components/pagination";
import MessaegeContent from "./messageContent";
import urlHandle from "../../config/urlHandle";
import { connect } from "dva";
import { Skeleton } from "antd";
const  Message = (props) => {
	// const type = props.location.search.split('=')[1]
	const [id, setId] = useState(1);// 这里用于区别一级页面
	const [type, setType] = useState(1);// 这里用于区别二级页面
	// const [ messageData, setmessageData ] = useState("");
	// eslint-disable-next-line no-unused-vars
	const [ contentData, setContentData ] = useState([]);

	useEffect(()=> {
		if(urlHandle("id")) {
			setId(urlHandle("id"));
		}
		else {
			setId(1)
		}
		setType(urlHandle("type"));
	},[props]);
	useEffect(()=> {	
	},[id,type,props]);
	if(type&&props.home.columnData.length!==0&&type!==1) {
		console.log("当前初始化数据",contentData);
		return (
			<div className='message'>
				<div className='message-header'>
					<i />
					<span>您当前的位置: </span>
					<Link to='/'>
                        首页&nbsp;>
					</Link>
					<Link to={`/message?type=${type}`}>
						{props.home.columnData[type-1 ].title}>
					</Link>
					<span>
						{props.home.columnData[type-1].sec[id-1 ] && props.home.columnData[type - 1].sec[id - 1].title}
					</span>
					<span className='message-header-paper' >{props.home.columnData[type-1 ].title}</span>
				</div>
				<div className='message-content'>
					<div className='message-sidebar'>
						<ul>
							{
								props.home.columnData[type-1].sec.map((item, index) => {
									if(props.home.columnData[type-1].sec.length>1||props.home.columnData[type-1].title!==props.home.columnData[type-1].sec[0].title) {
										return (
											<li key={index}>
												<Link to={`/index/message?type=${type}&id=${index + 1}`} className={id === item.key ? "clicked" : ""}>
													{item.title}
												</Link>
											</li>
										);
									}
									return null;
								})
							}
						</ul>
					</div>
					<div className='message-maincontent'>
						<div className='message-maincontent-header'>
							<span>
								{props.home.columnData[type - 1].sec[id - 1] ? props.home.columnData[type - 1].sec[id - 1].title : props.home.columnData[type - 1].title}
							</span>
						</div>
						<MessaegeContent  id = {id} type = {type} defaultdata = {contentData}  
							category = { `/${props.home.columnData[type-1].title}/${props.home.columnData[type-1].sec[id-1].title}`} />
					</div>
				</div>
			</div>);
	}
	else return <Skeleton/>;
};
export default connect(({home})=>({home}))(Message);