import { Table, Input, InputNumber, Popconfirm, Form, Button, Modal, message } from 'antd';
import React, {useState} from "react";
import * as Back from "../../../api/Back";
import * as Front from "../../../api/Front";


const  DeleteArticle  = (props)=> {
	const [ visible, setVisible ] = useState(false);
	const showModal = () => {
		setVisible(true);
	};
	const handleOk = e => {
    setVisible(false);
    console.log("删除",props)
    const data = {
      first: props.firstName
    }
    Back.modulesDelete(data).then(res=> {
      if(res.data.code === 0 ) {
        message.success("删除成功")
        window.location.reload();
      }
    })
	};
	const handleCancel = e => {
		setVisible(false);
	};

	return (
		<div>
			<Button  onClick={()=>{showModal();}} type = "danger">
          删除
			</Button>
			<Modal
				visible={visible}
				onOk={()=>{handleOk();}}
				onCancel={()=>{handleCancel();}}
				okText = "确认"
                cancelText = "取消"
                okType = "default"
			>
				<p>警告： 当前操作会删除本栏目下全部文章 是否删除？</p>
			</Modal>
		</div>
	);
};

const EditableContext = React.createContext(); // 创建context

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `请输入 ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
} //   

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data:[], editingKey: '' };
    Front.modelCloumn().then(res => {
      if(res.data.code === 0 ) {
        console.log("一级获取成功",res.data.data)
        this.setState({data:res.data.data});
      }
    })

    this.columns = [
      {
        title: '栏目id',
        dataIndex: 'key',
        width: '10%',
        editable: false,
      },
      {
        title: '一级栏目名',
        dataIndex: 'title',
        width: '15%',
        editable: true,
      },
      {
        title: '状态',
        dataIndex: 'title',
        width: '15%',
        editable: false,
        render: (text,record,index) => {
                return <div>显示</div>            
        }
      },
      {
        title: '链接地址',
        dataIndex: 'link',
        width: '25%',
        editable: true,
      },
      {
        title: '权重',
        dataIndex: 'weight',
        width: '15%',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '15%',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    保存
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="确认取消?" onConfirm={() => this.cancel(record.key)}>
                <a>取消</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              修改
            </a>
          );
        },
      },
      {
        title: '删除',
        dataIndex: 'weight',
        width: '15%',
        editable: false,
        render: (text, record) => {
            return (
                <DeleteArticle firstName = {record.title} />
            )
        }
      },
    ];
    this.hideColumns = [
      {
        title: '栏目id',
        dataIndex: 'key',
        width: '10%',
        editable: false,
      },
      {
        title: '一级栏目名',
        dataIndex: 'title',
        width: '15%',
        editable: true,
      },
      {
        title: '状态',
        dataIndex: 'title',
        width: '15%',
        editable: false,
        render: (text,record,index) => {
                return <div>隐藏</div>            
        }
      },
      {
        title: '链接地址',
        dataIndex: 'link',
        width: '25%',
        editable: true,
      },
      {
        title: '权重',
        dataIndex: 'weight',
        width: '15%',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '15%',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    保存
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="确认取消?" onConfirm={() => this.cancel(record.key)} okText="确认" cancelText = "取消">
                <a>取消</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              修改
            </a>
          );
        },
      },
      {
        title: '删除',
        dataIndex: 'weight',
        width: '15%',
        editable: false,
        render: (text, record) => {
            return (
                <DeleteArticle  firstName = {record.title}/>
            )
        }
      },
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, id) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      console.log("87777",row," ",id);
      this.state.data.map((item)=> {
        console.log(item.key,"aaa",id)
        if(item.key === id) {
          console.log("找到了",row)
          if(item.title !== row.title) {
            console.log("名字变了");
            const data = {
              first: item.title,
              newFirst: row.title
            }
            Back.alterFirst(data).then(res=> {
              if(res.data.code === 0 ) {
                if((item.weight !== row.weight)||(item.link !== row.link)) {
                  console.log("link或weight改变了");
                  const data = {
                    first: row.title,
                    weight: row.weight,
                    link: row.link
                  }
                  Back.alterWTAndLK(data).then(res=> {
                    if(res.data.code === 0) {
                      message.success("修改成功");
                      window.location.reload();
                    }
                  })
                }
                message.success("修改成功");
              }

            })
          }
          else if((item.weight !== row.weight)||(item.link !== row.link)) {

            const data = {
              first: item.title,
              weight: row.weight,
              link: row.link
            }
            console.log("link或weight改变了",data);
            Back.alterWTAndLK(data).then(res=> {
              if(res.data.code === 0) {
                message.success("修改成功");
                window.location.reload();
              }
            })
          }
        }
      })
      // const newData = [...this.state.data];
      // const index = newData.findIndex(item => id === item.id);
      // if (index > -1) {
      //   const item = newData[index];
      //   newData.splice(index, 1, {
      //     ...item,
      //     ...row,
      //   });
      //   this.setState({ data: newData, editingKey: '' });
      // } else {
      //   newData.push(row);
        this.setState({  editingKey: '' });
      // }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    const hideC =  this.hideColumns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    const addFirst =()=> {
      const data = {
        first:"新一级栏目1",
        second:"",
        weight:100,
        link:"/index"
      }
      Back.createModules(data)
      .then(res=> {
        if(res.data.code === 0) {
          message.success("添加成功");
          window.location.reload();
        }
      })
    }
    return (
      <EditableContext.Provider value={this.props.form}>
        <div className = { "title" } style = {{marginBottom:20}}>
		    <span>
                一级栏目管理
			</span>
            <p style = {{marginTop: 20, marginLeft: 45, fontSize: "16px"}}>
            前八项栏目将展示在前台页面，第八项以后的所有栏目状态为隐藏。
            您可以通过改变权重来交换栏目的顺序，以改变其显示和隐藏的状态。
            权重越大，栏目越靠前。
            </p>
            <Button type = "primary" style = {{marginTop: 20, marginLeft: 400}} onClick = {()=>{addFirst()}}>添加一级</Button>
		</div>
        <Table
          components={components}
          dataSource={this.state.data.slice(0,8)}
          columns={columns}
          rowClassName="editable-row"
          style = {{width:"80%", margin: "0 auto",marginBottom:30}}
          pagination = {false}
        />
        <Table
          components={components}
          dataSource={this.state.data.slice(8)}
          columns={hideC}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
          style = {{width:"80%", margin: "0 auto",marginBottom:20}}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable;