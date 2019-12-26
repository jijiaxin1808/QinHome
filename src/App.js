import React,{Suspense} from "react";
import {  Route } from "dva/router";
import Loading from "./components/loading";
import Home from "./routes/home";
import News from "./routes/news";
import Article from "./routes/article";
import Footer from "./components/footer";
import Header from "./components/header";
import Message from "./routes/message";
import headerData from "./config/headerData";
import Search from "./routes/search";
import Services from "./routes/services";
import JJX from "./components/jjxnb";
import FriendLink from "./routes/Links";

const routers= [
	{
		name: "首页",
		path: "/index/index",
		component: Home,
		key: 0
	},
	{
		name: "新闻中心",
		path: "/index/news",
		component: News,
		key: 1
	},
	{
		name: "文章",
		path: "/index/article",
		component: Article,
		key: 2
	},
	{
		name: "栏目",
		path: "/index/message",
		component: Message,
		key: 2
	},	{
		name: "栏目",
		path: "/index/services",
		component: Services,
		key: 2
	},
	{
		name: "搜索",
		path: "/index/search",
		component: Search,
		key: 2
	},
	{
		name: "jjx",
		path: "/index/index/jjxnb",
		component: JJX,
		key: 0
	},
	{
		name: "链接",
		path: "/index/links",
		component: FriendLink,
		key: 2
	},
];

export default function MainApp (props) {
	// console.log(window.location.pathname)
	return (
		<div>
			<Header barData={headerData} />
			<Suspense fallback={<Loading />}>
				{/* <Switch> */}
				{routers.map(({ name, path, exact = true, component }) => {
					return (
						<Route path={path} exact={exact} component={component} key={name} />
					);
				})}
				{/* {window.location.pathname ==="/index/index" || window.location.pathname==="/index/news"?null:<Message messageData={messageData} />} */}
				{/* </Switch> */}
			</Suspense>
			<Footer />
		</div>
	);
}