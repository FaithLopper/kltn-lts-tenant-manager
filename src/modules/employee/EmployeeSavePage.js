import PageWrapper from '@components/common/layout/PageWrapper';
import { DATE_DISPLAY_FORMAT, DATE_INPUT_FORMAT, STATUS_ACTIVE, UserTypes, categoryKinds } from '@constants';
import apiConfig from '@constants/apiConfig';
import useSaveBase from '@hooks/useSaveBase';
import React from 'react';
import { useParams } from 'react-router-dom';
import EmployeeForm from './EmployeeForm';
import useFetch from '@hooks/useFetch';
import { formatDateString } from '@utils';

const EmployeeSavePage = () => {
    const { id } = useParams();
    const { data: groupKindPermissionData } = useFetch(apiConfig.groupPermission.getGroupListCombobox, {
        immediate: true,
        params: { kind: UserTypes.EMPLOYEE },
        mappingData: (res) => res.data?.data?.map((item) => ({ label: item.name, value: item.id })),
    });
    const { data: jobData } = useFetch(apiConfig.category.getAutoComplete, {
        immediate: true,
        params: { kind: categoryKinds.CATEGORY_KIND_JOBS },
        mappingData: (res) => res.data?.data?.map((item) => ({ label: item.categoryName, value: item.id })),
    });

    const { data: departmentData } = useFetch(apiConfig.category.getAutoComplete, {
        immediate: true,
        params: { kind: categoryKinds.CATEGORY_KIND_DEPARTMENTS },
        mappingData: (res) => res.data?.data?.map((item) => ({ label: item.categoryName, value: item.id })),
    });
    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getDetail: apiConfig.employee.getById,
            create: apiConfig.employee.create,
            update: apiConfig.employee.update,
        },
        options: {
            getListUrl: `/employee`,
            objectName: 'Employee',
        },
        override: (funcs) => {
            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                    id: id,
                    groupId: data.account.group.id,
                    jobId: data.job.id,
                    departmentId: data.department.id,
                };
            };
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                    groupId: data.account.group.id,
                    jobId: data.job.id,
                    departmentId: data.department.id,
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
                { breadcrumbName: 'Home', path: '/' },
                { breadcrumbName: 'Employee', path: `/employee` },
                { breadcrumbName: title },
            ]}
        >
            <EmployeeForm
                setIsChangedFormValues={setIsChangedFormValues}
                dataDetail={detail ? detail : {}}
                formId={mixinFuncs.getFormId()}
                isEditing={isEditing}
                actions={mixinFuncs.renderActions()}
                onSubmit={onSave}
                groupData={groupKindPermissionData || []}
                jobData={jobData || []}
                departmentData={departmentData || []}
            />
        </PageWrapper>
    );
};

export default EmployeeSavePage;
