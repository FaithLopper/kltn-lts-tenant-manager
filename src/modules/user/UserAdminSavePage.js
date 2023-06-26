import PageWrapper from '@components/common/layout/PageWrapper';
import { STATUS_ACTIVE, UserTypes } from '@constants';
import apiConfig from '@constants/apiConfig';
import useSaveBase from '@hooks/useSaveBase';
import React from 'react';
import { useParams } from 'react-router-dom';
import UserAdminForm from './UserAdminForm';
import useFetch from '@hooks/useFetch';

const UserAdminSavePage = () => {
    const { id } = useParams();
    const { data: groupKindPermissionData } = useFetch(apiConfig.groupPermission.getGroupListCombobox, {
        immediate: true,
        params: { kind: UserTypes.SYS_ADMIN },
        mappingData: (res) => res.data?.data?.map((item) => ({ label: item.name, value: item.id })),
    });
    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getDetail: apiConfig.user.getById,
            create: apiConfig.user.create,
            update: apiConfig.user.update,
        },
        options: {
            getListUrl: `/admins`,
            objectName: 'quản trị viên',
        },
        override: (funcs) => {
            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                    avatarPath: data.avatar,
                    id: id,
                };
            };
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                    avatarPath: data.avatar,
                    groupId: data.group.id,
                };
            };

            funcs.mappingData = (data) => {
                return {
                    ...data.data,
                };
            };
        },
    });

    return (
        <PageWrapper
            title={title}
            loading={loading}
            routes={[
                { breadcrumbName: 'Home' },
                { breadcrumbName: 'Quản trị viên', path: `/admins` },
                { breadcrumbName: title },
            ]}
        >
            <UserAdminForm
                setIsChangedFormValues={setIsChangedFormValues}
                dataDetail={detail ? detail : {}}
                formId={mixinFuncs.getFormId()}
                isEditing={isEditing}
                actions={mixinFuncs.renderActions()}
                onSubmit={onSave}
                groupData={groupKindPermissionData || []}
            />
        </PageWrapper>
    );
};

export default UserAdminSavePage;
