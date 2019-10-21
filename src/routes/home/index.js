/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import "./index.less";
import System from "../../components/system";
import HomeTopics from "../../components/homeTopics";
import HomeCarousel from "../../components/home-carousel";
import Weather from "./weather";
import Tabs from "../../components/tabs";
import { Link } from "react-router-dom";
import { message, Tooltip } from "antd";
import friendlinkData from "../../config/friendlinkData";
import axios from "axios";
import TextScroll from 'react-textscroll';

const data = [
	{
		href: "",
		picUrl: ""
	}, {
		href: "",
		picUrl: ""
	}, {
		href: "",
		picUrl: ""
	}
];
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
const FriendLink = () => {
	return (
		<div className='footer-friendlink'>
			<div className='friendlink-header'>友情链接</div>

			<div className='friendlink-link'>
				{
					friendlinkData.map((item, index) => {
						return (
						// eslint-disable-next-line react/react-in-jsx-scope
							<a alt={item.name} key={index} href={item.href}>
								{item.name}
							</a>
						);
					})
				}
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
									<img src={item.picUrl} style={{ height: "118px", width: "192px", verticalAlign: "middle" }} />
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
				setAnnouces(res.data.data.map(item => (
						<a title={item.title} href={`${item.href}`} style={{color: "#333", fontSize: "18px"}}>{item.title}</a>
				)))
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
						<div style={{marginLeft: -97}}>
							<TextScroll 
								mode="vertical"
								text={annouces}
								speed={3000}
							/>
						</div>
					}
					<Weather />
				</div>
				<div className='container' style={{ display: "flex", flexFlow: "row nowrap", width: "1080px", margin: "0 auto" }}>
					<HomeCarousel data={data} />
					<Tabs data={tabsData} />
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
