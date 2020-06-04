import { fromString } from '../..';
import { chunks } from '@calc/utils';

const Buffer = require('buffer/').Buffer;

export enum FloatProperty {
    Normalized,
    Denormalized,
    PositiveInfinity,
    NegativeInfinity,
    PositiveZero,
    NegativeZero,
    NAN
}

export class FloatConverter {
    public static ToSingle(val: number | string): SingleRepresentation {
        const str =
            typeof val === 'number' ? this.SingleToBinaryString(val) : val;
        return new SingleRepresentation(str);
    }

    public static ToDouble(val: number | string): DoubleRepresentation {
        const str =
            typeof val === 'number' ? this.DoubleToBinaryString(val) : val;
        return new DoubleRepresentation(str);
    }

    public static DoubleToBinaryString(d: number): string {
        const buffer = new ArrayBuffer(8);
        const doubleView = new Float64Array(buffer);
        const intView = new Int32Array(buffer);
        doubleView[0] = d;
        let low = (intView[0] >>> 0).toString(2);
        let high = (intView[1] >>> 0).toString(2);
        low = low.padStart(32, '0');
        high = high.padStart(32, '0');
        return high + low;
    }

    public static BinaryStringToDouble(s: string): number {
        const low = Number.parseInt(s.substr(0, 32), 2);
        const high = Number.parseInt(s.substr(32), 2);
        const buffer = new Buffer(8);
        buffer.writeInt32BE(low, 0);
        buffer.writeInt32BE(high, 4);
        return buffer.readDoubleBE(0);
    }

    public static SingleToBinaryString(f: number): string {
        const buffer = new ArrayBuffer(4);
        const intView = new Int32Array(buffer);
        const floatView = new Float32Array(buffer);
        floatView[0] = f;
        return (intView[0] >>> 0).toString(2).padStart(32, '0');
    }

    public static BinaryStringToSingle(s: string): number {
        const byteChunks = chunks(s.split(''), 8)
            .map((chunk) => chunk.join(''));

        let offset = 0;
        const buffer = new Buffer(4);
        byteChunks.forEach((byteStr) => {
            let byte = Number.parseInt(byteStr, 2);
            if (byte > 127) byte -= 256;
            buffer.writeInt8(byte, offset);
            offset += 1;
        });

        return buffer.readFloatBE(0);
    }

    public static getProperty(
        representation: FloatingRepresentation
    ): FloatProperty {
        if (this.isPositiveZero(representation)) {
            return FloatProperty.PositiveZero;
        }
        if (this.isNegativeZero(representation)) {
            return FloatProperty.NegativeZero;
        }
        if (this.isPositiveInfinity(representation)) {
            return FloatProperty.PositiveInfinity;
        }
        if (this.isNegativeInfinity(representation)) {
            return FloatProperty.NegativeInfinity;
        }
        if (this.isDenormalized(representation)) {
            return FloatProperty.Denormalized;
        }
        if (this.IsNAN(representation)) {
            return FloatProperty.NAN;
        }
        return FloatProperty.Normalized;
    }

    public static isPositiveZero(
        representation: FloatingRepresentation
    ): boolean {
        return (
            representation.sign === '0' &&
            /^0*$/.test(representation.exponent) &&
            /^0*$/.test(representation.mantissa)
        );
    }

    public static isNegativeZero(
        representation: FloatingRepresentation
    ): boolean {
        return (
            representation.sign === '1' &&
            /^0*$/.test(representation.exponent) &&
            /^0*$/.test(representation.mantissa)
        );
    }

    public static isDenormalized(
        representation: FloatingRepresentation
    ): boolean {
        return (
            /^0*$/.test(representation.exponent) &&
            !/^0*$/.test(representation.mantissa)
        );
    }

    public static isPositiveInfinity(
        representation: FloatingRepresentation
    ): boolean {
        return (
            representation.sign === '0' &&
            /^1*$/.test(representation.exponent) &&
            /^0*$/.test(representation.mantissa)
        );
    }

    public static isNegativeInfinity(
        representation: FloatingRepresentation
    ): boolean {
        return (
            representation.sign === '1' &&
            /^1*$/.test(representation.exponent) &&
            /^0*$/.test(representation.mantissa)
        );
    }

    public static IsNAN(representation: FloatingRepresentation): boolean {
        return (
            /^1*$/.test(representation.exponent) &&
            !/^0*$/.test(representation.mantissa)
        );
    }
}

export abstract class FloatingRepresentation {
    public exponentLength = 8;
    public mantissaLength = 23;
    public binaryLength = 32;
    public bias = 127;
    public binary = '';

    abstract get value(): number;

    abstract get sign(): string;

    abstract get exponent(): string;

    abstract get mantissa(): string;

    abstract get exponentEncoding(): number;

    abstract get mantissaEncoding(): number;

    abstract get exponentValue(): number;

    abstract get mantissaValue(): number;
}

export class SingleRepresentation extends FloatingRepresentation {
    constructor(str: string) {
        super();
        this.binary = str;
    }

    get value() {
        return FloatConverter.BinaryStringToSingle(this.binary);
    }

    get sign() {
        return this.binary[0];
    }

    get signEncoding() {
        return this.binary[0];
    }

    get signValue() {
        return this.binary[0] === '0' ? '+1' : '-1';
    }

    get exponent() {
        return this.binary.substr(1, this.exponentLength);
    }

    get mantissa() {
        return this.binary.substr(1 + this.exponentLength, this.mantissaLength);
    }

    get exponentEncoding() {
        return Number.parseInt(this.exponent, 2);
    }

    get mantissaEncoding() {
        return Number.parseInt('0' + this.mantissa, 2);
    }

    get exponentValue() {
        return this.exponentEncoding - this.bias;
    }

    get mantissaValue() {
        return fromString(
            '1.' + this.mantissa,
            2,
            10
        ).result.decimalValue.toNumber();
    }
}

export class DoubleRepresentation extends SingleRepresentation {
    public exponentLength = 11;
    public mantissaLength = 52;
    public binaryLength = 64;
    public bias = 1023;

    get value() {
        return FloatConverter.BinaryStringToDouble(this.binary);
    }
}
