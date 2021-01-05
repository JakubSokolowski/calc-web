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
        await DomToImage.toBlob(document.getElementById(elementId))
            .then(blob => {
                saveAs(blob, 'result.png');
            }).catch((error) => console.log(error));
    };

    return (
        <Tooltip title={tooltipTitle}>
            <IconButton
                color={'default'}
                size={'small'}
                onClick={saveAsImage}>
                <SaveAltIcon/>
            </IconButton>
        </Tooltip>
    );
};
