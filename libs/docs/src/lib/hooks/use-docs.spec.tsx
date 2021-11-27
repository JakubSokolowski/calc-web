import { renderHook } from '@testing-library/react-hooks'
import { useDocs } from '@calc/docs';

describe('use-docs', () => {
    const fetchMock = jest.fn();
    window.fetch = fetchMock;

    beforeEach(() => jest.clearAllMocks());

    it('should fetch return doc string when fetch succeeds', async () => {
        // given
        const path = 'positional/base-conversion';
        const docText = '## Base Conversion';

        const docResponse = {
            text: () => Promise.resolve(docText),
            status: 200,
        } as Response;

        fetchMock.mockReturnValueOnce(Promise.resolve(docResponse));

        // when
        const {result, waitForNextUpdate} = renderHook(() => useDocs(path));
        await waitForNextUpdate();

        // then
        const [doc] = result.current;
        expect(doc).toEqual(docText);
    });

    it('should return error message if fetch fails', async () => {
        // given
        const path = 'positional/base-conversion';
        fetchMock.mockReturnValueOnce(Promise.reject('Error'));
        const errorMessage = 'Failed to load doc';

        // when
        const {result, waitForNextUpdate} = renderHook(() => useDocs(path));
        await waitForNextUpdate();

        // then
        const [, , , error] = result.current;
        expect(error).toEqual(errorMessage);
    });
});
