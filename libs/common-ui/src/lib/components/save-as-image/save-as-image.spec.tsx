import { mount } from 'enzyme';
import React from 'react';
import { SaveAsImageButton } from '@calc/common-ui';
import { saveAs } from 'file-saver';
import DomToImage from 'dom-to-image'
import Mock = jest.Mock;

jest.mock(
    'dom-to-image',
    () => {
        return {
            __esModule: true,
            default: {
                toBlob: jest.fn().mockResolvedValue(new Blob())
            }
        };
    }
);

jest.mock(
    'file-saver',
    () => ({ saveAs: jest.fn() })
);

describe('SaveAsImageButton', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <SaveAsImageButton elementId={'some-id'} tooltipTitle={'Download'}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });

    it('should save element marked by elementId to image', async () => {
        // given
        const elementId = 'some-id';
        const filename = 'result.png';

        container = mount(
            <div>
                <div id={elementId}>
                    <span>Some text</span>
                </div>
                <SaveAsImageButton elementId={elementId} tooltipTitle={'Download'}/>
            </div>
        );

        // when
        await container
            .find('button')
            .at(0)
            .simulate('click');

        await tick();

        expect(saveAs).toBeCalledWith(new Blob(), filename);
    });

    it('should log error if saving image fails', async () => {
        // given
        const elementId = 'some-id';
        const errorMessage = 'Some error';
        (DomToImage.toBlob as Mock).mockRejectedValue(errorMessage);
        const consoleLogMock = jest.fn();
        console.log = consoleLogMock;

        container = mount(
            <div>
                <div id={elementId}>
                    <span>Some text</span>
                </div>
                <SaveAsImageButton elementId={elementId} tooltipTitle={'Download'}/>
            </div>
        );

        // when
        await container
            .find('button')
            .at(0)
            .simulate('click');

        await tick();

        expect(consoleLogMock).toBeCalledWith(errorMessage);
    });
});

function tick() {
    return new Promise(resolve => {
        setTimeout(resolve, 0);
    })
}
