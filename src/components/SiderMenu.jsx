import {Layout, Menu} from 'antd';

const {Sider} = Layout;
const {SubMenu} = Menu;
import {Link} from 'react-router-dom';

function SiderMenu() {
    return (
        <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{height: '100%', borderRight: 0}}
            >
                <SubMenu key="sub1" title="导航">
                    <Menu.Item key="1">
                        <Link to="/home">主页</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/login">注册</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
}

export default SiderMenu;