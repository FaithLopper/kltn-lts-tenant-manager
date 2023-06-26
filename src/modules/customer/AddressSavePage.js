import PageWrapper from '@components/common/layout/PageWrapper';
import { DATE_DISPLAY_FORMAT, DATE_INPUT_FORMAT, STATUS_ACTIVE, UserTypes } from '@constants';
import apiConfig from '@constants/apiConfig';
import useSaveBase from '@hooks/useSaveBase';
import React from 'react';
import { generatePath, useParams } from 'react-router-dom';
import useFetch from '@hooks/useFetch';
import { formatDateString } from '@utils';
import useQueryParams from '@hooks/useQueryParams';
import AddressForm from './AddressForm';
import routes from '@routes';

const AddressSavePage = () => {
    const { id, customerId } = useParams();
    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getDetail: apiConfig.addressCustomer.getById,
            create: apiConfig.addressCustomer.create,
            update: apiConfig.addressCustomer.update,
        },
        options: {
            getListUrl: generatePath(routes.addressListPage.path, { customerId: customerId }),
            objectName: `Customer's Address`,
        },
        override: (funcs) => {
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
                { breadcrumbName: 'Home', path: '/' },
                { breadcrumbName: 'Customer', path: `/customer` },
                {
                    breadcrumbName: `Customer's Address`,
                    path: generatePath(routes.addressListPage.path, { customerId: customerId }),
                },
                { breadcrumbName: title },
            ]}
        >
            <AddressForm
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

export default AddressSavePage;
