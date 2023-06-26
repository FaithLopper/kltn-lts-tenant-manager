import EmployeeListPage from ".";
import EmployeeSavePage from "./EmployeeSavePage";

export default {
    employeeListPage: {
        path: '/employee',
        title: 'Employee',
        auth: true,
        component: EmployeeListPage,
    },
    employeeSavePage: {
        path: '/employee/:id',
        title: 'Employee',
        auth: true,
        component: EmployeeSavePage,
    },
};
