import React,{Component} from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { Table, Divider, Tag ,Menu,Layout} from "antd";
import {Search,Message} from "./search";
import WrappedNormalLoginForm from "./form";
import Tousu from "./form/tousu";
import "./index.less";
const { SubMenu } = Menu;
const { Sider } = Layout;
const columns = [
	{
		title: "序号",
		dataIndex: "key",
		key: "key",
		render: text => <a>{text}</a>,
	},
	{
		title: "留言消息",
		dataIndex: "age",
		key: "age",
	},
	{
		title: "回复消息",
		dataIndex: "address",
		key: "address",
	},
	{
		title: "留言时间",
		key: "tags",
		dataIndex: "tags"
	},
	{
		title: "回复时间",
		key: "name",
		dataIndex:"name"
	},
];
  
const data = [
	{
		key: "10086",
		name: "John Brown",
		age: 32,
		address: "New York No. 1 Lake Park",
		tags: "10:00"
	},
	{
		key: "2",
		name: "Jim Green",
		age: 42,
		address: "London No. 1 Lake Park",
		tags: "10:00"
	},
	{
		key: "3",
		name: "Joe Black",
		age: 32,
		address: "Sidney No. 1 Lake Park",
		tags: "10:00"
	},
];
let i
export default class Services extends Component{
	constructor(props) {
		super(props);
		this.state={
			key:"1",
			data:[]
		};
	}
	handleClick =(e)=> {
		console.log(e);
		this.setState({
			key:e.key
		});
	}
	componentDidUpdate(){
		const ctx=this
		 i=[...document.getElementsByClassName("ant-table-row-level-0")]

		if(i.length){			
			i.map((item)=>{
				item.addEventListener("click",function () {
					ctx.setState({
						key:"XAS"
					})
				})
			});
		}
    }
    // componentDidMount(){
    //     if(i.length){
	// 		i.map((item)=>{

	// 		})
	// 	}
    // }
	render() {
		return (
			<div className="yj-services">
				<Header/>
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
							this.state.key==="1"?<WrappedNormalLoginForm/>:(this.state.key==="2"?<Search columns={columns} dataSource={data}/>:(this.state.key==="3"?<Tousu/>:<Message/>))
						}
						{/* <Search columns={columns} dataSource={data}/> */}
						{/* <Message /> */}
						{/* <WrappedNormalLoginForm /> */}
						{/* <Tousu /> */}
					</section>   
				</div>
				<Footer/>
			</div>
		);
	}
}