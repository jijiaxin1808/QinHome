import React,{useEffect} from "react";
import axios from "axios";
import {message} from "antd";
import "./index.less";

export default function Search() {

  useEffect(() => {
    axios.get("http://yjxt.elatis.cn/posts/getNew",{
      headers: {
        "token": localStorage.getItem("token"),
        "Content-Type": "application/json", 
      },
      params: {
        limit: 20,
        offset: 0,
      },
    }).then(res => {
      if(res.data.code === 0) {
        console.log(res.data.data)
      }
    }).catch(err => {
      message.error(err);
    });
  }, []);

  return (
    <div>
      <ul>
        {

        }
      </ul>
    </div>
  );
}

function SearchNone() {
  return (
    <div></div>
  );
}  