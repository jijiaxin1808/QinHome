import React from "react"
import { Table} from "antd";
import './index.less'
export const Search = (props)=> {
	return (
		<div>
			<Table columns={props.columns} dataSource={props.dataSource} />  
		</div>
	)
}
export const Message = (props)=> {
	return (
		<div className="zx-message">
			<div className="zx-message-main">
				<p>留言标题</p>
                <p className="second">你在说什csdcdscsdcdscdscfgbghtyt个好人桐谷和人一塌糊涂如果他然后给高v如果热歌乳鸽肉高v热歌vgfdvdvffwsf日他哥么</p>
			</div>
			<div className="zx-message-main">
            <p>留言标题</p>
                <p className="second">你在说什么</p>
			</div>
			<div className="zx-message-main">
            <p>留言标题</p>
                <p className="second">你在说什么</p>
			</div>
		</div>
	)
}