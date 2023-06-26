import BaseTable from '@components/common/table/BaseTable';
import { DATE_DISPLAY_FORMAT, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import { formatDateString } from '@utils';
import { Button, ConfigProvider, Row } from 'antd';
import React, { useState } from 'react';

import { CheckOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import useFetch from '@hooks/useFetch';

import styles from './index.module.scss';
import ListPage from '@components/common/layout/ListPage';
import { gameCategories } from '@constants/masterData';

function SelectGames({ title, onSelected, description, excludeIds }) {
    const { game } = useParams();
    const [ selectedRows, setSelectedRows ] = useState([]);
    const { loading: getCategoriesLoading } = useFetch(apiConfig.category.getList, {
        immediate: true,
        mappingData: (response) => response.data,
    });

    const { data, loading, mixinFuncs, pagination, changePagination } = useListBase({
        apiConfig: {
            getList: {
                ...apiConfig.game.getList,
                baseURL: apiConfig.game.getList.baseURL + `?type=${gameCategories[game].type}`,
            },
            delete: apiConfig.game.delete,
        },
        options: {
            objectName: 'game',
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
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
            title: 'Game Set',
            render: (dataRow) => {
                const { title } = mixinFuncs.filterLanguage(dataRow.info);
                // const title = dataRow.title;
                return <span>{title}</span>;
            },
        },
        {
            title: 'Created At',
            dataIndex: [ 'createdAt' ],
            width: 200,
            render: (dataRow) => {
                return <span>{formatDateString(dataRow, DATE_DISPLAY_FORMAT)}</span>;
            },
        },
    ];

    return (
        <ListPage
            title={title}
            description={description}
            className={styles.quizListPage}
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
                        onClick={() => onSelected(selectedRows)}
                        icon={<CheckOutlined />}
                        type="primary"
                        style={{ padding: '0 30px' }}
                    >
                        Select
                    </Button>
                </Row>
            </ConfigProvider>
        </ListPage>
    );
}

export default SelectGames;
