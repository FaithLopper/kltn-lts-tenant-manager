import { FEMALE, MALE, STATUS_ACTIVE, STATUS_LOCK, STATUS_PENDING } from '@constants';
import { defineMessage } from 'react-intl';

const commonMessage = defineMessage({
    status: {
        active: {
            id: 'constants.masterData.commonMessage.status.active',
            defaultMessage: 'Active',
        },
        pending: {
            id: 'constants.masterData.commonMessage.status.pending',
            defaultMessage: 'Pending',
        },
        lock: {
            id: 'constants.masterData.commonMessage.status.lock',
            defaultMessage: 'Inactive',
        },
    },
    site: {
        type: {
            top: {
                id: 'constants.masterData.commonMessage.site.type.top',
                defaultMessage: 'Top Site',
            },
            campaign: {
                id: 'constants.masterData.commonMessage.site.type.campaign',
                defaultMessage: 'Campaign Site',
            },
        },
        layout: {
            default: {
                id: 'constants.masterData.commonMessage.site.layout.default',
                defaultMessage: 'Default Layout',
            },
            red: {
                id: 'constants.masterData.commonMessage.site.layout.red',
                defaultMessage: 'Red Layout',
            },
        },
    },
    filter: {
        contain: {
            id: 'constants.masterData.commonMessage.filter.contain',
            defaultMessage: 'Contains',
        },
        isExacly: {
            id: 'constants.masterData.commonMessage.filter.isExacly',
            defaultMessage: 'Is exacly',
        },
        startWith: {
            id: 'constants.masterData.commonMessage.filter.startWith',
            defaultMessage: 'Start with',
        },
        endWith: {
            id: 'constants.masterData.commonMessage.filter.endWith',
            defaultMessage: 'End with',
        },
        date: {
            id: 'constants.masterData.commonMessage.filter.date',
            defaultMessage: 'Date',
        },
        dateRange: {
            id: 'constants.masterData.commonMessage.filter.dateRange',
            defaultMessage: 'Between ... and ...',
        },
        today: {
            id: 'constants.masterData.commonMessage.filter.today',
            defaultMessage: 'Today',
        },
        yesterday: {
            id: 'constants.masterData.commonMessage.filter.yesterday',
            defaultMessage: 'Yesterday',
        },
        thisWeek: {
            id: 'constants.masterData.commonMessage.filter.thisWeek',
            defaultMessage: 'This week',
        },
        lastWeek: {
            id: 'constants.masterData.commonMessage.filter.lastWeek',
            defaultMessage: 'Last week',
        },
    },
});

export const languageOptions = [
    { value: 1, label: 'EN' },
    { value: 2, label: 'VN' },
    { value: 3, label: 'Other' },
];

export const orderOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
];

export const commonStatus = [
    { value: STATUS_ACTIVE.toString(), label: 'Kích hoạt', color: 'green' },
    { value: STATUS_PENDING.toString(), label: 'Đang chờ', color: 'warning' },
    { value: STATUS_LOCK.toString(), label: 'Khóa', color: 'red' },
];

export const statusOptions = [
    { value: STATUS_ACTIVE, label: commonMessage.defaultMessage, color: '#00A648' },
    { value: STATUS_PENDING, label: commonMessage.status.pending, color: '#FFBF00' },
    { value: STATUS_LOCK, label: commonMessage.status.lock, color: '#CC0000' },
];

export const filterBaseOption = [
    { value: 0, label: commonMessage.filter.contain },
    { value: 1, label: commonMessage.filter.isExacly },
    { value: 2, label: commonMessage.filter.startWith },
    { value: 3, label: commonMessage.filter.endWith },
];

export const filterDateOption = [
    { value: 'date', label: commonMessage.filter.date },
    { value: 'between', label: commonMessage.filter.dateRange },
    { value: 6, label: commonMessage.filter.today },
    { value: 7, label: commonMessage.filter.yesterday },
    { value: 8, label: commonMessage.filter.thisWeek },
    { value: 9, label: commonMessage.filter.lastWeek },
];

export const genderOptions = [
    { value: MALE, label: 'Nam' }, // Oops only 2 genders, hahaha fuck these gays
    { value: FEMALE, label: 'Nữ' },
];
