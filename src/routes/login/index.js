import React from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import { connect } from "dva";
import "./index.less"
import axios from "axios";
// import { Session } from 'inspector';

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
  			// console.log('Received values of form: ', values);
  			// const { dispatch } = this.props;
  			// dispatch({
  			//   type: 'login/login',
  			//   payload: { ...values }
  			// })
  			const tmp = values;
  			tmp.keep_alive = Number(values.keep_alive);
  			console.log(tmp);
  			axios({
  				method:"post",
  				url:"http://yjxt.elatis.cn/users/login",
  				data: {
  					...tmp
  				},
  				headers: {
  					"content-type": "application/json"
  				}
  			}).then(data =>{
  				console.log(data);
  				if (data.data.code === 0 ) {
  					sessionStorage.setItem("token", data.data.data.token);
  					message.success("登录成功");
  					console.log("登录成功",);
  					window.location.href = "/manage";
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
  			<div>
  				<img alt="login" src="/img/Oval.png" className="login-icon"/>
  			</div>
  			<Form onSubmit={this.handleSubmit} className="login-form">
  				<Form.Item>
  					{getFieldDecorator("number", {
  						rules: [{ required: true, message: "请输入用户名" }],
  					})(
  						<Input
  							prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
  							placeholder="请输入用户名"
  						/>,
  					)}
  				</Form.Item>
  				<Form.Item>
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
  				<Form.Item>
  					{getFieldDecorator("keep_alive", {
  						valuePropName: "checked",
  						initialValue: true,
  					})(<Checkbox>记住密码</Checkbox>)}
  					<a className="login-form-forgot" href="">
              忘记密码
  					</a>
  					<Button type="primary" htmlType="submit" className="login-form-button">
              登录
  					</Button>
            Or <a href="">现在登录!</a>
  				</Form.Item>
  			</Form>
  		</div>
  	);
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(NormalLoginForm);
export default WrappedNormalLoginForm;