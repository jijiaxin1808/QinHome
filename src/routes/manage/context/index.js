import React from "react";
import { Table, Divider, Tag, Switch,Input   } from 'antd';
import contextData from "../../../assets/contextData";
import styles from "./index.css";
const { Search } = Input;

 
const columns = [
  {
    title: '序列',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '文章名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '发布部门',
    dataIndex: 'section',
    key: 'section',
  },
  {
    title: '日期',
    key: 'time',
    dataIndex: 'time',
  },
  {
    title: '文章位置',
    key: 'loaction',
    dataIndex:"loaction"
  },
  {
    title: '页面状态',
    key: 'isShow',
    dataIndex:"isShow",
    render:isShow=>(
        <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked = {isShow}  />
    ),
    },
];



const Context = ()=> { 
    return(
        <div>
             <Search placeholder="请输入搜索内容" onSearch={value => console.log(value)} enterButton className = {styles.search} />
 
            <Table columns={columns} dataSource={contextData}/>
        </div>
    )
}

// const ContextContent = ()=> {
//     return (
//         <div>
//             <div className = { styles.contentHeader } >
//             <span>序列</span>
//             <span>文章名称</span>
//             <span>发布部门</span>
//             <span>日期</span>
//             <span>文章位置</span>
//             <span>页面状态</span>
//             </div>
//             {
//                 contextData.map((item,index)=>{
//                     return (
//                         <div className = { styles.item }>
//                             <span>{item.id}</span>
//                             <span>{item.title}</span>
//                             <span>{item.section}</span>
//                             <span>{item.loaction}</span>
//                             <span>
//                             
//                             </span>
//                         </div>
//                     )

//                 })
//             }
//         </div>
//     )
// }
// const Context = ()=> {
//     return(
//         <div  >
//             <ContextHeader />
//             <ContextContent />
//         </div>
//     )
// }

export default Context;