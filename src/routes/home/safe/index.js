import React, { useState, useEffect, useRef } from 'react'
import './index.less'
import Weather from './weather'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Safe () {
  const [annouces, setAnnouces] = useState([])
  let [left, setLeft] = useState(0)
  let [leftTimer, setTimer] = useState(0)
  const [padLeft, setPadLeft] = useState(0)
  const [width, setWidth] = useState(2050)
  const [i, setI] = useState(1)
  const ref = useRef(null)
  const timerFunc = () => setLeft(left--)

  useEffect(() => {
    axios.get('http://yjxt.elatis.cn/options/name/safe').then((res) => {
      if (res.data.code === 0) {
        setAnnouces(res.data.data)
      }
    })
    // setAnnouces([
    //   '公告1公告1公告1公告1公告1公告1公告1公告1公告1公告1公告1公告1公告1公告1公告1公告1公告1公告1',
    //   '公告2公告2公告2公告2公告2公告2',
    //   '公告3公告3公告3公告3公告3公告3',
    //   '公告4公告4公告4公告4公告4公告4',
    //   '公告5公告5公告5公告5公告5公告5'
    // ])
    leftTimer = setTimer(setInterval(timerFunc, 20))
  }, [])
  useEffect(() => {
    if (left < -322 * i) {
      setI(i + 1)
      annouces.push(annouces.shift())
      setWidth(width + 322)
      setPadLeft(322 * i)
      setAnnouces(annouces)
    }
  }, [left, i])

  const style = {
    width: `${width}px`,
    position: 'relative',
    overflow: 'hidden',
    left: `${left}px`,
    paddingLeft: `${padLeft}px`
  }

  const handleMouseEnter = () => {
    clearInterval(leftTimer)
    setTimer(null)
  }

  const handleMouseLeave = () => {
    console.log(leftTimer)
    leftTimer && clearInterval(leftTimer)
    setTimer(setInterval(timerFunc, 20))
  }

  return (
    <div className='safe'>
      <a>
        <i />
      </a>
      <div className='aqts'>
        <div className='temp-wrap'>
          <ul className='aqtslist' ref={ref} style={style}>
            {
              annouces.map((item, index) => {
                return (

                  <li key={index} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <Link to={item.href}>{item.title}</Link>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      <Weather />
    </div>
  )
}
