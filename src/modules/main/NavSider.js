import React, { useMemo } from 'react';
import { Layout, Menu } from 'antd';

import styles from './NavSider.module.scss';
import navMenuConfig from '@constants/menuConfig';
import { useNavigate, matchPath } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const { Sider } = Layout;

const NavSider = ({ collapsed, onCollapse, width }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const activeNav = useMemo(() => {
        const activeNav = findActiveNav(navMenuConfig);
        if (activeNav) {
            return activeNav;
        }

        return {
            selectedKeys: [],
            openKeys: [],
        };
    }, [ location.pathname ]);

    console.log(activeNav);

    function makeNavs(navs) {
        return navs.map((nav) => {
            const newNav = { ...nav };
            if (newNav.children) {
                newNav.children = makeNavs(nav.children);
            }

            return newNav;
        });
    }

    function handleMenuItemClick(item) {
        let selectedNav;
        navMenuConfig.map((navItem) => {
            if (navItem.key === item.key) selectedNav = navItem;
            else if (navItem.children) {
                navItem.children.map((navChild) => {
                    if (navChild.key === item.key) selectedNav = navChild;
                });
            }
        });

        navigate(selectedNav?.path);
    }

    function findActiveNav(navs) {
        for (const nav of navs) {
            if (nav.children) {
                const activeItem = findActiveNav(nav.children);
                if (activeItem) {
                    return {
                        selectedKeys: activeItem.selectedKeys,
                        openKeys: [ nav.key, ...activeItem.openKeys ],
                    };
                }
            } else if (matchPath(nav.path + '/*', location.pathname)) {
                return {
                    selectedKeys: [ nav.key ],
                    openKeys: [],
                };
            }
        }
    }

    return (
        <Sider
            className={'app-sider ' + styles.sidebar}
            collapsible
            collapsed={collapsed}
            width={width}
            onCollapse={onCollapse}
            trigger={null}
        >
            <Menu
                theme="dark"
                mode="inline"
                className={styles.menu}
                defaultSelectedKeys={activeNav.selectedKeys}
                defaultOpenKeys={activeNav.openKeys}
                selectedKeys={activeNav.selectedKeys}
                items={makeNavs(navMenuConfig)}
                onSelect={(item) => handleMenuItemClick(item)}
            />
        </Sider>
    );
};

export default NavSider;
