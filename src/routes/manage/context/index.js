import React,{ useState, useEffect } from "react";
import { Table, Divider, Tag, Switch,Input,Button, Modal, message   } from "antd";
// import contextData from "../../../assets/contextData";
import styles from "./index.css";
import axios from "axios";

const { Search } = Input;
const alterAricle = (id)=> {
	console.log("11");
	window.location.href = `/manage/create?id=${id}`;
};
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
		dataIndex:"action",
		render:isShow=>(
			<Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked = {isShow}  />
		),
	},{
		title: "操作",
		key: "action",
		dataIndex:"action",
		render: id => (
			<Button onClick = {()=>{alterAricle(id);}}>修改文章</Button>
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



const Context = (props)=> { 
	const [ data, setData ] = useState([]);
	useEffect(()=>{
		axios({
			method:"GET",
			url: "http://yjxt.elatis.cn/posts/listPosts",
			params: {
				status: "draft",
			}
		}).then(res=> {
			if(res.data.code === 0) {
				console.log("内容管理",res.data.data);
				setData(res.data.data);
			}
		});
	}
		,[]);
	return(
		<div>
			<div className={"buttonSbar"}>
				<Button   className={"button"} onClick = {()=>{window.location.href="/manage/create";}}>新建文章</Button>
			</div>
			<Table columns={columns} dataSource={data} />
		</div>
	);
	
};

export default Context;