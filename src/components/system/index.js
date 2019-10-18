/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import './index.less'

const System = () => {
  return (
    <div className='System'>
      <div className='IntelligentSecurity'>
        <div className='IntelligentSecurity-top'><img src="/img/1.png" className='IntelligentSecurity-bottom-img' />秦皇岛市智慧安检</div>
        <div className='IntelligentSecurity-middle' />
        <div className='IntelligentSecurity-bom'>
          <a href='http://111.63.38.37:9000/qhdsafety/login/login.jsp' target='_blank' className='IntelligentSecurity-bottom' style={{ marginLeft: '10px', marginRight: '43px' }}>管理端</a>
          <a href='http://111.63.38.37:9000/qhdcorp/login/login.jsp' target='_blank' className='IntelligentSecurity-bottom' style={{ marginRight: '43px' }}>企业端</a>
          <a href='' className='IntelligentSecurity-bottom'>网站后台</a>
        </div>
      </div>
      <div className='Enforcement'>
        <a href='' className='Enforcement-top'><img src="/img/2.png" className='IntelligentSecurity-bottom-img' />行政执法公示</a>
      </div>
      <div className='Note'>
        <a href='' className='Note-top'><img src="/img/3.png" className='IntelligentSecurity-bottom-img' />安监留言吧</a>
      </div>
    </div>
  )
}
export default System
