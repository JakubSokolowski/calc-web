import React, { FC } from 'react';
import { Button, List,  Theme, Tooltip } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import makeStyles from '@mui/styles/makeStyles';
import { OperandInput } from '../operand-input/operand-input';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { reorder } from '@calc/utils';
import { OperandValidator } from '@calc/calc-arithmetic';

export interface DndOperand {
    representation: string;
    valid: boolean;
    dndKey: string;
}

interface P {
    inputBase: number;
    operands: DndOperand[];
    validators?: OperandValidator[];
    onChange: (operands: DndOperand[]) => void;
    onAdd: () => void;
    canAdd: boolean;
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


export const OperandList: FC<P> = ({ inputBase, operands, onChange, onAdd, canAdd, validators }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const newItems: DndOperand[] = reorder(
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
        newOperands[index] = { ...newOperands[index], representation: representationStr, valid: isValid };
        onChange(newOperands);
    };


    const items = operands.map((item, index) => {
        return (
            <Draggable key={item.dndKey} draggableId={`${item.dndKey}`} index={index}>
                {(provided, snapshot) => (
                    <OperandInput
                        validators={validators}
                        numOperands={operands.length}
                        dataTest={`operand-input-${index}`}
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
                        <List ref={provided.innerRef}>
                            {items}
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>
            {
                <Tooltip title={canAdd ? '' : t('positionalCalculator.maxOpReached')}>
                    <span>
                         <Button
                             data-test="add-operand-btn"
                             data-testid={'new-operand'}
                             disabled={!canAdd}
                             onClick={() => onAdd()}
                             endIcon={<AddIcon/>}
                             variant={'outlined'}
                             className={classes.newOperand}
                         >
                            {t('positionalCalculator.newOperand')}
                        </Button>
                    </span>
                </Tooltip>
            }

        </div>
    );
};
