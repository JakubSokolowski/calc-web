import React, { FC } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { repoUrl } from '../../../assets/env/meta';
import GitHubIcon from '@material-ui/icons/GitHub';
import { useTranslation } from 'react-i18next';


export const RepoLink: FC = () => {
    const { t } = useTranslation();

    return (
        <Tooltip title={t('appBar.repo')}>
            <IconButton href={repoUrl}>
                <GitHubIcon/>
            </IconButton>
        </Tooltip>
    );
};
