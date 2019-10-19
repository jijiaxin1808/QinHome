import React from "react";
import "./index.less";
// import Office from '/img/assest/Office.png'
import Homecarousel from "../../components/home-carousel";
import { Link } from "react-router-dom";

const data = [
	"lalalalalalalalalalallalalalalalalalalalallalalalalalalalalalallalalalalalalalalalallalalalalalalalalalal",
	"lalalalalalalalalalal",
	"lalalalalalalalalalal",
	"lalalalalalalalalalal",
	"lalalalalalalalalalal",
	"lalalalalalalalalalal",
	"lalalalalalalalalalal",
	"lalalalalalalalalalal"
];

const data1 = [
	"lalalalalalalalalalallalalalalalalalalalallalalalalalalalalalallalalalalalalalalalallalalalalalalalalalal",
	"lalalalalalalalalalal",
	"lalalalalalalalalalal",
	"lalalalalalalalalalal",
	"lalalalalalalalalalal",
	"lalalalalalalalalalal",
	"lalalalalalalalalalal"
];

const Data = [
	{
		href: "",
		picUrl: ""
	}, {
		href: "",
		picUrl: ""
	}, {
		href: "",
		picUrl: ""
	}
];

const NewsTopRight = () => {
	return (
		<div className='NewsTopRight'>
			<img src="/img/Office.png" alt='' />
			<ol className='News-Right'>
				{
					data1.map((item, index) => {
						return (
							<Link to='/article?id=dasdas' key={index}>
								<li key={index}><a href=''><i /> &nbsp;{item}</a></li>
							</Link>
						);
					})
				}
			</ol>
		</div>
	);
};

class NewsBottomLeft extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			type: "gzdt"
		};
	}

	render () {
		// const Data = {
		//   gzdt: '工作动态',
		//   gdkx: '各地快讯',
		//   yjgljb: '应急管理简报',
		//   aqscjb: '安全生产简报'
		// }
		return (
			<div className='NewsBottomLeft'>
			<img src="/img/Office.png" alt='' />
			<ol className='News-Right'>
				{
					data.map((item, index) => {
						return (
							<Link to='/article?id=dasdas' key={index}>
								<li key={index}><a href=''><i /> &nbsp;{item}</a></li>
							</Link>
						);
					})
				}
			</ol>
		</div>
		);
	}
}

const NewsBottomRight = () => {
	return (
		<div className='NewsBottomRight'>
			<img src="/img/Office.png" alt='' />
			<ol className='News-Right'>
				{
					data.map((item, index) => {
						return (
							<Link to='/article?id=dasdas' key={index}>
								<li key={index}><a href=''><i /> &nbsp;{item}</a></li>
							</Link>
						);
					})
				}
			</ol>
		</div>
	);
};

const News = () => {
	return (
		<div className='news'>
			<Homecarousel data={Data} />
			<NewsTopRight />
			<NewsBottomLeft />
			<NewsBottomRight />
		</div>
	);
};
export default News;
