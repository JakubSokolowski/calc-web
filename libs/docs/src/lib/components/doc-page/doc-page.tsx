import React, { FC, useEffect, useState } from 'react';
import { useDocs } from '../../hooks/use-docs';
import { Box, createStyles, Theme } from '@material-ui/core';
import { MarkdownRenderer } from '../markdown-renderer/markdown-renderer';
import { ScrollSpy } from '../scroll-spy/scroll-spy';
import { extractHeadingIds } from '../../core/functions/heading-ids';
import { makeStyles } from '@material-ui/core/styles';
import { environment } from '@calc/env';
import { useLocation } from 'react-router-dom';
import { NavigationBreadcrumbs } from '../../../../../common-ui/src/lib/components/navigation-breadcrumbs/navigation-breadcrumbs';
import { RendererMapping } from '../../..';

export interface DocsProps {
    path: string;
    rendererMapping?: RendererMapping;
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
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
            },
            root: {
                display: 'flex',
                margin: 'auto',
                maxWidth: '700px'
            }
        }
    );
});

export const DocPage: FC<DocsProps> = ({ path, rendererMapping }) => {
    const [docPath, setDocPath] = useState(path);
    const markdown = useDocs(docPath);
    const { pathname } = useLocation();
    const imageUriPrefix = `${environment.deployUrl}/assets/theory/`;
    const classes = useStyles();
    const query = useQuery();
    const ids = extractHeadingIds(markdown);

    useEffect(() => {
        setDocPath(path);
    }, [path]);


    useEffect(() => {
        const header = query.get('h');
        if (header) {
            const element = document.getElementById(query.get('h'));
            if (element) scrollTo(element);
        }
    }, [query]);

    const headerHeight = 64;

    const scrollTo = (element: HTMLElement) => {
        const y = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: y, behavior: 'auto' });
    };

    return (
        <Box className={classes.box}>
            {
                !!ids.length && <ScrollSpy entries={ids}/>
            }
            <NavigationBreadcrumbs path={pathname}/>
            <MarkdownRenderer
                renderMapping={rendererMapping}
                source={markdown}
                escapeHtml={false}
                transformImageUri={(uri) => {
                    return imageUriPrefix + docPath + '/' + uri;
                }}
            />
        </Box>
    );
};

