import { useState } from "react";
import AddFileModal from "../components/shared/AddFileModal";
import Table from "../components/shared/Table";

export function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">Files</h2>
        <button
          className="bg-black text-white font-bold py-3 px-6 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Add File
        </button>
      </div>
      <h3 className="mt-10 text-2xl font-medium">Added Files</h3>
      <div className="py-10">
        <Table />
        <AddFileModal onClose={handleCloseModal} isModalOpen={isModalOpen}/>
      </div>
    </div>
  );
}
