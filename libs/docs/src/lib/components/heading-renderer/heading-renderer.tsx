import React, { FC, SyntheticEvent, useState } from 'react';
import { Alert, IconButton, Snackbar, Typography } from '@mui/material';
import { getHeadingSlug } from '../../core/functions/heading-ids';

import LinkIcon from '@mui/icons-material/Link';
import { useHistory, useLocation } from 'react-router-dom';
import { copyToClipboard } from '@calc/common-ui';
import { useTranslation } from 'react-i18next';
import { environment } from '@calc/env';

interface HeadingProps {
    level: number;
}

export const HeadingRenderer: FC<HeadingProps> = ({ level, children }) => {
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState(false);
    const { pathname } = useLocation();
    const history = useHistory();
    const { t } = useTranslation();

    function flatten(text, child) {
        return typeof child === 'string'
            ? text + child
            : React.Children.toArray(child.props.children).reduce(flatten, text);
    }

    const arrayChildren = React.Children.toArray(children);
    const text = arrayChildren.reduce(flatten, '');
    const id = getHeadingSlug(text);

    const handleCopyToClipboard = () => {
        const search = `?h=${id}`;
        const deployPrefix = environment.deployUrl ? `/${environment.deployUrl}` : '';
        const url = window.location.host + deployPrefix + '/#' + pathname + search;
        copyToClipboard(url);
        setOpen(true);
        history.push({ search });
    };

    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div
            data-test={`heading-wrapper-${id}`}
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', minHeight: '40px'}}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Typography id={id} variant={`h${level + 3}` as any}>
                {children}
            </Typography>
            {
                hovered &&
                <div style={{paddingLeft: '8px'}}>
                    <IconButton onClick={() => handleCopyToClipboard()} size="medium">
                        <LinkIcon/>
                    </IconButton>
                </div>
            }
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={1500}
                onClose={handleClose}
            >
                <Alert severity="info">
                    {t('common.copyLink')}
                </Alert>
            </Snackbar>
        </div>
    );
};
