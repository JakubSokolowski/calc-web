import { ExtendedOption } from '@calc/ui';

export enum OperationType {
    Addition = 'Addition',
    Subtraction = 'Subtraction',
    Multiplication = 'Multiplication',
    Division = 'Division'
}


export interface Operation extends ExtendedOption{
    type: OperationType;
    minOperands: number;
    maxOperands: number;
}

export const allOperations: Operation[] = [
    {
        type: OperationType.Addition,
        maxOperands: 10,
        minOperands: 2,
    },
    {
        type: OperationType.Subtraction,
        minOperands: 2,
        maxOperands: 2,
        disallowed: true,
        disallowedReason: 'Not implemented'
    },
    {
        type: OperationType.Multiplication,
        maxOperands: 2,
        minOperands: 2,
    },
];
