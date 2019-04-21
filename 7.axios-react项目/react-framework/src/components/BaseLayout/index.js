import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import { formatFirstMenu, formatSecondMenu } from 'utils/tool'
import { Layout, Menu, Icon, Row, Col, Avatar } from 'antd'
import './index.less'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setGlobalLoading, checkIsLogin } from 'actions/global'
import menus from './_nav'
const SubMenu = Menu.SubMenu
const { Header, Sider, Content } = Layout


@connect(
  state => state.getIn(['global']),
  dispatch => bindActionCreators({ setGlobalLoading, checkIsLogin }, dispatch)
)
class BaseLayout extends React.Component {
  state = {
    currentMenu: formatSecondMenu(this.props.location.pathname),
    menuData: {
      theme: 'dark', // 菜单主题色
      defaultSelectedKeys: this.props.location.pathname, // 当前默认值
      mode: 'inline', // 菜单模式
      defaultOpenKeys: formatFirstMenu(this.props.location.pathname),
      list: menus
    }
  }
  getCurrentMenu = (item) => {
    console.log(item);
    
    this.setCurrentMenu(item.key)
  }
  setCurrentMenu = (item) => {
    this.setState(() => ({
      currentMenu: formatSecondMenu(item)
    }))
  }
  redirectRoute = () => {
    const { isLogin, location, history } = this.props
    if (isLogin) {
      history.push(location.pathname)
    } else {
      history.push('/login')
    }
  }
  onLogout = () => {
    this.props.checkIsLogin(false)
  }
  componentDidMount() {
    this.redirectRoute()
    this.props.setGlobalLoading(true)
  }
  render() {
    const { routes = [] } = this.props
    const { menuData, currentMenu } = this.state
    const list = menuData.list
    return (
      <Layout className="base-layout">
        <Sider>
          <Menu
            theme={menuData.theme}
            mode={menuData.mode}
            defaultOpenKeys={[menuData.defaultOpenKeys]}
            defaultSelectedKeys={[menuData.defaultSelectedKeys]}
          >
            {
              list.map((item) => {
                return (
                  <SubMenu key={item.id} title={<span><Icon type={item.icon} /><span>{item.value}</span></span>}>
                    {
                      item.subtitle.map(second => {
                        return (
                          <Menu.Item
                            key={second.link}
                            onClick={this.getCurrentMenu}
                          >
                            <NavLink to={second.link}>
                              {second.value}
                            </NavLink>
                          </Menu.Item>
                        )
                      })
                    }
                  </SubMenu>
                )
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Row gutter={12}>
            <Col span={24}>

              <Layout>
                <Header className="base-header">
                  <span className="header-tag">{currentMenu && `导航 /`} {currentMenu}</span>
                  <NavLink to="/login" onClick={this.onLogout}><Avatar size="large" icon="user" /></NavLink>
                </Header>
                <Content className="base-content">
                  {
                    routes.map((r, key) => {
                      return (
                        <Route
                          component={r.component}
                          exact={!!r.exact}
                          key={r.path + key}
                          path={r.path}
                        />
                      )
                    })
                  }
                </Content>
              </Layout>
            </Col>

          </Row>
        </Layout>
      </Layout>
    )
  }
}

export default BaseLayout