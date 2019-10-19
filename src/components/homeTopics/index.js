import React, { useState, useEffect } from "react";
import "./index.less";
import { Link } from "react-router-dom";
import axios from "axios";

const HomeTopic = (props) => {
	console.log(props.section);
	const [ topicData, setTopicData ] = useState([]);
	useEffect(()=> {
		axios({
			method:"GET",
			url:`http://yjxt.elatis.cn/posts/listPosts?category=${encodeURI(props.section)}`,
			headers: {
				token:localStorage.getItem("token")
			},
			params: {
				status: "draft"
			},
			data: {
				status: ""
			}
		}).then(res=> {
			console.log(res.data,"topic数据");
			setTopicData(res.data.data);
		});

	},[]);
	return (
		<div className='home-topic'>
			<div className='home-topic-header'>
				<span>{props.title}</span>
				<Link to={props.href}>
                    更多 >>
				</Link>
			</div>
			<div className='home-topic-content'>
				<ul>
					{
						topicData.map((item, index) => {
						  return (
						    <li className='home-topic-li' key={index}>
						      <Link to='/article?id=dasdas'>
						        {`${index + 1}. ${item.title}`}
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
	console.log(colsData);
	return (
		<div className='home-topics'>
			{
				colsData.slice(2, colsData.length).map((item, index) => {
					return (
						<HomeTopic title = {item.title} href = {`/index/message?type=${index+3}`} 
							section = {`/${item.title}/${item.sec[0].title}`} 
						/>
					);
				})
			}
		</div>
	);
};

export default HomeTopics;
