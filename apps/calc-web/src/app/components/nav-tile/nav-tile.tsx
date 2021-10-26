import React, { FC } from 'react';
import { Box, Card, CardActionArea, CardContent, styled, Typography } from '@mui/material';
import { HoverOperationGrid, PaddedGrid } from '@calc/grid';
import { Link } from 'react-router-dom';

const PREFIX = "NavTile";

const classes = {
    root: `${PREFIX}-root`,
    title: `${PREFIX}-title`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.root}`]: {
        maxWidth: 400,
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),

    },
    [`& .${classes.title}`]: {
        wordSpacing: '100vw'
    },
}));

export interface NavTileProps {
    route: string;
    title: string;
    subtitle: string;
    grid?: HoverOperationGrid;
    'data-test'?: string;
}

export const NavTile: FC<NavTileProps> = ({route, title, subtitle, grid, ...rest}) => {
    return (
        <Root>
            <Card className={classes.root} {...rest}>
                <CardActionArea component={Link} to={route} style={{ textDecoration: 'none' }}>
                    <Box sx={{display: 'flex'}}>
                        <CardContent>
                            <Typography gutterBottom component={'div'} className={classes.title} variant={'h5'}>
                                {title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {subtitle}
                            </Typography>
                        </CardContent>
                        {
                            grid &&
                            <Box>
                                <PaddedGrid
                                    id={route}
                                    desiredWidth={6}
                                    {...grid}
                                    groups={[]}
                                />
                            </Box>
                        }
                    </Box>
                </CardActionArea>
            </Card>
        </Root>
    );
};
