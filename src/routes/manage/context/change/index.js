import "braft-editor/dist/index.css";
import React,{ useEffect, useState , forwardRef} from "react";
import BraftEditor from "braft-editor";
import { ContentUtils } from "braft-utils";
import { Form, Input, Button,  Row, Col , Upload ,Icon, Cascader} from "antd";
import { message } from "antd";
import axios from "axios";
import * as Front from "../../../../api/Front";
import * as Back from "../../../../api/Back";


const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16 },
};

const changeContext=(props)=>{
	const { getFieldDecorator } = props.form;
	useEffect(()=>{
		setTimeout(() => {
			props.form.setFieldsValue({
			});
		}, 1000);
	},[]);

	const [data, setData] = useState([]);
	const handleSubmit = (event) => {
		event.preventDefault();
		props.form.validateFields((error, values) => {
			if (!error) {
				const submitData = {
					title: values.title,
					first:values.category[0],
					second:values.category[1],
          			id:props.match.params.id,
					content: values.content.toHTML()// or values.content.toHTML()
				};
				Back.alter(submitData)
				.then( res => {
					console.log(res);
					if(res.data.code ===0) {
						message.success("修改成功");
						window.location.href = "/manage/context";
					}
					else {
						message.warn(res.data.message);
					}
				}).catch( err => {
				});
			}
		});
	};

	const controls = ["font-size", "bold", "italic", "underline", "text-color", "separator", "link", {key: "media",title:"视频"}];

	async function uploadHandler(param){
		if (!param.file) {
			return false;
		}
		const {
			form: { getFieldValue, setFieldsValue }
		  } = props;
		let reader = new FileReader();
		reader.readAsDataURL(param.file)
		reader.onload=function (e) {
			const editorStates = getFieldValue("content");
			setFieldsValue({content: ContentUtils.insertMedias(editorStates, [{
			  type: "IMAGE",
			  url: e.target.result
			}])
			});	
		}
	};

	const uploadHandlers=(param)=>{
		if (!param.file) {
			return false;
		}
		const {
			form: { getFieldValue, setFieldsValue }
		  } = props;
		let reader= new  FileReader()
		reader.readAsDataURL(param.file)
		reader.onload = function (e) {
			const editorStates = getFieldValue("content");
			setFieldsValue({
				content: ContentUtils.insertHTML(editorStates,`<br/><a href="${e.target.result}">${param.file.name}</a>`)
			})
		}
	};
	const extendControls =[
		{
			key: "antd-uploader",
			type: "component",
			component: (
				<Upload
					accept="image/*"
					showUploadList={false}
					customRequest={uploadHandler}
				>
				  <button type="button" className="control-item button upload-button" data-title="插入图片">
						<Icon type="picture" theme="filled" />
					</button>
					{/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
				</Upload>
			)
		},
		{
			key: "antd-uploads",
			type: "component",
			component: (
				<Upload
					showUploadList={false}
					customRequest={uploadHandlers}
				>
					{/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
					<button type="button" className="control-item button upload-button" data-title="插入附件">
						<Icon type="file" theme="filled" />
					</button>
				</Upload>
			)
		}
	];
if(data.length) {
	return (
		<div className="demo-container">
			<div className = "title">
  				<span>
            修改文章
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

					<Row style = {{margin: "0 auto"}}>
						<Col span={4} offset={16}>
							<Button size="large" type="primary" htmlType="submit">确认发布</Button>
						</Col>
					</Row>
				</Form.Item>
			</Form>
		</div>
	);
}
else {
	return (
	<div>
		"东西都丢了"
	</div>)
} 
}

export default Form.create()(forwardRef(changeContext));
