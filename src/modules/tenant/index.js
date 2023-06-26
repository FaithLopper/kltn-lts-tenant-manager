import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import React from 'react';
import BaseTable from '@components/common/table/BaseTable';

import { DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import PageWrapper from '@components/common/layout/PageWrapper';
import ListPage from '@components/common/layout/ListPage';
import { Tag } from 'antd';

const TenantListPage = () => {
    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: {
            getList: apiConfig.tenant.getList,
            delete: apiConfig.tenant.delete,
        },
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: 'Tenant',
        },
        override: (funcs) => {
            funcs.mappingData = (response) => {
                if (response.result === true) {
                    return {
                        data: response.data.data,
                        total: response.data.totalElements,
                    };
                }
            };
        },
    });

    const columns = [
        { title: 'ID', dataIndex: 'id' },
        // { title: 'Email', dataIndex: 'email' },
        {
            title: 'Tạo bởi',
            dataIndex: 'createdBy',
            render: (createdBy) => (
                <Tag color="#108ee9">
                    <div style={{ padding: '0 4px', fontSize: 14 }}>{createdBy}</div>
                </Tag>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            width: '180px',
            // render: (createdDate) => convertUtcToTimezone(createdDate),
        },
        mixinFuncs.renderStatusColumn({ width: '90px' }),
        mixinFuncs.renderActionColumn({ edit: true, delete: true }, { width: '90px' }),
    ];

    const searchFields = [
        {
            key: 'id',
            placeholder: 'ID',
        },
    ];

    return (
        <PageWrapper routes={[ { breadcrumbName: 'Home', path: '/' }, { breadcrumbName: 'Tenant' } ]}>
            <ListPage
                filterForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                actionBar={mixinFuncs.renderActionBar()}
                title="Quản lý tenant"
                description="Tạo mới và tùy chỉnh các tenant."
                table={
                    <BaseTable
                        onChange={mixinFuncs.changePagination}
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        rowKey={(record) => record.id}
                        pagination={pagination}
                    />
                }
            />
        </PageWrapper>
    );
};

export default TenantListPage;
