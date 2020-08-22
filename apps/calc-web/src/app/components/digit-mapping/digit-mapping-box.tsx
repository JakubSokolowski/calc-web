import React, { FC, useRef } from 'react';
import { DigitMapping } from '@calc/calc-arithmetic';
import './digit-mappings-box.scss'
import { Button } from 'antd';
import { ArcherContainer, ArcherElement } from 'react-archer';

interface P {
    mapping: DigitMapping;
}

export const DigitMappingBox: FC<P> = ({mapping}) => {
    const ref = useRef(null);

    const targetDigitsSource = mapping.input.length < mapping.output.length
        ? mapping.output
        : mapping.input;

    const rootDigitsSource = mapping.input.length < mapping.output.length
        ? mapping.input
        : mapping.output;

    const rootDigits = rootDigitsSource.map((digit, index) => {
        return (
            <Button key={index} className="digit-box">
                {digit.valueInBase}
            </Button>
        )
    });

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
                    },
                ]}
            >
                <Button key={index} className="digit-box">
                    {digit.valueInBase}
                </Button>
            </ArcherElement>
        )
    });

    return (
        <div
            className="mappings-box"
        >
            <ArcherContainer noCurves ref={ref}>
                <div
                    style={{
                    display: 'flex',
                    flexDirection:  mapping.input.length < mapping.output.length ? 'column' : 'column-reverse'
                }}>
                    <ArcherElement id='root'>
                        <div className="digits-row">
                            {rootDigits}
                        </div>
                    </ArcherElement>
                    <div className="digits-row">
                        {targetDigits}
                    </div>
                </div>
            </ArcherContainer>
        </div>
    )
};
