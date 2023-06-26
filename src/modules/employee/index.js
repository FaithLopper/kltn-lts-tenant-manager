import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import { Avatar, Tag } from 'antd';
import React from 'react';
import BaseTable from '@components/common/table/BaseTable';

import { UserOutlined } from '@ant-design/icons';
import { AppConstants, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import PageWrapper from '@components/common/layout/PageWrapper';
import ListPage from '@components/common/layout/ListPage';
import { FieldTypes } from '@constants/formConfig';
import { commonStatus } from '@constants/masterData';

const EmployeeListPage = () => {
    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.employee,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: 'Employee',
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
        {
            title: '#',
            dataIndex: [ 'account', 'avatar' ],
            align: 'center',
            width: 100,
            render: (avatar) => (
                <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    src={avatar ? `${AppConstants.contentRootUrl}${avatar}` : null}
                />
            ),
        },
        { title: 'User name', dataIndex: [ 'account', 'username' ] },
        { title: 'Full name', dataIndex: [ 'account', 'fullName' ] },
        { title: 'Phone', dataIndex: [ 'account', 'phone' ], width: '130px' },
        {
            title: 'Group',
            dataIndex: [ 'account', 'group' ],
            width: '200px',
            render: (group) => (
                <Tag color="#108ee9">
                    <div style={{ padding: '0 4px', fontSize: 14 }}>{group?.name}</div>
                </Tag>
            ),
        },
        {
            title: 'Created date',
            dataIndex: [ 'account', 'createdDate' ],
            width: '180px',
            // render: (createdDate) => convertUtcToTimezone(createdDate),
        },
        mixinFuncs.renderStatusColumn({ width: '90px', dataIndex: [ 'account', 'status' ] }),
        mixinFuncs.renderActionColumn({ edit: true, delete: true }, { width: '90px' }),
    ];

    const searchFields = [
        {
            key: 'username',
            placeholder: 'User name',
        },
        {
            key: 'fullName',
            placeholder: 'Full name',
        },
        {
            key: 'status',
            type: FieldTypes.SELECT,
            options: commonStatus,
            placeholder: 'Status',
        },
    ];

    return (
        <PageWrapper routes={[ { breadcrumbName: 'Home', path: '/' }, { breadcrumbName: 'Employee' } ]}>
            <ListPage
                filterForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                actionBar={mixinFuncs.renderActionBar()}
                title="Employee"
                description="Add and edit employee here."
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

export default EmployeeListPage;
