import React, { FC } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { repoUrl } from '../../../assets/env/meta';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTranslation } from 'react-i18next';


export const RepoLink: FC = () => {
    const { t } = useTranslation();

    return (
        <Tooltip title={t('appBar.repo')}>
            <IconButton href={repoUrl} size="large">
                <GitHubIcon/>
            </IconButton>
        </Tooltip>
    );
};
