import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Button, Popover } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppTheme } from '../../store/selectors/options.selectors';
import { AppTheme } from '@calc/ui';
import { setTheme } from '../../store/actions/options.actions';

export const ThemeMenu: FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const currentTheme = useSelector(selectAppTheme);

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = async (theme) => {
        if (theme && theme !== currentTheme) {
            dispatch(setTheme(theme))
        }
    };

    const availableThemes = [AppTheme.Dark, AppTheme.Light];

    const options = availableThemes.map((theme, index) => {
        const isChosenTheme = theme === currentTheme;
        return (
            <div key={index}>
                <Button
                    className="user-menu-button"
                    data-theme={theme}
                    onClick={(async () => {
                        await handleClick(theme);
                    })}
                >
                    {theme}
                </Button>
                {isChosenTheme && <Badge/>}
            </div>
        );
    });

    return (
        <div style={{marginRight: '10px'}}>
            <Popover
                style={{ padding: '0px' }}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                title={t('languageMenu.choose')}>
                <div style={{ marginLeft: '-10px' }}>
                    {options}
                </div>
            </Popover>
            <Button aria-describedby={id} variant="contained" color="default" onClick={handlePopoverClick}>
                {currentTheme}
            </Button>
        </div>
    );
};
