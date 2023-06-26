import { Card, Col, Divider, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import useBasicForm from '@hooks/useBasicForm';
import TextField from '@components/common/form/TextField';
import CropImageField from '@components/common/form/CropImageField';
import {
    AppConstants,
    DATABASE_PLACE_EXTERNAL,
    DATABASE_PLACE_INTERNAL,
    DATABASE_PLACE_OPTIONS,
    STATUS_ACTIVE,
    UserTypes,
    domainName,
    hostName,
} from '@constants';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import DropdownField from '@components/common/form/DropdownField';
import { commonStatus, statusOptions } from '@constants/masterData';
import useTranslate from '@hooks/useTranslate';
import { validateStringPath } from '@utils';

const TenantForm = (props) => {
    const { formId, actions, dataDetail, onSubmit, setIsChangedFormValues, groups, branchs, isEditing, groupData } =
        props;
    const [ dbOption, setDbOption ] = useState(null);
    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });

    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
            status: dataDetail.status?.toString(),
        });
    }, [ dataDetail ]);

    const validateString = (rule, value, callback) => {
        const pattern = /^[A-Za-z0-9_-]+$/;
        if (value && !pattern.test(value)) {
            callback('Chuỗi không hợp lệ');
        } else {
            callback();
        }
    };

    return (
        <Form
            style={{ width: '70%' }}
            id={formId}
            onFinish={mixinFuncs.handleSubmit}
            form={form}
            layout="vertical"
            onValuesChange={onValuesChange}
        >
            <Card className="card-form" bordered={false}>
                <Row gutter={16}>
                    {/* <Col span={12}>
                        <TextField disabled label="User name" name="username" />
                    </Col> */}
                    <Col span={12}>
                        <TextField disabled={isEditing} label="ID" required name="id" />
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="path"
                            label="Path"
                            rules={[
                                { required: true, message: 'Vui lòng nhập chuỗi' },
                                { validator: validateString },
                            ]}
                        >
                            <Input addonBefore={hostName} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <TextField
                            label="Mật khẩu"
                            required={!isEditing}
                            name="password"
                            type="password"
                            rules={[
                                {
                                    validator: async () => {
                                        const isTouched = form.isFieldTouched('password');
                                        if (isTouched) {
                                            const value = form.getFieldValue('password');
                                            if (value.length < 8) {
                                                throw new Error('Password must be at least 8 characters');
                                            }
                                        }
                                    },
                                },
                            ]}
                        />
                    </Col>
                    <Col span={12}>
                        <TextField
                            label="Xác nhận mật khẩu"
                            required={!isEditing}
                            name="confirmPassword"
                            type="password"
                            rules={[
                                {
                                    validator: async () => {
                                        const password = form.getFieldValue('password');
                                        const confirmPassword = form.getFieldValue('confirmPassword');
                                        if (password !== confirmPassword) {
                                            throw new Error('Password does not match');
                                        }
                                    },
                                },
                            ]}
                        />
                    </Col>
                </Row>
                {!isEditing && (
                    <Row gutter={16}>
                        <Col span={12}>
                            <TextField label="Email" required name="email" type="email" />
                        </Col>
                        <Col span={12}>
                            <TextField label="Số điện thoại" required name="phone" type="number" />
                        </Col>
                    </Row>
                )}

                <Row gutter={16}>
                    <Col span={12}>
                        <DropdownField
                            disabled
                            options={DATABASE_PLACE_OPTIONS}
                            initialValue={DATABASE_PLACE_INTERNAL}
                            defaultValue={DATABASE_PLACE_INTERNAL}
                            required
                            label="Loại Database"
                            name="dbPlace"
                            onChange={(value) => {
                                setDbOption(value);
                            }}
                        />
                    </Col>
                </Row>

                <Divider />

                <Row gutter={16}>
                    <Col span={12}>
                        <TextField label="Connection Timeout" name="connectionTimeout" type="number" />
                    </Col>
                    <Col span={12}>
                        <TextField label="Idle Timeout" name="idleTimeout" type="number" />
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <TextField label="Maximum Pool Size" name="maximunPoolSize" type="number" />
                    </Col>
                    <Col span={12}>
                        <TextField label="Minimum Idle" name="minimumIdle" type="number" />
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <DropdownField
                            defaultValue={STATUS_ACTIVE.toString()}
                            options={commonStatus}
                            label="Trạng thái"
                            name="status"
                        />
                    </Col>
                </Row>
                <div className="footer-card-form">{actions}</div>
            </Card>
        </Form>
    );
};

export default TenantForm;
