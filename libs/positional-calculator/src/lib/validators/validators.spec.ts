import { OperandInputValue, OperandValidator, TranslationErrorMessage } from '@calc/calc-arithmetic';
import { isDivisorZero, validateOperand } from './validators';


describe('#validators', () => {
    describe('#validateOperand', () => {
        const notBinary: OperandValidator = (input) => {
            if (input.base === 2) {
                return {
                    key: 'binaryBad'
                };
            }
        };

        const shorterThan5: OperandValidator = (input) => {
            if (input.representation.length >= 5) {
                return {
                    key: 'longBad'
                };
            }
        };

        it('should return first error reported by validators', () => {
            // given
            const validators: OperandValidator[] = [
                notBinary, shorterThan5
            ];

            const input: OperandInputValue = {
                representation: '111000',
                base: 2,
                index: 0,
                totalNumOperands: 1
            };

            // when
            const err = validateOperand(validators, input);

            // then
            const expected: TranslationErrorMessage = {
                key: 'binaryBad'
            };
            expect(err).toEqual(expected);
        });

        it('should return undefined when validators do not report any errors', () => {
            // given
            const validators: OperandValidator[] = [
                notBinary, shorterThan5
            ];

            const input: OperandInputValue = {
                representation: '10',
                base: 10,
                index: 0,
                totalNumOperands: 1
            };

            // when
            const err = validateOperand(validators, input);

            // then
            const expected = undefined;
            expect(err).toEqual(expected);
        });
    });

    describe('#isDivisorZero', () => {
        it('should return error when last operand is 0', () => {
            // given
            const input: OperandInputValue = {
                representation: '0',
                base: 10,
                index: 1,
                totalNumOperands: 2
            };

            // when
            const err = isDivisorZero(input);

            // then
            expect(err).toBeDefined();
        });

        it('should return undefined when last operand is not 0', () => {
            // given
            const input: OperandInputValue = {
                representation: '21',
                base: 10,
                index: 1,
                totalNumOperands: 2
            };

            // when
            const err = isDivisorZero(input);

            // then
            expect(err).toBeUndefined();
        });
    });
});
