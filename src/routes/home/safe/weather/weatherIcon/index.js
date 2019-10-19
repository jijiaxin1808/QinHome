import React from 'react'
import './index.less'

const WeatherIcon = (props) => {
  switch (props.index) {
    case '晴': return <img src='/img/weather-01.png' className='WeatherIcon' alt='晴' />
    case '多云': return <img src='/img/weather-02.png' className='WeatherIcon' alt='多云' />
    case '阴': return <img src='/img/weather-03.png' className='WeatherIcon' alt='阴' />
    case '阵雪': return <img src='/img/阵雪.png' className='WeatherIcon' alt='阵雪' />
    case '大雪': return <img src='/img/weather-04.png' className='WeatherIcon' alt='雪' />
    case '小雪': return <img src='/img/weather-04.png' className='WeatherIcon' alt='雪' />
    case '中雪': return <img src='/img/weather-04.png' className='WeatherIcon' alt='雪' />
    case '暴雪': return <img src='/img/weather-04.png' className='WeatherIcon' alt='雪' />
    case '中雨': return <img src='/img/weather-05.png' className='WeatherIcon' alt='中雨' />
    case '小雨': return <img src='/img/小雨.png' className='WeatherIcon' alt='小雨' />
    case '大雨': return <img src='/img/大雨.png' className='WeatherIcon' alt='大雨' />
    case '暴雨': return <img src='/img/weather-06.png' className='WeatherIcon' alt='暴雨' />
    case '大暴雨': return <img src='/img/weather-07.png' className='WeatherIcon' alt='大暴雨' />
    case '雾': return <img src='/img/雾.png' className='WeatherIcon' alt='雾' />
    default: return null
  }
}

export default WeatherIcon
