import React from "react";
import "./index.less";
import WeatherIcon from "./weatherIcon";
import Axios from "axios";
export default class Weather extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}
	componentDidMount(){
		Axios.get("http://wthrcdn.etouch.cn/weather_mini?city=秦皇岛").then(res=>{
			const weatherContain = {
				type: res.data.data.forecast[0].type,
				high: res.data.data.forecast[0].high,
				low: res.data.data.forecast[0].low
			};
			this.setState(weatherContain);
		}).catch(()=>{
		});
		Axios.get("https://www.tianqiapi.com/api/?version=v6&city=秦皇岛&appid=68261499&appsecret=IfTIll7V").then(res=>{ 
			const weatherContain = {
				weatherType: res.data.air_level
			}; 
			this.setState(weatherContain);
		}).catch(()=>{
		});
	}
	render(){
		return (
			<div className='Weather'>
				<b>秦皇岛</b>&nbsp;
				<WeatherIcon index={this.state.type} />
				{this.state.high}~{this.state.low}&nbsp;|&nbsp; 空气质量:&nbsp;{this.state.weatherType}
			</div>
		);
	}
}

