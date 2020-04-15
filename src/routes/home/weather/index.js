import React from "react";
import "./index.less";
import WeatherIcon from "./weatherIcon";
import axios from "axios";
import { message } from "antd";
export default class Weather extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}
	componentDidMount(){
		axios.get("http://wthrcdn.etouch.cn/weather_mini?city=秦皇岛").then(res=>{
			console.log("数据",res);
			const weatherContain = {
				type: res.data.data.forecast[0].type,
				high: res.data.data.forecast[0].high,
				low: res.data.data.forecast[0].low
			};
			this.setState(weatherContain);
		}).catch(()=>{
			message.error("天气出错");
		});
		axios.get("https://www.tianqiapi.com/api/?version=v6&city=秦皇岛&appid=68261499&appsecret=IfTIll7V").then(res=>{ 
			const weatherContain = {
				weatherType: res.data.air_level
			}; 
			this.setState(weatherContain);
		}).catch(()=>{
			console.log("天气获取失败");
		});
	}
	render(){
		console.log("渲染了",this.state);
		return (
			<div className='Weather'>
				<b>秦皇岛</b>&nbsp;
				<WeatherIcon index={this.state.type} />
				&nbsp;&nbsp;{this.state.high}~{this.state.low}&nbsp;|&nbsp;:&nbsp;{this.state.weatherType}
			</div>
		);
	}
}

