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

const UserAdminForm = (props) => {
    const { formId, actions, dataDetail, onSubmit, setIsChangedFormValues, groups, branchs, isEditing, groupData } =
        props;
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);
    const [ imageUrl, setImageUrl ] = useState(null);
    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });

    const uploadFile = (file, onSuccess, onError) => {
        executeUpFile({
            data: {
                type: 'AVATAR',
                file: file,
            },
            onCompleted: (response) => {
                if (response.result === true) {
                    onSuccess();
                    setImageUrl(response.data.filePath);
                }
            },
            onError: (error) => {
                onError();
            },
        });
    };

    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({ ...values, avatar: imageUrl });
    };

    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
            username: dataDetail.account?.username,
            fullName: dataDetail.account?.fullName,
            email: dataDetail.account?.email,
            phone: dataDetail.account?.phone,
            birthday: dayjs(dataDetail.birthday || '01/01/2001', DATE_INPUT_FORMAT),
        });
        setImageUrl(dataDetail.account?.avatar);
    }, [ dataDetail ]);

    return (
        <Form
            style={{ width: '70%' }}
            id={formId}
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
            onValuesChange={onValuesChange}
        >
            <Card className="card-form" bordered={false}>
                <Row gutter={16}>
                    <Col span={12}>
                        <CropImageField
                            label="Ảnh"
                            name="avatar"
                            imageUrl={imageUrl && `${AppConstants.contentRootUrl}${imageUrl}`}
                            aspect={1 / 1}
                            uploadFile={uploadFile}
                        />
                    </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField required label="Tên tài khoản" name="username" />
                    </Col>
                    <Col span={12}>
                        <TextField label="Họ và tên" required name="fullName" />
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
                                            if (value.length < 6) {
                                                throw new Error('Password must be at least 6 characters');
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

                <Row gutter={16}>
                    <Col span={12}>
                        <TextField required label="Email" name="email" type="email" />
                    </Col>
                    <Col span={12}>
                        <TextField required label="Số điện thoại" name="phone" type="number" />
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <DropdownField required label="Giới tính" name="gender" options={genderOptions} />
                    </Col>
                    <Col span={12}>
                        <DatePickerField
                            fieldProps={{ style: { width: '100%' } }}
                            required
                            format="DD/MM/YYYY"
                            label="Ngày sinh"
                            name="birthday"
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    {/* <Col span={12}>
                        <DropdownField
                            disabled={isEditing}
                            options={groupData}
                            required
                            label="Group"
                            name={[ 'group', 'id' ]}
                        />
                    </Col> */}
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

export default UserAdminForm;
