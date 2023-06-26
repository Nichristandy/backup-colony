import React, { Fragment, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import ListVideo from './ListVideo';

interface ItemProps {
    id: string;
    content?: string;
    title?: string;
}

const initialItemsProps: ItemProps[] = [
    { id: '1', title: 'Video 1', content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci odio voluptas ..." },
    { id: '2', title: 'Video 2', content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci odio voluptas ..." },
    { id: '3', title: 'Video 3', content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci odio voluptas ..." },
];

const DragVideo: React.FC = () => {
    const [items, setItems] = useState(initialItemsProps);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return; // Item was dropped outside of a droppable area
    }

    const { source, destination } = result;
    if (source.index === destination.index) {
      return; // Item was dropped in the same position
    }

    const newItems = [...items];
    const [removed] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, removed);

    setItems(newItems);
  };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map((item, index) => {
                            if (index === 0) {
                                return (
                                    <Fragment key={items[0].id}>
                                        <h3 className='font-semibold text-lg mb-4'>Display first</h3>
                                        <Draggable key={items[0].id} draggableId={items[0].id} index={0}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <ListVideo
                                                        index={0}
                                                        item={items[0]}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                        <h3 className='font-semibold text-lg mb-4'>Others</h3>
                                    </Fragment>
                                )
                            }
                            return (
                                <Fragment key={item.id}>
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <ListVideo
                                                    index={index}
                                                    item={item}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                </Fragment>
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DragVideo;
