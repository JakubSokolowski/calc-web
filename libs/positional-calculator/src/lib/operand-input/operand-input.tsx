import React, { FC, useEffect, useState } from 'react';
import { IconButton, ListItem, ListItemProps, ListItemSecondaryAction, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import {
    BaseDigits, fromNumber, fromStringDirect,
    OperandInputValue,
    OperandValidator
} from '@calc/calc-arithmetic';
import { representationValidator, validateOperand } from '../validators/validators';

interface P extends ListItemProps {
    representationStr: string;
    base: number;
    index: number;
    numOperands: number;
    validators?: OperandValidator[];
    onRemove: (index: number) => void;
    onRepresentationChange?: (representationStr: string, index: number, valid: boolean) => void;
    dataTest?: string;
}

function getPlaceholder(base: number) {
    const decimalValue = -123;
    if(!BaseDigits.isValidBase(base)) return fromNumber(decimalValue, 10);
    return fromNumber(decimalValue, base)
}

export const OperandInput: FC<P> = ({ representationStr, onRepresentationChange, base, index, onRemove, dataTest, numOperands, validators, ...rest }) => {
    const { t } = useTranslation();
    const [representation, setRepresentation] = useState(representationStr);
    const [error, setError] = useState<string | undefined>();
    const placeholderNumber = getPlaceholder(base);

    useEffect(() => {
        if (!BaseDigits.isValidBase(base)) return;
        const baseValidators: OperandValidator[] = [representationValidator];
        const input: OperandInputValue = {
            base,
            representation,
            index,
            totalNumOperands: numOperands
        };
        const err = validateOperand([...baseValidators, ...(validators || [])], input);

        if (err) {
            const { key, options } = err;
            setError(t(key, options));
        } else {
            setError(undefined);
        }

        onRepresentationChange(representation, index, !err);
        // WARNING: adding all deps here MAY cause infinite loop in
        // tests for components that use this component, so if the
        // CI test step for some reason is stuck this may be it.
        // This is probably because that the onRepresentationChange
        // may be an anonymous function, and those cannot be compared
        // The deps will be added by automatically by lint--fix,
        // so use it with caution
    }, [base, representation, index, validators]);


    return (
        <ListItem disableGutters={true} {...rest as any}>
            <TextField
                placeholder={
                    t(
                        'common.inputPlaceholder',
                        {
                            'representation': placeholderNumber.toString(),
                            'complement': placeholderNumber.complement.toString()
                        }
                    )
                }
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
                <IconButton onClick={() => onRemove(index)} size="large">
                    <CloseIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
