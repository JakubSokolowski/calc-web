import React, { FC } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { IconButton, Tooltip } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

interface P {
    elementId: string;
    tooltipTitle: string;
}

export const SaveAsImageButton: FC<P> = ({ elementId, tooltipTitle }) => {
    const saveAsImage = async () => {
        await domtoimage
            .toBlob(document.getElementById(elementId))
            .then(function(blob) {
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
