export const apiUrl = process.env.REACT_APP_API;
export const apiTenantUrl = process.env.REACT_APP_TENANT_API;
export const gameUrl = process.env.REACT_APP_GAME_API;
export const siteUrl = process.env.REACT_APP_SITE_URL;
export const enableExposure = process.env.REACT_APP_ENABLE_EXPOSURE === 'true';

export const fixedPath = {
    privacy: `${apiUrl}${process.env.REACT_APP_PRIVACY_PATH}`,
    help: `${apiUrl}${process.env.REACT_APP_HELP_PATH}`,
    aboutUs: `${apiUrl}${process.env.REACT_APP_ABOUT_US_PATH}`,
};

//Cyber++ Vista

export const brandName = 'LTS-SHOP';

export const appName = 'lts-shop';

export const storageKeys = {
    USER_ACCESS_TOKEN: `${appName}-user-access-token`,
    USER_REFRESH_TOKEN: `${appName}-user-refresh-token`,
};

export const AppConstants = {
    apiRootUrl: process.env.REACT_APP_API,
    gameRootUrl: process.env.REACT_APP_GAME_API,
    contentRootUrl: `${process.env.REACT_APP_API}v1/file/download`,
    langKey: 'vi',
};

export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light',
};

export const defaultLocale = 'en';
export const locales = [ 'en', 'vi' ];

export const activityType = {
    GAME: 'game',
    VIDEO: 'video',
    ARTICLE: 'article',
    FOCUS_AREA: 'focus-area',
};

export const DATE_DISPLAY_FORMAT = 'DD-MM-YYYY HH:mm';
export const DATE_INPUT_FORMAT = 'DD/MM/YYYY';
export const DATE_SHORT_MONTH_FORMAT = 'DD MMM YYYY';
export const TIME_FORMAT_DISPLAY = 'HH:mm';

export const navigateTypeEnum = {
    PUSH: 'PUSH',
    POP: 'POP',
    REPLACE: 'REPLACE',
};

export const articleTypeEnum = {
    URL: 'url',
    PLAIN: 'plain',
};

export const accessRouteTypeEnum = {
    NOT_LOGIN: false,
    REQUIRE_LOGIN: true,
    BOTH: null,
};

export const UploadFileTypes = {
    AVATAR: 'AVATAR',
    LOGO: 'LOGO',
    DOCUMENT: 'DOCUMENT',
};

export const LIMIT_IMAGE_SIZE = 512000;

export const STATUS_PENDING = 0;
export const STATUS_ACTIVE = 1;
export const STATUS_LOCK = -1;
export const STATUS_DELETE = -2;

export const DEFAULT_TABLE_ITEM_SIZE = 10;
export const DEFAULT_TABLE_PAGE_START = 0;

export const commonStatus = {
    PENDING: 0,
    ACTIVE: 1,
    LOCK: -1,
    DELETE: -2,
};

export const commonStatusColor = {
    [commonStatus.PENDING]: 'warning',
    [commonStatus.ACTIVE]: 'green',
    [commonStatus.LOCK]: 'red',
};

const CATEGORY_KIND_NEWS = 1;
const CATEGORY_KIND_JOBS = 2;
const CATEGORY_KIND_DEPARTMENTS = 3;

export const categoryKinds = {
    CATEGORY_KIND_NEWS,
    CATEGORY_KIND_JOBS,
    CATEGORY_KIND_DEPARTMENTS,
};

export const UserTypes = {
    ADMIN: 1,
    CUSTOMER: 2,
    EMPLOYEE: 3,
    SYS_ADMIN: 5,
};

export const DATABASE_PLACE_INTERNAL = 1;
export const DATABASE_PLACE_EXTERNAL = 2;

export const DATABASE_PLACE_OPTIONS = [
    { label: 'Internal', value: DATABASE_PLACE_INTERNAL },
    { label: 'External', value: DATABASE_PLACE_EXTERNAL },
];

export const MALE = 1;
export const FEMALE = 2;

export const hostName = process.env.REACT_APP_HOST_NAME;
export const domainName = process.env.REACT_APP_DOMAIN_NAME;
