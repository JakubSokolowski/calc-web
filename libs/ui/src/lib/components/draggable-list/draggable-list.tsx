import React, { cloneElement, FC, useState } from 'react';
import { createStyles, List, ListItem, RootRef, TextField, Theme } from '@material-ui/core';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';


interface FormValues {
    inputBase: number;
}


interface P {
    items?: any[];
}

// fake data generator
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        primary: `item ${k}`,
        secondary: k % 2 === 0 ? `Whatever for ${k}` : undefined
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


const getListStyle = isDraggingOver => ({
    //background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 500,
            backgroundColor: theme.palette.background.paper
        },
        normal: {
            backgroundColor: theme.palette.background.default
        },
        dragging: {
            backgroundColor: theme.palette.background.paper
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        }
    })
);

interface NumberOperand {
    base: number;
    representationStr: string;
}

export const DraggableList: FC<P> = ({items, children}) => {
    const classes = useStyles();

    const [operands, setOperands] = useState<NumberOperand[]>(
        [
            {
                base: 8,
                representationStr: '1234'
            },
            {
                base: 8,
                representationStr: '431235'
            }
        ]
    );

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const newItems: any[] = reorder(
            operands,
            result.source.index,
            result.destination.index
        );

        setOperands(newItems);
    };

    const remove = (index: number) => {
        setOperands((prev) => {
            const newArr = [...prev];
            newArr.splice(index, 1);
            return newArr;
        });
    };



    const handleChange = (base: number, representationStr: string, index: number) => {
        const newOperands = [...operands];
        newOperands[index] = { base, representationStr };
        setOperands(newOperands);
    };

    const childrenArr = React.Children.toArray(children);
    const listItems = childrenArr.map((item, index) => {
        return (
            <Draggable key={index} draggableId={`${index}`} index={index}>
                {(provided, snapshot) => {
                    const dndProps = {
                        ContainerComponent: 'li',
                        ContainerProps: { ref: provided.innerRef },
                        ...provided.draggableProps,
                        ...provided.dragHandleProps,
                        className: snapshot.isDragging ? classes.dragging : classes.normal,
                        index,
                    };
                    return cloneElement(item as any, dndProps);
                }}
            </Draggable>
        );
    });


    return (
        <div style={{ paddingTop: '20px', maxWidth: '400px' }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <RootRef rootRef={provided.innerRef}>
                            <List style={getListStyle(snapshot.isDraggingOver)}>
                                {children}
                                {provided.placeholder}
                            </List>
                        </RootRef>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};
