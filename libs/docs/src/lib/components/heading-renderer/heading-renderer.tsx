import React, { FC, SyntheticEvent, useState } from 'react';
import { IconButton, Snackbar, Typography } from '@material-ui/core';
import { getHeadingSlug } from '../../core/functions/heading-ids';

import LinkIcon from '@material-ui/icons/Link';
import { useLocation, useHistory } from 'react-router-dom';
import { Alert, copyToClipboard } from '@calc/common-ui';
import { useTranslation } from 'react-i18next';

interface HeadingProps {
    level: number;
}

export const HeadingRenderer: FC<HeadingProps> = ({level, children}) => {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();
    const history = useHistory();
    const {t} = useTranslation();

    function flatten(text, child) {
        return typeof child === 'string'
            ? text + child
            : React.Children.toArray(child.props.children).reduce(flatten, text)
    }

    const arrayChildren = React.Children.toArray(children);
    const text = arrayChildren.reduce(flatten, '');
    const id = getHeadingSlug(text);

    const handleCopyToClipboard = () => {
        const search  = `?h=${id}`;
        const url = window.location.host + '/#' + pathname + search;
        copyToClipboard(url);
        setOpen(true);
        history.push({search})
    };

    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Typography id={id} variant={`h${level + 3}` as any}>
                {children}
            </Typography>
            <IconButton onClick={() => handleCopyToClipboard()} >
                <LinkIcon/>
            </IconButton>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={1500}
                onClose={handleClose}
            >
                <Alert severity="info">{t('common.copy')}</Alert>
            </Snackbar>
        </div>
    )
};
