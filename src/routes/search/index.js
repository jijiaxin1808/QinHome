import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import urlHandle from "../../utils/urlHandle";
import {message, Spin, Pagination} from "antd";
import "./index.less";
import * as Front from "../../api/Front";

export default function Search(props) {

	const [searchList, setSearchList] = useState([]); 
	const [curPage, setCurPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(true);
	const [key] = useState(decodeURIComponent(urlHandle("key")));

	useEffect(() => {

		key && 
    axios.get("http://yjxt.elatis.cn/posts/searchTitle",{
    	headers: {
    		"Content-Type": "application/json",
    	},
    	params: {
    		flag: 1,
    		key: key,
    	},
    }).then(res => {
    	if(res.data.code === 0) {
    		setTotal(res.data.data.length);
    	}
    }).catch(err => message.error(err));
	}, [key]);

	useEffect(() => {
		key &&axios.get("http://yjxt.elatis.cn/posts/searchTitle",{
    	headers: {
    		"Content-Type": "application/json",
    	},
    	params: {
    		flag: 1,
    		key: key,
    		limit: 5,
    		offset: (curPage-1) * 5,
    	},
    }).then(res => {
    	if(!res.data.code) {
    		setLoading(false);
    		if(!res.data.data.length ) {
    			setSearchList("none");
    		} else {
    			setSearchList(res.data.data);
    		}
        
    	}
    }).catch(err => message.error(err));

	}, [key, curPage]);

	useEffect(() => {
		!key &&
    axios.get("http://yjxt.elatis.cn/posts/listPosts",{
    	headers: {
    		"Content-Type": "application/json",
    	},
    	params: {
    		flag: 1,
    		status: "publish"
    	},
    }).then(res => {
    	if(!res.data.code) {
    		setTotal(res.data.data.length);
    	}
    }).catch(err => {
    	message.error(err);
    });
	}, []);

	useEffect(() => {
		setLoading(true);
		!key && axios.get("http://yjxt.elatis.cn/posts/listPosts",{
			headers: {
				"Content-Type": "application/json", 
			},
			params: {
				flag: 1,
				status: "publish",
				limit: 5,
				offset: (curPage-1) * 5,
			}, 
		}).then(res => {
			if(!res.data.code) {
				setLoading(false);
				if(!res.data.data.length) {
					setSearchList("none");
				}
				else 
					setSearchList(res.data.data);
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
			<div>
				{
					renderSearchList(searchList, loading)
				}
				<Pagination 
					total={total}
					onChange={page => setCurPage(page)}
					hideOnSinglePage
					defaultCurrent={1}
					pageSize={5}
					showQuickJumper
				/>
			</div>
		</div>
	);
}

function renderSearchList(searchList, loading) {
	if(searchList.length === 0 || loading) {
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
			<ul className="index-search-list">
				{
					searchList.map((item,index) => {
						console.log(item.category.split("/")[2],"77777777");
						return (
							<li className="active" key={`${index}${item}`}>
								<Link to={`/index/article?id=${item.id}`} className="arti-title">
									<i>{`【${item.category.split("/")[2]}】  ${item.title}`}</i>
									<span className="time">{item.created_at.slice(0,10)}</span>
								</Link>
							</li>
						);
					})
				}
			</ul>
		);
	}
}