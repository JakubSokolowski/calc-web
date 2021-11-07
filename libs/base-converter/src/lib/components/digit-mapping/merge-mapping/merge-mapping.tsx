import React, { FC, useEffect, useRef } from 'react';
import { DigitMapping, digitsToStr } from '@calc/calc-arithmetic';
import { ArcherContainer, ArcherElement } from 'react-archer';
import { Button, styled } from '@mui/material';

interface P {
    mapping: DigitMapping;
}

const PREFIX = 'MergeMapping';

const classes = {
    digitBox: `${PREFIX}-digitBox`,
    rootBox: `${PREFIX}-rootBox`,
    rootDigitsRow: `${PREFIX}-rootDigitsRow`,
    digitsRow: `${PREFIX}-digitsRow`,
    mergeMappingBox: `${PREFIX}-mergeMappingBox`,
    mappingsBoxBorder: `${PREFIX}-mappingsBoxBorder`
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.digitBox}`]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '12px',
        minHeight: '20px',
        marginTop:'20px',
        padding: '1px 6px',
        color: theme.palette.text.primary,
    },
    [`& .${classes.rootBox}`]: {
        minWidth: '12px',
        minHeight: '20px',
        padding: '1px 6px',
        color: theme.palette.text.primary,
    },
    [`& .${classes.rootDigitsRow}`]: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: theme.spacing(2),
    },
    [`& .${classes.digitsRow}`]: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    [`& .${classes.mergeMappingBox}`]: {
        display: 'flex',
        justifyContent: 'center',
        padding: '5px'
    },
    [`& .${classes.mappingsBoxBorder}`]: {
        display: 'flex',
        justifyContent: 'center',
        padding: '5px',
        borderLeft: ' 1px solid #d9d9d9'
    },
}));


export const MergeMapping: FC<P> = ({ mapping }) => {
    const ref = useRef<ArcherContainer>(null);
    const targetDigitsSource = mapping.input;
    const rootDigitsSource = mapping.output;

    const rootDigits = rootDigitsSource.map((digit, index) => {
        return (
            <Button key={index} className={classes.digitBox}>
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
                        sourceAnchor:  'bottom',
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
                <Button key={index} className={classes.rootBox}>
                    {digit.representationInBase}
                </Button>
            </ArcherElement>
        );
    });

    return (
       <Root>
           <div
               data-test={`merge-mapping-${digitsToStr(mapping.input)}-${digitsToStr(mapping.output)}`}
               className={classes.mergeMappingBox}
           >
               <ArcherContainer noCurves ref={ref}>
                   <div
                       style={{
                           display: 'flex',
                           flexDirection: 'column'
                       }}>
                       <div className={classes.rootDigitsRow}>
                           {targetDigits}
                       </div>
                       <ArcherElement id='root'>
                           <div className={classes.digitsRow}>
                               {rootDigits}
                           </div>
                       </ArcherElement>
                   </div>
               </ArcherContainer>
           </div>
       </Root>
    );
};
