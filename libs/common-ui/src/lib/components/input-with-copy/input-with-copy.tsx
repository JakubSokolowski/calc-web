import React, { CSSProperties, FC, ReactNode, SyntheticEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, IconButton, Snackbar, TextField, TextFieldProps, Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import makeStyles from '@mui/styles/makeStyles';
import { copyToClipboard } from '../../core/functions/copy-to-clipboard';

export enum InputType {
    Text = 'text',
    Number = 'number'
}

interface P {
    value?: string | number;
    id?: string;
    name?: string;
    onValueChange?: (value: string) => void;
    onChange?: (event) => void;
    readOnly?: boolean;
    label?: ReactNode;
    error?: boolean;
    disabled?: boolean;
    helperText?: string;
    inputType?: InputType;
    style?: CSSProperties;
    className?: string;
    size?: 'small' | 'medium';
    dataTest?: string;
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        row: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center'
        },
        copyButton: {
            paddingLeft: theme.spacing(1)
        }
    });
});


export const InputWithCopy: FC<P> = ({ onValueChange, onChange, disabled, style, className, value, id, name, size, error, helperText, label, inputType, readOnly, dataTest }) => {
    const textAreaRef = useRef(null);
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleCopyToClipboard = () => {
        if (textAreaRef.current) {
            copyToClipboard(textAreaRef.current.value);
            setOpen(true);
        }
    };


    const handleChange = (event) => {
        if (onValueChange) {
            const value = event.target.value;
            onValueChange(value);
        }

        if (onChange) onChange(event);
    };

    const handleNumberChange = (value) => {
        if (onValueChange) {
            onValueChange(value);
        }
    };

    const props: TextFieldProps = {
        error,
        id,
        name,
        disabled,
        size,
        helperText,
        style: {
            ...style,
            flexGrow: 1
        },
        inputProps: {
            'aria-readonly': readOnly
        },
        variant: 'outlined',
        inputRef: textAreaRef,
        label,
        value,
        onChange: inputType === InputType.Number ? handleNumberChange : handleChange,
    };

    return (
        <div className={className}>
            <span className={classes.row}>
                {
                    inputType === InputType.Number
                        ? <TextField type={'number'} {...props} data-test={dataTest}/>
                        : <TextField {...props} data-test={dataTest}/>
                }
                {
                    <div className={classes.copyButton}>
                        <IconButton size={size} onClick={handleCopyToClipboard}>
                            <FileCopyIcon/>
                        </IconButton>
                    </div>
                }
            </span>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={1500}
                onClose={handleClose}
            >
                <Alert severity="info">{t('common.copy')}</Alert>
            </Snackbar>
        </div>
    );
};
