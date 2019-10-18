import React from 'react'
import './index.less'
import { Link } from 'react-router-dom'

const HomeTopic = (props) => {
  return (
    <div className='home-topic'>
      <div className='home-topic-header'>
        <span>{props.title}</span>
        <Link to={props.href}>
                    更多 >>
        </Link>
      </div>
      <div className='home-topic-content'>
        <ul>
          {
            // props.data.map((item, index) => {
            //   return (
            //     <li className='home-topic-li' key={index}>
            //       <Link to='/article?id=dasdas'>
            //         {`${index + 1}. ${item.title}`}
            //       </Link>
            //     </li>
            //   )
            // })
          }
        </ul>
      </div>
    </div>
  )
}
const HomeTopics = (props) => {
  const { colsData } = props
  console.log(colsData)
  return (
    <div className='home-topics'>
      {
        colsData.slice(2, colsData.length).map((item, index) => {
          return (
            <HomeTopic data={item.articles} title={item.title} href={item.link} key={index} />
          )
        })
      }

    </div>
  )
}

export default HomeTopics
