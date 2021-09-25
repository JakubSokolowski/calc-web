export enum OperationType {
    Addition = 'Addition',
    Subtraction = 'Subtraction',
    Multiplication = 'Multiplication',
    Division = 'Division'
}


export interface Operation {
    type: OperationType;
    minOperands: number;
    maxOperands: number;
    tKey: string;
}

export const allOperations: Operation[] = [
    {
        type: OperationType.Addition,
        maxOperands: 10,
        minOperands: 2,
        tKey: 'operations.addition.title'
    },
    {
        type: OperationType.Subtraction,
        minOperands: 2,
        maxOperands: 2,
        tKey: 'operations.subtraction.title'
    },
    {
        type: OperationType.Multiplication,
        minOperands: 2,
        maxOperands: 2,
        tKey: 'operations.multiplication.title'
    },
    {
        type: OperationType.Division,
        minOperands: 2,
        maxOperands: 2,
        tKey: 'operations.division.title'
    }
];
