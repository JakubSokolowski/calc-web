import React, { FC, useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { List, Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import { ContentsEntry } from '../../core/models/contents-entry';
import { useHistory } from 'react-router-dom';

const SPY_INTERVAL = 100;

interface SpyItem extends ContentsEntry {
    inView: boolean;
    element: HTMLElement;
}

interface P {
    entries: ContentsEntry[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        active: {
            color: theme.palette.text.secondary,
            borderLeft: `2px solid ${theme.palette.text.secondary}`,
            cursor: 'pointer'
        },
        normal: {
            color: theme.palette.text.primary,
            cursor: 'pointer'
        },
        container: {
            listStyleType: 'none',
            right: theme.spacing(2),
            position: 'fixed',
            display: 'block',
            width: '250px',
            [theme.breakpoints.down('lg')]: {
                display: 'none'
            }
        }
    }),
);

export const ScrollSpy: FC<P> = ({entries}) => {
    const [items, setItems] = useState<SpyItem[]>([]);
    const history = useHistory();
    const classes = useStyles();

    const offset= 20;
    const headerHeight = 64;

    useEffect(() => {
        const timer = window.setInterval(spy, SPY_INTERVAL);
        return () => window.clearInterval(timer);
    });

    const spy = () => {
        const items: SpyItem[] = entries
            .reduce((all, entry) => {
                const element =  document.getElementById(entry.id);
                if(!element) return all;
                const item: SpyItem = {
                    inView: isInView(element),
                    element,
                    ...entry
                };
                return [...all, item]
            }, []);

        const firstTrueItem = items.find(item => !!item && item.inView);

        if (!firstTrueItem) return;

        const update = items.map(item => {
            return { ...item, inView: item === firstTrueItem };
        });

        setItems(update);
    };

    const isInView = (element: HTMLElement) => {
        if (!element) {
            return false;
        }
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 - offset && rect.bottom <= window.innerHeight + offset;
    };

    const scrollTo = (element: HTMLElement) => {
        const y = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({top: y, behavior: 'auto'});
    };

    return (
        <ul className={classes.container}>
            {items.map((item, k) => {
                return (
                    <List
                        style={{ paddingLeft: 2 + (item.inView ? 0 : 2) + item.level * 15}}
                        className={item.inView ? classes.active : classes.normal}
                        key={k}
                        onClick={() => {
                            const search = `?h=${item.id}`;
                            history.push({search});
                            scrollTo(item.element);
                        }}
                    >
                       {item.element.innerText}
                    </List>
                );
            })}
        </ul>
    );
};
