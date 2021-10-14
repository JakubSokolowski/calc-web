import React, { useCallback, useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useHistory, useLocation } from 'react-router-dom';
import { useMountEffect } from '@calc/utils';
import { TreeNode } from '../../core/models/tree-node';
import { StyledTreeItem } from './menu-tree-item';
import { styled } from '@mui/material';


const PREFIX = 'Menutree';

const classes = {
    root: `${PREFIX}-root`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.root}`]: {
        height: 264,
        flexGrow: 1,
        maxWidth: 400
    },
}));

interface P {
    nodes: TreeNode[];
}

export function MenuTree(props: P) {
    const { nodes } = props;
    const history = useHistory();
    const { pathname } = useLocation();
    const [expanded, setExpanded] = useState([]);

    const handleClick = useCallback((node: TreeNode) => {
        if (node.path) {
            history.push(node.path);
        }
        const isExpanded = !!expanded.find(id => id === node.path);

        if (isExpanded) {
            setExpanded((prev) => prev.filter(id => id !== node.path));
        } else {
            setExpanded((prev) => [...prev, node.path]);
        }
    }, [expanded, history]);

    useMountEffect(() => {
        if (!expanded.find(id => id === pathname)) {
            const pathFragments = pathname.split('/').filter(r => !!r);

            const subRoutes = pathFragments.map((_, index) => {
                const all = pathFragments.slice(0, index + 1);
                return `/${all.join('/')}`;
            });

            setExpanded(subRoutes);
        }
    });


    const renderTree = useCallback((nodes: TreeNode[]) => {
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
    }, [handleClick]);


    return (
        <Root>
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
        </Root>
    );
}
