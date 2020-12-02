import React from 'react';
import { mount } from 'enzyme';
import { MarkdownRenderer } from './markdown-renderer';
import { HeadingRenderer } from '../heading-renderer/heading-renderer';
import { BlockMath, InlineMath } from 'react-katex';

describe('MarkdownRenderer', () => {
    describe('heading renderer', () => {
        it('should render heading when heading is defined in markdown', () => {
            // given
            const markdown = '## Heading';

            // when
            const container = mount(
                <MarkdownRenderer source={markdown}/>
            );
            const typography = container.find(HeadingRenderer);

            // then
            expect(typography.text()).toEqual('Heading');
        });
    });

    describe('math renderer', () => {
        it('should render latex math if inline math is defined in markdown', () => {
            // given
            const markdown = `$inline_{math}$`;

            // when
            const container = mount(
                <MarkdownRenderer source={markdown}/>
            );
            const inlineMath = container.find(InlineMath);

            // then
            expect(inlineMath.length).toEqual(1);
        });

        it('should render latex math if block math is defined in markdown', () => {
            // given
            const markdown = `## \n $$\n A_{2} + B_{2} = 9 + 7 = 16 \n$$`;

            // when
            const container = mount(
                <MarkdownRenderer source={markdown}/>
            );
            const blockMath = container.find(BlockMath);

            // then
            expect(blockMath.length).toEqual(1);
        });
    });

    describe('custom operation renderer', () => {
        it('should render normal code tag if language is not equal to custom renderer token', () => {
            // given
            const renderer = jest.fn();
            const markdown = "```javascript\nconsole.log('xd')\n```";
            const languageClassName = '.language-javascript';

            // when
            const container = mount(
                <MarkdownRenderer source={markdown} operationRenderer={renderer}/>
            );
            const codeTag = container.find(languageClassName);

            // then
            expect(codeTag.length).toEqual(1);
        });

        it('should render normal code tag if custom renderer is not defined', () => {
            // given
            const objStr = JSON.stringify({ prop: 'test'});
            const markdown = "```calc\n#\n```".replace('#', objStr);

            const languageClassName = '.language-calc';

            // when
            const container = mount(
                <MarkdownRenderer source={markdown}/>
            );
            const codeTag = container.find(languageClassName);

            // then
            expect(codeTag.length).toEqual(1);
        });

        it('should render custom renderer output when renderer is defined and language is equal to custom token', () => {
            // given
            const mock = jest.fn();
            const customRenderer = (props) => {
                mock(props);
                return <span className='custom-renderer'>Custom</span>;
            };
            const customObjProps = { prop: 'test'};
            const objStr = JSON.stringify(customObjProps);
            const markdown = "```calc\n#\n```".replace('#', objStr);

            // when
            const container = mount(
                <MarkdownRenderer source={markdown} operationRenderer={customRenderer}/>
            );
            const codeTag = container.find('.custom-renderer');

            // then
            expect(codeTag.length).toEqual(1);
            expect(mock).toBeCalledWith(customObjProps);
        });
    })
});
