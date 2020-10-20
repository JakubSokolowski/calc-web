import React, { FC } from 'react';
import { Button, createStyles, List, RootRef, Theme } from '@material-ui/core';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import { OperandInput } from '../operand-input/operand-input';
import { useTranslation } from 'react-i18next';
import AddIcon from '@material-ui/icons/Add';

export interface ValidatedOperand {
    representation: string;
    valid: boolean;
}

interface P {
    inputBase: number;
    operands: ValidatedOperand[];
    onChange: (operands: ValidatedOperand[]) => void;
    onAdd: () => void;
    canAdd: boolean;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 500,
            backgroundColor: theme.palette.background.paper
        },
        normal: {
            backgroundColor: theme.palette.background.paper
        },
        dragging: {
            backgroundColor: theme.palette.background.default
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        },
        item: {
            padding: 0
        },
        newOperand: {
            width: '100%',
            border: '1px dashed'
        }
    })
);


export const OperandList: FC<P> = ({ inputBase, operands, onChange, onAdd, canAdd }) => {
    const classes = useStyles();
    const { t } = useTranslation();


    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const newItems: ValidatedOperand[] = reorder(
            operands,
            result.source.index,
            result.destination.index
        );

        onChange(newItems);
    };

    const remove = (index: number) => {
        const newArr = [...operands];
        newArr.splice(index, 1);
        onChange(newArr);
    };


    const handleChange = (representationStr: string, index: number, isValid: boolean) => {
        const newOperands = [...operands];
        newOperands[index] = { representation: representationStr, valid: isValid };
        onChange(newOperands);
    };

    const items = operands.map((item, index) => {
        return (
            <Draggable key={index} draggableId={`${index}`} index={index}>
                {(provided, snapshot) => (
                    <OperandInput
                        ContainerComponent="li"
                        ContainerProps={{ ref: provided.innerRef }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        aria-readonly={'true'}
                        className={snapshot.isDragging ? classes.dragging : classes.normal}
                        representationStr={item.representation}
                        index={index}
                        base={inputBase}
                        onRepresentationChange={handleChange}
                        onRemove={remove}
                    />
                )}
            </Draggable>
        );
    });


    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <RootRef rootRef={provided.innerRef}>
                            <List>
                                {items}
                                {provided.placeholder}
                            </List>
                        </RootRef>
                    )}
                </Droppable>
            </DragDropContext>
            <Button
                disabled={!canAdd}
                onClick={() => onAdd()}
                endIcon={<AddIcon/>}
                variant={'outlined'}
                className={classes.newOperand}
            >
                {t('positionalCalculator.newOperand')}
            </Button>
        </div>
    );
};
