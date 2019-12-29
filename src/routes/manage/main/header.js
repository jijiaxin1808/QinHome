import React from "react";
import {  Icon, Layout, Input } from "antd";
import { Link } from "react-router-dom";
import "./header.less";
import { connect } from "dva";

const { Search } = Input;
const { Header } = Layout;
class Top extends React.Component {
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
    		<Header style={{ background: "#fff"}} >
			    			<Icon
    				style = {{marginRight:"15px"}}
    				className="trigger"
    				type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
    				onClick={this.props.toggle}
    			/>
    			<Search placeholder="请输入搜索关键字" style = {{width:"300px",marginRight:"15px"}}
    				onSearch={ (value) => {
    					if(value=== "") {
    					}
    					else { window.location.href = `/manage/bmsSearch?key=${value}`;}
    				}} 
    				  />
					      			<Link to = "/login"  className = "header-icons">
    				<Icon type="logout"   onClick = {()=>{
    				localStorage.clear();
    				window.location.href = "/login";
    			}}/>
				 </Link>
				 <Link to = "notification" className = "header-icons" ><Icon type="message" /></Link>
    			<Link to = "/index/index" className = "header-icons" ><Icon type="home" /></Link>
    		</Header>
    	);
    }
}

export default connect(({login})=>({login}))(Top);