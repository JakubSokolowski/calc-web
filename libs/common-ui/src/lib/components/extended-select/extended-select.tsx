import React, { ChangeEvent, ReactNode } from 'react';
import { MenuItem, styled, TextField } from '@mui/material';
import type { ExtendedOption } from '../../core/models/extended-option';
import { ExtendedSelectItem } from './extended-select-item';


interface P<T> {
    value: T;
    label: ReactNode;
    onChange: (operation: T) => void;
    options: T[];
}

const PREFIX = "ExtendedSelect";

const classes = {
    select: `${PREFIX}-select`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.select}`]: {
        minWidth: '180px'
    },
}));


export const ExtendedSelect = <T extends ExtendedOption>(props: P<T> & { children?: ReactNode }) => {
    const {options, onChange, value, label, ...rest} = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const operation = options.find(o => o.type === value);
        onChange(operation);
    };

    const items = options.map((option) => {
        return (
            <MenuItem key={option.type} value={option.type} disabled={option.disallowed}>
                <ExtendedSelectItem option={option}/>
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
