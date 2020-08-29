import React, { FC, ReactNode, SyntheticEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Snackbar, TextField, TextFieldProps } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

export enum InputType {
    Text = 'text',
    Number = 'number'
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface P {
    value?: string | number;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    label?: ReactNode;
    inputType?: InputType;
    size?: 'small' | 'middle' | 'large';
}

export const InputWithCopy: FC<P> = ({ onChange, value, size, label, inputType, readOnly }) => {
    const textAreaRef = useRef(null);
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);

    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const copyToClipboard = () => {
        if (textAreaRef.current) {
            // console.log(textAreaRef.current.value);
            textAreaRef.current.select();
        }
        document.execCommand('copy');
        setOpen(true);
    };

    const handleChange = (event) => {
        if (onChange) {
            const value = event.target.value;
            onChange(value);
        }
    };

    const handleNumberChange = (value) => {
        if (onChange) {
            onChange(value);
        }
    };

    const props: TextFieldProps = {
        style: {
            flexGrow: 1
        },
        inputProps: {
            'aria-readonly': readOnly
        },
        variant: 'outlined',
        inputRef: textAreaRef,
        label,
        value: value as any,
        onChange: inputType === InputType.Number ? handleNumberChange : handleChange
    };

    return (
        <>
            <span style={{ display: 'flex', 'flexDirection': 'row' }}>
                {
                    inputType === InputType.Number
                        ? <TextField type={'number'} {...props}/>
                        : <TextField {...props}/>
                }
                {
                    document.queryCommandSupported('copy') &&
                    <div style={{ paddingLeft: '5px' }}>
                        <IconButton onClick={copyToClipboard}>
                            <FileCopyIcon/>
                        </IconButton>
                    </div>
                }
            </span>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={2000}
                      onClose={handleClose}>
                <Alert severity="info">{t('common.copy')}</Alert>
            </Snackbar>
        </>
    );
};
