import React from "react";
import { Menu, Icon, Layout, Input } from "antd";
import { Link } from "react-router-dom";
import "./header.less";
const { Search } = Input;
const SubMenu = Menu.SubMenu;
const { Header } = Layout;
export default class Top extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: ""
		};
	}
	componentDidMount() {
		this.getUser();
	}
    getUser = () => {
    	this.setState({
    		username: "后台管理系统"
    	});
    }
    clear = (item) => {
    	if (item.key === "logOut") {
    		this.props.clear();
    	}
    }
    render() {
    	return (
    		<Header style={{ background: "#fff"}} className = "manage-header">
    			<Search placeholder="请输入搜索关键字" style = {{width:"300px",marginRight:"15px"}}
    				onSearch={ (value) => {
    					if(value=="") {
    					}
    					else { window.location.href = `/manage/bmsSearch?key=${value}`;}
    				}} 
    				  />
					
    			<Icon
    				style = {{marginRight:"15px"}}
    				className="trigger"
    				type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
    				onClick={this.props.toggle}
    			/>
    			<Menu mode="horizontal" className="logOut" onClick={this.clear}>
    				<SubMenu title={<span><Icon type="user" />{ this.state.username }</span>} >
    					<Menu.Item key="logOut"><Link to="/login" >退出</Link></Menu.Item>
    				</SubMenu>
    			</Menu>
    		</Header>
    	);
    }
}