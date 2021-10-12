import { ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

export function tick() {
    return new Promise(resolve => {
        setTimeout(resolve, 0);
    })
}

export async function waitForComponentToPaint<P = Record<any, any>>(
    wrapper: ReactWrapper<P>,
    amount = 0,
) {
    await act(async () => {
        await new Promise(resolve => setTimeout(resolve, amount));
        wrapper.update();
    });
}
