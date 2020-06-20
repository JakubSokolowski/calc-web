import { Digit, fromNumber } from '@calc/calc-arithmetic';

describe('representation', () => {
   describe('PositionalNumber', () => {
       describe('toDigitsList', () => {
          it('should correctly convert to list of digits', () => {
              // given
              const {result} = fromNumber(123, 10);

              const expected: Digit[] = [
                  {
                      valueInDecimal: 1,
                      valueInBase: '1',
                      base: 10,
                      position: 2
                  },
                  {
                      valueInDecimal: 2,
                      valueInBase: '2',
                      base: 10,
                      position: 1
                  },
                  {
                      valueInDecimal: 3,
                      valueInBase: '3',
                      base: 10,
                      position: 0
                  }
              ];


              // when
              const digits = result.toDigitsList();

              // then
              expect(digits).toEqual(expected);
          });

           it('should correctly convert to list of digits when number has fractional part', () => {
               // given
               const {result} = fromNumber(123.45, 10);

               const expected: Digit[] = [
                   {
                       valueInDecimal: 1,
                       valueInBase: '1',
                       base: 10,
                       position: 2
                   },
                   {
                       valueInDecimal: 2,
                       valueInBase: '2',
                       base: 10,
                       position: 1
                   },
                   {
                       valueInDecimal: 3,
                       valueInBase: '3',
                       base: 10,
                       position: 0
                   },
                   {
                       valueInDecimal: 4,
                       valueInBase: '4',
                       base: 10,
                       position: -1
                   },
                   {
                       valueInDecimal: 5,
                       valueInBase: '5',
                       base: 10,
                       position: -2
                   }
               ];


               // when
               const digits = result.toDigitsList();

               // then
               expect(digits).toEqual(expected);
           })
       });
   });
});
