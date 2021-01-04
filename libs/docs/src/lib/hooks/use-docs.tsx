import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { environment } from '@calc/env';

export const useDocs = (path: string): string | null => {
    const [doc, setDoc] = useState<string>(null);
    const { i18n } = useTranslation();

    useEffect(() => {
        const fileName = path.split('/').pop();
        const prefix = `${environment.deployUrl}/assets/docs`;
        const languageKeySuffix = i18n.language;
        const start = path.startsWith('/') ? path.substr(1) : path;

        const url = `${prefix}/${start}/${fileName}_${languageKeySuffix}.md`;
        const errorMessage = 'Failed to load doc';

        fetch(url)
            .then((response) => response.text())
            .then((mdDoc) => {
                setDoc(mdDoc);
            })
            .catch((err) => {
                console.log(err);
                setDoc(errorMessage);
            });
    }, [i18n.language, path]);

    return doc;
};
