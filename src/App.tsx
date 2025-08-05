import { SortableList } from "./components/SortableList";

export default function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Sortable List</h1>
      <SortableList />
    </main>
  );
}
