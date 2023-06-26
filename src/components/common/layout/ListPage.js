import { ConfigProvider, Spin } from 'antd';
import classNames from 'classnames';
import React from 'react';

import styles from './ListPage.module.scss';

function ListPage({ title, className, description, actionBar, filterForm, table, loading = false, children }) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#2974a5',
                },
            }}
        >
            <Spin spinning={loading}>
                <div className={classNames(styles.listBase, className)}>
                    <div className={styles.title}>{title}</div>
                    {description && <div className={styles.description}>{description}</div>}
                    {actionBar && <div className={styles.actionBar}>{actionBar}</div>}
                    {filterForm && <div className={styles.filterForm}>{filterForm}</div>}
                    {table}
                    {children}
                </div>
            </Spin>
        </ConfigProvider>
    );
}

export default ListPage;
