import React, { useState, useEffect } from "react";
import "./index.less";
import { Card } from "antd";
import { links } from "../../config/friendLink";
import  * as Front from "../../api/Front";
import Loading from "../../components/loading";

const FriendLinks = ()=> {
    const [data, setData] = useState([]);
    useEffect(()=> {
        Front.modelLinks().then(res=> {
            if(res.data.code === 0) {
                setData(res.data.data);
            }
        })
    },[])
    if(data.length!==0) {
        return (
            <React.Fragment>
            <div className = "links-head">
                应用系统
            </div>
            <div className = "links">
                {
                    data.map((item,index)=> {
                        return (
                            <Card hoverable  className = "link">
                                <a href = {item.href} className = "links-a">
                                    <img src = {item.picUrl} width = "150px" style = {{marginBottom: "20px"}}/>
                                    {item.title}
                                </a>
                            </Card>
                        )
                    })
                }
    
            </div>
            </React.Fragment>
        )
    }
    else return (
        <Loading />
    )
}
export default FriendLinks;