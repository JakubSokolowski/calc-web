import { getSlug } from '@calc/common-ui';


export const getMenuTreeNode = (label: string) => {
    return cy.getByDataTest(`node-${getSlug(label)}`).first();
};

export const nodeShouldBeSelected = (label: string) => {
    getMenuTreeNode(label).get('.MenuTreeItem-selected');
};
