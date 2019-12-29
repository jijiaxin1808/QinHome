/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import "./index.less";
import System from "../../components/system";
import HomeTopics from "../../components/homeTopics";
import HomeCarousel from "../../components/home-carousel";
import Weather from "./weather";
import Tabs from "../../components/tabs";
import { Link } from "react-router-dom";
import { message,Dropdown,Button,Menu, Select } from "antd";
import {friendLink, otherLink }from "../../config/friendLink";
import axios from "axios";
import TextScroll from "react-textscroll";
import * as Front from "../../api/Front";
import HideBar from "../../components/hideBar";

const { Option } = Select
const OtherLink = ()=> {
	return (
		<Select style = {{width:"250px",marginLeft:"20px"}}  onChange = {(value)=>{window.open(value)}} defaultValue = {"市直部门网站"}>
		{
			otherLink.map((item,index)=> {
				return (
					<Option value = {item.href}>
						{item.title}
				  </Option>
				)

			})
		}
	</Select>
	)
}

const FriendLink = () => {
	return (
		<div className='footer-friendlink'>
			<div className='friendlink-header'>友情链接</div>

			<div className='friendlink-link'>
				{
					friendLink.map((item, index) => {
						return (
							<a alt={item.name} key={index} href={item.href} target = "_blank">
								{item.name}
							</a>
						);
					})
				}
				<OtherLink />
			</div>
		</div>
	);
};

const FooterTopic = () => {
	const [topicData, setData] = useState([]);
	useEffect(() => {
		Front.modelTopicCol().then((res) => {
			if (res.data.code === 0) {
				setData(res.data.data);
			} else {
				message.error(res.data.code);
			}
		});
	}, []);

	return (
		<div className='footer-topic'>
			<div className='footer-topic-header'><span>专题专栏</span></div>
			<div className='footer-topic-content'>
				{
					topicData.map((item, index) => {
						return (
							<div className='footer-topic-item' key={index}>
								<Link to={item.url} style={{ display: "block" }}>
									<img src={item.picUrl} style={{ height: "111px", width: "250px", verticalAlign: "middle" }} />
								</Link>
							</div>
						);
					})
				}
			</div>
		</div>
	);
};

const Home = () => {
	const [colsData, setColsData] = useState([]);
	const [backgroundUrl, setbackgroundUrl] = useState("");
	const [annouces, setAnnouces] = useState([]);

	useEffect(() => {
		Front.modelCloumn().then(res => {
			if (res.data.code === 0) {
				setColsData(res.data.data);
			}
		})
		Front.modelSafe().then((res) => {
			if (res.data.code === 0) {
				let _data = [];
				res.data.data.map(item => {
					if(item.isShow) {
						_data.push(
							<a title={item.title} href={`${item.href}`} className = "safe-jjx-a" style={{color: "#333", fontSize: "18px"}}>{item.title}</a>
						);
						return null;
					}
					return null;
				});
				setAnnouces(_data);
			}
		});
		Front.modelBackground().then((res) => {
			if (res.data.code === 0) {
				setbackgroundUrl(res.data.data[0].picUrl);
			}
		});
	},[]);

	return (
		<div className='home' style={{ backgroundImage: `url(${backgroundUrl})`, backgroundSize: "cover", width: "100%", margin: "0 auto" }}>
			<div className='mainBan'>
				<div className="info-container">
					<span className="home-info">
						<i className="info-icon">公告</i>
					</span>
					{
						annouces.length!==0 &&
						<div style={{marginLeft:"0px",width:"725px",marginRight:"20px"}}>
							<TextScroll 
								mode="horizontal"
								text={annouces}
								speed={4000}
							/>
						</div>
					}
					<Weather />
				</div>
				<HideBar />
				<div className='container' style={{ display: "flex", flexFlow: "row nowrap", width: "1080px", margin: "0 auto" }}>
					<HomeCarousel />
					<Tabs />
				</div>
				<System />
				<HomeTopics colsData={colsData} />
				<FooterTopic />
				<FriendLink />
			</div>
		</div>
	);
};
export default Home;
