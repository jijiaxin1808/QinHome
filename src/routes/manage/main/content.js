import React from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import "./content.less";
import Menu from "../account";
import announcement from "../user";
import Log from "../log";
import notification from "../notification";
import account from "../account";
import block from "../block";
import create from "../context/create";
import column from "../column";
import BmsSearch from "../bms-search";

const { Content } = Layout;
export default class Contents extends React.Component {
	render() {
		return (
			<Content className="content">
				<Route path="/manage/index" component={Menu} />
				<Route path="/manage/announcement" component={announcement} />
				<Route path="/manage/log" component={Log} />
				<Route path="/manage/notification" component={notification} />
				<Route path="/manage/account" component={account} />
				<Route path="/manage/block" component={block} />
				<Route path="/manage/create" component={create} />
				<Route path="/manage/column" component={column} />
				<Route path="/manage/BmsSearch" component={BmsSearch} />

			</Content>
		);
	}
}