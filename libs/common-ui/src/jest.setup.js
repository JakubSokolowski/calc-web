import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

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
    useLocation: () => ({
       pathname: '/tools/positional'
    })
}));


