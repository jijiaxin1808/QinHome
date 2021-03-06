import React, { useState,useEffect } from "react";
import "./index.less";
// import axios from "axios";
import { Table,  Button, Modal, message } from "antd";
import urlHandle from "../../../utils/urlHandle";
import {routerRedux} from "dva/router";
import { connect } from "dva";
import Loading from "../../../components/loading";
import * as Back from "../../../api/Back";
import * as Front from "../../../api/Front";
const  DeleteArticle  = (props)=> {
	const [ visible, setVisible ] = useState(false);
	const showModal = () => {
		setVisible(true);
	};
	const handleOk = e => {
		setVisible(false);
		const params = {
			id: props.id
		};
		Back.postsDelete(params)
		.then(res=> {
			if(res.data.code === 0 ) {
				message.success("删除成功");
				window.location.reload();
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
			pathname: "/manage"
		}));
	}
});
const Dle = connect(({home})=>({home}),mapDispatchToProps)(DeleteArticle);
const alterAricle = (id)=> {
	window.location.href = `/manage/change/${id}`;
};
const BmsSearch = (props)=> {
	const [ data, setData ] = useState([]);
	// eslint-disable-next-line no-unused-vars
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
			render: title => (
				<div style = {{   width:"500px",
					whiteSpace:"nowrap",
					overflow:"hidden",
					 textOverflow:"ellipsis"}}>
					{title}
				</div>
			)
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
			render:(text,record)=>(
				<p>{record.status === "publish"?"已发布":"未发布"}</p>
			),
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
			render:(text,record) => (
				<Dle  id = {record.id}>删除文章</Dle>
			)
		},
	];
	useEffect(()=>{
		if(key.length !== 0 ){
			const params = {
				flag: 2,
				key : key
			};
			Front.searchTitle(params)
			.then(res=> {
				if(res.data.code === 0) {
					if(res.data.data.length ===0) {
						setData("empty");
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
			<Loading />
		);
	}

};
export default BmsSearch;