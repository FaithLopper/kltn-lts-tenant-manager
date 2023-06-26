import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import { Avatar, Button, Tag } from 'antd';
import React from 'react';
import BaseTable from '@components/common/table/BaseTable';
import { DeleteOutlined, LockOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { AppConstants, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import PageWrapper from '@components/common/layout/PageWrapper';
import ListPage from '@components/common/layout/ListPage';
import { FieldTypes } from '@constants/formConfig';
import { commonStatus } from '@constants/masterData';
import useAuth from '@hooks/useAuth';
const UserAdminListPage = () => {
    const { profile } = useAuth();
    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.user,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: 'quản trị viên',
            customParams: {
                kind: 5,
            },
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
                    deleteAdmin: ({ buttonProps, ...dataRow }) => {
                        if(dataRow.username !== profile.username && dataRow.id !== profile.id)
                            return (
                                <Button
                                    {...buttonProps}
                                    type="link"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        mixinFuncs.showDeleteItemConfirm(dataRow.id);
                                    }}
                                    style={{ padding: 0 }}
                                >
                                    <DeleteOutlined />
                                </Button>
                            );
                        return <></>;
                    },
                };
            };
        },
    });

    const columns = [
        {
            title: '#',
            dataIndex: 'avatar',
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
        { title: 'Tên tài khoản', dataIndex: 'username' },
        { title: 'Họ và tên', dataIndex: 'fullName' },
        { title: 'SĐT', dataIndex: 'phone', width: '130px' },
        {
            title: 'Nhóm quyền',
            dataIndex: 'group',
            width: '250px',
            render: (group) => (
                <Tag color="#108ee9">
                    <div style={{ padding: '0 4px', fontSize: 14 }}>{group?.name}</div>
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
        mixinFuncs.renderActionColumn({ edit: true, delete: false, deleteAdmin: true }, { width: '90px' }),
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
        <PageWrapper routes={[ { breadcrumbName: 'Trang chủ' }, { breadcrumbName: 'Quản trị viên' } ]}>
            <ListPage
                filterForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                actionBar={mixinFuncs.renderActionBar()}
                title="Quản lý quản trị viên"
                description="Tạo mới và tùy chỉnh thông tin quản trị viên."
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

export default UserAdminListPage;
