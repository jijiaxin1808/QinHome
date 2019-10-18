import React from 'react'
import { Link } from 'react-router-dom'

const AdBar = (props) => {
  if (props.type === 'two') {
    return (
      <div className='adbar'>
        <Link to='/' className='adbar-two'>
          <img src={require(props.urls[0])} alt='' />
        </Link>
        <Link to='/' className='adbar-two'>
          <img src={require(props.urls[1])} alt='' />
        </Link>
      </div>
    )
  } else if (props.type === 'one') {
    return (
      <div className='adbar'>
        <Link to=''>
          <img src={require(props.urls[0])} alt='' />
        </Link>
      </div>
    )
  } else return null
}

export default AdBar
