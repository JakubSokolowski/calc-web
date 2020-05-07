import BigNumber from 'bignumber.js';
import { fromNumber, StandardBaseConverter } from './base-converter';

describe('StandardBaseConverter fromNumber tests', () => {
    const BaseConverter = new StandardBaseConverter();

    it('converts positive floating base 10 to base 2', () => {
        const input = new BigNumber(25.5);
        const radix = 2;
        const expected = '11001.1';
        const expectedComplement = '(0)11001.1';
        const result = BaseConverter.fromNumber(input, radix).result;
        expect(result.valueInBase).toEqual(expected);
        expect(result.complement.toString()).toEqual(expectedComplement);
    });
    it('converts negative floating base 10 to base 2', () => {
        const input = new BigNumber(-25.5);
        const radix = 2;
        const expected = '-11001.1';
        const expectedComplement = '(1)00110.1';
        const result = BaseConverter.fromNumber(input, radix).result;
        expect(result.valueInBase).toEqual(expected);
        expect(result.complement.toString()).toEqual(expectedComplement);
    });
    it('converts positive base 10 to base 16', () => {
        const input = new BigNumber(255);
        const radix = 16;
        const expected = 'FF';
        const expectedComplement = '(0)FF';
        const result = BaseConverter.fromNumber(input, radix).result;
        expect(result.valueInBase).toEqual(expected);
        expect(result.complement.toString()).toEqual(expectedComplement);
    });
    it('converts positive floating base 10 to base 16', () => {
        const input = new BigNumber(255.5);
        const radix = 16;
        const expected = 'FF.8';
        const expectedComplement = '(0)FF.8';
        const result = BaseConverter.fromNumber(input, radix).result;
        expect(result.valueInBase).toEqual(expected);
        expect(result.complement.toString()).toEqual(expectedComplement);
    });
    it('converts positive floating base 10 to base 2 from number', () => {
        const input = 25.5;
        const radix = 2;
        const expected = '11001.1';
        const expectedComplement = '(0)11001.1';
        const result = BaseConverter.fromNumber(input, radix).result;
        expect(result.valueInBase).toEqual(expected);
        expect(result.complement.toString()).toEqual(expectedComplement);
    });
});
describe('StandardBaseConverter fromString tests', () => {
    const BaseConverter = new StandardBaseConverter();
    it('converts positive base 2 integer to base 10', () => {
        const input = '11001';
        const inputRadix = 2;
        const outputRadix = 10;
        const expected = new BigNumber(25);
        const expectedComplement = '(0)25';
        const result = BaseConverter.fromString(input, inputRadix, outputRadix)
            .result;
        expect(result.valueInBase).toEqual(expected.toString());
        expect(result.complement.toString()).toEqual(expectedComplement);
    });
    it('converts negative base 2 integer to base 10', () => {
        const input = '-11001';
        const inputRadix = 2;
        const outputRadix = 10;
        const expected = new BigNumber(-25);
        const expectedComplement = '(9)75';
        const result = BaseConverter.fromString(input, inputRadix, outputRadix)
            .result;
        expect(result.valueInBase).toEqual(expected.toString());
        expect(result.complement.toString()).toEqual(expectedComplement);
    });
    it('converts positive floating base 2 to base 10', () => {
        const input = '11001.1';
        const inputRadix = 2;
        const outputRadix = 10;
        const expected = new BigNumber(25.5);
        const expectedComplement = '(0)25.5';
        const result = BaseConverter.fromString(input, inputRadix, outputRadix)
            .result;
        expect(result.valueInBase).toEqual(expected.toString());
        expect(result.complement.toString()).toEqual(expectedComplement);
    });
    it('converts negative floating base 2 to base 10', () => {
        const input = '-11001.1';
        const inputRadix = 2;
        const outputRadix = 10;
        const expected = new BigNumber(-25.5);
        const expectedComplement = '(9)74.5';
        const result = BaseConverter.fromString(input, inputRadix, outputRadix)
            .result;
        expect(result.valueInBase).toEqual(expected.toString());
        expect(result.complement.toString()).toEqual(expectedComplement);
    });
    it('converts positive floating base 16 to base 10', () => {
        const input = 'FF.8';
        const inputRadix = 16;
        const outputRadix = 10;
        const expected = new BigNumber(255.5);
        const expectedComplement = '(0)255.5';
        const result = BaseConverter.fromString(input, inputRadix, outputRadix)
            .result;
        expect(result.valueInBase).toEqual(expected.toString());
        expect(result.complement.toString()).toEqual(expectedComplement);
    });
    it('converts negative floating base 16 to base 10', () => {
        const input = '-FF.8';
        const inputRadix = 16;
        const outputRadix = 10;
        const expected = new BigNumber(-255.5);
        const expectedComplement = '(9)744.5';
        const result = BaseConverter.fromString(input, inputRadix, outputRadix)
            .result;
        expect(result.valueInBase).toEqual(expected.toString());
        expect(result.complement.toString()).toEqual(expectedComplement);
    });
    it('converts positive floating base 2 to base 8', () => {
        const input = '11001.1';
        const inputRadix = 2;
        const outputRadix = 8;
        const expected = new BigNumber(25.5);
        const expectedValueStr = '31.4';
        const conv = BaseConverter.fromString(input, inputRadix, outputRadix);
        const result = conv.result;
        expect(result.decimalValue).toEqual(expected);
        expect(result.valueInBase).toEqual(expectedValueStr);
        expect(true).toBeTruthy();
    });
    it('throws error if repStr does match input radix', () => {
        const input = '-FF8.923';
        const inputRadix = 10;
        const outputRadix = 16;
        expect(() => {
            BaseConverter.fromString(input, inputRadix, outputRadix);
        }).toThrow();
    });
});

describe('fromNumber tests', () => {
    it('converts number with variable precision', () => {
        const input = new BigNumber(25.5);
        const radix = 2;
        const expected = '11001.1';
        const expectedComplement = '(0)11001.1';
        const result = fromNumber(input, radix).result;
        expect(result.valueInBase).toEqual(expected);
        expect(result.complement.toString()).toEqual(expectedComplement);
    });
    it('converts number using StandardBaseConverter', () => {
        const input = new BigNumber(25.5);
        const radix = 2;
        const expected = '11001.1';
        const expectedComplement = '(0)11001.1';
        const result = fromNumber(input, radix).result;
        expect(result.valueInBase).toEqual(expected);
        expect(result.complement.toString()).toEqual(expectedComplement);
    });
    it('converts number with variable precision', () => {
        const input = new BigNumber(25.5);
        const radix = 2;
        const expected = '11001.1';
        const expectedComplement = '(0)11001.1';
        const result = fromNumber(input, radix).result;
        expect(result.valueInBase).toEqual(expected);
        expect(result.complement.toString()).toEqual(expectedComplement);
    });
});
