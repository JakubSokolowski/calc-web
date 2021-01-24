import React from 'react';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@material-ui/icons/Home';
import BuildIcon from '@material-ui/icons/Build';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { MenuTree, TreeNodeProps } from '@calc/common-ui';


export const SiderMenu = () => {
    const { t } = useTranslation();

    const nodes: TreeNodeProps[] = [
        {
            labelText: t('routes.home'),
            path: '/',
            labelIcon: HomeIcon
        },
        {
            labelText: t('routes.tools.title'),
            path: '/tools',
            labelIcon: BuildIcon,
            childNodes: [
                {
                    labelText: t('routes.tools.positional.title'),
                    path: '/tools/positional',
                    childNodes: [
                        {
                            labelText: t('routes.tools.positional.base-converter'),
                            path: '/tools/positional/base-converter'
                        },
                        {
                            labelText: t('routes.tools.positional.associated-base-converter'),
                            path: '/tools/positional/associated-base-converter'
                        },
                        {
                            labelText: t('routes.tools.positional.complement-converter'),
                            path: '/tools/positional/complement-converter'
                        },
                        {
                            labelText: t('routes.tools.positional.positional-calculator'),
                            path: '/tools/positional/positional-calculator'
                        }
                    ]
                },
                {
                    labelText: t('routes.tools.floating.title'),
                    path: '/tools/floating',
                    childNodes: [
                        {
                            labelText: t('routes.tools.floating.float-converter'),
                            path: '/tools/floating/float-converter'
                        }
                    ]
                }
            ]
        },
        {
            labelText: t('routes.theory.title'),
            path: '/theory',
            labelIcon: MenuBookIcon,
            childNodes: [
                {
                    labelText: t('routes.theory.positional.title'),
                    path: '/theory/positional',
                    childNodes: [
                        {
                            labelText: t('routes.theory.positional.base-conversion'),
                            path: '/theory/positional/base-conversion'
                        },
                        {
                            labelText: t('routes.theory.positional.associated-base-conversion'),
                            path: '/theory/positional/associated-base-conversion'
                        },
                        {
                            labelText: t('routes.theory.positional.complement-conversion'),
                            path: '/theory/positional/complement-conversion'
                        },
                        {
                            labelText: t('routes.theory.positional.operations.title'),
                            path: '/theory/positional/operations',
                            childNodes: [
                                {
                                    labelText: t('routes.theory.positional.operations.addition'),
                                    path: '/theory/positional/operations/addition'
                                },
                                {
                                    labelText: t('routes.theory.positional.operations.subtraction'),
                                    path: '/theory/positional/operations/subtraction'
                                },
                                {
                                    labelText: t('routes.theory.positional.operations.multiplication'),
                                    path: '/theory/positional/operations/multiplication'
                                }
                            ]
                        }
                    ]
                },
                {
                    labelText: t('routes.theory.floating.title'),
                    path: '/theory/floating',
                    childNodes: []
                }
            ]
        }
    ];

    return (
        <MenuTree nodes={nodes}/>
    );
};

export default SiderMenu;

