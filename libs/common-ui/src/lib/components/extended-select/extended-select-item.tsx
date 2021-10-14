import { IconButton, MenuItem, styled, Tooltip } from '@mui/material';
import React from 'react';
import { ExtendedOption } from '@calc/common-ui';
import HelpIcon from '@mui/icons-material/Help';
import { useTranslation } from 'react-i18next';

interface P<T> {
    option: T;
}

const PREFIX = "ExtendedSelectItem";

const classes = {
    item: `${PREFIX}-item`,
    spacer: `${PREFIX}-spacer`,
    infoButton: `${PREFIX}-infoButton`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.item}`]: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    [`& .${classes.spacer}`]: {
        flexGrow: 1
    },
    [`& .${classes.infoButton}`]: {
        cursor: 'default',
        pointerEvents: 'initial'
    },
}));

export const ExtendedSelectItem = <T extends ExtendedOption>(props: P<T>)=> {
    const {t} = useTranslation();
    const {option} = props;
    return (
        <Root>
            <div className={classes.item}>
                <div>
                    {t(option.tKey)}
                </div>
                <div className={classes.spacer}/>
                {
                    option.disallowed &&
                    <Tooltip title={option.disallowedReason}>
                        <IconButton
                            onClick={(e) => e.stopPropagation()}
                            size={'small'}
                            className={classes.infoButton}
                            disabled={false}
                        >
                            <HelpIcon/>
                        </IconButton>
                    </Tooltip>
                }
            </div>
        </Root>
    );
}
