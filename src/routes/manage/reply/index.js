import React from "react";
import {Table, Button,Divider,Modal,Input,message, Form} from "antd";
import axios from "axios";
const { TextArea } = Input;

class Reply extends React.Component{
	constructor(props){
		super(props);
		this.state={
			visible: false,
			data:[],
			message:"",
			a:""
		};
	}
	componentDidMount(){
		 this.getData();
	}
    getData=()=>{
    	axios({
    		url:"http://yjxt.elatis.cn/msgs/listMsgs?category=all&flag=2",
    		headers:{
    			"Content-Type":"application/json",
    			"token":localStorage.getItem("token")
    		},
    		method:"GET"
    	}).then(res=>{
    		let data=res.data.data;
    		data.map((item)=>{
    			if(item.category==="msg"){
    				item.category="局长信箱";
    			}else{
    				item.category="投诉";
    			}
    		});
    		this.setState({
    			data:data

    		});
    	});
    }
    showModal = (e) => {
    	console.log(e);
    	this.setState({
    		visible: true,
    		message:e
    	});
    };
    
      handleOk = e => {
      	if(!this.state.message.reply){
      		if(document.getElementById("reply-input").value===""){
      			message.error("回复内容不能为空");
      			return;
      		}else{
      			axios({
      				url:"http://yjxt.elatis.cn/msgs/addReply",
      				headers:{
      					"token":localStorage.getItem("token"),
      					"Content-Type":"application/json"
      				},
      				method:"POST",
      				data:{
      					reply:document.getElementById("reply-input").value,
      					id:this.state.message.id
      				}
      			}).then(res=>{
      				if(res.data.code===0){
      					message.success("回复成功");
      					this.setState({
      						visible: false,
      					});
      					this.getData();
      				}else{
      					message.error("错误 请重试");
      				}
      			});
      		}
      	}else{
      		this.setState({
      			visible: false,
      		});
      	}
      
      };
    
      handleCancel = e => {
      	console.log(e);
      	this.setState({
      		visible: false,
      	});
      };
      handleChange=(e)=>{
      	console.log(e);
      }
      handleDelete=(e)=>{
      	console.log(e);
      	axios({
      		method:"POST",
      		headers:{
      			"token":localStorage.getItem("token"),
      			"Content-Type":"application/json"
      		},
      		url:"http://yjxt.elatis.cn/msgs/delete",
      		data:{
      			id:e.id
      		}
      	}).then(res=>{
      		if(res.data.code===0){
      			message.success("删除成功");
      			this.getData();
      		}else{
      			message.error("错误请重试");
      		}
      	});
      }
      render(){
      	const columns = [
      		{
      			title:"标题",
      			dataIndex:"title",
      			key:"title"
      		},
      		{
      			title: "类型",
      			dataIndex: "category",
      			key: "name",
    
			  },
			  {
				 title:"状态",
				 key:"status",
				 render:(text,record) =>{
      				return  (
      					<div>
      						{record.reply?"已回复":"未回复"}
					 </div>
					  );
				 }
			  },
      		{
      			title: "操作",
      			key: "action",
      			render: (text, record) => (
      				<div>
      					<Button onClick={this.showModal.bind(this,record)}>{record.reply?"查看":"回复"}</Button>
      					<Divider type="vertical"/>
      					<Button onClick={this.handleDelete.bind(this,record)}>删除</Button>
           
      				</div>
      			)
      		},
      	];
          

          
      	return (
      		<div>
      			<Table columns={columns} dataSource={this.state.data} />
      			<Modal
      				title="回复内容"
      				visible={this.state.visible}
      				onOk={this.handleOk}
      				onCancel={this.handleCancel}
      				okText="确定"
      				cancelText="取消"
      			>   
      				<p>标题：{this.state.message.title}</p>
      				<p>内容：{this.state.message.content}</p>
      				<p>姓名：{this.state.message.name!==""?this.state.message.name:null}</p>
      				<p>标题：{this.state.message.title}</p>
      				<span>回复信息:</span>
      				{this.state.message.reply?this.state.message.reply:<TextArea rows={4} id="reply-input"/>}
      			</Modal>
      		</div>
      	);
      }
}
export default Reply;