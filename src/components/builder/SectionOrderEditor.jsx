import { useState } from 'react';
import { sectionLabels } from '../../data/config';

export function SectionOrderEditor({ order, onChange }) {
  const [draggedKey, setDraggedKey] = useState('');

  function handleDrop(targetKey) {
    if (!draggedKey || draggedKey === targetKey) {
      return;
    }

    const nextOrder = [...order];
    const draggedIndex = nextOrder.indexOf(draggedKey);
    const targetIndex = nextOrder.indexOf(targetKey);

    nextOrder.splice(draggedIndex, 1);
    nextOrder.splice(targetIndex, 0, draggedKey);
    onChange(nextOrder);
    setDraggedKey('');
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-900">Drag & drop sections</h3>
        <p className="mt-1 text-xs leading-5 text-slate-500">Change the order of sections shown in the live preview.</p>
      </div>

      <div className="space-y-2">
        {order.map((item) => (
          <button
            key={item}
            type="button"
            draggable
            onDragStart={() => setDraggedKey(item)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => handleDrop(item)}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-brand/30 hover:bg-brand/5"
          >
            <span>{sectionLabels[item]}</span>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Move</span>
          </button>
        ))}
      </div>
    </div>
  );
}