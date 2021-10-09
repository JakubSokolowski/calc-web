export type TranslationErrorMessage = {
    key: string;
    options?: Record<string, any>;
}

export interface OperandInputValue {
    base: number;
    representation: string;
    index: number;
    totalNumOperands: number;
}

export type OperandValidator = (input: OperandInputValue) => TranslationErrorMessage | undefined;


