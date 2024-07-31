import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../../helpers/fetcher";
import useGetFiles from "../hooks/useGetFiles";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import EditFileModal from "./EditFileModal";
import { FileDto } from "../../api";


export default function Table() {
  const { t } = useTranslation();
  const { data, isPending } = useGetFiles();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileDto | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await fetcher({ url: `/files/${id}`, method: "DELETE" });
      queryClient.invalidateQueries(["files"] as InvalidateQueryFilters);
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  const handleEdit = (file: FileDto) => {
    setSelectedFile(file);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedFile(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>{t("homePage.id")}</th>
            <th>{t("homePage.fileName")}</th>
            <th>{t("homePage.size")}</th>
            <th>{t("homePage.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((file) => (
            <tr key={file.id}>
              <th>{file.id}</th>
              <td>{file.name}</td>
              <td>{file.size}</td>
              <td className="space-x-3 *:border *:border-gray-400 *:py-1 *:px-2 *:font-medium *:rounded-md">
                <button className="" onClick={() => handleDelete(file.id)}>{t("homePage.delete")}</button>
                <button className="" onClick={() => handleEdit(file)}>{t("homePage.edit")}</button>
              </td>
            </tr>
          ))}
          {data?.length === 0 && (
            <tr>
              <td colSpan={4} align="center">
                {t("homePage.noFiles")}
              </td>
            </tr>
          )}
              {isPending && (
                <tr>
                  <td colSpan={4} align="center">
                    <span className="loading loading-spinner mx-auto text-center"></span>
                  </td>
                </tr>
              )}
            </tbody>
      </table>
      <EditFileModal
        onClose={handleModalClose}
        file={selectedFile}
        isModalOpen={showModal}
      />
    </div>
  );
}
