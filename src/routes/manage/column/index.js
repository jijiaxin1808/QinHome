import React, {useState,useEffect,useRef} from "react";
import {Input,Table,Button,Menu,Switch,message,Tooltip, Modal} from "antd";
import "./index.less";
import axios from "axios";
import { connect } from "dva";
import {routerRedux} from "dva/router";

export default function ColManage() {
	// 
	// const [initialState, setInitialState] = useState({});
	// 用与更新后端接口的临时变量
	const [colsData, setColsData] = useState([]);
	// 后端data
	const [data, setCols] = useState([]);
	// 二级栏目文章列表
	const [articles, setArticles] = useState([]);
	// 二级栏目列表
	const [secCols, setSecCols] = useState([]);
	// 待编辑的data
	const [editData, setEditData] = useState([]);
	const [loading, setLoading] = useState(false);
	// 编辑一级和二级栏目
	const [editState, setEditState] = useState("二级");
	// 二级文章列表是否处于编辑状态
	const [edit, setEdit] = useState([]);
	console.log(edit);
	// 位于的某二级栏目
	const [secCol, setSecCol] = useState("");
	// 位于的某二级栏目标识key
	const [secColKey, setSecColKey] = useState("");
	// 位于的某一级栏目
	const [col, setCol] = useState("");
	// 是否在修改栏目名
	const [secColEdit, setSecColEdit] = useState(false);
	// 暂时先用个变量控制weight输入框输入数值
	const [weightIsNum, setWeightIsNum] = useState([]);
	const [saveClick, setSaveClick] = useState(false);
	// 存放文章分类的变量
	const [artiCategory, setArtiCategory] = useState("");
	// 需要一个保存post数据(包括更改的二级栏目和文章列表)的变量，由category控制
	const [tableLoading, setTableLoading] = useState(true);
  
	const input = useRef(null);

	useEffect(() => {

		if(col && colsData.length!==0) {
			var _cols = colsData;
			let _col = _cols.find(item => {
				return item.title === col;
			});
			let _secCol = _col ? _col.sec : [];
			setSecCols(_secCol);
		}
	}, [col, colsData, data]);

	useEffect(() => {
		axios.get("http://yjxt.elatis.cn/options/name/column").then(res => {
			if(res.data.code === 0) {
				console.log(res.data);
				if (res.data.data[0].sec.length!==0) {
					setArtiCategory(`/${res.data.data[0].title}/${(res.data.data[0].sec)[0].title}`);
					setSecCol((res.data.data[0].sec)[0].title);
				} else {
					setArtiCategory(`/${res.data.data[0].title}/`);
					setSecCol("");
				}
				let _weight = [];
				let  _data = JSON.parse(JSON.stringify(res.data.data));
				setColsData(_data);
				// 这里是导致bug的原因，map数组有元素是引用类型，可能会改变原数组
				setCols(_data.map(item => {
					_weight.push(true);
					setWeightIsNum(_weight);
					return item;
				}));
				console.log(_data);
			    ((_data)[0]) && setCol((_data)[0].title);
			}
		}).catch(err => {
			message.error(err);
		});
	}, []);

	useEffect(() => {
		if (!secCol) {
			setArtiCategory(`/${col}/${secCol}`);
			setTableLoading(false);
			return;
		}
		setArtiCategory(`/${col}/${secCol}`);
		setTableLoading(true);
	}, [secCol]);

	useEffect(() => {
		setTableLoading(false);
	}, [articles]);

	useEffect(() => {
		// 根据分类动态获取文章列表
		if(secCol && col && artiCategory) {
			axios.get("http://yjxt.elatis.cn/posts/listPosts",
				{
					headers: {
						"token": localStorage.getItem("token"),
						"Content-Type": "application/json"
					},
					params: {
						// flag:2,
						flag:1 ,
						category: artiCategory,
						status: "publish",
						limit: 10000,
						offset: 0
					}
				}
			).then(res => {

				if(res.data.code === 0) {
			
					setArticles((res.data.data)[0] === "empty" ? [] : res.data.data);
					setEdit((res.data.data)[0] === "empty" ? [] : new Array(res.data.data.length).fill(false));
				}
			}).catch(err => message.error(err.message));
		}
	}, [artiCategory]);

	useEffect(() => {
		if(!saveClick) return;
		if(colsData.length !== 0) {
			console.log(colsData);
			let _colsData = colsData.map(item => {
				let _item = {...item, title: item.newCol || item.title};
				if(!_item.sec) {
					_item = {..._item, sec: []};
				}
				delete _item.newCol;
				delete _item.col;
				return _item;
			});
			_colsData.sort((a, b) => {
				return a.weight - b.weight;
			});
			const _data = JSON.stringify({
				name: "column",
				value: {
					..._colsData,
				}
			});
			axios({
				method: "POST",
				url: "http://yjxt.elatis.cn/options/update",
				headers: {
					"token": localStorage.getItem("token"),
					"Content-Type": "application/json"
				},
				data: _data
			}).then(res => {
				if(res.data.code === 0) {
					setLoading(false);
					message.success("保存成功");
					setSaveClick(false);
					window.location.reload();
				}
			}).catch(err => {
				message.error(err);
			});
		}
	}, [colsData, saveClick, secCols]);

	useEffect(() => {
		secCols.length ? setSecCol(secCols[0].title) : setSecCol("");
		secCols[0] && setSecColKey(secCols[0].key);
	}, [secCols, data]);
const  DeleteArticle  = (props)=> {
	const [ visible, setVisible ] = useState(false);
	const showModal = () => {
		setVisible(true);
	};
	const handleOk = e => {
		setVisible(false);
		console.log("确认删除");
		axios({
			method:"POST",
			url: "http://yjxt.elatis.cn/posts/delete",
			params: {
				id:props.id
			},
			headers: {
				"token":localStorage.getItem("token"),
				"Content-Type": "application/json"
			}
		}).then(res=> {
			if(res.data.code === 0 ) {
				message.success("删除成功");
				// window.location.reload();
				// setTimeout(()=>{},500)
				// props.dispatch(routerRedux.push({
				// 	pathname: '/index/index'
				// }));
				// props.reload();
			}
			else {
				message.warn(res.data.message);
			}
		});
	};
	const handleCancel = e => {
		setVisible(false);
	};

	return (




		<div>
			<Button  onClick={()=>{showModal();}}>
          删除
			</Button>
			<Modal
				visible={visible}
				onOk={()=>{handleOk();}}
				onCancel={()=>{handleCancel();}}
				okText = "确认"
				cancelText = "取消"
			>
				<p>确认删除?</p>
			</Modal>
		</div>
	);
};
const mapDispatchToProps = (dispatch)=> ({
	reload() {
		dispatch(routerRedux.push({
			pathname: "/manage/column"
		}));
	}
});
const Dle = connect(({home})=>({home}),mapDispatchToProps)(DeleteArticle);

	const columns = [
		{
			title: "栏目",
			dataIndex: "title",
			key: "title", 
			className: "column",
			render: (text) => <span>{text}</span>
		},
		{
			title: "修改后的新栏目名",
			dataIndex: "newCol",
			key: "newCol",
			className: "column",
			render: (text,record,index) => <Input placeholder="请输入新栏目名" style={{width: "150px"}} onChange={(e) => handleColChange(e, "newCol", index)} defaultValue={record.title}/>
		},
		{
			title: "权重",
			dataIndex: "weight",
			key: "weight",
			className: "column",
			render: (text,record,index) => <Input style={{width: "50px"}} onChange={(e) => handleColChange(e, "weight", index)} value={!weightIsNum[index] ? "" : editData[index].weight}/>
		},
		{
			title: "链接地址",
			dataIndex: "link",
			key: "link",
			className: "column",
			render: (text,record,index) => <Input placeholder="http://" onChange={(e) => handleColChange(e, "link", index)} defaultValue={record.link}/>
		}
	];
	const secondaryColumn = [
		{
			title: "序列",
			dataIndex: "id",
			key: "id",
			width: 210,
		},
		{
			title: "文章名称",
			dataIndex: "title",
			key: "titles",
			width: 200,
			render: (text) => {
				return (
					<Tooltip arrowPointAtCenter title={text}>
						<span>{text}</span>
					</Tooltip>
				);
			}
		},
		{
			title: "发布部门",
			dataIndex: "category",
			key: "category",
			render: () => <span>{artiCategory}</span>
		},
		{
			title: "状态",
			dataIndex: "pageState",
			key: "pageStates",
			render: () => <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked={true}/>
		},
		{
			title: "",
			dataIndex: "oper",
			key: "oper",
			render: (text, record, index) => (
				<div>
					{
						<div className="article-oper">
							<Button className="edit-btn btn" onClick={() => handleEditClick(record.id)}><span>编辑</span></Button>
						</div>
					}
				</div>
			)
		}, {
		title: "删除",
		key: "delete",
		dataIndex:"action",
		render:(text,record)=> (
			<Dle  id = {record.id} >删除文章</Dle >
		)
		}
	];
	// const handleNewBtn = () => {
	// 	setEditData([...editData,{key: `${editData.length+1}`, title: "新栏目", weight: 100, state: true, sec: []}]);
	// };
	// const handleDelBtn = (index) => {
	// 	editData.splice(index, 1);
	// 	setEditData([...editData]);
	// };
	const handleEditBtn = () => {
		setEditState("一级");
		setEditData([...colsData]);
	};
	// 点击二级栏目
	const handleSecColClick = ({item, key}) => {
		if(!tableLoading) {
			setSecColKey(key);
			setSecCol(item.props.children);
		}
	};
	// 点击一级栏目
	const handleColClick = (item) => {
		if(!tableLoading) {
			setCol(item.title);
		}
	};
	// 新增二级栏目
	const handleAddSeColClick = () => {
		// 这里直接改colsData就行了，不用setSecCols，因为useEffect会监控colsData改变secCols。
		let _secCols = [...secCols];
		let _key = `${secCols.length!==0 ? parseInt(secCols[secCols.length-1].key,10)+1 : 1}`;
		_secCols.push({
			key: _key,
			title: "新栏目",
		});
		setSecColKey(_key);
		let _colsData = JSON.parse(JSON.stringify(colsData));
		_colsData = _colsData.map((item) => {
			if(item.title === col) {
				return {...item, sec: _secCols};
			} else {
				return item;
			}
		});
		setColsData(_colsData);
	};
	const handleEditClick = (index) => {
		window.location.href = `/manage/change/${index}`;
	};
	const handleRenameClick = () => {
		setSecColEdit(true);
	};
	const handleRenameSureClick = () => {
		setSecColEdit(false);
		let _secCols = [...secCols];
		let _secCol = _secCols.find(item => {
			return item.key === secColKey;
		});
		let index = _secCols.indexOf(_secCol);
		_secCol.title = secCol;
		_secCols.splice(index, 1, _secCol);
	};
	const DelSecCol = () => {

		let _secCols = [...secCols];
		let _secCol = secCols.find(item => {
			return item.key === secColKey;
		});
		let index = _secCols.indexOf(_secCol);
		_secCols.splice(index, 1);
		setSecCols(_secCols);
		let _colsData = JSON.parse(JSON.stringify(colsData));
		_colsData = _colsData.map((item) => {
			if(item.title === col) {
				return {...item, sec: _secCols};
			} else {
				return item;
			}
		});
		setColsData(_colsData);
	};
	const handleColChange = (e, id, index) => {
		// 先这样，优化代码的时候记得改一下，这里只有在输入框改变的时候才会给colsData添加newCol,虽然默认newCol框值为title的值，但是没有newCol属性，所有是undefined。
		let _value = id === "weight" ? parseInt(e.target.value,10) : e.target.value;
		let _weightIsNum = [...weightIsNum];
		_weightIsNum.splice(index, 1, true);
		setWeightIsNum(_weightIsNum);
		if(id === "weight" && Number.isNaN(_value)) {
			message.warn("权重只能输入数值");
			_weightIsNum.splice(index, 1, false);
			setWeightIsNum(_weightIsNum);
			return;
		}
		let _newCol = {
			[id]: _value
		};
		let _cols = [...editData];
		let _col = {..._cols[index], ..._newCol};
		_cols.splice(index, 1, _col);
		setEditData(_cols);
	};
	const handleSaveClick = () => {
		setLoading(true);

		if (editState === "二级") {
			if(colsData.length !== 0) {
				let _colsData = colsData.map(item => {
					let _item = {...item, title: item.newCol || item.title};
					if(!_item.sec) {
						_item = {..._item, sec: []};
					}
					delete _item.newCol;
					delete _item.col;
					return _item;
				});
				const _data = JSON.stringify({
					name: "column",
					value: {
						..._colsData,
					}
				});
				axios({
					method: "POST",
					url: "http://yjxt.elatis.cn/options/update",
					headers: {
						"token": localStorage.getItem("token"),
						"Content-Type": "application/json"
					},
					data: _data
				}).then(res => {
					if(res.data.code === 0) {
						setLoading(false);
						message.success("保存成功");
					}
				}).catch(err => {
					message.error(err);
				});
			}
		} else if (editState === "一级") {
			setSaveClick(true);
			setColsData(editData);
		}
	};
	const handleSurePressEnter = (e) => {
		handleRenameSureClick();
	};
	return (
		<React.Fragment>
			{
        <><div className="title">
          	<span>
              栏目管理
          	</span>
        </div><div style={{display: "flex",flexFlow: "row nowrap",marginTop: "20px",marginBottom: "40px", paddingLeft: "250px"}}>
          	<ul className="list">
          		{
          			data.map(item => (
          				<li className="li" onClick={() => handleColClick(item)}>
          					<a className="navTextB">{item.title}</a>
          				</li>
          			))
          		}
          	</ul>
          	<Button　
          		className="editBtn"
          		onClick={handleEditBtn}
          	>
              编辑栏目
          	</Button>
        </div><div className="columnContainer">
          	{
          		editState === "二级" &&
              <Menu
              	style={{width: 130, height: 483,}}        
              	selectedKeys={[`${secColKey}`]}
              	defaultSelectedKeys={["1"]}
              	mode={"vertical"}
              >
              	<div className="col-title">{col}</div>
              	{
              		secCols.map(item => {
              			return (
              				<Menu.Item key={item.key} onClick={handleSecColClick}>{item.title}</Menu.Item>
              			);
              		})
              	}
              	<div style={{textAlign: "left",padding: "0 5px", marginTop: 35}}>
              		<Button style={{width: 85, marginBottom: 10, padding: 0}} onClick={handleAddSeColClick}>
              			<span style={{fontSize: 12, color: "#1890ff"}}>新增二级栏目</span>
              		</Button>
              	</div>
              </Menu>
          	}
          	<div className="tableContainer">
          		{
          			editState === "二级" &&
                <div className="tableHeader">
                	<h2>
                		{
                			!secColEdit ?
                				<span style={{fontSize: "18px"}}>{secCol}</span>:
                				<Input style={{width: 100}} ref={input} onChange={(e) => setSecCol(e.target.value)} onPressEnter={handleSurePressEnter} defaultValue={secCol}/>
                		}
					</h2>
					{	
						secCols.length !== 0 &&
						<div className="col-oper">
							{
								!secColEdit ?
								<>
								<Button className="btn" onClick={handleRenameClick}>
									<span>重命名</span>
								</Button>
								<Button className="btn danger" onClick={DelSecCol}>
									<span>删除</span>
									</Button>
								</> :
								<Button className="btn" onClick={handleRenameSureClick}><span>确定</span></Button>
							}
                		</div>
					}
                	
                </div>
          		}
          		<Table 
          			columns={editState === "二级" ? secondaryColumn : columns} 
          			dataSource={editState === "二级" ? (tableLoading || secCols.length === 0? [] : articles) : editData} 
          			pagination={true}
          			loading={tableLoading}
          		/>
          	</div>
        </div><div className="submitBtnContainer">
          	<Button 
          		className="submitBtn"
          		loading = {loading}
          		onClick = {handleSaveClick}
          	>
              保存
          	</Button>
        </div></>
			}
		</React.Fragment>
	);
}
