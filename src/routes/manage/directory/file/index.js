import React from "react";
import styles from "./index.css";
import { Table, Button,  message } from "antd";
import { useState, useEffect } from "react";
import { Upload, Icon,  Row, Col } from "antd";
import * as Back from "../../../../api/Back";

const { Dragger } = Upload;
const fileList = [];
const props = {
	headers: {
		token:localStorage.getItem("token")
	},
	name: "file",
	multiple: true,
	listType: "picture",
	defaultFileList: [...fileList],
	action: "http://yjxt.elatis.cn/file/upload",
	onChange(info) {
		const { status } = info.file;
		if (status !== "uploading") {
		}
		if (status === "done"&&info.file.response.code === 0) {
			message.success(`${info.file.name}文件上传成功`);
		} else if(status === "done"&&info.file.response.code !== 0)  {
			message.error(info.file.response.message);
		}
	},className: styles.upload,
};

const CreateFile = ()=> {
	return (
		<Row type = "flex" justify = "center" style = {{overflow:"auto"}}> 
			<Col span={12}>
				<Dragger {...props}>
					<p className="ant-upload-drag-icon">
						<Icon type="inbox" />
					</p>
					<p className="ant-upload-text">点击或拖拽文件以上传</p>
					<p className="ant-upload-hint">
          支持拖拽和点击上传
					</p>
				</Dragger>
			</Col>
		</Row>
	);
};

const del = (id)=> {
	const params = {
		id: id
	};
	Back.fileDelete(params)
	.then((res)=>{
		if(res.data.code === 0){
			message.success("删除成功");
		
		}
	});
	//在这里写永久删除按钮的函数
};
const columns = [
	{
		title:"id",
		dataIndex:"id",
		key:"id"
	},
	{
		title: "文件",
		dataIndex: "name",
		key: "name",
		render: (name,id) =>(
			<div className = {styles.handle }>
				<div>
					<p>{  name } </p>
					<div> 
						<Button size = "small" onClick = {()=>{ del(id.id); }} >永久删除</Button>  
					</div>
				</div>

			</div>
		)
	},{
		title: "路径",
		dataIndex: "uri",
		key:"uri",
		render:uri=> (
			<a href = {`http://yjxt.elatis.cn/${uri}`} >{`http://yjxt.elatis.cn/${uri}`}</a>  
		)
	},
	{
		title: "上传者",
		dataIndex: "uploader",
		key: "uploader",
	},
	{
		title: "日期",
		key: "created_at",
		dataIndex: "created_at",
	},
];
const FileHeader = ()=> {
	return(
		<div className = { styles.FileHeader }>
			<div className={"title"}>
				<span>文件管理</span>
			</div>
            
		</div>
	);
};

const File = ()=> {
	const [data,setdata] = useState([]);
	const [ selectedId,setselectedId ] = useState([]);
	useEffect(()=> {
		Back.files()
		.then((res)=> {
			if(res.data.code === 0) {
				setdata(res.data.data.page.data);
			}
		});
	},[]);


	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			const selectedId = selectedRows.map((item)=>{
				return item.id;
			});
			setselectedId(selectedId);
			//这里获取了所以被选中的选项的id
		},
		getCheckboxProps: record => ({
			disabled: record.name === "Disabled User", // Column configuration not to be checked
			name: record.name,
		}),
	};
	const  delSelected = (selectedId)=> {
		selectedId.map((item)=> {
			del(item);
			return null ;
		});
	};
	return (
		<div>
			<FileHeader />
			<CreateFile />
			<div className = {"buttonSbar"}>
				<Button  onClick = {()=>{delSelected(selectedId);}} className = {"button"}>批量删除</Button>
			</div>
			<Table columns={columns} dataSource={data}  rowSelection={rowSelection}/>
		</div>
	);
};
export default File;