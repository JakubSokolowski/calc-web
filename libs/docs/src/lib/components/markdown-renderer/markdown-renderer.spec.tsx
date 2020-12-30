import React from 'react';
import { mount } from 'enzyme';
import { MarkdownRenderer, RendererMapping } from './markdown-renderer';
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
            const mapping: RendererMapping = {
                'calc-custom': renderer
            };
            const markdown = "```javascript\nconsole.log('xd')\n```";
            const languageClassName = '.language-javascript';

            // when
            const container = mount(
                <MarkdownRenderer source={markdown} renderMapping={mapping}/>
            );
            const codeTag = container.find(languageClassName);

            // then
            expect(codeTag.length).toEqual(1);
        });

        it('should render normal code tag if custom renderer mapping is not defined', () => {
            // given
            const objStr = JSON.stringify({ prop: 'test'});
            const markdown = "```calc-custom\n#\n```".replace('#', objStr);

            const languageClassName = '.language-calc-custom';

            // when
            const container = mount(
                <MarkdownRenderer source={markdown}/>
            );
            const codeTag = container.find(languageClassName);

            // then
            expect(codeTag.length).toEqual(1);
        });

        it('should render error when custom mapping is defined, but renderer token in markdown is not found in mapping', () => {
            // given
            const objStr = JSON.stringify({ prop: 'test'});
            const markdown = "```calc-custom76\n#\n```".replace('#', objStr);
            const renderer = jest.fn();
            const mapping: RendererMapping = {
                'calc-custom': renderer
            };

            const errorClassName = '.renderer-token-error';

            // when
            const container = mount(
                <MarkdownRenderer source={markdown} renderMapping={mapping}/>
            );
            const error = container.find(errorClassName);

            // then
            const expectedMsg = 'Render token: custom76 not found in mapping';
            expect(error.length).toEqual(1);
            expect(error.text()).toEqual(expectedMsg);
        });


        it('should render custom renderer output when renderer is defined and language is equal to custom token', () => {
            // given
            const mock = jest.fn();
            const customRenderer = (props) => {
                mock(props);
                return <span className='custom-renderer'>Custom</span>;
            };
            const mapping: RendererMapping = {
                custom: customRenderer
            };
            const customObjProps = { prop: 'test'};
            const objStr = JSON.stringify(customObjProps);
            const markdown = "```calc-custom\n#\n```".replace('#', objStr);

            // when
            const container = mount(
                <MarkdownRenderer source={markdown} renderMapping={mapping}/>
            );
            const codeTag = container.find('.custom-renderer');

            // then
            expect(codeTag.length).toEqual(1);
            expect(mock).toBeCalledWith(customObjProps);
        });
    })
});
