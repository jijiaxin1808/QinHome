import React from 'react'
import {Form,Input,Icon,Button,Radio,message} from 'antd'
import axios from 'axios'
import 'antd/dist/antd.css'
import './index.less'
import { randomNum, calculateWidth } from "../../../utils/utils";
const {TextArea} = Input

class Xx extends React.Component {
	constructor(props){
		super(props)
		this.state={
			value:'1',
			code:''
		}
	}
    onChange = e => {
    	
    	this.setState({
    		value: e.target.value,
    	});
    };
    componentDidMount () {
    	this.createCode();
    }
    handleSubmit = e => {
    	e.preventDefault();
    	this.props.form.validateFields((err, values) => {
    		if (!err) {
    			if(values.code!==this.state.code){
    				message.error("验证码错误")
    				this.createCode()
    			}else{
    				let data={
    					...values,
    					category:'complain'
					}
					console.log(data)
					delete data.code
    				axios({
    					method:'POST',
    					headers:{
    						"Content-Type":'application/json'
    					},
    					url:'http://yjxt.elatis.cn/msgs/create',
    					data:data
    				}).then(res=>{
    					if(res.data.code===0){
							message.success("提交成功")
						}
						this.props.form.resetFields()
    				})

    		}}
    	});
    };
    /**
     * 生成验证码
     */
    createCode = () => {
    	const ctx = this.canvas.getContext("2d");
    	const chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    	let code = "";
    	ctx.clearRect(0, 0, 80, 39);
    	for (let i = 0; i < 4; i++) {
    		const char = chars[randomNum(0, 57)];
    		code += char;
    		ctx.font = randomNum(20, 25) + "px SimHei";  //设置字体随机大小
    		ctx.fillStyle = "#D3D7F7";
    		ctx.textBaseline = "middle";
    		ctx.shadowOffsetX = randomNum(-3, 3);
    		ctx.shadowOffsetY = randomNum(-3, 3);
    		ctx.shadowBlur = randomNum(-3, 3);
    		ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    		let x = 80 / 5 * (i + 1);
    		let y = 39 / 2;
    		let deg = randomNum(-25, 25);
    		/**设置旋转角度和坐标原点**/
    		ctx.translate(x, y);
    		ctx.rotate(deg * Math.PI / 180);
    		ctx.fillText(char, 0, 0);
    		/**恢复旋转角度和坐标原点**/
    		ctx.rotate(-deg * Math.PI / 180);
    		ctx.translate(-x, -y);
    	}
    	this.setState({
    		code
    	});
    }
    render() {
    	const { getFieldDecorator } = this.props.form;
    	return (
    		<div className="xx">
    			<p className="xx-p">添加留言</p>
    			<Form onSubmit={this.handleSubmit} className="login-form">
  				<Form.Item label="被举报主题">
  					{getFieldDecorator("title", {
  						rules: [{ required: true, message: "请输入被举报主题" }],
  					})(
  						<Input
  							style={{width:'400px'}}
  						/>,
  					)}
  				</Form.Item>
                  <Form.Item label="被举报地址">
  					{getFieldDecorator("complainAddress", {
  						rules: [{  message: "请输入被举报地址",required:true }],
  					})(
  						<Input
  							style={{width:'400px'}}

  						/>,
  					)}
  				</Form.Item>
                  <Form.Item label=" 举报内容">
  					{getFieldDecorator("content", {
  						rules: [{ required: true, message: "请输入内容" }],
  					})(
    						<TextArea rows={4} style={{width:'400px'}}/>
  					)}
  				</Form.Item>
				  <div className="xx-form">
				  <Form.Item label="举报人 ">
  					{getFieldDecorator("name", {
  						rules: [{ message: "请输入用户名" }],
  					})(
  						<Input/>,
  					)}
  				</Form.Item>
				  <Form.Item label="性别">
  					{getFieldDecorator("sex", {
  						rules: [],
  					})(
    						<Radio.Group onChange={this.onChange} >
    					<Radio value="男">男</Radio>
    					<Radio value="女">女</Radio>
    				</Radio.Group>
  					)}
  				</Form.Item>
				  </div>
				  <div className="xx-form">
				  <Form.Item label="电话号码">
  					{getFieldDecorator("phone", {
  						rules: [{  message: "请输入用户名" }],
  					})(
  						<Input/>,
  					)}
  				</Form.Item>
				  <Form.Item label="家庭住址">
  					{getFieldDecorator("address", {
  						rules: [{  message: "请输入用户名" }],
  					})(
  						<Input/>,
  					)}
  				</Form.Item>
				  </div>
				  <div className="xx-form">
				  <Form.Item label="电子邮件">
  					{getFieldDecorator("email", {
  						rules: [{  message: "请输入用户名" }],
  					})(
  						<Input/>,
  					)}
  				</Form.Item>

    				<Form.Item label="工作单位">
  					{getFieldDecorator("workspace", {
  						rules: [{  message: "请输入用户名" }],
  					})(
  						<Input/>,
  					)}
  				</Form.Item>
				  </div>
                  <div className="xx-form">
				  <Form.Item label="验证码">
  					{getFieldDecorator("code", {
  						rules: [{ required: true, message: "请输入验证码" }],
  					})(
  						<Input
  						/>,
  					)}
  				</Form.Item>
				  <canvas onClick={this.createCode} width="80" height='39' ref={el => this.canvas = el}/>
				  </div>
  				<Form.Item>

  					<Button type="primary" htmlType="submit" className="xx-form-button">
                     提交
  					</Button>
  				</Form.Item>
  			</Form>
    		</div>
    	)
    }
} 
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Xx);
export default WrappedNormalLoginForm;