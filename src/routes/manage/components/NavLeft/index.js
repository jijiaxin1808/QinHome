import React, { useEffect, useState } from 'react'
import { Menu, Input } from 'antd';
import Link from 'umi/link'
// import { NavLink } from 'react-router-dom'
import MenuConfig from './../../../../assets/menuConfig'
import styles from './index.css'
const SubMenu = Menu.SubMenu;

const { Search } = Input;

function NavLeft() {
  function renderMenu(data) {
    return data.map((item)=>{
      if(item.children){
        return (
          <SubMenu title={item.title} key={item.key}>
            { renderMenu(item.children) }
          </SubMenu>
        )
      }
      return <Menu.Item title={item.title} key={item.key}>
        <Link to={item.key}>{item.title}</Link>
      </Menu.Item>
    })
  }
  const [menuTreeNode, setMenuTreeNode] = useState(null)
  useEffect(() => {
    setMenuTreeNode(renderMenu(MenuConfig))
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Link to="/">
        <div className={styles.logo}>
          <img src="" alt=""/>
          <h1>秦皇岛市应急管理局后台</h1>
        </div>
      </Link>
      <Menu
        mode="inline"
        theme="dark"
      >
        {menuTreeNode}
      </Menu>
    </div>
  );
}
export default NavLeft;
