import React,{Suspense} from 'react';
import { Router, Route, Switch } from 'dva/router';
import Loading from './components/loading'
import Home from './routes/home'
import News from './routes/news'
import Article from './routes/article'
import CpMessage from './routes/message/cp'
import SocietyMessage from './routes/message/society'
import Footer from './components/footer'
import Header from './components/header'
import headerData from "./config/headerData"
import Message from "./routes/message"

const messageData = {
  sideBar: [
    {
      title: '领导活动',
      type: 'ldhd',
      href: '/message?type=ldhd'
    }, {
      title: '安全生产',
      type: 'aqsc',
      href: '/message?type=aqsc'
    }, {
      title: '防灾救灾',
      type: 'fzjz',
      href: '/message?type=fzjz'
    }, {
      title: '应急救援',
      type: 'yjjy',
      href: '/message?type=yjjy'
    }, {
      title: '综合信息',
      type: 'zhxx',
      href: '/message?type=zhxx'
    }
  ]
}
const routers= [
  {
    name: '首页',
    path: '/',
    component: Home,
    key: 0
  },
  {
    name: '新闻中心',
    path: '/news',
    component: News,
    key: 1
  },
  {
    name: '文章',
    path: '/article',
    component: Article,
    key: 2
  },
  {
    name: '社会化服务',
    path: '/society',
    component: SocietyMessage,
    key: 3
  },
  {
    name: '文章',
    path: '/cp',
    component: CpMessage,
    key: 4
  }
]

function RouterConfig({ history }) {
  return (
    <Router history={history}>
     <div>
     <Header barData={headerData} />
    <Suspense fallback={<Loading />}>
      <Switch>
        {routers.map(({ name, path, exact = true, component }) => (
          <Route path={path} exact={exact} component={component} key={name} />
        ))}
        <Message messageData={messageData} />
      </Switch>
    </Suspense>
    <Footer />
     </div>
    </Router>
  );
}

export default RouterConfig;
