import React from 'react'
import './index.less'
import WeatherIcon from './weatherIcon'
const Weather = (props) => {
  return (
    <div className='Weather'>
      <b>秦皇岛</b>&nbsp;
      <WeatherIcon index={props.Data.weatherType} />
      {props.Data.Max}°C~{props.Data.Min}°C&nbsp;|&nbsp; 空气质量:&nbsp;{props.Data.type}
    </div>
  )
}

export default Weather
