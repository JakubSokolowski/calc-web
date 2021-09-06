import React, { FC, useEffect, useState } from 'react';
import { IconButton, ListItem, ListItemProps, ListItemSecondaryAction, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import {
    BaseDigits,
    isValidComplementOrRepresentationStr,
} from '@calc/calc-arithmetic';

interface P extends ListItemProps {
    representationStr: string;
    base: number;
    index: number;
    onRemove: (index: number) => void;
    onRepresentationChange?: (representationStr: string, index: number, valid: boolean) => void;
    dataTest?: string;
}

export const OperandInput: FC<P> = ({ representationStr, onRepresentationChange, base, index, onRemove, dataTest, ...rest }) => {
    const { t } = useTranslation();
    const [representation, setRepresentation] = useState(representationStr);
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        if(!BaseDigits.isValidBase(base)) return;
        const validateValueStr = (valueStr: string, inputBase: number): string | undefined => {
            if (!isValidComplementOrRepresentationStr(valueStr, inputBase)) {
                return t(
                    'baseConverter.wrongRepresentationStr',
                    { base: inputBase }
                );
            }
        };
        const err = !!validateValueStr(representation, base);
        setError(validateValueStr(representation, base));
        onRepresentationChange(representation, index, !err);
        // WARNING: adding all deps here MAY cause infinite loop in
        // tests for components that use this component, so if the
        // CI test step for some reason is stuck this may be it.
        // This is probably because that the onRepresentationChange
        // may be an anonymous function, and those cannot be compared
        // The deps will be added by automatically by lint--fix,
        // so use it with caution
    }, [base, representation]);


    return (
        <ListItem disableGutters={true} {...rest as any}>
            <TextField
                data-test={dataTest || 'operand-input'}
                label={<div>X<sub>{index}</sub></div>}
                size={'small'}
                error={!!error}
                name={'representation'}
                helperText={error}
                style={{ width: '90%' }}
                variant={'outlined'}
                onChange={(e) => setRepresentation(e.target.value)}
                value={representation}
            />
            <div style={{ width: '20px' }}/>
            <ListItemSecondaryAction>
                <IconButton onClick={() => onRemove(index)}>
                    <CloseIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
