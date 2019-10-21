import "braft-editor/dist/index.css";
import React,{ useEffect, useState , forwardRef} from "react";
import BraftEditor from "braft-editor";
import { ContentUtils } from "braft-utils";
import { Form, Input, Button,  Row, Col ,Cascader, Upload, Icon, Modal, Select, Card, Tag} from "antd";
import "./index.css";
import axios from "axios";
import getToken from "./getToken";

const QINIU_SERVER = "http://upload-z1.qiniup.com";
const QINIU_PATH = "http://qiniu.waidzsalome.cn";

const { Option } = Select;
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16 },
};


function FormDemo (props) {
	const { getFieldDecorator } = props.form;

	useEffect(()=>{
		setTimeout(() => {
			props.form.setFieldsValue({
				content: BraftEditor.createEditorState("<p>Hello <b>World!</b></p>")
			});
		}, 1000);
	},[]);


	const [data, setData] = useState([]);
	useEffect(() =>{
		axios({
			method: "get",
			url: "http://yjxt.elatis.cn/options/name/column"
		}).then(res => {
		  if (res.data.code === 0) {
				setData(res.data.data);
				console.log(res.data);
			}

		}).catch(err => {
			console.log(err);
		});


	}, []);

	const options = data.map( item => ({
		value: item.title,
		label: item.title,
		children: item.sec.map(item => ({
			value: item.title,
			label: item.title
		}))
	}));

	const [token, setToken] = useState("");
	const getUploadToken = () => {
	  console.log(getToken());
		setToken(getToken());
	};

	const handleOnChange = ({file}) => {
		const { response = {}} = file;
		console.log(response);
		console.log(response.hash);
	};

	const handleSubmit = (event) => {

  	event.preventDefault();

  	props.form.validateFields((error, values) => {
  		if (!error) {
  			const submitData = {
  				title: values.title,
					// department: values.department,
					category: "/"+values.category[0]+ "/" +values.category[1],
  				content: values.content.toHTML()// or values.content.toHTML()
  			};

  			axios({
					method: "post",
					url: "http://yjxt.elatis.cn/posts/create",
					headers: {
						"content-type": "application/json",
						"token": localStorage.getItem("token")
					},
					data: submitData
				}).then( res => [
					console.log(res)
				]).catch( err => {
					console.log(err);
				});
  			console.log("submitData",submitData);
  		}
  	});

	};

	const [userData, setUserData] = useState([]);
	const [visible, setVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const showModal = () => {
	  setVisible(true);
		axios({
			method: "get",
			url:"http://yjxt.elatis.cn/users/getByRole",
			headers: {
				"content-type": "application/json",
				"token": localStorage.getItem("token")
			}
		}).then(res=>{
			console.log(res.data);
			if(res.data.code === 0) {
				console.log("success",res.data.data);
				setUserData(res.data.data);
			}
		}).catch((err)=>{
			console.log(err);
		});

	};

	const modalOptions = userData.map(item => ({
		id: item.id,
		number: item.number,
		name: item.name,
		section: item.section,
	}));

	console.log("modal",modalOptions);

	const handleOk = () => {
	  setConfirmLoading(true);
		setTimeout(() => {
			setVisible(false);
			setConfirmLoading(false);
		}, 2000);
	};

	const handleCancel = () => {
	  setVisible(false);
	};
	const onChange =(value) => {
		console.log(value);
	};
  	const controls = ["bold", "italic", "underline", "text-color", "separator", "link", "separator", "media" ];
  	const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));

	const uploadHandler = (param) => {
		if (!param.file) {
			console.log("err");
			return false;
		}
		// setEditorState({editorState: ContentUtils.insertMedias(editorState, [{
		//   type: "IMAGE",
		//   url: URL.createObjectURL
		// }])
		// });
	};
  	const extendControls =[
		{
			key: "antd-uploader",
			type: "component",
			component: (
				<Upload
					accept="image/*"
					action={QINIU_SERVER}
					data={{token: token}}
					beforeUpload={getUploadToken}
					showUploadList={false}
					customRequest={uploadHandler}
					onChange={handleOnChange}
				>
					{/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
					<button type="button" className="control-item button upload-button" data-title="插入图片">
						<Icon type="picture" theme="filled" />
					</button>
				</Upload>
			)
		}
	];

  	return (
  		<div className="demo-container">
  			<div className = "title">
  				<span>
            创建文章
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
  						getFieldDecorator("category",{
  							rules: [{
  							  type: "array",
  								required: true,
  								message: "请填写发布分类"
  							}]
  						})(
  								<Cascader options={options} onChange={onChange} placeholder="Please select"/>
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
							  extendControls={extendControls}
  						/>
  					)}
  				</Form.Item>
  				<Form.Item {...formItemLayout}>

  					<Row>
  						<Col span={4} offset={4}>
							<Button size="large"  htmlType="submit">保存草稿</Button>
  						</Col>
  						<Col span={4} offset={4}>
  							<Button size="large"  htmlType="button" onClick={showModal}>预览发布</Button>
							<Modal
								title="请求发布"
								visible={visible}
								onOk={handleOk}
								confirmLoading={confirmLoading}
								onCancel={handleCancel}
							>
								<Row>
									<Col span={10}>
										<Card>
											<h1 style={{textAlign: "center"}}>生成预览</h1>
											<p>
                          “秦皇岛市安全生产培训机构名单”
											</p>
											<Tag className="tag">
                          https://gw6wov.axshare.com
											</Tag>
											<Button size="middle"  htmlType="button" block style={{marginBottom: "10px"}}>
                          更新页面
											</Button>
											<Button size="middle" block>
                          生成新地址
											</Button>
										</Card>
									</Col>
									<Col span={12} offset={2}>
										<Select defaultValue="常用联系人" style={{width: 200}}>
											{
												modalOptions.map(item => (
													<Option
														key={item.id}
														value={item.name}
													>
														{item.name}
														{item.section}
														{item.number}
													</Option>
												))
											}
										</Select>
										<Button size="small"  htmlType="button" style={{marginTop: "50px"}}>
                        发送申请
										</Button>
									</Col>
								</Row>
							</Modal>
  						</Col>
  						<Col span={4} offset={4}>
  							<Button size="large"  htmlType="button">直接发布</Button>
  						</Col>
  					</Row>
  				</Form.Item>
  			</Form>
  		</div>
  	);
	// }
}

export default Form.create()(forwardRef(FormDemo));
