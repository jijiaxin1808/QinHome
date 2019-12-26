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
import friendlinkData from "../../config/friendlinkData";
import axios from "axios";
import TextScroll from "react-textscroll";
import otherLinkData from "../../config/otherLink";

const { Option } = Select
const OtherLink = ()=> {
	return (
		<Select style = {{width:"250px",marginLeft:"20px"}}  onChange = {(value)=>{window.open(value)}} defaultValue = {"市直部门网站"}>
		{
			otherLinkData.map((item,index)=> {
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
					friendlinkData.map((item, index) => {
						return (
						// eslint-disable-next-line react/react-in-jsx-scope
							// eslint-disable-next-line react/jsx-no-target-blank
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
		axios.get("http://yjxt.elatis.cn/options/name/topicCol").then((res) => {
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
		axios.get("http://yjxt.elatis.cn/options/name/column").then(res => {
			if (res.data.code === 0) {
				setColsData(res.data.data);
			}
		}).catch(err => {
			message.error(err);
		});
		axios.get("http://yjxt.elatis.cn/options/name/safe").then((res) => {
			if (res.data.code === 0) {

				let _data = [];
				res.data.data.map(item => {
					if(item.isShow) {
						console.log("push了数据",item);
						_data.push(
							<a title={item.title} href={`${item.href}`} className = "safe-jjx-a" style={{color: "#333", fontSize: "18px"}}>{item.title}</a>
						);
						return null;
					}
					return null;
				});
				setAnnouces(_data);
				console.log("设置了数据",_data);
			}
		});
		axios.get("http://yjxt.elatis.cn/options/name/background").then((res) => {
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
								speed={6000}
							/>
						</div>
					}
					<Weather />
				</div>
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
