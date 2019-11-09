
import React, { useState,useEffect } from "react";
import "./index.less";
// import Office from '/img/assest/Office.png'
import Homecarousel from "../../components/home-carousel";
import { Link } from "react-router-dom";
import {  Skeleton } from "antd";
import axios from "axios";



const NewsTopRight = (props) => {
	return (
		<div className='NewsTopRight'>
			<div className = "news-header">
				<span>
				事故调查
				</span>
				<Link to = "/index/message?type=2">
				更多>>
				</Link>
			</div>
			<ol className='News-Right'>
				{
					props.data.map((item, index) => {
						return (
							<Link to={ `/index/article?id=${item.id}` } key={index}>
								<li key={index}><a href=''><i /> &nbsp;{item.title}</a></li>
							</Link>
						);
					})
				}
			</ol>
		</div>
	);
};

const NewsBottomLeft = (props)=> {
	return (
		<div className='NewsBottomLeft'>
			<div className = "news-header">
				<span>
				行政许可
				</span>
				<Link to = "/index/message?type=2">
				更多>>
				</Link>
			</div>
			<ol className='News-Right'>
				{
					props.data.map((item, index) => {
						return (
							<Link to={ `/index/article?id=${item.id}` } key={index}>
								<li key={index}><a href=''><i /> &nbsp;{item.title}</a></li>
							</Link>
						);
					})
				}
			</ol>
		</div>
	);
};




const NewsBottomRight = (props) => {
	return (
		<div className='NewsBottomRight'>
			<div className = "news-header">
				<span>
				行政执法
				</span>
				<Link to = "/index/message?type=2">
				更多>>
				</Link>
			</div>
			<ol className='News-Right'>
				{
					props.data.map((item, index) => {
						return (
							<Link to={ `/index/article?id=${item.id}` } key={index}>
								<li key={index}><a href=''><i /> &nbsp;{item.title}</a></li>
							</Link>
						);
					})
				}
			</ol>
		</div>
	);
};

const News = () => {
	const [ data,setData ] = useState([]);
	useEffect(()=> { 
		const sort = [
			"/新闻中心/行政许可",
			"/新闻中心/行政执法",
			"/新闻中心/事故调查",
			
		];
		const data1 = JSON.stringify({
			limit:7,
			moduleArray:sort,
			status: "publish"
		});
		axios({
			method:"POST",
			url:"http://yjxt.elatis.cn/posts/listModulePost",
			headers: {
				"Content-Type":"application/json"
			},
			data: data1
		}).then(res=> {
			console.log("新闻页的数据",res.data.data);
			setData(res.data.data);
		});
	},[]);
	if(data.length !== 0) {
		return (
			<div className='news'>
				<Homecarousel   />
				<NewsTopRight  data = {data[0].post}/>
				<NewsBottomLeft  data = {data[1].post}/>
				<NewsBottomRight data = {data[2].post} />
			</div>
		);
	}
	else return (
		<Skeleton rows = {40} />
	);
};
export default News;
