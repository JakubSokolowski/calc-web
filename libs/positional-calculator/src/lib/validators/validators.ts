import {
    fromStringDirect,
    isValidComplementOrRepresentationStr,
    OperandInputValue,
    OperandValidator,
    TranslationErrorMessage
} from '@calc/calc-arithmetic';


export const isDivisorZero: OperandValidator = (input) => {
    const { totalNumOperands, index, representation, base } = input;
    if (totalNumOperands !== 2) return undefined;
    if (index !== 1) return undefined;
    if (isValidComplementOrRepresentationStr(representation, base)) {
        const num = fromStringDirect(representation, base).result;
        if (num.toNumber() === 0) {
            return {
                key: 'operations.division.divisionByZero'
            };
        }
    }
};

export const representationValidator: OperandValidator = (input: OperandInputValue) => {
    const { representation, base } = input;
    if (!isValidComplementOrRepresentationStr(representation, base)) {
        return {
            key: 'baseConverter.wrongRepresentationStr',
            options: { base }
        };
    }
};

export function validateOperand(validators: OperandValidator[], input: OperandInputValue): TranslationErrorMessage | undefined {
    for (const validator of validators) {
        const err = validator(input);
        if (err) return err;
    }
    return undefined;
}
