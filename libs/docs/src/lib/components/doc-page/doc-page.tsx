import React, { FC } from 'react';
import { useDocs } from '../../hooks/use-docs';
import { Box, createStyles, Theme } from '@material-ui/core';
import { MarkdownRenderer } from '../markdown-renderer/markdown-renderer';
import { ScrollSpy } from '../scroll-spy/scroll-spy';
import { extractHeadingIds } from '../../core/functions/heading-ids';
import { makeStyles } from '@material-ui/core/styles';
import { environment } from '@calc/env';

export interface DocsProps {
    path: string;
    operationRenderer?: any;
}

export const useStyles = makeStyles((theme: Theme) => {
    return createStyles(
        {
            box: {
                paddingBottom: '400px',
                [theme.breakpoints.down('md')]: {
                    paddingRight: '250px'
                },
                [theme.breakpoints.up('lg')]: {
                    paddingRight: '0px'
                }
            }
        }
    );
});

export const DocPage: FC<DocsProps> = ({ path, operationRenderer }) => {
    const markdown = useDocs(path);
    const imageUriPrefix = `${environment.deployUrl}/assets/docs/`;
    const classes = useStyles();

    const ids = extractHeadingIds(markdown);

    return (
        <Box className={classes.box}>
            {
                !!ids.length && <ScrollSpy entries={ids}/>
            }
            <MarkdownRenderer
                operationRenderer={operationRenderer}
                source={markdown}
                escapeHtml={false}
                transformImageUri={(uri) => {
                    return imageUriPrefix + path + '/' + uri;
                }}
            />
        </Box>
    );
};
