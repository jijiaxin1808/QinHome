import React from "react";
import "./index.less";
import { Card } from "antd";
import linkData from "../../config/link"; 

const FriendLinks = ()=> {
    return (
        <React.Fragment>
        <div className = "links-head">
            应用系统
        </div>
        <div className = "links">
            {
                linkData.map((item,index)=> {
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
export default FriendLinks;