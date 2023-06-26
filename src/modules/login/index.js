import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Alert, Button, Form, InputNumber } from 'antd';

import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';

import useBasicForm from '@hooks/useBasicForm';
import InputTextField from '@components/common/form/InputTextField';

import styles from './index.module.scss';

import logo from '@assets/images/logo-white-bg.png';
// import { setCacheAccessToken, setCacheToken } from '@services/userService';
import { validateUsernameForm } from '@utils';
import { showErrorMessage } from '@services/notifyService';
import { setCacheAccessToken } from '@services/userService';
import useFetchAction from '@hooks/useFetchAction';
import { accountActions } from '@store/actions';

const message = defineMessages({
    username: 'Username',
    password: 'Password',
    login: 'Login',
    email: 'Email',
    errorEmail: 'Wrong email, please try again !',
    errorOTP: 'Wrong OTP, please try again !',
    otp: 'OTP',
    verify: 'Verify',
});

const LoginPage = () => {
    const intl = useIntl();
    const { form, mixinFuncs } = useBasicForm();
    const { execute, loading } = useFetch(apiConfig.account.login, {});
    const { execute: executeGetProfile, isLoading } = useFetchAction(accountActions.getProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });
    const [ error, setError ] = useState(false);

    const onFinish = (values) => {
        execute({
            data: {
                username: values?.username,
                password: values?.password,
                app: 'APP_WEB_TENANT_MANAGER',
            },
            onCompleted: (res) => {
                const { result, data } = res;
                if (result && data) {
                    setCacheAccessToken(data.token);
                    executeGetProfile({
                        params: { token: data.token },
                    });
                }
            },
            onError: ({ message }) => {
                showErrorMessage(message);
            },
        });
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginForm}>
                <Form
                    name="login-form"
                    onFinish={onFinish}
                    form={form}
                    layout="horizontal"
                    onValuesChange={() => setError(null)}
                    // labelCol={{ flex: '72px' }}
                    labelAlign="left"
                    labelWrap
                    colon={false}
                >
                    <Form.Item label=" ">
                        <div className={styles.loginWrapper}>
                            <img src={logo} alt="company-logo" className={styles.loginLogo} />
                        </div>
                    </Form.Item>
                    <InputTextField
                        name="username"
                        placeholder={intl.formatMessage(message.email)}
                        size="large"
                        rules={[
                            { required: true, message: 'Hãy nhập tên đăng nhập!' },
                            { validator: validateUsernameForm },
                        ]}
                    />
                    <InputTextField
                        name="password"
                        placeholder={intl.formatMessage(message.password)}
                        size="large"
                        type="password"
                        rules={[ { required: true, message: 'Hãy nhập tên mật khẩu!' } ]}
                    />
                    {error && (
                        <Form.Item label=" ">
                            <Alert message={error} type="error" showIcon />
                        </Form.Item>
                    )}
                    <Form.Item>
                        <Button type="primary" size="large" loading={loading} htmlType="submit" block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
