import PageNotFound from '@components/common/page/PageNotFound';
import PageNotAllowed from '@components/common/page/PageNotAllowed';
import LoginPage from '@modules/login/index';
import VerifyPage from '@modules/login/verify';
import ProfilePage from '@modules/profile/index';
import GroupPermissionListPage from '@modules/groupPermission';
import PermissionSavePage from '@modules/groupPermission/PermissionSavePage';
import Dashboard from '@modules/dashboard';
import userRoutes from '@modules/user/routes';
import tenantRoutes from '@modules/tenant/routes';
import customerRoutes from '@modules/customer/routes';
import employeeRoutes from '@modules/employee/routes';
/*
	auth
		+ null: access login and not login
		+ true: access login only
		+ false: access not login only
*/
const routes = {
    homePage: {
        path: '/',
        component: Dashboard,
        auth: true,
        title: 'Home',
    },
    pageNotAllowed: {
        path: '/not-allowed',
        component: PageNotAllowed,
        auth: null,
        title: 'Page not allowed',
    },
    loginPage: {
        path: '/login',
        component: LoginPage,
        auth: false,
        title: 'Login page',
    },
    verifyPage: {
        path: '/login/verify',
        component: VerifyPage,
        auth: false,
        title: 'login verify page',
    },
    profilePage: {
        path: '/profile',
        component: ProfilePage,
        auth: true,
        title: 'Profile page',
        // layout: SiteLayout,
    },
    groupPermissionPage: {
        path: '/group-permission',
        component: GroupPermissionListPage,
        auth: true,
        title: 'Profile page',
    },
    groupPermissionSavePage: {
        path: '/group-permission/:id',
        component: PermissionSavePage,
        auth: true,
        title: 'Profile page',
    },
    ...userRoutes,
    ...tenantRoutes,
    ...customerRoutes,
    // ...employeeRoutes,
    // keep this at last
    notFound: {
        component: PageNotFound,
        auth: null,
        title: 'Page not found',
        path: '*',
    },
};

export default routes;
