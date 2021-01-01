import React, { FC } from 'react';
import { createStyles, Divider, IconButton, Link, Popover, Theme, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import { useTranslation } from 'react-i18next';
import { Version } from './version/version';


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        icon: {
            paddingTop: theme.spacing(2),
            position: 'fixed',
            bottom: theme.spacing(3),
            right: theme.spacing(3)
        },
        content: {
            padding: theme.spacing(2)
        },
        tooltip: {
            fontSize: theme.typography.fontSize
        }
    });
});


export const About: FC = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <div>
            <Tooltip className={classes.tooltip} title={t('about.title')} aria-describedby={id} placement={'left'}>
                <IconButton className={classes.icon} onClick={handleClick}>
                    <HelpIcon fontSize={'large'}/>
                </IconButton>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
            >
                <div>
                    <div className={classes.content}>
                        <Link color={'inherit'} href={'https://github.com/JakubSokolowski/calc-web/issues/new'}>
                            {t('about.submitNewIssue')}
                        </Link>
                    </div>
                    <Divider/>
                    <Version/>
                </div>
            </Popover>
        </div>
    );
};
