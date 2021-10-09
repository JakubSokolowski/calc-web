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

