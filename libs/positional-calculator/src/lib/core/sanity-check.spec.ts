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
    });

    describe('#kaosMonke', () => {
        itIf(χάος)('should survive addition', () => {
            // given
            const reps = 1000;

            // when
            const result = kaosMonke(OperationType.Addition, AdditionType.Default, reps);

            // then
            expect(result).toEqual([]);
        });

        itIf(χάος)('should survive subtraction', () => {
            // given
            const reps = 1000;

            // when
            const result = kaosMonke(OperationType.Subtraction, SubtractionType.Default, reps);

            // then
            expect(result).toEqual([]);
        });

        itIf(χάος)('should survive default multiplication', () => {
            // given
            const reps = 1000;

            // when
            const result = kaosMonke(OperationType.Multiplication, MultiplicationType.Default, reps);

            // then
            expect(result).toEqual([]);
        });

        itIf(χάος)('should survive multiplication with extension', () => {
            // given
            const reps = 1000;

            // when
            const result = kaosMonke(OperationType.Multiplication, MultiplicationType.WithExtension, reps);

            // then
            expect(result).toEqual([]);
        });

        itIf(χάος)('should survive multiplication without extension', () => {
            // given
            const reps = 1000;

            // when
            const result = kaosMonke(OperationType.Multiplication, MultiplicationType.WithoutExtension, reps);

            // then
            expect(result).toEqual([]);
        });

        itIf(χάος)('should survive booth multiplication', () => {
            // given
            const reps = 1000;
            const base = 2;

            // when
            const result = kaosMonke(OperationType.Multiplication, MultiplicationType.Booth, reps, base);

            // then
            expect(result).toEqual([]);
        });

        itIf(χάος)('should survive boothMcSorley multiplication', () => {
            // given
            const reps = 1000;
            const base = 2;

            // when
            const result = kaosMonke(OperationType.Multiplication, MultiplicationType.BoothMcSorley, reps, base);

            // then
            expect(result).toEqual([]);
        });

        itIf(χάος)('should survive boothMcSorley alt multiplication', () => {
            // given
            const reps = 1000;
            const base = 2;

            // when
            const result = kaosMonke(OperationType.Multiplication, MultiplicationType.BoothMcSorleyAlt, reps, base);

            // then
            expect(result).toEqual([]);
        });

        itIf(χάος)('should survive division', () => {
            // given
            const reps = 1000;

            // when
            const result = kaosMonke(OperationType.Division, DivisionType.Default, reps);

            // then
            expect(result).toEqual([]);
        });
    });
});