import React from "react"
import { Table,Modal, Button, Select,Divider ,Tag, message} from "antd";
import axios from "axios"
import Modals from './modal'
const { Option } = Select;


class EditableFormTable extends React.Component{
	constructor(props){
		super(props)
		this.state={
			visible:false,
			data:[],
			power:[],
			value:[],
			key:''
		}
	}
	componentDidMount(){
		axios({
			method:'GET',
			headers:{
				"token":localStorage.getItem("token"),
				"Content-Type":"application/json"
			},
			url:"http://yjxt.elatis.cn/powers/list"
		}).then(res=>{
			console.log(res)
			this.setState({
				data:res.data.data,
				power:res.data.power
			})
		})
	}
    showModal = (e) => {
    	const data=e.module.split('-')
    	this.setState({
    		children:data,
    		visible: true,
    		key:e.id
    	})
    };
    
      handleOk = e => {

      	this.setState({
      		visible: false,
		  });
		  let data={
			  id:this.state.key,
			  module:this.state.children.join('-')
		  }
		  console.log(data)
      	axios({
      		method:'POST',
      		headers:{
      			"Content-Type":'application/json',
      			"token":localStorage.getItem("token")
      		},
      		url:'http://yjxt.elatis.cn/powers/alter',
      		data:data
      	}).then(res=>{
      		if(res.data.code===0){
				  message.success("修改成功")
			  }
      	})
      };
    
      handleCancel = e => {
      	console.log(e);
      	this.setState({
      		visible: false,
      	});
      };
      handleChange= (value)=> {
      	console.log(value)
      	this.setState({
      		children:value
      	})
      }
      
      render(){
      	const columns = [
      		{
      			title: "部门名称",
      			dataIndex: "section",
      			key: "name"
      		},
      		{
      			title: "已有权限",
      			dataIndex: "module",
      			key: "age",
      		},

      		{
      			title: "操作",
      			key: "action",
      			render: (text, record) => (
      				<Button onClick={this.showModal.bind(this,record)}>修改</Button>
      			),
      		},
      	];
          
      	return (
            <><Table columns={columns} dataSource={this.state.data} /><div>
              	<Modal
              		title="修改权限"
              		visible={this.state.visible}
              		onOk={this.handleOk}
              		onCancel={this.handleCancel}
            		cancelText="取消"
            		okText="确定"
              	>
            		<Select
            			mode="multiple"
            			style={{ width: "100%" }}
            			placeholder="请选择"
            			value={this.state.children}
            			onChange={this.handleChange}
            		>
            			{this.state.power.map((item,index)=>{
            				return (
            					<Option key={index} value={item}>{item}</Option>
            				)
            			})}
            		</Select>,
              	</Modal>
            </div></>
      	)
      }
}
export default EditableFormTable