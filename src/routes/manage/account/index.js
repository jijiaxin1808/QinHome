import React from "react"
import { Table, Input, message, Popconfirm, Form, Button, Select } from "antd";
import axios from "axios"
import "./index.css"
import { EOVERFLOW } from "constants";
const { Option } = Select;
const EditableContext = React.createContext();
class EditableCell extends React.Component {
	constructor(props){
		super(props)
		this.state={
			bumen:[]
		}
	}
	handleChange =(value)=>{
		this.setState({
			bm:value
		})
	}
	handleChanges=(value)=>{
		this.setState({
			qx:value
		})
	}
  getInput = () => {
	  console.log(this.props)
	  if(this.props.inputTypes ==="select" ){
		  if(this.props.dataIndex==="roles_id"){
			  return (
				  <Select default="lucy" style={{width:120}} onChange={this.props.handleChange}>
  					<Option value={1}>管理员</Option>
  					<Option value={2}>普通管理</Option>
				  </Select>
			  )
		  }else{
  			return (
  				<Select defaultValue="lucy" style={{ width: 120 }} onChange={this.props.handleChange}>
  					{
  						this.props.bumen.map((item)=>{
					  return (
  								<Option value={item.section} key={item.id}>{item.section}</Option>
					  )
				  })
  					} 
  				</Select>
			  )
		  }
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
		this.state = { data:[], editingKey: "" ,bumen:[],bm:" ",qx:" ",add:false};
		this.columns = [
			{
				title: "编号",
				dataIndex: "number",
				width:"10%",
				editable: true,
			},
			{
				title: "部门",
				dataIndex: "section",
				width:"15%",
				editable: true,
			},
			{
				title: "姓名",
				dataIndex: "name",
				width:"10%",
				editable: true,
			},
			{
				title: "权限等级",
				dataIndex: "roles_id",
				width:"10%",
				editable: true,
			},
			{
				title:"密码",
				dataIndex:"password",
				width:"10%",
				render:(text,record)=>{
					return (
						<Popconfirm
							title="重置后密码为123456!"
							onConfirm={this.confirm.bind(this,record)}
							onCancel={this.cancels}
							okText="确定"
							cancelText="取消"
					  >
							<Button type="primary">重置</Button>
					  </Popconfirm>
					)
				}
			},
			{
				title: "操作",
				dataIndex: "operation",
				width:"15%",
				render: (text, record) => {
					const { editingKey } = this.state;
					const editable = this.isEditing(record);
					return editable ? (
						<div style={{width:"100px"}}>
							<EditableContext.Consumer>
								{form => (
									<a
										onClick={() => this.save(form, record.key,this.state.add)}
										style={{ marginRight: 8 }}
									>
                    保存
									</a>
								)}
							</EditableContext.Consumer>
							<a onClick={this.cancel} style={{color:"#1890ff"}}>取消</a>
							{/* <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
								<a>取消</a>
							</Popconfirm> */}
						</div>
					) : (
						<a disabled={editingKey !== ""} onClick={() => this.edit(record)}>
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
	componentDidMount(){
		this.getData()
		this.getBumen()
	
	}
	getData=()=>{
		axios({
			method: "GET",
			headers: {
				"token":localStorage.getItem("token") ,
				"Content-Type": "application/json"
			},
			url: "http://yjxt.elatis.cn/users/listUsers"
		}).then(res=>{
			console.log(res)
			this.setState({
				data:res.data.data
			})
		})
	}
	getBumen=()=>{
		axios({
			method:"GET",
			headers:{
				"token":localStorage.getItem("token"),
				"Content-Type":"application/json"
			},
			url:"http://yjxt.elatis.cn/users/listSection"
		}).then(res=>{
			console.log(res.data)
			if(res.data.code===0){
				this.setState({
					bumen:res.data.data
				})
			}
		})
	}
	handleChange =(value)=>{
		this.setState({
			bm:value
		})
	}
	handleChanges=(value)=>{
		this.setState({
			qx:value
		})
	}
	confirm=(e)=> {
		console.log(e);
		axios({
			method:"POST",
			headers:{
				"token":localStorage.getItem("token"),
				"Content-Type":"application/json"
			},
			url:"http://yjxt.elatis.cn/users/alterOtherInfo",
			data:{
				password:"123456!",
				id:e.id,
				section:e.section,
				roles_id:e.roles_id
			}
		}).then(res=>{
			if(res.data.code===0){
				message.success("重置成功");
			}else{
				message.error("出现错误请重试")
			}
		})
	  }
	  
	  cancels=(e) =>{
	  	console.log(e);
	  	message.error("取消成功");
	  }
  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
	  this.setState({ editingKey: "",add:false });
	  if(this.state.add){
		let data=this.state.data.slice(0)
		data.splice(data.length-1,1)
		this.setState({
			data:data
		})
	  }
  };
  //新建账号 
  addAccount=()=>{
	  const index=Date.parse(new Date())
	  const data={
		  number:'',
		  name:'',
		  section:'',
		  roles_id:'',
		  key:index
	  }
	  new Promise(function (resolve,reject){
		  resolve()
	  }).then(()=>{
  		this.setState({
			  data:[...this.state.data,data],
			  add:true
  		})
	  }).then(()=>{
  		this.edit(data)
	  }).catch((error)=>{
		  message.error(error)
	  })
	  


  }
  changeMessage =(item,row)=>{
  	axios({
  		method:"POST",
  		headers:{
  			"token":localStorage.getItem("token"),
  			"Content-Type":"application/json"
  		},
  		url:"http://yjxt.elatis.cn/users/alterOtherInfo",
  		data:{
  			id:item.key,
  			section:this.state.bm,
  			roles_id:this.state.qx,
  			name:row.name
  		}
  	}).then(res=>{
  		console.log(res)
  		if(res.data.code===0){
  			message.success("修改成功")
  		}
  	})
  }
  addMessage=(item,row)=>{
	  console.log(item,row,this.state)
  	axios({
  		method:"POST",
  		headers:{
  			"token":localStorage.getItem("token"),
  			"Content-Type":"application/json"
  		},
  		url:"http://yjxt.elatis.cn/users/register",
  		data:{
  			number:row.number,
  			section:row.section,
  			roles_id:row.roles_id,
  			name:row.name
  		}
  	}).then(res=>{
  		console.log(res)
  		if(res.data.code===0){
  			message.success("添加成功")
  		}
  	})
  }
  save(form, key,type) {
  	form.validateFields((error, row) => {
  		if (error) {
  			return;
  		}
  		const newData = [...this.state.data];
		  const index = newData.findIndex(item => key === item.key);
		  const item=newData[index]
		  console.log(row)
		  console.log(type)
  		if(type){
  			this.addMessage(item,row)
  		}else{
  			this.changeMessage(item,row)
  		}
  		if (index > -1) {
  			const item = newData[index];
  			newData.splice(index, 1, {
  				...item,
  				...row,
  			});
  			this.setState({ data: newData, editingKey: "" ,add:false});
  		} else {
  			newData.push(row);
  			this.setState({ data: newData, editingKey: "" ,add:false});
  		}
  	});
  }

  edit(record) {
	  this.setState({ editingKey: record.key });
	  this.setState({
		  bm:record.section,
		  qx:record.roles_id
	  })
  }
  delete =(value)=>{
	  console.log(value)
	  axios({
		  method:"POST",
		  headers:{
			  "token":localStorage.getItem("token"),
			  "Content-Type":"application/json"
		  },
		  url:"http://yjxt.elatis.cn/users/delete",
		  data:{
			  id:value.key
		  }
	  }).then(res=>{
		 if(res.data.data===0){
			 message.success("删除成功")
		 }
	  })
  	this.getData()
  }

  render() {
  	const components = {
  		body: {
  			cell: EditableCell,
  		},
	  };
	  const ctx=this
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
				  bumen:this.state.bumen ,
				  handleChange:this.handleChange,
				  handleChanges:this.handleChanges
  			}),
  		};
  	});

  	return (
  		<div >
		   <div className="qx">
  				<Button type="primary" onClick={this.addAccount} disabled={this.state.add}>新建账号</Button>
		   </div>
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
					  x:"800"
				  }}
  			/>
  		</EditableContext.Provider>
		  </div>
  	);
  }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable