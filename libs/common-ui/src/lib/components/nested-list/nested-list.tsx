import React, { FC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useHistory } from 'react-router-dom';
import { ListEntry } from '../../core/models/list-entry';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper
        },
        nested: {
            paddingLeft: theme.spacing(4)
        }
    })
);

interface P {
    items: ListEntry[];
    header: ListEntry;
}

export const NestedList: FC<P> = ({ items, header }) => {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const entries = items.map((item) => {
        const { link, text, key } = item;
        return (
            <ListItem className={classes.nested} button key={key} onClick={() => history.push(link)}>
                <ListItemText primary={text}/>
            </ListItem>
        );
    });

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            <ListItem key='expand-nested' button onClick={handleClick}>
                <ListItemText primary={header.text}/>
                {
                    !!items.length ?
                        <>{open ? <ExpandLess/> : <ExpandMore/>}</>
                    : null
                }
            </ListItem>
            <Collapse in={open} timeout="auto">
                <List component="div" disablePadding>
                    {entries}
                </List>
            </Collapse>
        </List>
    );
};
