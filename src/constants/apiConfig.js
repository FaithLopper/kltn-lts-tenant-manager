import { apiUrl, gameUrl } from '.';

const baseHeader = {
    'Content-Type': 'application/json',
};

const multipartFormHeader = {
    'Content-Type': 'multipart/form-data',
};

const apiConfig = {
    account: {
        login: {
            baseURL: `${apiUrl}v1/account/login`,
            method: 'POST',
            headers: baseHeader,
        },
        getProfile: {
            baseURL: `${apiUrl}v1/account/profile`,
            method: 'GET',
            headers: baseHeader,
        },
        updateProfile: {
            baseURL: `${apiUrl}v1/account/update_profile`,
            method: 'PUT',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/account/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        refreshToken: {
            baseURL: `${apiUrl}v1/account/refresh_token`,
            method: 'POST',
            headers: baseHeader,
        },
        logout: {
            baseURL: `${apiUrl}v1/account/logout`,
            method: 'GET',
            headers: baseHeader,
        },
        verifyOtp: {
            baseURL: `${apiUrl}v1/users/otp/verify`,
            method: 'POST',
            headers: baseHeader,
        },
    },
    user: {
        getList: {
            baseURL: `${apiUrl}v1/account/list`,
            method: `GET`,
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/account/get/:id`,
            method: `GET`,
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/account/create_admin`,
            method: `POST`,
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/account/update_admin`,
            method: `PUT`,
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/account/delete/:id`,
            method: `DELETE`,
            headers: baseHeader,
        },
    },
    file: {
        upload: {
            baseURL: `${apiUrl}v1/file/upload`,
            method: 'POST',
            headers: multipartFormHeader,
        },
    },
    groupPermission: {
        getGroupList: {
            baseURL: `${apiUrl}v1/group/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getList: {
            baseURL: `${apiUrl}v1/group/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getPemissionList: {
            baseURL: `${apiUrl}v1/permission/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/group/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/group/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/group/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/group/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        getGroupListCombobox: {
            baseURL: `${apiUrl}v1/group/list_combobox`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    tenant: {
        getList: {
            baseURL: `${apiUrl}v1/tenant/list`,
            method: `GET`,
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/tenant/get/:id`,
            method: `GET`,
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/tenant/create`,
            method: `POST`,
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/tenant/update`,
            method: `PUT`,
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/tenant/delete/:id`,
            method: `DELETE`,
            headers: baseHeader,
        },
    },
    customer: {
        getList: {
            baseURL: `${apiUrl}v1/customer/list`,
            method: `GET`,
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/customer/get/:id`,
            method: `GET`,
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/customer/create`,
            method: `POST`,
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/customer/update`,
            method: `PUT`,
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/customer/delete/:id`,
            method: `DELETE`,
            headers: baseHeader,
        },
        getAutoComplete: {
            baseURL: `${apiUrl}v1/customer/auto-complete`,
            method: `GET`,
            headers: baseHeader,
        },
    },
    addressCustomer: {
        getList: {
            baseURL: `${apiUrl}v1/customer/address/list`,
            method: `GET`,
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/customer/address/get/:id`,
            method: `GET`,
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/customer/address/create`,
            method: `POST`,
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/customer/address/update`,
            method: `PUT`,
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/customer/address/delete/:id`,
            method: `DELETE`,
            headers: baseHeader,
        },
        setDefauldAddress: {
            baseURL: `${apiUrl}v1/customer/address/default`,
            method: `PUT`,
            headers: baseHeader,
        },
    },
    employee: {
        getList: {
            baseURL: `${apiUrl}v1/employee/list`,
            method: `GET`,
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/employee/get/:id`,
            method: `GET`,
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/employee/create`,
            method: `POST`,
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/employee/update`,
            method: `PUT`,
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/employee/delete/:id`,
            method: `DELETE`,
            headers: baseHeader,
        },
        getAutoComplete: {
            baseURL: `${apiUrl}v1/employee/auto-complete`,
            method: `GET`,
            headers: baseHeader,
        },
    },
    category: {
        getAutoComplete: {
            baseURL: `${apiUrl}v1/category/auto-complete`,
            method: `GET`,
            headers: baseHeader,
        },
    },
};

export default apiConfig;
