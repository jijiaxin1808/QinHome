import { Table, Input, InputNumber, Popconfirm, Form, Button, Modal } from 'antd';
import React, {useState} from "react";
import axiosF from '../../../utils/axiosF';

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    id: i,
    firstName: `Edrward ${i}`,
    address: `London Park no. ${i}`,
    href:"www.baidu.com",
    key:`Edrward ${i}`,
    weight: i+2
  });
} 
//  这里是往data里面添加数据
// const handleAdd = ()=> {
//     const newData = {};
//     this.setState({
//         data:[...data,newData];
//     });
    // axiosF({
        
    // })
// }


const  DeleteArticle  = (props)=> {
	const [ visible, setVisible ] = useState(false);
	const showModal = () => {
		setVisible(true);
	};
	const handleOk = e => {
		setVisible(false);
		// axios({
		// 	method:"POST",
		// 	url: "http://yjxt.elatis.cn/posts/delete",
		// 	params: {
		// 		id:props.id
		// 	},
		// 	headers: {
		// 		"token":localStorage.getItem("token"),
		// 		"Content-Type": "application/json"
		// 	}
		// }).then(res=> {
		// 	if(res.data.code === 0 ) {
		// 		message.success("删除成功");
		// 	}
		// 	else {
		// 		message.warn(res.data.message);
		// 	}
		// });
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
				<p>确认删除?</p>
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
                  message: `Please Input ${title}!`,
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
    this.state = { data, editingKey: '' };
    this.columns = [
      {
        title: '栏目id',
        dataIndex: 'id',
        width: '10%',
        editable: false,
      },
      {
        title: '二级栏目名',
        dataIndex: 'firstName',
        width: '15%',
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
                <DeleteArticle />
            )
        }
      },
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
    console.log("修改了",row)
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
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
    // const handleChange = ()=> {
    //     this.setState({});
    // }
    return (
      <EditableContext.Provider value={this.props.form}>
        <div className = { "title" } style = {{marginBottom:20}}>
		    <span>
                二级栏目管理
			</span>
            <p style = {{marginTop: 20, marginLeft: 45, fontSize: "16px"}}>
            您可以通过改变权重来交换栏目的顺序.权重越大，栏目越靠前。
            </p>
            <Button type = "primary" style = {{marginTop: 20, marginLeft: 400}}>添加二级</Button>
		</div> 
        {/* <div>
            {
                data.map((item, index)=> {
                    if(index<8) {
                    return <Button>{item.title}</Button>
                    } 
                    else return (
                        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                            {
                                data.slice(8).map((item)=> {
                                <Option value = {item.title}>{item.title}</Option>
                                })
                            }
                      </Select>
                    )
                })
            }
        </div> */}
        <Table
          components={components}
        //   bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
          style = {{width:"80%", margin: "0 auto"}}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable;