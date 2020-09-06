import React, { FC } from 'react';
import { useDocs } from '../../hooks/use-docs';
import { Box, useMediaQuery } from '@material-ui/core';
import { MarkdownRenderer } from '../markdown-renderer/markdown-renderer';
import { ScrollSpy } from '../scroll-spy/scroll-spy';
import { extractHeadingIds } from '../../core/functions/heading-ids';

export interface DocsProps {
    path: string;
}

export const DocPage: FC<DocsProps> = ({path}) => {
    const markdown = useDocs(path);
    const imageUriPrefix = 'assets/docs/';

    const ids = extractHeadingIds(markdown);
    const largerWindow = useMediaQuery('(max-width:992px)');

    return (
        <Box style={{paddingBottom: '400px', paddingRight: largerWindow ? '250px': '0px'}}>
            {
                !!ids.length && <ScrollSpy entries={ids}/>
            }
            <MarkdownRenderer
                source={markdown}
                escapeHtml={false}
                transformImageUri={(uri) => {
                    return imageUriPrefix + path + '/' + uri
                }}
            />
        </Box>
    );
};
