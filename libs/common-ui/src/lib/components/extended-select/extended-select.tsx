import React, { ChangeEvent, ReactNode } from 'react';
import { IconButton, MenuItem, styled, TextField, Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import type { ExtendedOption } from '../../core/models/extended-option';
import { useTranslation } from 'react-i18next';


interface P<T> {
    value: T;
    label: ReactNode;
    onChange: (operation: T) => void;
    options: T[];
}

const PREFIX = "ExtendedSelect";

const classes = {
    select: `${PREFIX}-select`,
    item: `${PREFIX}-item`,
    spacer: `${PREFIX}-spacer`,
    infoButton: `${PREFIX}-infoButton`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.select}`]: {
        minWidth: '180px'
    },

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


export const ExtendedSelect = <T extends ExtendedOption>(props: P<T> & { children?: ReactNode }) => {
    const {t} = useTranslation();
    const {options, onChange, value, label, ...rest} = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const operation = options.find(o => o.type === value);
        onChange(operation);
    };

    const items = options.map((option) => {
        return (
            <MenuItem key={option.type} value={option.type} disabled={option.disallowed}>
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
            </MenuItem>
        );
    });

    return (
        <Root>
            <TextField
                id="standard-select-operation"
                select
                variant={'outlined'}
                size={'small'}
                className={classes.select}
                label={label}
                value={value.type}
                onChange={handleChange}
                {...rest}
            >
                {items}
            </TextField>
        </Root>
    );
};
