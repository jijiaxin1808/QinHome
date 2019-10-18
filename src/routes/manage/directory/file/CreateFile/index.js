import React from "react";
import styles from "./index.css";
import { Upload, Icon, message, Row, Col } from 'antd';

const { Dragger } = Upload;
const fileList = [
    // {
    //   uid: '-1',
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-2',
    //   name: 'yyy.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ];
const props = {
  name: 'file',
  multiple: true,
  listType: 'picture',
  defaultFileList: [...fileList],
  action: 'http://yjxt.elatis.cn/file/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name}文件上传成功`);
    } else if (status === 'error') {
      message.error(`${info.file.name}文件上传失败`);
    }
  },className: styles.upload,
};

const CreateFile = ()=> {
    
    return (
        <Row type = "flex" justify = "center"> 
        <Col span={12}>
        <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">点击或拖拽文件以上传</p>
        <p className="ant-upload-hint">
          支持拖拽和点击上传
        </p>
      </Dragger>
      </Col>
      </Row>
    )
}
export default CreateFile;