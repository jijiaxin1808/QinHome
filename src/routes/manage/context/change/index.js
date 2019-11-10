import "braft-editor/dist/index.css";
import React,{ useEffect, useState , forwardRef} from "react";
import BraftEditor from "braft-editor";
import { ContentUtils } from "braft-utils";
import { Form, Input, Button,  Row, Col , Upload ,Icon, Cascader} from "antd";
import { message } from "antd";
import axios from "axios";


// const { Option } = Select;
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16 },
};


const changeContext=(props)=>{
	console.log(props.match.params.id);
	const { getFieldDecorator } = props.form;

	useEffect(()=>{
		setTimeout(() => {
			props.form.setFieldsValue({
				// content: BraftEditor.createEditorState("请输入文章内容")
			});
		}, 1000);
	},[]);


	const [data, setData] = useState([]);
	console.log(data);
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
	// const options = data.map( item => ({
	// 	value: item.title,
	// 	label: item.title,
	// 	children: item.sec.map(item => ({
	// 		value: item.title,
	// 		label: item.title
	// 	}))
	// }));
	const handleSubmit = (event) => {
		event.preventDefault();
		props.form.validateFields((error, values) => {
			if (!error) {
				const submitData = {
					title: values.title,
					// department: values.department,
          			category: "/"+values.category[0]+ "/" +values.category[1],
          			id:props.match.params.id,
					content: values.content.toHTML()// or values.content.toHTML()
				};
				axios({
					method: "POST",
					url: "http://yjxt.elatis.cn/posts/alter",
					headers: {
						"Content-Type": "application/json",
						"token": localStorage.getItem("token")
					},
					data: submitData
				}).then( res => {
					console.log(res);
					if(res.data.code ===0) {
						message.success("修改成功");
						window.location.href = "/manage/context";
					}
					else {
						message.warn(res.data.message);
					}
				}).catch( err => {
					console.log(err);
				});
				console.log("submitData",submitData);
			}
		});

	};

	const [contextData, setContextData] = useState({});

	useEffect(()=> {
		const id=props.match.params.id;
		axios({
			method: "GET",
			headers: {
				"token":localStorage.getItem("token") ,
				"Content-Type": "application/json"
			},
			url: `http://yjxt.elatis.cn/posts/get?id=${id}`
		}).then(res => {
			if ( res.data.code === 0 ) {
				console.log(res.data.data);
				setContextData(res.data.data);
				console.log(res.data.data.category.split("/"),"changjjs")
			}
			console.log(res);
		}).catch( err => {
			console.log(err);
		});
	},[]);
		const options = data.map( item => ({
		value: item.title,
		label: item.title,
		children: item.sec.map(item => ({
			value: item.title,
			label: item.title
		}))
	}));
		const onChange =(value) => {
		console.log(value);
	};
	useEffect(()=> {
		console.log("contextData",contextData.content);
		if(contextData.category) {
		let defaultArray = [];
		defaultArray.push(contextData.category.split("/")[1]);
		defaultArray.push(contextData.category.split("/")[2]);
		props.form.setFieldsValue({
			title: contextData.title,
			department: contextData.section,
			content: BraftEditor.createEditorState(contextData.content),
			category:defaultArray
		});
		}

	},[contextData]);


	// const onChange =(value) => {
	// 	console.log(value);
	// };
	const controls = ["font-size", "bold", "italic", "underline", "text-color", "separator", "link", {key: "media",title:"视频"}];
	// const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));

	async function uploadHandler(param){
		if (!param.file) {
			console.log("err");
			return false;
		}
		console.log(param.file)
		const {
			form: { getFieldValue, setFieldsValue }
		  } = props;
		//   const result=await getUrl(param.file)
		//   console.log(getUrl(param.file))
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
		}
	];
if(contextData.category&&data.length) {

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
  				<Form.Item {...formItemLayout} label="文章路径">
  					{
  						getFieldDecorator("category",{
  							rules: [{
  							  type: "array",
  								required: true,
  								message: "请填写发布分类"
  							}]
  						})(
  								<Cascader options={options} 
								//   defaultValue={defaultArray}
								   onChange={onChange}  placeholder="请选择要发布的位置"/>
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

					<Row style = {{margin: "0 auto"}}>
						<Col span={4} offset={16}>
							<Button size="large" type="primary" htmlType="submit">确认发布</Button>
						</Col>
						{/* <Col>
							<Button>getData</Button>
						</Col> */}
					</Row>
				</Form.Item>
			</Form>
		</div>
	);
	// }
};}

export default Form.create()(forwardRef(changeContext));
