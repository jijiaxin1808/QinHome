import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./index.less"
import ToTop from "../totop"
import { Input } from "antd"
import axios from "axios"

const { Search } = Input

function 
Header (props) {
	const [bardata, setbardata] = useState([])
	const [flag] = useState("首页")
	useEffect(() => {
		axios.get("http://yjxt.elatis.cn/options/name/column").then((res) => {
      console.log(res.data.data)
			if (res.data.code === 0) {
				setbardata(res.data.data)
				console.log((res.data.data), "bardata")
			}
		})
	}, [])
	return (
  <><div className='header'>
    	<ToTop />
    	<div className='home-header'>
      <div style = {{width:1080, margin: "0 auto"}}>
    	<Search
    		placeholder='请输入搜索关键字'
    		onSearch={value => console.log(value)}
    		style={{ width: 200, float: "right", marginTop: "70px" }}
    	/>
      </div>
      </div>

    	{/* <Search
    		placeholder='请输入搜索关键字'
    		onSearch={value => console.log(value)}
    		style={{ width: 200, marginTop: "70px" }}
    	/> */}
    </div>
   <div className='header-asss'>
    	<ul className='header-bar'>
    		{
    			bardata.map((item, index) => {
    				return (
    					<li key={index} className={flag === item ? "active" : ""}>
                {/* {item.link==="/" ?<Link to={`/a//index`}>{item.title}</Link>:<Link to={`/a/${item.link}`}>{item.title}</Link>} */}
				        <Link to={`${item.link}`}>{item.title}</Link>
    					</li>
    				)
    			})
    		}
    	</ul>
    </div>
 </>
	)
}

export default Header
