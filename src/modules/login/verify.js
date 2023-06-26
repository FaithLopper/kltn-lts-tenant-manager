import React, { useEffect, useState } from 'react';
import useAuth from '@hooks/useAuth';
import { accountActions } from '@store/actions';
import { setCacheToken } from '@services/userService';
import useQueryParams from '@hooks/useQueryParams';
import useFetchAction from '@hooks/useFetchAction';
const VerifyPage = () => {
    const { params: queryParams, setQueryParams } = useQueryParams();
    const { profile } = useAuth();
    const { execute: executeGetProfile } = useFetchAction(accountActions.getProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });

    useEffect(() => {
        if (queryParams.get('accessToken') && queryParams.get('refreshToken')) {
            setCacheToken(queryParams.get('accessToken'), queryParams.get('refreshToken'));
            executeGetProfile();
        }
    }, []);

    return <></>;
};

export default VerifyPage;
