import { useRef, useState } from "react";

const initialItems = ["🍕 Pizza", "🍔 Burger", "🍣 Sushi", "🥗 Salad", "🍩 Donut"];

export function SortableList() {
  const [items, setItems] = useState(initialItems);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handlePointerDown = (e: React.PointerEvent, index: number) => {
    const target = e.currentTarget as HTMLLIElement;
    const startY = e.clientY;
    const originalIndex = index;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const dy = moveEvent.clientY - startY;

      // find hover target
      const hoverIndex = itemRefs.current.findIndex((el, i) => {
        if (!el || i === originalIndex) return false;
        const rect = el.getBoundingClientRect();
        return moveEvent.clientY > rect.top && moveEvent.clientY < rect.bottom;
      });

      if (hoverIndex !== -1 && hoverIndex !== originalIndex) {
        setItems((prev) => {
          const updated = [...prev];
          [updated[originalIndex], updated[hoverIndex]] = [updated[hoverIndex], updated[originalIndex]];
          return updated;
        });
      }
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowUp" && index > 0) {
      swap(index, index - 1);
      setTimeout(() => itemRefs.current[index - 1]?.focus(), 0);
    }

    if (e.key === "ArrowDown" && index < items.length - 1) {
      swap(index, index + 1);
      setTimeout(() => itemRefs.current[index + 1]?.focus(), 0);
    }
  };

  const swap = (i: number, j: number) => {
    setItems((prev) => {
      const newItems = [...prev];
      [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
      return newItems;
    });
  };

  return (
    <ul className="space-y-2 max-w-md mx-auto mt-10">
      {items.map((item, index) => (
        <li
          key={item}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          tabIndex={0}
          className="p-4 border rounded shadow cursor-move bg-white focus:outline-blue-500"
          onPointerDown={(e) => handlePointerDown(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
