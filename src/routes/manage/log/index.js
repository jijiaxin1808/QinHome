import React, { useEffect, useState } from "react";
import { Table  } from "antd";
import qs from "qs";
import * as Back from "../../../api/Back";

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
		key:"roles_id",
		render:(roles_id,ID)=>(
			<div>{ID.roles_id==1?"管理员":"普通用户"}</div>
		)
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
		Back.logs()
		.then((res)=> {
			if(res.data.code === 0) {
        
				let resData = res.data.data.data.map((item,index)=> { 
					return {
						...item,
						key: index+1
					};
				});
				setlogdata(resData);
			}
		});
	},[]);
	return(
		<div>
			<div className = { "title" }>
				<span>
                操作日志
				</span>
			</div>
			<Table columns={columns} dataSource={logdata} style = {{width:"80%",margin: "0 auto"}}  />
		</div>
	);
};
export default Log;