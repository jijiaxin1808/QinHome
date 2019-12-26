import React from "react";
import { Form, Icon, Input, Button,  message } from "antd";
import { connect} from "dva";
import "./index.less";
import axios from "axios";
import { routerRedux } from "dva/router";
import {_setCookie} from "../../utils/session";
// import { local } from 'inspector';

@connect(
	({login, loading}) => ({
		...login
	})
)
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
  	e.preventDefault();
  	this.props.form.validateFields((err, values) => {
  		if (!err) {

  			const tmp = values;
  			tmp.keep_alive = Number(values.keep_alive);
  			console.log(tmp);
  			axios({
  				method:"post",
  				url:"http://yjxt.elatis.cn/users/login",
  				data: {
					  ...tmp,
					  keep_alive: 1
  				},
  				headers: {
  					"content-type": "application/json"
  				}
  			}).then(data =>{
  				if (data.data.code === 0 ) {
  					message.success("登录成功");
  					_setCookie(data.data.data.token);
  					this.props.dispatch(
  						routerRedux.push({
  							pathname:"/manage/index"
  						})
					  );
  				}
  				else {
  					message.error(data.data.message);
  				}
  			}).catch(err => {
  				console.log(err);
  			});
  		}
  	});
  };

  render() {
  	const { getFieldDecorator } = this.props.form;
  	return (
  		<div className="login-content" >
  			<div className = "login-avger">
  				<img alt="login" src="/img/Oval.png" className="login-icon"/>
  			</div>
  			<Form onSubmit={this.handleSubmit} className="login-form">
  				<Form.Item style = {{display:"flex",justifyContent:"center"}}>
  					{getFieldDecorator("number", {
  						rules: [{ required: true, message: "请输入用户名" }],
  					})(
  						<Input
  							prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
  							placeholder="请输入用户名"
  						/>,
  					)}
  				</Form.Item>
  				<Form.Item style = {{display:"flex",justifyContent:"center"}}>
  					{getFieldDecorator("password", {
  						rules: [{ required: true, message: "请输入密码" }],
  					})(
  						<Input
  							prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
  							type="password"
  							placeholder="请输入密码"
  						/>,
  					)}
  				</Form.Item>
				  <Form.Item   style = {{display:"flex",justifyContent:"center",margin: "0 auto"}} >
					  <Button type="primary" htmlType="submit" className="login-form-button" 
					  style = {{width: "150px"}}>
              登录
  					</Button>
  				</Form.Item>
  			</Form>
  		</div>
  	);
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(NormalLoginForm);
export default WrappedNormalLoginForm;