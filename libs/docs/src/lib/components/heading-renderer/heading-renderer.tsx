import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { latinize } from '../../core/functions/latinize';

interface HeadingProps {
    level: number;
}

export const HeadingRenderer: FC<HeadingProps> = ({level, children}) => {

    function flatten(text, child) {
        return typeof child === 'string'
            ? text + child
            : React.Children.toArray(child.props.children).reduce(flatten, text)
    }

    const arrayChildren = React.Children.toArray(children);
    const text = arrayChildren.reduce(flatten, '');
    const slug = latinize(text.toLowerCase()).replace(/\W/g, '-');

    return (
        <Typography id={slug} variant={`h${level + 3}` as any}>
            {children}
        </Typography>
    )
};
