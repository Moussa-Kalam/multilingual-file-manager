import useGetFiles from "../hooks/useGetFiles";
import { useTranslation } from "react-i18next";

export default function Table() {
  const { t } = useTranslation();
  const { data, error, isPending } = useGetFiles();

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
            <tr>
              <th>{file.id}</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td className="space-x-3 *:border *:border-gray-400 *:py-1 *:px-2 *:font-medium *:rounded-md">
                <button className="">{t("homePage.delete")}</button>
                <button className="">{t("homePage.edit")}</button>
              </td>
            </tr>
          ))}
          {isPending && (
            <tr>
              <td colSpan={4} align="center">
                <span className="loading loading-spinner mx-auto text-center"></span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
