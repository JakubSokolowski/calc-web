import React from 'react';
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';
import 'katex/dist/katex.min.css';
import RemarkMathPlugin from 'remark-math';
import { Typography } from '@mui/material';
import { HeadingRenderer } from '../heading-renderer/heading-renderer';
import { RendererMapping } from '../../..';
import { BlockMath, InlineMath } from '@calc/common-ui';

interface CodeTagProps {
    language: string;
    value: string;
}

interface ExtendedMarkdownProps extends ReactMarkdownProps{
    renderMapping?: RendererMapping;
}

export const MarkdownRenderer = (props: ExtendedMarkdownProps) => {
    const {renderMapping, ...rest} = props;
    const customRendererToken = 'calc';

    const newProps = {
        ...rest,
        plugins: [
            RemarkMathPlugin,
        ],
        renderers: {
            ...props.renderers,
            image: (props) => {
                const {alt, src} = props;
                return <img alt={alt} src={src}/>
            },
            math: (props) => <BlockMath math={props.value} />,
            inlineMath: (props) => <InlineMath math={props.value} />,
            code: (props: CodeTagProps) => {
                const {language, value} = props;
                if (language.includes(customRendererToken) && renderMapping) {
                    const [, rendererToken] = language.split('-');
                    const renderer = renderMapping[rendererToken];

                    if(renderer) {
                        const val = JSON.parse(value);
                        return renderer(val);
                    } else {
                        return (
                            <span className="renderer-token-error">
                                {`Render token: ${rendererToken} not found in mapping`}
                            </span>
                        )
                    }
                }
                const className = language && `language-${language}`;
                const code = React.createElement('code', className ? { className: className } : null, value);
                return React.createElement('pre', {}, code)
            },
            heading: HeadingRenderer,
            p: (props) => <Typography paragraph>{props.children}</Typography>
        },
    };
    return (
        <ReactMarkdown   {...newProps} />
    );
};
