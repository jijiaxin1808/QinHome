import React, { useState, useEffect } from "react";
import "./index.less";
import { Link } from "react-router-dom";
import * as Front  from "../../api/Front";
import { Skeleton } from "antd";

const HomeTopic = (props) => {
	return (
		<div className='home-topic'>
			<div className='home-topic-header'>
				<span>{props.title}</span>
				<Link to={`/index/message?type=${props.type+2}`}>
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

	useEffect(()=> {
		if(colsData.length !==0 ){
			console.log(colsData,"8777777777");
			const sort = [...colsData].map((item,index)=> {
				if(index>1&&index<8){
						return `${item.title}`;
				}
				else return null;
			});
			const data1 = {
				limit:3,
				firstArray:sort,
				status: "publish"
			};
			Front.listModulePost(data1).then(res=> {
				if(res.data.code === 0) {
					const newData = res.data.data.map((item,index)=>{
							return item.post;
					});
					console.log("topics",newData);
					setTopicData(newData);
				}
			});
		}
	},[props.colsData]);
	if(topicData.length!== 0) {
		return (
			<div className='home-topics'>
				{
					topicData.map((item, index) => {
						if(index>=0){
							return (
								<HomeTopic 
									title = {colsData[index+2].title} 
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
