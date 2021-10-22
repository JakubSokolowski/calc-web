import { calculate, OperationParams } from './calculate';
import {
    AdditionType,
    DivisionType,
    fromStringDirect,
    MultiplicationType,
    OperationType,
    SubtractionType
} from '@calc/calc-arithmetic';
import { kaosMonke, sanityCheck } from './sanity-check';


const itIf = (condition) => condition ? it: it.skip;
const χάος = !!process.env.KAOS_MONKE;


describe('sanity-check', () => {

    describe('#sanityCheck', () => {
        it('should return proper check for binary operation that has correct binary result but wrong decimal (due to float precision loss', () => {
            // given
            const base = 2;
            const params: OperationParams = {
                operands: [
                    fromStringDirect('101010', base).result,
                    fromStringDirect('11.11', base).result
                ],
                algorithm: DivisionType.Default,
                operation: OperationType.Division,
                base
            };
            const operationResult = calculate(params).result;

            // when
            const result = sanityCheck(params, operationResult);

            // then
            const expected = false;
            expect(result.failed).toEqual(expected);
        });

        it('should return proper check for binary operation that has correct binary result but wrong decimal (due to float precision loss_ v2', () => {
            // given
            const base = 2;
            const params: OperationParams = {
                operands: [
                    fromStringDirect('0.1', base).result,
                    fromStringDirect('11010.01', base).result
                ],
                algorithm: DivisionType.Default,
                operation: OperationType.Division,
                base
            };
            const operationResult = calculate(params).result;

            // when
            const result = sanityCheck(params, operationResult);

            // then
            const expected = false;
            expect(result.failed).toEqual(expected);
        });

        it('should return proper check for decimal operation that has correct representation but wrong decimal (due to float precision loss', () => {
            // -7.9049999999999999 != -7.905
            // given
            const base = 10;
            const params: OperationParams = {
                operands: [
                    fromStringDirect('3.613', base).result,
                    fromStringDirect('11.518', base).result
                ],
                algorithm: SubtractionType.Default,
                operation: OperationType.Subtraction,
                base
            };
            const operationResult = calculate(params).result;

            // when
            const result = sanityCheck(params, operationResult);

            // then
            const expected = false;
            expect(result.failed).toEqual(expected);
        });

    });

    describe('#kaosMonke', () => {
        const reps = 3000;

        itIf(χάος)('should survive addition', () => {
            // when
            const result = kaosMonke(OperationType.Addition, AdditionType.Default, reps);

            // then
            expect(result).toEqual([]);
        });

        itIf(χάος)('should survive subtraction', () => {
            // when
            const result = kaosMonke(OperationType.Subtraction, SubtractionType.Default, reps);

            // then
            expect(result).toEqual([]);
        });

        itIf(χάος)('should survive default multiplication', () => {
            // when
            const result = kaosMonke(OperationType.Multiplication, MultiplicationType.Default, reps);

            // then
            expect(result).toEqual([]);
        });

        itIf(χάος)('should survive multiplication with extension', () => {
            // when
            const result = kaosMonke(OperationType.Multiplication, MultiplicationType.WithExtension, reps);

            // then
            expect(result).toEqual([]);
        });

        itIf(χάος)('should survive multiplication without extension', () => {
            // when
            const result = kaosMonke(OperationType.Multiplication, MultiplicationType.WithoutExtension, reps);

            // then
            expect(result).toEqual([]);
        });

        itIf(χάος)('should survive booth multiplication', () => {
            // given
            const base = 2;

            // when
            const result = kaosMonke(OperationType.Multiplication, MultiplicationType.Booth, reps, base);

            // then
            expect(result).toEqual([]);
        });

        itIf(χάος)('should survive boothMcSorley multiplication', () => {
            // given
            const base = 2;

            // when
            const result = kaosMonke(OperationType.Multiplication, MultiplicationType.BoothMcSorley, reps, base);

            // then
            expect(result).toEqual([]);
        });

        itIf(χάος)('should survive boothMcSorley alt multiplication', () => {
            // given
            const base = 2;

            // when
            const result = kaosMonke(OperationType.Multiplication, MultiplicationType.BoothMcSorleyAlt, reps, base);

            // then
            expect(result).toEqual([]);
        });

        itIf(χάος)('should survive division', () => {
            // when
            const result = kaosMonke(OperationType.Division, DivisionType.Default, reps);

            // then
            expect(result).toEqual([]);
        });
    });
});
