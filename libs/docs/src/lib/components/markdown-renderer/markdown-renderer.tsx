import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'katex/dist/katex.min.css';
import RemarkMathPlugin from 'remark-math';
import { InlineMath, BlockMath } from 'react-katex';
import { Typography } from '@material-ui/core';
import { HeadingRenderer } from '../heading-renderer/heading-renderer';

export const MarkdownRenderer = (props) => {

    const newProps = {
        ...props,
        plugins: [
            RemarkMathPlugin,
        ],
        renderers: {
            ...props.renderers,
            math: (props) => <BlockMath math={props.value} />,
            inlineMath: (props) => <InlineMath math={props.value} />,
            heading: HeadingRenderer,
            p: (props) => <Typography paragraph>{props.children}</Typography>
        },
    };
    return (
        <ReactMarkdown  {...newProps} />
    );
};
