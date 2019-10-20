import React from "react"
import { Table, Input, InputNumber, Popconfirm, Form, Button, Select } from "antd";
import axios from "axios"
const { Option } = Select;
const data = [];
for (let i = 0; i < 100; i++) {
	data.push({
		key: i.toString(),
		name: `Edrward ${i}`,
		age: 32,
		a:"不洗碗",
		address: `London Park no. ${i}`,
	});
}
const EditableContext = React.createContext();

class EditableCell extends React.Component {
	handleChange =(value)=>{
		console.log(`selected ${value}`);
	}
  getInput = () => {
	  if(this.props.inputTypes ==="select" ){
		  return <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
			  <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
		  </Select>
	  }
  	return <Input style={{width:"100px"}}/>;
  };

  renderCell = ({ getFieldDecorator }) => {
  	const {
  		editing,
  		dataIndex,
  		title,
  		inputType,
  		record,
  		index,
  		children,
  		...restProps
  	} = this.props;
  	return (
  		<td {...restProps}>
  			{editing ? (
  				<Form.Item style={{ margin: 0 }}>
  					{getFieldDecorator(dataIndex, {
  						rules: [
  							{
  								required: true,
  								message: `Please Input ${title}!`,
  							},
  						],
  						initialValue: record[dataIndex],
  					})(this.getInput())}
  				</Form.Item>
  			) : (
  				children
  			)}
  		</td>
  	);
  };

  render() {
  	return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data, editingKey: "" };
		this.columns = [
			{
				title: "编号",
				dataIndex: "name",
				width:"10%",
				editable: true,
			},
			{
				title: "部门",
				dataIndex: "roles_id",
				width:"15%",
				editable: true,
			},
			{
				title: "姓名",
				dataIndex: "address",
				width:"10%",
				editable: true,
			},
			{
				title: "权限等级",
				dataIndex: "section",
				width:"10%",
				editable: true,
			},
			{
				title:'密码',
				dataIndex:'password',
				width:'10%',
				editable:true
			},
			{
				title: "操作",
				dataIndex: "operation",
				width:"15%",
				render: (text, record) => {
					const { editingKey } = this.state;
					const editable = this.isEditing(record);
					return editable ? (
						<div style={{width:'100px'}}>
							<EditableContext.Consumer>
								{form => (
									<a
										onClick={() => this.save(form, record.key)}
										style={{ marginRight: 8 }}
									>
                    保存
									</a>
								)}
							</EditableContext.Consumer>
							<a onClick={this.cancel} style={{color:'#1890ff'}}>取消</a>
							{/* <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
								<a>取消</a>
							</Popconfirm> */}
						</div>
					) : (
						<a disabled={editingKey !== ""} onClick={() => this.edit(record.key)}>
              修改
						</a>
					);
				},
			},
			{
				title:"删除",
				dataIndex:"delete",
				width:"10%",
				render:(item,record)=> {
					return (
						<Button onClick={()=>this.delete(record)}>删除</Button>
					)
				}
				
			}
		];
	}
//   componentDidMount(){

//     axios.get("http://yjxt.elatis.cn/users/listUsers").then(res=>{
// 		console.log(res)
// 	})
//   }
  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
  	this.setState({ editingKey: "" });
  };

  save(form, key) {
  	form.validateFields((error, row) => {
  		if (error) {
  			return;
  		}
  		const newData = [...this.state.data];
  		const index = newData.findIndex(item => key === item.key);
  		if (index > -1) {
  			const item = newData[index];
  			newData.splice(index, 1, {
  				...item,
  				...row,
  			});
  			this.setState({ data: newData, editingKey: "" });
  		} else {
  			newData.push(row);
  			this.setState({ data: newData, editingKey: "" });
  		}
  	});
  }

  edit(key) {
  	this.setState({ editingKey: key });
  }
  delete =(value)=>{
  	console.log(value)
  }
  render() {
  	const components = {
  		body: {
  			cell: EditableCell,
  		},
  	};

  	const columns = this.columns.map(col => {
  		if (!col.editable) {
  			return col;
  		}
  		return {
  			...col,
  			onCell: record => ({
  				record,
				  inputType: col.dataIndex === "age" ? "number" : "text",
				  inputTypes: col.dataIndex=== "section" || col.dataIndex==="roles_id"?"select":"text",
  				dataIndex: col.dataIndex,
  				title: col.title,
  				editing: this.isEditing(record),
  			}),
  		};
  	});

  	return (
  		<EditableContext.Provider value={this.props.form}>
  			<Table
  				components={components}
  				bordered
  				dataSource={this.state.data}
  				columns={columns}
  				rowClassName="editable-row"
  				pagination={{
  					onChange: this.cancel,
  				}}
				  scroll={{
					  x:'800'
				  }}
  			/>
  		</EditableContext.Provider>
  	);
  }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable