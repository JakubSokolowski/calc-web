import React from 'react';
import { shallow } from 'enzyme';
import { PartType, RepresentationPart } from './representation-part';

describe('RepresentationPart', () => {
    let container;

    beforeEach(() => {
        container = shallow(
            <RepresentationPart part={['1']} partEncoding={'1'} partType={PartType.Sign} partValue={'1'}/>
        );
    });

    it('should render successfully', () => {
        expect(container).toBeTruthy();
    });
});
