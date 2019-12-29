import React from 'react'
import styles from './index.css'
import  Link  from "umi/link";
import { Input, message } from "antd";
import * as Back from "../../../../api/Back";
const { Search } = Input;

const logOut = ()=> {
  Back.logOut()
  .then((res)=> {
    if(res.data.code === 0) {
      message.success("登出成功");
      localStorage.clear();
      window.location.href = "/login"
    }
  } )
}

export default function Header () {
  return (
      <div className={styles.header}>
        <Search placeholder = "请输入搜索的关键字" style = {{width:"200px"}} />
        <Link to = "/manage" className = { styles.toHome }></Link>
        <Link to = "/manage/message" className = { styles.toIssue }></Link>
        <span className = { styles.userName }>{"用户名"}</span>
        <span className = { styles.logOut }  onClick = {()=>{logOut();}}></span>
      </div>
  );
}
