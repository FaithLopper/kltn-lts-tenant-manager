import PageWrapper from '@components/common/layout/PageWrapper';
import { DATE_DISPLAY_FORMAT, DATE_INPUT_FORMAT, STATUS_ACTIVE, UserTypes } from '@constants';
import apiConfig from '@constants/apiConfig';
import useSaveBase from '@hooks/useSaveBase';
import React from 'react';
import { useParams } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import useFetch from '@hooks/useFetch';
import { formatDateString } from '@utils';

const CustomerSavePage = () => {
    const { id } = useParams();
    const { data: groupKindPermissionData } = useFetch(apiConfig.groupPermission.getGroupListCombobox, {
        immediate: true,
        params: { kind: UserTypes.CUSTOMER },
        mappingData: (res) => res.data?.data?.map((item) => ({ label: item.name, value: item.id })),
    });
    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getDetail: apiConfig.customer.getById,
            create: apiConfig.customer.create,
            update: apiConfig.customer.update,
        },
        options: {
            getListUrl: `/customer`,
            objectName: 'khách hàng',
        },
        override: (funcs) => {
            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                    birthday: formatDateString(data.birthday, DATE_INPUT_FORMAT),
                    id: id,
                };
            };
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                    birthday: formatDateString(data.birthday, DATE_INPUT_FORMAT),
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
            loading={loading}
            title={title}
            routes={[
                { breadcrumbName: 'Trang chủ', path: '/' },
                { breadcrumbName: 'Khách hàng', path: `/customer` },
                { breadcrumbName: title },
            ]}
        >
            <CustomerForm
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

export default CustomerSavePage;
