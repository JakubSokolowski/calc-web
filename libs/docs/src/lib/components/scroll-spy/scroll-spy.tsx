import React, { FC, useEffect, useState } from 'react';

import './scroll-spy.scss';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';
import { ContentsEntry } from '../../core/models/contents-entry';

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
        }
    }),
);

export const ScrollSpy: FC<P> = ({entries}) => {
    const [items, setItems] = useState<SpyItem[]>([]);
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
        window.scrollTo({top: y, behavior: 'smooth'});
    };

    return (
        <ul className='scroll-spy-container'>
            {items.map((item, k) => {
                return (
                    <li
                        style={{ paddingLeft: 2 + (item.inView ? 0 : 2) + item.level * 15}}
                        className={item.inView ? classes.active : classes.normal}
                        key={k}
                        onClick={() => {
                            scrollTo(item.element);
                        }}
                    >
                       {item.element.innerText}
                    </li>
                );
            })}
        </ul>
    );
};
