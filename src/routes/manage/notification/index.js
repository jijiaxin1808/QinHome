import React from "react";
import { Table, Button, message } from "antd";
// import axios from "axios";
import { useEffect, useState } from "react";
// import qs from "qs";
import * as Back from "../../../api/Back";

const columns = [	
	{
		title: "操作人",
		dataIndex: "name",
		key: "name",
	},

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
	const data = {
		id:id,
		status: "publish"
	};
	Back.alter(data)
	.then((res)=> {
		if(res.data.code === 0) {
			message.success("确认发布成功");
		}
	});
};


const handleFunc = (handle,id)=>{
	if(handle === "确认发布") {
		return(
			<Button onClick = {()=>{ publish(id);}}>
        确认修改
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
		},
		getCheckboxProps: record => ({
			disabled: record.name === "Disabled User", // Column configuration not to be checked
			name: record.name,
		}),
	};
	const markAsRead = ()=> {
		selectedid.map((item)=>{
			let data = {
				status:1,
				id:item
			};
			Back.alterReadStatus(data)
			.then(
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
	const deleteSet = ()=> {
		
		let data = {
			idArray:selectedid
		};
		Back.messagesDelete(data)
		.then(
			(res)=> {
				if(res.data.code === 0) {
					message.success("删除成功");
					window.location.reload();
				}
				else {
					message.error(res.data.message);
				}
			}
		);

	};




	const markAsUnRead = ()=> {
		selectedid.map((item) =>{
			let data = {
				status:0,
				id:item
			};
			Back.alterReadStatus(data)
			.then(
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
		Back.getPageInfo()
		.then(
			(res)=> {
				if(res.data.code === 0) {
					setmessageData(res.data.data);
				}
				else {
					message.error(res.data.message,"message");
				}
			}
		).catch((error)=>{
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
				<Button  onClick = {()=>{deleteSet();}} className = {"button"} >
				批量删除
				</Button>
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