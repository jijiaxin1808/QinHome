import React from 'react'
import {Modal,Select} from 'antd'
const { Option } = Select;
 export const Modals=(props)=>{
     return (
        <Modal
        title="修改权限"
        visible={props.visible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
      cancelText="取消"
      okText="确定"
    >
      <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="请选择lease select"
          defaultValue={props.children}
          onChange={props.handleChange}
      >
          {props.power.map((item,index)=>{
              return (
                  <Option key={index} value={item}>{item}</Option>
              )
          })}
      </Select>,
    </Modal>
     )
 }