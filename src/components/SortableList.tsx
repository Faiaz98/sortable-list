import { useState } from "react";

const initialItems = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

export const SortableList = () => {
  const [items, setItems] = useState(initialItems);

  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const updated = [...items];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setItems(updated);
  };

  return (
    <ul className="max-w-md mx-auto p-4 space-y-2">
      {items.map((item, index) => (
        <li
          key={item}
          className="flex items-center justify-between bg-white p-3 rounded shadow"
        >
          <span>{item}</span>
          <div className="space-x-1">
            <button
              className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
              onClick={() => moveItem(index, index - 1)}
            >
              ↑
            </button>
            <button
              className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
              onClick={() => moveItem(index, index + 1)}
            >
              ↓
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
