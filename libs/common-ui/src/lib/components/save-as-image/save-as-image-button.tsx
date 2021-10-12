import React, { FC, useState } from 'react';
import { saveAs } from 'file-saver';
import DomToImage from 'dom-to-image';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

interface P {
    elementId: string;
    tooltipTitle: string;
}

export const SaveAsImageButton: FC<P> = ({ elementId, tooltipTitle }) => {
    const [loading, setLoading] = useState(false);

    const saveAsImage = async () => {
        setLoading(true);
        const element = document.getElementById(elementId);
        await DomToImage.toBlob(element)
            .then(blob => {
                saveAs(blob, 'result.png');
                setLoading(false);
            }).catch((error) => console.log(error));
    };

    return (
        <Tooltip title={tooltipTitle}>
            <IconButton
                data-test={`${elementId}-save`}
                color={'default'}
                size={'small'}
                onClick={saveAsImage}>
                {
                    loading
                    ? <CircularProgress size={21}/>
                    : <SaveAltIcon/>
                }
            </IconButton>
        </Tooltip>
    );
};
