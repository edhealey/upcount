import { Icon, Menu, Layout } from 'antd';
import { Trans } from '@lingui/macro';
import { compact, get, join, take } from 'lodash';

import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import pathToRegexp from 'path-to-regexp';

const Navigation = props => {
  const pathname = get(props, ['location', 'pathname']);
  const match = pathToRegexp(`/(.*)`).exec(pathname);
  const pathArr = get(match, 1).split('/');

  const openKeys = pathArr[0] === 'settings' ? ['settings'] : [];
  const selectedKeys = [join(take(compact(pathArr), 2), '.')];

  return (
    <Layout.Sider trigger={null} collapsible collapsed={props.collapsed}>
      <div className="logo" style={{ height: 22, margin: '21px 16px', textAlign: 'center' }}>
        <Link to="/invoices">
          <img src={require(`../../assets/logo.svg`)} alt="Upcount" />
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={selectedKeys}
      >
        <Menu.Item key="invoices">
          <Link to="/invoices">
            <div>
              <Icon type="file-text" />
              <Trans>Invoices</Trans>
            </div>
          </Link>
        </Menu.Item>
        <Menu.Item key="clients">
          <Link to="/clients">
            <div>
              <Icon type="team" />
              <Trans>Clients</Trans>
            </div>
          </Link>
        </Menu.Item>
        <Menu.SubMenu
          key="settings"
          title={
            <span>
              <Icon type="setting" />
              <Trans>Settings</Trans>
            </span>
          }
        >
          <Menu.Item key="settings.organization">
            <Link to="/settings/organization">
              <Icon type="contacts" /> <Trans>Organization</Trans>
            </Link>
          </Menu.Item>
          <Menu.Item key="settings.invoice">
            <Link to="/settings/invoice">
              <Icon type="contacts" /> <Trans>Invoice</Trans>
            </Link>
          </Menu.Item>
          <Menu.Item key="settings.tax-rates">
            <Link to="/settings/tax-rates">
              <Icon type="calculator" /> <Trans>Tax rates</Trans>
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Layout.Sider>
  );
};

export default withRouter(Navigation);
