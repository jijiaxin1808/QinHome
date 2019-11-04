import React, { useState, useEffect } from "react";
// import styles from "./index.css";
// import userData from "../../../config/userData";
import { Form, Icon, Input, Button, message, Row, Col, Skeleton } from "antd";
import axios from "axios";
import qs from "qs";
import { connect } from "../../../../node_modules/dva";


class NormalLoginForm extends React.Component {
  handleSubmit = e => {
  	e.preventDefault();
  	this.props.form.validateFields((err, values) => {
  		if (!err) {
  			if(values.newpassword1 !== values.newpassword2) {
  				message.warn("两次输入的密码不一致");
  			}
  			else {
  				const data1 = {
  					newPassword: values.newpassword2,
  					oldPassword: values.oldpassword
  				};
  				const data = qs.stringify(data1);
  				axios({
  					method:"POST",
  					url:"http://yjxt.elatis.cn/users/alterPwd",
  					headers:{
  						"token":localStorage.getItem("token"),
  						"Content-Type":"application/x-www-form-urlencoded"
  					},
  					data: data
  				})
  					.then(
  						(res)=> {
  							if(res.data.code === 0) {
  								message.success("修改成功");
  								localStorage.clear();
  								window.location.href="/login";
                  
  							}
  							else {
  								message.error(res.data.message);
  							}

  						}
  					).catch((error)=>{
  						console.log(error);
  					});
  				//这里写更改密码的请求
  			}
  		}
  	});
  };

  render() {
  	const formItemLayout = {
  		labelCol: {
  			xs: { span: 24 },
  			sm: { span: 8 },
  		},
  		wrapperCol: {
  			xs: { span: 24 },
  			sm: { span: 8 },
  		},
  	};
  	const { getFieldDecorator } = this.props.form;
  	return (
  		<Form onSubmit={this.handleSubmit} /*className= { styles.input }*/ {...formItemLayout} >

  			<Form.Item label="原密码">
  				{getFieldDecorator("oldpassword", {
  					rules: [{ required: true, message: "请输入原始密码!" }],
  				})(
  					<Input
  						prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
  						type="password"
  						placeholder="请输入原始密码"
  					/>,
  				)}
  			</Form.Item>
  			<Form.Item label="新密码"> 
  				{getFieldDecorator("newpassword1", {
  					rules: [{ required: true, message: "请输入新密码!" },
  						{min:6, message:"至少六个字符"},
  						{ max:16, message:"最多16个字符" }

  					],
  				})(
  					<Input
  						prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
  						type="password"
  						placeholder="第一次输入密码"
  					/>,
  				)}
  			</Form.Item>
  			<Form.Item label="再次输入密码">

  				{getFieldDecorator("newpassword2", {
  					rules: [{ required: true, message: "请输入新密码!" }],
  				})(
  					<Input
  						prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
  						type="password"
  						placeholder="第二次输入密码"
  					/>,
  				)}
  			</Form.Item>
  			<Form.Item className = {"user-alter"} style = {{display:"flex",justifyContent:"center"}}>
  				{/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)} */}
  				<Button htmlType="submit" style = {{margin: "0 auto"}}   >
            修改密码
  				</Button>
				  
  			</Form.Item>
  		</Form>
  	);
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(NormalLoginForm);

const User = (props)=> {
	const [ userData,setUserData ] = useState([]);
	useEffect(()=>{
		axios({
			method:"GET",
			url: "http://yjxt.elatis.cn/users/tokenLogin",
			headers: {
				token: localStorage.getItem("token")
			}
		}).then(res=> {
			if(res.data.code === 0) {
				setUserData(res.data.data);
			}
		});	
	},[]);
	if(userData.length !==0) {
		console.log(userData,"usersuusus");
		return (
			<div>
				<div className = {"userInfo"}>
					<div className = { "title" }>
						<span>
							用户信息
						</span>
				
					</div> 
					<p style = {{fontSize:"18px",margin:"20px auto",width:"300px"}}>{ `用户: ${userData.name }`}</p>
					{/* <p>{ `姓名： ${props.login.userName}`}</p> */}
					<p style = {{fontSize:"18px",margin:"20px auto",width:"300px"}}>{ `部门: ${userData.section}`}</p>
				</div>
		
				<Row >
					<Col span = {12} offset = {6} >
						<WrappedNormalLoginForm />
					</Col>
				</Row>

			</div>
		);
	}
	else return (
		<Skeleton rows = {40} />
	);

};


export default connect(({login})=>({login}))(User);