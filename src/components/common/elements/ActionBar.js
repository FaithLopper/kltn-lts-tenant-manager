import { Button, Col, Modal, Row } from 'antd';
import React from 'react';
import { defineMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import styles from './ActionBar.module.scss';

const message = defineMessage({
    create: {
        id: 'components.common.elements.actionBar.create',
        defaultMessage: 'Tạo mới {objectName}',
    },
    bulkDelete: {
        title: {
            id: 'components.common.elements.actionBar.bulkDelete.title',
            defaultMessage: 'Bạn có chắc muốn xóa {objectName}?',
        },
        okText: {
            id: 'components.common.elements.actionBar.bulkDelete.okText',
            defaultMessage: 'Có',
        },
        noText: {
            id: 'components.common.elements.actionBar.bulkDelete.noText',
            defaultMessage: 'Không',
        },
    },
});

function ActionBar({ createLink, selectedRows = [], onBulkDelete, objectName ,location , type, style }) {
    const intl = useIntl();
    const onBulkDeleteButtonClick = () => {
        Modal.confirm({
            title: intl.formatMessage(message.bulkDelete.title, { objectName }),
            centered: true,
            okText: intl.formatMessage(message.bulkDelete.okText),
            okType: 'danger',
            cancelText: intl.formatMessage(message.bulkDelete.noText),
            onOk: () => {
                onBulkDelete();
            },
        });
    };

    return (
        <Row justify="space-between" className={styles.actionBar}>
            <Col>
                {selectedRows.length > 0 && (
                    <Button icon={<DeleteOutlined />} onClick={onBulkDeleteButtonClick}>
                        Delete selected ({selectedRows.length})
                    </Button>
                )}
            </Col>
            <Col>
                <Link to={createLink} state={{ action: 'create', prevPath: location.pathname }}>
                    <Button shape='round' type="primary" ghost style={style}>
                        <PlusOutlined /> {intl.formatMessage(message.create, { objectName })}
                    </Button>
                </Link>
            </Col>
        </Row>
    );
}

export default ActionBar;
