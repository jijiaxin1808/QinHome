import React from "react";
// import styles from "./index.css";
import { Table, Button, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import qs from "qs";
// import messageData from "../../../assets/messageData";
const columns = [	
	{
		title: "操作人",
		dataIndex: "name",
		key: "name",
	},
	// {
	//   title: '内容',
	//   dataIndex: 'content',
	//   key: 'content',
	// },
	{
		title: "说明",
		dataIndex: "explain",
		key: "explain",
	},
	{
		title: "阅读状态",
		dataIndex: "status",
		key: "status",
		render:isRead=>(
			<p>{ isRead?"已读":"未读" }</p>
		)
	},
	{
		title: "操作",
		key: "operation",
		dataIndex: "operation",
		render: (text,record)=>(
			<span>
				{
					handleFunc(record.operation,record.post_id)
				}
			</span>
		)
	},
	{
		title: "时间",
		key: "created_at",
		dataIndex:"created_at"
	},
];




const publish = (id)=> {
	const data1 = JSON.stringify({id:id, status: "publish"});
	axios({
		method: "post",
		url: "http://yjxt.elatis.cn/posts/alter",
		headers:{
			"token":localStorage.getItem("token"),
			"Content-Type":"application/json"
		},
		data: data1
	}).then((res)=> {
		if(res.data.code === 0) {
			message.success("确认发布成功");
		}
	});
};


const handleFunc = (handle,id)=>{
	if(handle === "确认发布") {
		return(
			<Button onClick = {()=>{ publish(id);}}>
        确认发布
			</Button>
		);
	}
	else return (
		<div>无可用操作</div>
	);
};



const Message = ()=> {
	const [ messageData,setmessageData ] = useState([]);
	const [ selectedid,setselectedid ] = useState([]);

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			const  selectedId = selectedRows.map((item)=>{
				return item.id;
			});
			setselectedid(selectedId);
			console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedId );
		},
		getCheckboxProps: record => ({
			disabled: record.name === "Disabled User", // Column configuration not to be checked
			name: record.name,
		}),
	};
	const markAsRead = ()=> {
		// console.log("标记为已读");
		selectedid.map((item)=>{
			let data = qs.stringify({
				status:1,
				id:item
			});
			axios({
				method: "POST",
				url: "http://yjxt.elatis.cn/messages/alterReadStatus",
				headers:{
					"token":localStorage.getItem("token"),
					"Content-Type": "application/x-www-form-urlencoded"
				},
				data:data
			}).then(
				(res)=> {
					if(res.data.code === 0) {
						message.success("修改成功");
					}
					else {
						message.error(res.data.message);
					}
				}
			);
			return null;
		});
	};
	const markAsUnRead = ()=> {
		// console.log("标记为未读");
		selectedid.map((item) =>{
			let data = qs.stringify({
				status:0,
				id:item
			});
			axios({
				method: "POST",
				url: "http://yjxt.elatis.cn/messages/alterReadStatus",
				headers:{
					"token":localStorage.getItem("token"),
					"Content-Type": "application/x-www-form-urlencoded"
				},
				data:data
			}).then(
				(res)=> {
					if(res.data.code === 0) {
						message.success("修改成功");
            
					}
					else {
						message.error(res.data.message);
					}
				}
			);
			return null;
		});
	};

	useEffect(()=>{
		axios({
			method:"GET",
			url:"http://yjxt.elatis.cn/messages/getPageInfo",
			headers: {
				token:localStorage.getItem("token")
			}
		}).then(
			(res)=> {
				if(res.data.code === 0) {
					setmessageData(res.data.data);
					console.log(res.data.data);
				}
				else {
					message.error(res.data.message,"message");
				}
			}
		).catch((error)=>{
			console.log(error);
		});
	},[]);
  

	return(
		<div>
			<div className = { "title" }>
				<span>
                 消息通知
				</span>
			</div>
			<div className = {"buttonSbar"}>
				<Button  onClick = {()=>{markAsRead();}} className = {"button"} >
                标记为已读
				</Button>
				<Button onClick = {()=>{markAsUnRead();}} className = {"button"}>
                标记为未读
				</Button>
			</div>
			<Table columns={columns} dataSource={messageData}  rowSelection={rowSelection} pagination = {false}/>
		</div>
	);
};
export default Message;