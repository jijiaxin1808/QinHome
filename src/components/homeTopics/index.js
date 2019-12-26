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

	useEffect(()=> {
		if(colsData.length !==0 ){
			const sort = [...colsData].map((item,index)=> {
				if(index>1){
					return `/${item.title}/${item.sec[0].title}`;
				}
				return null;
			});
			const data1 = {
				limit:3,
				moduleArray:sort,
				status: ""
			}
			Front.listModulePost(data1).then(res=> {
				const newData = res.data.data.map((item,index)=>{
					if(index>1) {
						return item.post;
					}
					return null;
				});
				setTopicData(newData);
			});
		}
	},[props.colsData]);
	useEffect(()=> {
	},[topicData]);
	if(topicData.length!== 0) {
		return (
			<div className='home-topics'>
				{
					topicData.map((item, index) => {
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
