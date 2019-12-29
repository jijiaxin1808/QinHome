import React,{Suspense} from "react";
import { Route } from "dva/router";
import Loading from "./components/loading";
import Home from "./routes/home";
import Article from "./routes/article";
import Footer from "./components/footer";
import Header from "./components/header";
import Message from "./routes/message";
import Search from "./routes/search";
import Services from "./routes/services";
import Links from "./routes/Links";

const routers= [
	{
		name: "首页",
		path: "/index/index",
		component: Home,
		key: 0
	},
	{
		name: "文章",
		path: "/index/article",
		component: Article,
		key: 1
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
		key: 3
	},
	{
		name: "搜索",
		path: "/index/search",
		component: Search,
		key: 4
	},
	{
		name: "链接",
		path: "/index/links",
		component: Links,
		key: 5
	}
];

export default function MainApp (props) {
	return (
		<div>
			<Header  />
			<Suspense fallback={<Loading />}>
				{
					routers.map(({ name, path, exact = true, component }) => {
						return (
							<Route path={path} exact={exact} component={component} key={name} />
						);
					})
				}
			</Suspense>
			<Footer />
		</div>
	);
}