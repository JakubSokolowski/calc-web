import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { environment } from '@calc/env';


export const useDocs = (path: string): string | null => {
    const [doc, setDoc] = useState<string>(null);
    const { i18n } = useTranslation();

    const fileName = path.split('/').pop();
    const prefix = `${environment.deployUrl}/assets/docs`;
    const languageKeySuffix = i18n.language;

    const url = `${prefix}/${path}/${fileName}_${languageKeySuffix}.md`;

    useEffect(() => {
        fetch(url)
            .then((response) => response.text())
            .then((mdDoc) => {
                setDoc(mdDoc);
            });
    });

    return doc;
};
