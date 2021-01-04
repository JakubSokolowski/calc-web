import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { DocPage } from '../doc-page/doc-page';
import { RendererMapping } from '../../core/models/renderer';

interface P {
    mapping: RendererMapping;
}

export const DocRoute: FC<P> = ({ mapping }) => {
    const { pathname } = useLocation();

    return (
        <div style={{ marginRight: 200 }}>
            <div style={{ display: 'flex', margin: 'auto', maxWidth: '700px' }}>
                <DocPage rendererMapping={mapping} path={pathname.replace('/theory/', '')}/>
            </div>
        </div>
    );
};
