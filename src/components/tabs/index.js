/* 首页tabs */
import React, {useState, useEffect} from "react";
import { Tabs as T } from "antd";
import "./index.less";
import { Link } from "react-router-dom";
import { connect } from "dva";
import axios from "axios";
const { TabPane } = T;
const  Tabs =(props)=> {
	const [ data, setData ] = useState([]);
	const [ flag, setFlag ] = useState(1);
	useEffect(()=>{
		if(props.home.columnData) {
			props.home.columnData[1].sec.map((item,index) => {
				if(index<=2) {
					axios({
						method:"get",
						url:"http://yjxt.elatis.cn/posts/listPosts?category=/政府公开/行政许可",
						params: {
							status: "draft"
						}
					}).then(res=> {
						if(res.data.code === 0) {
							const newData = [...data];
							newData.push ({
								tab: props.home.columnData[1].sec[index].title,
								Info: res.data.data,
							});
							setData(newData);
						}
						else {
						}
					});
				}
			});

		}
	},[props.home]);
	// useEffect(()=> {
	// 	if(props.home.TabData.length&&props.home.TabData.length === 3 ) {
	// 		setData(props.home.TabData);
	// 		props.tabs([]);
	// 	} 
	// },[props.home.TabData])
	useEffect(()=> {
		console.log("检测到变化",data);
		if(data.length>0) {
			console.log("OKOKOKOKOKOKOKOKO");
			setFlag("ok");
		}
	},[data]);

	const operations = <Link to = {"/index/message?type=2"}>更多>></Link>;
	if(flag === "ok"){
		return (
			<T defaultActiveKey='1' tabBarExtraContent={operations}>
				{
					data.map((item, index) => {
						return (
							<TabPane tab={item.tab} key={`${item.tab}${index}`}>
								<ul className='home-tabs'>
									{
										item.Info.map((item, index) => (
	
											<li key={index}>
	
												<i className='tabs-i'>·</i>&nbsp;&nbsp;
												{/* {index + 1} */}
												<Link to={`/index/article?id=${item.id}`}>
													{item.title}
												</Link>
											</li>
										))
									}
								</ul>
							</TabPane>
						);
					})
				}
			</T>
		);
	}
	else {
		// setFlag("2");
		return(
			<div>
				loading
			</div>
		);
	}
};
const mapDispatchToProps = (dispatch)=> ({
	tabs(data){
		dispatch({
			type:"home/tabs",
			payload: {
				TabData: data
			}
		});
	}
});
export default connect(({home})=>({home}),mapDispatchToProps)(Tabs);