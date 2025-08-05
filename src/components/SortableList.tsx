import {
  useRef,
  useState,
  useEffect,
} from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

const initialItems = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

export const SortableList = () => {
  const [items, setItems] = useState(initialItems);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (dragIndex !== null && overIndex !== null && dragIndex !== overIndex) {
      const updated = [...items];
      const [moved] = updated.splice(dragIndex, 1);
      updated.splice(overIndex, 0, moved);
      setItems(updated);
      setDragIndex(overIndex); // update new dragIndex
    }
  }, [overIndex]);

  const handlePointerDown = (index: number) => {
    setDragIndex(index);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerUp = () => {
    setDragIndex(null);
    setOverIndex(null);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMove = (e: ReactPointerEvent) => {
    if (dragIndex === null) return;
    const clientY = e.clientY;
    const newOver = itemRefs.current.findIndex((item) => {
      if (!item) return false;
      const rect = item.getBoundingClientRect();
      return clientY > rect.top && clientY < rect.bottom;
    });
    if (newOver !== -1 && newOver !== dragIndex) {
      setOverIndex(newOver);
    }
  };

  return (
    <ul
      className="max-w-md mx-auto p-4 space-y-2"
      onPointerMove={handlePointerMove}
    >
      {items.map((item, index) => (
        <li
          key={item}
          ref={(el) => {
  itemRefs.current[index] = el;
}}

          className={`flex items-center justify-between p-3 rounded shadow bg-white transition-all duration-150 ${
            dragIndex === index ? "opacity-40" : ""
          }`}
          onPointerDown={() => handlePointerDown(index)}
        >
          <span className="cursor-grab">{item}</span>
        </li>
      ))}
    </ul>
  );
};
