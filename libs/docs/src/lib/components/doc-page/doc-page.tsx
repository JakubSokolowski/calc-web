import React, { FC } from 'react';
import { useDocs } from '../../hooks/use-docs';
import { Box } from '@material-ui/core';
import { MarkdownRenderer } from '../markdown-renderer/markdown-renderer';

export interface DocsProps {
    path: string;
}

export const DocPage: FC<DocsProps> = ({path}) => {
    const markdown = useDocs(path);
    const imageUriPrefix = 'assets/docs/';

    return (
        <Box>
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
