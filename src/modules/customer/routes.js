import CustomerListPage from '.';
import AddressListPage from './AddressListPage';
import AddressSavePage from './AddressSavePage';
import CustomerSavePage from './CustomerSavePage';

export default {
    customerListPage: {
        path: '/customer',
        title: 'Customer',
        auth: true,
        component: CustomerListPage,
    },
    customerSavePage: {
        path: '/customer/:id',
        title: 'Customer',
        auth: true,
        component: CustomerSavePage,
    },
    addressListPage: {
        path: '/customer/address/:customerId',
        title: `Customer's Address`,
        auth: true,
        component: AddressListPage,
    },
    addressSavePage: {
        path: '/customer/address/:customerId/:id',
        title: `Customer's Address`,
        auth: true,
        component: AddressSavePage,
    },
};
