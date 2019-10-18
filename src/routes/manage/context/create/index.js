import "braft-editor/dist/index.css";
import React,{ useEffect, useState , forwardRef} from "react";
import BraftEditor from "braft-editor";
import { Form, Input, Button, Select, Row, Col } from "antd";
import styles from "./index.css";
// import MenuList from '../../../../assets/contextMenuDown'
import MenuList from "../../../../config/contextMenuDown";
import axios from "axios";
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16 },
};

const { Option } = Select;

function FormDemo (props) {
	const { getFieldDecorator } = props.form;

	useEffect(()=>{
		setTimeout(() => {
			props.form.setFieldsValue({
				content: BraftEditor.createEditorState("<p>Hello <b>World!</b></p>")
			});
		}, 1000);
		console.log("axios");
	},[]);


	const [data, setData] = useState([]);
	useEffect(() =>{
		axios({
			method: "get",
			url: "http://yjxt.elatis.cn/options/name/column"
		}).then(res => {
		  if (res.data.code === 0) {
				setData(res.data.data);
				console.log(res.data.data);
			}

		}).catch(err => {
			console.log(err);
		});
	}, []);


	const handleSubmit = (event) => {

  	event.preventDefault();

  	props.form.validateFields((error, values) => {
  		if (!error) {
  			const submitData = {
  				title: values.title,
  				content: values.content.toRAW() // or values.content.toHTML()
  			};
  			console.log(submitData);
  		}
  	});

	};

	const handleChange = (value) => {
  	console.log(`selected ${value}`);
	};

	// render () {


  	const controls = ["bold", "italic", "underline", "text-color", "separator", "link", "separator", "media" ];

  	return (
  		<div className={styles["demo-container"]}>
  			<div className = { styles.title }>
  				<span>
            内容管理
  				</span>
  			</div>
  			<Form onSubmit={handleSubmit}>
  				<Form.Item {...formItemLayout} label="文章标题">
  					{getFieldDecorator("title", {
  						rules: [{
  							required: true,
  							message: "请输入标题",
  						}],
  					})(
  						<Input size="large" placeholder="请输入标题"/>
  					)}
  				</Form.Item>
  				<Form.Item {...formItemLayout} label="发布部门">
  					{getFieldDecorator("department", {
  						rules: [{
  							required: true,
  							message: "请填写发布部门",
  						}],
  					})(
  						<Input size="large" placeholder="请输入标题"/>
  					)}
  				</Form.Item >
  				<Form.Item {...formItemLayout} label="请选择文章路径">
  					{
  						getFieldDecorator("selector",{
  							rules: [{
  								required: true,
  								message: ""
  							}]
  						})(
  							<div>
  								<Select defaultValue="新闻中心" style={{ width: 180, marginRight: "80px" }} onChange={handleChange}>
  									{
  										data.map((item)=>{
  											return (
  												<Option key={item.key}>{item.title}</Option>
  											);
  										})
  									}
  								</Select>
  								<Select defaultValue="lucy" style={{ width: 180 }} onChange={handleChange}>
  									{
  										MenuList.map((item)=>{
  											return (
  												<Option key={item.id}>{item.value}</Option>
  											);
  										})
  									}
  								</Select>
  							</div>

  						)
  					}
  				</Form.Item>
  				<Form.Item {...formItemLayout} label="文章正文">
  					{getFieldDecorator("content", {
  						validateTrigger: "onBlur",
  						rules: [{
  							required: true,
  							validator: (_, value, callback) => {
  								if (value.isEmpty()) {
  									callback("请输入正文内容");
  								} else {
  									callback();
  								}
  							}
  						}],
  					})(
  						<BraftEditor
  							className="my-editor"
  							controls={controls}
  							placeholder="请输入正文内容"
  						/>
  					)}
  				</Form.Item>
  				<Form.Item {...formItemLayout} className={styles.bottomButton}>
  					<Row>
  						<Col span={4} offset={4}>
  							<Button size="large" type="primary" htmlType="submit">保存草稿</Button>
  						</Col>
  						<Col span={4} offset={4}>
  							<Button size="large" type="primary" htmlType="submit">预览发布</Button>
  						</Col>
  						<Col span={4} offset={4}>
  							<Button size="large" type="primary" htmlType="submit">直接发布</Button>
  						</Col>
  					</Row>
  				</Form.Item>
  			</Form>
  		</div>
  	);
	// }
}

export default Form.create()(forwardRef(FormDemo));
