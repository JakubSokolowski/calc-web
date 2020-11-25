import React, { ChangeEvent, ReactNode } from 'react';
import { createStyles, IconButton, MenuItem, TextField, Theme, Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { makeStyles } from '@material-ui/core/styles';
import { ExtendedOption } from '../../core/models/extended-option';


interface P<T> {
    value: T;
    label: ReactNode;
    onChange: (operation: T) => void;
    operations: T[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        select: {
            minWidth: '180px'
        },
        item: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%'
        },
        spacer: {
            flexGrow: 1
        },
        infoButton: {
            cursor: 'default',
            pointerEvents: 'initial'
        }
    })
);

export const ExtendedSelect = <T extends ExtendedOption>(props: P<T> & { children?: ReactNode }) => {
    const {operations, onChange, value, label} = props;
    const classes = useStyles();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const operation = operations.find(o => o.type === value);
        onChange(operation);
    };

    const options = operations.map((option) => {
        return (
            <MenuItem key={option.type} value={option.type} disabled={option.disallowed}>
                <div className={classes.item}>
                    <div>
                        {option.type}
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
        <TextField
            id="standard-select-operation"
            select
            variant={'outlined'}
            size={'small'}
            className={classes.select}
            label={label}
            value={value.type}
            onChange={handleChange}
        >
            {options}
        </TextField>
    );
};
