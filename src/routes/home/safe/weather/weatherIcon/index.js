import React from 'react'
import './index.less'
// import wea01 from '/img/weather-01.png'
// import wea02 from '/img/weather-02.png'
// import wea03 from '/img/weather-03.png'
// import wea04 from '/img/weather-04.png'
// import wea05 from '/img/weather-05.png'
// import wea06 from '/img/weather-06.png'
// import wea07 from '/img/weather-07.png'

const WeatherIcon = (props) => {
  switch (props.index) {
    case '1': return <img src='/img/weather-01.png' className='WeatherIcon' alt='晴' />
    case '2': return <img src='/img/weather-02.png' className='WeatherIcon' alt='多云' />
    case '3': return <img src='/img/weather-03.png' className='WeatherIcon' alt='阴' />
    case '4': return <img src='/img/weather-04.png' className='WeatherIcon' alt='雪' />
    case '5': return <img src='/img/weather-05.png' className='WeatherIcon' alt='小雨' />
    case '6': return <img src='/img/weather-06.png' className='WeatherIcon' alt='中雨' />
    case '7': return <img src='/img/weather-07.png' className='WeatherIcon' alt='大雨' />
    default: return null
  }
}

export default WeatherIcon
