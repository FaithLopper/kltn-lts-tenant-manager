import BaseTable from '@components/common/table/BaseTable';
import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import React from 'react';

import ListPage from '@components/common/layout/ListPage';
import PageWrapper from '@components/common/layout/PageWrapper';
import { DEFAULT_TABLE_ITEM_SIZE } from '@constants';
const GroupPermissionListPage = () => {
    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.groupPermission,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: 'nhóm quyền',
            // customParams : {
            //     kind: 1,
            // },
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
        { title: 'Tên nhóm quyền', dataIndex: 'name', width: 300 },
        { title: 'Mô tả', dataIndex: 'description' },
        mixinFuncs.renderActionColumn({ edit: true, delete: false }, { width: '120px' }),
    ];

    const searchFields = [
        {
            key: 'name',
            placeholder: 'Tên nhóm quyền',
        },
    ];

    return (
        <PageWrapper routes={[ { breadcrumbName: 'Trang Chủ', path: '/' }, { breadcrumbName: 'Nhóm quyền' } ]}>
            <ListPage
                filterForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                title="Quản lý nhóm quyền"
                description="Thêm và tùy chỉnh các quyền cho từng loại nhóm người dùng"
                // actionBar={mixinFuncs.renderActionBar()}
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

export default GroupPermissionListPage;
