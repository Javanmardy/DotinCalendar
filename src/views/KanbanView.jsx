import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useLocal from '@/store/useLocal.js';

const Column = ({ title, id, cards, children }) => (
  <div className="flex-1 p-2">
    <h2 className="mb-2 text-lg font-bold">{title}</h2>
    {children}
  </div>
);

const Card = ({ id, text }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}
      className="bg-white rounded shadow p-2 mb-2 cursor-grab">
      {text}
    </div>
  );
};

export default function KanbanView() {
  const { cards, setCards } = useLocal();

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = cards.findIndex(c => c.id === active.id);
      const newIndex = cards.findIndex(c => c.id === over.id);
      setCards(arrayMove(cards, oldIndex, newIndex));
    }
  };

  const renderColumn = (status, title) => (
    <Column title={title} id={status}>
      <SortableContext items={cards.filter(c => c.status === status)} strategy={verticalListSortingStrategy}>
        {cards.filter(c => c.status === status).map(card => (
          <Card key={card.id} id={card.id} text={card.text} />
        ))}
      </SortableContext>
    </Column>
  );

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-4">
        {renderColumn('todo', 'در انتظار')}
        {renderColumn('doing', 'در حال انجام')}
        {renderColumn('done', 'انجام شده')}
      </div>
    </DndContext>
  );
}
