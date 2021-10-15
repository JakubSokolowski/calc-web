import { calculate, OperationParams } from './calculate';
import { DivisionType, fromStringDirect, OperationType } from '@calc/calc-arithmetic';
import { sanityCheck } from './sanity-check';


describe('sanity-check', () => {

    describe('#sanityCheck', () => {
       it('should return proper check for binary operation that has correct binary result but wrong decimal (due to float precision loss', () => {
            // given
           const base = 2;
           const params: OperationParams<DivisionType.Default> = {
               operands: [
                    fromStringDirect("101010", base).result,
                    fromStringDirect("11.11", base).result,
               ],
               algorithm: {
                   operandValidators: [],
                   tKey: "operations.division.default",
                   type: DivisionType.Default
               },
               operation: {
                   maxOperands: 2,
                   minOperands: 2,
                   tKey: "operations.division.title",
                   type: OperationType.Division  ,
               },
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
});
