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
import routes from '@routes';
import { EyeOutlined } from '@ant-design/icons';
import { Link, generatePath, useParams } from 'react-router-dom';
const AddressListPage = () => {
    const { customerId } = useParams();
    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.addressCustomer,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: `Customer's Address`,
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
            funcs.getList = () => {
                if (!mixinFuncs.hasPermission('read')) return;

                const params = mixinFuncs.prepareGetListParams(queryFilter);

                mixinFuncs.handleFetchList({ ...params, customerId });
            };
            funcs.additionalActionColumnButtons = () => {
                return {
                    view: ({ buttonProps, ...dataRow }) => {
                        return (
                            <Link
                                to={generatePath(routes.addressSavePage.path, {
                                    customerId,
                                    id: dataRow.id,
                                })}
                            >
                                <Button {...buttonProps} type="link" style={{ padding: 0 }}>
                                    <EyeOutlined />
                                </Button>
                            </Link>
                        );
                    },
                };
            };
        },
    });

    const columns = [
        { title: 'Receiver full name', dataIndex: 'receiverFullName' },
        {
            title: 'Address',
            dataIndex: 'province',
            render: (text, record) => (
                <span>{`${record.addressDetails}, ${record.ward}, ${record.district}, ${text}`}</span>
            ),
        },
        mixinFuncs.renderActionColumn({ view: true }, { width: '90px' }),
    ];

    const searchFields = [
        {
            key: 'addressDetails',
            placeholder: 'Address',
        },
    ];

    return (
        <PageWrapper
            routes={[
                { breadcrumbName: 'Home', path: '/' },
                { breadcrumbName: `Customer`, path: routes.customerListPage.path },
                { breadcrumbName: `Customer's Address` },
            ]}
        >
            <ListPage
                filterForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                // actionBar={mixinFuncs.renderActionBar()}
                title="Customer's Address"
                description="View Customer's Address here."
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

export default AddressListPage;
