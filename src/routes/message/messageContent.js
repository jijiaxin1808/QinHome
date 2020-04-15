import React, { useEffect, useState } from "react";
import { Pagination, Skeleton } from "antd";
import { connect } from "dva";
import { Link } from "react-router-dom";
import "./index.less";
import axios from "axios";

const MessageContent = (props)=> {
	const limit = 15;
	const [ data, setData ] = useState([]);
	const [total, setTotal ] =useState();
	const [oneMessage, setOneMessage] = useState();
	useEffect(()=> {
		// const params = {
		// 	status: "publish",
		// 	flag: 1,
		// 	limit: limit,
		// 	first: props.category.split("/")[1],
		// 	second: props.category.split("/")[2]
		// };
		axios({
			method: "GET",
			url: "http://yjxt.elatis.cn/posts/listPosts",//这里触发了两次
			params: {
				status: "publish",
				flag: 1,
				limit: limit,
				offset: 0,
				first: props.category.split("/")[1],
				second: props.category.split("/")[2]
			}
		}).then(res=> {
			if(res.data.code === 0) {
				setTotal(res.data.total);
				if(res.data.data[0] === "empty") {
					setData("empty");
				}
				else {
					if(res.data.data.length===1){
						axios({
							method: "GET",
							url: "http://yjxt.elatis.cn/posts/get",
							params: {
								id:res.data.data[0].id
							}
						}).then((res)=> {
							setOneMessage(res.data);
						});
					}
					setData(res.data.data);
				}
			}
		});	

	},[props]);
	const onChange = (page, pageSize)=> {

		
		if(props.home.columnData.length!==0) {
			// const params = {
			// 	status: "publish",
			// 	limit: limit,
			// 	flag: 1,
			// 	offset: (page-1)*limit,
			// 	first: props.category.split("/")[1],
			// 	second: props.category.split("/")[2]
			// };
			axios({
				method: "GET",
				url: "http://yjxt.elatis.cn/posts/listPosts",
				params: {
					status: "publish",
					limit: limit,
					flag: 1,
					offset: (page-1)*limit,
					first: props.category.split("/")[1],
					second: props.category.split("/")[2]
				}
			}).then(res=> {
				if(res.data.code === 0) {
					setData(res.data.data);
				}
			});
		}
	};
	if(data === "empty") {
		return (
			<div className = "message-none">
				当前模块没有文章
			</div>
		);
	}
	else if(data.length !== 0&&total){
		if(data.length===1) {
			if(oneMessage) {
				return (
					<div className = "oneMessage" >
						{<p dangerouslySetInnerHTML={{ __html:oneMessage.data.content}}  />}
					</div>
				);
			}
			else return (
				<Skeleton />
			);

		}
		else {
			return (
				<div className = "message-maincontent">
					<ul className = "message-ul" style  = {{minHeight : "500px"}}>
						{
							data.map((item,index)=> {
								return (
									<li className = "message-maincontent-li">
										<Link to = {`/index/article?id=${item.id}`} className = "message-article"> 
											<p>{item.title}</p> <span>{item.updated_at.slice(0,10)}</span>
										</Link>
									</li>
								);
			
							})
						}
					</ul>
					<Pagination  onChange={onChange} defaultCurrent={1}
						defaultPageSize={limit} total={total} showQuickJumper  />
				</div>
			);
		}
	}
	else {
		if(data === "empty") {
			return (
				<div className = "message-none">
					当前模块没有文章
				</div>
			);
		}
		return (
			<Skeleton />
		);
	}
};
export default connect(({home})=>({home}))(MessageContent);