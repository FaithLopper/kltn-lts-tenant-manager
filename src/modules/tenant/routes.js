import TenantListPage from '.';
import TenantSavePage from './TenantSavePage';
export default {
    tenantListPage: {
        path: '/tenant',
        title: 'Tenant',
        auth: true,
        component: TenantListPage,
    },
    tenantSavePage: {
        path: '/tenant/:id',
        title: 'Tenant',
        auth: true,
        component: TenantSavePage,
    },
};
