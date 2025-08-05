import { SortableList } from "./components/SortableList";

const App = () => {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">🍎 Sortable List</h1>
      <SortableList />
    </main>
  );
};

export default App;
