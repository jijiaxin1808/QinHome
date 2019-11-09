import React from "react";
import styles from "./index.css";
// import Link from "umi/link";
import { Table, Button,  message } from "antd";
import { useState, useEffect } from "react";
// import fileData from "../../../../assets/fileData";
import axios from "axios";
import { Upload, Icon,  Row, Col } from "antd";

const { Dragger } = Upload;
const fileList = [
	// {
	//   uid: '-1',
	//   name: 'xxx.png',
	//   status: 'done',
	//   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
	//   thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
	// },
	// {
	//   uid: '-2',
	//   name: 'yyy.png',
	//   status: 'done',
	//   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
	//   thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
	// },
];
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
		console.log(info,"上传");
		const { status } = info.file;
		if (status !== "uploading") {
			console.log(info.file, info.fileList);
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

// const { Search } = Input;
// const getFileContent = (content)=>{
// 	return(
// 		<div className = { styles.fileContent }>
// 			{content}
// 		</div>
// 	);
// };
const del = (id)=> {
	axios({
		method:"GET",
		url:`http://yjxt.elatis.cn/file/delete/${id}`,
		headers: {
			token:localStorage.getItem("token")
		}
	}).then((res)=>{
		if(res.data.code === 0){
			message.success("删除成功");
		}
	});
	console.log("永久删除",id);
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
				<img src = { `http://yjxt.elatis.cn/${id.uri}`}  width = "126px" height = "126px" alt = ""/>
				<div>
					<p>{  name } </p>
					<div> 
						{/* <Button size = "small">编辑</Button>   */}
						<Button size = "small" onClick = {()=>{ del(id.id); }} >永久删除</Button>  
						{/* <Popover content={getFileContent(file.content)}>
            <Button size = "small">查看说明</Button>  
          </Popover> */}
					</div>
				</div>

			</div>
		)
	},{
		title: "路径",
		dataIndex: "uri",
		key:"uri"
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

// const rowSelection = {
// 	onChange: (selectedRowKeys, selectedRows) => {
// 		const selectedId = selectedRows.map((item)=>{
// 			return item.id;
// 		});
// 		console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedId);
// 		//这里获取了所以被选中的选项的id
// 	},
// 	getCheckboxProps: record => ({
// 		disabled: record.name === "Disabled User", // Column configuration not to be checked
// 		name: record.name,
// 	}),
// };


// const App = ()=> {
//     return(
//         <div>
//             <Table columns={columns} dataSource={fileData}  rowSelection={rowSelection}/>
//         </div>
//     )
// }
const FileHeader = ()=> {
	// const [ isCreateShow,setisCreateShow ] = useState(false);
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
		axios({
			method:"GET",
			url:"http://yjxt.elatis.cn/file/files",
			headers:{
				token:localStorage.getItem("token")
			}
		}).then((res)=> {
			console.log(res.data.code);

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
			console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedId);
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
	console.log(data);
	// const App = ()=> {
	// 	return(
	// 		<div>
	// 			<Table columns={columns} dataSource={data}  rowSelection={rowSelection}/>
	// 		</div>
	// 	);
	// };
	return (
      
      
      
		<div>
			<FileHeader />
			<CreateFile />
			<div className = {"buttonSbar"}>
				<Button  onClick = {()=>{delSelected(selectedId);}} className = {"button"}>批量删除</Button>
			</div>
              
			{/* <App /> */}
			<Table columns={columns} dataSource={data}  rowSelection={rowSelection}/>
		</div>
	);
};
export default File;