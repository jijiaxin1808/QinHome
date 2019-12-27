import React from "react";
import { Form, Icon, Input, Button,  message } from "antd";
import { connect} from "dva";
import "./index.less";
import { routerRedux } from "dva/router";
import { setCookie} from "../../utils/session";
import * as Back from "../../api/Back";

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
			const data = {
				...tmp,
				keep_alive: 1
			}
			Back.login(data).then(data =>{
  				if (data.data.code === 0 ) {
  					message.success("登录成功");
  					setCookie(data.data.data.token);
  					this.props.dispatch(
  						routerRedux.push({
  							pathname:"/manage/index"
  						})
					  );
  				}
  			})
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
						  rules: [{ required: true, message: "请输入密码" },
						{ min: 6, message: "密码至少六位" }
						],
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