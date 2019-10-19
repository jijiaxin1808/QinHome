import React from "react"
import { Table,Modal, Button, Select,Divider ,Tag} from "antd";
import axios from "axios"
const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
	children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const data = [
	{
		key: "1",
		name: "John Brown",
		age: 32,
		address: "New York No. 1 Lake Park",
		tags: ["nice", "developer"],
	},
	{
		key: "2",
		name: "Jim Green",
		age: 42,
		address: "London No. 1 Lake Park",
		tags: ["loser"],
	},
	{
		key: "3",
		name: "Joe Black",
		age: 32,
		address: "Sidney No. 1 Lake Park",
		tags: ["cool", "teacher"],
	},
];
class EditableFormTable extends React.Component{
	constructor(props){
		super(props)
		this.state={
			visible:false
		}
	}
    showModal = () => {
    	this.setState({
    		visible: true,
    	});
    };
    
      handleOk = e => {
      	console.log(e);
      	this.setState({
      		visible: false,
      	});
      };
    
      handleCancel = e => {
      	console.log(e);
      	this.setState({
      		visible: false,
      	});
      };
      handleChange= (value)=> {
      	console.log(`selected ${value}`);
      }
      
      render(){
      	const columns = [
      		{
      			title: "部门名称",
      			dataIndex: "name",
      			key: "name"
      		},
      		{
      			title: "已有权限",
      			dataIndex: "age",
      			key: "age",
      		},

      		{
      			title: "操作",
      			key: "action",
      			render: (text, record) => (
      				<Button onClick={this.showModal}>修改</Button>
      			),
      		},
      	];
          
      	return (
            <><Table columns={columns} dataSource={data} /><div>
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
            			placeholder="Please select"
            			defaultValue={["a10", "c12"]}
            			onChange={this.handleChange}
            		>
            			{children}
            		</Select>,
              	</Modal>
            </div></>
      	)
      }
}
export default EditableFormTable