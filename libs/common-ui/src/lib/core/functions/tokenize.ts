
export enum TokenType {
    Normal = 'normal',
    LaTex = 'latex'
}

export interface TranslationToken {
    value: string;
    type: TokenType;
}

const tokenRegex = /\[\[(.*?)]]/gm;


export function tokenize(translatedStr: string): TranslationToken[] {
    const latexTokens = getLatexTokens(translatedStr);
    const allTokens =  translatedStr.split(tokenRegex).filter(t => !!t);

    return allTokens.map((token) => {
        const tokenType = latexTokens.includes(token)
            ? TokenType.LaTex
            : TokenType.Normal;
        return {
            value: token,
            type: tokenType
        }
    })
}

function getLatexTokens(translatedStr: string): string[] {
    const latexTokens = translatedStr.match(tokenRegex);
    if(!latexTokens) return [];
    return latexTokens.map(stripTokenMarks);
}

function stripTokenMarks(token: string): string {
    return token
        .replace('[[','')
        .replace(']]', '');
}
