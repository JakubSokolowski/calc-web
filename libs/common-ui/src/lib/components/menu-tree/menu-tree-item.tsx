import { styled } from '@mui/material/styles';
import { getSlug } from '../../core/functions/slug';
import TreeItem from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import { TreeNode } from '../../core/models/tree-node';
import React from 'react';

declare module 'react' {
    interface CSSProperties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}
const PREFIX = 'MenuTreeItem';
const classes = {
    root: `${PREFIX}-root`,
    content: `${PREFIX}-content`,
    group: `${PREFIX}-group`,
    expanded: `${PREFIX}-expanded`,
    selected: `${PREFIX}-selected`,
    label: `${PREFIX}-label`,
    labelRoot: `${PREFIX}-labelRoot`,
    labelIcon: `${PREFIX}-labelIcon`,
    labelText: `${PREFIX}-labelText`
};
const Root = styled('div')(({ theme }) => ({
    [`& .${classes.root}`]: {
        color: theme.palette.text.secondary,
        '&:hover > $content': {
            backgroundColor: theme.palette.action.hover
        },
        '&:focus > $content, &$selected > $content': {
            color: 'var(--tree-view-color)'
        },
        '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
        }
    },
    [`& .${classes.content}`]: {
        color: theme.palette.text.secondary,
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular
        }
    },
    [`& .${classes.group}`]: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2)
        }
    },
    [`& .${classes.expanded}`]: {},
    [`& .${classes.selected}`]: {},
    [`& .${classes.label}`]: {
        fontWeight: 'inherit',
        color: 'inherit'
    },
    [`& .${classes.labelRoot}`]: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0)
    },
    [`& .${classes.labelIcon}`]: {
        marginRight: theme.spacing(1)
    },
    [`& .${classes.labelText}`]: {
        fontWeight: 'inherit',
        flexGrow: 1
    }
}));

export function StyledTreeItem(props: TreeNode) {
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    return (
        <Root>
            <TreeItem
                aria-selected={'true'}
                nodeId={props.path}
                label={
                    <div data-test={`node-${getSlug(props.labelText)}`} className={classes.labelRoot}>
                        {LabelIcon && <LabelIcon color="inherit" className={classes.labelIcon}/>}
                        <Typography variant="body2" className={classes.labelText}>
                            {labelText}
                        </Typography>
                        <Typography variant="caption" color="inherit">
                            {labelInfo}
                        </Typography>
                    </div>
                }
                style={{
                    '--tree-view-color': color,
                    '--tree-view-bg-color': bgColor
                }}
                classes={{
                    root: classes.root,
                    content: classes.content,
                    expanded: classes.expanded,
                    selected: classes.selected,
                    group: classes.group,
                    label: classes.label
                }}
                {...other}
            />
        </Root>
    );
}
