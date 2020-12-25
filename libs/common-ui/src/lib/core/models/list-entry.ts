import { ReactElement } from 'react';

export interface ListEntry {
    text: string;
    id?: string;
    key: string;
    link?: string;
    icon?: ReactElement;
}
