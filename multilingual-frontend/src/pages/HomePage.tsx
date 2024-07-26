import { useState } from "react";
import AddFileModal from "../components/shared/AddFileModal";
import Table from "../components/shared/Table";
import { useTranslation } from "react-i18next";

export function HomePage() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">{t("homePage.files")}</h2>
        <button
          className="bg-black text-white font-bold py-3 px-6 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          {t("homePage.addFiles")}
        </button>
      </div>
      <h3 className="mt-10 text-2xl font-medium">{t("homePage.addedFiles")}</h3>
      <div className="py-10">
        <Table />
        <AddFileModal onClose={handleCloseModal} isModalOpen={isModalOpen} />
      </div>
    </div>
  );
}
