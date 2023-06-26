import TextField from '@components/common/form/TextField';
import { Button, Card, Col, Divider, Form, Row } from 'antd';
import React, { useEffect } from 'react';
import useBasicForm from '@hooks/useBasicForm';
import { useNavigate } from 'react-router-dom';
import CropImageField from '@components/common/form/CropImageField';
import { FormattedMessage } from 'react-intl';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { useState } from 'react';
import { AppConstants } from '@constants';

const ProfileForm = (props) => {
    const { formId, dataDetail, onSubmit, setIsChangedFormValues, actions } = props;
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);
    const [ avatarUrl, setAvatarUrl ] = useState(null);
    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
            fullName: dataDetail.fullName,
            username: dataDetail.username,
        });
        setAvatarUrl(dataDetail.avatar);
    }, [ dataDetail ]);
    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });

    const uploadFile = (file, onSuccess, onError, setImageUrl) => {
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

    const handleFinish = (values) => {
        mixinFuncs.handleSubmit({
            fullName: values.fullName,
            oldPassword: values.oldPassword,
            password: values.password,
            avatar: avatarUrl,
        });
        form.resetFields([ 'password' ]);
    };

    return (
        <Form
            style={{ width: '70%' }}
            id={formId}
            onFinish={handleFinish}
            form={form}
            layout="vertical"
            onValuesChange={onValuesChange}
        >
            <Card className="card-form" bordered={false}>
                <Row gutter={[ 16, 0 ]}>
                    <CropImageField
                        label={<FormattedMessage defaultMessage="Avatar" />}
                        name="avatar"
                        imageUrl={avatarUrl && `${AppConstants.contentRootUrl}${avatarUrl}`}
                        aspect={1 / 1}
                        uploadFile={(...args) => uploadFile(...args, setAvatarUrl)}
                        showUploadList={false}
                    />
                </Row>
                <Divider />
                <Row gutter={[ 16, 0 ]}>
                    <Col span={12}>
                        <TextField name="username" label="Tên tài khoản" disabled />
                    </Col>
                    <Col span={12}>
                        <TextField required name="fullName" label="Họ và tên" />
                    </Col>
                </Row>
                <Row gutter={[ 16, 0 ]}>
                    <Col span={12}>
                        <TextField type="password" label="Mật khẩu hiện tại" required name="oldPassword" />
                    </Col>
                </Row>
                <Divider />
                <Row gutter={[ 16, 0 ]}>
                    <Col span={12}>
                        <TextField
                            type="password"
                            label="Mật khẩu mới"
                            name="password"
                            rules={[
                                {
                                    validator: async () => {
                                        const isTouched = form.isFieldTouched('newPassword');
                                        if (isTouched) {
                                            const value = form.getFieldValue('newPassword');
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
                            type="password"
                            label="Xác nhận mật khẩu mới"
                            rules={[
                                {
                                    validator: async () => {
                                        const password = form.getFieldValue('newPassword');
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

                {actions}
            </Card>
        </Form>
    );
};

export default ProfileForm;
