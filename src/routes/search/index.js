import React,{useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {message, Spin, Pagination} from "antd";
import "./index.less"

export default function Search() {

	const [searchList, setSearchList] = useState([]); 
	const [curPage, setCurPage] = useState(1);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		axios.get("http://yjxt.elatis.cn/posts/listPosts",{
			headers: {
				"Content-Type": "application/json",
			},
			params: {
				status: "draft"
			},
		}).then(res => {
			if(res.data.code === 0) {
				setTotal(res.data.data.length);

			}
		}).catch(err => {

		});
	}, []);
	useEffect(() => {
		axios.get("http://yjxt.elatis.cn/posts/listPosts",{
			headers: {
				"Content-Type": "application/json", 
			},
			params: {
				status: "draft",
				limit: 5,
				offset: (curPage-1) * 5,
			}, 
		}).then(res => {
			if(res.data.code === 0) {
				console.log(res.data.data);
				if(res.data.data.length === 0) {
					setSearchList("none");
				}
				else 
					setTimeout(() => setSearchList(res.data.data),200);
			}
		}).catch(err => {
			message.error(err);
		});
	}, [curPage]);

	return (
		<div className="search-page">
			<div className='search-header'>
				<i />
				<span>您当前的位置: </span>
				<Link to='/index/index'>
            首页&nbsp;>
				</Link>
				<span>
						搜索
				</span>
				<span className='message-header-paper' />
			</div>
			{
				renderSearchList(searchList, curPage, total, setCurPage)
			}
		</div>
	);
}

function renderSearchList(searchList,curPage, total,setCurPage) {
	if(searchList.length === 0) {
		return (
			<div className="pagi">
				<Spin />
			</div>
		);
	} 
	else if(searchList === "none") {
		return <div style={{fontSize: 18, textAlign: "center", height: 200, lineHeight: "160px",borderBottom: "1px solid #186ec5"}}>暂无搜索结果</div>;
	} 
	else {
		return (
      <><ul className="index-search-list">
        	{
        		searchList.map((item,index) => (
        			<li className="active" key={`${index}${item}`}>
        				<Link to="/">
        					{`【领导活动】  ${item.title}`}
        					<span className="time">2020-03-04</span>
        				</Link>
        			</li>
        		))
        	}
      </ul><Pagination 
        	total={total}
        	onChange={page => setCurPage(page)}
        	hideOnSinglePage
        	defaultCurrent={1}
        	pageSize={5}
        	showQuickJumper
      /></>
		);
	}
}