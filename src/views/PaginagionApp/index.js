import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PaginationComponent from "react-reactstrap-pagination";

import classes from "./PaginationApp.module.scss";

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`,
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
    margin: "0 30px",
});

const PaginagionApp = () => {
    const [values, setValues] = useState({
        items: getItems(10),
        selected: getItems(5, 10),
    });
    const [totalItems, setTotalItems] = useState(10);
    const [selectedPage, setSelectedPage] = useState(1);
    const ref = useRef();

    const id2List = {
        droppable: "items",
        droppable2: "selected",
    };

    let getList = id => values[id2List[id]];

    const onDragEnd = res => {
        const { source, destination } = res;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source?.droppableId === destination?.droppableId) {
            const newItems = reorder(
                getList(source.droppableId),
                source.index,
                destination.index,
            );
            setValues({ ...values, selected: newItems });

            if (source.droppableId === "droppable") {
                setValues({ ...values, items: newItems });
            }
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination,
            );
            setValues({ items: result.droppable, selected: result.droppable2 });
        }
    };

    const handleSelected = page => {
        setSelectedPage(page);
    };

    useEffect(() => {
        const fetchPage = () => {
            ref?.current?.addEventListener("mouseover", ({ target }) => {
                let page = parseFloat(target?.textContent);
                if (page) {
                    console.log(page);
                    handleSelected(page);
                    // setLoader(true);
                }
            });
        };

        fetchPage();

        return () => {
            ref?.current?.removeEventListener("mouseover", fetchPage);
        };
    }, [ref]);

    return (
        <div>
            <div className={classes.dragDropWrapper}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {values?.items?.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style,
                                                )}
                                            >
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="droppable2">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {values?.selected?.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style,
                                                )}
                                            >
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <div className={classes.paginationWrapper} ref={ref}>
                <PaginationComponent
                    totalItems={totalItems}
                    pageSize={1}
                    onSelect={handleSelected}
                    defaultActivePage={selectedPage}
                />
            </div>
        </div>
    );
};

export default PaginagionApp;
