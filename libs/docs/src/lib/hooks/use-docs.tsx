import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { environment } from '@calc/env';
import { Language } from '@calc/i18n';

async function fetchDocFromPath(path: string, langKeySuffix: string): Promise<Response> {
    const fileName = path.split('/').pop();
    const prefix = `${environment.deployUrl}/assets/docs`;
    const start = path.startsWith('/') ? path.substr(1) : path;
    const url = `${prefix}/${start}/${fileName}_${langKeySuffix}.md`;

    return fetch(url)
}
async function checkForError(response: Response): Promise<string> {
    const text = await response.text();

    if (response.status >= 200 && response.status <= 299 && !!text) {
        return text;
    } else {
        throw Error(response.statusText);
    }
}

export const useDocs = (path: string, fallbackLanguage: string = Language.pl): [string | null, boolean, string | null] => {
    const [doc, setDoc] = useState<string>(null);
    const [error, setError] = useState<string>(null);
    const [isFallback, setIsFallback] = useState(false);
    const { i18n } = useTranslation();
    const errorMessage = 'Failed to load doc';

    useEffect(() => {
        fetchDocFromPath(path, i18n.language)
            .then(checkForError)
            .then((mdDoc) => {
                setError(null);
                setIsFallback(false);
                setDoc(mdDoc);
            })
            .catch(async () => {
                try {
                    const response = await fetchDocFromPath(path, fallbackLanguage);
                    const mdDoc: string = await checkForError(response);
                    setDoc(mdDoc);
                    setIsFallback(true)
                } catch (e) {
                    setError(errorMessage);
                }
            });
    }, [i18n.language, path, fallbackLanguage]);

    return [doc, isFallback, error];
};
