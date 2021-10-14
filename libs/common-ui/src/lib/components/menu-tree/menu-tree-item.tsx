import { styled } from '@mui/material/styles';
import { TreeNode } from '@calc/common-ui';
import TreeItem from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
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
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            color: 'var(--tree-view-color)'
        },
        '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
            backgroundColor: 'transparent'
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
                nodeId={props.path}
                label={
                    <div className={classes.labelRoot}>
                        {LabelIcon && <LabelIcon color="inherit" className={classes.labelIcon}/>}
                        <Typography data-test="menu-tree-label" variant="body2" className={classes.labelText}>
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
