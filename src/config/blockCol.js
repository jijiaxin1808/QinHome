import { Table, Button, Input, Switch } from "antd";
import { Fragment } from "react";

export const headerScrollCol  = [
	{
		title: "序号",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "内容",
		dataIndex: "content",
		key: "content",
		render: content => (
			<Input placeholder = { content }   />
		)
	},
	{
		title: "链接地址",
		dataIndex: "href",
		key: "href",
		render: href => (
			<Input placeholder = { href }   />
		)
	},
	{
		title: "状态",
		key: "isShow",
		dataIndex: "isShow",
		render: isShow => (
			<Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked = {isShow}  />
		)
	},
	{
		title: "操作",
		key: "id",
		dataIndex:"id",
		render: id=> (
			<Button onClick = {()=>{console.log(`删除${id}id的首部公告`)}} >删除</Button>
		)
	},
];

const picUrlButton = (picUrl)=> {
	if(picUrl) {
		return (
			<Fragment>
				<Button >查看图片</Button>
				<Button>修改图片</Button>
			</Fragment>
		)
	}
	else return (
		<Button>添加图片</Button>
	)
}
// export const carouselCol  = [
//   {
//     title: '序号',
//     dataIndex: 'id',
//     key: 'id',
//   },
//   {
//     title: '内容',
//     dataIndex: 'title',
//     key: 'title',
//     render: (content,id) => (
//         <Input placeholder = { content } onChange = {()=>{console.log(id)}}   />
//     )
//   },
//   {
//       title: '图片',
//       dataIndex: 'picUrl',
//       key: 'picUrl',
//       render: picUrl=> (    
//               <div>
//                   {
//                       picUrlButton(picUrl)
//                   }
//               </div>
//       )
//     },
//   {
//     title: '链接地址',
//     dataIndex: 'href',
//     key: 'href',
//     render: href => (
//         <Input placeholder = { href }   />
//     )
//   },
//   {
//     title: '状态',
//     key: 'isShow',
//     dataIndex: 'isShow',
//     render: isShow => (
//         <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked = {isShow}  />
//     )
//   },
//   {
//     title: '操作',
//     key: 'id',
//     dataIndex:"id",
//     render: id=> (
//         <Button onClick = {()=>{console.log(`删除${id}id的首部公告`)}} >删除</Button>
//     )
//   },
// ];

export const backgroundCol  = [
	{
		title: "图片",
		dataIndex: "picUrl",
		key: "picUrl",
		render: picUrl=> (    
			<div>
				{
					picUrlButton(picUrl)
				}
			</div>
		)
	},

];

export const homeTopicCol  = [

	{
		title: "内容",
		dataIndex: "content",
		key: "content",
		render: content => (
			<Input placeholder = { content }   />
		)
	},
	{
		title: "图片",
		dataIndex: "picUrl",
		key: "picUrl",
		render: picUrl=> (    
			<div>
				{
					picUrlButton(picUrl)
				}
			</div>
		)
	},
	{
		title: "链接地址",
		dataIndex: "href",
		key: "href",
		render: href => (
			<Input placeholder = { href }   />
		)
	},
];

export const publicCol  = [
	{
		title: "序号",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "内容",
		dataIndex: "content",
		key: "content",
		render: content => (
			<Input placeholder = { content }   />
		)
	},
	{
		title: "图片",
		dataIndex: "picUrl",
		key: "picUrl",
		render: picUrl=> (    
			<div>
				{
					picUrlButton(picUrl)
				}
			</div>
		)
	},
	{
		title: "链接地址",
		dataIndex: "href",
		key: "href",
		render: href => (
			<Input placeholder = { href }   />
		)
	},
];