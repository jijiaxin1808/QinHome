import React, { useState,useEffect } from "react";
import "./index.less";
import axios from "axios";
import { Table, Divider, Tag, Button, Modal, message, Skeleton } from "antd";
import urlHandle from "../../../config/urlHandle";
const  DeleteArticle  = (props)=> {
	const [ visible, setVisible ] = useState(false);
	const showModal = () => {
		setVisible(true);
	};

	const handleOk = e => {
		setVisible(false);
		console.log("确认删除");
		axios({
			method:"GET",
			url: "http://yjxt.elatis.cn/posts/delete",
			params: {
				id:props.id
			},
			Headers: {
				"token":localStorage.getItem("token"),
				"Content-Type": "application/json"
			}
		}).then(res=> {
			if(res.data.code === 0 ) {
				message.success("删除成功");
			}
			else {
				message.warn(res.data.message);
			}
		});

	};

	const handleCancel = e => {
		setVisible(false);
	};

	return (
		<div>
			<Button  onClick={()=>{showModal();}}>
          删除
			</Button>
			<Modal
				visible={visible}
				onOk={()=>{handleOk();}}
				onCancel={()=>{handleCancel();}}
				okText = "确认"
				cancelText = "取消"
			>
				<p>确认删除?</p>
			</Modal>
		</div>
	);
  
};

const alterAricle = (id)=> {
	console.log(id);
	window.location.href = `/manage/change/${id}`;
};
const BmsSearch = (props)=> {
	const [ data, setData ] = useState([]);
	const [ key,setkey ] = useState(decodeURIComponent(urlHandle("key")));
	const columns = [
	  {
			title: "id",
			dataIndex: "id",
			key: "id",
	  },
	  {
			title: "文章名称",
			dataIndex: "title",
			key: "title",
	  },
	  {
			title: "发布部门",
			dataIndex: "category",
			key: "category",
	  },
	  {
			title: "日期",
			key: "created_at",
			dataIndex: "created_at"
	  },
	  {
			title: "页面状态",
			key: "action",
			dataIndex:"action"
	  },{
			title: "操作",
			key: "action",
			dataIndex:"action",
			render: (text,record) => (
				<Button onClick = {()=>{alterAricle(record.id);}}>修改文章</Button>
			)
		},{
			title: "删除",
			key: "action",
			dataIndex:"action",
			render: id=> (
				<DeleteArticle  id = {id}>删除文章</DeleteArticle>
			)

		},
	];
	useEffect(()=>{
		if(key.length !== 0 ){
			axios({
				method:"GET",
				url: "http://yjxt.elatis.cn/posts/searchTitle",
				params: {
					flag: 2,
					key : key
				}
			}).then(res=> {
				if(res.data.code === 0) {
					console.log("长度",res.data.data.length);
					if(res.data.data.length ==0) {
						setData("empty");
						console.log("empty");
					}
					else {
						setData(res.data.data);
					}
				}
			});
		}
	},[props]);
	if(data === "empty") {
		return (
			<div className = "message-none">
			没有搜索结果
			</div>
		);
	}
	else if(data.length!==0) {	
		if(data === "empty") {
			return (
				<div className = "message-none">
				没有搜索结果
				</div>
			);
		}
		else {
			return (
				<div>
					<Table columns={columns} dataSource={data} />
				</div>
			);
		}

	}
	else {
		if(data === "empty") {
			return (
				<div>
					没有搜索结果
				</div>
			);
		}
		else return (
			<Skeleton />
		);
	}

};
export default BmsSearch;