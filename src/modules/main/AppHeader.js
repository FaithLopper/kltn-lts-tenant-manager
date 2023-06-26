import React from 'react';
import { Layout, Menu, Avatar, Space } from 'antd';
import { DownOutlined, UserOutlined, LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
const { Header } = Layout;

import styles from './AppHeader.module.scss';
import useAuth from '@hooks/useAuth';
import { useDispatch } from 'react-redux';
import { accountActions } from '@store/actions';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { removeCacheToken } from '@services/userService';
import { useNavigate, useParams } from 'react-router-dom';
import { AppConstants, brandName } from '@constants';
import logo from '@assets/images/logo-white-bg.png';
const AppHeader = () => {
    const { profile } = useAuth();
    const dispatch = useDispatch();
    const { execute: executeLogout } = useFetch(apiConfig.account.logout);
    const navigate = useNavigate();

    const onLogout = () => {
        executeLogout({
            onCompleted: () => {
                removeCacheToken();
                dispatch(accountActions.logout());
            },
        });
    };

    return (
        <Header className={styles.header} style={{ padding: 0, background: 'white' }}>
            <span className={styles.brand} onClick={() => navigate('/')}>
                <img className={styles.logo} src={logo} alt="" />
                {brandName}
            </span>
            <Menu
                style={{ borderBottom: 'none' }}
                mode="horizontal"
                className={styles.rightMenu}
                selectedKeys={[]}
                items={[
                    {
                        label: (
                            <Space>
                                <Avatar icon={<UserOutlined />} src={AppConstants.contentRootUrl + profile?.avatar} />
                                {profile?.username}
                                <DownOutlined />
                            </Space>
                        ),
                        children: [
                            {
                                label: 'Trang cá nhân',
                                icon: <UserOutlined />,
                                onClick: () => navigate('/profile'),
                            },
                            {
                                label: 'Đăng xuất',
                                icon: <LoginOutlined />,
                                onClick: onLogout,
                            },
                        ],
                    },
                ]}
            />
        </Header>
    );
};

export default AppHeader;
