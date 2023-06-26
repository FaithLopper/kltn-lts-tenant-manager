import { Card, Col, Divider, Form, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import useBasicForm from '@hooks/useBasicForm';
import TextField from '@components/common/form/TextField';
import CropImageField from '@components/common/form/CropImageField';
import { AppConstants, DATE_INPUT_FORMAT, MALE, STATUS_ACTIVE, UserTypes } from '@constants';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import DropdownField from '@components/common/form/DropdownField';
import { commonStatus, genderOptions } from '@constants/masterData';
import DatePickerField from '@components/common/form/DatePickerField';
import { convertStringToDateTime } from '@utils';
import dayjs from 'dayjs';

const AddressForm = (props) => {
    const { formId, actions, dataDetail, onSubmit, setIsChangedFormValues, isEditing } = props;
    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });

    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
        });
    }, [ dataDetail ]);

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
                    <Col span={12}>
                        <TextField readOnly label="Receiver full name" name="receiverFullName" />
                    </Col>
                    <Col span={12}>
                        <TextField label="Phone" readOnly name="phone" />
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <TextField readOnly label="Province" name="province" />
                    </Col>
                    <Col span={8}>
                        <TextField label="District" readOnly name="district" />
                    </Col>
                    <Col span={8}>
                        <TextField label="Ward" readOnly name="ward" />
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <TextField label="Address details" readOnly name="addressDetails" />
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <TextField
                            label="Note"
                            readOnly
                            name="note"
                            type="textarea"
                            style={{
                                height: 180,
                            }}
                        />
                    </Col>
                </Row>
            </Card>
        </Form>
    );
};

export default AddressForm;
