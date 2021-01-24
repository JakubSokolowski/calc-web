import { TreeItemProps } from '@material-ui/lab/TreeItem';
import React from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

export type TreeNode = Omit<TreeItemProps, 'nodeId'> & {
    bgColor?: string;
    color?: string;
    labelIcon?: React.ElementType<SvgIconProps>;
    labelInfo?: string;
    labelText: string;
    path?: string;
    childNodes?: TreeNode[];
};
