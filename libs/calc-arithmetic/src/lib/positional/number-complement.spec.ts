import { Digit } from '../models';
import { NumberComplement } from './number-complement';


describe('NumberComplement', () => {
    const base = 10;
    let digitsMock: Digit[];
    let integerPartMock: Digit[];
    let fractionPartMock: Digit[];

    beforeEach(() => {
        integerPartMock = [
            { base, valueInDecimal: 0, representationInBase: '(0)', position: 3, isComplementExtension: true },
            { base, valueInDecimal: 1, representationInBase: '1', position: 2 },
            { base, valueInDecimal: 2, representationInBase: '2', position: 1 },
            { base, valueInDecimal: 3, representationInBase: '3', position: 0 }
        ];

        fractionPartMock = [
            { base, valueInDecimal: 4, representationInBase: '4', position: -1 },
            { base, valueInDecimal: 5, representationInBase: '5', position: -2 }
        ];

        digitsMock = [
            ...integerPartMock,
            ...fractionPartMock
        ];
    });

    describe('#base', () => {
        it('#base should return proper base', () => {
            // given
            const complement = new NumberComplement([...digitsMock]);

            // when
            const result = complement.base();

            // then
            expect(result).toEqual(base);
        });
    });

    describe('#isNegative', () => {
        it('should return  when complement is positive', () => {
            // given
            const complement = new NumberComplement(digitsMock);

            // when
            const result = complement.isNegative();

            // then
            expect(result).toBeFalsy();
        });

        it('should return true when complement is negative', () => {
            // given
            const digits: Digit[] = [
                {
                    position: 3,
                    isComplementExtension: true,
                    valueInDecimal: 9,
                    base,
                    representationInBase: '9'
                },
                ...digitsMock.slice(1)
            ];
            const complement = new NumberComplement(digits, );

            // then

            expect(complement.isNegative()).toBeTruthy();
        });
    });

    describe('#fractionPartDigits', () => {
        it('should return fraction part digits when number has fraction part', () => {
            // given
            const complement = new NumberComplement(digitsMock);

            // when
            const result = complement.fractionPartDigits();

            // then
            expect(result).toEqual(fractionPartMock);
        });

        it('should return an empty array number has no fraction part', () => {
            // given
            const complement = new NumberComplement(integerPartMock);

            // when
            const result = complement.fractionPartDigits();

            // then
            expect(result).toEqual([]);
        });
    });

    describe('#numFractionPartDigits', () => {
        it('should return num of fraction digits', () => {
            // given
            const complement = new NumberComplement(digitsMock);

            // when
            const result = complement.numFractionPartDigits();

            // then
            expect(result).toEqual(2);
        });
    });

    describe('#fractionPartStr', () => {
        it('should return fraction part digits as string when number has fraction part', () => {
            // given
            const complement = new NumberComplement(digitsMock);

            // when
            const result = complement.fractionPartStr();

            // then
            expect(result).toEqual('45');
        });

        it('should return an empty str when number has no fraction part', () => {
            // given
            const complement = new NumberComplement(integerPartMock);

            // when
            const result = complement.fractionPartStr();

            // then
            expect(result).toEqual('');
        });
    });

    describe('#numIntegerPartDigits', () => {
        it('should return num of integer digits', () => {
            // given
            const complement = new NumberComplement(digitsMock);

            // when
            const result = complement.numIntegerPartDigits();

            // then
            expect(result).toEqual(4);
        });
    });

    describe('#integerPartDigits', () => {
        it('should return integer part digits when number has integer part', () => {
            // given
            const complement = new NumberComplement(digitsMock);

            // when
            const result = complement.integerPartDigits();

            // then
            expect(result).toEqual(integerPartMock);
        });

        it('should return an array with zero digit when number has no integer part', () => {
            // given
            const zero: Digit = {
                position: 0,
                isComplementExtension: true,
                valueInDecimal: 0,
                base,
                representationInBase: '0'
            };
            const digits: Digit[] = [zero, ...fractionPartMock];
            const complement = new NumberComplement(digits);

            // when
            const result = complement.integerPartDigits();

            // then
            expect(result).toEqual([zero]);
        });
    });

    describe('#integerPartStr', () => {
        it('should return integer part digits as string when number has integer part', () => {
            // given
            const complement = new NumberComplement(digitsMock);

            // when
            const result = complement.integerPartStr();

            // then
            expect(result).toEqual('(0)123');
        });

        it('should return str with 0 when number has no integer part', () => {
            // given
            const zero: Digit = {
                position: 0,
                isComplementExtension: true,
                valueInDecimal: 0,
                base,
                representationInBase: '(0)'
            };
            const digits: Digit[] = [zero, ...fractionPartMock];
            const complement = new NumberComplement(digits);

            // when
            const result = complement.integerPartStr();

            // then
            expect(result).toEqual('(0)');
        });
    });

    describe('#leastSignificantPosition', () => {
       it('should return rightmost fraction digit position when number has fraction part', () => {
           // given
           const complement = new NumberComplement(digitsMock);

           // when
           const result = complement.leastSignificantPosition();

           // then
           expect(result).toEqual(-2);
       });

        it('should return 0 when number has no fraction part', () => {
            // given
            const complement = new NumberComplement(integerPartMock);

            // when
            const result = complement.leastSignificantPosition();

            // then
            expect(result).toEqual(0);
        });
    });

    describe('#mostSignificantPosition', () => {
        it('should return leftmost integer digit position when number has integer part (including complement)', () => {
            // given
            const complement = new NumberComplement(digitsMock);

            // when
            const result = complement.mostSignificantPosition();

            // then
            expect(result).toEqual(3);
        });

        it('should return leftmost integer digit position without complement extension digit when withExtension is set to false ', () => {
            // given
            const complement = new NumberComplement(digitsMock);

            // when
            const result = complement.mostSignificantPosition(false);

            // then
            expect(result).toEqual(2);
        });

        it('should return 0 when number has no integer part', () => {
            // given
            const zero: Digit = {
                position: 0,
                isComplementExtension: true,
                valueInDecimal: 0,
                base,
                representationInBase: '0'
            };
            const digits: Digit[] = [zero, ...fractionPartMock];
            const complement = new NumberComplement(digits);

            // when
            const result = complement.mostSignificantPosition();

            // then
            expect(result).toEqual(0);
        });
    });

    describe('#toString', () => {
       it('should return string representing all digits', () => {
           // given
           const complement = new NumberComplement(digitsMock);

           // when
           const result = complement.toString();

           // then
           expect(result).toEqual('(0)123.45');
       })
    });

    describe('#asDigits', () => {
        it('should return all complement digits', () => {
            // given
            const complement = new NumberComplement(digitsMock);

            // when
            const result = complement.asDigits();

            // then
            expect(result).toEqual(digitsMock);
        });
    });

    describe('#numDigits', () => {
        it('should num of all digits representing number', () => {
            // given
            const complement = new NumberComplement(digitsMock);

            // when
            const result = complement.numDigits();

            // then
            expect(result).toEqual(digitsMock.length);
        });

        it('should num same length as fraction and integer part together', () => {
            // given
            const complement = new NumberComplement(digitsMock);

            // when
            const result = complement.numDigits();
            const partsResult = complement.numIntegerPartDigits() + complement.numFractionPartDigits();

            // then
            expect(result).toEqual(partsResult);
        });
    });

    describe('#extensionStr', () => {
        it('should return string representing complement extension', () => {
            // given
            const complement = new NumberComplement(digitsMock);

            // when
            const result = complement.extensionStr();

            // then
            expect(result).toEqual('(0)');
        })
    });
});
