import { shallow } from 'enzyme';
import React from 'react';
import { Section } from '@calc/common-ui';

describe('Section', () => {
    let container;

    beforeEach(() => {
        container = shallow(
            <Section title={'Some section'}>
                <div>Section content</div>
            </Section>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
