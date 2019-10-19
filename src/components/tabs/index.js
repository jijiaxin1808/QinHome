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
let resData = [];
const  Tabs =(props)=> {
	const [ data, setData ] = useState([
		{
			tab:"",
			Info: [
				"","","","","",""
			]
		}
	]);
	const [ flag, setFlag ] = useState(1);
	useEffect(()=>{
		console.log("tab",props.home.columnData);
		if(props.home.columnData) {
			props.home.columnData[1].sec.map((item,index) => {
				if(index<=2) {
					axios({
						method:"get",
						url:"http://yjxt.elatis.cn/posts/listPosts?category=/新闻中心/领导讲话",
						headers: {
							token: localStorage.getItem("token")
						},
						params: {
							status: "draft"
						}
					}).then(res=> {
						if(res.data.code === 0) {
							const newData = {
								tab: props.home.columnData[1].sec[index].title,
								Info: res.data.data,
							};
							resData.push(newData);
						}
						else {
						}
					});
				}
			});

		}
	},[props.home]);

	useEffect(()=>{
		console.log(resData,"resData");
		console.log("lengthaaaa",resData.length);
		// if(resData.length === 3) {
		console.log("成功啦");
		setData(resData);
		// }
	},[resData]);
	useEffect(()=> {
		console.log("data 变化了",data);
		if(data.length===3){
			console.log("刷新");
			setFlag("1");
		}
	},[data]);
 	// const data = tabsData;
	const operations = <Link to = {"/index/message?type=2"}>更多>></Link>;

	if(data.length===3){
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
		)
	}
	
};

export default connect(({home})=>({home}))(Tabs);