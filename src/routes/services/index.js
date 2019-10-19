import React,{Component} from 'react'
import Footer from "../../components/footer";
import Header from "../../components/header";
import { Table, Divider, Tag ,Menu,Layout} from 'antd';
import {Search,Message} from './search'
import "./index.less"
import Slider from 'react-slick';
const { SubMenu } = Menu;
const { Sider } = Layout
const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: text => <a>{text}</a>,
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'Tags',
		key: 'tags',
		dataIndex: 'tags',
		render: tags => (
			<span>
				{tags.map(tag => {
					let color = tag.length > 5 ? 'geekblue' : 'green';
					if (tag === 'loser') {
						color = 'volcano';
					}
					return (
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					);
				})}
			</span>
		),
	},
	{
		title: 'Action',
		key: 'action',
		render: (text, record) => (
			<span>
				<a>Invite {record.name}</a>
				<Divider type="vertical" />
				<a>Delete</a>
			</span>
		),
	},
];
  
const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer'],
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser'],
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
];
  
export default class Services extends Component{
	render() {
		return (
			<div className="yj-services">
				<Header/>
				<div className="services">
					<Layout>
						<Sider width={200} style={{ background: '#fff' }}>
							<Menu
								onClick={this.handleClick}
								style={{ width: 200 }}
								defaultSelectedKeys={['1']}
								defaultOpenKeys={['sub1']}
								mode="inline"
							>
								<Menu.Item key="1">Option 1</Menu.Item>
								<Menu.Item key="2">Option 2</Menu.Item>
								<Menu.Item key="3">Option 3</Menu.Item>
								<Menu.Item key="4">Option 4</Menu.Item>
							</Menu>
						</Sider>
					</Layout>
					{/* <div className="services-left">
						
					</div> */}
					<section className="services-main">
						<Search columns={columns} dataSource={data}/>
						<Message />
					</section>   
				</div>
				<Footer/>
			</div>
		)
	}
}