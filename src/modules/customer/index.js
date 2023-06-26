import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import { Avatar, Button, Tag } from 'antd';
import React from 'react';
import BaseTable from '@components/common/table/BaseTable';

import { UserOutlined } from '@ant-design/icons';
import { AppConstants, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import PageWrapper from '@components/common/layout/PageWrapper';
import ListPage from '@components/common/layout/ListPage';
import { FieldTypes } from '@constants/formConfig';
import { commonStatus } from '@constants/masterData';
import { Link, generatePath } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import routes from '@routes';
const CustomerListPage = () => {
    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.customer,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: 'khách hàng',
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
            funcs.additionalActionColumnButtons = () => {
                return {
                    address: ({ buttonProps, ...dataRow }) => {
                        return (
                            <Link to={generatePath(routes.addressListPage.path, { customerId: dataRow.id })}>
                                <Button {...buttonProps} type="link" style={{ padding: 0 }}>
                                    <HomeOutlined />
                                </Button>
                            </Link>
                        );
                    },
                };
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
        { title: 'Tên tài khoản', dataIndex: [ 'account', 'username' ] },
        { title: 'Họ và tên', dataIndex: [ 'account', 'fullName' ] },
        { title: 'SĐT', dataIndex: [ 'account', 'phone' ], width: '130px' },
        {
            title: 'Nhóm quyền',
            dataIndex: [ 'account', 'group' ],
            width: '200px',
            render: (group) => (
                <Tag color="#108ee9">
                    <div style={{ padding: '0 4px', fontSize: 14 }}>{group?.name}</div>
                </Tag>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: [ 'account', 'createdDate' ],
            width: '180px',
            // render: (createdDate) => convertUtcToTimezone(createdDate),
        },
        mixinFuncs.renderStatusColumn({ width: '90px', dataIndex: [ 'account', 'status' ] }),
        mixinFuncs.renderActionColumn({ edit: true, delete: false, address: true }, { width: '150px' }),
    ];

    const searchFields = [
        {
            key: 'username',
            placeholder: 'Tên tài khoản',
        },
        {
            key: 'fullName',
            placeholder: 'Họ và tên',
        },
        {
            key: 'status',
            type: FieldTypes.SELECT,
            options: commonStatus,
            placeholder: 'Trạng thái',
        },
    ];

    return (
        <PageWrapper routes={[ { breadcrumbName: 'Trang chủ', path: '/' }, { breadcrumbName: 'Khách hàng' } ]}>
            <ListPage
                filterForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                // actionBar={mixinFuncs.renderActionBar()}
                title="Quản lý khách hàng"
                description="Tạo mới hoặc tùy chỉnh thông tin khách hàng."
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

export default CustomerListPage;
