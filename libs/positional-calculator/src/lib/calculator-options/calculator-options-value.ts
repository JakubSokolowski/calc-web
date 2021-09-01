import { DndOperand } from '../operand-list/operand-list';
import { Operation, OperationAlgorithm } from '@calc/calc-arithmetic';

export interface CalculatorOptionsValue {
    base: number;
    operands: DndOperand[];
    operation: Operation;
    algorithm: OperationAlgorithm;
}
