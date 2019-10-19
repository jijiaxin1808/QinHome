/* 首页tabs */
import React, {useState, useEffect} from "react";
import { Tabs as T } from "antd";
import "./index.less";
import { Link } from "react-router-dom";
import { connect } from "dva";
import axios from "axios";
const { TabPane } = T;
const tabsData = [
	{
		tab: "领导讲话",
		Info: [
			"wergwergwegrfewf",
			"werfewrfwefr",
			".....",
			".....",
			".....",
			"fwergfewrgrewg",
			"wegrwergergew",
			"....."
		]
	},
	{
		tab: "公文公告",
		Info: [
			"zyzyzhisd",
			"adfasdfasf",
			".....",
			".....",
			".....",
			"afdadsfassfd",
			"adfasdfasf",
			"....."
		]
	},
	{
		tab: "工作动态",
		Info: [
			"adfasdfasdf",
			"qerqwerqwr",
			".....",
			".....",
			".....",
			"342543w5w34",
			"fwerfwerfewfrwe",
			"....."
		]
	}
];
const  Tabs =(props)=> {
	const [ data, setData ] = useState([
		{
			tab:"",
			Info: [
				"","","","","",""
			]
		}
	]);
	useEffect(()=>{
		console.log("tab",props.home.columnData);
		if(props.home.columnData) {
			axios({
				method:"get",
				url:"http://yjxt.elatis.cn/posts/getNew?category=/新闻中心/领导讲话",
				headers: {
					token: localStorage.getItem("token")
				}
			}).then(res=> {
				if(res.data.code === 0) {
					const tabData = [{
						tab:"aaaa",
						Info:res.data.data
					}]
					setData(tabData);
				}
				else {
					
				}
			});
		}
	},[props]);
 	// const data = tabsData;
	const operations = <a>更多>></a>;
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
											<Link to={`/article?id=${item.id}`}>
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
};

export default connect(({home})=>({home}))(Tabs);