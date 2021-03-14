import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';
import { tokenize, TokenType } from '../../core/functions/tokenize';
import { InlineMath } from '../math/inline-math';

interface TP {
    tKey: string;
    values: Record<string, string>;
}

export const TranslationWithLatex: FC<TP> = ({tKey, values}) => {
    const {t} = useTranslation();
    const translated = t(tKey);

    const tokens = tokenize(translated).map((token, index) => {
        switch (token.type) {
            case TokenType.Normal:
                return (
                    <span key={index}>{token.value}</span>
                );
            case TokenType.LaTex:
                return (
                    <InlineMath key={index} math={values[token.value]}/>
                );
            default:
                return null
        }
    });

    return (
        <span>
           {tokens}
       </span>
    )
};


