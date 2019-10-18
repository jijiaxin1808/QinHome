import React from "react";
import styles from "./index.css";
import userData from "../../../config/userData";
import { Form, Icon, Input, Button, message, Row, Col } from 'antd';
import axios from 'axios'
import qs from "qs";


class NormalLoginForm extends React.Component {
  handleSubmit = e => {
  	e.preventDefault();
  	this.props.form.validateFields((err, values) => {
  		if (!err) {
  			if(values.newpassword1 !== values.newpassword2) {
  				message.warn("两次输入的密码不一致")
  			}
  			else {
  				const data1 = {
  					newPassword: values.newpassword2,
  					oldPassword: values.oldpassword
  				}
  				const data = qs.stringify(data1);
  				axios({
  					method:"POST",
  					url:"http://yjxt.elatis.cn/users/alterPwd",
  					headers:{
  						"token":sessionStorage.getItem("token"),
  						"Content-Type":"application/x-www-form-urlencoded"
  					},
  					data: data
  				})
  					.then(
  						(res)=> {
  							if(res.data.code === 0) {
  								message.success("修改成功");
  								sessionStorage.clear();
  								window.location.href="/login"
                  
  							}
  							else {
  								message.error(res.data.message);
  							}

  						}
  					).catch((error)=>{
  						console.log(error);
  					})
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
  		<Form onSubmit={this.handleSubmit} /*className= { styles.input }*/ {...formItemLayout}>

  			<Form.Item label="原密码">
  				{getFieldDecorator('oldpassword', {
  					rules: [{ required: true, message: '请输入原始密码!' }],
  				})(
  					<Input
  						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
  						type="password"
  						placeholder="请输入原始密码"
  					/>,
  				)}
  			</Form.Item>
  			<Form.Item label="新密码"> 
  				{getFieldDecorator('newpassword1', {
  					rules: [{ required: true, message: '请输入新密码!' },
  						{min:6, message:"至少六个字符"},
  						{ max:16, message:"最多16个字符" }

  					],
  				})(
  					<Input
  						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
  						type="password"
  						placeholder="第一次输入密码"
  					/>,
  				)}
  			</Form.Item>
  			<Form.Item label="再次输入密码">

  				{getFieldDecorator('newpassword2', {
  					rules: [{ required: true, message: '请输入新密码!' }],
  				})(
  					<Input
  						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
  						type="password"
  						placeholder="第二次输入密码"
  					/>,
  				)}
  			</Form.Item>
  			<Form.Item className = {styles.alter}>
  				{/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)} */}
  				<Button type="primary" htmlType="submit"  >
            修改密码
  				</Button>
  			</Form.Item>
  		</Form>
  	);
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const UserInfo = ()=> {
	return (
		<div className = {styles.userInfo}>
			<span className = { styles.title }>用户信息</span> 
			<p>{ `用户： ${userData.userName }`}</p>
			<p>{ `姓名： ${userData.realName}`}</p>
			<p>{ `部门:  ${userData.section}`}</p>
		</div>
	)
}
const User = ()=> {
	return (
		<div>
			<UserInfo />
			<Row >
				<Col span = {12} offset = {6} >
					<WrappedNormalLoginForm />

				</Col>
			</Row>
		</div>
	)
}

export default User;