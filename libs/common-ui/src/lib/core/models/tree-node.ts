import { TreeItemProps } from '@mui/lab/TreeItem';
import React from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';

export type TreeNode = Omit<TreeItemProps, 'nodeId'> & {
    bgColor?: string;
    color?: string;
    labelIcon?: React.ElementType<SvgIconProps>;
    labelInfo?: string;
    labelText: string;
    path?: string;
    childNodes?: TreeNode[];
};
