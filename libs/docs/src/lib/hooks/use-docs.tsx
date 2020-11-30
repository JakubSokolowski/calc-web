import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { environment } from '@calc/env';
import { useMountEffect } from '@calc/utils';

export const useDocs = (path: string): string | null => {
    const [doc, setDoc] = useState<string>(null);
    const { i18n } = useTranslation();

    const fileName = path.split('/').pop();
    const prefix = `${environment.deployUrl}/assets/docs`;
    const languageKeySuffix = i18n.language;

    const url = `${prefix}/${path}/${fileName}_${languageKeySuffix}.md`;
    const errorMessage = 'Failed to load doc';

    useMountEffect(() => {
        fetch(url)
            .then((response) => response.text())
            .then((mdDoc) => {
                setDoc(mdDoc);
            })
            .catch((err) => {
                console.log(err);
                setDoc(errorMessage);
            });
    });

    return doc;
};
