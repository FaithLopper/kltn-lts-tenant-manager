import PageWrapper from '@components/common/layout/PageWrapper';
import { STATUS_ACTIVE, UserTypes } from '@constants';
import apiConfig from '@constants/apiConfig';
import useSaveBase from '@hooks/useSaveBase';
import React from 'react';
import { useParams } from 'react-router-dom';
import TenantForm from './TenantForm';
import useFetch from '@hooks/useFetch';

const TenantSavePage = () => {
    const { id } = useParams();
    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getDetail: apiConfig.tenant.getById,
            create: apiConfig.tenant.create,
            update: apiConfig.tenant.update,
        },
        options: {
            getListUrl: `/tenant`,
            objectName: 'Tenant',
        },
        override: (funcs) => {
            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                    id: id,
                };
            };
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
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
            routes={[
                { breadcrumbName: 'Home', path: '/' },
                { breadcrumbName: 'Tenant', path: `/tenant` },
                { breadcrumbName: title },
            ]}
            title={title}
        >
            <TenantForm
                setIsChangedFormValues={setIsChangedFormValues}
                dataDetail={detail ? detail : {}}
                formId={mixinFuncs.getFormId()}
                isEditing={isEditing}
                actions={mixinFuncs.renderActions()}
                onSubmit={onSave}
            />
        </PageWrapper>
    );
};

export default TenantSavePage;
