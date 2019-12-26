import React, { useEffect, useState } from "react";
import "./index.less";
import * as Front from "../../api/Front";
import urlHandle from "../../utils/urlHandle";
import { message, Spin } from "antd";

const Article = () => {
	const [data, setdata] = useState([]);

	useEffect(() => {
		Front.getArticle(urlHandle("id"))
			.then(res => {
			if (res.data.code === 0) {
				setdata(res.data.data);
			} else {
				setdata(["none"]);
			}
		}).catch(err => {
			if (err) {
				setdata(["none"]);
			}
		});
	}, []);
	useEffect(() => {
	}, []);
	if (data[0] === "none") {
		message.warn("所访问页面不存在");
		window.location.href = "/index/index";
		return null;
	} 
	else if (!data.section ) {
		return(
			<div className='article allCenter '>
				<Spin size='large' />
			</div>
		);
	} 
	else {
		return (
			<div className='article'>
				<div className='article-location' />
				<div className='article-header'>
					<div className='article-title'>
						{data.title}
					</div>
					<div className='article-info'>
						<span>{`发布时间: ${data.created_at.slice(0,10)}`}</span>
						<span>{`发布部门: ${data.section}`}</span>
						<span>{`点击次数: ${data.clicked}`}</span>
					</div>
				</div>
				<div >
					{<p dangerouslySetInnerHTML={{ __html:data.content}}  />}
				</div>
			</div>
		);
	}
};
export default Article;
