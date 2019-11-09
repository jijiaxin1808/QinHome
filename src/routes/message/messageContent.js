import React, { useEffect, useState } from "react";
import { Pagination, Skeleton } from "antd";
import { connect } from "dva";
import { Link } from "react-router-dom";
import "./index.less";
import axios from "axios";

const MessageContent = (props)=> {
	// const isShow = (item)=> {
	// 	// console.log("当前文章发布状态")
	// 	return item.status === "publish";
	// };
	const limit = 15;
	const [ data, setData ] = useState([]);
	const [total, setTotal ] =useState();
	useEffect(()=> {
		axios({
			method: "GET",
			url: "http://yjxt.elatis.cn/posts/listPosts",//这里触发了两次
			params: {
				status: "publish",
				flag: 1,
				limit: limit,
				offset: 0,
				category: props.category
			}
		}).then(res=> {
			if(res.data.code === 0) {
				console.log(props.category,"当前分类初始化了",res.data.data,"ssss");
				setTotal(res.data.total);
				if(res.data.data[0] === "empty") {
					
					console.log("当前栏目没有文章");
					setData("empty");
				}
				else {
					setData(res.data.data);
				}
			}
		});	

	},[props]);


	const onChange = (page, pageSize)=> {
		props.home.columnData.length!==0&&axios({
			method: "GET",
			url: "http://yjxt.elatis.cn/posts/listPosts",
			params: {
				status: "publish",
				limit: limit,
				flag: 1,
				offset: (page-1)*limit,
				category: props.category
			}
		}).then(res=> {
			if(res.data.code === 0) {
				setData(res.data.data);
			}
		});
	};
	if(data === "empty") {
		return (
			<div className = "message-none">
				当前模块没有文章
			</div>
		);
	}
	else if(data.length !== 0&&total){
		// console.log("total:" ,total,"data: ",data)

		return (
			<div className = "message-maincontent">
				<ul className = "message-ul" style  = {{minHeight : "500px"}}>
					{
						data.map((item,index)=> {
							return (
								<li className = "message-maincontent-li">
									<Link to = {`/index/article?id=${item.id}`} className = "message-article"> 
										{item.title}
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
	else {
		if(data === "empty") {
			return (
				<div className = "message-none">
					当前模块没有文章
				</div>
			);
		}
		console.log("total:" ,total,"data: ",data);
		return (
			<Skeleton />
		);
	}
};
export default connect(({home})=>({home}))(MessageContent);