/* eslint-disable indent */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState, Fragment } from 'react';
import styles from './index.css';
import { Table, Button, Input, Switch, message, Upload } from 'antd';
// import * as blockData from '../../../assets/blockData';
// import * as blockCol from '../../../assets/blockCol';
import * as blockData from "../../../config/blockData";
import * as blockCol from "../../../config/blockCol";
import axios from 'axios';

const HeaderScroll = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios.get('http://yjxt.elatis.cn/options/name/safe').then(res => {
      if (res.data.code === 0) {
        console.log(res.data);
        setdata(res.data.data);
      } else {
        message.error(res.data.message);
      }
    });
  }, []);
  const headerScrollCol = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '内容',
      dataIndex: 'title',
      key: 'title',
      render: (content, id) => (
        <Input
          placeholder={content}
          onChange={e => {
            const newData = data.map(item => {
              console.log(id.id, 'id');
              if (item.id === id.id) {
                return {
                  ...item,
                  title: e.target.value,
                };
              } else
                return {
                  ...item,
                };
            });
            console.log(newData);
            setdata(newData);
          }}
        />
      ),
    },
    {
      title: '链接地址',
      dataIndex: 'href',
      key: 'href',
      render: (href, id) => (
        <Input
          placeholder={href}
          onChange={e => {
            const newData = data.map(item => {
              console.log(id.id, 'id');
              if (item.id === id.id) {
                return {
                  ...item,
                  href: e.target.value,
                };
              } else
                return {
                  ...item,
                };
            });
            console.log(newData);
            setdata(newData);
          }}
        />
      ),
    },
    {
      title: '状态',
      key: 'isShow',
      dataIndex: 'isShow',
      render: (isShow, id) => (
        <Switch
          checkedChildren="显示"
          unCheckedChildren="隐藏"
          defaultChecked={isShow}
          onChange={checked => {
            const newData = data.map(item => {
              console.log(id.id, 'id');
              if (item.id === id.id) {
                return {
                  ...item,
                  isSHow: checked,
                };
              } else
                return {
                  ...item,
                };
            });
            console.log(newData);
            setdata(newData);
          }}
        />
      ),
    },
    {
      title: '操作',
      key: 'id',
      dataIndex: 'id',
      render: id => (
        <Button
          onClick={() => {
            const newData = data;
            data.map((item, index) => {
              if (item.id === id) {
                newData.splice(index, 1);
              }
              return null;
            });
            console.log('删除', newData);
          }}
        >
          删除
        </Button>
      ),
    },
  ];
  const JSONData = JSON.stringify({
    name: 'safe',
    value: data,
  });
  const save = () => {
    console.log('保存的', data);
    axios({
      method: 'POST',
      url: 'http://yjxt.elatis.cn/options/update',
      headers: {
        token: sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      data: JSONData,
    }).then(res => {
      if (res.data.code === 0) {
        message.success('保存成功');
      } else {
        message.error(res.data.message);
      }
    });
  };
  return (
    <div>
      <div className={styles.title}>
        <span>顶部滚动条</span>
      </div>
      <div className={styles.buttonSbar}>
        <Button className={styles.button}>添加顶部滚动条</Button>
        <Button
          className={styles.button}
          onClick={() => {
            save();
          }}
        >
          保存
        </Button>
      </div>
      <Table columns={headerScrollCol} dataSource={data} pagination={false} />
    </div>
  );
};

const Carousel = () => {
  const [data, setdata] = useState([]);
  const props = {
    name: 'file',
    action: 'http://yjxt.elatis.cn/file/upload',
    headers: {
      authorization: 'authorization-text',
      token:sessionStorage.getItem("token"),
    },
  };
  const onChange = (info, id) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
      console.log(info.file.response.data.url);
      console.log(data, 'data');
      const newData = data.map(item => {
        console.log(id.id, 'id');
        if (item.id === id.id) {
          console.log('找到id了');
          return {
            ...item,
            picUrl: info.file.response.data.url,
          };
        } else
          return {
            ...item,
          };
      });
      setdata(newData);
      console.log(newData, 'newdata');
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  };
  const picUrlButton = (picUrl, id) => {
    if (picUrl) {
      return (
        <Fragment>
          <a href={picUrl} target="_blank">
            <Button>查看图片</Button>
          </a>
          <Upload
            {...props}
            onChange={info => {
              onChange(info, id);
            }}
          >
            <Button>修改图片</Button>
          </Upload>
        </Fragment>
      );
    } else return <Button>添加图片</Button>;
  };
  useEffect(() => {
    axios.get('http://yjxt.elatis.cn/options/name/carousel').then(res => {
      if (res.data.code === 0) {
        console.log(res.data);
        setdata(res.data.data);
      } else {
        message.error(res.data.message);
      }
    });
  }, []);
  const carouselCol = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '内容',
      dataIndex: 'title',
      key: 'title',
      render: (content, id) => (
        <Input
          placeholder={content}
          onChange={e => {
            const newData = data.map(item => {
              console.log(id.id, 'id');
              if (item.id === id.id) {
                return {
                  ...item,
                  title: e.target.value,
                };
              } else
                return {
                  ...item,
                };
            });
            console.log(newData);
            setdata(newData);
          }}
        />
      ),
    },
    {
      title: '图片',
      dataIndex: 'picUrl',
      key: 'picUrl',
      render: (picUrl, id) => <div>{picUrlButton(picUrl, id)}</div>,
    },
    {
      title: '链接地址',
      dataIndex: 'href',
      key: 'href',
      render: (href, id) => (
        <Input
          placeholder={href}
          onChange={e => {
            const newData = data.map(item => {
              console.log(id.id, 'id');
              if (item.id === id.id) {
                return {
                  ...item,
                  href: e.target.value,
                };
              } else
                return {
                  ...item,
                };
            });
            console.log(newData);
            setdata(newData);
          }}
        />
      ),
    },
    {
      title: '状态',
      key: 'isShow',
      dataIndex: 'isShow',
      render: (isShow, id) => (
        <Switch
          checkedChildren="显示"
          unCheckedChildren="隐藏"
          defaultChecked={isShow}
          onChange={checked => {
            const newData = data.map(item => {
              console.log(id.id, 'id');
              if (item.id === id.id) {
                return {
                  ...item,
                  isShow: checked,
                };
              } else
                return {
                  ...item,
                };
            });
            console.log(newData);
            setdata(newData);
          }}
        />
      ),
    },
    {
      title: '操作',
      key: 'id',
      dataIndex: 'id',
      render: id => (
        <Button
          onClick={() => {
            const newData = data;
            data.map((item, index) => {
              if (item.id === id) {
                newData.splice(index, 1);
              }
              return null;
            });
            console.log('删除', newData);
          }}
        >
          删除
        </Button>
      ),
    },
  ];
  const JSONData = JSON.stringify({
    name: 'carousel',
    value: data,
  });
  const save = () => {
    axios({
      method: 'POST',
      url: 'http://yjxt.elatis.cn/options/update',
      headers: {
        token: sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      data: JSONData,
    }).then(res => {
      if (res.data.code === 0) {
        message.success('保存成功');
      } else {
        message.error(res.data.message);
      }
    });
  };
  return (
    <div>
      <div className={styles.title}>
        <span>轮播图</span>
      </div>
      <div className={styles.buttonSbar}>
        <Button
          onClick={() => {
            let newData = data;
            newData.push({
              id: data.length + 1,
              href: '请输入跳转至的链接',
              picUrl: '',
              title: '请输入标题',
              isShow: false,
              key: '4',
            });
            setdata(newData);
            console.log(data);
          }}
          className={styles.button}
        >
          添加轮播图
        </Button>
        <Button
          onClick={() => {
            save();
          }}
          className={styles.button}
        >
          保存
        </Button>
      </div>
      <Table
        columns={carouselCol}
        dataSource={/* blockData.carouselData   */ data}
        pagination={false}
        // onChange = {()=>{}}
      />
    </div>
  );
};

const HomeTopic = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios.get('http://yjxt.elatis.cn/options/name/topicCol').then(res => {
      if (res.data.code === 0) {
        console.log(res.data);
        setdata(res.data.data);
      } else {
        message.error(res.data.message);
      }
    });
  }, []);
  const homeTopicCol = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      render: (content, id) => (
        <Input
          placeholder={content}
          onChange={e => {
            const newData = data.map(item => {
              console.log(id.id, 'id');
              if (item.id === id.id) {
                return {
                  ...item,
                  content: e.target.value,
                };
              } else
                return {
                  ...item,
                };
            });
            console.log(newData);
            setdata(newData);
          }}
        />
      ),
    },
    {
      title: '图片',
      dataIndex: 'picUrl',
      key: 'picUrl',
      render: (picUrl, id) => <div>{picUrlButton(picUrl, id)}</div>,
    },
    {
      title: '链接地址',
      dataIndex: 'url',
      key: 'url',
      render: (href, id) => (
        <Input
          placeholder={href}
          onChange={e => {
            const newData = data.map(item => {
              console.log(id.id, 'id');
              if (item.id === id.id) {
                return {
                  ...item,
                  url: e.target.value,
                };
              } else
                return {
                  ...item,
                };
            });
            console.log(newData);
            setdata(newData);
          }}
        />
      ),
    },
  ];
  const props = {
    name: 'file',
    action: 'http://yjxt.elatis.cn/file/upload',
    headers: {
      authorization: 'authorization-text',
      token: sessionStorage.getItem("token"),
    },
  };
  const onChange = (info, id) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
      console.log(info.file.response.data.url);
      console.log(data, 'data');
      const newData = data.map(item => {
        console.log(id.id, 'id');
        if (item.id === id.id) {
          console.log('找到id了');
          return {
            ...item,
            picUrl: info.file.response.data.url,
          };
        } else
          return {
            ...item,
          };
      });
      setdata(newData);
      // console.log(newData,"newdata");
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  };
  const picUrlButton = (picUrl, id) => {
    if (picUrl) {
      return (
        <Fragment>
          <a href={picUrl} target="_blank">
            <Button>查看图片</Button>
          </a>
          <Upload
            {...props}
            onChange={info => {
              onChange(info, id);
            }}
          >
            <Button>修改图片</Button>
          </Upload>
        </Fragment>
      );
    } else return <Button>添加图片</Button>;
  };
  const JSONData = JSON.stringify({
    name: 'topicCol',
    value: data,
  });
  const save = () => {
    console.log('保存的', data);
    axios({
      method: 'POST',
      url: 'http://yjxt.elatis.cn/options/update',
      headers: {
        token: sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      data: JSONData,
    }).then(res => {
      if (res.data.code === 0) {
        message.success('保存成功');
      } else {
        message.error(res.data.message);
      }
    });
  };
  return (
    <div>
      <div className={styles.title}>
        <span>专题专栏</span>
      </div>
      <div className={styles.buttonSbar}>
        <Button
          className={styles.button}
          onClick={() => {
            save();
          }}
        >
          保存
        </Button>
      </div>
      <Table columns={homeTopicCol} dataSource={data} pagination={false} />
    </div>
  );
};

const Public = () => {
  return (
    <div>
      <div className={styles.title}>
        <span>信息公开</span>
      </div>
      <h3>专栏1</h3>
      <Table columns={blockCol.publicCol} dataSource={blockData.publicData1} pagination={false} />
      <h3>专栏2</h3>
      <Table columns={blockCol.publicCol} dataSource={blockData.publicData2} pagination={false} />
      <h3>专栏3</h3>
      <Table columns={blockCol.publicCol} dataSource={blockData.publicData3} pagination={false} />
    </div>
  );
};
const Background = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios.get('http://yjxt.elatis.cn/options/name/background').then(res => {
      if (res.data.code === 0) {
        console.log(res.data);
        setdata(res.data.data);
      } else {
        message.error(res.data.message);
      }
    });
  }, []);
  const props = {
    name: 'file',
    action: 'http://yjxt.elatis.cn/file/upload',
    headers: {
      authorization: 'authorization-text',
      token: sessionStorage.getItem("token"),
    },
  };
  const onChange = (info, id) => {
    if (info.file.status !== 'uploading') { 
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
      console.log(info.file.response.data.url);
      console.log(data, 'data');
      const newData = data.map(item => {
        console.log(id.id, 'id');
        if (item.id === id.id) {
          console.log('找到id了');
          return {
            ...item,
            picUrl: info.file.response.data.url,
          };
        } else
          return {
            ...item,
          };
      });
      setdata(newData);
      // console.log(newData,"newdata");
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  };
  const picUrlButton = (picUrl, id) => {
    if (picUrl) {
      return (
        <Fragment>
          <a href={picUrl} target="_blank">
            <Button>查看图片</Button>
          </a>
          <Upload
            {...props}
            onChange={info => {
              onChange(info, id);
            }}
          >
            <Button>修改图片</Button>
          </Upload>
        </Fragment>
      );
    } else return <Button>添加图片</Button>;
  };
  const JSONData = JSON.stringify({
    name: 'background',
    value: data,
  });
  const save = () => {
    console.log('保存的', data);
    axios({
      method: 'POST',
      url: 'http://yjxt.elatis.cn/options/update',
      headers: {
        token: sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      data: JSONData,
    }).then(res => {
      if (res.data.code === 0) {
        message.success('保存成功');
      } else {
        message.error(res.data.message);
      }
    });
  };
  const backgroundCol = [
    {
      title: '图片',
      dataIndex: 'picUrl',
      key: 'picUrl',
      render: (picUrl, id) => <div>{picUrlButton(picUrl, id)}</div>,
    },
  ];
  return (
    <div>
      <div className={styles.title}>
        <span>背景图片</span>
      </div>
      <div className={styles.buttonSbar}>
        <Button
          onClick={() => {
            save();
          }}
          className={styles.button}
        >
          保存
        </Button>
      </div>
      <Table columns={backgroundCol} dataSource={data} pagination={false} />
    </div>
  );
};
const block = () => {
  return (
    <div className = {styles.block}>
      <HeaderScroll />
      <Carousel />
      <HomeTopic />
      <Public />
      <Background />
    </div>
  );
};
export default block;
