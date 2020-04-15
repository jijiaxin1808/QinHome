import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Front from "../../api/Front";
const HideBar = ()=> {
const [data, setData ] = useState([]);
useEffect(()=> {
    Front.modelHideBar().then(res=> {
        if(res.data.code === 0) {
            setData(res.data.data);
        }
    })
},[]);

return (
    <React.Fragment>
        {
            data.map(item=> {
                if(item.isShow) {
                    return (
                        <div className = "hide-bar">
                            <Link to = {item.link}>
                                <img width = "1080px" height = "100px" src = {item.picUrl} alt = ""/>
                            </Link>
                        </div>
                    )
                }
                return null;
            })
        }
    </React.Fragment>
)
}
export default HideBar;