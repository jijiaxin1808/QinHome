import React, {Suspense, lazy} from "react";
import Loading from "../../../components/loading";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import "./content.less";
// const Menu = lazy(() => import("../account"));
// const Announcement = lazy(() => import("../user"));
// const Log = lazy(() => import("../log"));
// const Notification = lazy(() => import("../notification"));
// const Account = lazy(() => import("../account"));
// const Block = lazy(() => import("../block"));
// const Create = lazy(() => import("../context/create"));
// const Change = lazy(() => import("../context/change"));
// const Context = lazy(() => import("../context"));
// const Column = lazy(() => import("../column"));
// const BmsSearch = lazy(() => import("../bms-search"));
// const Bumen = lazy(() => import("../account/bumen"));
// const Reply = lazy(() => import("../reply"));
// const File = lazy(() => import("../directory/file"));
// const EditFirst = lazy(() => import("../column/editFirst"));
// const EditSecond = lazy(() => import("../column/editSecond"));

import Change from "../context/change";
import Context from "../context";
import Column from "../column";
import BmsSearch from "../bms-search";
import Bumen from "../account/bumen";
import Reply from "../reply";
import File from "../directory/file";
import EditFirst from "../column/editFirst";
import EditSecond from "../column/editSecond";

import Menu from "../account";
import Announcement from "../user";
import Log from "../log";
import Notification from "../notification";
import Account from "../account";
import Block from "../block";
import Create from "../context/create";

const { Content } = Layout;
export default class Contents extends React.Component {
	render() {
		return (
			<Suspense fallback={<Loading />} maxDuration={500}>
			<Content className="content">
				<Route path="/manage/index" component={Menu} />
				<Route path="/manage/announcement" component={Announcement} />
				<Route path="/manage/log" component={Log} />
				<Route path="/manage/notification" component={Notification} />
				<Route path="/manage/account" component={Account} />
				<Route path="/manage/block" component={Block} />
				<Route path="/manage/create" component={Create} />
				<Route path="/manage/change/:id" component={Change}/>
				<Route path="/manage/column" component={Column} />
				<Route path="/manage/BmsSearch" component={BmsSearch} />
				<Route path="/manage/bumen" component={Bumen}/>
				<Route path="/manage/context" component={Context}/>
				<Route path="/manage/reply" component={Reply}/>
				<Route path="/manage/file" component={File}/>
				<Route path="/manage/editFirst" component={EditFirst}/>
				<Route path="/manage/editSecond" component={EditSecond}/>
			</Content>
			</Suspense>
		);
	}
}
