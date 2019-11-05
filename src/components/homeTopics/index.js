import React, { useState, useEffect } from "react";
import "./index.less";
import { Link } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "antd";

const HomeTopic = (props) => {
	return (
		<div className='home-topic'>
			<div className='home-topic-header'>
				<span>{props.title}</span>
				<Link to={`/index/message?type=${props.type}`}>
                    更多 >>
				</Link>
			</div>
			<div className='home-topic-content'>
				<ul>
					{
						props.data.map((item, index) => {
						  return (
						    <li className='home-topic-li' key={index}>
						      <Link to={`/index/article?id=${item.id}`} style = {{paddingLeft:"5px"}}>
						        {`${item.title}`}
						      </Link>
						    </li>
						  );
						})
					}
				</ul>
			</div>
		</div>
	);
};
const HomeTopics = (props) => {
	const { colsData } = props;
	const [ topicData, setTopicData ] = useState([]);
	console.log(colsData,"colData");

	useEffect(()=> {
		if(colsData.length !==0 ){
			const sort = [...colsData].map((item,index)=> {
				if(index>1){
					return `/${item.title}/${item.sec[0].title}`;
				}
			});
			const data1 = JSON.stringify({
				limit:3,
				moduleArray:sort,
				status: ""
			});
			console.log(sort,"发送了home请求");
			axios({
				method:"POST",
				url:"http://yjxt.elatis.cn/posts/listModulePost",
				headers: {
					"Content-Type":"application/json"
				},
				data: data1
			}).then(res=> {
				console.log(res.data,"topic数据");
				const newData = res.data.data.map((item,index)=>{
					if(index>1) {
						return item.post;
					}
				});
				console.log("newdata",newData);


				setTopicData(newData);
			});
		}
	},[props.colsData]);
	useEffect(()=> {
		console.log(topicData);
	},[topicData]);
	if(topicData.length!== 0) {
		console.log("现在的 col",topicData);
		return (
			<div className='home-topics'>
				{
					topicData.map((item, index) => {
						console.log(item,"jjjjjjjjxjxj");
						if(index>1){
							return (
								<HomeTopic 
									title = {colsData[index].title} 
									href = {`/index/message?type=${index+2}`} 
									 type =  { index+1 } 
									data = {item}
								/>
							);
						}
						else return null;

					})
				}
			</div>
		);
	}
	else {
		return(
			<Skeleton rows = {20} />
		);
	}


};
export default HomeTopics;
