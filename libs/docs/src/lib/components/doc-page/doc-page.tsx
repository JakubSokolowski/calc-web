import React, { FC, useEffect } from 'react';
import { useDocs } from '../../hooks/use-docs';
import { Alert, Box, styled } from '@mui/material';
import { MarkdownRenderer } from '../markdown-renderer/markdown-renderer';
import { ScrollSpy } from '../scroll-spy/scroll-spy';
import { extractHeadingIds } from '../../core/functions/heading-ids';
import { useLocation } from 'react-router-dom';
import { RendererMapping } from '../../..';
import { NavigationBreadcrumbs } from '@calc/common-ui';
import { useUrlParams } from '@calc/utils';
import { Language } from '@calc/i18n';
import { useTranslation } from 'react-i18next';
import { NotFound } from '@calc/common-ui';

export interface DocsProps {
    path: string;
    rendererMapping?: RendererMapping;
}

const PREFIX = 'DocPage';

const classes = {
    box: `${PREFIX}-box`,
    root: `${PREFIX}-root`,
    fallbackWarning: `${PREFIX}-fallbackWarning`
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
    [`& .${classes.fallbackWarning}`]: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

export const DocPage: FC<DocsProps> = ({ path, rendererMapping }) => {
    const fallbackLanguage = Language.pl;
    const { t, i18n } = useTranslation();
    const [markdown, isFallback, loading] = useDocs(path, fallbackLanguage);
    const { pathname } = useLocation();
    const params = useUrlParams();
    const ids = extractHeadingIds(markdown);

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

    if(!markdown && !loading) {
        return (
            <Root>
                <NotFound/>
            </Root>
        )
    }

    return (
        <Root>
            <Box className={classes.box}>
                {
                    !!ids.length && <ScrollSpy entries={ids}/>
                }
                <NavigationBreadcrumbs path={pathname}/>
                {
                    isFallback &&
                    <Alert className={classes.fallbackWarning} severity={'warning'}>
                            <span data-test="translation-not-available">
                                {
                                    t(
                                        'theory.translationNotAvailable',
                                        {
                                            current: i18n.language.toUpperCase(),
                                            fallback: fallbackLanguage.toUpperCase()
                                        }
                                    )
                                }
                            </span>
                    </Alert>
                }
                <div data-test="doc-page">
                    <MarkdownRenderer
                        renderMapping={rendererMapping}
                        source={markdown}
                        escapeHtml={false}
                    />
                </div>
            </Box>
        </Root>
    );
};

