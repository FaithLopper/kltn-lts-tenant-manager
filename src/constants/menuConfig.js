import React from 'react';
import { ApartmentOutlined, UsergroupAddOutlined, ControlOutlined } from '@ant-design/icons';
import routes from '@routes';
import { FormattedMessage } from 'react-intl';

const navMenuConfig = [
    {
        label: <FormattedMessage defaultMessage="Quản lý tài khoản" />,
        key: 'user-management',
        icon: <UsergroupAddOutlined />,
        children: [
            {
                label: <FormattedMessage defaultMessage="Quản trị viên hệ thống" />,
                key: 'admin_system',
                path: routes.adminsListPage.path,
            },
            {
                label: <FormattedMessage defaultMessage="Quản trị viên cửa hàng" />,
                key: 'admin_shop',
                path: routes.adminsShopListPage.path,
            },
            {
                label: <FormattedMessage defaultMessage="Khách hàng" />,
                key: 'customer',
                path: routes.customerListPage.path,
            },
            // {
            //     label: <FormattedMessage defaultMessage="Nhân viên" />,
            //     key: 'employee',
            //     path: routes.employeeListPage.path,
            // },
        ],
    },
    {
        label: <FormattedMessage defaultMessage="Hệ thống" />,
        key: 'system-management',
        icon: <ControlOutlined />,
        children: [
            {
                label: <FormattedMessage defaultMessage="Nhóm quyền" />,
                key: 'role',
                path: routes.groupPermissionPage.path,
            },
        ],
    },
    {
        label: <FormattedMessage defaultMessage="Quản lý Tenant" />,
        key: 'tenant-management',
        icon: <ApartmentOutlined />,
        children: [
            {
                label: <FormattedMessage defaultMessage="Tenant" />,
                key: 'tenant',
                path: routes.tenantListPage.path,
            },
        ],
    },
];

export default navMenuConfig;
