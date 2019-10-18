import React from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import "./content.less";
import Menu from "../account";
import announcement from "../user";
const { Content } = Layout;
export default class Contents extends React.Component {
	render() {
		return (
			<Content className="content">
				<Route path="/manage/index" component={Menu} />
				<Route path="/manage/announcement" component={announcement} />
			</Content>
		);
	}
}