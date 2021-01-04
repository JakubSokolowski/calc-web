import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => ({
        t: key => key,
        i18n: {
            changeLanguage: jest.fn(),
            language: 'en'
        }
    })
}));


jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useRouteMatch: () => ({
        path: '/tools/positional'
    }),
    useLocation: () => ({
        pathname: '/tools/positional'
    })
}));


class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
}

global.localStorage = new LocalStorageMock();
