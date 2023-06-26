import React, { useEffect, useRef, useState } from 'react';
import { Layout } from 'antd';

import NavSider from './NavSider';
import AppHeader from './AppHeader';

import styles from './MainLayout.module.scss';
import { brandName, navigateTypeEnum } from '@constants';
import { useNavigationType } from 'react-router-dom';
import ErrorBoundary from '@components/common/elements/ErrorBoundary';

const { Content, Footer } = Layout;

const SIDEBAR_WIDTH_EXPAND = 320;

const MainLayout = ({ children }) => {
    const [ collapsed, setCollapsed ] = useState(false);
    const navigateType = useNavigationType();
    const appContentRef = useRef(null);

    const toggleCollapsed = () => setCollapsed((prev) => !prev);

    useEffect(() => {
        if (navigateType !== navigateTypeEnum.POP && appContentRef.current) {
            appContentRef.current?.scrollTo(0, 0);
        }
    }, [ location.pathname ]);

    return (
        <Layout>
            <AppHeader />
            <Layout>
                <NavSider collapsed={collapsed} onCollapse={toggleCollapsed} width={SIDEBAR_WIDTH_EXPAND} />
                <Content ref={appContentRef} className={styles.appContent}>
                    <ErrorBoundary>
                        <div className={styles.wrapper}>{children}</div>
                    </ErrorBoundary>
                    <Footer className={styles.appFooter}>
                        <strong>{brandName} </strong>- © Copyright {new Date().getFullYear()}. All Rights Reserved.
                    </Footer>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
