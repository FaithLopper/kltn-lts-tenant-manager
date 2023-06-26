import PageWrapper from '@components/common/layout/PageWrapper';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import useSaveBase from '@hooks/useSaveBase';
import React from 'react';
import ProfileForm from './ProfileForm';
import useNotification from '@hooks/useNotification';
import { defineMessage, useIntl } from 'react-intl';
import useFetchAction from '@hooks/useFetchAction';
import { accountActions } from '@store/actions';
const message = defineMessage({
    response: {
        create: {
            id: 'hook.useSaveBase.response.success',
            defaultMessage: 'Create {objectName} success',
        },
        update: {
            id: 'hook.useSaveBase.response.success',
            defaultMessage: 'Update {objectName} success',
        },
        error: {
            id: 'hook.useSaveBase.deleteConfirm.ok',
            defaultMessage: 'Yes',
        },
    },
});
const ProfilePage = () => {
    const notification = useNotification();
    const intl = useIntl();
    const { data, loading } = useFetch(apiConfig.account.getProfile, {
        immediate: true,
        mappingData: (res) => res.data,
    });
    const { execute: executeGetProfile, isLoading } = useFetchAction(accountActions.getProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });
    const { mixinFuncs, onSave, setIsChangedFormValues, isEditing } = useSaveBase({
        options: {
            // getListUrl: `/`,
            objectName: 'profile',
        },
        apiConfig: {
            update: apiConfig.account.updateProfile,
        },
        override: (funcs) => {
            funcs.onUpdateCompleted = (responseData) => {
                if (responseData.statusCode === 200 || responseData.result) {
                    notification({
                        message: intl.formatMessage(message.response.update, {
                            objectName: 'profile',
                        }),
                    });
                    executeGetProfile();
                }
            };
        },
    });

    return (
        <PageWrapper
            loading={loading}
            routes={[ { breadcrumbName: 'Home', path: `/` }, { breadcrumbName: 'Profile' } ]}
            title="Profile"
        >
            <ProfileForm
                setIsChangedFormValues={setIsChangedFormValues}
                dataDetail={data ? data : {}}
                formId={mixinFuncs.getFormId()}
                isEditing={isEditing}
                actions={mixinFuncs.renderActions()}
                onSubmit={onSave}
            />
        </PageWrapper>
    );
};

export default ProfilePage;
