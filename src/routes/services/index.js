import React,{Component} from "react";
import { Menu,Layout} from "antd";
import {Search,Message} from "./search";
import WrappedNormalLoginForm from "./form";
import Tousu from "./form/tousu";
// import axios from "axios";
import "./index.less";
import * as Front from "../../api/Front";

const { Sider } = Layout;
const columns = [
	{
		title: "留言消息",
		dataIndex: "title",
		key: "title",
	},
	{
		title: "回复消息",
		dataIndex: "reply",
		key: "reply",
	},
	{
		title: "留言时间",
		key: "created_at",
		dataIndex: "created_at"
	},
	{
		title: "回复时间",
		key: "updated_at",
		dataIndex:"updated_at"
	},
];
let i;
export default class Services extends Component{
	constructor(props) {
		super(props);
		this.state={
			key:"1",
			data:[],
			message:"",
			n:1
		};
	}
	handleClick =(e)=> {
		this.setState({
			key:e.key
		});
	}
	shouldComponentUpdate(nextProps, nextState){
	  if(this.state.key===nextState.key&&this.state.n===nextState.n){
		  return false;
	  }else{
		  return true;
	  }
	}
	componentDidUpdate(){
		const params = {
			category: "all",
			flag: 1
		};
		Front.listMsgs(params).then(res=>{
			if(res.data.code===0){
				this.setState({
					data:res.data.data,
					n:this.state.key+1
				});
			}
		});
		const ctx=this;
		 i=[...document.getElementsByClassName("ant-table-row-level-0")];

		if(i.length){			
			i.map((item)=>{
				item.addEventListener("click",function () {
					ctx.setState({
						key:"XAS",
						 message:ctx.state.data[item.getAttribute("data-row-key")]
					});
				});
				return null;
			});
		}
	}

	render() {
		console.log(this.state);
		return (
			<div className="yj-services">
				<div className="services">
					<div className="services-slider">
						<Layout >
							<Sider width={200} style={{ background: "#fff" }}>
								<Menu
									onClick={this.handleClick}
									style={{ width: 200 }}
									defaultSelectedKeys={["1"]}
									defaultOpenKeys={["sub1"]}
									mode="inline"
								>
									<Menu.Item key="1">局长信箱</Menu.Item>
									<Menu.Item key="2">网上咨询</Menu.Item>
									<Menu.Item key="3">网上投诉</Menu.Item>
								</Menu>
							</Sider>
						</Layout>
					</div>
					<section className="services-main">
						{
							this.state.key==="1"?<WrappedNormalLoginForm/>:(this.state.key==="2"?<Search columns={columns} dataSource={this.state.data} showQuickJumper = {true}/>:(this.state.key==="3"?<Tousu/>:<Message data={this.state.message}/>))
						}
					</section>   
				</div>
			</div>
		);
	}
}