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
                marginTop: '20px'
            },
            rootBox: {
                minWidth: '12px',
                minHeight: '20px',
                marginBottom: '20px',
                padding: '1px 6px',
            },
            rootDigitsRow: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            },
            digitsRow: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            },
            splitMappingBox: {
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

export const SplitMapping: FC<P> = ({ mapping }) => {
    const ref = useRef<ArcherContainer>(null);
    const classes = useStyles();

    const targetDigitsSource = mapping.output;
    const rootDigitsSource = mapping.input;

    const rootDigits = rootDigitsSource.map((digit, index) => {
        return (
            <Button
                key={index}
                className={classes.rootBox}>
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
                        sourceAnchor: 'top',
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

    return (
        <div
            className={classes.splitMappingBox}
        >
            <ArcherContainer noCurves ref={ref}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    <ArcherElement id='root'>
                        <div className={classes.digitsRow}>
                            {rootDigits}
                        </div>
                    </ArcherElement>
                    <div className={classes.rootDigitsRow}>
                        {targetDigits}
                    </div>
                </div>
            </ArcherContainer>
        </div>
    );
};
