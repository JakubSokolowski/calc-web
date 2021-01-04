import React, { useCallback, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { useHistory, useLocation } from 'react-router-dom';
import { useMountEffect } from '@calc/utils';

declare module 'csstype' {
    interface Properties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}

export type TreeNodeProps = Omit<TreeItemProps, 'nodeId'> & {
    bgColor?: string;
    color?: string;
    labelIcon?: React.ElementType<SvgIconProps>;
    labelInfo?: string;
    labelText: string;
    path?: string;
    childNodes?: TreeNodeProps[];
};


const useTreeItemStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
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
        content: {
            color: theme.palette.text.secondary,
            paddingRight: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium,
            '$expanded > &': {
                fontWeight: theme.typography.fontWeightRegular
            }
        },
        group: {
            marginLeft: 0,
            '& $content': {
                paddingLeft: theme.spacing(2)
            }
        },
        expanded: {},
        selected: {},
        label: {
            fontWeight: 'inherit',
            color: 'inherit'
        },
        labelRoot: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0.5, 0)
        },
        labelIcon: {
            marginRight: theme.spacing(1)
        },
        labelText: {
            fontWeight: 'inherit',
            flexGrow: 1
        }
    })
);

function StyledTreeItem(props: TreeNodeProps) {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    return (
        <TreeItem
            nodeId={props.path}
            label={
                <div className={classes.labelRoot}>
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
    );
}

const useStyles = makeStyles(
    createStyles({
        root: {
            height: 264,
            flexGrow: 1,
            maxWidth: 400
        }
    })
);

interface P {
    nodes: TreeNodeProps[];
}

export function MenuTree(props: P) {
    const { nodes } = props;
    const classes = useStyles();
    const history = useHistory();
    const { pathname } = useLocation();
    const [expanded, setExpanded] = useState([]);

    const handleClick = (node: TreeNodeProps) => {
        if (node.path) {
            history.push(node.path);
        }
        const isExpanded = !!expanded.find(id => id === node.path);

        if (isExpanded) {
            setExpanded((prev) => prev.filter(id => id !== node.path));
        } else {
            setExpanded((prev) => [...prev, node.path]);
        }
    };

    useMountEffect(() => {
        if (!expanded.find(id => id === pathname)) {
            const pathFragments = pathname.split('/').filter(r => !!r);

            const subroutes = pathFragments.map((_, index) => {
                const all = pathFragments.slice(0, index + 1);
                return `/${all.join('/')}`;
            });

            setExpanded(subroutes);
        }
    });


    const renderTree = useCallback((nodes: TreeNodeProps[]) => {
        return nodes.map((node, idx) => (
            <StyledTreeItem
                key={idx}
                labelText={node.labelText}
                labelIcon={node.labelIcon}
                path={node.path}
                onClick={() => handleClick(node)}
            >
                {Array.isArray(node.childNodes) ? renderTree(node.childNodes) : null}
            </StyledTreeItem>
        ));
    }, [nodes, expanded]);


    return (
        <TreeView
            disableSelection
            className={classes.root}
            expanded={expanded}
            defaultCollapseIcon={<ArrowDropDownIcon/>}
            defaultExpandIcon={<ArrowRightIcon/>}
            defaultEndIcon={<div style={{ width: 24 }}/>}
        >
            {renderTree(nodes)}
        </TreeView>
    );
}
