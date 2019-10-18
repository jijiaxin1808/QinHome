/* 首页tabs */
import React from "react";
import { Tabs as T } from "antd";
import "./index.less";
import { Link } from "react-router-dom";
const { TabPane } = T;

export default function Tabs (props) {
	const data = props.data;
	const operations = <a>更多>></a>;
	return (
		<T defaultActiveKey='1' tabBarExtraContent={operations}>
			{
				data.map((item, index) => {
					return (
						<TabPane tab={item.tab} key={`${item.tab}${index}`}>
							<ul className='home-tabs'>
								{
									item.Info.map((item, index) => (

										<li key={index}>

											<i className='tabs-i'>·</i>&nbsp;&nbsp;
											{/* {index + 1} */}
											<Link to='/article?id=asksdas'>
												{item}
											</Link>
										</li>
									))
								}
							</ul>
						</TabPane>
					);
				})
			}
		</T>
	);
}
