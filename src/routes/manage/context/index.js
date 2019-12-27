import React,{ useState, useEffect } from "react";
import { Table, Button, Modal, message } from "antd";
import axios from "axios";
import {routerRedux} from "dva/router";
import { connect } from "dva";
import Loading from "../../../components/loading";
import * as Front from "../../../api/Front";
import * as Back from "../../../api/Back";


const alterAricle = (id)=> {
	window.location.href = `/manage/change/${id}`;
};
const  DeleteArticle  = (props)=> {
	const [ visible, setVisible ] = useState(false);
	const showModal = () => {
		setVisible(true);
	};
	const handleOk = e => {
		setVisible(false);
		const params = {
			id: props.id
		}
		Back.postsDelete(params)
		.then(res=> {
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





const mapDispatchToProps = (dispatch)=> ({
	reload() {
		dispatch(routerRedux.push({
			pathname: "/manage/context"
		}));
	}
});
const Dle = connect(({home})=>({home}),mapDispatchToProps)(DeleteArticle);
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
		title: "创建日期",
		key: "created_at",
		dataIndex: "created_at"
	},
	{
		title: "页面状态",
		key: "status",
		dataIndex:"action",
		render:(text,record)=>(
			<p>{record.status === "publish"?"已发布":"未发布"}</p>
		)
	},{
		title: "操作",
		key: "action",
		dataIndex:"action",
		render: (text,record) => (
			<Button onClick = {()=>{alterAricle(record.id);}}>修改文章</Button>
		)
	},{
		title: "删除",
		key: "delete",
		dataIndex:"action",
		render:(text,record)=> (
			<Dle  id = {record.id} >删除文章</Dle >
		)

	},
];


const Context = (props)=> { 
	const [ data, setData ] = useState([]);
	const { reload } = props;
	useEffect(()=>{
		const params = {
			flag: 2
		}
		Front.listPosts(params)
		.then(res=> {
			if(res.data.code === 0) {
				setData(res.data.data);
			}
		});
	}
		,[]);
	if(data.length !== 0 ) {
		return(
			<div>
				<div className = "title">
						  <span>
					文章管理
						  </span>
					  </div>
				<div className={"buttonSbar"}>
					<Button   className={"button-context"} type = "primary" onClick = {()=>{window.location.href="/manage/create";}}>新建文章</Button>
				</div>
				<Table columns={columns} dataSource={data} reload = {reload}  />
			</div>
		);
	}
	else return (
		<React.Fragment>
			<Loading />
		</React.Fragment>
	);
};

export default Context;












