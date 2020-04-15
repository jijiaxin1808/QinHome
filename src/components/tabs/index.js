import React, {useState, useEffect} from "react";
import { Tabs as T,Skeleton } from "antd";
import "./index.less";
import { Link } from "react-router-dom";
import { connect } from "dva";
// import * as Front  from "../../api/Front";
import axios from "axios";

const { TabPane } = T;
const  Tabs =(props)=> {
	const [ data, setData ] = useState([]);
	useEffect(()=>{
		if(props.home.columnData.length !==0) {
			const sort = [];
			props.home.columnData[1].sec.map((item,index) => {
				if(index<=0) {
					sort.push(`${props.home.columnData[1].title}`);
					return null;
				}
				else return null;
			});
			const data1 = {
				limit:7,
				firstArray:sort,
				status: "publish"
			};


			axios({
				method: "POST",
				data: data1,
				url: " http://yjxt.elatis.cn/posts/listModulePost"
			}).then(res=> {
				console.log("触发了then",res.data.data[0].post);
				if(res) {
					if(res.data.code === 0) {
						const newdata = res.data.data.map((item, index)=> {
							return (
								{
									tab: props.home.columnData[1].sec[index].title,
									Info: item.post
								}
							);
						});
						console.log(newdata,"tabeqdsadasbbfndsanbfsdafass");
						setData(newdata);
					}
				}
			});
		}
	},[props.home]);

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