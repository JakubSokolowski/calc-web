import React, { ReactElement } from 'react';
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';
import 'katex/dist/katex.min.css';
import RemarkMathPlugin from 'remark-math';
import { InlineMath, BlockMath } from 'react-katex';
import { Typography } from '@material-ui/core';
import { HeadingRenderer } from '../heading-renderer/heading-renderer';

export type OperationRenderer = (params: Record<string, any>) => ReactElement;

interface ExtendedMarkdownProps extends ReactMarkdownProps{
    operationRenderer?: OperationRenderer
}

export const MarkdownRenderer = (props: ExtendedMarkdownProps) => {
    const {operationRenderer, ...rest} = props;
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
            code: ({ language, value }) => {
                if (language === customRendererToken && operationRenderer) {
                    const val = JSON.parse(value);
                    return operationRenderer(val);
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
