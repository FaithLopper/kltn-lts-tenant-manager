import BaseTable from '@components/common/table/BaseTable';
import { DATE_DISPLAY_FORMAT } from '@constants';
import apiConfig from '@constants/apiConfig';
import { filterBaseOption, filterDateOption, statusOptions } from '@constants/masterData';
import useListBase from '@hooks/useListBase';
import useTranslate from '@hooks/useTranslate';
import { formatDateString } from '@utils';
import { Button, ConfigProvider, Row, Space, Tag } from 'antd';
import React, { useState } from 'react';

import { CheckOutlined } from '@ant-design/icons';
import useFetch from '@hooks/useFetch';

import styles from './SelectInfographics.module.scss';
import SelectField from '@components/common/form/SelectField';
import InputTextField from '@components/common/form/InputTextField';
import FilterForm from '@components/common/form/entry/FilterForm';
import DateFilter from '@components/common/form/entry/DateFilter';
import ListPage from '@components/common/layout/ListPage';

function SelectInfographics({ title, onSelected, description, excludeIds }) {
    const translate = useTranslate();
    const [ selectedRows, setSelectedRows ] = useState();
    const { loading: getCategoriesLoading, data: categories } = useFetch(apiConfig.category.getList, {
        immediate: true,
        mappingData: (response) => response.data,
    });

    const { data, loading, mixinFuncs, pagination, changePagination } = useListBase({
        apiConfig: apiConfig.mediaLibrary.infographics,
        options: {
            objectName: 'infographic',
            pageSize: 5,
        },
        override: (funcs) => {
            funcs.mappingData = (response) => ({
                data: response.data.result,
                total: response.data.total,
            });

            const onDelelteItemCompleted = funcs.onDelelteItemCompleted;
            funcs.onDelelteItemCompleted = (id) => {
                onDelelteItemCompleted(id);
                setSelectedRows([]);
            };
        },
    });

    // console.log(mixinFuncs.formatQueryStringToObject(decodeURI(location.search), [ 'status', 'title', 'createdAt' ]));

    const rowSelection = {
        onChange: (_, selectedRows) => {
            setSelectedRows(...selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: excludeIds?.includes(record.id),
        }),
    };

    const columns = [
        {
            title: 'Thumbnail',
            dataIndex: [ 'info' ],
            render: (dataRow) => {
                const { thumbnailUrl } = mixinFuncs.filterLanguage(dataRow);
                return <img style={{ width: 80 }} src={thumbnailUrl} />;
            },
        },
        {
            title: 'Title',
            render: (dataRow) => {
                const { title } = mixinFuncs.filterLanguage(dataRow.info);
                return <span>{title}</span>;
            },
        },
        {
            title: 'Categories',
            dataIndex: [ 'categories' ],
            render: (dataRow) => {
                return (
                    <Space size="small" wrap>
                        {dataRow.map(
                            (item, index) =>
                                categories && (
                                    <Tag color="#3366CC" key={index}>
                                        {
                                            mixinFuncs.filterLanguage(
                                                categories.find((c) => {
                                                    if (c.id == item) {
                                                        return true;
                                                    }
                                                })?.info,
                                            )?.name
                                        }
                                    </Tag>
                                ),
                        )}
                    </Space>
                );
            },
        },
        {
            title: 'Focus Areas',
            dataIndex: 'focusAreas',
        },
        {
            title: 'Created At',
            dataIndex: [ 'createdAt' ],
            render: (dataRow) => {
                return <span>{formatDateString(dataRow, DATE_DISPLAY_FORMAT)}</span>;
            },
        },
        {
            title: 'Status',
            dataIndex: [ 'status' ],
            render: (dataRow) => {
                const status = translate.formatKeys(statusOptions, [ 'label' ]).find((item) => item.value == dataRow);

                return <Tag color={status.color}>{status.label}</Tag>;
            },
        },
    ];

    const filterItems = [
        {
            label: 'Status',
            name: 'status',
            ValueComponent: (props) => (
                <SelectField
                    {...props}
                    fieldProps={{ style: { width: 155 } }}
                    allowClear={false}
                    showSearch={false}
                    initialValue={translate.formatKeys(statusOptions, 'label')[0].value}
                    options={translate.formatKeys(statusOptions, 'label')}
                />
            ),
        },
        {
            label: 'Title',
            name: 'title',
            compareTypeOptions: translate.formatKeys(filterBaseOption, 'label'),
            ValueComponent: (props) => (
                <InputTextField
                    {...props}
                    inputProps={{
                        style: {
                            width: 322,
                        },
                    }}
                />
            ),
        },
        {
            label: 'Created At',
            name: 'createdAt',
            compareTypeOptions: translate.formatKeys(filterDateOption, 'label'),
            ValueComponent: DateFilter,
        },
    ];

    return (
        <ListPage
            title={title}
            description={description}
            className={styles.videoListPage}
            filterForm={
                <FilterForm
                    filters={filterItems}
                    onResetFilter={() => mixinFuncs.changeFilter({})}
                    onApplyFilter={(filter) => {
                        mixinFuncs.changeFilter(filter);
                    }}
                />
            }
            table={
                <BaseTable
                    rowSelection={{
                        type: 'radio',
                        ...rowSelection,
                    }}
                    onChange={changePagination}
                    pagination={pagination}
                    loading={loading || getCategoriesLoading}
                    dataSource={data}
                    columns={columns}
                />
            }
        >
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#F69600',
                    },
                }}
            >
                <Row justify="end" style={{ marginTop: 20 }}>
                    <Button
                        icon={<CheckOutlined />}
                        type="primary"
                        style={{ padding: '0 30px' }}
                        onClick={() => onSelected(selectedRows)}
                    >
                        Select
                    </Button>
                </Row>
            </ConfigProvider>
        </ListPage>
    );
}

export default SelectInfographics;
