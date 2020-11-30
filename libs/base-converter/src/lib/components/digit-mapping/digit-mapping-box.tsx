import React, { FC, useEffect, useRef } from 'react';
import { DigitMapping } from '@calc/calc-arithmetic';
import { ArcherContainer, ArcherElement } from 'react-archer';
import { Button, createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface P {
    mapping: DigitMapping;
}

export const useStyles = makeStyles((theme: Theme) => {
    return createStyles(
        {
            digitBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '12px',
                minHeight: '20px',
                padding: '1px 6px',
                marginBottom: '20px'
            },
            reversedDigitBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '12px',
                minHeight: '20px',
                marginBottom: '-20px',
                padding: '1px 6px'
            },
            rootDigitsRow: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                paddingBottom: theme.spacing(2),
            },
            digitsRow: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            },
            mappingsBox: {
                display: 'flex',
                justifyContent: 'center',
                padding: '5px'
            },
            mappingsBoxBorder: {
                display: 'flex',
                justifyContent: 'center',
                padding: '5px',
                borderLeft: ' 1px solid #d9d9d9'
            }
        }
    );
});

export const DigitMappingBox: FC<P> = ({ mapping }) => {
    const ref = useRef<ArcherContainer>(null);
    const classes = useStyles();

    const targetDigitsSource = mapping.input.length < mapping.output.length
        ? mapping.output
        : mapping.input;

    const rootDigitsSource = mapping.input.length < mapping.output.length
        ? mapping.input
        : mapping.output;

    const rootDigits = rootDigitsSource.map((digit, index) => {
        return (
            <Button key={index} className={mapping.input.length >= mapping.output.length ? classes.reversedDigitBox : classes.digitBox}>
                {digit.representationInBase}
            </Button>
        );
    });

    useEffect(() => {
        if (ref.current) {
            ref.current.forceUpdate();
        }
    }, [mapping]);

    const targetDigits = targetDigitsSource.map((digit, index) => {
        return (
            <ArcherElement
                key={`$output-${index}`}
                id={`$output-${index}`}
                relations={[
                    {
                        targetId: 'root',
                        targetAnchor: 'middle',
                        sourceAnchor:  mapping.input.length < mapping.output.length ? 'top' : 'bottom',
                        style: {
                            strokeColor: '#d9d9d9',
                            strokeWidth: 2,
                            strokeDasharray: '3,3',
                            arrowLength: 0,
                            arrowThickness: 0
                        }
                    }
                ]}
            >
                <Button key={index} className={classes.digitBox}>
                    {digit.representationInBase}
                </Button>
            </ArcherElement>
        );
    });

    const target = (
        <div className={classes.rootDigitsRow}>
            {targetDigits}
        </div>
    );

    const root = (
        <ArcherElement id='root'>
            <div className={classes.digitsRow}>
                {rootDigits}
            </div>
        </ArcherElement>
    );

    const first = mapping.input.length < mapping.output.length ? root : target;
    const second = mapping.input.length < mapping.output.length ? target: root;

    return (
        <div
            className={classes.mappingsBox}
        >
            <ArcherContainer noCurves ref={ref}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    {first}
                    {second}
                </div>
            </ArcherContainer>
        </div>
    );
};
