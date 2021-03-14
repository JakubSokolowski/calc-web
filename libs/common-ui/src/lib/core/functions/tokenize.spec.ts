import { tokenize, TokenType, TranslationToken } from './tokenize';

describe('#tokenize', () => {
    it('should split translated str into normal and latex tokens', () => {
        // given
        const str = '[[sd]] digit value is [[value]], add [[valueToAdd]]';

        // when
        const result = tokenize(str);

        // then
        const expected: TranslationToken[] = [
            {
                value: 'sd',
                type: TokenType.LaTex
            },
            {
                value: ' digit value is ',
                type: TokenType.Normal
            },
            {
                value: 'value',
                type: TokenType.LaTex
            },
            {
                value: ', add ',
                type: TokenType.Normal
            },
            {
                value: 'valueToAdd',
                type: TokenType.LaTex
            }
        ];
        expect(result).toEqual(expected);
    });
});
