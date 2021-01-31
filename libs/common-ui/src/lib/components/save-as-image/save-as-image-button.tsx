import React, { FC } from 'react';
import { saveAs } from 'file-saver';
import DomToImage from 'dom-to-image'
import { IconButton, Tooltip } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

interface P {
    elementId: string;
    tooltipTitle: string;
}

export const SaveAsImageButton: FC<P> = ({ elementId, tooltipTitle }) => {
    const saveAsImage = async () => {
        const element = document.getElementById(elementId);
        await DomToImage.toBlob(element)
            .then(blob => {
                saveAs(blob, 'result.png');
            }).catch((error) => console.log(error));
    };

    return (
        <Tooltip title={tooltipTitle}>
            <IconButton
                data-test={`${elementId}-save`}
                color={'default'}
                size={'small'}
                onClick={saveAsImage}>
                <SaveAltIcon/>
            </IconButton>
        </Tooltip>
    );
};
