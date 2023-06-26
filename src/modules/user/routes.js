import UserAdminListPage from ".";
import UserAdminSavePage from "./UserAdminSavePage";
import UserAdminShopListPage from "./UserAdminShopListPage";
import UserShopSavePage from "./UserShopSavePage";
export default {
    adminsListPage: {
        path: '/admins',
        title: 'Admins',
        auth: true,
        component: UserAdminListPage,
    },
    adminsShopListPage: {
        path: '/admins-shop',
        title: 'Admins Shop',
        auth: true,
        component: UserAdminShopListPage,
    },
    adminsSavePage: {
        path: '/admins/:id',
        title: 'Admins',
        auth: true,
        component: UserAdminSavePage,
    },
    adminsShopSavePage: {
        path: '/admins-shop/:id',
        title: 'Admins',
        auth: true,
        component: UserShopSavePage,
    },
};