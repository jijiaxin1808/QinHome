import React, { useEffect, useState } from "react";
import { Table, Divider, Tag, Pagination } from "antd";
import axios from "axios";
import qs from "qs";

const columns = [
	{
		title: "操作人员",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "所属部门",
		dataIndex: "section",
		key: "section",
	},
	{
		title: "所属级别",
		dataIndex: "roles_id",
		key: "roles_id",
	},
	{
		title: "操作行为",
		key: "action",
		dataIndex: "action",
	},
	{
		title: "操作时间",
		key: "created_at",
		dataIndex:"created_at"
	},
];



const Log = ()=> {
	const [ logdata, setlogdata ] = useState([]);
	useEffect(()=> {
		let data = qs.stringify({
		});
		axios({
			method:"GET",
			url:"http://yjxt.elatis.cn/logs",
			headers:{
				"token": localStorage.getItem("token"),
				"Content-Type":"application/x-www-form-urlencoded"
			},
			data:data
		}).then((res)=> {
			if(res.data.code === 0) {
        
				let resData = res.data.data.data.map((item,index)=> { 
					return {
						...item,
						key: index+1
					};
				});
				setlogdata(resData);
				console.log(resData);
			}
		});
	}
		,[]);
	return(
		<div>
			<div className = { "title" }>
				<span>
                 操作日志
				</span>
			</div>
			<Table columns={columns} dataSource={logdata} style = {{width:"80%",margin: "0 auto"}}  />
			{/* <Pagination defaultCurrent={1} total={50} pageSizeOptions = {["5"]} /> */}
		</div>
	);
};
export default Log;