import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

function mockT(key) {
    return key
}

jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => ({
        t: mockT,
        i18n: {
            changeLanguage: jest.fn(),
            language: 'en'
        }
    })
}));


jest.mock('react-beautiful-dnd', () => ({
    Droppable: ({ children }) => children({
        draggableProps: {
            style: {},
        },
        innerRef: jest.fn(),
    }, {}),
    Draggable: ({ children }) => children({
        draggableProps: {
            style: {},
        },
        innerRef: jest.fn(),
    }, {}),
    DragDropContext: ({ children }) => children,
}));

