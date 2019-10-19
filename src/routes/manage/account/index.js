import React, { useState, useEffect, useReducer } from "react";
import { Input, Button, Table, Select, message } from "antd";
import Pagination from "../components/Pagination";
import styles from "./index.css";
import axios from "axios";

const authKeys = {
	"一级权限": 3,
	"二级权限": 2,
	"三级权限": 1,
};
//暂时key=name
const initialState = {
	"id": 1,
	"number": "11111111",
	"name": "admin",
	"section": "123",
	"roles_id": "一级权限",
	"password": "e10adc39",
	"post_num": 1
};
const initialUsersData = [];

const usersRuducer = (state, action) => {
	console.log("state",state);
	switch(action.type) {
	case "initUsers":
		console.log("action.payload",...action.payload);
		return [
			...state,
			...action.payload,
		];
	case "addUser": 
		return [
			...state,
			...action.payload,
		];
	default:
		return state;
	}
};
const newUserReducer = (state, action) =>　{
	console.log("state2",state);
	switch(action.type) {
	case "changeNewUser":
		return {
			...state,
			...action.payload
		};
		// 不能返回{}
	case "clearNewUser":
		return {
			...initialState,
		};
	default:
		return state;
	}
};

export default function AuthManage() {
	// 初始化登录用户数据
	const [LoginUserAuth] = useState("一级权限");
	// 用户权限数据统计
	const [usersAuthData, setUsersAuth] = useState([]);

	// useEffect(() => {
	//   setUsersAuth([
	//     {
	//       tag: "全部",
	//       num: 3
	//     },
	//     {
	//       tag: "一级权限",
	//       num: 1
	//     },
	//     {
	//       tag: "二级权限",
	//       num: 1
	//     },
	//     {
	//       tag: "三级权限",
	//       num: 1
	//     }
	//   ]);
	// })
	const [loading, setLoading] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [state, setState] = useState("manage");

	const [myState, changeNewUser] = useReducer(newUserReducer, initialState);

	const [usersData, changeUsers] = useReducer(usersRuducer, initialUsersData);
	useEffect(() => {
		// 后端数据
		console.log("account");
		axios({
			method: "get",
			url:"http://yjxt.elatis.cn/users/getByRole",
			headers: {
				"content-type": "application/json",
				"token": localStorage.getItem("token")
			}
		}).then(res=>{
			changeUsers({
				type: "initUsers",
				payload: res.data.data
			});
			console.log("usersData",usersData);
		}).catch((err)=>{
			console.log(err);
		});
	}, []);



	const handleInputChange = (e, id) => {

		let value = e.target.value;
		let newUserO = {
			[id]: value,
		};
		// if(id === "num") {
		//   changeNewUser({
		//     type: "changeNewUser",
		//     payload: {
		//       key: value
		//     }
		//   });
		// }
    
		changeNewUser({
			type: "changeNewUser",
			payload:  {
				...newUserO
			}
		});
	};
	const { Option } = Select;
	const getDefaultValue = (index) => {
		if(state === "manage") {
			return usersData[index].roles_id;
		} else if(state === "add" && LoginUserAuth === "一级权限") {
			return "一级权限";
		} 
	};
	const renderSelect = (text, record, index) => {

		const Auth = authKeys[LoginUserAuth] === 3 ?
    
			<Select
				showSearch
				className={styles.select}
				style={{ width: 100}}
				placeholder="选择权限"
				optionFilterProp="children"
				filterOption={(input, option) =>
					option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
				defaultValue={getDefaultValue(index)}
			>
				<Option value="一级权限" className={styles.select}><span className={styles.optionText}>一级权限</span></Option>
				<Option value="二级权限" className={styles.select}><span className={styles.optionText}>二级权限</span></Option>
				<Option value="三级权限" className={styles.select} ><span className={styles.optionText}>三级权限</span></Option>
			</Select>
			:
			<span>{state === "manage" ? usersData[index].roles_id : "三级权限"}</span>;
      
		return Auth;
	};
	const renderPsw = (text, record, index) => {

		const Psw = state === "manage" ?
			<div className={styles.renderPsw}>
				<Input 
					type={authKeys[LoginUserAuth] >= authKeys[usersData[index].roles_id] ? "input" : "password"}
					disabled={authKeys[LoginUserAuth] < authKeys[usersData[index].roles_id]}
					style={{width: "200px"}} 
					defaultValue={record.password}
				/>
				{
					authKeys[LoginUserAuth] >= authKeys[usersData[index].roles_id] &&
        <Button
        >
        恢复默认
        </Button>
				}
			</div>:
			<Input type="password" style={{width: "200px"}} onChange={(e) => handleInputChange(e, "password")} defaultValue="123456!"/>;

		return Psw;
	};
  
  
	//表格数据
	const columns = [
		{
			title: "编号",
			dataIndex: "id",
			key: "id",
			width: "200px",
			render: (text) => {
				const Num = state === "add" ?
					<Input 
						value={myState.num}
						placeholder="编号" 
						style={{width: "100px"}} 
						onChange={(e) => handleInputChange(e, "num")}/> :
					<span>{text}</span>;
				return Num;
			}
		},
		{
			title: "部门",
			dataIndex: "section",
			key: "section",
			width: "200px",
			render: (text) => {
				const Depart = state === "add" ?
					<Input
						placeholder="部门" 
						style={{width: "100px"}} 
						onChange={(e) => handleInputChange(e, "depart")}/> :
					<span className={styles.departText}>{text}</span>;
				return Depart;
			}
		},
		{
			title: "姓名",
			dataIndex: "name",
			key: "name",
			width: "200px",
			render: (text) => {
				const Name = state === "add" ?
					<Input 
						placeholder="姓名" 
						style={{width: "100px"}} 
						onChange={(e) => handleInputChange(e, "name")}/> :
					<span>{text}</span>;
				return Name;
			}
		},
		{
			title: "权限级别",
			dataIndex: "roles_id",
			key: "roles_id",
			width: "200px",
			render: renderSelect,
		},
		{
			title: "文章",
			dataIndex: "post_num",
			key: "post_num",
			width: "200px"
		},
		{
			title: "密码",
			dataIndex: "password",
			key: "password",
			render: renderPsw,
		}
	];

	const rowSelection = {

		selectedRowKeys,

		onChange: (selectedRowKeys) => {
			setSelectedRowKeys(selectedRowKeys);
		},
		getCheckboxProps: (record) => ({
			disabled: authKeys[record.roles_id] > authKeys[LoginUserAuth]
		}),
	};
	const handleSaveClick = () => {
		setLoading(true);
	};
	const handleAddClick = () => {
		setState("add");
		LoginUserAuth === "二级权限" && 
    changeNewUser({
    	type: "changeNewUser",
    	payload: {roles_id: "三级权限"}
    });
	};
	const handleSureClick = () => {
		console.log(myState.num);
		if(myState.num) {
			changeNewUser({
				type: "changeNewUser",
				payload: { 
					key: myState.num,
				}
			});
			console.log("myState",myState);

			changeUsers({
				type: "addUser",
				payload: [myState]
			});
			console.log("statesure", usersData);
			console.log("myState2",myState);
			axios({
				method: "POST",
				url:"http://yjxt.elatis.cn/users/alterOtherInfo",
				headers: {
					"content-type": "application/json",
					"token": localStorage.getItem("token")
				},
				data: {
					"id": 3,
					"password": myState.password,
					"section": "后端"
				}
			}).then(res => {
				console.log(res);
			}).catch(err => {
				console.log(err);
			});
			setState("manage");

			// 清空
			changeNewUser({
				type: "clearNewUser",
			});
			message.success("创建成功");
		} else {
			message.error("编号不能为空");
		}
    
	};
	return (
		<div /*style={{padding: "20px 20px 0 20px"}}*/>
			<div className = { "title" }>
				<span>
          账号权限
				</span>
			</div>
			<div style={{overflow: "hidden"}}>
				<div className={styles.auths}>
					{
						usersAuthData.map(item => (
							<a className={styles.auth}>{`${item.tag}  (${item.num})`}</a>
						))
					}
				</div>
			</div>
			<div className={"oper"}>
				{
					state === "manage" ? 
          <><Button className={"operBtn"}>
              删除
		  </Button><Button className={"operBtn"} onClick={handleAddClick}>
              添加
		  </Button></> :
						<Button className={"operBtn"}　onClick={handleSureClick}>
            确定
						</Button>
				}
			</div>
			<Table 
				rowKey={(record) => `${record.key}`}
				columns={columns} 
				rowSelection={rowSelection} 
				dataSource={state === "manage" ? usersData : [myState]}
				pagination={true}
			/> 
			{
				state === "manage" && 
        <><Button 
          	type="primary"
          	className={"oper-saveBtn"}
          	loading={loading} 
          	onClick={handleSaveClick}
        >
            保存
        </Button></>
			}
		</div>
	);
}
