import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';

export const useConverterStyles = makeStyles((theme: Theme) => {
    return createStyles(
        {
            root: {
                [theme.breakpoints.up('lg')]: {
                    maxWidth: 900
                },
                margin: 'auto'
            },
            card: {
                padding: theme.spacing(3)
            },
            input: {
                paddingBottom: theme.spacing(2)
            },
            mappings: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            },
            row: {
                display: 'flex',
                flexDirection: 'row',
                [theme.breakpoints.down('sm')]: {
                    width: '100%'
                },
                [theme.breakpoints.up('md')]: {
                    width: '70%'
                }
            },
            inputBase: {
                width: '20%'
            },
            outputBase: {
                width: '20%'
            },
            precision: {
                width:'10%'
            },
            horizontalSpacer: {
                [theme.breakpoints.down('md')]: {
                    width: theme.spacing(3)
                },
                [theme.breakpoints.up('lg')]: {
                    width: theme.spacing(5)
                }
            },
            verticalSpacer: {
                [theme.breakpoints.down('md')]: {
                    width: theme.spacing(1)
                },
                [theme.breakpoints.up('lg')]: {
                    width: theme.spacing(2)
                }
            },
            title: {
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(2)
            },
            equation: {
                paddingBottom: theme.spacing(2)
            },
            panel: {
                paddingTop: theme.spacing(2),
            }
        }
    );
});
