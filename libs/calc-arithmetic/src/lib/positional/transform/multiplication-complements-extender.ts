import { Digit } from '../../models';
import { OperandsTransform } from './operands-transform';
import { mostSignificantPosition } from '../digits';
import { extendComplement } from '../complement-extension';
import { isDigitNegativeComplement } from '../complement-converter';
import { IncrementalLeftShift } from './shift-and-extend';

export class MultiplicationComplementsExtender<T extends Digit> implements OperandsTransform<T> {
    private readonly incrementalLeftShift: boolean;
    private readonly countZerosToMSP: boolean;

    constructor(incrementalLeftShift = false, countZerosToMSP = false) {
        this.incrementalLeftShift = incrementalLeftShift;
        this.countZerosToMSP = countZerosToMSP;
    }

    transform(operands: T[][]): T[][] {
        const someNegative = this.someOperandsNegative(operands);
        const globalMostSignificant = this.mostSignificant(operands, someNegative);
        const maxPositionAfterExtend = globalMostSignificant + operands.length;
        const maybeShifted = this.maybeShift(operands);

        return this.extendComplementsToPosition(maybeShifted, maxPositionAfterExtend);
    }

    private maybeShift(operands: T[][]) {
        return this.incrementalLeftShift
            ? new IncrementalLeftShift<T>().transform(operands)
            : operands;
    }

    private mostSignificant(operands: T[][], someNegative: boolean) {
        const msps = operands.map(digits => {
            if (this.shouldSkipZerosForMSPConsideration(someNegative, digits)) {
                return digits[1].position;
            }
            return mostSignificantPosition(digits);
        });

        return Math.max(...msps);
    }

    private shouldSkipZerosForMSPConsideration(someNegative: boolean, digits: T[]) {
        return !this.countZerosToMSP && someNegative && digits[0].valueInDecimal === 0;
    }

    private extendComplementsToPosition(complements: T[][], maxPositionAfterExtend: number) {
        const numRows = complements.length;

        return complements.map((complement, index) => {
            return this.extendComplementToPosition(complement, numRows, index, maxPositionAfterExtend);
        });
    }

    protected extendComplementToPosition(complement: T[], numRows: number, rowIndex: number, position: number): T[] {
        const msp = complement[0].position;
        const normalExtensionForRow = numRows - rowIndex - 1;
        const mspAfterNormalExtension = msp + normalExtensionForRow;
        const actualPositionDifference = position - mspAfterNormalExtension;
        const numPositionsToExtend = normalExtensionForRow + actualPositionDifference;
        return extendComplement(complement, numPositionsToExtend);
    }

    private someOperandsNegative(operands: T[][]): boolean {
        return operands.some(row => isDigitNegativeComplement(row[0]));
    }


}
