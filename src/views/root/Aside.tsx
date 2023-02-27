import React from 'react';
import type { MenuProps } from 'antd';
import {
  IdcardOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import Icon from '@/ui/Icon';


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem(<Link to={`/`}>基本信息</Link>, 'employee', <Icon type="icon-user" />),
  getItem(<Link to={`/edu`}>教育经历</Link>, 'edu', <Icon type="icon-user" />),
  getItem(<Link to={`/project`}>项目经验</Link>, 'skill', <Icon type="icon-icon-design-" />),
  getItem(<Link to={`/resume`}>生成简历</Link>, 'resume', <Icon type="icon-icon-design-" />),
  getItem(<Link to={`/job`}>岗位管理</Link>, 'job', <IdcardOutlined />),
  // getItem(<Link to={`/corp`}>公司管理</Link>, 'corp', <Icon type="icon-desktop" />),
];

const App: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    // console.log('click ', e);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default App;