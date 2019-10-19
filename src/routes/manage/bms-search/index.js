import React, { useState,useEffect } from "react";
import "./index.less";
import { Table, Divider, Tag } from "antd";

const BmsSearch = ()=> {
	const columns = [
	  {
			title: "id",
			dataIndex: "id",
			key: "id",
	  },
	  {
			title: "文章名称",
			dataIndex: "age",
			key: "age",
	  },
	  {
			title: "发布部门",
			dataIndex: "address",
			key: "address",
	  },
	  {
			title: "日期",
			key: "tags",
			dataIndex: "tags"
	  },
	  {
			title: "页面状态",
			key: "action",
			dataIndex:"action"
	  },{
			title: "操作",
			key: "action",
			dataIndex:"action"
		},	  {
			title: "删除",
			key: "action",
			dataIndex:"action"
		},
	];
	const data = [
	  {
			key: "1",
			name: "John Brown",
			age: 32,
			address: "New York No. 1 Lake Park",
			tags: ["nice", "developer"],
	  },
	  {
			key: "2",
			name: "Jim Green",
			age: 42,
			address: "London No. 1 Lake Park",
			tags: ["loser"],
	  },
	  {
			key: "3",
			name: "Joe Black",
			age: 32,
			address: "Sidney No. 1 Lake Park",
			tags: ["cool", "teacher"],
	  },
	];
	
	return (
		<div>
			<Table columns={columns} dataSource={data} />
		</div>
	);
};
export default BmsSearch;