/* 首页tabs */
import React, {useState, useEffect} from "react";
import { Tabs as T,Skeleton } from "antd";
import "./index.less";
import { Link } from "react-router-dom";
import { connect } from "dva";
import axios from "axios";
const { TabPane } = T;
const  Tabs =(props)=> {
	const [ data, setData ] = useState([]);
	// const [ flag, setFlag ] = useState(1);
	useEffect(()=>{
		if(props.home.columnData.length !==0) {
			const sort = [];
			props.home.columnData[1].sec.map((item,index) => {
				if(index<=0) {
					sort.push(`/新闻中心/${item.title}`);
					return null;
				}
				else return null;
			});
			const data1 = JSON.stringify({
				limit:7,
				moduleArray:sort,
				status: "publish"
			});
			console.log("发送了 hometopic 请求",sort);
			axios({
				method:"POST",
				url:"http://yjxt.elatis.cn/posts/listModulePost",
				headers: {
					"Content-Type":"application/json"
				},
				data: data1
			}).then(res=> {
				const newdata = res.data.data.map((item, index)=> {
					return (
						{
							tab: props.home.columnData[1].sec[index].title,
							Info: item.post
						}
					);
				});
				// console.log(res.data,"topic数据");
				setData(newdata);
			});
		}
	},[props.home]);
	// useEffect(()=> {
	// 	if(props.home.TabData.length&&props.home.TabData.length === 3 ) {
	// 		setData(props.home.TabData);
	// 		props.tabs([]);
	// 	} 
	// },[props.home.TabData])
	// useEffect(()=> {
	// 	console.log("检测到变化",data);
	// 	if(data.length>0) {
	// 		console.log("OKOKOKOKOKOKOKOKO");
	// 		setFlag("ok");
	// 	}
	// },[data]);

	const operations = <Link to = {"/index/message?type=2"}>更多>></Link>;
	if(data.length !== 0){
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
	
												{/* <i className='tabs-i'>·</i>&nbsp;&nbsp;
												{index + 1} */}
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
			<Skeleton  paragraph={{ rows: 8 }}   style = {{width:"500px"}}/>
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