import { BaseDigits } from './base-digits';
import { Digit } from '@calc/calc-arithmetic';

describe('base-digits', () => {
    describe('#getRepresentation', () => {
        describe('when base is smaller than 36', () => {
            it('returns proper digit for value 10 in hexadecimal', () => {
                expect(BaseDigits.getRepresentation(10, 16)).toBe('A');
            });

            it('throws error, if requested digit is greater than base', () => {
                expect(() => {
                    BaseDigits.getRepresentation(16, 10);
                }).toThrow();
            });
        });

        describe('when base is greater than 36', () => {
            it('returns proper digit for value 10 in base 64', () => {
                expect(BaseDigits.getRepresentation(10, 64)).toBe('10');
            });

            it('adds zero before sub-10 digits in base 64', () => {
                expect(BaseDigits.getRepresentation(8, 64)).toBe('08');
            });

            it('returns proper digit for value 63 in base 64', () => {
                expect(BaseDigits.getRepresentation(63, 64)).toBe('63');
            });

            it('throws error, if requested digit is equal to base', () => {
                expect(() => {
                    BaseDigits.getRepresentation(64, 64);
                }).toThrow();
            });

            it('throws error, if requested digit is greater than base', () => {
                expect(() => {
                    BaseDigits.getRepresentation(65, 64);
                }).toThrow();
            });

            it('returns proper digits after base change from 10 to 64', () => {
                expect(BaseDigits.getRepresentation(9, 10)).toBe('9');
                expect(BaseDigits.getRepresentation(63, 64)).toBe('63');
            });

            it('throws when base is invalid', () => {
                expect(() => {
                    BaseDigits.getRepresentation(10, 100);
                }).toThrow();
            });
        });

        describe('when the digit is a complement', () => {
            it('should return proper complement digit whe value is 0', () => {
                expect(BaseDigits.getRepresentation(0, 16, true)).toBe('(0)');
            });

            it('should return proper complement digit whe value is -1', () => {
                expect(BaseDigits.getRepresentation(-1, 16, true)).toBe('(F)');
            });
        })
    });

    describe('#getValue', () => {
        it('returns proper value for digit "A" in base 16', () => {
            expect(BaseDigits.getValue('A', 16)).toBe(10);
        });

        it('returns proper value for digit "10" in base 64', () => {
            expect(BaseDigits.getValue('10', 64)).toBe(10);
        });

        it('returns undefined if requested value is not in object', () => {
            expect(BaseDigits.getValue('AAA', 10)).toBe(-1);
        });

        it('returns undefined if requested value is equal to base (not in object)', () => {
            expect(BaseDigits.getValue('10', 10)).toBe(-1);
        });

        it('throws when base is invalid', () => {
            expect(() => {
                BaseDigits.getValue('10', 100);
            }).toThrow();
        });
    });

    describe('#getDigit', () => {
        it('returns proper digit for negative complement extension', () => {
            // given
            const base = 10;
            const valueInDecimal = 9;
            const position = 1;
            const isComplementExtension = true;

            // when
            const result = BaseDigits.getDigit(valueInDecimal, base, position, isComplementExtension);

            // then
            const expected : Digit = {
                base,
                representationInBase: '(9)',
                position,
                isComplementExtension,
                valueInDecimal
            };
            expect(result).toEqual(expected);
        });
    });

    describe('#isValidBase', () => {
        it('returns false when number is not a integer', () => {
            // given
            const base = 12.5;

            // when
            const result = BaseDigits.isValidBase(base);

            // then
            const expected = false;
            expect(result).toEqual(expected);
        });

        it('returns false when number is smaller than MIN_BASE', () => {
            // given
            const base = 1;

            // when
            const result = BaseDigits.isValidBase(base);

            // then
            const expected = false;
            expect(result).toEqual(expected);
        });

        it('returns false when number is greater than MAX_BASE', () => {
            // given
            const base = 100;

            // when
            const result = BaseDigits.isValidBase(base);

            // then
            const expected = false;
            expect(result).toEqual(expected);
        });

        it('returns false when number is an integer between MIN_BASE and MAX_BASE inclusive', () => {
            // given
            const base = 16;

            // when
            const result = BaseDigits.isValidBase(base);

            // then
            const expected = true;
            expect(result).toEqual(expected);
        });
    });

    describe('#getAllPossibleBasesForAssociateConversion', () => {
        it('should return all possible options for target base, that are larger than input base', () => {
            // given
            const base = 2;

            // when
            const possibleBases = BaseDigits.getAllPossibleBasesForAssociateConversion(base);

            // then
            const expected = [4, 8, 16, 32, 64];
            expect(possibleBases).toEqual(expected);
        });

        it('should return all possible options for target base, that are larger than input base', () => {
            // given
            const base = 16;

            // when
            const possibleBases = BaseDigits.getAllPossibleBasesForAssociateConversion(base);

            // then
            const expected = [2, 4];
            expect(possibleBases).toEqual(expected);
        });

        it('should return empty array when there are no possible associated bases', () => {
            // given
            const base = 12;

            // when
            const possibleBases = BaseDigits.getAllPossibleBasesForAssociateConversion(base);

            // then
            const expected = [];
            expect(possibleBases).toEqual(expected);
        });

        it('should return empty array when base is not valid', () => {
            // given
            const base = 1;

            // when
            const possibleBases = BaseDigits.getAllPossibleBasesForAssociateConversion(base);

            // then
            const expected = [];
            expect(possibleBases).toEqual(expected);
        });
    });

    describe('#canConvertUsingAssociateBaseMethod', () => {
        it('should return true when target base is a nth integer root of input base', () => {
            // given
            const inputBase = 3;
            const outputBase = 9;

            // when
            const result = BaseDigits.canConvertUsingAssociateBaseMethod(inputBase, outputBase);

            // then
            expect(result).toBeTruthy()
        });

        it('should return true when target base is a nth exponent root of input base', () => {
            // given
            const inputBase = 4;
            const outputBase = 64;

            // when
            const result = BaseDigits.canConvertUsingAssociateBaseMethod(inputBase, outputBase);

            // then
            expect(result).toBeTruthy()
        });

        it('should return true when target base is not a nth root or nth exponent', () => {
            // given
            const inputBase = 4;
            const outputBase = 10;

            // when
            const result = BaseDigits.canConvertUsingAssociateBaseMethod(inputBase, outputBase);

            // then
            expect(result).toBeFalsy()
        });
    });
});

