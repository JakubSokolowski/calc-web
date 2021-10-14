import React, { FC, useEffect, useState } from 'react';
import { useDocs } from '../../hooks/use-docs';
import { Box, styled } from '@mui/material';
import { MarkdownRenderer } from '../markdown-renderer/markdown-renderer';
import { ScrollSpy } from '../scroll-spy/scroll-spy';
import { extractHeadingIds } from '../../core/functions/heading-ids';
import { useLocation } from 'react-router-dom';
import { RendererMapping } from '../../..';
import { NavigationBreadcrumbs } from '@calc/common-ui';
import { useUrlParams } from '@calc/utils';

export interface DocsProps {
    path: string;
    rendererMapping?: RendererMapping;
}

const PREFIX = 'DocPage';

const classes = {
    box: `${PREFIX}-box`,
    root: `${PREFIX}-root`,
};


const Root = styled('div')(({ theme }) => ({
    [`& .${classes.box}`]: {
        display: 'block',
        paddingBottom: '400px',
        [theme.breakpoints.down('lg')]: {
            paddingRight: '250px'
        },
        [theme.breakpoints.up('lg')]: {
            paddingRight: '0px'
        }
    },
}));

export const DocPage: FC<DocsProps> = ({ path, rendererMapping }) => {
    const [docPath, setDocPath] = useState(path);
    const markdown = useDocs(docPath);
    const { pathname } = useLocation();
    const params = useUrlParams();
    const ids = extractHeadingIds(markdown);

    useEffect(() => {
        setDocPath(path);
    }, [path]);


    useEffect(() => {
        const header = params.get('h');
        if (header) {
            const element = document.getElementById(header);
            if (element) scrollTo(element);
        }
    }, [params]);

    const headerHeight = 64;

    const scrollTo = (element: HTMLElement) => {
        const y = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: y, behavior: 'auto' });
    };

    return (
        <Root>
            <Box className={classes.box}>
                {
                    !!ids.length && <ScrollSpy entries={ids}/>
                }
                <NavigationBreadcrumbs path={pathname}/>
                <MarkdownRenderer
                    renderMapping={rendererMapping}
                    source={markdown}
                    escapeHtml={false}
                />
            </Box>
        </Root>
    );
};

