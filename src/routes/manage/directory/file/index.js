import React from "react";
import styles from "./index.css";
import Link from "umi/link";
import { Table,Input, Button, Popover, message } from 'antd';
import { useState, useEffect } from "react";
import fileData from "../../../../assets/fileData";
import axios from "axios";
const { Search } = Input;
const getFileContent = (content)=>{
  return(
    <div className = { styles.fileContent }>
      {content}
    </div>
  )
}
const del = (id)=> {
  axios({
    method:"GET",
    url:`http://yjxt.elatis.cn/file/delete/${id}`,
    headers: {
      token:sessionStorage.getItem("token")
    }
  }).then((res)=>{
  if(res.data.code === 0){
    message.success("删除成功")
  }
  })
  console.log("永久删除",id);
  //在这里写永久删除按钮的函数
}
const columns = [
  {
    title:"id",
    dataIndex:"id",
    key:"id"
  },
  {
    title: '文件',
    dataIndex: 'name',
    key: 'name',
    render: (name,id) =>(
      <div className = {styles.handle }>
        <img src = { `http://yjxt.elatis.cn/${id.uri}`}  width = "126px" height = "126px" alt = ""/>
        <div>
          <p>{  name } </p>
          <p> { `文件类型: ${id.type}` } </p>
          <div> 
          {/* <Button size = "small">编辑</Button>   */}
          <Button size = "small" onClick = {()=>{ del(id.id) }} >永久删除</Button>  
          {/* <Popover content={getFileContent(file.content)}>
            <Button size = "small">查看说明</Button>  
          </Popover> */}
   
          </div>
        </div>

      </div>
    )
  },
  {
    title: '上传者',
    dataIndex: 'uploader',
    key: 'uploader',
  },
  {
    title: '日期',
    key: 'created_at',
    dataIndex: 'created_at',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    const selectedId = selectedRows.map((item)=>{
      return item.id;
    })
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedId);
    //这里获取了所以被选中的选项的id
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};


// const App = ()=> {
//     return(
//         <div>
//             <Table columns={columns} dataSource={fileData}  rowSelection={rowSelection}/>
//         </div>
//     )
// }
const FileHeader = ()=> {
  const [ isCreateShow,setisCreateShow ] = useState(false);
    return(
        <div className = { styles.FileHeader }>
            <div className = { styles.title }>
               <span>
                 消息通知
               </span>
            </div>
            {/* <div className = { styles.create } onClick = {()=>{setisCreateShow(true)}} onBlur = {()=>{setisCreateShow(false)}}>
                <Button className = {styles.button}>新建文件</Button>
                <div >
                    <ul className = {isCreateShow?styles.createList:styles.hide}>
                        <li>
                            <Link to = "/manage/directory/file/EditFile">新建文件夹</Link>
                        </li>
                        <li>
                            <Link to = "/manage/directory/file/EditFile">新建文档</Link>
                        </li>
                        <li>
                            <Link to = "/">新建图片</Link>
                        </li>
                    </ul>

                </div>

            </div> */}
            
        </div>
    )
}




const File = ()=> {
  const [data,setdata] = useState([]);
  const [ selectedId,setselectedId ] = useState([]);
  useEffect(()=> {
    axios({
      method:"GET",
      url:"http://yjxt.elatis.cn/file/all",
      headers:{
        token:sessionStorage.getItem("token")
      }
    }).then((res)=> {
      console.log(res.data.code);

    if(res.data.code === 0) {
      setdata(res.data.data.page.data);
    }
    })

  },[])


  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const selectedId = selectedRows.map((item)=>{
        return item.id;
      })
      setselectedId(selectedId);
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedId);
      //这里获取了所以被选中的选项的id
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
 const  delSelected = (selectedId)=> {
  selectedId.map((item)=> {
    del(item);
  })
  }


  console.log(data);
  const App = ()=> {
      return(
          <div>
              <Table columns={columns} dataSource={data}  rowSelection={rowSelection}/>
          </div>
      )
  }
    return (
        <div>
            <FileHeader />
            <div className = {styles.buttonSbar}>
              <Button  onClick = {()=>{delSelected(selectedId)}} className = {styles.button}>批量删除</Button>
              </div>
              
            {/* <App /> */}
            <Table columns={columns} dataSource={data}  rowSelection={rowSelection}/>
        </div>
    )
}
export default File;