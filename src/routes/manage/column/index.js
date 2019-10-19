import React, {useState,useEffect,useReducer} from "react";
import {Radio,Input,Icon,Table,Button,Menu,message} from "antd";
import "./index.less";
import dataSource from "./dataSource";
import axios from "axios";

export default function ColManage() {

  // 
  const [initialState, setInitialState] = useState({});
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
  const [] = useState([]);
  
  const renderRadio = (text, record, index) => {
    const State =
      !edit[index] && editState === "二级" ?
       <span>{articles[index].state}</span> :
       <Radio.Group className="radioGroup" name="pageState" defaultValue={record.state ? 1 : 2} onChange={(e) => handleRadioChange(index, record, e)}>
        <Radio value={1} className="radio">显示</Radio>
        <Radio value={2} className="radio">隐藏</Radio>
      </Radio.Group>
    return State;
  }
  useEffect(() => {

    if(col && colsData.length!==0) {
      let _cols = colsData;
      let _col = _cols.find(item => {
        return item.title === col;
      });
      let _secCol = _col ? _col.sec : [];
      setSecCols(_secCol);
    }
  }, [col, colsData, data]);

  useEffect(() => {
    // console.log(sessionStorage.getItem("token"))
    axios.get("http://yjxt.elatis.cn/options/name/column").then(res => {
      if(res.data.code === 0) {
        setArtiCategory(`/${res.data.data[0].title}/${(res.data.data[0].sec)[0].title}`)
        let _weight = [];
        let  _data = JSON.parse(JSON.stringify(res.data.data));
        setColsData(_data);
        // 这里是导致bug的原因，map数组有元素是引用类型，可能会改变原数组
        setCols(_data.map(item => {
          _weight.push(true);
          setWeightIsNum(_weight);
          return item;
        }));
        setCol((_data)[0].title);
      }
    }).catch(err => {
      message.error(err);
    });
    // 调用最新文章数据接口(传入category)
    setArticles(dataSource.articles[0].articles);
    // useState()是异步的，需要后端能直接返回文章数量
    setEdit([false, false, false]);

  }, []);

  useEffect(() => {
    console.log(artiCategory);
    // 根据分类动态获取文章列表
    artiCategory && axios.get(`http://yjxt.elatis.cn/posts/getNew?category=${artiCategory}`).then(res => {

        if(res.data.code === 0) {
          console.log(res.data.data)
        }
      
    }).catch(err => message.error(err.message));
  }, [artiCategory]);

  useEffect(() => {
    if(!saveClick) return;
    if(colsData.length !== 0) {
      let _colsData = colsData.map(item => {
        let _item = {...item, title: item.newCol || item.title}
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
    console.log(secCols)
    secCols.length ? setSecCol(secCols[0].title) : setSecCol("");
    secCols[0] && setSecColKey(secCols[0].key);
  }, [secCols, data]);
  
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
      title: "页面状态",
      dataIndex: "pageState",
      key: "pageState",
      className: "column",
      render: renderRadio
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
    },
    {
      title: () => (
                    <Button type="primary" onClick={handleNewBtn}>
                      <Icon type="plus" />
                      新建
                    </Button>
                   ),
      dataIndex: "delete",
      key: "delete",
      render: (text,record,index) => <a onClick={() => handleDelBtn(index)}><Icon type="delete" theme="twoTone" /></a>
    }
  ];
  
  const secondaryColumn = [
    {
      title: "序列",
      dataIndex: "sequence",
      key: "sequence",
    },
    {
      title: "文章名称",
      dataIndex: "articleName",
      key: "articleName",
      render: (text,record,index) => {
        // return edit[index] ? <Input defaultValue={text} style={{width: 200}} onChange={(e) => handleArtiChange(e, index)}/>:
        return <span>{text}</span>
      }
    },
    {
      title: "发布部门",
      dataIndex: "dept",
      key: "dept",
    },
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "页面状态",
      dataIndex: "pageState",
      key: "pageState",
      render: renderRadio
    },
    {
      title: "",
      dataIndex: "oper",
      key: "oper",
      render: (text, record, index) => (
        <div>
          {
            !edit[index] ?
            <>
              <Button type="primary" onClick={() => handleEditClick(index)}>编辑</Button>
              <Button type="danger" onClick={() => handleDelClick(index)}>删除</Button>
            </>:
            <Button type="primary" onClick={() => handleASureClick(index, record)}>确定</Button>
          }
        </div>
      )
    }
  ];
  const handleNewBtn = () => {
    setEditData([...editData,{key: `${editData.length+1}`, title: "新栏目", weight: 100, state: true, sec: []}])
  }
  const handleDelBtn = (index) => {
    editData.splice(index, 1);
    setEditData([...editData]);
  }
  const handleEditBtn = () => {
    setEditState("一级");
    setEditData([...colsData]);
  }
  // 点击二级栏目
  const handleSecColClick = ({item, key}) => {
    // 需要后端文章数量的数据
    setEdit([false, false, false]);
    setSecColKey(key);
    setSecCol(item.props.children);
    // 每次点击二级栏目名，获取后端数据
    // const arr = dataSource.articles.find((item) => {
    //   return item.key === key;
    // }).articles;
    // setArticles(arr);
  }
   // 点击一级栏目
  const handleColClick = (item) => {
    setCol(item.title);
  }
  // 新增二级栏目
  const handleAddSeColClick = () => {
    // 这里直接改colsData就行了，不用setSecCols，因为useEffect会监控colsData改变secCols。
    let _secCols = [...secCols];
    let _key = `${secCols.length!==0 ? parseInt(secCols[secCols.length-1].key)+1 : 1}`;
    _secCols.push({
      key: _key,
      title: "新栏目",
    });
    setSecColKey(_key);
    console.log(_key)
    let _colsData = JSON.parse(JSON.stringify(colsData));
    _colsData = _colsData.map((item) => {
      if(item.title === col) {
        return {...item, sec: _secCols};
      } else {
        return item;
      }
    })
    setColsData(_colsData);
  }
  const handleEditClick = (index) => {
    const _edit = [...edit];
    _edit.splice(index, 1 ,true);
    setEdit(_edit);
  }
  // const handleArtiChange = (e, index) => {
  //   let _article = articles[index];
  //   _article = {..._article, articleName: e.target.value};
  //   let _articles = [...articles];
  //   _articles.splice(index,1,_article);
  //   setArticles(_articles);
  // }
  const handleASureClick = index => {
    const arr = [...edit];
    arr.splice(index, 1 ,false);
    setEdit(arr);
  }
  const handleRadioChange = (index, record, e) => {
    let _value = e.target.value;
    if(editState === "二级" && _value !== (record.state ? 1 : 2)) {
       let article = articles[index];
       article = {...article, state: _value === 1 ? true : false};
       let _articles = [...articles];
       _articles.splice(index, 1, article);
       setArticles(_articles);
    } else if(editState === "一级" && _value !== (record.state ? 1 : 2)) {
      let _cols = [...editData];
      let _col = _cols[index];
      _col = {..._col, state: _value === 1 ? true : false};
      _cols.splice(index, 1, _col);
      setEditData(_cols);
    } else {
      return;
    }
  }
  const handleRenameClick = () => {
    setSecColEdit(true);
  }
  const handleRenameSureClick = () => {
    setSecColEdit(false);
    let _secCols = [...secCols];
    let _secCol = _secCols.find(item => {
      return item.key === secColKey;
    });
    let index = _secCols.indexOf(_secCol);
    _secCol.title = secCol;
    _secCols.splice(index, 1, _secCol);
  }
  const handleDelClick = (index) => {
    let _articles = [...articles];
    _articles.splice(index, 1);
    setArticles(_articles);
  }
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
  }
  const handleColChange = (e, id, index) => {
    // 先这样，优化代码的时候记得改一下，这里只有在输入框改变的时候才会给colsData添加newCol,虽然默认newCol框值为title的值，但是没有newCol属性，所有是undefined。
    let _value = id === "weight" ? parseInt(e.target.value) : e.target.value;
    let _weightIsNum = [...weightIsNum];
    _weightIsNum.splice(index, 1 ,true);
    setWeightIsNum(_weightIsNum);
    if(id === "weight" && Number.isNaN(_value)) {
      message.warn("权重只能输入数值");
      _weightIsNum.splice(index, 1, false);
      setWeightIsNum(_weightIsNum);
      return;
    }
    let _newCol = {
      [id]: _value
    }
    let _cols = [...editData];
    let _col = {..._cols[index], ..._newCol};
    _cols.splice(index, 1, _col);
    setEditData(_cols);
  }
  const handleSaveClick = () => {
    setLoading(true);
    if(editState === "二级") {
      
    } else if(editState === "一级") {
      setSaveClick(true);
      setColsData(editData);
    }
  }
  return (
    <React.Fragment>
      <div style={{display: "flex",flexFlow: "row nowrap",marginTop: "20px"}}>
        <ul className="list">
          {
            data.map((item,index) => (
              <li className="li" onClick={() => handleColClick(item)}>
                <a className={index<data.length-1 ? "navTextB" : "navText"}>{item.title}</a>
              </li>
            ))
          }
        </ul>
        <Button　
          type="primary"
          className="editBtn"
          onClick={handleEditBtn}
        >
          编辑栏目
        </Button>
      </div>
      <div className="columnContainer">
        {
          editState === "二级" &&
          <Menu
            style={{width: 130, height: 483}}        
            selectedKeys={[`${secColKey}`]}
            defaultSelectedKeys={["1"]}
            mode={"vertical"}
            theme={"dark"}
          >
            <div style={{height: 36, lineHeight: "36px"}}>{col}</div>
            {
              secCols.map(item => {
                return (
                  <Menu.Item key={item.key} onClick={handleSecColClick}>{item.title}</Menu.Item>
                );
              })
            }
            <Button type="primary" style={{width: 85, marginTop: 20, padding: 0}} onClick={handleAddSeColClick}>
              <span style={{fontSize: 12}}>新增二级栏目</span>
            </Button>
          </Menu>
        }
        <div className="tableContainer">
          {
            editState === "二级" &&
            <div className="tableHeader">
              <h2>
                {
                  !secColEdit ?
                  <span>{secCol}</span>:
                  <Input style={{width: 100}} onChange={(e) => setSecCol(e.target.value)} defaultValue={secCol}/>
                }
              </h2>
              <div className="oper">
                {
                  !secColEdit ?
                  <>
                    <Button onClick={handleRenameClick}>重命名</Button>
                    <Button onClick={DelSecCol}>删除</Button>
                  </>:
                  <Button onClick={handleRenameSureClick}>确定</Button>
                }
              </div>
            </div>
          }
          <Table 
            columns={editState === "二级" ? secondaryColumn : columns} 
            dataSource={editState === "二级" ? articles : editData} 
            pagination={false}
          />
        </div>
      </div>
       <Button 
          type="primary"
          className="submitBtn"
          loading = {loading}
          onClick = {handleSaveClick}
       >
         保存
       </Button>
    </React.Fragment>
  );
}



