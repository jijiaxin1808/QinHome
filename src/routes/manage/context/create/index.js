import "braft-editor/dist/index.css";
import React,{ useEffect, useState , forwardRef,useRef} from "react";
import BraftEditor from "braft-editor";
import { ContentUtils } from "braft-utils"
import { Form, Input, Button,  Row, Col ,Cascader,  message,Upload,Icon} from "antd";
import "./index.css";
import axios from "axios";


const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16 },
};


function FormDemo (props) {
	const { getFieldDecorator } = props.form;

	useEffect(()=>{
		setTimeout(() => {
			props.form.setFieldsValue({
				content: BraftEditor.createEditorState("")
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


	const handleOnChange = ({file}) => {
		console.log(file)
		const { response = {}} = file;
		console.log(response);
		console.log(response.hash);
	};

	const [state, setState] = useState("");
	const judgeStateP = () => {
	 setState("publish");
	};

	const judgeStateC = () =>{
	  setState("create");
	};

	const handleSubmit = (event) => {
  	event.preventDefault();
		console.log(state);
  	props.form.validateFields((error, values) => {
  		if (!error) {
  			const submitData = {
  				title: values.title,
					// department: values.department,
					category: "/"+values.category[0]+ "/" +values.category[1],
  				content: values.content.toHTML()// or values.content.toHTML()
  			};
  			if (state === "publish") {
					submitData.status = "publish";
				}
  			axios({
					method: "post",
					url: "http://yjxt.elatis.cn/posts/create",
					headers: {
						"content-type": "application/json",
						"token": localStorage.getItem("token")
					},
					data: submitData
				}).then( res => {
					if(res.data.code === 0) {
						if(state === "publish"){
							message.success("发布成功");
						}
						else message.success("申请成功");
					}
					else message.warn("权限不足");
				}
					
				).catch( err => {
					console.log(err);
				});
  			console.log("submitData",submitData);
  		}
  	});

	};

	// const [userData, setUserData] = useState([]);
	// const [visible, setVisible] = useState(false);
	// const [confirmLoading, setConfirmLoading] = useState(false);

	// const showModal = () => {
	//   setVisible(true);
	// 	axios({
	// 		method: "get",
	// 		url:"http://yjxt.elatis.cn/users/getByRole",
	// 		headers: {
	// 			"content-type": "application/json",
	// 			"token": localStorage.getItem("token")
	// 		}
	// 	}).then(res=>{
	// 		console.log(res.data);
	// 		if(res.data.code === 0) {
	// 			console.log("success",res.data.data);
	// 			setUserData(res.data.data);
	// 		}
	// 	}).catch((err)=>{
	// 		console.log(err);
	// 	});

	// };

	// const modalOptions = userData.map(item => ({
	// 	id: item.id,
	// 	number: item.number,
	// 	name: item.name,
	// 	section: item.section,
	// }));

	// console.log("modal",modalOptions);

	// const handleOk = () => {
	//   setConfirmLoading(true);
	// 	setTimeout(() => {
	// 		setVisible(false);
	// 		setConfirmLoading(false);
	// 	}, 2000);
	// };

	// const handleCancel = () => {
	//   setVisible(false);
	// };
	const onChange =(value) => {
		console.log(value);
	};


	const controls = ["font-size", "bold", "italic", "underline", "text-color", "separator", "link", {key: "media",title:"视频"}];
	const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));
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
	const imageControls = [
		'float-left', // 设置图片左浮动
		'float-right', // 设置图片右浮动
		'align-left', // 设置图片居左
		'align-center', // 设置图片居中
		'align-right', // 设置图片居右
		'link', // 设置图片超链接
		'size', // 设置图片尺寸
		'remove' // 删除图片
	]
	const uploadHandlers=(param)=>{
		if (!param.file) {
			console.log("err");
			return false;
		}
		const {
			form: { getFieldValue, setFieldsValue }
		  } = props;
		let reader= new  FileReader()
		reader.readAsDataURL(param.file)
		reader.onload = function (e) {
			console.log(param.file)
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
					onChange={handleOnChange}
				>
					{/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
					<button type="button" className="control-item button upload-button" data-title="插入图片">
						<Icon type="picture" theme="filled" />
					</button>
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
					onChange={handleOnChange}
				>
					{/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
					<button type="button" className="control-item button upload-button" data-title="插入附件">
						<Icon type="file" theme="filled" />
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
  						<Input size="large" placeholder="请输入标题" />
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
  								<Cascader options={options} onChange={onChange} placeholder="请选择要发布的位置"/>
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
							imageControls={imageControls}
                			// contentStyle={{height: 210, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)'}}
  						/>
  					)}
  				</Form.Item>
  				<Form.Item {...formItemLayout}>

  					<Row>
  						<Col span={4} offset={4}>
							<Button size="large"  htmlType="submit" onClick={judgeStateC}>保存草稿</Button>
  						</Col>
  						
  						<Col span={4} offset={4}>
  							<Button size="large" type="primary" htmlType="submit" onClick={judgeStateP}>直接发布</Button>
  						</Col>
  					</Row>
  				</Form.Item>
  			</Form>
  		</div>
  	);
	// }
}

export default Form.create()(forwardRef(FormDemo));